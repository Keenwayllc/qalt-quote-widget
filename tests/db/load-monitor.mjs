// Loads src/lib/error-triage.ts as an isolated "server instance": its own
// Prisma client and connection pool, a fake email sender and a fake Claude
// client. Nothing here can reach Resend, Anthropic or production.
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import ts from 'typescript';
import * as react from 'react';
import { clamp, errorFingerprint, isNoiseError } from '../../src/lib/error-tracking.ts';

const require = createRequire(import.meta.url);
const { PrismaClient } = require('../../src/generated/prisma/client/index.js');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

class APIError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}
class APIConnectionError extends APIError {
  constructor() { super(undefined, 'Connection error.'); }
}

/**
 * claude: async (attemptNumber) => response | throws. Counts every call.
 */
export function loadMonitor(databaseUrl, { claude } = {}) {
  const pool = new Pool({ connectionString: databaseUrl, max: 10 });
  const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });
  const emails = [];
  const claudeCalls = [];

  class FakeAnthropic {
    constructor(options) { this.options = options; }
    messages = {
      parse: async (body) => {
        claudeCalls.push({ body, options: this.options });
        if (!claude) throw new Error('Claude called without a fixture');
        return claude(claudeCalls.length);
      },
    };
    static APIError = APIError;
    static APIConnectionError = APIConnectionError;
  }

  const source = readFileSync(new URL('../../src/lib/error-triage.ts', import.meta.url), 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const mod = { exports: {} };
  new Function('require', 'module', 'exports', compiled)((name) => {
    if (name === 'node:crypto') return require('node:crypto');
    if (name === 'react') return react;
    if (name === '@anthropic-ai/sdk') return { default: FakeAnthropic, __esModule: true };
    if (name === '@anthropic-ai/sdk/helpers/json-schema') return { jsonSchemaOutputFormat: (schema) => ({ type: 'json_schema', schema }) };
    if (name === '@/lib/prisma') return { default: prisma, __esModule: true };
    if (name === '@/lib/email') return { sendEmail: async (message) => { emails.push(message); return { ok: true }; } };
    if (name === '@/lib/error-tracking') return { clamp, errorFingerprint, isNoiseError };
    throw new Error(`unexpected import ${name}`);
  }, mod, mod.exports);

  return {
    ...mod.exports,
    prisma,
    emails,
    claudeCalls,
    APIError,
    APIConnectionError,
    close: async () => { await prisma.$disconnect(); await pool.end(); },
  };
}
