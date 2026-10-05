// A separate OS process acting as one server instance. Records the errors
// passed in argv concurrently and prints how many alert emails it sent.
import { loadMonitor } from './load-monitor.mjs';

const [databaseUrl, prefix, total] = process.argv.slice(2);
const monitor = loadMonitor(databaseUrl);
await Promise.all(Array.from({ length: Number(total) }, (_, i) => monitor.recordAppError({
  source: 'server',
  message: `Worker bug ${prefix} kind ${String.fromCharCode(97 + i)}`,
  stack: `Error\n    at worker_${prefix}_${String.fromCharCode(97 + i)} (w.js:1:1)`,
  path: `/worker/${prefix}`,
})));
process.stdout.write(JSON.stringify({ emails: monitor.emails.length }));
await monitor.close();
