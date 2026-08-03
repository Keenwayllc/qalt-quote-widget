
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Company
 * 
 */
export type Company = $Result.DefaultSelection<Prisma.$CompanyPayload>
/**
 * Model PricingProfile
 * 
 */
export type PricingProfile = $Result.DefaultSelection<Prisma.$PricingProfilePayload>
/**
 * Model WidgetSettings
 * 
 */
export type WidgetSettings = $Result.DefaultSelection<Prisma.$WidgetSettingsPayload>
/**
 * Model QuoteRequest
 * 
 */
export type QuoteRequest = $Result.DefaultSelection<Prisma.$QuoteRequestPayload>
/**
 * Model Webhook
 * 
 */
export type Webhook = $Result.DefaultSelection<Prisma.$WebhookPayload>
/**
 * Model ShopifyInstall
 * 
 */
export type ShopifyInstall = $Result.DefaultSelection<Prisma.$ShopifyInstallPayload>
/**
 * Model PartnerInquiry
 * 
 */
export type PartnerInquiry = $Result.DefaultSelection<Prisma.$PartnerInquiryPayload>
/**
 * Model StopNote
 * 
 */
export type StopNote = $Result.DefaultSelection<Prisma.$StopNotePayload>
/**
 * Model ReadinessCheck
 * 
 */
export type ReadinessCheck = $Result.DefaultSelection<Prisma.$ReadinessCheckPayload>
/**
 * Model ExceptionLog
 * 
 */
export type ExceptionLog = $Result.DefaultSelection<Prisma.$ExceptionLogPayload>
/**
 * Model Job
 * 
 */
export type Job = $Result.DefaultSelection<Prisma.$JobPayload>
/**
 * Model JobStop
 * 
 */
export type JobStop = $Result.DefaultSelection<Prisma.$JobStopPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Companies
 * const companies = await prisma.company.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Companies
   * const companies = await prisma.company.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.company`: Exposes CRUD operations for the **Company** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Companies
    * const companies = await prisma.company.findMany()
    * ```
    */
  get company(): Prisma.CompanyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pricingProfile`: Exposes CRUD operations for the **PricingProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PricingProfiles
    * const pricingProfiles = await prisma.pricingProfile.findMany()
    * ```
    */
  get pricingProfile(): Prisma.PricingProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.widgetSettings`: Exposes CRUD operations for the **WidgetSettings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WidgetSettings
    * const widgetSettings = await prisma.widgetSettings.findMany()
    * ```
    */
  get widgetSettings(): Prisma.WidgetSettingsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.quoteRequest`: Exposes CRUD operations for the **QuoteRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more QuoteRequests
    * const quoteRequests = await prisma.quoteRequest.findMany()
    * ```
    */
  get quoteRequest(): Prisma.QuoteRequestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.webhook`: Exposes CRUD operations for the **Webhook** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Webhooks
    * const webhooks = await prisma.webhook.findMany()
    * ```
    */
  get webhook(): Prisma.WebhookDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.shopifyInstall`: Exposes CRUD operations for the **ShopifyInstall** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ShopifyInstalls
    * const shopifyInstalls = await prisma.shopifyInstall.findMany()
    * ```
    */
  get shopifyInstall(): Prisma.ShopifyInstallDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.partnerInquiry`: Exposes CRUD operations for the **PartnerInquiry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PartnerInquiries
    * const partnerInquiries = await prisma.partnerInquiry.findMany()
    * ```
    */
  get partnerInquiry(): Prisma.PartnerInquiryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.stopNote`: Exposes CRUD operations for the **StopNote** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StopNotes
    * const stopNotes = await prisma.stopNote.findMany()
    * ```
    */
  get stopNote(): Prisma.StopNoteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.readinessCheck`: Exposes CRUD operations for the **ReadinessCheck** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ReadinessChecks
    * const readinessChecks = await prisma.readinessCheck.findMany()
    * ```
    */
  get readinessCheck(): Prisma.ReadinessCheckDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.exceptionLog`: Exposes CRUD operations for the **ExceptionLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ExceptionLogs
    * const exceptionLogs = await prisma.exceptionLog.findMany()
    * ```
    */
  get exceptionLog(): Prisma.ExceptionLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.job`: Exposes CRUD operations for the **Job** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Jobs
    * const jobs = await prisma.job.findMany()
    * ```
    */
  get job(): Prisma.JobDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.jobStop`: Exposes CRUD operations for the **JobStop** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more JobStops
    * const jobStops = await prisma.jobStop.findMany()
    * ```
    */
  get jobStop(): Prisma.JobStopDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.7.0
   * Query Engine version: 75cbdc1eb7150937890ad5465d861175c6624711
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Company: 'Company',
    PricingProfile: 'PricingProfile',
    WidgetSettings: 'WidgetSettings',
    QuoteRequest: 'QuoteRequest',
    Webhook: 'Webhook',
    ShopifyInstall: 'ShopifyInstall',
    PartnerInquiry: 'PartnerInquiry',
    StopNote: 'StopNote',
    ReadinessCheck: 'ReadinessCheck',
    ExceptionLog: 'ExceptionLog',
    Job: 'Job',
    JobStop: 'JobStop'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "company" | "pricingProfile" | "widgetSettings" | "quoteRequest" | "webhook" | "shopifyInstall" | "partnerInquiry" | "stopNote" | "readinessCheck" | "exceptionLog" | "job" | "jobStop"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Company: {
        payload: Prisma.$CompanyPayload<ExtArgs>
        fields: Prisma.CompanyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompanyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompanyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          findFirst: {
            args: Prisma.CompanyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompanyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          findMany: {
            args: Prisma.CompanyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          create: {
            args: Prisma.CompanyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          createMany: {
            args: Prisma.CompanyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CompanyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          delete: {
            args: Prisma.CompanyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          update: {
            args: Prisma.CompanyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          deleteMany: {
            args: Prisma.CompanyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompanyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CompanyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          upsert: {
            args: Prisma.CompanyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          aggregate: {
            args: Prisma.CompanyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompany>
          }
          groupBy: {
            args: Prisma.CompanyGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompanyGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompanyCountArgs<ExtArgs>
            result: $Utils.Optional<CompanyCountAggregateOutputType> | number
          }
        }
      }
      PricingProfile: {
        payload: Prisma.$PricingProfilePayload<ExtArgs>
        fields: Prisma.PricingProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PricingProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PricingProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingProfilePayload>
          }
          findFirst: {
            args: Prisma.PricingProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PricingProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingProfilePayload>
          }
          findMany: {
            args: Prisma.PricingProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingProfilePayload>[]
          }
          create: {
            args: Prisma.PricingProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingProfilePayload>
          }
          createMany: {
            args: Prisma.PricingProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PricingProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingProfilePayload>[]
          }
          delete: {
            args: Prisma.PricingProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingProfilePayload>
          }
          update: {
            args: Prisma.PricingProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingProfilePayload>
          }
          deleteMany: {
            args: Prisma.PricingProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PricingProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PricingProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingProfilePayload>[]
          }
          upsert: {
            args: Prisma.PricingProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingProfilePayload>
          }
          aggregate: {
            args: Prisma.PricingProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePricingProfile>
          }
          groupBy: {
            args: Prisma.PricingProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<PricingProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.PricingProfileCountArgs<ExtArgs>
            result: $Utils.Optional<PricingProfileCountAggregateOutputType> | number
          }
        }
      }
      WidgetSettings: {
        payload: Prisma.$WidgetSettingsPayload<ExtArgs>
        fields: Prisma.WidgetSettingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WidgetSettingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WidgetSettingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WidgetSettingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WidgetSettingsPayload>
          }
          findFirst: {
            args: Prisma.WidgetSettingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WidgetSettingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WidgetSettingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WidgetSettingsPayload>
          }
          findMany: {
            args: Prisma.WidgetSettingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WidgetSettingsPayload>[]
          }
          create: {
            args: Prisma.WidgetSettingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WidgetSettingsPayload>
          }
          createMany: {
            args: Prisma.WidgetSettingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WidgetSettingsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WidgetSettingsPayload>[]
          }
          delete: {
            args: Prisma.WidgetSettingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WidgetSettingsPayload>
          }
          update: {
            args: Prisma.WidgetSettingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WidgetSettingsPayload>
          }
          deleteMany: {
            args: Prisma.WidgetSettingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WidgetSettingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WidgetSettingsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WidgetSettingsPayload>[]
          }
          upsert: {
            args: Prisma.WidgetSettingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WidgetSettingsPayload>
          }
          aggregate: {
            args: Prisma.WidgetSettingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWidgetSettings>
          }
          groupBy: {
            args: Prisma.WidgetSettingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<WidgetSettingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.WidgetSettingsCountArgs<ExtArgs>
            result: $Utils.Optional<WidgetSettingsCountAggregateOutputType> | number
          }
        }
      }
      QuoteRequest: {
        payload: Prisma.$QuoteRequestPayload<ExtArgs>
        fields: Prisma.QuoteRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuoteRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuoteRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuoteRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuoteRequestPayload>
          }
          findFirst: {
            args: Prisma.QuoteRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuoteRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuoteRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuoteRequestPayload>
          }
          findMany: {
            args: Prisma.QuoteRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuoteRequestPayload>[]
          }
          create: {
            args: Prisma.QuoteRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuoteRequestPayload>
          }
          createMany: {
            args: Prisma.QuoteRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QuoteRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuoteRequestPayload>[]
          }
          delete: {
            args: Prisma.QuoteRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuoteRequestPayload>
          }
          update: {
            args: Prisma.QuoteRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuoteRequestPayload>
          }
          deleteMany: {
            args: Prisma.QuoteRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QuoteRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.QuoteRequestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuoteRequestPayload>[]
          }
          upsert: {
            args: Prisma.QuoteRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuoteRequestPayload>
          }
          aggregate: {
            args: Prisma.QuoteRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuoteRequest>
          }
          groupBy: {
            args: Prisma.QuoteRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuoteRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.QuoteRequestCountArgs<ExtArgs>
            result: $Utils.Optional<QuoteRequestCountAggregateOutputType> | number
          }
        }
      }
      Webhook: {
        payload: Prisma.$WebhookPayload<ExtArgs>
        fields: Prisma.WebhookFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WebhookFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WebhookFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookPayload>
          }
          findFirst: {
            args: Prisma.WebhookFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WebhookFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookPayload>
          }
          findMany: {
            args: Prisma.WebhookFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookPayload>[]
          }
          create: {
            args: Prisma.WebhookCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookPayload>
          }
          createMany: {
            args: Prisma.WebhookCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WebhookCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookPayload>[]
          }
          delete: {
            args: Prisma.WebhookDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookPayload>
          }
          update: {
            args: Prisma.WebhookUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookPayload>
          }
          deleteMany: {
            args: Prisma.WebhookDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WebhookUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WebhookUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookPayload>[]
          }
          upsert: {
            args: Prisma.WebhookUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookPayload>
          }
          aggregate: {
            args: Prisma.WebhookAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWebhook>
          }
          groupBy: {
            args: Prisma.WebhookGroupByArgs<ExtArgs>
            result: $Utils.Optional<WebhookGroupByOutputType>[]
          }
          count: {
            args: Prisma.WebhookCountArgs<ExtArgs>
            result: $Utils.Optional<WebhookCountAggregateOutputType> | number
          }
        }
      }
      ShopifyInstall: {
        payload: Prisma.$ShopifyInstallPayload<ExtArgs>
        fields: Prisma.ShopifyInstallFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ShopifyInstallFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopifyInstallPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ShopifyInstallFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopifyInstallPayload>
          }
          findFirst: {
            args: Prisma.ShopifyInstallFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopifyInstallPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ShopifyInstallFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopifyInstallPayload>
          }
          findMany: {
            args: Prisma.ShopifyInstallFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopifyInstallPayload>[]
          }
          create: {
            args: Prisma.ShopifyInstallCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopifyInstallPayload>
          }
          createMany: {
            args: Prisma.ShopifyInstallCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ShopifyInstallCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopifyInstallPayload>[]
          }
          delete: {
            args: Prisma.ShopifyInstallDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopifyInstallPayload>
          }
          update: {
            args: Prisma.ShopifyInstallUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopifyInstallPayload>
          }
          deleteMany: {
            args: Prisma.ShopifyInstallDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ShopifyInstallUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ShopifyInstallUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopifyInstallPayload>[]
          }
          upsert: {
            args: Prisma.ShopifyInstallUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopifyInstallPayload>
          }
          aggregate: {
            args: Prisma.ShopifyInstallAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateShopifyInstall>
          }
          groupBy: {
            args: Prisma.ShopifyInstallGroupByArgs<ExtArgs>
            result: $Utils.Optional<ShopifyInstallGroupByOutputType>[]
          }
          count: {
            args: Prisma.ShopifyInstallCountArgs<ExtArgs>
            result: $Utils.Optional<ShopifyInstallCountAggregateOutputType> | number
          }
        }
      }
      PartnerInquiry: {
        payload: Prisma.$PartnerInquiryPayload<ExtArgs>
        fields: Prisma.PartnerInquiryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PartnerInquiryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerInquiryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PartnerInquiryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerInquiryPayload>
          }
          findFirst: {
            args: Prisma.PartnerInquiryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerInquiryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PartnerInquiryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerInquiryPayload>
          }
          findMany: {
            args: Prisma.PartnerInquiryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerInquiryPayload>[]
          }
          create: {
            args: Prisma.PartnerInquiryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerInquiryPayload>
          }
          createMany: {
            args: Prisma.PartnerInquiryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PartnerInquiryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerInquiryPayload>[]
          }
          delete: {
            args: Prisma.PartnerInquiryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerInquiryPayload>
          }
          update: {
            args: Prisma.PartnerInquiryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerInquiryPayload>
          }
          deleteMany: {
            args: Prisma.PartnerInquiryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PartnerInquiryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PartnerInquiryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerInquiryPayload>[]
          }
          upsert: {
            args: Prisma.PartnerInquiryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerInquiryPayload>
          }
          aggregate: {
            args: Prisma.PartnerInquiryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePartnerInquiry>
          }
          groupBy: {
            args: Prisma.PartnerInquiryGroupByArgs<ExtArgs>
            result: $Utils.Optional<PartnerInquiryGroupByOutputType>[]
          }
          count: {
            args: Prisma.PartnerInquiryCountArgs<ExtArgs>
            result: $Utils.Optional<PartnerInquiryCountAggregateOutputType> | number
          }
        }
      }
      StopNote: {
        payload: Prisma.$StopNotePayload<ExtArgs>
        fields: Prisma.StopNoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StopNoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StopNotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StopNoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StopNotePayload>
          }
          findFirst: {
            args: Prisma.StopNoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StopNotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StopNoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StopNotePayload>
          }
          findMany: {
            args: Prisma.StopNoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StopNotePayload>[]
          }
          create: {
            args: Prisma.StopNoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StopNotePayload>
          }
          createMany: {
            args: Prisma.StopNoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StopNoteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StopNotePayload>[]
          }
          delete: {
            args: Prisma.StopNoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StopNotePayload>
          }
          update: {
            args: Prisma.StopNoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StopNotePayload>
          }
          deleteMany: {
            args: Prisma.StopNoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StopNoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StopNoteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StopNotePayload>[]
          }
          upsert: {
            args: Prisma.StopNoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StopNotePayload>
          }
          aggregate: {
            args: Prisma.StopNoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStopNote>
          }
          groupBy: {
            args: Prisma.StopNoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<StopNoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.StopNoteCountArgs<ExtArgs>
            result: $Utils.Optional<StopNoteCountAggregateOutputType> | number
          }
        }
      }
      ReadinessCheck: {
        payload: Prisma.$ReadinessCheckPayload<ExtArgs>
        fields: Prisma.ReadinessCheckFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReadinessCheckFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadinessCheckPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReadinessCheckFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadinessCheckPayload>
          }
          findFirst: {
            args: Prisma.ReadinessCheckFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadinessCheckPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReadinessCheckFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadinessCheckPayload>
          }
          findMany: {
            args: Prisma.ReadinessCheckFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadinessCheckPayload>[]
          }
          create: {
            args: Prisma.ReadinessCheckCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadinessCheckPayload>
          }
          createMany: {
            args: Prisma.ReadinessCheckCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReadinessCheckCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadinessCheckPayload>[]
          }
          delete: {
            args: Prisma.ReadinessCheckDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadinessCheckPayload>
          }
          update: {
            args: Prisma.ReadinessCheckUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadinessCheckPayload>
          }
          deleteMany: {
            args: Prisma.ReadinessCheckDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReadinessCheckUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReadinessCheckUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadinessCheckPayload>[]
          }
          upsert: {
            args: Prisma.ReadinessCheckUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadinessCheckPayload>
          }
          aggregate: {
            args: Prisma.ReadinessCheckAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReadinessCheck>
          }
          groupBy: {
            args: Prisma.ReadinessCheckGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReadinessCheckGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReadinessCheckCountArgs<ExtArgs>
            result: $Utils.Optional<ReadinessCheckCountAggregateOutputType> | number
          }
        }
      }
      ExceptionLog: {
        payload: Prisma.$ExceptionLogPayload<ExtArgs>
        fields: Prisma.ExceptionLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExceptionLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExceptionLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExceptionLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExceptionLogPayload>
          }
          findFirst: {
            args: Prisma.ExceptionLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExceptionLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExceptionLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExceptionLogPayload>
          }
          findMany: {
            args: Prisma.ExceptionLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExceptionLogPayload>[]
          }
          create: {
            args: Prisma.ExceptionLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExceptionLogPayload>
          }
          createMany: {
            args: Prisma.ExceptionLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExceptionLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExceptionLogPayload>[]
          }
          delete: {
            args: Prisma.ExceptionLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExceptionLogPayload>
          }
          update: {
            args: Prisma.ExceptionLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExceptionLogPayload>
          }
          deleteMany: {
            args: Prisma.ExceptionLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExceptionLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ExceptionLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExceptionLogPayload>[]
          }
          upsert: {
            args: Prisma.ExceptionLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExceptionLogPayload>
          }
          aggregate: {
            args: Prisma.ExceptionLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExceptionLog>
          }
          groupBy: {
            args: Prisma.ExceptionLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExceptionLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExceptionLogCountArgs<ExtArgs>
            result: $Utils.Optional<ExceptionLogCountAggregateOutputType> | number
          }
        }
      }
      Job: {
        payload: Prisma.$JobPayload<ExtArgs>
        fields: Prisma.JobFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JobFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JobFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          findFirst: {
            args: Prisma.JobFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JobFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          findMany: {
            args: Prisma.JobFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>[]
          }
          create: {
            args: Prisma.JobCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          createMany: {
            args: Prisma.JobCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JobCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>[]
          }
          delete: {
            args: Prisma.JobDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          update: {
            args: Prisma.JobUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          deleteMany: {
            args: Prisma.JobDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JobUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.JobUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>[]
          }
          upsert: {
            args: Prisma.JobUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          aggregate: {
            args: Prisma.JobAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJob>
          }
          groupBy: {
            args: Prisma.JobGroupByArgs<ExtArgs>
            result: $Utils.Optional<JobGroupByOutputType>[]
          }
          count: {
            args: Prisma.JobCountArgs<ExtArgs>
            result: $Utils.Optional<JobCountAggregateOutputType> | number
          }
        }
      }
      JobStop: {
        payload: Prisma.$JobStopPayload<ExtArgs>
        fields: Prisma.JobStopFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JobStopFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobStopPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JobStopFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobStopPayload>
          }
          findFirst: {
            args: Prisma.JobStopFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobStopPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JobStopFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobStopPayload>
          }
          findMany: {
            args: Prisma.JobStopFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobStopPayload>[]
          }
          create: {
            args: Prisma.JobStopCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobStopPayload>
          }
          createMany: {
            args: Prisma.JobStopCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JobStopCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobStopPayload>[]
          }
          delete: {
            args: Prisma.JobStopDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobStopPayload>
          }
          update: {
            args: Prisma.JobStopUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobStopPayload>
          }
          deleteMany: {
            args: Prisma.JobStopDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JobStopUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.JobStopUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobStopPayload>[]
          }
          upsert: {
            args: Prisma.JobStopUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobStopPayload>
          }
          aggregate: {
            args: Prisma.JobStopAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJobStop>
          }
          groupBy: {
            args: Prisma.JobStopGroupByArgs<ExtArgs>
            result: $Utils.Optional<JobStopGroupByOutputType>[]
          }
          count: {
            args: Prisma.JobStopCountArgs<ExtArgs>
            result: $Utils.Optional<JobStopCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    company?: CompanyOmit
    pricingProfile?: PricingProfileOmit
    widgetSettings?: WidgetSettingsOmit
    quoteRequest?: QuoteRequestOmit
    webhook?: WebhookOmit
    shopifyInstall?: ShopifyInstallOmit
    partnerInquiry?: PartnerInquiryOmit
    stopNote?: StopNoteOmit
    readinessCheck?: ReadinessCheckOmit
    exceptionLog?: ExceptionLogOmit
    job?: JobOmit
    jobStop?: JobStopOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CompanyCountOutputType
   */

  export type CompanyCountOutputType = {
    pricingProfiles: number
    quoteRequests: number
    widgetSettings: number
    webhooks: number
    shopifyInstalls: number
    stopNotes: number
    jobs: number
  }

  export type CompanyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pricingProfiles?: boolean | CompanyCountOutputTypeCountPricingProfilesArgs
    quoteRequests?: boolean | CompanyCountOutputTypeCountQuoteRequestsArgs
    widgetSettings?: boolean | CompanyCountOutputTypeCountWidgetSettingsArgs
    webhooks?: boolean | CompanyCountOutputTypeCountWebhooksArgs
    shopifyInstalls?: boolean | CompanyCountOutputTypeCountShopifyInstallsArgs
    stopNotes?: boolean | CompanyCountOutputTypeCountStopNotesArgs
    jobs?: boolean | CompanyCountOutputTypeCountJobsArgs
  }

  // Custom InputTypes
  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyCountOutputType
     */
    select?: CompanyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountPricingProfilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PricingProfileWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountQuoteRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuoteRequestWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountWidgetSettingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WidgetSettingsWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountWebhooksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WebhookWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountShopifyInstallsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ShopifyInstallWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountStopNotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StopNoteWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountJobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobWhereInput
  }


  /**
   * Count Type QuoteRequestCountOutputType
   */

  export type QuoteRequestCountOutputType = {
    jobs: number
  }

  export type QuoteRequestCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    jobs?: boolean | QuoteRequestCountOutputTypeCountJobsArgs
  }

  // Custom InputTypes
  /**
   * QuoteRequestCountOutputType without action
   */
  export type QuoteRequestCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuoteRequestCountOutputType
     */
    select?: QuoteRequestCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * QuoteRequestCountOutputType without action
   */
  export type QuoteRequestCountOutputTypeCountJobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobWhereInput
  }


  /**
   * Count Type StopNoteCountOutputType
   */

  export type StopNoteCountOutputType = {
    readinessChecks: number
    exceptionLogs: number
    jobStops: number
  }

  export type StopNoteCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    readinessChecks?: boolean | StopNoteCountOutputTypeCountReadinessChecksArgs
    exceptionLogs?: boolean | StopNoteCountOutputTypeCountExceptionLogsArgs
    jobStops?: boolean | StopNoteCountOutputTypeCountJobStopsArgs
  }

  // Custom InputTypes
  /**
   * StopNoteCountOutputType without action
   */
  export type StopNoteCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StopNoteCountOutputType
     */
    select?: StopNoteCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StopNoteCountOutputType without action
   */
  export type StopNoteCountOutputTypeCountReadinessChecksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReadinessCheckWhereInput
  }

  /**
   * StopNoteCountOutputType without action
   */
  export type StopNoteCountOutputTypeCountExceptionLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExceptionLogWhereInput
  }

  /**
   * StopNoteCountOutputType without action
   */
  export type StopNoteCountOutputTypeCountJobStopsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobStopWhereInput
  }


  /**
   * Count Type JobCountOutputType
   */

  export type JobCountOutputType = {
    stops: number
    readinessChecks: number
    exceptionLogs: number
  }

  export type JobCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stops?: boolean | JobCountOutputTypeCountStopsArgs
    readinessChecks?: boolean | JobCountOutputTypeCountReadinessChecksArgs
    exceptionLogs?: boolean | JobCountOutputTypeCountExceptionLogsArgs
  }

  // Custom InputTypes
  /**
   * JobCountOutputType without action
   */
  export type JobCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobCountOutputType
     */
    select?: JobCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * JobCountOutputType without action
   */
  export type JobCountOutputTypeCountStopsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobStopWhereInput
  }

  /**
   * JobCountOutputType without action
   */
  export type JobCountOutputTypeCountReadinessChecksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReadinessCheckWhereInput
  }

  /**
   * JobCountOutputType without action
   */
  export type JobCountOutputTypeCountExceptionLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExceptionLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Company
   */

  export type AggregateCompany = {
    _count: CompanyCountAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  export type CompanyMinAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    name: string | null
    logoUrl: string | null
    profilePicUrl: string | null
    phone: string | null
    website: string | null
    address: string | null
    city: string | null
    state: string | null
    zip: string | null
    contactName: string | null
    timezone: string | null
    subscriptionPlan: string | null
    stripeCustomerId: string | null
    stripeSubscriptionId: string | null
    stripeConnectAccountId: string | null
    trialEndsAt: Date | null
    emailVerified: boolean | null
    emailVerificationToken: string | null
    customEmailDomain: string | null
    customEmailFromName: string | null
    resendDomainId: string | null
    emailDomainVerified: boolean | null
    isAdmin: boolean | null
    lastLoginAt: Date | null
    createdAt: Date | null
  }

  export type CompanyMaxAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    name: string | null
    logoUrl: string | null
    profilePicUrl: string | null
    phone: string | null
    website: string | null
    address: string | null
    city: string | null
    state: string | null
    zip: string | null
    contactName: string | null
    timezone: string | null
    subscriptionPlan: string | null
    stripeCustomerId: string | null
    stripeSubscriptionId: string | null
    stripeConnectAccountId: string | null
    trialEndsAt: Date | null
    emailVerified: boolean | null
    emailVerificationToken: string | null
    customEmailDomain: string | null
    customEmailFromName: string | null
    resendDomainId: string | null
    emailDomainVerified: boolean | null
    isAdmin: boolean | null
    lastLoginAt: Date | null
    createdAt: Date | null
  }

  export type CompanyCountAggregateOutputType = {
    id: number
    email: number
    passwordHash: number
    name: number
    logoUrl: number
    profilePicUrl: number
    phone: number
    website: number
    address: number
    city: number
    state: number
    zip: number
    contactName: number
    timezone: number
    subscriptionPlan: number
    stripeCustomerId: number
    stripeSubscriptionId: number
    stripeConnectAccountId: number
    trialEndsAt: number
    emailVerified: number
    emailVerificationToken: number
    customEmailDomain: number
    customEmailFromName: number
    resendDomainId: number
    emailDomainVerified: number
    emailDomainDnsRecords: number
    isAdmin: number
    lastLoginAt: number
    createdAt: number
    _all: number
  }


  export type CompanyMinAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    name?: true
    logoUrl?: true
    profilePicUrl?: true
    phone?: true
    website?: true
    address?: true
    city?: true
    state?: true
    zip?: true
    contactName?: true
    timezone?: true
    subscriptionPlan?: true
    stripeCustomerId?: true
    stripeSubscriptionId?: true
    stripeConnectAccountId?: true
    trialEndsAt?: true
    emailVerified?: true
    emailVerificationToken?: true
    customEmailDomain?: true
    customEmailFromName?: true
    resendDomainId?: true
    emailDomainVerified?: true
    isAdmin?: true
    lastLoginAt?: true
    createdAt?: true
  }

  export type CompanyMaxAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    name?: true
    logoUrl?: true
    profilePicUrl?: true
    phone?: true
    website?: true
    address?: true
    city?: true
    state?: true
    zip?: true
    contactName?: true
    timezone?: true
    subscriptionPlan?: true
    stripeCustomerId?: true
    stripeSubscriptionId?: true
    stripeConnectAccountId?: true
    trialEndsAt?: true
    emailVerified?: true
    emailVerificationToken?: true
    customEmailDomain?: true
    customEmailFromName?: true
    resendDomainId?: true
    emailDomainVerified?: true
    isAdmin?: true
    lastLoginAt?: true
    createdAt?: true
  }

  export type CompanyCountAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    name?: true
    logoUrl?: true
    profilePicUrl?: true
    phone?: true
    website?: true
    address?: true
    city?: true
    state?: true
    zip?: true
    contactName?: true
    timezone?: true
    subscriptionPlan?: true
    stripeCustomerId?: true
    stripeSubscriptionId?: true
    stripeConnectAccountId?: true
    trialEndsAt?: true
    emailVerified?: true
    emailVerificationToken?: true
    customEmailDomain?: true
    customEmailFromName?: true
    resendDomainId?: true
    emailDomainVerified?: true
    emailDomainDnsRecords?: true
    isAdmin?: true
    lastLoginAt?: true
    createdAt?: true
    _all?: true
  }

  export type CompanyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Company to aggregate.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Companies
    **/
    _count?: true | CompanyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompanyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompanyMaxAggregateInputType
  }

  export type GetCompanyAggregateType<T extends CompanyAggregateArgs> = {
        [P in keyof T & keyof AggregateCompany]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompany[P]>
      : GetScalarType<T[P], AggregateCompany[P]>
  }




  export type CompanyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyWhereInput
    orderBy?: CompanyOrderByWithAggregationInput | CompanyOrderByWithAggregationInput[]
    by: CompanyScalarFieldEnum[] | CompanyScalarFieldEnum
    having?: CompanyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompanyCountAggregateInputType | true
    _min?: CompanyMinAggregateInputType
    _max?: CompanyMaxAggregateInputType
  }

  export type CompanyGroupByOutputType = {
    id: string
    email: string
    passwordHash: string
    name: string
    logoUrl: string | null
    profilePicUrl: string | null
    phone: string | null
    website: string | null
    address: string | null
    city: string | null
    state: string | null
    zip: string | null
    contactName: string | null
    timezone: string
    subscriptionPlan: string
    stripeCustomerId: string | null
    stripeSubscriptionId: string | null
    stripeConnectAccountId: string | null
    trialEndsAt: Date | null
    emailVerified: boolean
    emailVerificationToken: string | null
    customEmailDomain: string | null
    customEmailFromName: string | null
    resendDomainId: string | null
    emailDomainVerified: boolean
    emailDomainDnsRecords: JsonValue | null
    isAdmin: boolean
    lastLoginAt: Date | null
    createdAt: Date
    _count: CompanyCountAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  type GetCompanyGroupByPayload<T extends CompanyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompanyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompanyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompanyGroupByOutputType[P]>
            : GetScalarType<T[P], CompanyGroupByOutputType[P]>
        }
      >
    >


  export type CompanySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    name?: boolean
    logoUrl?: boolean
    profilePicUrl?: boolean
    phone?: boolean
    website?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    zip?: boolean
    contactName?: boolean
    timezone?: boolean
    subscriptionPlan?: boolean
    stripeCustomerId?: boolean
    stripeSubscriptionId?: boolean
    stripeConnectAccountId?: boolean
    trialEndsAt?: boolean
    emailVerified?: boolean
    emailVerificationToken?: boolean
    customEmailDomain?: boolean
    customEmailFromName?: boolean
    resendDomainId?: boolean
    emailDomainVerified?: boolean
    emailDomainDnsRecords?: boolean
    isAdmin?: boolean
    lastLoginAt?: boolean
    createdAt?: boolean
    pricingProfiles?: boolean | Company$pricingProfilesArgs<ExtArgs>
    quoteRequests?: boolean | Company$quoteRequestsArgs<ExtArgs>
    widgetSettings?: boolean | Company$widgetSettingsArgs<ExtArgs>
    webhooks?: boolean | Company$webhooksArgs<ExtArgs>
    shopifyInstalls?: boolean | Company$shopifyInstallsArgs<ExtArgs>
    stopNotes?: boolean | Company$stopNotesArgs<ExtArgs>
    jobs?: boolean | Company$jobsArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["company"]>

  export type CompanySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    name?: boolean
    logoUrl?: boolean
    profilePicUrl?: boolean
    phone?: boolean
    website?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    zip?: boolean
    contactName?: boolean
    timezone?: boolean
    subscriptionPlan?: boolean
    stripeCustomerId?: boolean
    stripeSubscriptionId?: boolean
    stripeConnectAccountId?: boolean
    trialEndsAt?: boolean
    emailVerified?: boolean
    emailVerificationToken?: boolean
    customEmailDomain?: boolean
    customEmailFromName?: boolean
    resendDomainId?: boolean
    emailDomainVerified?: boolean
    emailDomainDnsRecords?: boolean
    isAdmin?: boolean
    lastLoginAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["company"]>

  export type CompanySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    name?: boolean
    logoUrl?: boolean
    profilePicUrl?: boolean
    phone?: boolean
    website?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    zip?: boolean
    contactName?: boolean
    timezone?: boolean
    subscriptionPlan?: boolean
    stripeCustomerId?: boolean
    stripeSubscriptionId?: boolean
    stripeConnectAccountId?: boolean
    trialEndsAt?: boolean
    emailVerified?: boolean
    emailVerificationToken?: boolean
    customEmailDomain?: boolean
    customEmailFromName?: boolean
    resendDomainId?: boolean
    emailDomainVerified?: boolean
    emailDomainDnsRecords?: boolean
    isAdmin?: boolean
    lastLoginAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["company"]>

  export type CompanySelectScalar = {
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    name?: boolean
    logoUrl?: boolean
    profilePicUrl?: boolean
    phone?: boolean
    website?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    zip?: boolean
    contactName?: boolean
    timezone?: boolean
    subscriptionPlan?: boolean
    stripeCustomerId?: boolean
    stripeSubscriptionId?: boolean
    stripeConnectAccountId?: boolean
    trialEndsAt?: boolean
    emailVerified?: boolean
    emailVerificationToken?: boolean
    customEmailDomain?: boolean
    customEmailFromName?: boolean
    resendDomainId?: boolean
    emailDomainVerified?: boolean
    emailDomainDnsRecords?: boolean
    isAdmin?: boolean
    lastLoginAt?: boolean
    createdAt?: boolean
  }

  export type CompanyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "passwordHash" | "name" | "logoUrl" | "profilePicUrl" | "phone" | "website" | "address" | "city" | "state" | "zip" | "contactName" | "timezone" | "subscriptionPlan" | "stripeCustomerId" | "stripeSubscriptionId" | "stripeConnectAccountId" | "trialEndsAt" | "emailVerified" | "emailVerificationToken" | "customEmailDomain" | "customEmailFromName" | "resendDomainId" | "emailDomainVerified" | "emailDomainDnsRecords" | "isAdmin" | "lastLoginAt" | "createdAt", ExtArgs["result"]["company"]>
  export type CompanyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pricingProfiles?: boolean | Company$pricingProfilesArgs<ExtArgs>
    quoteRequests?: boolean | Company$quoteRequestsArgs<ExtArgs>
    widgetSettings?: boolean | Company$widgetSettingsArgs<ExtArgs>
    webhooks?: boolean | Company$webhooksArgs<ExtArgs>
    shopifyInstalls?: boolean | Company$shopifyInstallsArgs<ExtArgs>
    stopNotes?: boolean | Company$stopNotesArgs<ExtArgs>
    jobs?: boolean | Company$jobsArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CompanyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CompanyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CompanyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Company"
    objects: {
      pricingProfiles: Prisma.$PricingProfilePayload<ExtArgs>[]
      quoteRequests: Prisma.$QuoteRequestPayload<ExtArgs>[]
      widgetSettings: Prisma.$WidgetSettingsPayload<ExtArgs>[]
      webhooks: Prisma.$WebhookPayload<ExtArgs>[]
      shopifyInstalls: Prisma.$ShopifyInstallPayload<ExtArgs>[]
      stopNotes: Prisma.$StopNotePayload<ExtArgs>[]
      jobs: Prisma.$JobPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      passwordHash: string
      name: string
      logoUrl: string | null
      profilePicUrl: string | null
      phone: string | null
      website: string | null
      address: string | null
      city: string | null
      state: string | null
      zip: string | null
      contactName: string | null
      timezone: string
      subscriptionPlan: string
      stripeCustomerId: string | null
      stripeSubscriptionId: string | null
      stripeConnectAccountId: string | null
      trialEndsAt: Date | null
      emailVerified: boolean
      emailVerificationToken: string | null
      customEmailDomain: string | null
      customEmailFromName: string | null
      resendDomainId: string | null
      emailDomainVerified: boolean
      emailDomainDnsRecords: Prisma.JsonValue | null
      isAdmin: boolean
      lastLoginAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["company"]>
    composites: {}
  }

  type CompanyGetPayload<S extends boolean | null | undefined | CompanyDefaultArgs> = $Result.GetResult<Prisma.$CompanyPayload, S>

  type CompanyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CompanyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CompanyCountAggregateInputType | true
    }

  export interface CompanyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Company'], meta: { name: 'Company' } }
    /**
     * Find zero or one Company that matches the filter.
     * @param {CompanyFindUniqueArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompanyFindUniqueArgs>(args: SelectSubset<T, CompanyFindUniqueArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Company that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CompanyFindUniqueOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompanyFindUniqueOrThrowArgs>(args: SelectSubset<T, CompanyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Company that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindFirstArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompanyFindFirstArgs>(args?: SelectSubset<T, CompanyFindFirstArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Company that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindFirstOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompanyFindFirstOrThrowArgs>(args?: SelectSubset<T, CompanyFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Companies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Companies
     * const companies = await prisma.company.findMany()
     * 
     * // Get first 10 Companies
     * const companies = await prisma.company.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const companyWithIdOnly = await prisma.company.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CompanyFindManyArgs>(args?: SelectSubset<T, CompanyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Company.
     * @param {CompanyCreateArgs} args - Arguments to create a Company.
     * @example
     * // Create one Company
     * const Company = await prisma.company.create({
     *   data: {
     *     // ... data to create a Company
     *   }
     * })
     * 
     */
    create<T extends CompanyCreateArgs>(args: SelectSubset<T, CompanyCreateArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Companies.
     * @param {CompanyCreateManyArgs} args - Arguments to create many Companies.
     * @example
     * // Create many Companies
     * const company = await prisma.company.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompanyCreateManyArgs>(args?: SelectSubset<T, CompanyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Companies and returns the data saved in the database.
     * @param {CompanyCreateManyAndReturnArgs} args - Arguments to create many Companies.
     * @example
     * // Create many Companies
     * const company = await prisma.company.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Companies and only return the `id`
     * const companyWithIdOnly = await prisma.company.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CompanyCreateManyAndReturnArgs>(args?: SelectSubset<T, CompanyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Company.
     * @param {CompanyDeleteArgs} args - Arguments to delete one Company.
     * @example
     * // Delete one Company
     * const Company = await prisma.company.delete({
     *   where: {
     *     // ... filter to delete one Company
     *   }
     * })
     * 
     */
    delete<T extends CompanyDeleteArgs>(args: SelectSubset<T, CompanyDeleteArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Company.
     * @param {CompanyUpdateArgs} args - Arguments to update one Company.
     * @example
     * // Update one Company
     * const company = await prisma.company.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompanyUpdateArgs>(args: SelectSubset<T, CompanyUpdateArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Companies.
     * @param {CompanyDeleteManyArgs} args - Arguments to filter Companies to delete.
     * @example
     * // Delete a few Companies
     * const { count } = await prisma.company.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompanyDeleteManyArgs>(args?: SelectSubset<T, CompanyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Companies
     * const company = await prisma.company.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompanyUpdateManyArgs>(args: SelectSubset<T, CompanyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Companies and returns the data updated in the database.
     * @param {CompanyUpdateManyAndReturnArgs} args - Arguments to update many Companies.
     * @example
     * // Update many Companies
     * const company = await prisma.company.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Companies and only return the `id`
     * const companyWithIdOnly = await prisma.company.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CompanyUpdateManyAndReturnArgs>(args: SelectSubset<T, CompanyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Company.
     * @param {CompanyUpsertArgs} args - Arguments to update or create a Company.
     * @example
     * // Update or create a Company
     * const company = await prisma.company.upsert({
     *   create: {
     *     // ... data to create a Company
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Company we want to update
     *   }
     * })
     */
    upsert<T extends CompanyUpsertArgs>(args: SelectSubset<T, CompanyUpsertArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyCountArgs} args - Arguments to filter Companies to count.
     * @example
     * // Count the number of Companies
     * const count = await prisma.company.count({
     *   where: {
     *     // ... the filter for the Companies we want to count
     *   }
     * })
    **/
    count<T extends CompanyCountArgs>(
      args?: Subset<T, CompanyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompanyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CompanyAggregateArgs>(args: Subset<T, CompanyAggregateArgs>): Prisma.PrismaPromise<GetCompanyAggregateType<T>>

    /**
     * Group by Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CompanyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompanyGroupByArgs['orderBy'] }
        : { orderBy?: CompanyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CompanyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompanyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Company model
   */
  readonly fields: CompanyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Company.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompanyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    pricingProfiles<T extends Company$pricingProfilesArgs<ExtArgs> = {}>(args?: Subset<T, Company$pricingProfilesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PricingProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    quoteRequests<T extends Company$quoteRequestsArgs<ExtArgs> = {}>(args?: Subset<T, Company$quoteRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuoteRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    widgetSettings<T extends Company$widgetSettingsArgs<ExtArgs> = {}>(args?: Subset<T, Company$widgetSettingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WidgetSettingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    webhooks<T extends Company$webhooksArgs<ExtArgs> = {}>(args?: Subset<T, Company$webhooksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    shopifyInstalls<T extends Company$shopifyInstallsArgs<ExtArgs> = {}>(args?: Subset<T, Company$shopifyInstallsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShopifyInstallPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    stopNotes<T extends Company$stopNotesArgs<ExtArgs> = {}>(args?: Subset<T, Company$stopNotesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StopNotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    jobs<T extends Company$jobsArgs<ExtArgs> = {}>(args?: Subset<T, Company$jobsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Company model
   */
  interface CompanyFieldRefs {
    readonly id: FieldRef<"Company", 'String'>
    readonly email: FieldRef<"Company", 'String'>
    readonly passwordHash: FieldRef<"Company", 'String'>
    readonly name: FieldRef<"Company", 'String'>
    readonly logoUrl: FieldRef<"Company", 'String'>
    readonly profilePicUrl: FieldRef<"Company", 'String'>
    readonly phone: FieldRef<"Company", 'String'>
    readonly website: FieldRef<"Company", 'String'>
    readonly address: FieldRef<"Company", 'String'>
    readonly city: FieldRef<"Company", 'String'>
    readonly state: FieldRef<"Company", 'String'>
    readonly zip: FieldRef<"Company", 'String'>
    readonly contactName: FieldRef<"Company", 'String'>
    readonly timezone: FieldRef<"Company", 'String'>
    readonly subscriptionPlan: FieldRef<"Company", 'String'>
    readonly stripeCustomerId: FieldRef<"Company", 'String'>
    readonly stripeSubscriptionId: FieldRef<"Company", 'String'>
    readonly stripeConnectAccountId: FieldRef<"Company", 'String'>
    readonly trialEndsAt: FieldRef<"Company", 'DateTime'>
    readonly emailVerified: FieldRef<"Company", 'Boolean'>
    readonly emailVerificationToken: FieldRef<"Company", 'String'>
    readonly customEmailDomain: FieldRef<"Company", 'String'>
    readonly customEmailFromName: FieldRef<"Company", 'String'>
    readonly resendDomainId: FieldRef<"Company", 'String'>
    readonly emailDomainVerified: FieldRef<"Company", 'Boolean'>
    readonly emailDomainDnsRecords: FieldRef<"Company", 'Json'>
    readonly isAdmin: FieldRef<"Company", 'Boolean'>
    readonly lastLoginAt: FieldRef<"Company", 'DateTime'>
    readonly createdAt: FieldRef<"Company", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Company findUnique
   */
  export type CompanyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company findUniqueOrThrow
   */
  export type CompanyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company findFirst
   */
  export type CompanyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company findFirstOrThrow
   */
  export type CompanyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company findMany
   */
  export type CompanyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Companies to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company create
   */
  export type CompanyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The data needed to create a Company.
     */
    data: XOR<CompanyCreateInput, CompanyUncheckedCreateInput>
  }

  /**
   * Company createMany
   */
  export type CompanyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Companies.
     */
    data: CompanyCreateManyInput | CompanyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Company createManyAndReturn
   */
  export type CompanyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * The data used to create many Companies.
     */
    data: CompanyCreateManyInput | CompanyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Company update
   */
  export type CompanyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The data needed to update a Company.
     */
    data: XOR<CompanyUpdateInput, CompanyUncheckedUpdateInput>
    /**
     * Choose, which Company to update.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company updateMany
   */
  export type CompanyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Companies.
     */
    data: XOR<CompanyUpdateManyMutationInput, CompanyUncheckedUpdateManyInput>
    /**
     * Filter which Companies to update
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to update.
     */
    limit?: number
  }

  /**
   * Company updateManyAndReturn
   */
  export type CompanyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * The data used to update Companies.
     */
    data: XOR<CompanyUpdateManyMutationInput, CompanyUncheckedUpdateManyInput>
    /**
     * Filter which Companies to update
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to update.
     */
    limit?: number
  }

  /**
   * Company upsert
   */
  export type CompanyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The filter to search for the Company to update in case it exists.
     */
    where: CompanyWhereUniqueInput
    /**
     * In case the Company found by the `where` argument doesn't exist, create a new Company with this data.
     */
    create: XOR<CompanyCreateInput, CompanyUncheckedCreateInput>
    /**
     * In case the Company was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompanyUpdateInput, CompanyUncheckedUpdateInput>
  }

  /**
   * Company delete
   */
  export type CompanyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter which Company to delete.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company deleteMany
   */
  export type CompanyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Companies to delete
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to delete.
     */
    limit?: number
  }

  /**
   * Company.pricingProfiles
   */
  export type Company$pricingProfilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingProfile
     */
    select?: PricingProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PricingProfile
     */
    omit?: PricingProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingProfileInclude<ExtArgs> | null
    where?: PricingProfileWhereInput
    orderBy?: PricingProfileOrderByWithRelationInput | PricingProfileOrderByWithRelationInput[]
    cursor?: PricingProfileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PricingProfileScalarFieldEnum | PricingProfileScalarFieldEnum[]
  }

  /**
   * Company.quoteRequests
   */
  export type Company$quoteRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuoteRequest
     */
    select?: QuoteRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuoteRequest
     */
    omit?: QuoteRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuoteRequestInclude<ExtArgs> | null
    where?: QuoteRequestWhereInput
    orderBy?: QuoteRequestOrderByWithRelationInput | QuoteRequestOrderByWithRelationInput[]
    cursor?: QuoteRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuoteRequestScalarFieldEnum | QuoteRequestScalarFieldEnum[]
  }

  /**
   * Company.widgetSettings
   */
  export type Company$widgetSettingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WidgetSettings
     */
    select?: WidgetSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WidgetSettings
     */
    omit?: WidgetSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WidgetSettingsInclude<ExtArgs> | null
    where?: WidgetSettingsWhereInput
    orderBy?: WidgetSettingsOrderByWithRelationInput | WidgetSettingsOrderByWithRelationInput[]
    cursor?: WidgetSettingsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WidgetSettingsScalarFieldEnum | WidgetSettingsScalarFieldEnum[]
  }

  /**
   * Company.webhooks
   */
  export type Company$webhooksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Webhook
     */
    select?: WebhookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Webhook
     */
    omit?: WebhookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookInclude<ExtArgs> | null
    where?: WebhookWhereInput
    orderBy?: WebhookOrderByWithRelationInput | WebhookOrderByWithRelationInput[]
    cursor?: WebhookWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WebhookScalarFieldEnum | WebhookScalarFieldEnum[]
  }

  /**
   * Company.shopifyInstalls
   */
  export type Company$shopifyInstallsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopifyInstall
     */
    select?: ShopifyInstallSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopifyInstall
     */
    omit?: ShopifyInstallOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopifyInstallInclude<ExtArgs> | null
    where?: ShopifyInstallWhereInput
    orderBy?: ShopifyInstallOrderByWithRelationInput | ShopifyInstallOrderByWithRelationInput[]
    cursor?: ShopifyInstallWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ShopifyInstallScalarFieldEnum | ShopifyInstallScalarFieldEnum[]
  }

  /**
   * Company.stopNotes
   */
  export type Company$stopNotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StopNote
     */
    select?: StopNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StopNote
     */
    omit?: StopNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StopNoteInclude<ExtArgs> | null
    where?: StopNoteWhereInput
    orderBy?: StopNoteOrderByWithRelationInput | StopNoteOrderByWithRelationInput[]
    cursor?: StopNoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StopNoteScalarFieldEnum | StopNoteScalarFieldEnum[]
  }

  /**
   * Company.jobs
   */
  export type Company$jobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    where?: JobWhereInput
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    cursor?: JobWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * Company without action
   */
  export type CompanyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
  }


  /**
   * Model PricingProfile
   */

  export type AggregatePricingProfile = {
    _count: PricingProfileCountAggregateOutputType | null
    _avg: PricingProfileAvgAggregateOutputType | null
    _sum: PricingProfileSumAggregateOutputType | null
    _min: PricingProfileMinAggregateOutputType | null
    _max: PricingProfileMaxAggregateOutputType | null
  }

  export type PricingProfileAvgAggregateOutputType = {
    baseRatePerMile: number | null
    minimumCharge: number | null
    minMilesThreshold: number | null
    weightFee: number | null
    itemCountFee: number | null
    stairsFee: number | null
    insideDeliveryFee: number | null
    addon3Fee: number | null
    afterHoursFee: number | null
    largeItemFee: number | null
  }

  export type PricingProfileSumAggregateOutputType = {
    baseRatePerMile: number | null
    minimumCharge: number | null
    minMilesThreshold: number | null
    weightFee: number | null
    itemCountFee: number | null
    stairsFee: number | null
    insideDeliveryFee: number | null
    addon3Fee: number | null
    afterHoursFee: number | null
    largeItemFee: number | null
  }

  export type PricingProfileMinAggregateOutputType = {
    id: string | null
    companyId: string | null
    widgetSettingsId: string | null
    baseRatePerMile: number | null
    minimumCharge: number | null
    useMinimumCharge: boolean | null
    minMilesThreshold: number | null
    weightFee: number | null
    itemCountFee: number | null
    stairsFee: number | null
    insideDeliveryFee: number | null
    addon3Fee: number | null
    afterHoursFee: number | null
    businessHoursStart: string | null
    businessHoursEnd: string | null
    businessDays: string | null
    largeItemFee: number | null
    largeItemsEnabled: boolean | null
  }

  export type PricingProfileMaxAggregateOutputType = {
    id: string | null
    companyId: string | null
    widgetSettingsId: string | null
    baseRatePerMile: number | null
    minimumCharge: number | null
    useMinimumCharge: boolean | null
    minMilesThreshold: number | null
    weightFee: number | null
    itemCountFee: number | null
    stairsFee: number | null
    insideDeliveryFee: number | null
    addon3Fee: number | null
    afterHoursFee: number | null
    businessHoursStart: string | null
    businessHoursEnd: string | null
    businessDays: string | null
    largeItemFee: number | null
    largeItemsEnabled: boolean | null
  }

  export type PricingProfileCountAggregateOutputType = {
    id: number
    companyId: number
    widgetSettingsId: number
    baseRatePerMile: number
    minimumCharge: number
    useMinimumCharge: number
    minMilesThreshold: number
    weightFee: number
    itemCountFee: number
    stairsFee: number
    insideDeliveryFee: number
    addon3Fee: number
    afterHoursFee: number
    businessHoursStart: number
    businessHoursEnd: number
    businessDays: number
    largeItemFee: number
    largeItemsEnabled: number
    largeItemCategories: number
    _all: number
  }


  export type PricingProfileAvgAggregateInputType = {
    baseRatePerMile?: true
    minimumCharge?: true
    minMilesThreshold?: true
    weightFee?: true
    itemCountFee?: true
    stairsFee?: true
    insideDeliveryFee?: true
    addon3Fee?: true
    afterHoursFee?: true
    largeItemFee?: true
  }

  export type PricingProfileSumAggregateInputType = {
    baseRatePerMile?: true
    minimumCharge?: true
    minMilesThreshold?: true
    weightFee?: true
    itemCountFee?: true
    stairsFee?: true
    insideDeliveryFee?: true
    addon3Fee?: true
    afterHoursFee?: true
    largeItemFee?: true
  }

  export type PricingProfileMinAggregateInputType = {
    id?: true
    companyId?: true
    widgetSettingsId?: true
    baseRatePerMile?: true
    minimumCharge?: true
    useMinimumCharge?: true
    minMilesThreshold?: true
    weightFee?: true
    itemCountFee?: true
    stairsFee?: true
    insideDeliveryFee?: true
    addon3Fee?: true
    afterHoursFee?: true
    businessHoursStart?: true
    businessHoursEnd?: true
    businessDays?: true
    largeItemFee?: true
    largeItemsEnabled?: true
  }

  export type PricingProfileMaxAggregateInputType = {
    id?: true
    companyId?: true
    widgetSettingsId?: true
    baseRatePerMile?: true
    minimumCharge?: true
    useMinimumCharge?: true
    minMilesThreshold?: true
    weightFee?: true
    itemCountFee?: true
    stairsFee?: true
    insideDeliveryFee?: true
    addon3Fee?: true
    afterHoursFee?: true
    businessHoursStart?: true
    businessHoursEnd?: true
    businessDays?: true
    largeItemFee?: true
    largeItemsEnabled?: true
  }

  export type PricingProfileCountAggregateInputType = {
    id?: true
    companyId?: true
    widgetSettingsId?: true
    baseRatePerMile?: true
    minimumCharge?: true
    useMinimumCharge?: true
    minMilesThreshold?: true
    weightFee?: true
    itemCountFee?: true
    stairsFee?: true
    insideDeliveryFee?: true
    addon3Fee?: true
    afterHoursFee?: true
    businessHoursStart?: true
    businessHoursEnd?: true
    businessDays?: true
    largeItemFee?: true
    largeItemsEnabled?: true
    largeItemCategories?: true
    _all?: true
  }

  export type PricingProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PricingProfile to aggregate.
     */
    where?: PricingProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PricingProfiles to fetch.
     */
    orderBy?: PricingProfileOrderByWithRelationInput | PricingProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PricingProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PricingProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PricingProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PricingProfiles
    **/
    _count?: true | PricingProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PricingProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PricingProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PricingProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PricingProfileMaxAggregateInputType
  }

  export type GetPricingProfileAggregateType<T extends PricingProfileAggregateArgs> = {
        [P in keyof T & keyof AggregatePricingProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePricingProfile[P]>
      : GetScalarType<T[P], AggregatePricingProfile[P]>
  }




  export type PricingProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PricingProfileWhereInput
    orderBy?: PricingProfileOrderByWithAggregationInput | PricingProfileOrderByWithAggregationInput[]
    by: PricingProfileScalarFieldEnum[] | PricingProfileScalarFieldEnum
    having?: PricingProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PricingProfileCountAggregateInputType | true
    _avg?: PricingProfileAvgAggregateInputType
    _sum?: PricingProfileSumAggregateInputType
    _min?: PricingProfileMinAggregateInputType
    _max?: PricingProfileMaxAggregateInputType
  }

  export type PricingProfileGroupByOutputType = {
    id: string
    companyId: string
    widgetSettingsId: string | null
    baseRatePerMile: number
    minimumCharge: number
    useMinimumCharge: boolean
    minMilesThreshold: number
    weightFee: number
    itemCountFee: number
    stairsFee: number
    insideDeliveryFee: number
    addon3Fee: number
    afterHoursFee: number
    businessHoursStart: string
    businessHoursEnd: string
    businessDays: string
    largeItemFee: number
    largeItemsEnabled: boolean
    largeItemCategories: JsonValue
    _count: PricingProfileCountAggregateOutputType | null
    _avg: PricingProfileAvgAggregateOutputType | null
    _sum: PricingProfileSumAggregateOutputType | null
    _min: PricingProfileMinAggregateOutputType | null
    _max: PricingProfileMaxAggregateOutputType | null
  }

  type GetPricingProfileGroupByPayload<T extends PricingProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PricingProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PricingProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PricingProfileGroupByOutputType[P]>
            : GetScalarType<T[P], PricingProfileGroupByOutputType[P]>
        }
      >
    >


  export type PricingProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    widgetSettingsId?: boolean
    baseRatePerMile?: boolean
    minimumCharge?: boolean
    useMinimumCharge?: boolean
    minMilesThreshold?: boolean
    weightFee?: boolean
    itemCountFee?: boolean
    stairsFee?: boolean
    insideDeliveryFee?: boolean
    addon3Fee?: boolean
    afterHoursFee?: boolean
    businessHoursStart?: boolean
    businessHoursEnd?: boolean
    businessDays?: boolean
    largeItemFee?: boolean
    largeItemsEnabled?: boolean
    largeItemCategories?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    widgetSettings?: boolean | PricingProfile$widgetSettingsArgs<ExtArgs>
  }, ExtArgs["result"]["pricingProfile"]>

  export type PricingProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    widgetSettingsId?: boolean
    baseRatePerMile?: boolean
    minimumCharge?: boolean
    useMinimumCharge?: boolean
    minMilesThreshold?: boolean
    weightFee?: boolean
    itemCountFee?: boolean
    stairsFee?: boolean
    insideDeliveryFee?: boolean
    addon3Fee?: boolean
    afterHoursFee?: boolean
    businessHoursStart?: boolean
    businessHoursEnd?: boolean
    businessDays?: boolean
    largeItemFee?: boolean
    largeItemsEnabled?: boolean
    largeItemCategories?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    widgetSettings?: boolean | PricingProfile$widgetSettingsArgs<ExtArgs>
  }, ExtArgs["result"]["pricingProfile"]>

  export type PricingProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    widgetSettingsId?: boolean
    baseRatePerMile?: boolean
    minimumCharge?: boolean
    useMinimumCharge?: boolean
    minMilesThreshold?: boolean
    weightFee?: boolean
    itemCountFee?: boolean
    stairsFee?: boolean
    insideDeliveryFee?: boolean
    addon3Fee?: boolean
    afterHoursFee?: boolean
    businessHoursStart?: boolean
    businessHoursEnd?: boolean
    businessDays?: boolean
    largeItemFee?: boolean
    largeItemsEnabled?: boolean
    largeItemCategories?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    widgetSettings?: boolean | PricingProfile$widgetSettingsArgs<ExtArgs>
  }, ExtArgs["result"]["pricingProfile"]>

  export type PricingProfileSelectScalar = {
    id?: boolean
    companyId?: boolean
    widgetSettingsId?: boolean
    baseRatePerMile?: boolean
    minimumCharge?: boolean
    useMinimumCharge?: boolean
    minMilesThreshold?: boolean
    weightFee?: boolean
    itemCountFee?: boolean
    stairsFee?: boolean
    insideDeliveryFee?: boolean
    addon3Fee?: boolean
    afterHoursFee?: boolean
    businessHoursStart?: boolean
    businessHoursEnd?: boolean
    businessDays?: boolean
    largeItemFee?: boolean
    largeItemsEnabled?: boolean
    largeItemCategories?: boolean
  }

  export type PricingProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "companyId" | "widgetSettingsId" | "baseRatePerMile" | "minimumCharge" | "useMinimumCharge" | "minMilesThreshold" | "weightFee" | "itemCountFee" | "stairsFee" | "insideDeliveryFee" | "addon3Fee" | "afterHoursFee" | "businessHoursStart" | "businessHoursEnd" | "businessDays" | "largeItemFee" | "largeItemsEnabled" | "largeItemCategories", ExtArgs["result"]["pricingProfile"]>
  export type PricingProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    widgetSettings?: boolean | PricingProfile$widgetSettingsArgs<ExtArgs>
  }
  export type PricingProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    widgetSettings?: boolean | PricingProfile$widgetSettingsArgs<ExtArgs>
  }
  export type PricingProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    widgetSettings?: boolean | PricingProfile$widgetSettingsArgs<ExtArgs>
  }

  export type $PricingProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PricingProfile"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
      widgetSettings: Prisma.$WidgetSettingsPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      companyId: string
      widgetSettingsId: string | null
      baseRatePerMile: number
      minimumCharge: number
      useMinimumCharge: boolean
      minMilesThreshold: number
      weightFee: number
      itemCountFee: number
      stairsFee: number
      insideDeliveryFee: number
      addon3Fee: number
      afterHoursFee: number
      businessHoursStart: string
      businessHoursEnd: string
      businessDays: string
      largeItemFee: number
      largeItemsEnabled: boolean
      largeItemCategories: Prisma.JsonValue
    }, ExtArgs["result"]["pricingProfile"]>
    composites: {}
  }

  type PricingProfileGetPayload<S extends boolean | null | undefined | PricingProfileDefaultArgs> = $Result.GetResult<Prisma.$PricingProfilePayload, S>

  type PricingProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PricingProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PricingProfileCountAggregateInputType | true
    }

  export interface PricingProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PricingProfile'], meta: { name: 'PricingProfile' } }
    /**
     * Find zero or one PricingProfile that matches the filter.
     * @param {PricingProfileFindUniqueArgs} args - Arguments to find a PricingProfile
     * @example
     * // Get one PricingProfile
     * const pricingProfile = await prisma.pricingProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PricingProfileFindUniqueArgs>(args: SelectSubset<T, PricingProfileFindUniqueArgs<ExtArgs>>): Prisma__PricingProfileClient<$Result.GetResult<Prisma.$PricingProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PricingProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PricingProfileFindUniqueOrThrowArgs} args - Arguments to find a PricingProfile
     * @example
     * // Get one PricingProfile
     * const pricingProfile = await prisma.pricingProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PricingProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, PricingProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PricingProfileClient<$Result.GetResult<Prisma.$PricingProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PricingProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingProfileFindFirstArgs} args - Arguments to find a PricingProfile
     * @example
     * // Get one PricingProfile
     * const pricingProfile = await prisma.pricingProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PricingProfileFindFirstArgs>(args?: SelectSubset<T, PricingProfileFindFirstArgs<ExtArgs>>): Prisma__PricingProfileClient<$Result.GetResult<Prisma.$PricingProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PricingProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingProfileFindFirstOrThrowArgs} args - Arguments to find a PricingProfile
     * @example
     * // Get one PricingProfile
     * const pricingProfile = await prisma.pricingProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PricingProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, PricingProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__PricingProfileClient<$Result.GetResult<Prisma.$PricingProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PricingProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PricingProfiles
     * const pricingProfiles = await prisma.pricingProfile.findMany()
     * 
     * // Get first 10 PricingProfiles
     * const pricingProfiles = await prisma.pricingProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pricingProfileWithIdOnly = await prisma.pricingProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PricingProfileFindManyArgs>(args?: SelectSubset<T, PricingProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PricingProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PricingProfile.
     * @param {PricingProfileCreateArgs} args - Arguments to create a PricingProfile.
     * @example
     * // Create one PricingProfile
     * const PricingProfile = await prisma.pricingProfile.create({
     *   data: {
     *     // ... data to create a PricingProfile
     *   }
     * })
     * 
     */
    create<T extends PricingProfileCreateArgs>(args: SelectSubset<T, PricingProfileCreateArgs<ExtArgs>>): Prisma__PricingProfileClient<$Result.GetResult<Prisma.$PricingProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PricingProfiles.
     * @param {PricingProfileCreateManyArgs} args - Arguments to create many PricingProfiles.
     * @example
     * // Create many PricingProfiles
     * const pricingProfile = await prisma.pricingProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PricingProfileCreateManyArgs>(args?: SelectSubset<T, PricingProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PricingProfiles and returns the data saved in the database.
     * @param {PricingProfileCreateManyAndReturnArgs} args - Arguments to create many PricingProfiles.
     * @example
     * // Create many PricingProfiles
     * const pricingProfile = await prisma.pricingProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PricingProfiles and only return the `id`
     * const pricingProfileWithIdOnly = await prisma.pricingProfile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PricingProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, PricingProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PricingProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PricingProfile.
     * @param {PricingProfileDeleteArgs} args - Arguments to delete one PricingProfile.
     * @example
     * // Delete one PricingProfile
     * const PricingProfile = await prisma.pricingProfile.delete({
     *   where: {
     *     // ... filter to delete one PricingProfile
     *   }
     * })
     * 
     */
    delete<T extends PricingProfileDeleteArgs>(args: SelectSubset<T, PricingProfileDeleteArgs<ExtArgs>>): Prisma__PricingProfileClient<$Result.GetResult<Prisma.$PricingProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PricingProfile.
     * @param {PricingProfileUpdateArgs} args - Arguments to update one PricingProfile.
     * @example
     * // Update one PricingProfile
     * const pricingProfile = await prisma.pricingProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PricingProfileUpdateArgs>(args: SelectSubset<T, PricingProfileUpdateArgs<ExtArgs>>): Prisma__PricingProfileClient<$Result.GetResult<Prisma.$PricingProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PricingProfiles.
     * @param {PricingProfileDeleteManyArgs} args - Arguments to filter PricingProfiles to delete.
     * @example
     * // Delete a few PricingProfiles
     * const { count } = await prisma.pricingProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PricingProfileDeleteManyArgs>(args?: SelectSubset<T, PricingProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PricingProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PricingProfiles
     * const pricingProfile = await prisma.pricingProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PricingProfileUpdateManyArgs>(args: SelectSubset<T, PricingProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PricingProfiles and returns the data updated in the database.
     * @param {PricingProfileUpdateManyAndReturnArgs} args - Arguments to update many PricingProfiles.
     * @example
     * // Update many PricingProfiles
     * const pricingProfile = await prisma.pricingProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PricingProfiles and only return the `id`
     * const pricingProfileWithIdOnly = await prisma.pricingProfile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PricingProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, PricingProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PricingProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PricingProfile.
     * @param {PricingProfileUpsertArgs} args - Arguments to update or create a PricingProfile.
     * @example
     * // Update or create a PricingProfile
     * const pricingProfile = await prisma.pricingProfile.upsert({
     *   create: {
     *     // ... data to create a PricingProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PricingProfile we want to update
     *   }
     * })
     */
    upsert<T extends PricingProfileUpsertArgs>(args: SelectSubset<T, PricingProfileUpsertArgs<ExtArgs>>): Prisma__PricingProfileClient<$Result.GetResult<Prisma.$PricingProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PricingProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingProfileCountArgs} args - Arguments to filter PricingProfiles to count.
     * @example
     * // Count the number of PricingProfiles
     * const count = await prisma.pricingProfile.count({
     *   where: {
     *     // ... the filter for the PricingProfiles we want to count
     *   }
     * })
    **/
    count<T extends PricingProfileCountArgs>(
      args?: Subset<T, PricingProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PricingProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PricingProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PricingProfileAggregateArgs>(args: Subset<T, PricingProfileAggregateArgs>): Prisma.PrismaPromise<GetPricingProfileAggregateType<T>>

    /**
     * Group by PricingProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PricingProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PricingProfileGroupByArgs['orderBy'] }
        : { orderBy?: PricingProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PricingProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPricingProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PricingProfile model
   */
  readonly fields: PricingProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PricingProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PricingProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    widgetSettings<T extends PricingProfile$widgetSettingsArgs<ExtArgs> = {}>(args?: Subset<T, PricingProfile$widgetSettingsArgs<ExtArgs>>): Prisma__WidgetSettingsClient<$Result.GetResult<Prisma.$WidgetSettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PricingProfile model
   */
  interface PricingProfileFieldRefs {
    readonly id: FieldRef<"PricingProfile", 'String'>
    readonly companyId: FieldRef<"PricingProfile", 'String'>
    readonly widgetSettingsId: FieldRef<"PricingProfile", 'String'>
    readonly baseRatePerMile: FieldRef<"PricingProfile", 'Float'>
    readonly minimumCharge: FieldRef<"PricingProfile", 'Float'>
    readonly useMinimumCharge: FieldRef<"PricingProfile", 'Boolean'>
    readonly minMilesThreshold: FieldRef<"PricingProfile", 'Float'>
    readonly weightFee: FieldRef<"PricingProfile", 'Float'>
    readonly itemCountFee: FieldRef<"PricingProfile", 'Float'>
    readonly stairsFee: FieldRef<"PricingProfile", 'Float'>
    readonly insideDeliveryFee: FieldRef<"PricingProfile", 'Float'>
    readonly addon3Fee: FieldRef<"PricingProfile", 'Float'>
    readonly afterHoursFee: FieldRef<"PricingProfile", 'Float'>
    readonly businessHoursStart: FieldRef<"PricingProfile", 'String'>
    readonly businessHoursEnd: FieldRef<"PricingProfile", 'String'>
    readonly businessDays: FieldRef<"PricingProfile", 'String'>
    readonly largeItemFee: FieldRef<"PricingProfile", 'Float'>
    readonly largeItemsEnabled: FieldRef<"PricingProfile", 'Boolean'>
    readonly largeItemCategories: FieldRef<"PricingProfile", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * PricingProfile findUnique
   */
  export type PricingProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingProfile
     */
    select?: PricingProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PricingProfile
     */
    omit?: PricingProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingProfileInclude<ExtArgs> | null
    /**
     * Filter, which PricingProfile to fetch.
     */
    where: PricingProfileWhereUniqueInput
  }

  /**
   * PricingProfile findUniqueOrThrow
   */
  export type PricingProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingProfile
     */
    select?: PricingProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PricingProfile
     */
    omit?: PricingProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingProfileInclude<ExtArgs> | null
    /**
     * Filter, which PricingProfile to fetch.
     */
    where: PricingProfileWhereUniqueInput
  }

  /**
   * PricingProfile findFirst
   */
  export type PricingProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingProfile
     */
    select?: PricingProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PricingProfile
     */
    omit?: PricingProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingProfileInclude<ExtArgs> | null
    /**
     * Filter, which PricingProfile to fetch.
     */
    where?: PricingProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PricingProfiles to fetch.
     */
    orderBy?: PricingProfileOrderByWithRelationInput | PricingProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PricingProfiles.
     */
    cursor?: PricingProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PricingProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PricingProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PricingProfiles.
     */
    distinct?: PricingProfileScalarFieldEnum | PricingProfileScalarFieldEnum[]
  }

  /**
   * PricingProfile findFirstOrThrow
   */
  export type PricingProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingProfile
     */
    select?: PricingProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PricingProfile
     */
    omit?: PricingProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingProfileInclude<ExtArgs> | null
    /**
     * Filter, which PricingProfile to fetch.
     */
    where?: PricingProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PricingProfiles to fetch.
     */
    orderBy?: PricingProfileOrderByWithRelationInput | PricingProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PricingProfiles.
     */
    cursor?: PricingProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PricingProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PricingProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PricingProfiles.
     */
    distinct?: PricingProfileScalarFieldEnum | PricingProfileScalarFieldEnum[]
  }

  /**
   * PricingProfile findMany
   */
  export type PricingProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingProfile
     */
    select?: PricingProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PricingProfile
     */
    omit?: PricingProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingProfileInclude<ExtArgs> | null
    /**
     * Filter, which PricingProfiles to fetch.
     */
    where?: PricingProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PricingProfiles to fetch.
     */
    orderBy?: PricingProfileOrderByWithRelationInput | PricingProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PricingProfiles.
     */
    cursor?: PricingProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PricingProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PricingProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PricingProfiles.
     */
    distinct?: PricingProfileScalarFieldEnum | PricingProfileScalarFieldEnum[]
  }

  /**
   * PricingProfile create
   */
  export type PricingProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingProfile
     */
    select?: PricingProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PricingProfile
     */
    omit?: PricingProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a PricingProfile.
     */
    data: XOR<PricingProfileCreateInput, PricingProfileUncheckedCreateInput>
  }

  /**
   * PricingProfile createMany
   */
  export type PricingProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PricingProfiles.
     */
    data: PricingProfileCreateManyInput | PricingProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PricingProfile createManyAndReturn
   */
  export type PricingProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingProfile
     */
    select?: PricingProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PricingProfile
     */
    omit?: PricingProfileOmit<ExtArgs> | null
    /**
     * The data used to create many PricingProfiles.
     */
    data: PricingProfileCreateManyInput | PricingProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PricingProfile update
   */
  export type PricingProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingProfile
     */
    select?: PricingProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PricingProfile
     */
    omit?: PricingProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a PricingProfile.
     */
    data: XOR<PricingProfileUpdateInput, PricingProfileUncheckedUpdateInput>
    /**
     * Choose, which PricingProfile to update.
     */
    where: PricingProfileWhereUniqueInput
  }

  /**
   * PricingProfile updateMany
   */
  export type PricingProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PricingProfiles.
     */
    data: XOR<PricingProfileUpdateManyMutationInput, PricingProfileUncheckedUpdateManyInput>
    /**
     * Filter which PricingProfiles to update
     */
    where?: PricingProfileWhereInput
    /**
     * Limit how many PricingProfiles to update.
     */
    limit?: number
  }

  /**
   * PricingProfile updateManyAndReturn
   */
  export type PricingProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingProfile
     */
    select?: PricingProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PricingProfile
     */
    omit?: PricingProfileOmit<ExtArgs> | null
    /**
     * The data used to update PricingProfiles.
     */
    data: XOR<PricingProfileUpdateManyMutationInput, PricingProfileUncheckedUpdateManyInput>
    /**
     * Filter which PricingProfiles to update
     */
    where?: PricingProfileWhereInput
    /**
     * Limit how many PricingProfiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingProfileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PricingProfile upsert
   */
  export type PricingProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingProfile
     */
    select?: PricingProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PricingProfile
     */
    omit?: PricingProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the PricingProfile to update in case it exists.
     */
    where: PricingProfileWhereUniqueInput
    /**
     * In case the PricingProfile found by the `where` argument doesn't exist, create a new PricingProfile with this data.
     */
    create: XOR<PricingProfileCreateInput, PricingProfileUncheckedCreateInput>
    /**
     * In case the PricingProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PricingProfileUpdateInput, PricingProfileUncheckedUpdateInput>
  }

  /**
   * PricingProfile delete
   */
  export type PricingProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingProfile
     */
    select?: PricingProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PricingProfile
     */
    omit?: PricingProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingProfileInclude<ExtArgs> | null
    /**
     * Filter which PricingProfile to delete.
     */
    where: PricingProfileWhereUniqueInput
  }

  /**
   * PricingProfile deleteMany
   */
  export type PricingProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PricingProfiles to delete
     */
    where?: PricingProfileWhereInput
    /**
     * Limit how many PricingProfiles to delete.
     */
    limit?: number
  }

  /**
   * PricingProfile.widgetSettings
   */
  export type PricingProfile$widgetSettingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WidgetSettings
     */
    select?: WidgetSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WidgetSettings
     */
    omit?: WidgetSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WidgetSettingsInclude<ExtArgs> | null
    where?: WidgetSettingsWhereInput
  }

  /**
   * PricingProfile without action
   */
  export type PricingProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingProfile
     */
    select?: PricingProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PricingProfile
     */
    omit?: PricingProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingProfileInclude<ExtArgs> | null
  }


  /**
   * Model WidgetSettings
   */

  export type AggregateWidgetSettings = {
    _count: WidgetSettingsCountAggregateOutputType | null
    _avg: WidgetSettingsAvgAggregateOutputType | null
    _sum: WidgetSettingsSumAggregateOutputType | null
    _min: WidgetSettingsMinAggregateOutputType | null
    _max: WidgetSettingsMaxAggregateOutputType | null
  }

  export type WidgetSettingsAvgAggregateOutputType = {
    pricePerVehicle: number | null
  }

  export type WidgetSettingsSumAggregateOutputType = {
    pricePerVehicle: number | null
  }

  export type WidgetSettingsMinAggregateOutputType = {
    id: string | null
    companyId: string | null
    name: string | null
    logoUrl: string | null
    showWeight: boolean | null
    showItemCount: boolean | null
    showExtras: boolean | null
    insideDeliveryLabel: string | null
    addon3Label: string | null
    primaryColor: string | null
    buttonText: string | null
    headerText: string | null
    disclaimerText: string | null
    companyNameText: string | null
    companyNameFont: string | null
    backgroundImageUrl: string | null
    mapLayout: string | null
    websiteUrl: string | null
    paymentsEnabled: boolean | null
    showVehicles: boolean | null
    pricePerVehicle: number | null
    showAwb: boolean | null
    geoFencingEnabled: boolean | null
  }

  export type WidgetSettingsMaxAggregateOutputType = {
    id: string | null
    companyId: string | null
    name: string | null
    logoUrl: string | null
    showWeight: boolean | null
    showItemCount: boolean | null
    showExtras: boolean | null
    insideDeliveryLabel: string | null
    addon3Label: string | null
    primaryColor: string | null
    buttonText: string | null
    headerText: string | null
    disclaimerText: string | null
    companyNameText: string | null
    companyNameFont: string | null
    backgroundImageUrl: string | null
    mapLayout: string | null
    websiteUrl: string | null
    paymentsEnabled: boolean | null
    showVehicles: boolean | null
    pricePerVehicle: number | null
    showAwb: boolean | null
    geoFencingEnabled: boolean | null
  }

  export type WidgetSettingsCountAggregateOutputType = {
    id: number
    companyId: number
    name: number
    logoUrl: number
    showWeight: number
    showItemCount: number
    showExtras: number
    insideDeliveryLabel: number
    addon3Label: number
    primaryColor: number
    buttonText: number
    headerText: number
    disclaimerText: number
    companyNameText: number
    companyNameFont: number
    backgroundImageUrl: number
    mapLayout: number
    websiteUrl: number
    paymentsEnabled: number
    showVehicles: number
    pricePerVehicle: number
    showAwb: number
    geoFencingEnabled: number
    serviceZips: number
    _all: number
  }


  export type WidgetSettingsAvgAggregateInputType = {
    pricePerVehicle?: true
  }

  export type WidgetSettingsSumAggregateInputType = {
    pricePerVehicle?: true
  }

  export type WidgetSettingsMinAggregateInputType = {
    id?: true
    companyId?: true
    name?: true
    logoUrl?: true
    showWeight?: true
    showItemCount?: true
    showExtras?: true
    insideDeliveryLabel?: true
    addon3Label?: true
    primaryColor?: true
    buttonText?: true
    headerText?: true
    disclaimerText?: true
    companyNameText?: true
    companyNameFont?: true
    backgroundImageUrl?: true
    mapLayout?: true
    websiteUrl?: true
    paymentsEnabled?: true
    showVehicles?: true
    pricePerVehicle?: true
    showAwb?: true
    geoFencingEnabled?: true
  }

  export type WidgetSettingsMaxAggregateInputType = {
    id?: true
    companyId?: true
    name?: true
    logoUrl?: true
    showWeight?: true
    showItemCount?: true
    showExtras?: true
    insideDeliveryLabel?: true
    addon3Label?: true
    primaryColor?: true
    buttonText?: true
    headerText?: true
    disclaimerText?: true
    companyNameText?: true
    companyNameFont?: true
    backgroundImageUrl?: true
    mapLayout?: true
    websiteUrl?: true
    paymentsEnabled?: true
    showVehicles?: true
    pricePerVehicle?: true
    showAwb?: true
    geoFencingEnabled?: true
  }

  export type WidgetSettingsCountAggregateInputType = {
    id?: true
    companyId?: true
    name?: true
    logoUrl?: true
    showWeight?: true
    showItemCount?: true
    showExtras?: true
    insideDeliveryLabel?: true
    addon3Label?: true
    primaryColor?: true
    buttonText?: true
    headerText?: true
    disclaimerText?: true
    companyNameText?: true
    companyNameFont?: true
    backgroundImageUrl?: true
    mapLayout?: true
    websiteUrl?: true
    paymentsEnabled?: true
    showVehicles?: true
    pricePerVehicle?: true
    showAwb?: true
    geoFencingEnabled?: true
    serviceZips?: true
    _all?: true
  }

  export type WidgetSettingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WidgetSettings to aggregate.
     */
    where?: WidgetSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WidgetSettings to fetch.
     */
    orderBy?: WidgetSettingsOrderByWithRelationInput | WidgetSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WidgetSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WidgetSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WidgetSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WidgetSettings
    **/
    _count?: true | WidgetSettingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WidgetSettingsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WidgetSettingsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WidgetSettingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WidgetSettingsMaxAggregateInputType
  }

  export type GetWidgetSettingsAggregateType<T extends WidgetSettingsAggregateArgs> = {
        [P in keyof T & keyof AggregateWidgetSettings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWidgetSettings[P]>
      : GetScalarType<T[P], AggregateWidgetSettings[P]>
  }




  export type WidgetSettingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WidgetSettingsWhereInput
    orderBy?: WidgetSettingsOrderByWithAggregationInput | WidgetSettingsOrderByWithAggregationInput[]
    by: WidgetSettingsScalarFieldEnum[] | WidgetSettingsScalarFieldEnum
    having?: WidgetSettingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WidgetSettingsCountAggregateInputType | true
    _avg?: WidgetSettingsAvgAggregateInputType
    _sum?: WidgetSettingsSumAggregateInputType
    _min?: WidgetSettingsMinAggregateInputType
    _max?: WidgetSettingsMaxAggregateInputType
  }

  export type WidgetSettingsGroupByOutputType = {
    id: string
    companyId: string
    name: string
    logoUrl: string | null
    showWeight: boolean
    showItemCount: boolean
    showExtras: boolean
    insideDeliveryLabel: string
    addon3Label: string
    primaryColor: string
    buttonText: string
    headerText: string
    disclaimerText: string
    companyNameText: string | null
    companyNameFont: string
    backgroundImageUrl: string | null
    mapLayout: string
    websiteUrl: string | null
    paymentsEnabled: boolean
    showVehicles: boolean
    pricePerVehicle: number
    showAwb: boolean
    geoFencingEnabled: boolean
    serviceZips: string[]
    _count: WidgetSettingsCountAggregateOutputType | null
    _avg: WidgetSettingsAvgAggregateOutputType | null
    _sum: WidgetSettingsSumAggregateOutputType | null
    _min: WidgetSettingsMinAggregateOutputType | null
    _max: WidgetSettingsMaxAggregateOutputType | null
  }

  type GetWidgetSettingsGroupByPayload<T extends WidgetSettingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WidgetSettingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WidgetSettingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WidgetSettingsGroupByOutputType[P]>
            : GetScalarType<T[P], WidgetSettingsGroupByOutputType[P]>
        }
      >
    >


  export type WidgetSettingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    name?: boolean
    logoUrl?: boolean
    showWeight?: boolean
    showItemCount?: boolean
    showExtras?: boolean
    insideDeliveryLabel?: boolean
    addon3Label?: boolean
    primaryColor?: boolean
    buttonText?: boolean
    headerText?: boolean
    disclaimerText?: boolean
    companyNameText?: boolean
    companyNameFont?: boolean
    backgroundImageUrl?: boolean
    mapLayout?: boolean
    websiteUrl?: boolean
    paymentsEnabled?: boolean
    showVehicles?: boolean
    pricePerVehicle?: boolean
    showAwb?: boolean
    geoFencingEnabled?: boolean
    serviceZips?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    pricingProfile?: boolean | WidgetSettings$pricingProfileArgs<ExtArgs>
  }, ExtArgs["result"]["widgetSettings"]>

  export type WidgetSettingsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    name?: boolean
    logoUrl?: boolean
    showWeight?: boolean
    showItemCount?: boolean
    showExtras?: boolean
    insideDeliveryLabel?: boolean
    addon3Label?: boolean
    primaryColor?: boolean
    buttonText?: boolean
    headerText?: boolean
    disclaimerText?: boolean
    companyNameText?: boolean
    companyNameFont?: boolean
    backgroundImageUrl?: boolean
    mapLayout?: boolean
    websiteUrl?: boolean
    paymentsEnabled?: boolean
    showVehicles?: boolean
    pricePerVehicle?: boolean
    showAwb?: boolean
    geoFencingEnabled?: boolean
    serviceZips?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["widgetSettings"]>

  export type WidgetSettingsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    name?: boolean
    logoUrl?: boolean
    showWeight?: boolean
    showItemCount?: boolean
    showExtras?: boolean
    insideDeliveryLabel?: boolean
    addon3Label?: boolean
    primaryColor?: boolean
    buttonText?: boolean
    headerText?: boolean
    disclaimerText?: boolean
    companyNameText?: boolean
    companyNameFont?: boolean
    backgroundImageUrl?: boolean
    mapLayout?: boolean
    websiteUrl?: boolean
    paymentsEnabled?: boolean
    showVehicles?: boolean
    pricePerVehicle?: boolean
    showAwb?: boolean
    geoFencingEnabled?: boolean
    serviceZips?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["widgetSettings"]>

  export type WidgetSettingsSelectScalar = {
    id?: boolean
    companyId?: boolean
    name?: boolean
    logoUrl?: boolean
    showWeight?: boolean
    showItemCount?: boolean
    showExtras?: boolean
    insideDeliveryLabel?: boolean
    addon3Label?: boolean
    primaryColor?: boolean
    buttonText?: boolean
    headerText?: boolean
    disclaimerText?: boolean
    companyNameText?: boolean
    companyNameFont?: boolean
    backgroundImageUrl?: boolean
    mapLayout?: boolean
    websiteUrl?: boolean
    paymentsEnabled?: boolean
    showVehicles?: boolean
    pricePerVehicle?: boolean
    showAwb?: boolean
    geoFencingEnabled?: boolean
    serviceZips?: boolean
  }

  export type WidgetSettingsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "companyId" | "name" | "logoUrl" | "showWeight" | "showItemCount" | "showExtras" | "insideDeliveryLabel" | "addon3Label" | "primaryColor" | "buttonText" | "headerText" | "disclaimerText" | "companyNameText" | "companyNameFont" | "backgroundImageUrl" | "mapLayout" | "websiteUrl" | "paymentsEnabled" | "showVehicles" | "pricePerVehicle" | "showAwb" | "geoFencingEnabled" | "serviceZips", ExtArgs["result"]["widgetSettings"]>
  export type WidgetSettingsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    pricingProfile?: boolean | WidgetSettings$pricingProfileArgs<ExtArgs>
  }
  export type WidgetSettingsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type WidgetSettingsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $WidgetSettingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WidgetSettings"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
      pricingProfile: Prisma.$PricingProfilePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      companyId: string
      name: string
      logoUrl: string | null
      showWeight: boolean
      showItemCount: boolean
      showExtras: boolean
      insideDeliveryLabel: string
      addon3Label: string
      primaryColor: string
      buttonText: string
      headerText: string
      disclaimerText: string
      companyNameText: string | null
      companyNameFont: string
      backgroundImageUrl: string | null
      mapLayout: string
      websiteUrl: string | null
      paymentsEnabled: boolean
      showVehicles: boolean
      pricePerVehicle: number
      showAwb: boolean
      geoFencingEnabled: boolean
      serviceZips: string[]
    }, ExtArgs["result"]["widgetSettings"]>
    composites: {}
  }

  type WidgetSettingsGetPayload<S extends boolean | null | undefined | WidgetSettingsDefaultArgs> = $Result.GetResult<Prisma.$WidgetSettingsPayload, S>

  type WidgetSettingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WidgetSettingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WidgetSettingsCountAggregateInputType | true
    }

  export interface WidgetSettingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WidgetSettings'], meta: { name: 'WidgetSettings' } }
    /**
     * Find zero or one WidgetSettings that matches the filter.
     * @param {WidgetSettingsFindUniqueArgs} args - Arguments to find a WidgetSettings
     * @example
     * // Get one WidgetSettings
     * const widgetSettings = await prisma.widgetSettings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WidgetSettingsFindUniqueArgs>(args: SelectSubset<T, WidgetSettingsFindUniqueArgs<ExtArgs>>): Prisma__WidgetSettingsClient<$Result.GetResult<Prisma.$WidgetSettingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WidgetSettings that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WidgetSettingsFindUniqueOrThrowArgs} args - Arguments to find a WidgetSettings
     * @example
     * // Get one WidgetSettings
     * const widgetSettings = await prisma.widgetSettings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WidgetSettingsFindUniqueOrThrowArgs>(args: SelectSubset<T, WidgetSettingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WidgetSettingsClient<$Result.GetResult<Prisma.$WidgetSettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WidgetSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WidgetSettingsFindFirstArgs} args - Arguments to find a WidgetSettings
     * @example
     * // Get one WidgetSettings
     * const widgetSettings = await prisma.widgetSettings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WidgetSettingsFindFirstArgs>(args?: SelectSubset<T, WidgetSettingsFindFirstArgs<ExtArgs>>): Prisma__WidgetSettingsClient<$Result.GetResult<Prisma.$WidgetSettingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WidgetSettings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WidgetSettingsFindFirstOrThrowArgs} args - Arguments to find a WidgetSettings
     * @example
     * // Get one WidgetSettings
     * const widgetSettings = await prisma.widgetSettings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WidgetSettingsFindFirstOrThrowArgs>(args?: SelectSubset<T, WidgetSettingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__WidgetSettingsClient<$Result.GetResult<Prisma.$WidgetSettingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WidgetSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WidgetSettingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WidgetSettings
     * const widgetSettings = await prisma.widgetSettings.findMany()
     * 
     * // Get first 10 WidgetSettings
     * const widgetSettings = await prisma.widgetSettings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const widgetSettingsWithIdOnly = await prisma.widgetSettings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WidgetSettingsFindManyArgs>(args?: SelectSubset<T, WidgetSettingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WidgetSettingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WidgetSettings.
     * @param {WidgetSettingsCreateArgs} args - Arguments to create a WidgetSettings.
     * @example
     * // Create one WidgetSettings
     * const WidgetSettings = await prisma.widgetSettings.create({
     *   data: {
     *     // ... data to create a WidgetSettings
     *   }
     * })
     * 
     */
    create<T extends WidgetSettingsCreateArgs>(args: SelectSubset<T, WidgetSettingsCreateArgs<ExtArgs>>): Prisma__WidgetSettingsClient<$Result.GetResult<Prisma.$WidgetSettingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WidgetSettings.
     * @param {WidgetSettingsCreateManyArgs} args - Arguments to create many WidgetSettings.
     * @example
     * // Create many WidgetSettings
     * const widgetSettings = await prisma.widgetSettings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WidgetSettingsCreateManyArgs>(args?: SelectSubset<T, WidgetSettingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WidgetSettings and returns the data saved in the database.
     * @param {WidgetSettingsCreateManyAndReturnArgs} args - Arguments to create many WidgetSettings.
     * @example
     * // Create many WidgetSettings
     * const widgetSettings = await prisma.widgetSettings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WidgetSettings and only return the `id`
     * const widgetSettingsWithIdOnly = await prisma.widgetSettings.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WidgetSettingsCreateManyAndReturnArgs>(args?: SelectSubset<T, WidgetSettingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WidgetSettingsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WidgetSettings.
     * @param {WidgetSettingsDeleteArgs} args - Arguments to delete one WidgetSettings.
     * @example
     * // Delete one WidgetSettings
     * const WidgetSettings = await prisma.widgetSettings.delete({
     *   where: {
     *     // ... filter to delete one WidgetSettings
     *   }
     * })
     * 
     */
    delete<T extends WidgetSettingsDeleteArgs>(args: SelectSubset<T, WidgetSettingsDeleteArgs<ExtArgs>>): Prisma__WidgetSettingsClient<$Result.GetResult<Prisma.$WidgetSettingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WidgetSettings.
     * @param {WidgetSettingsUpdateArgs} args - Arguments to update one WidgetSettings.
     * @example
     * // Update one WidgetSettings
     * const widgetSettings = await prisma.widgetSettings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WidgetSettingsUpdateArgs>(args: SelectSubset<T, WidgetSettingsUpdateArgs<ExtArgs>>): Prisma__WidgetSettingsClient<$Result.GetResult<Prisma.$WidgetSettingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WidgetSettings.
     * @param {WidgetSettingsDeleteManyArgs} args - Arguments to filter WidgetSettings to delete.
     * @example
     * // Delete a few WidgetSettings
     * const { count } = await prisma.widgetSettings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WidgetSettingsDeleteManyArgs>(args?: SelectSubset<T, WidgetSettingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WidgetSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WidgetSettingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WidgetSettings
     * const widgetSettings = await prisma.widgetSettings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WidgetSettingsUpdateManyArgs>(args: SelectSubset<T, WidgetSettingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WidgetSettings and returns the data updated in the database.
     * @param {WidgetSettingsUpdateManyAndReturnArgs} args - Arguments to update many WidgetSettings.
     * @example
     * // Update many WidgetSettings
     * const widgetSettings = await prisma.widgetSettings.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WidgetSettings and only return the `id`
     * const widgetSettingsWithIdOnly = await prisma.widgetSettings.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WidgetSettingsUpdateManyAndReturnArgs>(args: SelectSubset<T, WidgetSettingsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WidgetSettingsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WidgetSettings.
     * @param {WidgetSettingsUpsertArgs} args - Arguments to update or create a WidgetSettings.
     * @example
     * // Update or create a WidgetSettings
     * const widgetSettings = await prisma.widgetSettings.upsert({
     *   create: {
     *     // ... data to create a WidgetSettings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WidgetSettings we want to update
     *   }
     * })
     */
    upsert<T extends WidgetSettingsUpsertArgs>(args: SelectSubset<T, WidgetSettingsUpsertArgs<ExtArgs>>): Prisma__WidgetSettingsClient<$Result.GetResult<Prisma.$WidgetSettingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WidgetSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WidgetSettingsCountArgs} args - Arguments to filter WidgetSettings to count.
     * @example
     * // Count the number of WidgetSettings
     * const count = await prisma.widgetSettings.count({
     *   where: {
     *     // ... the filter for the WidgetSettings we want to count
     *   }
     * })
    **/
    count<T extends WidgetSettingsCountArgs>(
      args?: Subset<T, WidgetSettingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WidgetSettingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WidgetSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WidgetSettingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WidgetSettingsAggregateArgs>(args: Subset<T, WidgetSettingsAggregateArgs>): Prisma.PrismaPromise<GetWidgetSettingsAggregateType<T>>

    /**
     * Group by WidgetSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WidgetSettingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WidgetSettingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WidgetSettingsGroupByArgs['orderBy'] }
        : { orderBy?: WidgetSettingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WidgetSettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWidgetSettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WidgetSettings model
   */
  readonly fields: WidgetSettingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WidgetSettings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WidgetSettingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    pricingProfile<T extends WidgetSettings$pricingProfileArgs<ExtArgs> = {}>(args?: Subset<T, WidgetSettings$pricingProfileArgs<ExtArgs>>): Prisma__PricingProfileClient<$Result.GetResult<Prisma.$PricingProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WidgetSettings model
   */
  interface WidgetSettingsFieldRefs {
    readonly id: FieldRef<"WidgetSettings", 'String'>
    readonly companyId: FieldRef<"WidgetSettings", 'String'>
    readonly name: FieldRef<"WidgetSettings", 'String'>
    readonly logoUrl: FieldRef<"WidgetSettings", 'String'>
    readonly showWeight: FieldRef<"WidgetSettings", 'Boolean'>
    readonly showItemCount: FieldRef<"WidgetSettings", 'Boolean'>
    readonly showExtras: FieldRef<"WidgetSettings", 'Boolean'>
    readonly insideDeliveryLabel: FieldRef<"WidgetSettings", 'String'>
    readonly addon3Label: FieldRef<"WidgetSettings", 'String'>
    readonly primaryColor: FieldRef<"WidgetSettings", 'String'>
    readonly buttonText: FieldRef<"WidgetSettings", 'String'>
    readonly headerText: FieldRef<"WidgetSettings", 'String'>
    readonly disclaimerText: FieldRef<"WidgetSettings", 'String'>
    readonly companyNameText: FieldRef<"WidgetSettings", 'String'>
    readonly companyNameFont: FieldRef<"WidgetSettings", 'String'>
    readonly backgroundImageUrl: FieldRef<"WidgetSettings", 'String'>
    readonly mapLayout: FieldRef<"WidgetSettings", 'String'>
    readonly websiteUrl: FieldRef<"WidgetSettings", 'String'>
    readonly paymentsEnabled: FieldRef<"WidgetSettings", 'Boolean'>
    readonly showVehicles: FieldRef<"WidgetSettings", 'Boolean'>
    readonly pricePerVehicle: FieldRef<"WidgetSettings", 'Float'>
    readonly showAwb: FieldRef<"WidgetSettings", 'Boolean'>
    readonly geoFencingEnabled: FieldRef<"WidgetSettings", 'Boolean'>
    readonly serviceZips: FieldRef<"WidgetSettings", 'String[]'>
  }
    

  // Custom InputTypes
  /**
   * WidgetSettings findUnique
   */
  export type WidgetSettingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WidgetSettings
     */
    select?: WidgetSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WidgetSettings
     */
    omit?: WidgetSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WidgetSettingsInclude<ExtArgs> | null
    /**
     * Filter, which WidgetSettings to fetch.
     */
    where: WidgetSettingsWhereUniqueInput
  }

  /**
   * WidgetSettings findUniqueOrThrow
   */
  export type WidgetSettingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WidgetSettings
     */
    select?: WidgetSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WidgetSettings
     */
    omit?: WidgetSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WidgetSettingsInclude<ExtArgs> | null
    /**
     * Filter, which WidgetSettings to fetch.
     */
    where: WidgetSettingsWhereUniqueInput
  }

  /**
   * WidgetSettings findFirst
   */
  export type WidgetSettingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WidgetSettings
     */
    select?: WidgetSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WidgetSettings
     */
    omit?: WidgetSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WidgetSettingsInclude<ExtArgs> | null
    /**
     * Filter, which WidgetSettings to fetch.
     */
    where?: WidgetSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WidgetSettings to fetch.
     */
    orderBy?: WidgetSettingsOrderByWithRelationInput | WidgetSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WidgetSettings.
     */
    cursor?: WidgetSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WidgetSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WidgetSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WidgetSettings.
     */
    distinct?: WidgetSettingsScalarFieldEnum | WidgetSettingsScalarFieldEnum[]
  }

  /**
   * WidgetSettings findFirstOrThrow
   */
  export type WidgetSettingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WidgetSettings
     */
    select?: WidgetSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WidgetSettings
     */
    omit?: WidgetSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WidgetSettingsInclude<ExtArgs> | null
    /**
     * Filter, which WidgetSettings to fetch.
     */
    where?: WidgetSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WidgetSettings to fetch.
     */
    orderBy?: WidgetSettingsOrderByWithRelationInput | WidgetSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WidgetSettings.
     */
    cursor?: WidgetSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WidgetSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WidgetSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WidgetSettings.
     */
    distinct?: WidgetSettingsScalarFieldEnum | WidgetSettingsScalarFieldEnum[]
  }

  /**
   * WidgetSettings findMany
   */
  export type WidgetSettingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WidgetSettings
     */
    select?: WidgetSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WidgetSettings
     */
    omit?: WidgetSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WidgetSettingsInclude<ExtArgs> | null
    /**
     * Filter, which WidgetSettings to fetch.
     */
    where?: WidgetSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WidgetSettings to fetch.
     */
    orderBy?: WidgetSettingsOrderByWithRelationInput | WidgetSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WidgetSettings.
     */
    cursor?: WidgetSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WidgetSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WidgetSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WidgetSettings.
     */
    distinct?: WidgetSettingsScalarFieldEnum | WidgetSettingsScalarFieldEnum[]
  }

  /**
   * WidgetSettings create
   */
  export type WidgetSettingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WidgetSettings
     */
    select?: WidgetSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WidgetSettings
     */
    omit?: WidgetSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WidgetSettingsInclude<ExtArgs> | null
    /**
     * The data needed to create a WidgetSettings.
     */
    data: XOR<WidgetSettingsCreateInput, WidgetSettingsUncheckedCreateInput>
  }

  /**
   * WidgetSettings createMany
   */
  export type WidgetSettingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WidgetSettings.
     */
    data: WidgetSettingsCreateManyInput | WidgetSettingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WidgetSettings createManyAndReturn
   */
  export type WidgetSettingsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WidgetSettings
     */
    select?: WidgetSettingsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WidgetSettings
     */
    omit?: WidgetSettingsOmit<ExtArgs> | null
    /**
     * The data used to create many WidgetSettings.
     */
    data: WidgetSettingsCreateManyInput | WidgetSettingsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WidgetSettingsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WidgetSettings update
   */
  export type WidgetSettingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WidgetSettings
     */
    select?: WidgetSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WidgetSettings
     */
    omit?: WidgetSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WidgetSettingsInclude<ExtArgs> | null
    /**
     * The data needed to update a WidgetSettings.
     */
    data: XOR<WidgetSettingsUpdateInput, WidgetSettingsUncheckedUpdateInput>
    /**
     * Choose, which WidgetSettings to update.
     */
    where: WidgetSettingsWhereUniqueInput
  }

  /**
   * WidgetSettings updateMany
   */
  export type WidgetSettingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WidgetSettings.
     */
    data: XOR<WidgetSettingsUpdateManyMutationInput, WidgetSettingsUncheckedUpdateManyInput>
    /**
     * Filter which WidgetSettings to update
     */
    where?: WidgetSettingsWhereInput
    /**
     * Limit how many WidgetSettings to update.
     */
    limit?: number
  }

  /**
   * WidgetSettings updateManyAndReturn
   */
  export type WidgetSettingsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WidgetSettings
     */
    select?: WidgetSettingsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WidgetSettings
     */
    omit?: WidgetSettingsOmit<ExtArgs> | null
    /**
     * The data used to update WidgetSettings.
     */
    data: XOR<WidgetSettingsUpdateManyMutationInput, WidgetSettingsUncheckedUpdateManyInput>
    /**
     * Filter which WidgetSettings to update
     */
    where?: WidgetSettingsWhereInput
    /**
     * Limit how many WidgetSettings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WidgetSettingsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WidgetSettings upsert
   */
  export type WidgetSettingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WidgetSettings
     */
    select?: WidgetSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WidgetSettings
     */
    omit?: WidgetSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WidgetSettingsInclude<ExtArgs> | null
    /**
     * The filter to search for the WidgetSettings to update in case it exists.
     */
    where: WidgetSettingsWhereUniqueInput
    /**
     * In case the WidgetSettings found by the `where` argument doesn't exist, create a new WidgetSettings with this data.
     */
    create: XOR<WidgetSettingsCreateInput, WidgetSettingsUncheckedCreateInput>
    /**
     * In case the WidgetSettings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WidgetSettingsUpdateInput, WidgetSettingsUncheckedUpdateInput>
  }

  /**
   * WidgetSettings delete
   */
  export type WidgetSettingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WidgetSettings
     */
    select?: WidgetSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WidgetSettings
     */
    omit?: WidgetSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WidgetSettingsInclude<ExtArgs> | null
    /**
     * Filter which WidgetSettings to delete.
     */
    where: WidgetSettingsWhereUniqueInput
  }

  /**
   * WidgetSettings deleteMany
   */
  export type WidgetSettingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WidgetSettings to delete
     */
    where?: WidgetSettingsWhereInput
    /**
     * Limit how many WidgetSettings to delete.
     */
    limit?: number
  }

  /**
   * WidgetSettings.pricingProfile
   */
  export type WidgetSettings$pricingProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingProfile
     */
    select?: PricingProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PricingProfile
     */
    omit?: PricingProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingProfileInclude<ExtArgs> | null
    where?: PricingProfileWhereInput
  }

  /**
   * WidgetSettings without action
   */
  export type WidgetSettingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WidgetSettings
     */
    select?: WidgetSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WidgetSettings
     */
    omit?: WidgetSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WidgetSettingsInclude<ExtArgs> | null
  }


  /**
   * Model QuoteRequest
   */

  export type AggregateQuoteRequest = {
    _count: QuoteRequestCountAggregateOutputType | null
    _avg: QuoteRequestAvgAggregateOutputType | null
    _sum: QuoteRequestSumAggregateOutputType | null
    _min: QuoteRequestMinAggregateOutputType | null
    _max: QuoteRequestMaxAggregateOutputType | null
  }

  export type QuoteRequestAvgAggregateOutputType = {
    distanceMiles: number | null
    estimatedPrice: number | null
    vehicleCount: number | null
  }

  export type QuoteRequestSumAggregateOutputType = {
    distanceMiles: number | null
    estimatedPrice: number | null
    vehicleCount: number | null
  }

  export type QuoteRequestMinAggregateOutputType = {
    id: string | null
    companyId: string | null
    customerName: string | null
    customerEmail: string | null
    customerPhone: string | null
    pickupZip: string | null
    dropoffZip: string | null
    distanceMiles: number | null
    serviceType: string | null
    packageSize: string | null
    packageWeight: string | null
    selectedExtras: string | null
    status: string | null
    estimatedPrice: number | null
    vehicleCount: number | null
    awbNumber: string | null
    paymentStatus: string | null
    stripePaymentIntentId: string | null
    internalNotes: string | null
    paidAt: Date | null
    createdAt: Date | null
  }

  export type QuoteRequestMaxAggregateOutputType = {
    id: string | null
    companyId: string | null
    customerName: string | null
    customerEmail: string | null
    customerPhone: string | null
    pickupZip: string | null
    dropoffZip: string | null
    distanceMiles: number | null
    serviceType: string | null
    packageSize: string | null
    packageWeight: string | null
    selectedExtras: string | null
    status: string | null
    estimatedPrice: number | null
    vehicleCount: number | null
    awbNumber: string | null
    paymentStatus: string | null
    stripePaymentIntentId: string | null
    internalNotes: string | null
    paidAt: Date | null
    createdAt: Date | null
  }

  export type QuoteRequestCountAggregateOutputType = {
    id: number
    companyId: number
    customerName: number
    customerEmail: number
    customerPhone: number
    pickupZip: number
    dropoffZip: number
    distanceMiles: number
    serviceType: number
    packageSize: number
    packageWeight: number
    selectedExtras: number
    status: number
    estimatedPrice: number
    vehicleCount: number
    awbNumber: number
    paymentStatus: number
    stripePaymentIntentId: number
    internalNotes: number
    paidAt: number
    createdAt: number
    _all: number
  }


  export type QuoteRequestAvgAggregateInputType = {
    distanceMiles?: true
    estimatedPrice?: true
    vehicleCount?: true
  }

  export type QuoteRequestSumAggregateInputType = {
    distanceMiles?: true
    estimatedPrice?: true
    vehicleCount?: true
  }

  export type QuoteRequestMinAggregateInputType = {
    id?: true
    companyId?: true
    customerName?: true
    customerEmail?: true
    customerPhone?: true
    pickupZip?: true
    dropoffZip?: true
    distanceMiles?: true
    serviceType?: true
    packageSize?: true
    packageWeight?: true
    selectedExtras?: true
    status?: true
    estimatedPrice?: true
    vehicleCount?: true
    awbNumber?: true
    paymentStatus?: true
    stripePaymentIntentId?: true
    internalNotes?: true
    paidAt?: true
    createdAt?: true
  }

  export type QuoteRequestMaxAggregateInputType = {
    id?: true
    companyId?: true
    customerName?: true
    customerEmail?: true
    customerPhone?: true
    pickupZip?: true
    dropoffZip?: true
    distanceMiles?: true
    serviceType?: true
    packageSize?: true
    packageWeight?: true
    selectedExtras?: true
    status?: true
    estimatedPrice?: true
    vehicleCount?: true
    awbNumber?: true
    paymentStatus?: true
    stripePaymentIntentId?: true
    internalNotes?: true
    paidAt?: true
    createdAt?: true
  }

  export type QuoteRequestCountAggregateInputType = {
    id?: true
    companyId?: true
    customerName?: true
    customerEmail?: true
    customerPhone?: true
    pickupZip?: true
    dropoffZip?: true
    distanceMiles?: true
    serviceType?: true
    packageSize?: true
    packageWeight?: true
    selectedExtras?: true
    status?: true
    estimatedPrice?: true
    vehicleCount?: true
    awbNumber?: true
    paymentStatus?: true
    stripePaymentIntentId?: true
    internalNotes?: true
    paidAt?: true
    createdAt?: true
    _all?: true
  }

  export type QuoteRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuoteRequest to aggregate.
     */
    where?: QuoteRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuoteRequests to fetch.
     */
    orderBy?: QuoteRequestOrderByWithRelationInput | QuoteRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuoteRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuoteRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuoteRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned QuoteRequests
    **/
    _count?: true | QuoteRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QuoteRequestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QuoteRequestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuoteRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuoteRequestMaxAggregateInputType
  }

  export type GetQuoteRequestAggregateType<T extends QuoteRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateQuoteRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuoteRequest[P]>
      : GetScalarType<T[P], AggregateQuoteRequest[P]>
  }




  export type QuoteRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuoteRequestWhereInput
    orderBy?: QuoteRequestOrderByWithAggregationInput | QuoteRequestOrderByWithAggregationInput[]
    by: QuoteRequestScalarFieldEnum[] | QuoteRequestScalarFieldEnum
    having?: QuoteRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuoteRequestCountAggregateInputType | true
    _avg?: QuoteRequestAvgAggregateInputType
    _sum?: QuoteRequestSumAggregateInputType
    _min?: QuoteRequestMinAggregateInputType
    _max?: QuoteRequestMaxAggregateInputType
  }

  export type QuoteRequestGroupByOutputType = {
    id: string
    companyId: string
    customerName: string
    customerEmail: string
    customerPhone: string | null
    pickupZip: string
    dropoffZip: string
    distanceMiles: number
    serviceType: string
    packageSize: string | null
    packageWeight: string | null
    selectedExtras: string | null
    status: string
    estimatedPrice: number
    vehicleCount: number | null
    awbNumber: string | null
    paymentStatus: string | null
    stripePaymentIntentId: string | null
    internalNotes: string | null
    paidAt: Date | null
    createdAt: Date
    _count: QuoteRequestCountAggregateOutputType | null
    _avg: QuoteRequestAvgAggregateOutputType | null
    _sum: QuoteRequestSumAggregateOutputType | null
    _min: QuoteRequestMinAggregateOutputType | null
    _max: QuoteRequestMaxAggregateOutputType | null
  }

  type GetQuoteRequestGroupByPayload<T extends QuoteRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuoteRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuoteRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuoteRequestGroupByOutputType[P]>
            : GetScalarType<T[P], QuoteRequestGroupByOutputType[P]>
        }
      >
    >


  export type QuoteRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    customerName?: boolean
    customerEmail?: boolean
    customerPhone?: boolean
    pickupZip?: boolean
    dropoffZip?: boolean
    distanceMiles?: boolean
    serviceType?: boolean
    packageSize?: boolean
    packageWeight?: boolean
    selectedExtras?: boolean
    status?: boolean
    estimatedPrice?: boolean
    vehicleCount?: boolean
    awbNumber?: boolean
    paymentStatus?: boolean
    stripePaymentIntentId?: boolean
    internalNotes?: boolean
    paidAt?: boolean
    createdAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    jobs?: boolean | QuoteRequest$jobsArgs<ExtArgs>
    _count?: boolean | QuoteRequestCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quoteRequest"]>

  export type QuoteRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    customerName?: boolean
    customerEmail?: boolean
    customerPhone?: boolean
    pickupZip?: boolean
    dropoffZip?: boolean
    distanceMiles?: boolean
    serviceType?: boolean
    packageSize?: boolean
    packageWeight?: boolean
    selectedExtras?: boolean
    status?: boolean
    estimatedPrice?: boolean
    vehicleCount?: boolean
    awbNumber?: boolean
    paymentStatus?: boolean
    stripePaymentIntentId?: boolean
    internalNotes?: boolean
    paidAt?: boolean
    createdAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quoteRequest"]>

  export type QuoteRequestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    customerName?: boolean
    customerEmail?: boolean
    customerPhone?: boolean
    pickupZip?: boolean
    dropoffZip?: boolean
    distanceMiles?: boolean
    serviceType?: boolean
    packageSize?: boolean
    packageWeight?: boolean
    selectedExtras?: boolean
    status?: boolean
    estimatedPrice?: boolean
    vehicleCount?: boolean
    awbNumber?: boolean
    paymentStatus?: boolean
    stripePaymentIntentId?: boolean
    internalNotes?: boolean
    paidAt?: boolean
    createdAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quoteRequest"]>

  export type QuoteRequestSelectScalar = {
    id?: boolean
    companyId?: boolean
    customerName?: boolean
    customerEmail?: boolean
    customerPhone?: boolean
    pickupZip?: boolean
    dropoffZip?: boolean
    distanceMiles?: boolean
    serviceType?: boolean
    packageSize?: boolean
    packageWeight?: boolean
    selectedExtras?: boolean
    status?: boolean
    estimatedPrice?: boolean
    vehicleCount?: boolean
    awbNumber?: boolean
    paymentStatus?: boolean
    stripePaymentIntentId?: boolean
    internalNotes?: boolean
    paidAt?: boolean
    createdAt?: boolean
  }

  export type QuoteRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "companyId" | "customerName" | "customerEmail" | "customerPhone" | "pickupZip" | "dropoffZip" | "distanceMiles" | "serviceType" | "packageSize" | "packageWeight" | "selectedExtras" | "status" | "estimatedPrice" | "vehicleCount" | "awbNumber" | "paymentStatus" | "stripePaymentIntentId" | "internalNotes" | "paidAt" | "createdAt", ExtArgs["result"]["quoteRequest"]>
  export type QuoteRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    jobs?: boolean | QuoteRequest$jobsArgs<ExtArgs>
    _count?: boolean | QuoteRequestCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type QuoteRequestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type QuoteRequestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $QuoteRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "QuoteRequest"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
      jobs: Prisma.$JobPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      companyId: string
      customerName: string
      customerEmail: string
      customerPhone: string | null
      pickupZip: string
      dropoffZip: string
      distanceMiles: number
      serviceType: string
      packageSize: string | null
      packageWeight: string | null
      selectedExtras: string | null
      status: string
      estimatedPrice: number
      vehicleCount: number | null
      awbNumber: string | null
      paymentStatus: string | null
      stripePaymentIntentId: string | null
      internalNotes: string | null
      paidAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["quoteRequest"]>
    composites: {}
  }

  type QuoteRequestGetPayload<S extends boolean | null | undefined | QuoteRequestDefaultArgs> = $Result.GetResult<Prisma.$QuoteRequestPayload, S>

  type QuoteRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QuoteRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QuoteRequestCountAggregateInputType | true
    }

  export interface QuoteRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['QuoteRequest'], meta: { name: 'QuoteRequest' } }
    /**
     * Find zero or one QuoteRequest that matches the filter.
     * @param {QuoteRequestFindUniqueArgs} args - Arguments to find a QuoteRequest
     * @example
     * // Get one QuoteRequest
     * const quoteRequest = await prisma.quoteRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QuoteRequestFindUniqueArgs>(args: SelectSubset<T, QuoteRequestFindUniqueArgs<ExtArgs>>): Prisma__QuoteRequestClient<$Result.GetResult<Prisma.$QuoteRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one QuoteRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QuoteRequestFindUniqueOrThrowArgs} args - Arguments to find a QuoteRequest
     * @example
     * // Get one QuoteRequest
     * const quoteRequest = await prisma.quoteRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QuoteRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, QuoteRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QuoteRequestClient<$Result.GetResult<Prisma.$QuoteRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QuoteRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuoteRequestFindFirstArgs} args - Arguments to find a QuoteRequest
     * @example
     * // Get one QuoteRequest
     * const quoteRequest = await prisma.quoteRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QuoteRequestFindFirstArgs>(args?: SelectSubset<T, QuoteRequestFindFirstArgs<ExtArgs>>): Prisma__QuoteRequestClient<$Result.GetResult<Prisma.$QuoteRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QuoteRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuoteRequestFindFirstOrThrowArgs} args - Arguments to find a QuoteRequest
     * @example
     * // Get one QuoteRequest
     * const quoteRequest = await prisma.quoteRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QuoteRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, QuoteRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__QuoteRequestClient<$Result.GetResult<Prisma.$QuoteRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more QuoteRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuoteRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all QuoteRequests
     * const quoteRequests = await prisma.quoteRequest.findMany()
     * 
     * // Get first 10 QuoteRequests
     * const quoteRequests = await prisma.quoteRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const quoteRequestWithIdOnly = await prisma.quoteRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QuoteRequestFindManyArgs>(args?: SelectSubset<T, QuoteRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuoteRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a QuoteRequest.
     * @param {QuoteRequestCreateArgs} args - Arguments to create a QuoteRequest.
     * @example
     * // Create one QuoteRequest
     * const QuoteRequest = await prisma.quoteRequest.create({
     *   data: {
     *     // ... data to create a QuoteRequest
     *   }
     * })
     * 
     */
    create<T extends QuoteRequestCreateArgs>(args: SelectSubset<T, QuoteRequestCreateArgs<ExtArgs>>): Prisma__QuoteRequestClient<$Result.GetResult<Prisma.$QuoteRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many QuoteRequests.
     * @param {QuoteRequestCreateManyArgs} args - Arguments to create many QuoteRequests.
     * @example
     * // Create many QuoteRequests
     * const quoteRequest = await prisma.quoteRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QuoteRequestCreateManyArgs>(args?: SelectSubset<T, QuoteRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many QuoteRequests and returns the data saved in the database.
     * @param {QuoteRequestCreateManyAndReturnArgs} args - Arguments to create many QuoteRequests.
     * @example
     * // Create many QuoteRequests
     * const quoteRequest = await prisma.quoteRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many QuoteRequests and only return the `id`
     * const quoteRequestWithIdOnly = await prisma.quoteRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QuoteRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, QuoteRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuoteRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a QuoteRequest.
     * @param {QuoteRequestDeleteArgs} args - Arguments to delete one QuoteRequest.
     * @example
     * // Delete one QuoteRequest
     * const QuoteRequest = await prisma.quoteRequest.delete({
     *   where: {
     *     // ... filter to delete one QuoteRequest
     *   }
     * })
     * 
     */
    delete<T extends QuoteRequestDeleteArgs>(args: SelectSubset<T, QuoteRequestDeleteArgs<ExtArgs>>): Prisma__QuoteRequestClient<$Result.GetResult<Prisma.$QuoteRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one QuoteRequest.
     * @param {QuoteRequestUpdateArgs} args - Arguments to update one QuoteRequest.
     * @example
     * // Update one QuoteRequest
     * const quoteRequest = await prisma.quoteRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QuoteRequestUpdateArgs>(args: SelectSubset<T, QuoteRequestUpdateArgs<ExtArgs>>): Prisma__QuoteRequestClient<$Result.GetResult<Prisma.$QuoteRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more QuoteRequests.
     * @param {QuoteRequestDeleteManyArgs} args - Arguments to filter QuoteRequests to delete.
     * @example
     * // Delete a few QuoteRequests
     * const { count } = await prisma.quoteRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QuoteRequestDeleteManyArgs>(args?: SelectSubset<T, QuoteRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QuoteRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuoteRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many QuoteRequests
     * const quoteRequest = await prisma.quoteRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QuoteRequestUpdateManyArgs>(args: SelectSubset<T, QuoteRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QuoteRequests and returns the data updated in the database.
     * @param {QuoteRequestUpdateManyAndReturnArgs} args - Arguments to update many QuoteRequests.
     * @example
     * // Update many QuoteRequests
     * const quoteRequest = await prisma.quoteRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more QuoteRequests and only return the `id`
     * const quoteRequestWithIdOnly = await prisma.quoteRequest.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends QuoteRequestUpdateManyAndReturnArgs>(args: SelectSubset<T, QuoteRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuoteRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one QuoteRequest.
     * @param {QuoteRequestUpsertArgs} args - Arguments to update or create a QuoteRequest.
     * @example
     * // Update or create a QuoteRequest
     * const quoteRequest = await prisma.quoteRequest.upsert({
     *   create: {
     *     // ... data to create a QuoteRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the QuoteRequest we want to update
     *   }
     * })
     */
    upsert<T extends QuoteRequestUpsertArgs>(args: SelectSubset<T, QuoteRequestUpsertArgs<ExtArgs>>): Prisma__QuoteRequestClient<$Result.GetResult<Prisma.$QuoteRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of QuoteRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuoteRequestCountArgs} args - Arguments to filter QuoteRequests to count.
     * @example
     * // Count the number of QuoteRequests
     * const count = await prisma.quoteRequest.count({
     *   where: {
     *     // ... the filter for the QuoteRequests we want to count
     *   }
     * })
    **/
    count<T extends QuoteRequestCountArgs>(
      args?: Subset<T, QuoteRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuoteRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a QuoteRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuoteRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QuoteRequestAggregateArgs>(args: Subset<T, QuoteRequestAggregateArgs>): Prisma.PrismaPromise<GetQuoteRequestAggregateType<T>>

    /**
     * Group by QuoteRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuoteRequestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QuoteRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuoteRequestGroupByArgs['orderBy'] }
        : { orderBy?: QuoteRequestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QuoteRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuoteRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the QuoteRequest model
   */
  readonly fields: QuoteRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for QuoteRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuoteRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    jobs<T extends QuoteRequest$jobsArgs<ExtArgs> = {}>(args?: Subset<T, QuoteRequest$jobsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the QuoteRequest model
   */
  interface QuoteRequestFieldRefs {
    readonly id: FieldRef<"QuoteRequest", 'String'>
    readonly companyId: FieldRef<"QuoteRequest", 'String'>
    readonly customerName: FieldRef<"QuoteRequest", 'String'>
    readonly customerEmail: FieldRef<"QuoteRequest", 'String'>
    readonly customerPhone: FieldRef<"QuoteRequest", 'String'>
    readonly pickupZip: FieldRef<"QuoteRequest", 'String'>
    readonly dropoffZip: FieldRef<"QuoteRequest", 'String'>
    readonly distanceMiles: FieldRef<"QuoteRequest", 'Float'>
    readonly serviceType: FieldRef<"QuoteRequest", 'String'>
    readonly packageSize: FieldRef<"QuoteRequest", 'String'>
    readonly packageWeight: FieldRef<"QuoteRequest", 'String'>
    readonly selectedExtras: FieldRef<"QuoteRequest", 'String'>
    readonly status: FieldRef<"QuoteRequest", 'String'>
    readonly estimatedPrice: FieldRef<"QuoteRequest", 'Float'>
    readonly vehicleCount: FieldRef<"QuoteRequest", 'Int'>
    readonly awbNumber: FieldRef<"QuoteRequest", 'String'>
    readonly paymentStatus: FieldRef<"QuoteRequest", 'String'>
    readonly stripePaymentIntentId: FieldRef<"QuoteRequest", 'String'>
    readonly internalNotes: FieldRef<"QuoteRequest", 'String'>
    readonly paidAt: FieldRef<"QuoteRequest", 'DateTime'>
    readonly createdAt: FieldRef<"QuoteRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * QuoteRequest findUnique
   */
  export type QuoteRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuoteRequest
     */
    select?: QuoteRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuoteRequest
     */
    omit?: QuoteRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuoteRequestInclude<ExtArgs> | null
    /**
     * Filter, which QuoteRequest to fetch.
     */
    where: QuoteRequestWhereUniqueInput
  }

  /**
   * QuoteRequest findUniqueOrThrow
   */
  export type QuoteRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuoteRequest
     */
    select?: QuoteRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuoteRequest
     */
    omit?: QuoteRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuoteRequestInclude<ExtArgs> | null
    /**
     * Filter, which QuoteRequest to fetch.
     */
    where: QuoteRequestWhereUniqueInput
  }

  /**
   * QuoteRequest findFirst
   */
  export type QuoteRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuoteRequest
     */
    select?: QuoteRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuoteRequest
     */
    omit?: QuoteRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuoteRequestInclude<ExtArgs> | null
    /**
     * Filter, which QuoteRequest to fetch.
     */
    where?: QuoteRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuoteRequests to fetch.
     */
    orderBy?: QuoteRequestOrderByWithRelationInput | QuoteRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuoteRequests.
     */
    cursor?: QuoteRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuoteRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuoteRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuoteRequests.
     */
    distinct?: QuoteRequestScalarFieldEnum | QuoteRequestScalarFieldEnum[]
  }

  /**
   * QuoteRequest findFirstOrThrow
   */
  export type QuoteRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuoteRequest
     */
    select?: QuoteRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuoteRequest
     */
    omit?: QuoteRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuoteRequestInclude<ExtArgs> | null
    /**
     * Filter, which QuoteRequest to fetch.
     */
    where?: QuoteRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuoteRequests to fetch.
     */
    orderBy?: QuoteRequestOrderByWithRelationInput | QuoteRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuoteRequests.
     */
    cursor?: QuoteRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuoteRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuoteRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuoteRequests.
     */
    distinct?: QuoteRequestScalarFieldEnum | QuoteRequestScalarFieldEnum[]
  }

  /**
   * QuoteRequest findMany
   */
  export type QuoteRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuoteRequest
     */
    select?: QuoteRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuoteRequest
     */
    omit?: QuoteRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuoteRequestInclude<ExtArgs> | null
    /**
     * Filter, which QuoteRequests to fetch.
     */
    where?: QuoteRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuoteRequests to fetch.
     */
    orderBy?: QuoteRequestOrderByWithRelationInput | QuoteRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing QuoteRequests.
     */
    cursor?: QuoteRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuoteRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuoteRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuoteRequests.
     */
    distinct?: QuoteRequestScalarFieldEnum | QuoteRequestScalarFieldEnum[]
  }

  /**
   * QuoteRequest create
   */
  export type QuoteRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuoteRequest
     */
    select?: QuoteRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuoteRequest
     */
    omit?: QuoteRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuoteRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a QuoteRequest.
     */
    data: XOR<QuoteRequestCreateInput, QuoteRequestUncheckedCreateInput>
  }

  /**
   * QuoteRequest createMany
   */
  export type QuoteRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many QuoteRequests.
     */
    data: QuoteRequestCreateManyInput | QuoteRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QuoteRequest createManyAndReturn
   */
  export type QuoteRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuoteRequest
     */
    select?: QuoteRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QuoteRequest
     */
    omit?: QuoteRequestOmit<ExtArgs> | null
    /**
     * The data used to create many QuoteRequests.
     */
    data: QuoteRequestCreateManyInput | QuoteRequestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuoteRequestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * QuoteRequest update
   */
  export type QuoteRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuoteRequest
     */
    select?: QuoteRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuoteRequest
     */
    omit?: QuoteRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuoteRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a QuoteRequest.
     */
    data: XOR<QuoteRequestUpdateInput, QuoteRequestUncheckedUpdateInput>
    /**
     * Choose, which QuoteRequest to update.
     */
    where: QuoteRequestWhereUniqueInput
  }

  /**
   * QuoteRequest updateMany
   */
  export type QuoteRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update QuoteRequests.
     */
    data: XOR<QuoteRequestUpdateManyMutationInput, QuoteRequestUncheckedUpdateManyInput>
    /**
     * Filter which QuoteRequests to update
     */
    where?: QuoteRequestWhereInput
    /**
     * Limit how many QuoteRequests to update.
     */
    limit?: number
  }

  /**
   * QuoteRequest updateManyAndReturn
   */
  export type QuoteRequestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuoteRequest
     */
    select?: QuoteRequestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QuoteRequest
     */
    omit?: QuoteRequestOmit<ExtArgs> | null
    /**
     * The data used to update QuoteRequests.
     */
    data: XOR<QuoteRequestUpdateManyMutationInput, QuoteRequestUncheckedUpdateManyInput>
    /**
     * Filter which QuoteRequests to update
     */
    where?: QuoteRequestWhereInput
    /**
     * Limit how many QuoteRequests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuoteRequestIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * QuoteRequest upsert
   */
  export type QuoteRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuoteRequest
     */
    select?: QuoteRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuoteRequest
     */
    omit?: QuoteRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuoteRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the QuoteRequest to update in case it exists.
     */
    where: QuoteRequestWhereUniqueInput
    /**
     * In case the QuoteRequest found by the `where` argument doesn't exist, create a new QuoteRequest with this data.
     */
    create: XOR<QuoteRequestCreateInput, QuoteRequestUncheckedCreateInput>
    /**
     * In case the QuoteRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuoteRequestUpdateInput, QuoteRequestUncheckedUpdateInput>
  }

  /**
   * QuoteRequest delete
   */
  export type QuoteRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuoteRequest
     */
    select?: QuoteRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuoteRequest
     */
    omit?: QuoteRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuoteRequestInclude<ExtArgs> | null
    /**
     * Filter which QuoteRequest to delete.
     */
    where: QuoteRequestWhereUniqueInput
  }

  /**
   * QuoteRequest deleteMany
   */
  export type QuoteRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuoteRequests to delete
     */
    where?: QuoteRequestWhereInput
    /**
     * Limit how many QuoteRequests to delete.
     */
    limit?: number
  }

  /**
   * QuoteRequest.jobs
   */
  export type QuoteRequest$jobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    where?: JobWhereInput
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    cursor?: JobWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * QuoteRequest without action
   */
  export type QuoteRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuoteRequest
     */
    select?: QuoteRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuoteRequest
     */
    omit?: QuoteRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuoteRequestInclude<ExtArgs> | null
  }


  /**
   * Model Webhook
   */

  export type AggregateWebhook = {
    _count: WebhookCountAggregateOutputType | null
    _min: WebhookMinAggregateOutputType | null
    _max: WebhookMaxAggregateOutputType | null
  }

  export type WebhookMinAggregateOutputType = {
    id: string | null
    companyId: string | null
    url: string | null
    secret: string | null
    enabled: boolean | null
    createdAt: Date | null
  }

  export type WebhookMaxAggregateOutputType = {
    id: string | null
    companyId: string | null
    url: string | null
    secret: string | null
    enabled: boolean | null
    createdAt: Date | null
  }

  export type WebhookCountAggregateOutputType = {
    id: number
    companyId: number
    url: number
    secret: number
    events: number
    enabled: number
    createdAt: number
    _all: number
  }


  export type WebhookMinAggregateInputType = {
    id?: true
    companyId?: true
    url?: true
    secret?: true
    enabled?: true
    createdAt?: true
  }

  export type WebhookMaxAggregateInputType = {
    id?: true
    companyId?: true
    url?: true
    secret?: true
    enabled?: true
    createdAt?: true
  }

  export type WebhookCountAggregateInputType = {
    id?: true
    companyId?: true
    url?: true
    secret?: true
    events?: true
    enabled?: true
    createdAt?: true
    _all?: true
  }

  export type WebhookAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Webhook to aggregate.
     */
    where?: WebhookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Webhooks to fetch.
     */
    orderBy?: WebhookOrderByWithRelationInput | WebhookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WebhookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Webhooks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Webhooks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Webhooks
    **/
    _count?: true | WebhookCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WebhookMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WebhookMaxAggregateInputType
  }

  export type GetWebhookAggregateType<T extends WebhookAggregateArgs> = {
        [P in keyof T & keyof AggregateWebhook]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWebhook[P]>
      : GetScalarType<T[P], AggregateWebhook[P]>
  }




  export type WebhookGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WebhookWhereInput
    orderBy?: WebhookOrderByWithAggregationInput | WebhookOrderByWithAggregationInput[]
    by: WebhookScalarFieldEnum[] | WebhookScalarFieldEnum
    having?: WebhookScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WebhookCountAggregateInputType | true
    _min?: WebhookMinAggregateInputType
    _max?: WebhookMaxAggregateInputType
  }

  export type WebhookGroupByOutputType = {
    id: string
    companyId: string
    url: string
    secret: string
    events: string[]
    enabled: boolean
    createdAt: Date
    _count: WebhookCountAggregateOutputType | null
    _min: WebhookMinAggregateOutputType | null
    _max: WebhookMaxAggregateOutputType | null
  }

  type GetWebhookGroupByPayload<T extends WebhookGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WebhookGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WebhookGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WebhookGroupByOutputType[P]>
            : GetScalarType<T[P], WebhookGroupByOutputType[P]>
        }
      >
    >


  export type WebhookSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    url?: boolean
    secret?: boolean
    events?: boolean
    enabled?: boolean
    createdAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["webhook"]>

  export type WebhookSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    url?: boolean
    secret?: boolean
    events?: boolean
    enabled?: boolean
    createdAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["webhook"]>

  export type WebhookSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    url?: boolean
    secret?: boolean
    events?: boolean
    enabled?: boolean
    createdAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["webhook"]>

  export type WebhookSelectScalar = {
    id?: boolean
    companyId?: boolean
    url?: boolean
    secret?: boolean
    events?: boolean
    enabled?: boolean
    createdAt?: boolean
  }

  export type WebhookOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "companyId" | "url" | "secret" | "events" | "enabled" | "createdAt", ExtArgs["result"]["webhook"]>
  export type WebhookInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type WebhookIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type WebhookIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $WebhookPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Webhook"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      companyId: string
      url: string
      secret: string
      events: string[]
      enabled: boolean
      createdAt: Date
    }, ExtArgs["result"]["webhook"]>
    composites: {}
  }

  type WebhookGetPayload<S extends boolean | null | undefined | WebhookDefaultArgs> = $Result.GetResult<Prisma.$WebhookPayload, S>

  type WebhookCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WebhookFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WebhookCountAggregateInputType | true
    }

  export interface WebhookDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Webhook'], meta: { name: 'Webhook' } }
    /**
     * Find zero or one Webhook that matches the filter.
     * @param {WebhookFindUniqueArgs} args - Arguments to find a Webhook
     * @example
     * // Get one Webhook
     * const webhook = await prisma.webhook.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WebhookFindUniqueArgs>(args: SelectSubset<T, WebhookFindUniqueArgs<ExtArgs>>): Prisma__WebhookClient<$Result.GetResult<Prisma.$WebhookPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Webhook that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WebhookFindUniqueOrThrowArgs} args - Arguments to find a Webhook
     * @example
     * // Get one Webhook
     * const webhook = await prisma.webhook.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WebhookFindUniqueOrThrowArgs>(args: SelectSubset<T, WebhookFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WebhookClient<$Result.GetResult<Prisma.$WebhookPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Webhook that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookFindFirstArgs} args - Arguments to find a Webhook
     * @example
     * // Get one Webhook
     * const webhook = await prisma.webhook.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WebhookFindFirstArgs>(args?: SelectSubset<T, WebhookFindFirstArgs<ExtArgs>>): Prisma__WebhookClient<$Result.GetResult<Prisma.$WebhookPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Webhook that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookFindFirstOrThrowArgs} args - Arguments to find a Webhook
     * @example
     * // Get one Webhook
     * const webhook = await prisma.webhook.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WebhookFindFirstOrThrowArgs>(args?: SelectSubset<T, WebhookFindFirstOrThrowArgs<ExtArgs>>): Prisma__WebhookClient<$Result.GetResult<Prisma.$WebhookPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Webhooks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Webhooks
     * const webhooks = await prisma.webhook.findMany()
     * 
     * // Get first 10 Webhooks
     * const webhooks = await prisma.webhook.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const webhookWithIdOnly = await prisma.webhook.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WebhookFindManyArgs>(args?: SelectSubset<T, WebhookFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Webhook.
     * @param {WebhookCreateArgs} args - Arguments to create a Webhook.
     * @example
     * // Create one Webhook
     * const Webhook = await prisma.webhook.create({
     *   data: {
     *     // ... data to create a Webhook
     *   }
     * })
     * 
     */
    create<T extends WebhookCreateArgs>(args: SelectSubset<T, WebhookCreateArgs<ExtArgs>>): Prisma__WebhookClient<$Result.GetResult<Prisma.$WebhookPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Webhooks.
     * @param {WebhookCreateManyArgs} args - Arguments to create many Webhooks.
     * @example
     * // Create many Webhooks
     * const webhook = await prisma.webhook.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WebhookCreateManyArgs>(args?: SelectSubset<T, WebhookCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Webhooks and returns the data saved in the database.
     * @param {WebhookCreateManyAndReturnArgs} args - Arguments to create many Webhooks.
     * @example
     * // Create many Webhooks
     * const webhook = await prisma.webhook.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Webhooks and only return the `id`
     * const webhookWithIdOnly = await prisma.webhook.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WebhookCreateManyAndReturnArgs>(args?: SelectSubset<T, WebhookCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Webhook.
     * @param {WebhookDeleteArgs} args - Arguments to delete one Webhook.
     * @example
     * // Delete one Webhook
     * const Webhook = await prisma.webhook.delete({
     *   where: {
     *     // ... filter to delete one Webhook
     *   }
     * })
     * 
     */
    delete<T extends WebhookDeleteArgs>(args: SelectSubset<T, WebhookDeleteArgs<ExtArgs>>): Prisma__WebhookClient<$Result.GetResult<Prisma.$WebhookPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Webhook.
     * @param {WebhookUpdateArgs} args - Arguments to update one Webhook.
     * @example
     * // Update one Webhook
     * const webhook = await prisma.webhook.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WebhookUpdateArgs>(args: SelectSubset<T, WebhookUpdateArgs<ExtArgs>>): Prisma__WebhookClient<$Result.GetResult<Prisma.$WebhookPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Webhooks.
     * @param {WebhookDeleteManyArgs} args - Arguments to filter Webhooks to delete.
     * @example
     * // Delete a few Webhooks
     * const { count } = await prisma.webhook.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WebhookDeleteManyArgs>(args?: SelectSubset<T, WebhookDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Webhooks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Webhooks
     * const webhook = await prisma.webhook.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WebhookUpdateManyArgs>(args: SelectSubset<T, WebhookUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Webhooks and returns the data updated in the database.
     * @param {WebhookUpdateManyAndReturnArgs} args - Arguments to update many Webhooks.
     * @example
     * // Update many Webhooks
     * const webhook = await prisma.webhook.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Webhooks and only return the `id`
     * const webhookWithIdOnly = await prisma.webhook.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WebhookUpdateManyAndReturnArgs>(args: SelectSubset<T, WebhookUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Webhook.
     * @param {WebhookUpsertArgs} args - Arguments to update or create a Webhook.
     * @example
     * // Update or create a Webhook
     * const webhook = await prisma.webhook.upsert({
     *   create: {
     *     // ... data to create a Webhook
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Webhook we want to update
     *   }
     * })
     */
    upsert<T extends WebhookUpsertArgs>(args: SelectSubset<T, WebhookUpsertArgs<ExtArgs>>): Prisma__WebhookClient<$Result.GetResult<Prisma.$WebhookPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Webhooks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookCountArgs} args - Arguments to filter Webhooks to count.
     * @example
     * // Count the number of Webhooks
     * const count = await prisma.webhook.count({
     *   where: {
     *     // ... the filter for the Webhooks we want to count
     *   }
     * })
    **/
    count<T extends WebhookCountArgs>(
      args?: Subset<T, WebhookCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WebhookCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Webhook.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WebhookAggregateArgs>(args: Subset<T, WebhookAggregateArgs>): Prisma.PrismaPromise<GetWebhookAggregateType<T>>

    /**
     * Group by Webhook.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WebhookGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WebhookGroupByArgs['orderBy'] }
        : { orderBy?: WebhookGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WebhookGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWebhookGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Webhook model
   */
  readonly fields: WebhookFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Webhook.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WebhookClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Webhook model
   */
  interface WebhookFieldRefs {
    readonly id: FieldRef<"Webhook", 'String'>
    readonly companyId: FieldRef<"Webhook", 'String'>
    readonly url: FieldRef<"Webhook", 'String'>
    readonly secret: FieldRef<"Webhook", 'String'>
    readonly events: FieldRef<"Webhook", 'String[]'>
    readonly enabled: FieldRef<"Webhook", 'Boolean'>
    readonly createdAt: FieldRef<"Webhook", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Webhook findUnique
   */
  export type WebhookFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Webhook
     */
    select?: WebhookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Webhook
     */
    omit?: WebhookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookInclude<ExtArgs> | null
    /**
     * Filter, which Webhook to fetch.
     */
    where: WebhookWhereUniqueInput
  }

  /**
   * Webhook findUniqueOrThrow
   */
  export type WebhookFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Webhook
     */
    select?: WebhookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Webhook
     */
    omit?: WebhookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookInclude<ExtArgs> | null
    /**
     * Filter, which Webhook to fetch.
     */
    where: WebhookWhereUniqueInput
  }

  /**
   * Webhook findFirst
   */
  export type WebhookFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Webhook
     */
    select?: WebhookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Webhook
     */
    omit?: WebhookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookInclude<ExtArgs> | null
    /**
     * Filter, which Webhook to fetch.
     */
    where?: WebhookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Webhooks to fetch.
     */
    orderBy?: WebhookOrderByWithRelationInput | WebhookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Webhooks.
     */
    cursor?: WebhookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Webhooks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Webhooks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Webhooks.
     */
    distinct?: WebhookScalarFieldEnum | WebhookScalarFieldEnum[]
  }

  /**
   * Webhook findFirstOrThrow
   */
  export type WebhookFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Webhook
     */
    select?: WebhookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Webhook
     */
    omit?: WebhookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookInclude<ExtArgs> | null
    /**
     * Filter, which Webhook to fetch.
     */
    where?: WebhookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Webhooks to fetch.
     */
    orderBy?: WebhookOrderByWithRelationInput | WebhookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Webhooks.
     */
    cursor?: WebhookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Webhooks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Webhooks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Webhooks.
     */
    distinct?: WebhookScalarFieldEnum | WebhookScalarFieldEnum[]
  }

  /**
   * Webhook findMany
   */
  export type WebhookFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Webhook
     */
    select?: WebhookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Webhook
     */
    omit?: WebhookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookInclude<ExtArgs> | null
    /**
     * Filter, which Webhooks to fetch.
     */
    where?: WebhookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Webhooks to fetch.
     */
    orderBy?: WebhookOrderByWithRelationInput | WebhookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Webhooks.
     */
    cursor?: WebhookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Webhooks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Webhooks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Webhooks.
     */
    distinct?: WebhookScalarFieldEnum | WebhookScalarFieldEnum[]
  }

  /**
   * Webhook create
   */
  export type WebhookCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Webhook
     */
    select?: WebhookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Webhook
     */
    omit?: WebhookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookInclude<ExtArgs> | null
    /**
     * The data needed to create a Webhook.
     */
    data: XOR<WebhookCreateInput, WebhookUncheckedCreateInput>
  }

  /**
   * Webhook createMany
   */
  export type WebhookCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Webhooks.
     */
    data: WebhookCreateManyInput | WebhookCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Webhook createManyAndReturn
   */
  export type WebhookCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Webhook
     */
    select?: WebhookSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Webhook
     */
    omit?: WebhookOmit<ExtArgs> | null
    /**
     * The data used to create many Webhooks.
     */
    data: WebhookCreateManyInput | WebhookCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Webhook update
   */
  export type WebhookUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Webhook
     */
    select?: WebhookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Webhook
     */
    omit?: WebhookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookInclude<ExtArgs> | null
    /**
     * The data needed to update a Webhook.
     */
    data: XOR<WebhookUpdateInput, WebhookUncheckedUpdateInput>
    /**
     * Choose, which Webhook to update.
     */
    where: WebhookWhereUniqueInput
  }

  /**
   * Webhook updateMany
   */
  export type WebhookUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Webhooks.
     */
    data: XOR<WebhookUpdateManyMutationInput, WebhookUncheckedUpdateManyInput>
    /**
     * Filter which Webhooks to update
     */
    where?: WebhookWhereInput
    /**
     * Limit how many Webhooks to update.
     */
    limit?: number
  }

  /**
   * Webhook updateManyAndReturn
   */
  export type WebhookUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Webhook
     */
    select?: WebhookSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Webhook
     */
    omit?: WebhookOmit<ExtArgs> | null
    /**
     * The data used to update Webhooks.
     */
    data: XOR<WebhookUpdateManyMutationInput, WebhookUncheckedUpdateManyInput>
    /**
     * Filter which Webhooks to update
     */
    where?: WebhookWhereInput
    /**
     * Limit how many Webhooks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Webhook upsert
   */
  export type WebhookUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Webhook
     */
    select?: WebhookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Webhook
     */
    omit?: WebhookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookInclude<ExtArgs> | null
    /**
     * The filter to search for the Webhook to update in case it exists.
     */
    where: WebhookWhereUniqueInput
    /**
     * In case the Webhook found by the `where` argument doesn't exist, create a new Webhook with this data.
     */
    create: XOR<WebhookCreateInput, WebhookUncheckedCreateInput>
    /**
     * In case the Webhook was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WebhookUpdateInput, WebhookUncheckedUpdateInput>
  }

  /**
   * Webhook delete
   */
  export type WebhookDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Webhook
     */
    select?: WebhookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Webhook
     */
    omit?: WebhookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookInclude<ExtArgs> | null
    /**
     * Filter which Webhook to delete.
     */
    where: WebhookWhereUniqueInput
  }

  /**
   * Webhook deleteMany
   */
  export type WebhookDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Webhooks to delete
     */
    where?: WebhookWhereInput
    /**
     * Limit how many Webhooks to delete.
     */
    limit?: number
  }

  /**
   * Webhook without action
   */
  export type WebhookDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Webhook
     */
    select?: WebhookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Webhook
     */
    omit?: WebhookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookInclude<ExtArgs> | null
  }


  /**
   * Model ShopifyInstall
   */

  export type AggregateShopifyInstall = {
    _count: ShopifyInstallCountAggregateOutputType | null
    _min: ShopifyInstallMinAggregateOutputType | null
    _max: ShopifyInstallMaxAggregateOutputType | null
  }

  export type ShopifyInstallMinAggregateOutputType = {
    id: string | null
    shop: string | null
    accessToken: string | null
    companyId: string | null
    scriptTagId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ShopifyInstallMaxAggregateOutputType = {
    id: string | null
    shop: string | null
    accessToken: string | null
    companyId: string | null
    scriptTagId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ShopifyInstallCountAggregateOutputType = {
    id: number
    shop: number
    accessToken: number
    companyId: number
    scriptTagId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ShopifyInstallMinAggregateInputType = {
    id?: true
    shop?: true
    accessToken?: true
    companyId?: true
    scriptTagId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ShopifyInstallMaxAggregateInputType = {
    id?: true
    shop?: true
    accessToken?: true
    companyId?: true
    scriptTagId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ShopifyInstallCountAggregateInputType = {
    id?: true
    shop?: true
    accessToken?: true
    companyId?: true
    scriptTagId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ShopifyInstallAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ShopifyInstall to aggregate.
     */
    where?: ShopifyInstallWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShopifyInstalls to fetch.
     */
    orderBy?: ShopifyInstallOrderByWithRelationInput | ShopifyInstallOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ShopifyInstallWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShopifyInstalls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShopifyInstalls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ShopifyInstalls
    **/
    _count?: true | ShopifyInstallCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ShopifyInstallMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ShopifyInstallMaxAggregateInputType
  }

  export type GetShopifyInstallAggregateType<T extends ShopifyInstallAggregateArgs> = {
        [P in keyof T & keyof AggregateShopifyInstall]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateShopifyInstall[P]>
      : GetScalarType<T[P], AggregateShopifyInstall[P]>
  }




  export type ShopifyInstallGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ShopifyInstallWhereInput
    orderBy?: ShopifyInstallOrderByWithAggregationInput | ShopifyInstallOrderByWithAggregationInput[]
    by: ShopifyInstallScalarFieldEnum[] | ShopifyInstallScalarFieldEnum
    having?: ShopifyInstallScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ShopifyInstallCountAggregateInputType | true
    _min?: ShopifyInstallMinAggregateInputType
    _max?: ShopifyInstallMaxAggregateInputType
  }

  export type ShopifyInstallGroupByOutputType = {
    id: string
    shop: string
    accessToken: string
    companyId: string | null
    scriptTagId: string | null
    createdAt: Date
    updatedAt: Date
    _count: ShopifyInstallCountAggregateOutputType | null
    _min: ShopifyInstallMinAggregateOutputType | null
    _max: ShopifyInstallMaxAggregateOutputType | null
  }

  type GetShopifyInstallGroupByPayload<T extends ShopifyInstallGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ShopifyInstallGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ShopifyInstallGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ShopifyInstallGroupByOutputType[P]>
            : GetScalarType<T[P], ShopifyInstallGroupByOutputType[P]>
        }
      >
    >


  export type ShopifyInstallSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shop?: boolean
    accessToken?: boolean
    companyId?: boolean
    scriptTagId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | ShopifyInstall$companyArgs<ExtArgs>
  }, ExtArgs["result"]["shopifyInstall"]>

  export type ShopifyInstallSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shop?: boolean
    accessToken?: boolean
    companyId?: boolean
    scriptTagId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | ShopifyInstall$companyArgs<ExtArgs>
  }, ExtArgs["result"]["shopifyInstall"]>

  export type ShopifyInstallSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shop?: boolean
    accessToken?: boolean
    companyId?: boolean
    scriptTagId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | ShopifyInstall$companyArgs<ExtArgs>
  }, ExtArgs["result"]["shopifyInstall"]>

  export type ShopifyInstallSelectScalar = {
    id?: boolean
    shop?: boolean
    accessToken?: boolean
    companyId?: boolean
    scriptTagId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ShopifyInstallOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "shop" | "accessToken" | "companyId" | "scriptTagId" | "createdAt" | "updatedAt", ExtArgs["result"]["shopifyInstall"]>
  export type ShopifyInstallInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | ShopifyInstall$companyArgs<ExtArgs>
  }
  export type ShopifyInstallIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | ShopifyInstall$companyArgs<ExtArgs>
  }
  export type ShopifyInstallIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | ShopifyInstall$companyArgs<ExtArgs>
  }

  export type $ShopifyInstallPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ShopifyInstall"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      shop: string
      accessToken: string
      companyId: string | null
      scriptTagId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["shopifyInstall"]>
    composites: {}
  }

  type ShopifyInstallGetPayload<S extends boolean | null | undefined | ShopifyInstallDefaultArgs> = $Result.GetResult<Prisma.$ShopifyInstallPayload, S>

  type ShopifyInstallCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ShopifyInstallFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ShopifyInstallCountAggregateInputType | true
    }

  export interface ShopifyInstallDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ShopifyInstall'], meta: { name: 'ShopifyInstall' } }
    /**
     * Find zero or one ShopifyInstall that matches the filter.
     * @param {ShopifyInstallFindUniqueArgs} args - Arguments to find a ShopifyInstall
     * @example
     * // Get one ShopifyInstall
     * const shopifyInstall = await prisma.shopifyInstall.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ShopifyInstallFindUniqueArgs>(args: SelectSubset<T, ShopifyInstallFindUniqueArgs<ExtArgs>>): Prisma__ShopifyInstallClient<$Result.GetResult<Prisma.$ShopifyInstallPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ShopifyInstall that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ShopifyInstallFindUniqueOrThrowArgs} args - Arguments to find a ShopifyInstall
     * @example
     * // Get one ShopifyInstall
     * const shopifyInstall = await prisma.shopifyInstall.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ShopifyInstallFindUniqueOrThrowArgs>(args: SelectSubset<T, ShopifyInstallFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ShopifyInstallClient<$Result.GetResult<Prisma.$ShopifyInstallPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ShopifyInstall that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopifyInstallFindFirstArgs} args - Arguments to find a ShopifyInstall
     * @example
     * // Get one ShopifyInstall
     * const shopifyInstall = await prisma.shopifyInstall.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ShopifyInstallFindFirstArgs>(args?: SelectSubset<T, ShopifyInstallFindFirstArgs<ExtArgs>>): Prisma__ShopifyInstallClient<$Result.GetResult<Prisma.$ShopifyInstallPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ShopifyInstall that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopifyInstallFindFirstOrThrowArgs} args - Arguments to find a ShopifyInstall
     * @example
     * // Get one ShopifyInstall
     * const shopifyInstall = await prisma.shopifyInstall.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ShopifyInstallFindFirstOrThrowArgs>(args?: SelectSubset<T, ShopifyInstallFindFirstOrThrowArgs<ExtArgs>>): Prisma__ShopifyInstallClient<$Result.GetResult<Prisma.$ShopifyInstallPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ShopifyInstalls that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopifyInstallFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ShopifyInstalls
     * const shopifyInstalls = await prisma.shopifyInstall.findMany()
     * 
     * // Get first 10 ShopifyInstalls
     * const shopifyInstalls = await prisma.shopifyInstall.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const shopifyInstallWithIdOnly = await prisma.shopifyInstall.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ShopifyInstallFindManyArgs>(args?: SelectSubset<T, ShopifyInstallFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShopifyInstallPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ShopifyInstall.
     * @param {ShopifyInstallCreateArgs} args - Arguments to create a ShopifyInstall.
     * @example
     * // Create one ShopifyInstall
     * const ShopifyInstall = await prisma.shopifyInstall.create({
     *   data: {
     *     // ... data to create a ShopifyInstall
     *   }
     * })
     * 
     */
    create<T extends ShopifyInstallCreateArgs>(args: SelectSubset<T, ShopifyInstallCreateArgs<ExtArgs>>): Prisma__ShopifyInstallClient<$Result.GetResult<Prisma.$ShopifyInstallPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ShopifyInstalls.
     * @param {ShopifyInstallCreateManyArgs} args - Arguments to create many ShopifyInstalls.
     * @example
     * // Create many ShopifyInstalls
     * const shopifyInstall = await prisma.shopifyInstall.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ShopifyInstallCreateManyArgs>(args?: SelectSubset<T, ShopifyInstallCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ShopifyInstalls and returns the data saved in the database.
     * @param {ShopifyInstallCreateManyAndReturnArgs} args - Arguments to create many ShopifyInstalls.
     * @example
     * // Create many ShopifyInstalls
     * const shopifyInstall = await prisma.shopifyInstall.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ShopifyInstalls and only return the `id`
     * const shopifyInstallWithIdOnly = await prisma.shopifyInstall.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ShopifyInstallCreateManyAndReturnArgs>(args?: SelectSubset<T, ShopifyInstallCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShopifyInstallPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ShopifyInstall.
     * @param {ShopifyInstallDeleteArgs} args - Arguments to delete one ShopifyInstall.
     * @example
     * // Delete one ShopifyInstall
     * const ShopifyInstall = await prisma.shopifyInstall.delete({
     *   where: {
     *     // ... filter to delete one ShopifyInstall
     *   }
     * })
     * 
     */
    delete<T extends ShopifyInstallDeleteArgs>(args: SelectSubset<T, ShopifyInstallDeleteArgs<ExtArgs>>): Prisma__ShopifyInstallClient<$Result.GetResult<Prisma.$ShopifyInstallPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ShopifyInstall.
     * @param {ShopifyInstallUpdateArgs} args - Arguments to update one ShopifyInstall.
     * @example
     * // Update one ShopifyInstall
     * const shopifyInstall = await prisma.shopifyInstall.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ShopifyInstallUpdateArgs>(args: SelectSubset<T, ShopifyInstallUpdateArgs<ExtArgs>>): Prisma__ShopifyInstallClient<$Result.GetResult<Prisma.$ShopifyInstallPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ShopifyInstalls.
     * @param {ShopifyInstallDeleteManyArgs} args - Arguments to filter ShopifyInstalls to delete.
     * @example
     * // Delete a few ShopifyInstalls
     * const { count } = await prisma.shopifyInstall.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ShopifyInstallDeleteManyArgs>(args?: SelectSubset<T, ShopifyInstallDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ShopifyInstalls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopifyInstallUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ShopifyInstalls
     * const shopifyInstall = await prisma.shopifyInstall.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ShopifyInstallUpdateManyArgs>(args: SelectSubset<T, ShopifyInstallUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ShopifyInstalls and returns the data updated in the database.
     * @param {ShopifyInstallUpdateManyAndReturnArgs} args - Arguments to update many ShopifyInstalls.
     * @example
     * // Update many ShopifyInstalls
     * const shopifyInstall = await prisma.shopifyInstall.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ShopifyInstalls and only return the `id`
     * const shopifyInstallWithIdOnly = await prisma.shopifyInstall.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ShopifyInstallUpdateManyAndReturnArgs>(args: SelectSubset<T, ShopifyInstallUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShopifyInstallPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ShopifyInstall.
     * @param {ShopifyInstallUpsertArgs} args - Arguments to update or create a ShopifyInstall.
     * @example
     * // Update or create a ShopifyInstall
     * const shopifyInstall = await prisma.shopifyInstall.upsert({
     *   create: {
     *     // ... data to create a ShopifyInstall
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ShopifyInstall we want to update
     *   }
     * })
     */
    upsert<T extends ShopifyInstallUpsertArgs>(args: SelectSubset<T, ShopifyInstallUpsertArgs<ExtArgs>>): Prisma__ShopifyInstallClient<$Result.GetResult<Prisma.$ShopifyInstallPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ShopifyInstalls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopifyInstallCountArgs} args - Arguments to filter ShopifyInstalls to count.
     * @example
     * // Count the number of ShopifyInstalls
     * const count = await prisma.shopifyInstall.count({
     *   where: {
     *     // ... the filter for the ShopifyInstalls we want to count
     *   }
     * })
    **/
    count<T extends ShopifyInstallCountArgs>(
      args?: Subset<T, ShopifyInstallCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ShopifyInstallCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ShopifyInstall.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopifyInstallAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ShopifyInstallAggregateArgs>(args: Subset<T, ShopifyInstallAggregateArgs>): Prisma.PrismaPromise<GetShopifyInstallAggregateType<T>>

    /**
     * Group by ShopifyInstall.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopifyInstallGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ShopifyInstallGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ShopifyInstallGroupByArgs['orderBy'] }
        : { orderBy?: ShopifyInstallGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ShopifyInstallGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetShopifyInstallGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ShopifyInstall model
   */
  readonly fields: ShopifyInstallFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ShopifyInstall.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ShopifyInstallClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends ShopifyInstall$companyArgs<ExtArgs> = {}>(args?: Subset<T, ShopifyInstall$companyArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ShopifyInstall model
   */
  interface ShopifyInstallFieldRefs {
    readonly id: FieldRef<"ShopifyInstall", 'String'>
    readonly shop: FieldRef<"ShopifyInstall", 'String'>
    readonly accessToken: FieldRef<"ShopifyInstall", 'String'>
    readonly companyId: FieldRef<"ShopifyInstall", 'String'>
    readonly scriptTagId: FieldRef<"ShopifyInstall", 'String'>
    readonly createdAt: FieldRef<"ShopifyInstall", 'DateTime'>
    readonly updatedAt: FieldRef<"ShopifyInstall", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ShopifyInstall findUnique
   */
  export type ShopifyInstallFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopifyInstall
     */
    select?: ShopifyInstallSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopifyInstall
     */
    omit?: ShopifyInstallOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopifyInstallInclude<ExtArgs> | null
    /**
     * Filter, which ShopifyInstall to fetch.
     */
    where: ShopifyInstallWhereUniqueInput
  }

  /**
   * ShopifyInstall findUniqueOrThrow
   */
  export type ShopifyInstallFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopifyInstall
     */
    select?: ShopifyInstallSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopifyInstall
     */
    omit?: ShopifyInstallOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopifyInstallInclude<ExtArgs> | null
    /**
     * Filter, which ShopifyInstall to fetch.
     */
    where: ShopifyInstallWhereUniqueInput
  }

  /**
   * ShopifyInstall findFirst
   */
  export type ShopifyInstallFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopifyInstall
     */
    select?: ShopifyInstallSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopifyInstall
     */
    omit?: ShopifyInstallOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopifyInstallInclude<ExtArgs> | null
    /**
     * Filter, which ShopifyInstall to fetch.
     */
    where?: ShopifyInstallWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShopifyInstalls to fetch.
     */
    orderBy?: ShopifyInstallOrderByWithRelationInput | ShopifyInstallOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ShopifyInstalls.
     */
    cursor?: ShopifyInstallWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShopifyInstalls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShopifyInstalls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ShopifyInstalls.
     */
    distinct?: ShopifyInstallScalarFieldEnum | ShopifyInstallScalarFieldEnum[]
  }

  /**
   * ShopifyInstall findFirstOrThrow
   */
  export type ShopifyInstallFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopifyInstall
     */
    select?: ShopifyInstallSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopifyInstall
     */
    omit?: ShopifyInstallOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopifyInstallInclude<ExtArgs> | null
    /**
     * Filter, which ShopifyInstall to fetch.
     */
    where?: ShopifyInstallWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShopifyInstalls to fetch.
     */
    orderBy?: ShopifyInstallOrderByWithRelationInput | ShopifyInstallOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ShopifyInstalls.
     */
    cursor?: ShopifyInstallWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShopifyInstalls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShopifyInstalls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ShopifyInstalls.
     */
    distinct?: ShopifyInstallScalarFieldEnum | ShopifyInstallScalarFieldEnum[]
  }

  /**
   * ShopifyInstall findMany
   */
  export type ShopifyInstallFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopifyInstall
     */
    select?: ShopifyInstallSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopifyInstall
     */
    omit?: ShopifyInstallOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopifyInstallInclude<ExtArgs> | null
    /**
     * Filter, which ShopifyInstalls to fetch.
     */
    where?: ShopifyInstallWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShopifyInstalls to fetch.
     */
    orderBy?: ShopifyInstallOrderByWithRelationInput | ShopifyInstallOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ShopifyInstalls.
     */
    cursor?: ShopifyInstallWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShopifyInstalls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShopifyInstalls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ShopifyInstalls.
     */
    distinct?: ShopifyInstallScalarFieldEnum | ShopifyInstallScalarFieldEnum[]
  }

  /**
   * ShopifyInstall create
   */
  export type ShopifyInstallCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopifyInstall
     */
    select?: ShopifyInstallSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopifyInstall
     */
    omit?: ShopifyInstallOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopifyInstallInclude<ExtArgs> | null
    /**
     * The data needed to create a ShopifyInstall.
     */
    data: XOR<ShopifyInstallCreateInput, ShopifyInstallUncheckedCreateInput>
  }

  /**
   * ShopifyInstall createMany
   */
  export type ShopifyInstallCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ShopifyInstalls.
     */
    data: ShopifyInstallCreateManyInput | ShopifyInstallCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ShopifyInstall createManyAndReturn
   */
  export type ShopifyInstallCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopifyInstall
     */
    select?: ShopifyInstallSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ShopifyInstall
     */
    omit?: ShopifyInstallOmit<ExtArgs> | null
    /**
     * The data used to create many ShopifyInstalls.
     */
    data: ShopifyInstallCreateManyInput | ShopifyInstallCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopifyInstallIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ShopifyInstall update
   */
  export type ShopifyInstallUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopifyInstall
     */
    select?: ShopifyInstallSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopifyInstall
     */
    omit?: ShopifyInstallOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopifyInstallInclude<ExtArgs> | null
    /**
     * The data needed to update a ShopifyInstall.
     */
    data: XOR<ShopifyInstallUpdateInput, ShopifyInstallUncheckedUpdateInput>
    /**
     * Choose, which ShopifyInstall to update.
     */
    where: ShopifyInstallWhereUniqueInput
  }

  /**
   * ShopifyInstall updateMany
   */
  export type ShopifyInstallUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ShopifyInstalls.
     */
    data: XOR<ShopifyInstallUpdateManyMutationInput, ShopifyInstallUncheckedUpdateManyInput>
    /**
     * Filter which ShopifyInstalls to update
     */
    where?: ShopifyInstallWhereInput
    /**
     * Limit how many ShopifyInstalls to update.
     */
    limit?: number
  }

  /**
   * ShopifyInstall updateManyAndReturn
   */
  export type ShopifyInstallUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopifyInstall
     */
    select?: ShopifyInstallSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ShopifyInstall
     */
    omit?: ShopifyInstallOmit<ExtArgs> | null
    /**
     * The data used to update ShopifyInstalls.
     */
    data: XOR<ShopifyInstallUpdateManyMutationInput, ShopifyInstallUncheckedUpdateManyInput>
    /**
     * Filter which ShopifyInstalls to update
     */
    where?: ShopifyInstallWhereInput
    /**
     * Limit how many ShopifyInstalls to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopifyInstallIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ShopifyInstall upsert
   */
  export type ShopifyInstallUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopifyInstall
     */
    select?: ShopifyInstallSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopifyInstall
     */
    omit?: ShopifyInstallOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopifyInstallInclude<ExtArgs> | null
    /**
     * The filter to search for the ShopifyInstall to update in case it exists.
     */
    where: ShopifyInstallWhereUniqueInput
    /**
     * In case the ShopifyInstall found by the `where` argument doesn't exist, create a new ShopifyInstall with this data.
     */
    create: XOR<ShopifyInstallCreateInput, ShopifyInstallUncheckedCreateInput>
    /**
     * In case the ShopifyInstall was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ShopifyInstallUpdateInput, ShopifyInstallUncheckedUpdateInput>
  }

  /**
   * ShopifyInstall delete
   */
  export type ShopifyInstallDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopifyInstall
     */
    select?: ShopifyInstallSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopifyInstall
     */
    omit?: ShopifyInstallOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopifyInstallInclude<ExtArgs> | null
    /**
     * Filter which ShopifyInstall to delete.
     */
    where: ShopifyInstallWhereUniqueInput
  }

  /**
   * ShopifyInstall deleteMany
   */
  export type ShopifyInstallDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ShopifyInstalls to delete
     */
    where?: ShopifyInstallWhereInput
    /**
     * Limit how many ShopifyInstalls to delete.
     */
    limit?: number
  }

  /**
   * ShopifyInstall.company
   */
  export type ShopifyInstall$companyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    where?: CompanyWhereInput
  }

  /**
   * ShopifyInstall without action
   */
  export type ShopifyInstallDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopifyInstall
     */
    select?: ShopifyInstallSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopifyInstall
     */
    omit?: ShopifyInstallOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopifyInstallInclude<ExtArgs> | null
  }


  /**
   * Model PartnerInquiry
   */

  export type AggregatePartnerInquiry = {
    _count: PartnerInquiryCountAggregateOutputType | null
    _min: PartnerInquiryMinAggregateOutputType | null
    _max: PartnerInquiryMaxAggregateOutputType | null
  }

  export type PartnerInquiryMinAggregateOutputType = {
    id: string | null
    companyName: string | null
    website: string | null
    contactName: string | null
    email: string | null
    partnershipType: string | null
    message: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PartnerInquiryMaxAggregateOutputType = {
    id: string | null
    companyName: string | null
    website: string | null
    contactName: string | null
    email: string | null
    partnershipType: string | null
    message: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PartnerInquiryCountAggregateOutputType = {
    id: number
    companyName: number
    website: number
    contactName: number
    email: number
    partnershipType: number
    message: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PartnerInquiryMinAggregateInputType = {
    id?: true
    companyName?: true
    website?: true
    contactName?: true
    email?: true
    partnershipType?: true
    message?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PartnerInquiryMaxAggregateInputType = {
    id?: true
    companyName?: true
    website?: true
    contactName?: true
    email?: true
    partnershipType?: true
    message?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PartnerInquiryCountAggregateInputType = {
    id?: true
    companyName?: true
    website?: true
    contactName?: true
    email?: true
    partnershipType?: true
    message?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PartnerInquiryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PartnerInquiry to aggregate.
     */
    where?: PartnerInquiryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PartnerInquiries to fetch.
     */
    orderBy?: PartnerInquiryOrderByWithRelationInput | PartnerInquiryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PartnerInquiryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PartnerInquiries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PartnerInquiries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PartnerInquiries
    **/
    _count?: true | PartnerInquiryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PartnerInquiryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PartnerInquiryMaxAggregateInputType
  }

  export type GetPartnerInquiryAggregateType<T extends PartnerInquiryAggregateArgs> = {
        [P in keyof T & keyof AggregatePartnerInquiry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePartnerInquiry[P]>
      : GetScalarType<T[P], AggregatePartnerInquiry[P]>
  }




  export type PartnerInquiryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PartnerInquiryWhereInput
    orderBy?: PartnerInquiryOrderByWithAggregationInput | PartnerInquiryOrderByWithAggregationInput[]
    by: PartnerInquiryScalarFieldEnum[] | PartnerInquiryScalarFieldEnum
    having?: PartnerInquiryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PartnerInquiryCountAggregateInputType | true
    _min?: PartnerInquiryMinAggregateInputType
    _max?: PartnerInquiryMaxAggregateInputType
  }

  export type PartnerInquiryGroupByOutputType = {
    id: string
    companyName: string
    website: string | null
    contactName: string
    email: string
    partnershipType: string
    message: string
    status: string
    createdAt: Date
    updatedAt: Date
    _count: PartnerInquiryCountAggregateOutputType | null
    _min: PartnerInquiryMinAggregateOutputType | null
    _max: PartnerInquiryMaxAggregateOutputType | null
  }

  type GetPartnerInquiryGroupByPayload<T extends PartnerInquiryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PartnerInquiryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PartnerInquiryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PartnerInquiryGroupByOutputType[P]>
            : GetScalarType<T[P], PartnerInquiryGroupByOutputType[P]>
        }
      >
    >


  export type PartnerInquirySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyName?: boolean
    website?: boolean
    contactName?: boolean
    email?: boolean
    partnershipType?: boolean
    message?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["partnerInquiry"]>

  export type PartnerInquirySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyName?: boolean
    website?: boolean
    contactName?: boolean
    email?: boolean
    partnershipType?: boolean
    message?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["partnerInquiry"]>

  export type PartnerInquirySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyName?: boolean
    website?: boolean
    contactName?: boolean
    email?: boolean
    partnershipType?: boolean
    message?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["partnerInquiry"]>

  export type PartnerInquirySelectScalar = {
    id?: boolean
    companyName?: boolean
    website?: boolean
    contactName?: boolean
    email?: boolean
    partnershipType?: boolean
    message?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PartnerInquiryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "companyName" | "website" | "contactName" | "email" | "partnershipType" | "message" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["partnerInquiry"]>

  export type $PartnerInquiryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PartnerInquiry"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      companyName: string
      website: string | null
      contactName: string
      email: string
      partnershipType: string
      message: string
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["partnerInquiry"]>
    composites: {}
  }

  type PartnerInquiryGetPayload<S extends boolean | null | undefined | PartnerInquiryDefaultArgs> = $Result.GetResult<Prisma.$PartnerInquiryPayload, S>

  type PartnerInquiryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PartnerInquiryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PartnerInquiryCountAggregateInputType | true
    }

  export interface PartnerInquiryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PartnerInquiry'], meta: { name: 'PartnerInquiry' } }
    /**
     * Find zero or one PartnerInquiry that matches the filter.
     * @param {PartnerInquiryFindUniqueArgs} args - Arguments to find a PartnerInquiry
     * @example
     * // Get one PartnerInquiry
     * const partnerInquiry = await prisma.partnerInquiry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PartnerInquiryFindUniqueArgs>(args: SelectSubset<T, PartnerInquiryFindUniqueArgs<ExtArgs>>): Prisma__PartnerInquiryClient<$Result.GetResult<Prisma.$PartnerInquiryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PartnerInquiry that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PartnerInquiryFindUniqueOrThrowArgs} args - Arguments to find a PartnerInquiry
     * @example
     * // Get one PartnerInquiry
     * const partnerInquiry = await prisma.partnerInquiry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PartnerInquiryFindUniqueOrThrowArgs>(args: SelectSubset<T, PartnerInquiryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PartnerInquiryClient<$Result.GetResult<Prisma.$PartnerInquiryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PartnerInquiry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerInquiryFindFirstArgs} args - Arguments to find a PartnerInquiry
     * @example
     * // Get one PartnerInquiry
     * const partnerInquiry = await prisma.partnerInquiry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PartnerInquiryFindFirstArgs>(args?: SelectSubset<T, PartnerInquiryFindFirstArgs<ExtArgs>>): Prisma__PartnerInquiryClient<$Result.GetResult<Prisma.$PartnerInquiryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PartnerInquiry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerInquiryFindFirstOrThrowArgs} args - Arguments to find a PartnerInquiry
     * @example
     * // Get one PartnerInquiry
     * const partnerInquiry = await prisma.partnerInquiry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PartnerInquiryFindFirstOrThrowArgs>(args?: SelectSubset<T, PartnerInquiryFindFirstOrThrowArgs<ExtArgs>>): Prisma__PartnerInquiryClient<$Result.GetResult<Prisma.$PartnerInquiryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PartnerInquiries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerInquiryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PartnerInquiries
     * const partnerInquiries = await prisma.partnerInquiry.findMany()
     * 
     * // Get first 10 PartnerInquiries
     * const partnerInquiries = await prisma.partnerInquiry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const partnerInquiryWithIdOnly = await prisma.partnerInquiry.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PartnerInquiryFindManyArgs>(args?: SelectSubset<T, PartnerInquiryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartnerInquiryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PartnerInquiry.
     * @param {PartnerInquiryCreateArgs} args - Arguments to create a PartnerInquiry.
     * @example
     * // Create one PartnerInquiry
     * const PartnerInquiry = await prisma.partnerInquiry.create({
     *   data: {
     *     // ... data to create a PartnerInquiry
     *   }
     * })
     * 
     */
    create<T extends PartnerInquiryCreateArgs>(args: SelectSubset<T, PartnerInquiryCreateArgs<ExtArgs>>): Prisma__PartnerInquiryClient<$Result.GetResult<Prisma.$PartnerInquiryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PartnerInquiries.
     * @param {PartnerInquiryCreateManyArgs} args - Arguments to create many PartnerInquiries.
     * @example
     * // Create many PartnerInquiries
     * const partnerInquiry = await prisma.partnerInquiry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PartnerInquiryCreateManyArgs>(args?: SelectSubset<T, PartnerInquiryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PartnerInquiries and returns the data saved in the database.
     * @param {PartnerInquiryCreateManyAndReturnArgs} args - Arguments to create many PartnerInquiries.
     * @example
     * // Create many PartnerInquiries
     * const partnerInquiry = await prisma.partnerInquiry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PartnerInquiries and only return the `id`
     * const partnerInquiryWithIdOnly = await prisma.partnerInquiry.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PartnerInquiryCreateManyAndReturnArgs>(args?: SelectSubset<T, PartnerInquiryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartnerInquiryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PartnerInquiry.
     * @param {PartnerInquiryDeleteArgs} args - Arguments to delete one PartnerInquiry.
     * @example
     * // Delete one PartnerInquiry
     * const PartnerInquiry = await prisma.partnerInquiry.delete({
     *   where: {
     *     // ... filter to delete one PartnerInquiry
     *   }
     * })
     * 
     */
    delete<T extends PartnerInquiryDeleteArgs>(args: SelectSubset<T, PartnerInquiryDeleteArgs<ExtArgs>>): Prisma__PartnerInquiryClient<$Result.GetResult<Prisma.$PartnerInquiryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PartnerInquiry.
     * @param {PartnerInquiryUpdateArgs} args - Arguments to update one PartnerInquiry.
     * @example
     * // Update one PartnerInquiry
     * const partnerInquiry = await prisma.partnerInquiry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PartnerInquiryUpdateArgs>(args: SelectSubset<T, PartnerInquiryUpdateArgs<ExtArgs>>): Prisma__PartnerInquiryClient<$Result.GetResult<Prisma.$PartnerInquiryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PartnerInquiries.
     * @param {PartnerInquiryDeleteManyArgs} args - Arguments to filter PartnerInquiries to delete.
     * @example
     * // Delete a few PartnerInquiries
     * const { count } = await prisma.partnerInquiry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PartnerInquiryDeleteManyArgs>(args?: SelectSubset<T, PartnerInquiryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PartnerInquiries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerInquiryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PartnerInquiries
     * const partnerInquiry = await prisma.partnerInquiry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PartnerInquiryUpdateManyArgs>(args: SelectSubset<T, PartnerInquiryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PartnerInquiries and returns the data updated in the database.
     * @param {PartnerInquiryUpdateManyAndReturnArgs} args - Arguments to update many PartnerInquiries.
     * @example
     * // Update many PartnerInquiries
     * const partnerInquiry = await prisma.partnerInquiry.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PartnerInquiries and only return the `id`
     * const partnerInquiryWithIdOnly = await prisma.partnerInquiry.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PartnerInquiryUpdateManyAndReturnArgs>(args: SelectSubset<T, PartnerInquiryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartnerInquiryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PartnerInquiry.
     * @param {PartnerInquiryUpsertArgs} args - Arguments to update or create a PartnerInquiry.
     * @example
     * // Update or create a PartnerInquiry
     * const partnerInquiry = await prisma.partnerInquiry.upsert({
     *   create: {
     *     // ... data to create a PartnerInquiry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PartnerInquiry we want to update
     *   }
     * })
     */
    upsert<T extends PartnerInquiryUpsertArgs>(args: SelectSubset<T, PartnerInquiryUpsertArgs<ExtArgs>>): Prisma__PartnerInquiryClient<$Result.GetResult<Prisma.$PartnerInquiryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PartnerInquiries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerInquiryCountArgs} args - Arguments to filter PartnerInquiries to count.
     * @example
     * // Count the number of PartnerInquiries
     * const count = await prisma.partnerInquiry.count({
     *   where: {
     *     // ... the filter for the PartnerInquiries we want to count
     *   }
     * })
    **/
    count<T extends PartnerInquiryCountArgs>(
      args?: Subset<T, PartnerInquiryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PartnerInquiryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PartnerInquiry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerInquiryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PartnerInquiryAggregateArgs>(args: Subset<T, PartnerInquiryAggregateArgs>): Prisma.PrismaPromise<GetPartnerInquiryAggregateType<T>>

    /**
     * Group by PartnerInquiry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerInquiryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PartnerInquiryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PartnerInquiryGroupByArgs['orderBy'] }
        : { orderBy?: PartnerInquiryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PartnerInquiryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPartnerInquiryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PartnerInquiry model
   */
  readonly fields: PartnerInquiryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PartnerInquiry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PartnerInquiryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PartnerInquiry model
   */
  interface PartnerInquiryFieldRefs {
    readonly id: FieldRef<"PartnerInquiry", 'String'>
    readonly companyName: FieldRef<"PartnerInquiry", 'String'>
    readonly website: FieldRef<"PartnerInquiry", 'String'>
    readonly contactName: FieldRef<"PartnerInquiry", 'String'>
    readonly email: FieldRef<"PartnerInquiry", 'String'>
    readonly partnershipType: FieldRef<"PartnerInquiry", 'String'>
    readonly message: FieldRef<"PartnerInquiry", 'String'>
    readonly status: FieldRef<"PartnerInquiry", 'String'>
    readonly createdAt: FieldRef<"PartnerInquiry", 'DateTime'>
    readonly updatedAt: FieldRef<"PartnerInquiry", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PartnerInquiry findUnique
   */
  export type PartnerInquiryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartnerInquiry
     */
    select?: PartnerInquirySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PartnerInquiry
     */
    omit?: PartnerInquiryOmit<ExtArgs> | null
    /**
     * Filter, which PartnerInquiry to fetch.
     */
    where: PartnerInquiryWhereUniqueInput
  }

  /**
   * PartnerInquiry findUniqueOrThrow
   */
  export type PartnerInquiryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartnerInquiry
     */
    select?: PartnerInquirySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PartnerInquiry
     */
    omit?: PartnerInquiryOmit<ExtArgs> | null
    /**
     * Filter, which PartnerInquiry to fetch.
     */
    where: PartnerInquiryWhereUniqueInput
  }

  /**
   * PartnerInquiry findFirst
   */
  export type PartnerInquiryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartnerInquiry
     */
    select?: PartnerInquirySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PartnerInquiry
     */
    omit?: PartnerInquiryOmit<ExtArgs> | null
    /**
     * Filter, which PartnerInquiry to fetch.
     */
    where?: PartnerInquiryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PartnerInquiries to fetch.
     */
    orderBy?: PartnerInquiryOrderByWithRelationInput | PartnerInquiryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PartnerInquiries.
     */
    cursor?: PartnerInquiryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PartnerInquiries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PartnerInquiries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PartnerInquiries.
     */
    distinct?: PartnerInquiryScalarFieldEnum | PartnerInquiryScalarFieldEnum[]
  }

  /**
   * PartnerInquiry findFirstOrThrow
   */
  export type PartnerInquiryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartnerInquiry
     */
    select?: PartnerInquirySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PartnerInquiry
     */
    omit?: PartnerInquiryOmit<ExtArgs> | null
    /**
     * Filter, which PartnerInquiry to fetch.
     */
    where?: PartnerInquiryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PartnerInquiries to fetch.
     */
    orderBy?: PartnerInquiryOrderByWithRelationInput | PartnerInquiryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PartnerInquiries.
     */
    cursor?: PartnerInquiryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PartnerInquiries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PartnerInquiries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PartnerInquiries.
     */
    distinct?: PartnerInquiryScalarFieldEnum | PartnerInquiryScalarFieldEnum[]
  }

  /**
   * PartnerInquiry findMany
   */
  export type PartnerInquiryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartnerInquiry
     */
    select?: PartnerInquirySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PartnerInquiry
     */
    omit?: PartnerInquiryOmit<ExtArgs> | null
    /**
     * Filter, which PartnerInquiries to fetch.
     */
    where?: PartnerInquiryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PartnerInquiries to fetch.
     */
    orderBy?: PartnerInquiryOrderByWithRelationInput | PartnerInquiryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PartnerInquiries.
     */
    cursor?: PartnerInquiryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PartnerInquiries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PartnerInquiries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PartnerInquiries.
     */
    distinct?: PartnerInquiryScalarFieldEnum | PartnerInquiryScalarFieldEnum[]
  }

  /**
   * PartnerInquiry create
   */
  export type PartnerInquiryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartnerInquiry
     */
    select?: PartnerInquirySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PartnerInquiry
     */
    omit?: PartnerInquiryOmit<ExtArgs> | null
    /**
     * The data needed to create a PartnerInquiry.
     */
    data: XOR<PartnerInquiryCreateInput, PartnerInquiryUncheckedCreateInput>
  }

  /**
   * PartnerInquiry createMany
   */
  export type PartnerInquiryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PartnerInquiries.
     */
    data: PartnerInquiryCreateManyInput | PartnerInquiryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PartnerInquiry createManyAndReturn
   */
  export type PartnerInquiryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartnerInquiry
     */
    select?: PartnerInquirySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PartnerInquiry
     */
    omit?: PartnerInquiryOmit<ExtArgs> | null
    /**
     * The data used to create many PartnerInquiries.
     */
    data: PartnerInquiryCreateManyInput | PartnerInquiryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PartnerInquiry update
   */
  export type PartnerInquiryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartnerInquiry
     */
    select?: PartnerInquirySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PartnerInquiry
     */
    omit?: PartnerInquiryOmit<ExtArgs> | null
    /**
     * The data needed to update a PartnerInquiry.
     */
    data: XOR<PartnerInquiryUpdateInput, PartnerInquiryUncheckedUpdateInput>
    /**
     * Choose, which PartnerInquiry to update.
     */
    where: PartnerInquiryWhereUniqueInput
  }

  /**
   * PartnerInquiry updateMany
   */
  export type PartnerInquiryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PartnerInquiries.
     */
    data: XOR<PartnerInquiryUpdateManyMutationInput, PartnerInquiryUncheckedUpdateManyInput>
    /**
     * Filter which PartnerInquiries to update
     */
    where?: PartnerInquiryWhereInput
    /**
     * Limit how many PartnerInquiries to update.
     */
    limit?: number
  }

  /**
   * PartnerInquiry updateManyAndReturn
   */
  export type PartnerInquiryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartnerInquiry
     */
    select?: PartnerInquirySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PartnerInquiry
     */
    omit?: PartnerInquiryOmit<ExtArgs> | null
    /**
     * The data used to update PartnerInquiries.
     */
    data: XOR<PartnerInquiryUpdateManyMutationInput, PartnerInquiryUncheckedUpdateManyInput>
    /**
     * Filter which PartnerInquiries to update
     */
    where?: PartnerInquiryWhereInput
    /**
     * Limit how many PartnerInquiries to update.
     */
    limit?: number
  }

  /**
   * PartnerInquiry upsert
   */
  export type PartnerInquiryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartnerInquiry
     */
    select?: PartnerInquirySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PartnerInquiry
     */
    omit?: PartnerInquiryOmit<ExtArgs> | null
    /**
     * The filter to search for the PartnerInquiry to update in case it exists.
     */
    where: PartnerInquiryWhereUniqueInput
    /**
     * In case the PartnerInquiry found by the `where` argument doesn't exist, create a new PartnerInquiry with this data.
     */
    create: XOR<PartnerInquiryCreateInput, PartnerInquiryUncheckedCreateInput>
    /**
     * In case the PartnerInquiry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PartnerInquiryUpdateInput, PartnerInquiryUncheckedUpdateInput>
  }

  /**
   * PartnerInquiry delete
   */
  export type PartnerInquiryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartnerInquiry
     */
    select?: PartnerInquirySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PartnerInquiry
     */
    omit?: PartnerInquiryOmit<ExtArgs> | null
    /**
     * Filter which PartnerInquiry to delete.
     */
    where: PartnerInquiryWhereUniqueInput
  }

  /**
   * PartnerInquiry deleteMany
   */
  export type PartnerInquiryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PartnerInquiries to delete
     */
    where?: PartnerInquiryWhereInput
    /**
     * Limit how many PartnerInquiries to delete.
     */
    limit?: number
  }

  /**
   * PartnerInquiry without action
   */
  export type PartnerInquiryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartnerInquiry
     */
    select?: PartnerInquirySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PartnerInquiry
     */
    omit?: PartnerInquiryOmit<ExtArgs> | null
  }


  /**
   * Model StopNote
   */

  export type AggregateStopNote = {
    _count: StopNoteCountAggregateOutputType | null
    _min: StopNoteMinAggregateOutputType | null
    _max: StopNoteMaxAggregateOutputType | null
  }

  export type StopNoteMinAggregateOutputType = {
    id: string | null
    companyId: string | null
    companyName: string | null
    address: string | null
    contactName: string | null
    contactPhone: string | null
    gateCode: string | null
    dockInfo: string | null
    hours: string | null
    parkingNotes: string | null
    accessNotes: string | null
    deliveryNotes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StopNoteMaxAggregateOutputType = {
    id: string | null
    companyId: string | null
    companyName: string | null
    address: string | null
    contactName: string | null
    contactPhone: string | null
    gateCode: string | null
    dockInfo: string | null
    hours: string | null
    parkingNotes: string | null
    accessNotes: string | null
    deliveryNotes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StopNoteCountAggregateOutputType = {
    id: number
    companyId: number
    companyName: number
    address: number
    contactName: number
    contactPhone: number
    gateCode: number
    dockInfo: number
    hours: number
    parkingNotes: number
    accessNotes: number
    deliveryNotes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StopNoteMinAggregateInputType = {
    id?: true
    companyId?: true
    companyName?: true
    address?: true
    contactName?: true
    contactPhone?: true
    gateCode?: true
    dockInfo?: true
    hours?: true
    parkingNotes?: true
    accessNotes?: true
    deliveryNotes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StopNoteMaxAggregateInputType = {
    id?: true
    companyId?: true
    companyName?: true
    address?: true
    contactName?: true
    contactPhone?: true
    gateCode?: true
    dockInfo?: true
    hours?: true
    parkingNotes?: true
    accessNotes?: true
    deliveryNotes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StopNoteCountAggregateInputType = {
    id?: true
    companyId?: true
    companyName?: true
    address?: true
    contactName?: true
    contactPhone?: true
    gateCode?: true
    dockInfo?: true
    hours?: true
    parkingNotes?: true
    accessNotes?: true
    deliveryNotes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StopNoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StopNote to aggregate.
     */
    where?: StopNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StopNotes to fetch.
     */
    orderBy?: StopNoteOrderByWithRelationInput | StopNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StopNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StopNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StopNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StopNotes
    **/
    _count?: true | StopNoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StopNoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StopNoteMaxAggregateInputType
  }

  export type GetStopNoteAggregateType<T extends StopNoteAggregateArgs> = {
        [P in keyof T & keyof AggregateStopNote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStopNote[P]>
      : GetScalarType<T[P], AggregateStopNote[P]>
  }




  export type StopNoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StopNoteWhereInput
    orderBy?: StopNoteOrderByWithAggregationInput | StopNoteOrderByWithAggregationInput[]
    by: StopNoteScalarFieldEnum[] | StopNoteScalarFieldEnum
    having?: StopNoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StopNoteCountAggregateInputType | true
    _min?: StopNoteMinAggregateInputType
    _max?: StopNoteMaxAggregateInputType
  }

  export type StopNoteGroupByOutputType = {
    id: string
    companyId: string
    companyName: string
    address: string
    contactName: string | null
    contactPhone: string | null
    gateCode: string | null
    dockInfo: string | null
    hours: string | null
    parkingNotes: string | null
    accessNotes: string | null
    deliveryNotes: string | null
    createdAt: Date
    updatedAt: Date
    _count: StopNoteCountAggregateOutputType | null
    _min: StopNoteMinAggregateOutputType | null
    _max: StopNoteMaxAggregateOutputType | null
  }

  type GetStopNoteGroupByPayload<T extends StopNoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StopNoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StopNoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StopNoteGroupByOutputType[P]>
            : GetScalarType<T[P], StopNoteGroupByOutputType[P]>
        }
      >
    >


  export type StopNoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    companyName?: boolean
    address?: boolean
    contactName?: boolean
    contactPhone?: boolean
    gateCode?: boolean
    dockInfo?: boolean
    hours?: boolean
    parkingNotes?: boolean
    accessNotes?: boolean
    deliveryNotes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    readinessChecks?: boolean | StopNote$readinessChecksArgs<ExtArgs>
    exceptionLogs?: boolean | StopNote$exceptionLogsArgs<ExtArgs>
    jobStops?: boolean | StopNote$jobStopsArgs<ExtArgs>
    _count?: boolean | StopNoteCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stopNote"]>

  export type StopNoteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    companyName?: boolean
    address?: boolean
    contactName?: boolean
    contactPhone?: boolean
    gateCode?: boolean
    dockInfo?: boolean
    hours?: boolean
    parkingNotes?: boolean
    accessNotes?: boolean
    deliveryNotes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stopNote"]>

  export type StopNoteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    companyName?: boolean
    address?: boolean
    contactName?: boolean
    contactPhone?: boolean
    gateCode?: boolean
    dockInfo?: boolean
    hours?: boolean
    parkingNotes?: boolean
    accessNotes?: boolean
    deliveryNotes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stopNote"]>

  export type StopNoteSelectScalar = {
    id?: boolean
    companyId?: boolean
    companyName?: boolean
    address?: boolean
    contactName?: boolean
    contactPhone?: boolean
    gateCode?: boolean
    dockInfo?: boolean
    hours?: boolean
    parkingNotes?: boolean
    accessNotes?: boolean
    deliveryNotes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StopNoteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "companyId" | "companyName" | "address" | "contactName" | "contactPhone" | "gateCode" | "dockInfo" | "hours" | "parkingNotes" | "accessNotes" | "deliveryNotes" | "createdAt" | "updatedAt", ExtArgs["result"]["stopNote"]>
  export type StopNoteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    readinessChecks?: boolean | StopNote$readinessChecksArgs<ExtArgs>
    exceptionLogs?: boolean | StopNote$exceptionLogsArgs<ExtArgs>
    jobStops?: boolean | StopNote$jobStopsArgs<ExtArgs>
    _count?: boolean | StopNoteCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StopNoteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type StopNoteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $StopNotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StopNote"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
      readinessChecks: Prisma.$ReadinessCheckPayload<ExtArgs>[]
      exceptionLogs: Prisma.$ExceptionLogPayload<ExtArgs>[]
      jobStops: Prisma.$JobStopPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      companyId: string
      companyName: string
      address: string
      contactName: string | null
      contactPhone: string | null
      gateCode: string | null
      dockInfo: string | null
      hours: string | null
      parkingNotes: string | null
      accessNotes: string | null
      deliveryNotes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["stopNote"]>
    composites: {}
  }

  type StopNoteGetPayload<S extends boolean | null | undefined | StopNoteDefaultArgs> = $Result.GetResult<Prisma.$StopNotePayload, S>

  type StopNoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StopNoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StopNoteCountAggregateInputType | true
    }

  export interface StopNoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StopNote'], meta: { name: 'StopNote' } }
    /**
     * Find zero or one StopNote that matches the filter.
     * @param {StopNoteFindUniqueArgs} args - Arguments to find a StopNote
     * @example
     * // Get one StopNote
     * const stopNote = await prisma.stopNote.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StopNoteFindUniqueArgs>(args: SelectSubset<T, StopNoteFindUniqueArgs<ExtArgs>>): Prisma__StopNoteClient<$Result.GetResult<Prisma.$StopNotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StopNote that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StopNoteFindUniqueOrThrowArgs} args - Arguments to find a StopNote
     * @example
     * // Get one StopNote
     * const stopNote = await prisma.stopNote.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StopNoteFindUniqueOrThrowArgs>(args: SelectSubset<T, StopNoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StopNoteClient<$Result.GetResult<Prisma.$StopNotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StopNote that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StopNoteFindFirstArgs} args - Arguments to find a StopNote
     * @example
     * // Get one StopNote
     * const stopNote = await prisma.stopNote.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StopNoteFindFirstArgs>(args?: SelectSubset<T, StopNoteFindFirstArgs<ExtArgs>>): Prisma__StopNoteClient<$Result.GetResult<Prisma.$StopNotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StopNote that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StopNoteFindFirstOrThrowArgs} args - Arguments to find a StopNote
     * @example
     * // Get one StopNote
     * const stopNote = await prisma.stopNote.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StopNoteFindFirstOrThrowArgs>(args?: SelectSubset<T, StopNoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__StopNoteClient<$Result.GetResult<Prisma.$StopNotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StopNotes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StopNoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StopNotes
     * const stopNotes = await prisma.stopNote.findMany()
     * 
     * // Get first 10 StopNotes
     * const stopNotes = await prisma.stopNote.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const stopNoteWithIdOnly = await prisma.stopNote.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StopNoteFindManyArgs>(args?: SelectSubset<T, StopNoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StopNotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StopNote.
     * @param {StopNoteCreateArgs} args - Arguments to create a StopNote.
     * @example
     * // Create one StopNote
     * const StopNote = await prisma.stopNote.create({
     *   data: {
     *     // ... data to create a StopNote
     *   }
     * })
     * 
     */
    create<T extends StopNoteCreateArgs>(args: SelectSubset<T, StopNoteCreateArgs<ExtArgs>>): Prisma__StopNoteClient<$Result.GetResult<Prisma.$StopNotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StopNotes.
     * @param {StopNoteCreateManyArgs} args - Arguments to create many StopNotes.
     * @example
     * // Create many StopNotes
     * const stopNote = await prisma.stopNote.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StopNoteCreateManyArgs>(args?: SelectSubset<T, StopNoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StopNotes and returns the data saved in the database.
     * @param {StopNoteCreateManyAndReturnArgs} args - Arguments to create many StopNotes.
     * @example
     * // Create many StopNotes
     * const stopNote = await prisma.stopNote.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StopNotes and only return the `id`
     * const stopNoteWithIdOnly = await prisma.stopNote.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StopNoteCreateManyAndReturnArgs>(args?: SelectSubset<T, StopNoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StopNotePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StopNote.
     * @param {StopNoteDeleteArgs} args - Arguments to delete one StopNote.
     * @example
     * // Delete one StopNote
     * const StopNote = await prisma.stopNote.delete({
     *   where: {
     *     // ... filter to delete one StopNote
     *   }
     * })
     * 
     */
    delete<T extends StopNoteDeleteArgs>(args: SelectSubset<T, StopNoteDeleteArgs<ExtArgs>>): Prisma__StopNoteClient<$Result.GetResult<Prisma.$StopNotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StopNote.
     * @param {StopNoteUpdateArgs} args - Arguments to update one StopNote.
     * @example
     * // Update one StopNote
     * const stopNote = await prisma.stopNote.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StopNoteUpdateArgs>(args: SelectSubset<T, StopNoteUpdateArgs<ExtArgs>>): Prisma__StopNoteClient<$Result.GetResult<Prisma.$StopNotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StopNotes.
     * @param {StopNoteDeleteManyArgs} args - Arguments to filter StopNotes to delete.
     * @example
     * // Delete a few StopNotes
     * const { count } = await prisma.stopNote.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StopNoteDeleteManyArgs>(args?: SelectSubset<T, StopNoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StopNotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StopNoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StopNotes
     * const stopNote = await prisma.stopNote.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StopNoteUpdateManyArgs>(args: SelectSubset<T, StopNoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StopNotes and returns the data updated in the database.
     * @param {StopNoteUpdateManyAndReturnArgs} args - Arguments to update many StopNotes.
     * @example
     * // Update many StopNotes
     * const stopNote = await prisma.stopNote.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StopNotes and only return the `id`
     * const stopNoteWithIdOnly = await prisma.stopNote.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StopNoteUpdateManyAndReturnArgs>(args: SelectSubset<T, StopNoteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StopNotePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StopNote.
     * @param {StopNoteUpsertArgs} args - Arguments to update or create a StopNote.
     * @example
     * // Update or create a StopNote
     * const stopNote = await prisma.stopNote.upsert({
     *   create: {
     *     // ... data to create a StopNote
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StopNote we want to update
     *   }
     * })
     */
    upsert<T extends StopNoteUpsertArgs>(args: SelectSubset<T, StopNoteUpsertArgs<ExtArgs>>): Prisma__StopNoteClient<$Result.GetResult<Prisma.$StopNotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StopNotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StopNoteCountArgs} args - Arguments to filter StopNotes to count.
     * @example
     * // Count the number of StopNotes
     * const count = await prisma.stopNote.count({
     *   where: {
     *     // ... the filter for the StopNotes we want to count
     *   }
     * })
    **/
    count<T extends StopNoteCountArgs>(
      args?: Subset<T, StopNoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StopNoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StopNote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StopNoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StopNoteAggregateArgs>(args: Subset<T, StopNoteAggregateArgs>): Prisma.PrismaPromise<GetStopNoteAggregateType<T>>

    /**
     * Group by StopNote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StopNoteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StopNoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StopNoteGroupByArgs['orderBy'] }
        : { orderBy?: StopNoteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StopNoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStopNoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StopNote model
   */
  readonly fields: StopNoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StopNote.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StopNoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    readinessChecks<T extends StopNote$readinessChecksArgs<ExtArgs> = {}>(args?: Subset<T, StopNote$readinessChecksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReadinessCheckPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    exceptionLogs<T extends StopNote$exceptionLogsArgs<ExtArgs> = {}>(args?: Subset<T, StopNote$exceptionLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExceptionLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    jobStops<T extends StopNote$jobStopsArgs<ExtArgs> = {}>(args?: Subset<T, StopNote$jobStopsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobStopPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StopNote model
   */
  interface StopNoteFieldRefs {
    readonly id: FieldRef<"StopNote", 'String'>
    readonly companyId: FieldRef<"StopNote", 'String'>
    readonly companyName: FieldRef<"StopNote", 'String'>
    readonly address: FieldRef<"StopNote", 'String'>
    readonly contactName: FieldRef<"StopNote", 'String'>
    readonly contactPhone: FieldRef<"StopNote", 'String'>
    readonly gateCode: FieldRef<"StopNote", 'String'>
    readonly dockInfo: FieldRef<"StopNote", 'String'>
    readonly hours: FieldRef<"StopNote", 'String'>
    readonly parkingNotes: FieldRef<"StopNote", 'String'>
    readonly accessNotes: FieldRef<"StopNote", 'String'>
    readonly deliveryNotes: FieldRef<"StopNote", 'String'>
    readonly createdAt: FieldRef<"StopNote", 'DateTime'>
    readonly updatedAt: FieldRef<"StopNote", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StopNote findUnique
   */
  export type StopNoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StopNote
     */
    select?: StopNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StopNote
     */
    omit?: StopNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StopNoteInclude<ExtArgs> | null
    /**
     * Filter, which StopNote to fetch.
     */
    where: StopNoteWhereUniqueInput
  }

  /**
   * StopNote findUniqueOrThrow
   */
  export type StopNoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StopNote
     */
    select?: StopNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StopNote
     */
    omit?: StopNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StopNoteInclude<ExtArgs> | null
    /**
     * Filter, which StopNote to fetch.
     */
    where: StopNoteWhereUniqueInput
  }

  /**
   * StopNote findFirst
   */
  export type StopNoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StopNote
     */
    select?: StopNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StopNote
     */
    omit?: StopNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StopNoteInclude<ExtArgs> | null
    /**
     * Filter, which StopNote to fetch.
     */
    where?: StopNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StopNotes to fetch.
     */
    orderBy?: StopNoteOrderByWithRelationInput | StopNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StopNotes.
     */
    cursor?: StopNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StopNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StopNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StopNotes.
     */
    distinct?: StopNoteScalarFieldEnum | StopNoteScalarFieldEnum[]
  }

  /**
   * StopNote findFirstOrThrow
   */
  export type StopNoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StopNote
     */
    select?: StopNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StopNote
     */
    omit?: StopNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StopNoteInclude<ExtArgs> | null
    /**
     * Filter, which StopNote to fetch.
     */
    where?: StopNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StopNotes to fetch.
     */
    orderBy?: StopNoteOrderByWithRelationInput | StopNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StopNotes.
     */
    cursor?: StopNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StopNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StopNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StopNotes.
     */
    distinct?: StopNoteScalarFieldEnum | StopNoteScalarFieldEnum[]
  }

  /**
   * StopNote findMany
   */
  export type StopNoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StopNote
     */
    select?: StopNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StopNote
     */
    omit?: StopNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StopNoteInclude<ExtArgs> | null
    /**
     * Filter, which StopNotes to fetch.
     */
    where?: StopNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StopNotes to fetch.
     */
    orderBy?: StopNoteOrderByWithRelationInput | StopNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StopNotes.
     */
    cursor?: StopNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StopNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StopNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StopNotes.
     */
    distinct?: StopNoteScalarFieldEnum | StopNoteScalarFieldEnum[]
  }

  /**
   * StopNote create
   */
  export type StopNoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StopNote
     */
    select?: StopNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StopNote
     */
    omit?: StopNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StopNoteInclude<ExtArgs> | null
    /**
     * The data needed to create a StopNote.
     */
    data: XOR<StopNoteCreateInput, StopNoteUncheckedCreateInput>
  }

  /**
   * StopNote createMany
   */
  export type StopNoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StopNotes.
     */
    data: StopNoteCreateManyInput | StopNoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StopNote createManyAndReturn
   */
  export type StopNoteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StopNote
     */
    select?: StopNoteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StopNote
     */
    omit?: StopNoteOmit<ExtArgs> | null
    /**
     * The data used to create many StopNotes.
     */
    data: StopNoteCreateManyInput | StopNoteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StopNoteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StopNote update
   */
  export type StopNoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StopNote
     */
    select?: StopNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StopNote
     */
    omit?: StopNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StopNoteInclude<ExtArgs> | null
    /**
     * The data needed to update a StopNote.
     */
    data: XOR<StopNoteUpdateInput, StopNoteUncheckedUpdateInput>
    /**
     * Choose, which StopNote to update.
     */
    where: StopNoteWhereUniqueInput
  }

  /**
   * StopNote updateMany
   */
  export type StopNoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StopNotes.
     */
    data: XOR<StopNoteUpdateManyMutationInput, StopNoteUncheckedUpdateManyInput>
    /**
     * Filter which StopNotes to update
     */
    where?: StopNoteWhereInput
    /**
     * Limit how many StopNotes to update.
     */
    limit?: number
  }

  /**
   * StopNote updateManyAndReturn
   */
  export type StopNoteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StopNote
     */
    select?: StopNoteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StopNote
     */
    omit?: StopNoteOmit<ExtArgs> | null
    /**
     * The data used to update StopNotes.
     */
    data: XOR<StopNoteUpdateManyMutationInput, StopNoteUncheckedUpdateManyInput>
    /**
     * Filter which StopNotes to update
     */
    where?: StopNoteWhereInput
    /**
     * Limit how many StopNotes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StopNoteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * StopNote upsert
   */
  export type StopNoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StopNote
     */
    select?: StopNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StopNote
     */
    omit?: StopNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StopNoteInclude<ExtArgs> | null
    /**
     * The filter to search for the StopNote to update in case it exists.
     */
    where: StopNoteWhereUniqueInput
    /**
     * In case the StopNote found by the `where` argument doesn't exist, create a new StopNote with this data.
     */
    create: XOR<StopNoteCreateInput, StopNoteUncheckedCreateInput>
    /**
     * In case the StopNote was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StopNoteUpdateInput, StopNoteUncheckedUpdateInput>
  }

  /**
   * StopNote delete
   */
  export type StopNoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StopNote
     */
    select?: StopNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StopNote
     */
    omit?: StopNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StopNoteInclude<ExtArgs> | null
    /**
     * Filter which StopNote to delete.
     */
    where: StopNoteWhereUniqueInput
  }

  /**
   * StopNote deleteMany
   */
  export type StopNoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StopNotes to delete
     */
    where?: StopNoteWhereInput
    /**
     * Limit how many StopNotes to delete.
     */
    limit?: number
  }

  /**
   * StopNote.readinessChecks
   */
  export type StopNote$readinessChecksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadinessCheck
     */
    select?: ReadinessCheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadinessCheck
     */
    omit?: ReadinessCheckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadinessCheckInclude<ExtArgs> | null
    where?: ReadinessCheckWhereInput
    orderBy?: ReadinessCheckOrderByWithRelationInput | ReadinessCheckOrderByWithRelationInput[]
    cursor?: ReadinessCheckWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReadinessCheckScalarFieldEnum | ReadinessCheckScalarFieldEnum[]
  }

  /**
   * StopNote.exceptionLogs
   */
  export type StopNote$exceptionLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExceptionLog
     */
    select?: ExceptionLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExceptionLog
     */
    omit?: ExceptionLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExceptionLogInclude<ExtArgs> | null
    where?: ExceptionLogWhereInput
    orderBy?: ExceptionLogOrderByWithRelationInput | ExceptionLogOrderByWithRelationInput[]
    cursor?: ExceptionLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExceptionLogScalarFieldEnum | ExceptionLogScalarFieldEnum[]
  }

  /**
   * StopNote.jobStops
   */
  export type StopNote$jobStopsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobStop
     */
    select?: JobStopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobStop
     */
    omit?: JobStopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobStopInclude<ExtArgs> | null
    where?: JobStopWhereInput
    orderBy?: JobStopOrderByWithRelationInput | JobStopOrderByWithRelationInput[]
    cursor?: JobStopWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JobStopScalarFieldEnum | JobStopScalarFieldEnum[]
  }

  /**
   * StopNote without action
   */
  export type StopNoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StopNote
     */
    select?: StopNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StopNote
     */
    omit?: StopNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StopNoteInclude<ExtArgs> | null
  }


  /**
   * Model ReadinessCheck
   */

  export type AggregateReadinessCheck = {
    _count: ReadinessCheckCountAggregateOutputType | null
    _min: ReadinessCheckMinAggregateOutputType | null
    _max: ReadinessCheckMaxAggregateOutputType | null
  }

  export type ReadinessCheckMinAggregateOutputType = {
    id: string | null
    stopNoteId: string | null
    scheduledDate: Date | null
    contactConfirmed: boolean | null
    addressConfirmed: boolean | null
    accessConfirmed: boolean | null
    siteReady: boolean | null
    notes: string | null
    status: string | null
    createdAt: Date | null
    jobId: string | null
  }

  export type ReadinessCheckMaxAggregateOutputType = {
    id: string | null
    stopNoteId: string | null
    scheduledDate: Date | null
    contactConfirmed: boolean | null
    addressConfirmed: boolean | null
    accessConfirmed: boolean | null
    siteReady: boolean | null
    notes: string | null
    status: string | null
    createdAt: Date | null
    jobId: string | null
  }

  export type ReadinessCheckCountAggregateOutputType = {
    id: number
    stopNoteId: number
    scheduledDate: number
    contactConfirmed: number
    addressConfirmed: number
    accessConfirmed: number
    siteReady: number
    notes: number
    status: number
    createdAt: number
    jobId: number
    _all: number
  }


  export type ReadinessCheckMinAggregateInputType = {
    id?: true
    stopNoteId?: true
    scheduledDate?: true
    contactConfirmed?: true
    addressConfirmed?: true
    accessConfirmed?: true
    siteReady?: true
    notes?: true
    status?: true
    createdAt?: true
    jobId?: true
  }

  export type ReadinessCheckMaxAggregateInputType = {
    id?: true
    stopNoteId?: true
    scheduledDate?: true
    contactConfirmed?: true
    addressConfirmed?: true
    accessConfirmed?: true
    siteReady?: true
    notes?: true
    status?: true
    createdAt?: true
    jobId?: true
  }

  export type ReadinessCheckCountAggregateInputType = {
    id?: true
    stopNoteId?: true
    scheduledDate?: true
    contactConfirmed?: true
    addressConfirmed?: true
    accessConfirmed?: true
    siteReady?: true
    notes?: true
    status?: true
    createdAt?: true
    jobId?: true
    _all?: true
  }

  export type ReadinessCheckAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReadinessCheck to aggregate.
     */
    where?: ReadinessCheckWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReadinessChecks to fetch.
     */
    orderBy?: ReadinessCheckOrderByWithRelationInput | ReadinessCheckOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReadinessCheckWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReadinessChecks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReadinessChecks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ReadinessChecks
    **/
    _count?: true | ReadinessCheckCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReadinessCheckMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReadinessCheckMaxAggregateInputType
  }

  export type GetReadinessCheckAggregateType<T extends ReadinessCheckAggregateArgs> = {
        [P in keyof T & keyof AggregateReadinessCheck]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReadinessCheck[P]>
      : GetScalarType<T[P], AggregateReadinessCheck[P]>
  }




  export type ReadinessCheckGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReadinessCheckWhereInput
    orderBy?: ReadinessCheckOrderByWithAggregationInput | ReadinessCheckOrderByWithAggregationInput[]
    by: ReadinessCheckScalarFieldEnum[] | ReadinessCheckScalarFieldEnum
    having?: ReadinessCheckScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReadinessCheckCountAggregateInputType | true
    _min?: ReadinessCheckMinAggregateInputType
    _max?: ReadinessCheckMaxAggregateInputType
  }

  export type ReadinessCheckGroupByOutputType = {
    id: string
    stopNoteId: string
    scheduledDate: Date
    contactConfirmed: boolean
    addressConfirmed: boolean
    accessConfirmed: boolean
    siteReady: boolean
    notes: string | null
    status: string
    createdAt: Date
    jobId: string | null
    _count: ReadinessCheckCountAggregateOutputType | null
    _min: ReadinessCheckMinAggregateOutputType | null
    _max: ReadinessCheckMaxAggregateOutputType | null
  }

  type GetReadinessCheckGroupByPayload<T extends ReadinessCheckGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReadinessCheckGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReadinessCheckGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReadinessCheckGroupByOutputType[P]>
            : GetScalarType<T[P], ReadinessCheckGroupByOutputType[P]>
        }
      >
    >


  export type ReadinessCheckSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    stopNoteId?: boolean
    scheduledDate?: boolean
    contactConfirmed?: boolean
    addressConfirmed?: boolean
    accessConfirmed?: boolean
    siteReady?: boolean
    notes?: boolean
    status?: boolean
    createdAt?: boolean
    jobId?: boolean
    stopNote?: boolean | StopNoteDefaultArgs<ExtArgs>
    job?: boolean | ReadinessCheck$jobArgs<ExtArgs>
  }, ExtArgs["result"]["readinessCheck"]>

  export type ReadinessCheckSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    stopNoteId?: boolean
    scheduledDate?: boolean
    contactConfirmed?: boolean
    addressConfirmed?: boolean
    accessConfirmed?: boolean
    siteReady?: boolean
    notes?: boolean
    status?: boolean
    createdAt?: boolean
    jobId?: boolean
    stopNote?: boolean | StopNoteDefaultArgs<ExtArgs>
    job?: boolean | ReadinessCheck$jobArgs<ExtArgs>
  }, ExtArgs["result"]["readinessCheck"]>

  export type ReadinessCheckSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    stopNoteId?: boolean
    scheduledDate?: boolean
    contactConfirmed?: boolean
    addressConfirmed?: boolean
    accessConfirmed?: boolean
    siteReady?: boolean
    notes?: boolean
    status?: boolean
    createdAt?: boolean
    jobId?: boolean
    stopNote?: boolean | StopNoteDefaultArgs<ExtArgs>
    job?: boolean | ReadinessCheck$jobArgs<ExtArgs>
  }, ExtArgs["result"]["readinessCheck"]>

  export type ReadinessCheckSelectScalar = {
    id?: boolean
    stopNoteId?: boolean
    scheduledDate?: boolean
    contactConfirmed?: boolean
    addressConfirmed?: boolean
    accessConfirmed?: boolean
    siteReady?: boolean
    notes?: boolean
    status?: boolean
    createdAt?: boolean
    jobId?: boolean
  }

  export type ReadinessCheckOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "stopNoteId" | "scheduledDate" | "contactConfirmed" | "addressConfirmed" | "accessConfirmed" | "siteReady" | "notes" | "status" | "createdAt" | "jobId", ExtArgs["result"]["readinessCheck"]>
  export type ReadinessCheckInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stopNote?: boolean | StopNoteDefaultArgs<ExtArgs>
    job?: boolean | ReadinessCheck$jobArgs<ExtArgs>
  }
  export type ReadinessCheckIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stopNote?: boolean | StopNoteDefaultArgs<ExtArgs>
    job?: boolean | ReadinessCheck$jobArgs<ExtArgs>
  }
  export type ReadinessCheckIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stopNote?: boolean | StopNoteDefaultArgs<ExtArgs>
    job?: boolean | ReadinessCheck$jobArgs<ExtArgs>
  }

  export type $ReadinessCheckPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ReadinessCheck"
    objects: {
      stopNote: Prisma.$StopNotePayload<ExtArgs>
      job: Prisma.$JobPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      stopNoteId: string
      scheduledDate: Date
      contactConfirmed: boolean
      addressConfirmed: boolean
      accessConfirmed: boolean
      siteReady: boolean
      notes: string | null
      status: string
      createdAt: Date
      jobId: string | null
    }, ExtArgs["result"]["readinessCheck"]>
    composites: {}
  }

  type ReadinessCheckGetPayload<S extends boolean | null | undefined | ReadinessCheckDefaultArgs> = $Result.GetResult<Prisma.$ReadinessCheckPayload, S>

  type ReadinessCheckCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReadinessCheckFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReadinessCheckCountAggregateInputType | true
    }

  export interface ReadinessCheckDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ReadinessCheck'], meta: { name: 'ReadinessCheck' } }
    /**
     * Find zero or one ReadinessCheck that matches the filter.
     * @param {ReadinessCheckFindUniqueArgs} args - Arguments to find a ReadinessCheck
     * @example
     * // Get one ReadinessCheck
     * const readinessCheck = await prisma.readinessCheck.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReadinessCheckFindUniqueArgs>(args: SelectSubset<T, ReadinessCheckFindUniqueArgs<ExtArgs>>): Prisma__ReadinessCheckClient<$Result.GetResult<Prisma.$ReadinessCheckPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ReadinessCheck that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReadinessCheckFindUniqueOrThrowArgs} args - Arguments to find a ReadinessCheck
     * @example
     * // Get one ReadinessCheck
     * const readinessCheck = await prisma.readinessCheck.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReadinessCheckFindUniqueOrThrowArgs>(args: SelectSubset<T, ReadinessCheckFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReadinessCheckClient<$Result.GetResult<Prisma.$ReadinessCheckPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ReadinessCheck that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadinessCheckFindFirstArgs} args - Arguments to find a ReadinessCheck
     * @example
     * // Get one ReadinessCheck
     * const readinessCheck = await prisma.readinessCheck.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReadinessCheckFindFirstArgs>(args?: SelectSubset<T, ReadinessCheckFindFirstArgs<ExtArgs>>): Prisma__ReadinessCheckClient<$Result.GetResult<Prisma.$ReadinessCheckPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ReadinessCheck that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadinessCheckFindFirstOrThrowArgs} args - Arguments to find a ReadinessCheck
     * @example
     * // Get one ReadinessCheck
     * const readinessCheck = await prisma.readinessCheck.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReadinessCheckFindFirstOrThrowArgs>(args?: SelectSubset<T, ReadinessCheckFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReadinessCheckClient<$Result.GetResult<Prisma.$ReadinessCheckPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ReadinessChecks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadinessCheckFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ReadinessChecks
     * const readinessChecks = await prisma.readinessCheck.findMany()
     * 
     * // Get first 10 ReadinessChecks
     * const readinessChecks = await prisma.readinessCheck.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const readinessCheckWithIdOnly = await prisma.readinessCheck.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReadinessCheckFindManyArgs>(args?: SelectSubset<T, ReadinessCheckFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReadinessCheckPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ReadinessCheck.
     * @param {ReadinessCheckCreateArgs} args - Arguments to create a ReadinessCheck.
     * @example
     * // Create one ReadinessCheck
     * const ReadinessCheck = await prisma.readinessCheck.create({
     *   data: {
     *     // ... data to create a ReadinessCheck
     *   }
     * })
     * 
     */
    create<T extends ReadinessCheckCreateArgs>(args: SelectSubset<T, ReadinessCheckCreateArgs<ExtArgs>>): Prisma__ReadinessCheckClient<$Result.GetResult<Prisma.$ReadinessCheckPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ReadinessChecks.
     * @param {ReadinessCheckCreateManyArgs} args - Arguments to create many ReadinessChecks.
     * @example
     * // Create many ReadinessChecks
     * const readinessCheck = await prisma.readinessCheck.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReadinessCheckCreateManyArgs>(args?: SelectSubset<T, ReadinessCheckCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ReadinessChecks and returns the data saved in the database.
     * @param {ReadinessCheckCreateManyAndReturnArgs} args - Arguments to create many ReadinessChecks.
     * @example
     * // Create many ReadinessChecks
     * const readinessCheck = await prisma.readinessCheck.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ReadinessChecks and only return the `id`
     * const readinessCheckWithIdOnly = await prisma.readinessCheck.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReadinessCheckCreateManyAndReturnArgs>(args?: SelectSubset<T, ReadinessCheckCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReadinessCheckPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ReadinessCheck.
     * @param {ReadinessCheckDeleteArgs} args - Arguments to delete one ReadinessCheck.
     * @example
     * // Delete one ReadinessCheck
     * const ReadinessCheck = await prisma.readinessCheck.delete({
     *   where: {
     *     // ... filter to delete one ReadinessCheck
     *   }
     * })
     * 
     */
    delete<T extends ReadinessCheckDeleteArgs>(args: SelectSubset<T, ReadinessCheckDeleteArgs<ExtArgs>>): Prisma__ReadinessCheckClient<$Result.GetResult<Prisma.$ReadinessCheckPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ReadinessCheck.
     * @param {ReadinessCheckUpdateArgs} args - Arguments to update one ReadinessCheck.
     * @example
     * // Update one ReadinessCheck
     * const readinessCheck = await prisma.readinessCheck.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReadinessCheckUpdateArgs>(args: SelectSubset<T, ReadinessCheckUpdateArgs<ExtArgs>>): Prisma__ReadinessCheckClient<$Result.GetResult<Prisma.$ReadinessCheckPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ReadinessChecks.
     * @param {ReadinessCheckDeleteManyArgs} args - Arguments to filter ReadinessChecks to delete.
     * @example
     * // Delete a few ReadinessChecks
     * const { count } = await prisma.readinessCheck.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReadinessCheckDeleteManyArgs>(args?: SelectSubset<T, ReadinessCheckDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReadinessChecks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadinessCheckUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ReadinessChecks
     * const readinessCheck = await prisma.readinessCheck.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReadinessCheckUpdateManyArgs>(args: SelectSubset<T, ReadinessCheckUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReadinessChecks and returns the data updated in the database.
     * @param {ReadinessCheckUpdateManyAndReturnArgs} args - Arguments to update many ReadinessChecks.
     * @example
     * // Update many ReadinessChecks
     * const readinessCheck = await prisma.readinessCheck.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ReadinessChecks and only return the `id`
     * const readinessCheckWithIdOnly = await prisma.readinessCheck.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReadinessCheckUpdateManyAndReturnArgs>(args: SelectSubset<T, ReadinessCheckUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReadinessCheckPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ReadinessCheck.
     * @param {ReadinessCheckUpsertArgs} args - Arguments to update or create a ReadinessCheck.
     * @example
     * // Update or create a ReadinessCheck
     * const readinessCheck = await prisma.readinessCheck.upsert({
     *   create: {
     *     // ... data to create a ReadinessCheck
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ReadinessCheck we want to update
     *   }
     * })
     */
    upsert<T extends ReadinessCheckUpsertArgs>(args: SelectSubset<T, ReadinessCheckUpsertArgs<ExtArgs>>): Prisma__ReadinessCheckClient<$Result.GetResult<Prisma.$ReadinessCheckPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ReadinessChecks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadinessCheckCountArgs} args - Arguments to filter ReadinessChecks to count.
     * @example
     * // Count the number of ReadinessChecks
     * const count = await prisma.readinessCheck.count({
     *   where: {
     *     // ... the filter for the ReadinessChecks we want to count
     *   }
     * })
    **/
    count<T extends ReadinessCheckCountArgs>(
      args?: Subset<T, ReadinessCheckCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReadinessCheckCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ReadinessCheck.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadinessCheckAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReadinessCheckAggregateArgs>(args: Subset<T, ReadinessCheckAggregateArgs>): Prisma.PrismaPromise<GetReadinessCheckAggregateType<T>>

    /**
     * Group by ReadinessCheck.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadinessCheckGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReadinessCheckGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReadinessCheckGroupByArgs['orderBy'] }
        : { orderBy?: ReadinessCheckGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReadinessCheckGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReadinessCheckGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ReadinessCheck model
   */
  readonly fields: ReadinessCheckFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ReadinessCheck.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReadinessCheckClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    stopNote<T extends StopNoteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StopNoteDefaultArgs<ExtArgs>>): Prisma__StopNoteClient<$Result.GetResult<Prisma.$StopNotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    job<T extends ReadinessCheck$jobArgs<ExtArgs> = {}>(args?: Subset<T, ReadinessCheck$jobArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ReadinessCheck model
   */
  interface ReadinessCheckFieldRefs {
    readonly id: FieldRef<"ReadinessCheck", 'String'>
    readonly stopNoteId: FieldRef<"ReadinessCheck", 'String'>
    readonly scheduledDate: FieldRef<"ReadinessCheck", 'DateTime'>
    readonly contactConfirmed: FieldRef<"ReadinessCheck", 'Boolean'>
    readonly addressConfirmed: FieldRef<"ReadinessCheck", 'Boolean'>
    readonly accessConfirmed: FieldRef<"ReadinessCheck", 'Boolean'>
    readonly siteReady: FieldRef<"ReadinessCheck", 'Boolean'>
    readonly notes: FieldRef<"ReadinessCheck", 'String'>
    readonly status: FieldRef<"ReadinessCheck", 'String'>
    readonly createdAt: FieldRef<"ReadinessCheck", 'DateTime'>
    readonly jobId: FieldRef<"ReadinessCheck", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ReadinessCheck findUnique
   */
  export type ReadinessCheckFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadinessCheck
     */
    select?: ReadinessCheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadinessCheck
     */
    omit?: ReadinessCheckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadinessCheckInclude<ExtArgs> | null
    /**
     * Filter, which ReadinessCheck to fetch.
     */
    where: ReadinessCheckWhereUniqueInput
  }

  /**
   * ReadinessCheck findUniqueOrThrow
   */
  export type ReadinessCheckFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadinessCheck
     */
    select?: ReadinessCheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadinessCheck
     */
    omit?: ReadinessCheckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadinessCheckInclude<ExtArgs> | null
    /**
     * Filter, which ReadinessCheck to fetch.
     */
    where: ReadinessCheckWhereUniqueInput
  }

  /**
   * ReadinessCheck findFirst
   */
  export type ReadinessCheckFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadinessCheck
     */
    select?: ReadinessCheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadinessCheck
     */
    omit?: ReadinessCheckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadinessCheckInclude<ExtArgs> | null
    /**
     * Filter, which ReadinessCheck to fetch.
     */
    where?: ReadinessCheckWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReadinessChecks to fetch.
     */
    orderBy?: ReadinessCheckOrderByWithRelationInput | ReadinessCheckOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReadinessChecks.
     */
    cursor?: ReadinessCheckWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReadinessChecks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReadinessChecks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReadinessChecks.
     */
    distinct?: ReadinessCheckScalarFieldEnum | ReadinessCheckScalarFieldEnum[]
  }

  /**
   * ReadinessCheck findFirstOrThrow
   */
  export type ReadinessCheckFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadinessCheck
     */
    select?: ReadinessCheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadinessCheck
     */
    omit?: ReadinessCheckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadinessCheckInclude<ExtArgs> | null
    /**
     * Filter, which ReadinessCheck to fetch.
     */
    where?: ReadinessCheckWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReadinessChecks to fetch.
     */
    orderBy?: ReadinessCheckOrderByWithRelationInput | ReadinessCheckOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReadinessChecks.
     */
    cursor?: ReadinessCheckWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReadinessChecks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReadinessChecks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReadinessChecks.
     */
    distinct?: ReadinessCheckScalarFieldEnum | ReadinessCheckScalarFieldEnum[]
  }

  /**
   * ReadinessCheck findMany
   */
  export type ReadinessCheckFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadinessCheck
     */
    select?: ReadinessCheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadinessCheck
     */
    omit?: ReadinessCheckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadinessCheckInclude<ExtArgs> | null
    /**
     * Filter, which ReadinessChecks to fetch.
     */
    where?: ReadinessCheckWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReadinessChecks to fetch.
     */
    orderBy?: ReadinessCheckOrderByWithRelationInput | ReadinessCheckOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ReadinessChecks.
     */
    cursor?: ReadinessCheckWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReadinessChecks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReadinessChecks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReadinessChecks.
     */
    distinct?: ReadinessCheckScalarFieldEnum | ReadinessCheckScalarFieldEnum[]
  }

  /**
   * ReadinessCheck create
   */
  export type ReadinessCheckCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadinessCheck
     */
    select?: ReadinessCheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadinessCheck
     */
    omit?: ReadinessCheckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadinessCheckInclude<ExtArgs> | null
    /**
     * The data needed to create a ReadinessCheck.
     */
    data: XOR<ReadinessCheckCreateInput, ReadinessCheckUncheckedCreateInput>
  }

  /**
   * ReadinessCheck createMany
   */
  export type ReadinessCheckCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ReadinessChecks.
     */
    data: ReadinessCheckCreateManyInput | ReadinessCheckCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ReadinessCheck createManyAndReturn
   */
  export type ReadinessCheckCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadinessCheck
     */
    select?: ReadinessCheckSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ReadinessCheck
     */
    omit?: ReadinessCheckOmit<ExtArgs> | null
    /**
     * The data used to create many ReadinessChecks.
     */
    data: ReadinessCheckCreateManyInput | ReadinessCheckCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadinessCheckIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ReadinessCheck update
   */
  export type ReadinessCheckUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadinessCheck
     */
    select?: ReadinessCheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadinessCheck
     */
    omit?: ReadinessCheckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadinessCheckInclude<ExtArgs> | null
    /**
     * The data needed to update a ReadinessCheck.
     */
    data: XOR<ReadinessCheckUpdateInput, ReadinessCheckUncheckedUpdateInput>
    /**
     * Choose, which ReadinessCheck to update.
     */
    where: ReadinessCheckWhereUniqueInput
  }

  /**
   * ReadinessCheck updateMany
   */
  export type ReadinessCheckUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ReadinessChecks.
     */
    data: XOR<ReadinessCheckUpdateManyMutationInput, ReadinessCheckUncheckedUpdateManyInput>
    /**
     * Filter which ReadinessChecks to update
     */
    where?: ReadinessCheckWhereInput
    /**
     * Limit how many ReadinessChecks to update.
     */
    limit?: number
  }

  /**
   * ReadinessCheck updateManyAndReturn
   */
  export type ReadinessCheckUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadinessCheck
     */
    select?: ReadinessCheckSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ReadinessCheck
     */
    omit?: ReadinessCheckOmit<ExtArgs> | null
    /**
     * The data used to update ReadinessChecks.
     */
    data: XOR<ReadinessCheckUpdateManyMutationInput, ReadinessCheckUncheckedUpdateManyInput>
    /**
     * Filter which ReadinessChecks to update
     */
    where?: ReadinessCheckWhereInput
    /**
     * Limit how many ReadinessChecks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadinessCheckIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ReadinessCheck upsert
   */
  export type ReadinessCheckUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadinessCheck
     */
    select?: ReadinessCheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadinessCheck
     */
    omit?: ReadinessCheckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadinessCheckInclude<ExtArgs> | null
    /**
     * The filter to search for the ReadinessCheck to update in case it exists.
     */
    where: ReadinessCheckWhereUniqueInput
    /**
     * In case the ReadinessCheck found by the `where` argument doesn't exist, create a new ReadinessCheck with this data.
     */
    create: XOR<ReadinessCheckCreateInput, ReadinessCheckUncheckedCreateInput>
    /**
     * In case the ReadinessCheck was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReadinessCheckUpdateInput, ReadinessCheckUncheckedUpdateInput>
  }

  /**
   * ReadinessCheck delete
   */
  export type ReadinessCheckDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadinessCheck
     */
    select?: ReadinessCheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadinessCheck
     */
    omit?: ReadinessCheckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadinessCheckInclude<ExtArgs> | null
    /**
     * Filter which ReadinessCheck to delete.
     */
    where: ReadinessCheckWhereUniqueInput
  }

  /**
   * ReadinessCheck deleteMany
   */
  export type ReadinessCheckDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReadinessChecks to delete
     */
    where?: ReadinessCheckWhereInput
    /**
     * Limit how many ReadinessChecks to delete.
     */
    limit?: number
  }

  /**
   * ReadinessCheck.job
   */
  export type ReadinessCheck$jobArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    where?: JobWhereInput
  }

  /**
   * ReadinessCheck without action
   */
  export type ReadinessCheckDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadinessCheck
     */
    select?: ReadinessCheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadinessCheck
     */
    omit?: ReadinessCheckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadinessCheckInclude<ExtArgs> | null
  }


  /**
   * Model ExceptionLog
   */

  export type AggregateExceptionLog = {
    _count: ExceptionLogCountAggregateOutputType | null
    _min: ExceptionLogMinAggregateOutputType | null
    _max: ExceptionLogMaxAggregateOutputType | null
  }

  export type ExceptionLogMinAggregateOutputType = {
    id: string | null
    stopNoteId: string | null
    type: string | null
    notes: string | null
    timestamp: Date | null
    jobId: string | null
  }

  export type ExceptionLogMaxAggregateOutputType = {
    id: string | null
    stopNoteId: string | null
    type: string | null
    notes: string | null
    timestamp: Date | null
    jobId: string | null
  }

  export type ExceptionLogCountAggregateOutputType = {
    id: number
    stopNoteId: number
    type: number
    notes: number
    timestamp: number
    jobId: number
    _all: number
  }


  export type ExceptionLogMinAggregateInputType = {
    id?: true
    stopNoteId?: true
    type?: true
    notes?: true
    timestamp?: true
    jobId?: true
  }

  export type ExceptionLogMaxAggregateInputType = {
    id?: true
    stopNoteId?: true
    type?: true
    notes?: true
    timestamp?: true
    jobId?: true
  }

  export type ExceptionLogCountAggregateInputType = {
    id?: true
    stopNoteId?: true
    type?: true
    notes?: true
    timestamp?: true
    jobId?: true
    _all?: true
  }

  export type ExceptionLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExceptionLog to aggregate.
     */
    where?: ExceptionLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExceptionLogs to fetch.
     */
    orderBy?: ExceptionLogOrderByWithRelationInput | ExceptionLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExceptionLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExceptionLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExceptionLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ExceptionLogs
    **/
    _count?: true | ExceptionLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExceptionLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExceptionLogMaxAggregateInputType
  }

  export type GetExceptionLogAggregateType<T extends ExceptionLogAggregateArgs> = {
        [P in keyof T & keyof AggregateExceptionLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExceptionLog[P]>
      : GetScalarType<T[P], AggregateExceptionLog[P]>
  }




  export type ExceptionLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExceptionLogWhereInput
    orderBy?: ExceptionLogOrderByWithAggregationInput | ExceptionLogOrderByWithAggregationInput[]
    by: ExceptionLogScalarFieldEnum[] | ExceptionLogScalarFieldEnum
    having?: ExceptionLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExceptionLogCountAggregateInputType | true
    _min?: ExceptionLogMinAggregateInputType
    _max?: ExceptionLogMaxAggregateInputType
  }

  export type ExceptionLogGroupByOutputType = {
    id: string
    stopNoteId: string | null
    type: string
    notes: string | null
    timestamp: Date
    jobId: string | null
    _count: ExceptionLogCountAggregateOutputType | null
    _min: ExceptionLogMinAggregateOutputType | null
    _max: ExceptionLogMaxAggregateOutputType | null
  }

  type GetExceptionLogGroupByPayload<T extends ExceptionLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExceptionLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExceptionLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExceptionLogGroupByOutputType[P]>
            : GetScalarType<T[P], ExceptionLogGroupByOutputType[P]>
        }
      >
    >


  export type ExceptionLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    stopNoteId?: boolean
    type?: boolean
    notes?: boolean
    timestamp?: boolean
    jobId?: boolean
    stopNote?: boolean | ExceptionLog$stopNoteArgs<ExtArgs>
    job?: boolean | ExceptionLog$jobArgs<ExtArgs>
  }, ExtArgs["result"]["exceptionLog"]>

  export type ExceptionLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    stopNoteId?: boolean
    type?: boolean
    notes?: boolean
    timestamp?: boolean
    jobId?: boolean
    stopNote?: boolean | ExceptionLog$stopNoteArgs<ExtArgs>
    job?: boolean | ExceptionLog$jobArgs<ExtArgs>
  }, ExtArgs["result"]["exceptionLog"]>

  export type ExceptionLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    stopNoteId?: boolean
    type?: boolean
    notes?: boolean
    timestamp?: boolean
    jobId?: boolean
    stopNote?: boolean | ExceptionLog$stopNoteArgs<ExtArgs>
    job?: boolean | ExceptionLog$jobArgs<ExtArgs>
  }, ExtArgs["result"]["exceptionLog"]>

  export type ExceptionLogSelectScalar = {
    id?: boolean
    stopNoteId?: boolean
    type?: boolean
    notes?: boolean
    timestamp?: boolean
    jobId?: boolean
  }

  export type ExceptionLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "stopNoteId" | "type" | "notes" | "timestamp" | "jobId", ExtArgs["result"]["exceptionLog"]>
  export type ExceptionLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stopNote?: boolean | ExceptionLog$stopNoteArgs<ExtArgs>
    job?: boolean | ExceptionLog$jobArgs<ExtArgs>
  }
  export type ExceptionLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stopNote?: boolean | ExceptionLog$stopNoteArgs<ExtArgs>
    job?: boolean | ExceptionLog$jobArgs<ExtArgs>
  }
  export type ExceptionLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stopNote?: boolean | ExceptionLog$stopNoteArgs<ExtArgs>
    job?: boolean | ExceptionLog$jobArgs<ExtArgs>
  }

  export type $ExceptionLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ExceptionLog"
    objects: {
      stopNote: Prisma.$StopNotePayload<ExtArgs> | null
      job: Prisma.$JobPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      stopNoteId: string | null
      type: string
      notes: string | null
      timestamp: Date
      jobId: string | null
    }, ExtArgs["result"]["exceptionLog"]>
    composites: {}
  }

  type ExceptionLogGetPayload<S extends boolean | null | undefined | ExceptionLogDefaultArgs> = $Result.GetResult<Prisma.$ExceptionLogPayload, S>

  type ExceptionLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExceptionLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExceptionLogCountAggregateInputType | true
    }

  export interface ExceptionLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ExceptionLog'], meta: { name: 'ExceptionLog' } }
    /**
     * Find zero or one ExceptionLog that matches the filter.
     * @param {ExceptionLogFindUniqueArgs} args - Arguments to find a ExceptionLog
     * @example
     * // Get one ExceptionLog
     * const exceptionLog = await prisma.exceptionLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExceptionLogFindUniqueArgs>(args: SelectSubset<T, ExceptionLogFindUniqueArgs<ExtArgs>>): Prisma__ExceptionLogClient<$Result.GetResult<Prisma.$ExceptionLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ExceptionLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExceptionLogFindUniqueOrThrowArgs} args - Arguments to find a ExceptionLog
     * @example
     * // Get one ExceptionLog
     * const exceptionLog = await prisma.exceptionLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExceptionLogFindUniqueOrThrowArgs>(args: SelectSubset<T, ExceptionLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExceptionLogClient<$Result.GetResult<Prisma.$ExceptionLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExceptionLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExceptionLogFindFirstArgs} args - Arguments to find a ExceptionLog
     * @example
     * // Get one ExceptionLog
     * const exceptionLog = await prisma.exceptionLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExceptionLogFindFirstArgs>(args?: SelectSubset<T, ExceptionLogFindFirstArgs<ExtArgs>>): Prisma__ExceptionLogClient<$Result.GetResult<Prisma.$ExceptionLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExceptionLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExceptionLogFindFirstOrThrowArgs} args - Arguments to find a ExceptionLog
     * @example
     * // Get one ExceptionLog
     * const exceptionLog = await prisma.exceptionLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExceptionLogFindFirstOrThrowArgs>(args?: SelectSubset<T, ExceptionLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExceptionLogClient<$Result.GetResult<Prisma.$ExceptionLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ExceptionLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExceptionLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ExceptionLogs
     * const exceptionLogs = await prisma.exceptionLog.findMany()
     * 
     * // Get first 10 ExceptionLogs
     * const exceptionLogs = await prisma.exceptionLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const exceptionLogWithIdOnly = await prisma.exceptionLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExceptionLogFindManyArgs>(args?: SelectSubset<T, ExceptionLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExceptionLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ExceptionLog.
     * @param {ExceptionLogCreateArgs} args - Arguments to create a ExceptionLog.
     * @example
     * // Create one ExceptionLog
     * const ExceptionLog = await prisma.exceptionLog.create({
     *   data: {
     *     // ... data to create a ExceptionLog
     *   }
     * })
     * 
     */
    create<T extends ExceptionLogCreateArgs>(args: SelectSubset<T, ExceptionLogCreateArgs<ExtArgs>>): Prisma__ExceptionLogClient<$Result.GetResult<Prisma.$ExceptionLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ExceptionLogs.
     * @param {ExceptionLogCreateManyArgs} args - Arguments to create many ExceptionLogs.
     * @example
     * // Create many ExceptionLogs
     * const exceptionLog = await prisma.exceptionLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExceptionLogCreateManyArgs>(args?: SelectSubset<T, ExceptionLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ExceptionLogs and returns the data saved in the database.
     * @param {ExceptionLogCreateManyAndReturnArgs} args - Arguments to create many ExceptionLogs.
     * @example
     * // Create many ExceptionLogs
     * const exceptionLog = await prisma.exceptionLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ExceptionLogs and only return the `id`
     * const exceptionLogWithIdOnly = await prisma.exceptionLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExceptionLogCreateManyAndReturnArgs>(args?: SelectSubset<T, ExceptionLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExceptionLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ExceptionLog.
     * @param {ExceptionLogDeleteArgs} args - Arguments to delete one ExceptionLog.
     * @example
     * // Delete one ExceptionLog
     * const ExceptionLog = await prisma.exceptionLog.delete({
     *   where: {
     *     // ... filter to delete one ExceptionLog
     *   }
     * })
     * 
     */
    delete<T extends ExceptionLogDeleteArgs>(args: SelectSubset<T, ExceptionLogDeleteArgs<ExtArgs>>): Prisma__ExceptionLogClient<$Result.GetResult<Prisma.$ExceptionLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ExceptionLog.
     * @param {ExceptionLogUpdateArgs} args - Arguments to update one ExceptionLog.
     * @example
     * // Update one ExceptionLog
     * const exceptionLog = await prisma.exceptionLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExceptionLogUpdateArgs>(args: SelectSubset<T, ExceptionLogUpdateArgs<ExtArgs>>): Prisma__ExceptionLogClient<$Result.GetResult<Prisma.$ExceptionLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ExceptionLogs.
     * @param {ExceptionLogDeleteManyArgs} args - Arguments to filter ExceptionLogs to delete.
     * @example
     * // Delete a few ExceptionLogs
     * const { count } = await prisma.exceptionLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExceptionLogDeleteManyArgs>(args?: SelectSubset<T, ExceptionLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExceptionLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExceptionLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ExceptionLogs
     * const exceptionLog = await prisma.exceptionLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExceptionLogUpdateManyArgs>(args: SelectSubset<T, ExceptionLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExceptionLogs and returns the data updated in the database.
     * @param {ExceptionLogUpdateManyAndReturnArgs} args - Arguments to update many ExceptionLogs.
     * @example
     * // Update many ExceptionLogs
     * const exceptionLog = await prisma.exceptionLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ExceptionLogs and only return the `id`
     * const exceptionLogWithIdOnly = await prisma.exceptionLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ExceptionLogUpdateManyAndReturnArgs>(args: SelectSubset<T, ExceptionLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExceptionLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ExceptionLog.
     * @param {ExceptionLogUpsertArgs} args - Arguments to update or create a ExceptionLog.
     * @example
     * // Update or create a ExceptionLog
     * const exceptionLog = await prisma.exceptionLog.upsert({
     *   create: {
     *     // ... data to create a ExceptionLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ExceptionLog we want to update
     *   }
     * })
     */
    upsert<T extends ExceptionLogUpsertArgs>(args: SelectSubset<T, ExceptionLogUpsertArgs<ExtArgs>>): Prisma__ExceptionLogClient<$Result.GetResult<Prisma.$ExceptionLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ExceptionLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExceptionLogCountArgs} args - Arguments to filter ExceptionLogs to count.
     * @example
     * // Count the number of ExceptionLogs
     * const count = await prisma.exceptionLog.count({
     *   where: {
     *     // ... the filter for the ExceptionLogs we want to count
     *   }
     * })
    **/
    count<T extends ExceptionLogCountArgs>(
      args?: Subset<T, ExceptionLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExceptionLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ExceptionLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExceptionLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExceptionLogAggregateArgs>(args: Subset<T, ExceptionLogAggregateArgs>): Prisma.PrismaPromise<GetExceptionLogAggregateType<T>>

    /**
     * Group by ExceptionLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExceptionLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExceptionLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExceptionLogGroupByArgs['orderBy'] }
        : { orderBy?: ExceptionLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExceptionLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExceptionLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ExceptionLog model
   */
  readonly fields: ExceptionLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ExceptionLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExceptionLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    stopNote<T extends ExceptionLog$stopNoteArgs<ExtArgs> = {}>(args?: Subset<T, ExceptionLog$stopNoteArgs<ExtArgs>>): Prisma__StopNoteClient<$Result.GetResult<Prisma.$StopNotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    job<T extends ExceptionLog$jobArgs<ExtArgs> = {}>(args?: Subset<T, ExceptionLog$jobArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ExceptionLog model
   */
  interface ExceptionLogFieldRefs {
    readonly id: FieldRef<"ExceptionLog", 'String'>
    readonly stopNoteId: FieldRef<"ExceptionLog", 'String'>
    readonly type: FieldRef<"ExceptionLog", 'String'>
    readonly notes: FieldRef<"ExceptionLog", 'String'>
    readonly timestamp: FieldRef<"ExceptionLog", 'DateTime'>
    readonly jobId: FieldRef<"ExceptionLog", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ExceptionLog findUnique
   */
  export type ExceptionLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExceptionLog
     */
    select?: ExceptionLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExceptionLog
     */
    omit?: ExceptionLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExceptionLogInclude<ExtArgs> | null
    /**
     * Filter, which ExceptionLog to fetch.
     */
    where: ExceptionLogWhereUniqueInput
  }

  /**
   * ExceptionLog findUniqueOrThrow
   */
  export type ExceptionLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExceptionLog
     */
    select?: ExceptionLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExceptionLog
     */
    omit?: ExceptionLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExceptionLogInclude<ExtArgs> | null
    /**
     * Filter, which ExceptionLog to fetch.
     */
    where: ExceptionLogWhereUniqueInput
  }

  /**
   * ExceptionLog findFirst
   */
  export type ExceptionLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExceptionLog
     */
    select?: ExceptionLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExceptionLog
     */
    omit?: ExceptionLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExceptionLogInclude<ExtArgs> | null
    /**
     * Filter, which ExceptionLog to fetch.
     */
    where?: ExceptionLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExceptionLogs to fetch.
     */
    orderBy?: ExceptionLogOrderByWithRelationInput | ExceptionLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExceptionLogs.
     */
    cursor?: ExceptionLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExceptionLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExceptionLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExceptionLogs.
     */
    distinct?: ExceptionLogScalarFieldEnum | ExceptionLogScalarFieldEnum[]
  }

  /**
   * ExceptionLog findFirstOrThrow
   */
  export type ExceptionLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExceptionLog
     */
    select?: ExceptionLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExceptionLog
     */
    omit?: ExceptionLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExceptionLogInclude<ExtArgs> | null
    /**
     * Filter, which ExceptionLog to fetch.
     */
    where?: ExceptionLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExceptionLogs to fetch.
     */
    orderBy?: ExceptionLogOrderByWithRelationInput | ExceptionLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExceptionLogs.
     */
    cursor?: ExceptionLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExceptionLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExceptionLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExceptionLogs.
     */
    distinct?: ExceptionLogScalarFieldEnum | ExceptionLogScalarFieldEnum[]
  }

  /**
   * ExceptionLog findMany
   */
  export type ExceptionLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExceptionLog
     */
    select?: ExceptionLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExceptionLog
     */
    omit?: ExceptionLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExceptionLogInclude<ExtArgs> | null
    /**
     * Filter, which ExceptionLogs to fetch.
     */
    where?: ExceptionLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExceptionLogs to fetch.
     */
    orderBy?: ExceptionLogOrderByWithRelationInput | ExceptionLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ExceptionLogs.
     */
    cursor?: ExceptionLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExceptionLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExceptionLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExceptionLogs.
     */
    distinct?: ExceptionLogScalarFieldEnum | ExceptionLogScalarFieldEnum[]
  }

  /**
   * ExceptionLog create
   */
  export type ExceptionLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExceptionLog
     */
    select?: ExceptionLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExceptionLog
     */
    omit?: ExceptionLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExceptionLogInclude<ExtArgs> | null
    /**
     * The data needed to create a ExceptionLog.
     */
    data: XOR<ExceptionLogCreateInput, ExceptionLogUncheckedCreateInput>
  }

  /**
   * ExceptionLog createMany
   */
  export type ExceptionLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ExceptionLogs.
     */
    data: ExceptionLogCreateManyInput | ExceptionLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ExceptionLog createManyAndReturn
   */
  export type ExceptionLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExceptionLog
     */
    select?: ExceptionLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ExceptionLog
     */
    omit?: ExceptionLogOmit<ExtArgs> | null
    /**
     * The data used to create many ExceptionLogs.
     */
    data: ExceptionLogCreateManyInput | ExceptionLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExceptionLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ExceptionLog update
   */
  export type ExceptionLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExceptionLog
     */
    select?: ExceptionLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExceptionLog
     */
    omit?: ExceptionLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExceptionLogInclude<ExtArgs> | null
    /**
     * The data needed to update a ExceptionLog.
     */
    data: XOR<ExceptionLogUpdateInput, ExceptionLogUncheckedUpdateInput>
    /**
     * Choose, which ExceptionLog to update.
     */
    where: ExceptionLogWhereUniqueInput
  }

  /**
   * ExceptionLog updateMany
   */
  export type ExceptionLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ExceptionLogs.
     */
    data: XOR<ExceptionLogUpdateManyMutationInput, ExceptionLogUncheckedUpdateManyInput>
    /**
     * Filter which ExceptionLogs to update
     */
    where?: ExceptionLogWhereInput
    /**
     * Limit how many ExceptionLogs to update.
     */
    limit?: number
  }

  /**
   * ExceptionLog updateManyAndReturn
   */
  export type ExceptionLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExceptionLog
     */
    select?: ExceptionLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ExceptionLog
     */
    omit?: ExceptionLogOmit<ExtArgs> | null
    /**
     * The data used to update ExceptionLogs.
     */
    data: XOR<ExceptionLogUpdateManyMutationInput, ExceptionLogUncheckedUpdateManyInput>
    /**
     * Filter which ExceptionLogs to update
     */
    where?: ExceptionLogWhereInput
    /**
     * Limit how many ExceptionLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExceptionLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ExceptionLog upsert
   */
  export type ExceptionLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExceptionLog
     */
    select?: ExceptionLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExceptionLog
     */
    omit?: ExceptionLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExceptionLogInclude<ExtArgs> | null
    /**
     * The filter to search for the ExceptionLog to update in case it exists.
     */
    where: ExceptionLogWhereUniqueInput
    /**
     * In case the ExceptionLog found by the `where` argument doesn't exist, create a new ExceptionLog with this data.
     */
    create: XOR<ExceptionLogCreateInput, ExceptionLogUncheckedCreateInput>
    /**
     * In case the ExceptionLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExceptionLogUpdateInput, ExceptionLogUncheckedUpdateInput>
  }

  /**
   * ExceptionLog delete
   */
  export type ExceptionLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExceptionLog
     */
    select?: ExceptionLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExceptionLog
     */
    omit?: ExceptionLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExceptionLogInclude<ExtArgs> | null
    /**
     * Filter which ExceptionLog to delete.
     */
    where: ExceptionLogWhereUniqueInput
  }

  /**
   * ExceptionLog deleteMany
   */
  export type ExceptionLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExceptionLogs to delete
     */
    where?: ExceptionLogWhereInput
    /**
     * Limit how many ExceptionLogs to delete.
     */
    limit?: number
  }

  /**
   * ExceptionLog.stopNote
   */
  export type ExceptionLog$stopNoteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StopNote
     */
    select?: StopNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StopNote
     */
    omit?: StopNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StopNoteInclude<ExtArgs> | null
    where?: StopNoteWhereInput
  }

  /**
   * ExceptionLog.job
   */
  export type ExceptionLog$jobArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    where?: JobWhereInput
  }

  /**
   * ExceptionLog without action
   */
  export type ExceptionLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExceptionLog
     */
    select?: ExceptionLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExceptionLog
     */
    omit?: ExceptionLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExceptionLogInclude<ExtArgs> | null
  }


  /**
   * Model Job
   */

  export type AggregateJob = {
    _count: JobCountAggregateOutputType | null
    _min: JobMinAggregateOutputType | null
    _max: JobMaxAggregateOutputType | null
  }

  export type JobMinAggregateOutputType = {
    id: string | null
    companyId: string | null
    quoteRequestId: string | null
    status: string | null
    scheduledDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type JobMaxAggregateOutputType = {
    id: string | null
    companyId: string | null
    quoteRequestId: string | null
    status: string | null
    scheduledDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type JobCountAggregateOutputType = {
    id: number
    companyId: number
    quoteRequestId: number
    status: number
    scheduledDate: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type JobMinAggregateInputType = {
    id?: true
    companyId?: true
    quoteRequestId?: true
    status?: true
    scheduledDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type JobMaxAggregateInputType = {
    id?: true
    companyId?: true
    quoteRequestId?: true
    status?: true
    scheduledDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type JobCountAggregateInputType = {
    id?: true
    companyId?: true
    quoteRequestId?: true
    status?: true
    scheduledDate?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type JobAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Job to aggregate.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Jobs
    **/
    _count?: true | JobCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JobMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JobMaxAggregateInputType
  }

  export type GetJobAggregateType<T extends JobAggregateArgs> = {
        [P in keyof T & keyof AggregateJob]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJob[P]>
      : GetScalarType<T[P], AggregateJob[P]>
  }




  export type JobGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobWhereInput
    orderBy?: JobOrderByWithAggregationInput | JobOrderByWithAggregationInput[]
    by: JobScalarFieldEnum[] | JobScalarFieldEnum
    having?: JobScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JobCountAggregateInputType | true
    _min?: JobMinAggregateInputType
    _max?: JobMaxAggregateInputType
  }

  export type JobGroupByOutputType = {
    id: string
    companyId: string
    quoteRequestId: string | null
    status: string
    scheduledDate: Date
    createdAt: Date
    updatedAt: Date
    _count: JobCountAggregateOutputType | null
    _min: JobMinAggregateOutputType | null
    _max: JobMaxAggregateOutputType | null
  }

  type GetJobGroupByPayload<T extends JobGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JobGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JobGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JobGroupByOutputType[P]>
            : GetScalarType<T[P], JobGroupByOutputType[P]>
        }
      >
    >


  export type JobSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    quoteRequestId?: boolean
    status?: boolean
    scheduledDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    quoteRequest?: boolean | Job$quoteRequestArgs<ExtArgs>
    stops?: boolean | Job$stopsArgs<ExtArgs>
    readinessChecks?: boolean | Job$readinessChecksArgs<ExtArgs>
    exceptionLogs?: boolean | Job$exceptionLogsArgs<ExtArgs>
    _count?: boolean | JobCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["job"]>

  export type JobSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    quoteRequestId?: boolean
    status?: boolean
    scheduledDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    quoteRequest?: boolean | Job$quoteRequestArgs<ExtArgs>
  }, ExtArgs["result"]["job"]>

  export type JobSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    quoteRequestId?: boolean
    status?: boolean
    scheduledDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    quoteRequest?: boolean | Job$quoteRequestArgs<ExtArgs>
  }, ExtArgs["result"]["job"]>

  export type JobSelectScalar = {
    id?: boolean
    companyId?: boolean
    quoteRequestId?: boolean
    status?: boolean
    scheduledDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type JobOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "companyId" | "quoteRequestId" | "status" | "scheduledDate" | "createdAt" | "updatedAt", ExtArgs["result"]["job"]>
  export type JobInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    quoteRequest?: boolean | Job$quoteRequestArgs<ExtArgs>
    stops?: boolean | Job$stopsArgs<ExtArgs>
    readinessChecks?: boolean | Job$readinessChecksArgs<ExtArgs>
    exceptionLogs?: boolean | Job$exceptionLogsArgs<ExtArgs>
    _count?: boolean | JobCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type JobIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    quoteRequest?: boolean | Job$quoteRequestArgs<ExtArgs>
  }
  export type JobIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    quoteRequest?: boolean | Job$quoteRequestArgs<ExtArgs>
  }

  export type $JobPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Job"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
      quoteRequest: Prisma.$QuoteRequestPayload<ExtArgs> | null
      stops: Prisma.$JobStopPayload<ExtArgs>[]
      readinessChecks: Prisma.$ReadinessCheckPayload<ExtArgs>[]
      exceptionLogs: Prisma.$ExceptionLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      companyId: string
      quoteRequestId: string | null
      status: string
      scheduledDate: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["job"]>
    composites: {}
  }

  type JobGetPayload<S extends boolean | null | undefined | JobDefaultArgs> = $Result.GetResult<Prisma.$JobPayload, S>

  type JobCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<JobFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JobCountAggregateInputType | true
    }

  export interface JobDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Job'], meta: { name: 'Job' } }
    /**
     * Find zero or one Job that matches the filter.
     * @param {JobFindUniqueArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JobFindUniqueArgs>(args: SelectSubset<T, JobFindUniqueArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Job that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {JobFindUniqueOrThrowArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JobFindUniqueOrThrowArgs>(args: SelectSubset<T, JobFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Job that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobFindFirstArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JobFindFirstArgs>(args?: SelectSubset<T, JobFindFirstArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Job that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobFindFirstOrThrowArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JobFindFirstOrThrowArgs>(args?: SelectSubset<T, JobFindFirstOrThrowArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Jobs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Jobs
     * const jobs = await prisma.job.findMany()
     * 
     * // Get first 10 Jobs
     * const jobs = await prisma.job.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jobWithIdOnly = await prisma.job.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JobFindManyArgs>(args?: SelectSubset<T, JobFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Job.
     * @param {JobCreateArgs} args - Arguments to create a Job.
     * @example
     * // Create one Job
     * const Job = await prisma.job.create({
     *   data: {
     *     // ... data to create a Job
     *   }
     * })
     * 
     */
    create<T extends JobCreateArgs>(args: SelectSubset<T, JobCreateArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Jobs.
     * @param {JobCreateManyArgs} args - Arguments to create many Jobs.
     * @example
     * // Create many Jobs
     * const job = await prisma.job.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JobCreateManyArgs>(args?: SelectSubset<T, JobCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Jobs and returns the data saved in the database.
     * @param {JobCreateManyAndReturnArgs} args - Arguments to create many Jobs.
     * @example
     * // Create many Jobs
     * const job = await prisma.job.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Jobs and only return the `id`
     * const jobWithIdOnly = await prisma.job.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JobCreateManyAndReturnArgs>(args?: SelectSubset<T, JobCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Job.
     * @param {JobDeleteArgs} args - Arguments to delete one Job.
     * @example
     * // Delete one Job
     * const Job = await prisma.job.delete({
     *   where: {
     *     // ... filter to delete one Job
     *   }
     * })
     * 
     */
    delete<T extends JobDeleteArgs>(args: SelectSubset<T, JobDeleteArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Job.
     * @param {JobUpdateArgs} args - Arguments to update one Job.
     * @example
     * // Update one Job
     * const job = await prisma.job.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JobUpdateArgs>(args: SelectSubset<T, JobUpdateArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Jobs.
     * @param {JobDeleteManyArgs} args - Arguments to filter Jobs to delete.
     * @example
     * // Delete a few Jobs
     * const { count } = await prisma.job.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JobDeleteManyArgs>(args?: SelectSubset<T, JobDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Jobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Jobs
     * const job = await prisma.job.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JobUpdateManyArgs>(args: SelectSubset<T, JobUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Jobs and returns the data updated in the database.
     * @param {JobUpdateManyAndReturnArgs} args - Arguments to update many Jobs.
     * @example
     * // Update many Jobs
     * const job = await prisma.job.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Jobs and only return the `id`
     * const jobWithIdOnly = await prisma.job.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends JobUpdateManyAndReturnArgs>(args: SelectSubset<T, JobUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Job.
     * @param {JobUpsertArgs} args - Arguments to update or create a Job.
     * @example
     * // Update or create a Job
     * const job = await prisma.job.upsert({
     *   create: {
     *     // ... data to create a Job
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Job we want to update
     *   }
     * })
     */
    upsert<T extends JobUpsertArgs>(args: SelectSubset<T, JobUpsertArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Jobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobCountArgs} args - Arguments to filter Jobs to count.
     * @example
     * // Count the number of Jobs
     * const count = await prisma.job.count({
     *   where: {
     *     // ... the filter for the Jobs we want to count
     *   }
     * })
    **/
    count<T extends JobCountArgs>(
      args?: Subset<T, JobCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JobCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Job.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends JobAggregateArgs>(args: Subset<T, JobAggregateArgs>): Prisma.PrismaPromise<GetJobAggregateType<T>>

    /**
     * Group by Job.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends JobGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JobGroupByArgs['orderBy'] }
        : { orderBy?: JobGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, JobGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Job model
   */
  readonly fields: JobFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Job.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JobClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    quoteRequest<T extends Job$quoteRequestArgs<ExtArgs> = {}>(args?: Subset<T, Job$quoteRequestArgs<ExtArgs>>): Prisma__QuoteRequestClient<$Result.GetResult<Prisma.$QuoteRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    stops<T extends Job$stopsArgs<ExtArgs> = {}>(args?: Subset<T, Job$stopsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobStopPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    readinessChecks<T extends Job$readinessChecksArgs<ExtArgs> = {}>(args?: Subset<T, Job$readinessChecksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReadinessCheckPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    exceptionLogs<T extends Job$exceptionLogsArgs<ExtArgs> = {}>(args?: Subset<T, Job$exceptionLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExceptionLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Job model
   */
  interface JobFieldRefs {
    readonly id: FieldRef<"Job", 'String'>
    readonly companyId: FieldRef<"Job", 'String'>
    readonly quoteRequestId: FieldRef<"Job", 'String'>
    readonly status: FieldRef<"Job", 'String'>
    readonly scheduledDate: FieldRef<"Job", 'DateTime'>
    readonly createdAt: FieldRef<"Job", 'DateTime'>
    readonly updatedAt: FieldRef<"Job", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Job findUnique
   */
  export type JobFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job findUniqueOrThrow
   */
  export type JobFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job findFirst
   */
  export type JobFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Jobs.
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Jobs.
     */
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * Job findFirstOrThrow
   */
  export type JobFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Jobs.
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Jobs.
     */
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * Job findMany
   */
  export type JobFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Jobs to fetch.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Jobs.
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Jobs.
     */
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * Job create
   */
  export type JobCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * The data needed to create a Job.
     */
    data: XOR<JobCreateInput, JobUncheckedCreateInput>
  }

  /**
   * Job createMany
   */
  export type JobCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Jobs.
     */
    data: JobCreateManyInput | JobCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Job createManyAndReturn
   */
  export type JobCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * The data used to create many Jobs.
     */
    data: JobCreateManyInput | JobCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Job update
   */
  export type JobUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * The data needed to update a Job.
     */
    data: XOR<JobUpdateInput, JobUncheckedUpdateInput>
    /**
     * Choose, which Job to update.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job updateMany
   */
  export type JobUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Jobs.
     */
    data: XOR<JobUpdateManyMutationInput, JobUncheckedUpdateManyInput>
    /**
     * Filter which Jobs to update
     */
    where?: JobWhereInput
    /**
     * Limit how many Jobs to update.
     */
    limit?: number
  }

  /**
   * Job updateManyAndReturn
   */
  export type JobUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * The data used to update Jobs.
     */
    data: XOR<JobUpdateManyMutationInput, JobUncheckedUpdateManyInput>
    /**
     * Filter which Jobs to update
     */
    where?: JobWhereInput
    /**
     * Limit how many Jobs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Job upsert
   */
  export type JobUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * The filter to search for the Job to update in case it exists.
     */
    where: JobWhereUniqueInput
    /**
     * In case the Job found by the `where` argument doesn't exist, create a new Job with this data.
     */
    create: XOR<JobCreateInput, JobUncheckedCreateInput>
    /**
     * In case the Job was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JobUpdateInput, JobUncheckedUpdateInput>
  }

  /**
   * Job delete
   */
  export type JobDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter which Job to delete.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job deleteMany
   */
  export type JobDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Jobs to delete
     */
    where?: JobWhereInput
    /**
     * Limit how many Jobs to delete.
     */
    limit?: number
  }

  /**
   * Job.quoteRequest
   */
  export type Job$quoteRequestArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuoteRequest
     */
    select?: QuoteRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuoteRequest
     */
    omit?: QuoteRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuoteRequestInclude<ExtArgs> | null
    where?: QuoteRequestWhereInput
  }

  /**
   * Job.stops
   */
  export type Job$stopsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobStop
     */
    select?: JobStopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobStop
     */
    omit?: JobStopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobStopInclude<ExtArgs> | null
    where?: JobStopWhereInput
    orderBy?: JobStopOrderByWithRelationInput | JobStopOrderByWithRelationInput[]
    cursor?: JobStopWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JobStopScalarFieldEnum | JobStopScalarFieldEnum[]
  }

  /**
   * Job.readinessChecks
   */
  export type Job$readinessChecksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadinessCheck
     */
    select?: ReadinessCheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadinessCheck
     */
    omit?: ReadinessCheckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReadinessCheckInclude<ExtArgs> | null
    where?: ReadinessCheckWhereInput
    orderBy?: ReadinessCheckOrderByWithRelationInput | ReadinessCheckOrderByWithRelationInput[]
    cursor?: ReadinessCheckWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReadinessCheckScalarFieldEnum | ReadinessCheckScalarFieldEnum[]
  }

  /**
   * Job.exceptionLogs
   */
  export type Job$exceptionLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExceptionLog
     */
    select?: ExceptionLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExceptionLog
     */
    omit?: ExceptionLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExceptionLogInclude<ExtArgs> | null
    where?: ExceptionLogWhereInput
    orderBy?: ExceptionLogOrderByWithRelationInput | ExceptionLogOrderByWithRelationInput[]
    cursor?: ExceptionLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExceptionLogScalarFieldEnum | ExceptionLogScalarFieldEnum[]
  }

  /**
   * Job without action
   */
  export type JobDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
  }


  /**
   * Model JobStop
   */

  export type AggregateJobStop = {
    _count: JobStopCountAggregateOutputType | null
    _avg: JobStopAvgAggregateOutputType | null
    _sum: JobStopSumAggregateOutputType | null
    _min: JobStopMinAggregateOutputType | null
    _max: JobStopMaxAggregateOutputType | null
  }

  export type JobStopAvgAggregateOutputType = {
    order: number | null
  }

  export type JobStopSumAggregateOutputType = {
    order: number | null
  }

  export type JobStopMinAggregateOutputType = {
    id: string | null
    jobId: string | null
    stopNoteId: string | null
    order: number | null
  }

  export type JobStopMaxAggregateOutputType = {
    id: string | null
    jobId: string | null
    stopNoteId: string | null
    order: number | null
  }

  export type JobStopCountAggregateOutputType = {
    id: number
    jobId: number
    stopNoteId: number
    order: number
    _all: number
  }


  export type JobStopAvgAggregateInputType = {
    order?: true
  }

  export type JobStopSumAggregateInputType = {
    order?: true
  }

  export type JobStopMinAggregateInputType = {
    id?: true
    jobId?: true
    stopNoteId?: true
    order?: true
  }

  export type JobStopMaxAggregateInputType = {
    id?: true
    jobId?: true
    stopNoteId?: true
    order?: true
  }

  export type JobStopCountAggregateInputType = {
    id?: true
    jobId?: true
    stopNoteId?: true
    order?: true
    _all?: true
  }

  export type JobStopAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobStop to aggregate.
     */
    where?: JobStopWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobStops to fetch.
     */
    orderBy?: JobStopOrderByWithRelationInput | JobStopOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JobStopWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobStops from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobStops.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned JobStops
    **/
    _count?: true | JobStopCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: JobStopAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: JobStopSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JobStopMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JobStopMaxAggregateInputType
  }

  export type GetJobStopAggregateType<T extends JobStopAggregateArgs> = {
        [P in keyof T & keyof AggregateJobStop]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJobStop[P]>
      : GetScalarType<T[P], AggregateJobStop[P]>
  }




  export type JobStopGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobStopWhereInput
    orderBy?: JobStopOrderByWithAggregationInput | JobStopOrderByWithAggregationInput[]
    by: JobStopScalarFieldEnum[] | JobStopScalarFieldEnum
    having?: JobStopScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JobStopCountAggregateInputType | true
    _avg?: JobStopAvgAggregateInputType
    _sum?: JobStopSumAggregateInputType
    _min?: JobStopMinAggregateInputType
    _max?: JobStopMaxAggregateInputType
  }

  export type JobStopGroupByOutputType = {
    id: string
    jobId: string
    stopNoteId: string
    order: number
    _count: JobStopCountAggregateOutputType | null
    _avg: JobStopAvgAggregateOutputType | null
    _sum: JobStopSumAggregateOutputType | null
    _min: JobStopMinAggregateOutputType | null
    _max: JobStopMaxAggregateOutputType | null
  }

  type GetJobStopGroupByPayload<T extends JobStopGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JobStopGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JobStopGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JobStopGroupByOutputType[P]>
            : GetScalarType<T[P], JobStopGroupByOutputType[P]>
        }
      >
    >


  export type JobStopSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    jobId?: boolean
    stopNoteId?: boolean
    order?: boolean
    job?: boolean | JobDefaultArgs<ExtArgs>
    stopNote?: boolean | StopNoteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobStop"]>

  export type JobStopSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    jobId?: boolean
    stopNoteId?: boolean
    order?: boolean
    job?: boolean | JobDefaultArgs<ExtArgs>
    stopNote?: boolean | StopNoteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobStop"]>

  export type JobStopSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    jobId?: boolean
    stopNoteId?: boolean
    order?: boolean
    job?: boolean | JobDefaultArgs<ExtArgs>
    stopNote?: boolean | StopNoteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobStop"]>

  export type JobStopSelectScalar = {
    id?: boolean
    jobId?: boolean
    stopNoteId?: boolean
    order?: boolean
  }

  export type JobStopOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "jobId" | "stopNoteId" | "order", ExtArgs["result"]["jobStop"]>
  export type JobStopInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | JobDefaultArgs<ExtArgs>
    stopNote?: boolean | StopNoteDefaultArgs<ExtArgs>
  }
  export type JobStopIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | JobDefaultArgs<ExtArgs>
    stopNote?: boolean | StopNoteDefaultArgs<ExtArgs>
  }
  export type JobStopIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | JobDefaultArgs<ExtArgs>
    stopNote?: boolean | StopNoteDefaultArgs<ExtArgs>
  }

  export type $JobStopPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "JobStop"
    objects: {
      job: Prisma.$JobPayload<ExtArgs>
      stopNote: Prisma.$StopNotePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      jobId: string
      stopNoteId: string
      order: number
    }, ExtArgs["result"]["jobStop"]>
    composites: {}
  }

  type JobStopGetPayload<S extends boolean | null | undefined | JobStopDefaultArgs> = $Result.GetResult<Prisma.$JobStopPayload, S>

  type JobStopCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<JobStopFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JobStopCountAggregateInputType | true
    }

  export interface JobStopDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['JobStop'], meta: { name: 'JobStop' } }
    /**
     * Find zero or one JobStop that matches the filter.
     * @param {JobStopFindUniqueArgs} args - Arguments to find a JobStop
     * @example
     * // Get one JobStop
     * const jobStop = await prisma.jobStop.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JobStopFindUniqueArgs>(args: SelectSubset<T, JobStopFindUniqueArgs<ExtArgs>>): Prisma__JobStopClient<$Result.GetResult<Prisma.$JobStopPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one JobStop that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {JobStopFindUniqueOrThrowArgs} args - Arguments to find a JobStop
     * @example
     * // Get one JobStop
     * const jobStop = await prisma.jobStop.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JobStopFindUniqueOrThrowArgs>(args: SelectSubset<T, JobStopFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JobStopClient<$Result.GetResult<Prisma.$JobStopPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JobStop that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobStopFindFirstArgs} args - Arguments to find a JobStop
     * @example
     * // Get one JobStop
     * const jobStop = await prisma.jobStop.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JobStopFindFirstArgs>(args?: SelectSubset<T, JobStopFindFirstArgs<ExtArgs>>): Prisma__JobStopClient<$Result.GetResult<Prisma.$JobStopPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JobStop that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobStopFindFirstOrThrowArgs} args - Arguments to find a JobStop
     * @example
     * // Get one JobStop
     * const jobStop = await prisma.jobStop.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JobStopFindFirstOrThrowArgs>(args?: SelectSubset<T, JobStopFindFirstOrThrowArgs<ExtArgs>>): Prisma__JobStopClient<$Result.GetResult<Prisma.$JobStopPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more JobStops that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobStopFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all JobStops
     * const jobStops = await prisma.jobStop.findMany()
     * 
     * // Get first 10 JobStops
     * const jobStops = await prisma.jobStop.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jobStopWithIdOnly = await prisma.jobStop.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JobStopFindManyArgs>(args?: SelectSubset<T, JobStopFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobStopPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a JobStop.
     * @param {JobStopCreateArgs} args - Arguments to create a JobStop.
     * @example
     * // Create one JobStop
     * const JobStop = await prisma.jobStop.create({
     *   data: {
     *     // ... data to create a JobStop
     *   }
     * })
     * 
     */
    create<T extends JobStopCreateArgs>(args: SelectSubset<T, JobStopCreateArgs<ExtArgs>>): Prisma__JobStopClient<$Result.GetResult<Prisma.$JobStopPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many JobStops.
     * @param {JobStopCreateManyArgs} args - Arguments to create many JobStops.
     * @example
     * // Create many JobStops
     * const jobStop = await prisma.jobStop.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JobStopCreateManyArgs>(args?: SelectSubset<T, JobStopCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many JobStops and returns the data saved in the database.
     * @param {JobStopCreateManyAndReturnArgs} args - Arguments to create many JobStops.
     * @example
     * // Create many JobStops
     * const jobStop = await prisma.jobStop.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many JobStops and only return the `id`
     * const jobStopWithIdOnly = await prisma.jobStop.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JobStopCreateManyAndReturnArgs>(args?: SelectSubset<T, JobStopCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobStopPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a JobStop.
     * @param {JobStopDeleteArgs} args - Arguments to delete one JobStop.
     * @example
     * // Delete one JobStop
     * const JobStop = await prisma.jobStop.delete({
     *   where: {
     *     // ... filter to delete one JobStop
     *   }
     * })
     * 
     */
    delete<T extends JobStopDeleteArgs>(args: SelectSubset<T, JobStopDeleteArgs<ExtArgs>>): Prisma__JobStopClient<$Result.GetResult<Prisma.$JobStopPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one JobStop.
     * @param {JobStopUpdateArgs} args - Arguments to update one JobStop.
     * @example
     * // Update one JobStop
     * const jobStop = await prisma.jobStop.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JobStopUpdateArgs>(args: SelectSubset<T, JobStopUpdateArgs<ExtArgs>>): Prisma__JobStopClient<$Result.GetResult<Prisma.$JobStopPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more JobStops.
     * @param {JobStopDeleteManyArgs} args - Arguments to filter JobStops to delete.
     * @example
     * // Delete a few JobStops
     * const { count } = await prisma.jobStop.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JobStopDeleteManyArgs>(args?: SelectSubset<T, JobStopDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JobStops.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobStopUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many JobStops
     * const jobStop = await prisma.jobStop.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JobStopUpdateManyArgs>(args: SelectSubset<T, JobStopUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JobStops and returns the data updated in the database.
     * @param {JobStopUpdateManyAndReturnArgs} args - Arguments to update many JobStops.
     * @example
     * // Update many JobStops
     * const jobStop = await prisma.jobStop.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more JobStops and only return the `id`
     * const jobStopWithIdOnly = await prisma.jobStop.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends JobStopUpdateManyAndReturnArgs>(args: SelectSubset<T, JobStopUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobStopPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one JobStop.
     * @param {JobStopUpsertArgs} args - Arguments to update or create a JobStop.
     * @example
     * // Update or create a JobStop
     * const jobStop = await prisma.jobStop.upsert({
     *   create: {
     *     // ... data to create a JobStop
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the JobStop we want to update
     *   }
     * })
     */
    upsert<T extends JobStopUpsertArgs>(args: SelectSubset<T, JobStopUpsertArgs<ExtArgs>>): Prisma__JobStopClient<$Result.GetResult<Prisma.$JobStopPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of JobStops.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobStopCountArgs} args - Arguments to filter JobStops to count.
     * @example
     * // Count the number of JobStops
     * const count = await prisma.jobStop.count({
     *   where: {
     *     // ... the filter for the JobStops we want to count
     *   }
     * })
    **/
    count<T extends JobStopCountArgs>(
      args?: Subset<T, JobStopCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JobStopCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a JobStop.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobStopAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends JobStopAggregateArgs>(args: Subset<T, JobStopAggregateArgs>): Prisma.PrismaPromise<GetJobStopAggregateType<T>>

    /**
     * Group by JobStop.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobStopGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends JobStopGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JobStopGroupByArgs['orderBy'] }
        : { orderBy?: JobStopGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, JobStopGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobStopGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the JobStop model
   */
  readonly fields: JobStopFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for JobStop.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JobStopClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    job<T extends JobDefaultArgs<ExtArgs> = {}>(args?: Subset<T, JobDefaultArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    stopNote<T extends StopNoteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StopNoteDefaultArgs<ExtArgs>>): Prisma__StopNoteClient<$Result.GetResult<Prisma.$StopNotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the JobStop model
   */
  interface JobStopFieldRefs {
    readonly id: FieldRef<"JobStop", 'String'>
    readonly jobId: FieldRef<"JobStop", 'String'>
    readonly stopNoteId: FieldRef<"JobStop", 'String'>
    readonly order: FieldRef<"JobStop", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * JobStop findUnique
   */
  export type JobStopFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobStop
     */
    select?: JobStopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobStop
     */
    omit?: JobStopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobStopInclude<ExtArgs> | null
    /**
     * Filter, which JobStop to fetch.
     */
    where: JobStopWhereUniqueInput
  }

  /**
   * JobStop findUniqueOrThrow
   */
  export type JobStopFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobStop
     */
    select?: JobStopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobStop
     */
    omit?: JobStopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobStopInclude<ExtArgs> | null
    /**
     * Filter, which JobStop to fetch.
     */
    where: JobStopWhereUniqueInput
  }

  /**
   * JobStop findFirst
   */
  export type JobStopFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobStop
     */
    select?: JobStopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobStop
     */
    omit?: JobStopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobStopInclude<ExtArgs> | null
    /**
     * Filter, which JobStop to fetch.
     */
    where?: JobStopWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobStops to fetch.
     */
    orderBy?: JobStopOrderByWithRelationInput | JobStopOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobStops.
     */
    cursor?: JobStopWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobStops from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobStops.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobStops.
     */
    distinct?: JobStopScalarFieldEnum | JobStopScalarFieldEnum[]
  }

  /**
   * JobStop findFirstOrThrow
   */
  export type JobStopFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobStop
     */
    select?: JobStopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobStop
     */
    omit?: JobStopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobStopInclude<ExtArgs> | null
    /**
     * Filter, which JobStop to fetch.
     */
    where?: JobStopWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobStops to fetch.
     */
    orderBy?: JobStopOrderByWithRelationInput | JobStopOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobStops.
     */
    cursor?: JobStopWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobStops from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobStops.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobStops.
     */
    distinct?: JobStopScalarFieldEnum | JobStopScalarFieldEnum[]
  }

  /**
   * JobStop findMany
   */
  export type JobStopFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobStop
     */
    select?: JobStopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobStop
     */
    omit?: JobStopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobStopInclude<ExtArgs> | null
    /**
     * Filter, which JobStops to fetch.
     */
    where?: JobStopWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobStops to fetch.
     */
    orderBy?: JobStopOrderByWithRelationInput | JobStopOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing JobStops.
     */
    cursor?: JobStopWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobStops from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobStops.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobStops.
     */
    distinct?: JobStopScalarFieldEnum | JobStopScalarFieldEnum[]
  }

  /**
   * JobStop create
   */
  export type JobStopCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobStop
     */
    select?: JobStopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobStop
     */
    omit?: JobStopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobStopInclude<ExtArgs> | null
    /**
     * The data needed to create a JobStop.
     */
    data: XOR<JobStopCreateInput, JobStopUncheckedCreateInput>
  }

  /**
   * JobStop createMany
   */
  export type JobStopCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many JobStops.
     */
    data: JobStopCreateManyInput | JobStopCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * JobStop createManyAndReturn
   */
  export type JobStopCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobStop
     */
    select?: JobStopSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JobStop
     */
    omit?: JobStopOmit<ExtArgs> | null
    /**
     * The data used to create many JobStops.
     */
    data: JobStopCreateManyInput | JobStopCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobStopIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * JobStop update
   */
  export type JobStopUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobStop
     */
    select?: JobStopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobStop
     */
    omit?: JobStopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobStopInclude<ExtArgs> | null
    /**
     * The data needed to update a JobStop.
     */
    data: XOR<JobStopUpdateInput, JobStopUncheckedUpdateInput>
    /**
     * Choose, which JobStop to update.
     */
    where: JobStopWhereUniqueInput
  }

  /**
   * JobStop updateMany
   */
  export type JobStopUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update JobStops.
     */
    data: XOR<JobStopUpdateManyMutationInput, JobStopUncheckedUpdateManyInput>
    /**
     * Filter which JobStops to update
     */
    where?: JobStopWhereInput
    /**
     * Limit how many JobStops to update.
     */
    limit?: number
  }

  /**
   * JobStop updateManyAndReturn
   */
  export type JobStopUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobStop
     */
    select?: JobStopSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JobStop
     */
    omit?: JobStopOmit<ExtArgs> | null
    /**
     * The data used to update JobStops.
     */
    data: XOR<JobStopUpdateManyMutationInput, JobStopUncheckedUpdateManyInput>
    /**
     * Filter which JobStops to update
     */
    where?: JobStopWhereInput
    /**
     * Limit how many JobStops to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobStopIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * JobStop upsert
   */
  export type JobStopUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobStop
     */
    select?: JobStopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobStop
     */
    omit?: JobStopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobStopInclude<ExtArgs> | null
    /**
     * The filter to search for the JobStop to update in case it exists.
     */
    where: JobStopWhereUniqueInput
    /**
     * In case the JobStop found by the `where` argument doesn't exist, create a new JobStop with this data.
     */
    create: XOR<JobStopCreateInput, JobStopUncheckedCreateInput>
    /**
     * In case the JobStop was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JobStopUpdateInput, JobStopUncheckedUpdateInput>
  }

  /**
   * JobStop delete
   */
  export type JobStopDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobStop
     */
    select?: JobStopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobStop
     */
    omit?: JobStopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobStopInclude<ExtArgs> | null
    /**
     * Filter which JobStop to delete.
     */
    where: JobStopWhereUniqueInput
  }

  /**
   * JobStop deleteMany
   */
  export type JobStopDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobStops to delete
     */
    where?: JobStopWhereInput
    /**
     * Limit how many JobStops to delete.
     */
    limit?: number
  }

  /**
   * JobStop without action
   */
  export type JobStopDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobStop
     */
    select?: JobStopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobStop
     */
    omit?: JobStopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobStopInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CompanyScalarFieldEnum: {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    name: 'name',
    logoUrl: 'logoUrl',
    profilePicUrl: 'profilePicUrl',
    phone: 'phone',
    website: 'website',
    address: 'address',
    city: 'city',
    state: 'state',
    zip: 'zip',
    contactName: 'contactName',
    timezone: 'timezone',
    subscriptionPlan: 'subscriptionPlan',
    stripeCustomerId: 'stripeCustomerId',
    stripeSubscriptionId: 'stripeSubscriptionId',
    stripeConnectAccountId: 'stripeConnectAccountId',
    trialEndsAt: 'trialEndsAt',
    emailVerified: 'emailVerified',
    emailVerificationToken: 'emailVerificationToken',
    customEmailDomain: 'customEmailDomain',
    customEmailFromName: 'customEmailFromName',
    resendDomainId: 'resendDomainId',
    emailDomainVerified: 'emailDomainVerified',
    emailDomainDnsRecords: 'emailDomainDnsRecords',
    isAdmin: 'isAdmin',
    lastLoginAt: 'lastLoginAt',
    createdAt: 'createdAt'
  };

  export type CompanyScalarFieldEnum = (typeof CompanyScalarFieldEnum)[keyof typeof CompanyScalarFieldEnum]


  export const PricingProfileScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId',
    widgetSettingsId: 'widgetSettingsId',
    baseRatePerMile: 'baseRatePerMile',
    minimumCharge: 'minimumCharge',
    useMinimumCharge: 'useMinimumCharge',
    minMilesThreshold: 'minMilesThreshold',
    weightFee: 'weightFee',
    itemCountFee: 'itemCountFee',
    stairsFee: 'stairsFee',
    insideDeliveryFee: 'insideDeliveryFee',
    addon3Fee: 'addon3Fee',
    afterHoursFee: 'afterHoursFee',
    businessHoursStart: 'businessHoursStart',
    businessHoursEnd: 'businessHoursEnd',
    businessDays: 'businessDays',
    largeItemFee: 'largeItemFee',
    largeItemsEnabled: 'largeItemsEnabled',
    largeItemCategories: 'largeItemCategories'
  };

  export type PricingProfileScalarFieldEnum = (typeof PricingProfileScalarFieldEnum)[keyof typeof PricingProfileScalarFieldEnum]


  export const WidgetSettingsScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId',
    name: 'name',
    logoUrl: 'logoUrl',
    showWeight: 'showWeight',
    showItemCount: 'showItemCount',
    showExtras: 'showExtras',
    insideDeliveryLabel: 'insideDeliveryLabel',
    addon3Label: 'addon3Label',
    primaryColor: 'primaryColor',
    buttonText: 'buttonText',
    headerText: 'headerText',
    disclaimerText: 'disclaimerText',
    companyNameText: 'companyNameText',
    companyNameFont: 'companyNameFont',
    backgroundImageUrl: 'backgroundImageUrl',
    mapLayout: 'mapLayout',
    websiteUrl: 'websiteUrl',
    paymentsEnabled: 'paymentsEnabled',
    showVehicles: 'showVehicles',
    pricePerVehicle: 'pricePerVehicle',
    showAwb: 'showAwb',
    geoFencingEnabled: 'geoFencingEnabled',
    serviceZips: 'serviceZips'
  };

  export type WidgetSettingsScalarFieldEnum = (typeof WidgetSettingsScalarFieldEnum)[keyof typeof WidgetSettingsScalarFieldEnum]


  export const QuoteRequestScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId',
    customerName: 'customerName',
    customerEmail: 'customerEmail',
    customerPhone: 'customerPhone',
    pickupZip: 'pickupZip',
    dropoffZip: 'dropoffZip',
    distanceMiles: 'distanceMiles',
    serviceType: 'serviceType',
    packageSize: 'packageSize',
    packageWeight: 'packageWeight',
    selectedExtras: 'selectedExtras',
    status: 'status',
    estimatedPrice: 'estimatedPrice',
    vehicleCount: 'vehicleCount',
    awbNumber: 'awbNumber',
    paymentStatus: 'paymentStatus',
    stripePaymentIntentId: 'stripePaymentIntentId',
    internalNotes: 'internalNotes',
    paidAt: 'paidAt',
    createdAt: 'createdAt'
  };

  export type QuoteRequestScalarFieldEnum = (typeof QuoteRequestScalarFieldEnum)[keyof typeof QuoteRequestScalarFieldEnum]


  export const WebhookScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId',
    url: 'url',
    secret: 'secret',
    events: 'events',
    enabled: 'enabled',
    createdAt: 'createdAt'
  };

  export type WebhookScalarFieldEnum = (typeof WebhookScalarFieldEnum)[keyof typeof WebhookScalarFieldEnum]


  export const ShopifyInstallScalarFieldEnum: {
    id: 'id',
    shop: 'shop',
    accessToken: 'accessToken',
    companyId: 'companyId',
    scriptTagId: 'scriptTagId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ShopifyInstallScalarFieldEnum = (typeof ShopifyInstallScalarFieldEnum)[keyof typeof ShopifyInstallScalarFieldEnum]


  export const PartnerInquiryScalarFieldEnum: {
    id: 'id',
    companyName: 'companyName',
    website: 'website',
    contactName: 'contactName',
    email: 'email',
    partnershipType: 'partnershipType',
    message: 'message',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PartnerInquiryScalarFieldEnum = (typeof PartnerInquiryScalarFieldEnum)[keyof typeof PartnerInquiryScalarFieldEnum]


  export const StopNoteScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId',
    companyName: 'companyName',
    address: 'address',
    contactName: 'contactName',
    contactPhone: 'contactPhone',
    gateCode: 'gateCode',
    dockInfo: 'dockInfo',
    hours: 'hours',
    parkingNotes: 'parkingNotes',
    accessNotes: 'accessNotes',
    deliveryNotes: 'deliveryNotes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StopNoteScalarFieldEnum = (typeof StopNoteScalarFieldEnum)[keyof typeof StopNoteScalarFieldEnum]


  export const ReadinessCheckScalarFieldEnum: {
    id: 'id',
    stopNoteId: 'stopNoteId',
    scheduledDate: 'scheduledDate',
    contactConfirmed: 'contactConfirmed',
    addressConfirmed: 'addressConfirmed',
    accessConfirmed: 'accessConfirmed',
    siteReady: 'siteReady',
    notes: 'notes',
    status: 'status',
    createdAt: 'createdAt',
    jobId: 'jobId'
  };

  export type ReadinessCheckScalarFieldEnum = (typeof ReadinessCheckScalarFieldEnum)[keyof typeof ReadinessCheckScalarFieldEnum]


  export const ExceptionLogScalarFieldEnum: {
    id: 'id',
    stopNoteId: 'stopNoteId',
    type: 'type',
    notes: 'notes',
    timestamp: 'timestamp',
    jobId: 'jobId'
  };

  export type ExceptionLogScalarFieldEnum = (typeof ExceptionLogScalarFieldEnum)[keyof typeof ExceptionLogScalarFieldEnum]


  export const JobScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId',
    quoteRequestId: 'quoteRequestId',
    status: 'status',
    scheduledDate: 'scheduledDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type JobScalarFieldEnum = (typeof JobScalarFieldEnum)[keyof typeof JobScalarFieldEnum]


  export const JobStopScalarFieldEnum: {
    id: 'id',
    jobId: 'jobId',
    stopNoteId: 'stopNoteId',
    order: 'order'
  };

  export type JobStopScalarFieldEnum = (typeof JobStopScalarFieldEnum)[keyof typeof JobStopScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type CompanyWhereInput = {
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    id?: StringFilter<"Company"> | string
    email?: StringFilter<"Company"> | string
    passwordHash?: StringFilter<"Company"> | string
    name?: StringFilter<"Company"> | string
    logoUrl?: StringNullableFilter<"Company"> | string | null
    profilePicUrl?: StringNullableFilter<"Company"> | string | null
    phone?: StringNullableFilter<"Company"> | string | null
    website?: StringNullableFilter<"Company"> | string | null
    address?: StringNullableFilter<"Company"> | string | null
    city?: StringNullableFilter<"Company"> | string | null
    state?: StringNullableFilter<"Company"> | string | null
    zip?: StringNullableFilter<"Company"> | string | null
    contactName?: StringNullableFilter<"Company"> | string | null
    timezone?: StringFilter<"Company"> | string
    subscriptionPlan?: StringFilter<"Company"> | string
    stripeCustomerId?: StringNullableFilter<"Company"> | string | null
    stripeSubscriptionId?: StringNullableFilter<"Company"> | string | null
    stripeConnectAccountId?: StringNullableFilter<"Company"> | string | null
    trialEndsAt?: DateTimeNullableFilter<"Company"> | Date | string | null
    emailVerified?: BoolFilter<"Company"> | boolean
    emailVerificationToken?: StringNullableFilter<"Company"> | string | null
    customEmailDomain?: StringNullableFilter<"Company"> | string | null
    customEmailFromName?: StringNullableFilter<"Company"> | string | null
    resendDomainId?: StringNullableFilter<"Company"> | string | null
    emailDomainVerified?: BoolFilter<"Company"> | boolean
    emailDomainDnsRecords?: JsonNullableFilter<"Company">
    isAdmin?: BoolFilter<"Company"> | boolean
    lastLoginAt?: DateTimeNullableFilter<"Company"> | Date | string | null
    createdAt?: DateTimeFilter<"Company"> | Date | string
    pricingProfiles?: PricingProfileListRelationFilter
    quoteRequests?: QuoteRequestListRelationFilter
    widgetSettings?: WidgetSettingsListRelationFilter
    webhooks?: WebhookListRelationFilter
    shopifyInstalls?: ShopifyInstallListRelationFilter
    stopNotes?: StopNoteListRelationFilter
    jobs?: JobListRelationFilter
  }

  export type CompanyOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    logoUrl?: SortOrderInput | SortOrder
    profilePicUrl?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    zip?: SortOrderInput | SortOrder
    contactName?: SortOrderInput | SortOrder
    timezone?: SortOrder
    subscriptionPlan?: SortOrder
    stripeCustomerId?: SortOrderInput | SortOrder
    stripeSubscriptionId?: SortOrderInput | SortOrder
    stripeConnectAccountId?: SortOrderInput | SortOrder
    trialEndsAt?: SortOrderInput | SortOrder
    emailVerified?: SortOrder
    emailVerificationToken?: SortOrderInput | SortOrder
    customEmailDomain?: SortOrderInput | SortOrder
    customEmailFromName?: SortOrderInput | SortOrder
    resendDomainId?: SortOrderInput | SortOrder
    emailDomainVerified?: SortOrder
    emailDomainDnsRecords?: SortOrderInput | SortOrder
    isAdmin?: SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    pricingProfiles?: PricingProfileOrderByRelationAggregateInput
    quoteRequests?: QuoteRequestOrderByRelationAggregateInput
    widgetSettings?: WidgetSettingsOrderByRelationAggregateInput
    webhooks?: WebhookOrderByRelationAggregateInput
    shopifyInstalls?: ShopifyInstallOrderByRelationAggregateInput
    stopNotes?: StopNoteOrderByRelationAggregateInput
    jobs?: JobOrderByRelationAggregateInput
  }

  export type CompanyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    emailVerificationToken?: string
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    passwordHash?: StringFilter<"Company"> | string
    name?: StringFilter<"Company"> | string
    logoUrl?: StringNullableFilter<"Company"> | string | null
    profilePicUrl?: StringNullableFilter<"Company"> | string | null
    phone?: StringNullableFilter<"Company"> | string | null
    website?: StringNullableFilter<"Company"> | string | null
    address?: StringNullableFilter<"Company"> | string | null
    city?: StringNullableFilter<"Company"> | string | null
    state?: StringNullableFilter<"Company"> | string | null
    zip?: StringNullableFilter<"Company"> | string | null
    contactName?: StringNullableFilter<"Company"> | string | null
    timezone?: StringFilter<"Company"> | string
    subscriptionPlan?: StringFilter<"Company"> | string
    stripeCustomerId?: StringNullableFilter<"Company"> | string | null
    stripeSubscriptionId?: StringNullableFilter<"Company"> | string | null
    stripeConnectAccountId?: StringNullableFilter<"Company"> | string | null
    trialEndsAt?: DateTimeNullableFilter<"Company"> | Date | string | null
    emailVerified?: BoolFilter<"Company"> | boolean
    customEmailDomain?: StringNullableFilter<"Company"> | string | null
    customEmailFromName?: StringNullableFilter<"Company"> | string | null
    resendDomainId?: StringNullableFilter<"Company"> | string | null
    emailDomainVerified?: BoolFilter<"Company"> | boolean
    emailDomainDnsRecords?: JsonNullableFilter<"Company">
    isAdmin?: BoolFilter<"Company"> | boolean
    lastLoginAt?: DateTimeNullableFilter<"Company"> | Date | string | null
    createdAt?: DateTimeFilter<"Company"> | Date | string
    pricingProfiles?: PricingProfileListRelationFilter
    quoteRequests?: QuoteRequestListRelationFilter
    widgetSettings?: WidgetSettingsListRelationFilter
    webhooks?: WebhookListRelationFilter
    shopifyInstalls?: ShopifyInstallListRelationFilter
    stopNotes?: StopNoteListRelationFilter
    jobs?: JobListRelationFilter
  }, "id" | "email" | "emailVerificationToken">

  export type CompanyOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    logoUrl?: SortOrderInput | SortOrder
    profilePicUrl?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    zip?: SortOrderInput | SortOrder
    contactName?: SortOrderInput | SortOrder
    timezone?: SortOrder
    subscriptionPlan?: SortOrder
    stripeCustomerId?: SortOrderInput | SortOrder
    stripeSubscriptionId?: SortOrderInput | SortOrder
    stripeConnectAccountId?: SortOrderInput | SortOrder
    trialEndsAt?: SortOrderInput | SortOrder
    emailVerified?: SortOrder
    emailVerificationToken?: SortOrderInput | SortOrder
    customEmailDomain?: SortOrderInput | SortOrder
    customEmailFromName?: SortOrderInput | SortOrder
    resendDomainId?: SortOrderInput | SortOrder
    emailDomainVerified?: SortOrder
    emailDomainDnsRecords?: SortOrderInput | SortOrder
    isAdmin?: SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: CompanyCountOrderByAggregateInput
    _max?: CompanyMaxOrderByAggregateInput
    _min?: CompanyMinOrderByAggregateInput
  }

  export type CompanyScalarWhereWithAggregatesInput = {
    AND?: CompanyScalarWhereWithAggregatesInput | CompanyScalarWhereWithAggregatesInput[]
    OR?: CompanyScalarWhereWithAggregatesInput[]
    NOT?: CompanyScalarWhereWithAggregatesInput | CompanyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Company"> | string
    email?: StringWithAggregatesFilter<"Company"> | string
    passwordHash?: StringWithAggregatesFilter<"Company"> | string
    name?: StringWithAggregatesFilter<"Company"> | string
    logoUrl?: StringNullableWithAggregatesFilter<"Company"> | string | null
    profilePicUrl?: StringNullableWithAggregatesFilter<"Company"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Company"> | string | null
    website?: StringNullableWithAggregatesFilter<"Company"> | string | null
    address?: StringNullableWithAggregatesFilter<"Company"> | string | null
    city?: StringNullableWithAggregatesFilter<"Company"> | string | null
    state?: StringNullableWithAggregatesFilter<"Company"> | string | null
    zip?: StringNullableWithAggregatesFilter<"Company"> | string | null
    contactName?: StringNullableWithAggregatesFilter<"Company"> | string | null
    timezone?: StringWithAggregatesFilter<"Company"> | string
    subscriptionPlan?: StringWithAggregatesFilter<"Company"> | string
    stripeCustomerId?: StringNullableWithAggregatesFilter<"Company"> | string | null
    stripeSubscriptionId?: StringNullableWithAggregatesFilter<"Company"> | string | null
    stripeConnectAccountId?: StringNullableWithAggregatesFilter<"Company"> | string | null
    trialEndsAt?: DateTimeNullableWithAggregatesFilter<"Company"> | Date | string | null
    emailVerified?: BoolWithAggregatesFilter<"Company"> | boolean
    emailVerificationToken?: StringNullableWithAggregatesFilter<"Company"> | string | null
    customEmailDomain?: StringNullableWithAggregatesFilter<"Company"> | string | null
    customEmailFromName?: StringNullableWithAggregatesFilter<"Company"> | string | null
    resendDomainId?: StringNullableWithAggregatesFilter<"Company"> | string | null
    emailDomainVerified?: BoolWithAggregatesFilter<"Company"> | boolean
    emailDomainDnsRecords?: JsonNullableWithAggregatesFilter<"Company">
    isAdmin?: BoolWithAggregatesFilter<"Company"> | boolean
    lastLoginAt?: DateTimeNullableWithAggregatesFilter<"Company"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Company"> | Date | string
  }

  export type PricingProfileWhereInput = {
    AND?: PricingProfileWhereInput | PricingProfileWhereInput[]
    OR?: PricingProfileWhereInput[]
    NOT?: PricingProfileWhereInput | PricingProfileWhereInput[]
    id?: StringFilter<"PricingProfile"> | string
    companyId?: StringFilter<"PricingProfile"> | string
    widgetSettingsId?: StringNullableFilter<"PricingProfile"> | string | null
    baseRatePerMile?: FloatFilter<"PricingProfile"> | number
    minimumCharge?: FloatFilter<"PricingProfile"> | number
    useMinimumCharge?: BoolFilter<"PricingProfile"> | boolean
    minMilesThreshold?: FloatFilter<"PricingProfile"> | number
    weightFee?: FloatFilter<"PricingProfile"> | number
    itemCountFee?: FloatFilter<"PricingProfile"> | number
    stairsFee?: FloatFilter<"PricingProfile"> | number
    insideDeliveryFee?: FloatFilter<"PricingProfile"> | number
    addon3Fee?: FloatFilter<"PricingProfile"> | number
    afterHoursFee?: FloatFilter<"PricingProfile"> | number
    businessHoursStart?: StringFilter<"PricingProfile"> | string
    businessHoursEnd?: StringFilter<"PricingProfile"> | string
    businessDays?: StringFilter<"PricingProfile"> | string
    largeItemFee?: FloatFilter<"PricingProfile"> | number
    largeItemsEnabled?: BoolFilter<"PricingProfile"> | boolean
    largeItemCategories?: JsonFilter<"PricingProfile">
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    widgetSettings?: XOR<WidgetSettingsNullableScalarRelationFilter, WidgetSettingsWhereInput> | null
  }

  export type PricingProfileOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    widgetSettingsId?: SortOrderInput | SortOrder
    baseRatePerMile?: SortOrder
    minimumCharge?: SortOrder
    useMinimumCharge?: SortOrder
    minMilesThreshold?: SortOrder
    weightFee?: SortOrder
    itemCountFee?: SortOrder
    stairsFee?: SortOrder
    insideDeliveryFee?: SortOrder
    addon3Fee?: SortOrder
    afterHoursFee?: SortOrder
    businessHoursStart?: SortOrder
    businessHoursEnd?: SortOrder
    businessDays?: SortOrder
    largeItemFee?: SortOrder
    largeItemsEnabled?: SortOrder
    largeItemCategories?: SortOrder
    company?: CompanyOrderByWithRelationInput
    widgetSettings?: WidgetSettingsOrderByWithRelationInput
  }

  export type PricingProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    widgetSettingsId?: string
    AND?: PricingProfileWhereInput | PricingProfileWhereInput[]
    OR?: PricingProfileWhereInput[]
    NOT?: PricingProfileWhereInput | PricingProfileWhereInput[]
    companyId?: StringFilter<"PricingProfile"> | string
    baseRatePerMile?: FloatFilter<"PricingProfile"> | number
    minimumCharge?: FloatFilter<"PricingProfile"> | number
    useMinimumCharge?: BoolFilter<"PricingProfile"> | boolean
    minMilesThreshold?: FloatFilter<"PricingProfile"> | number
    weightFee?: FloatFilter<"PricingProfile"> | number
    itemCountFee?: FloatFilter<"PricingProfile"> | number
    stairsFee?: FloatFilter<"PricingProfile"> | number
    insideDeliveryFee?: FloatFilter<"PricingProfile"> | number
    addon3Fee?: FloatFilter<"PricingProfile"> | number
    afterHoursFee?: FloatFilter<"PricingProfile"> | number
    businessHoursStart?: StringFilter<"PricingProfile"> | string
    businessHoursEnd?: StringFilter<"PricingProfile"> | string
    businessDays?: StringFilter<"PricingProfile"> | string
    largeItemFee?: FloatFilter<"PricingProfile"> | number
    largeItemsEnabled?: BoolFilter<"PricingProfile"> | boolean
    largeItemCategories?: JsonFilter<"PricingProfile">
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    widgetSettings?: XOR<WidgetSettingsNullableScalarRelationFilter, WidgetSettingsWhereInput> | null
  }, "id" | "widgetSettingsId">

  export type PricingProfileOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    widgetSettingsId?: SortOrderInput | SortOrder
    baseRatePerMile?: SortOrder
    minimumCharge?: SortOrder
    useMinimumCharge?: SortOrder
    minMilesThreshold?: SortOrder
    weightFee?: SortOrder
    itemCountFee?: SortOrder
    stairsFee?: SortOrder
    insideDeliveryFee?: SortOrder
    addon3Fee?: SortOrder
    afterHoursFee?: SortOrder
    businessHoursStart?: SortOrder
    businessHoursEnd?: SortOrder
    businessDays?: SortOrder
    largeItemFee?: SortOrder
    largeItemsEnabled?: SortOrder
    largeItemCategories?: SortOrder
    _count?: PricingProfileCountOrderByAggregateInput
    _avg?: PricingProfileAvgOrderByAggregateInput
    _max?: PricingProfileMaxOrderByAggregateInput
    _min?: PricingProfileMinOrderByAggregateInput
    _sum?: PricingProfileSumOrderByAggregateInput
  }

  export type PricingProfileScalarWhereWithAggregatesInput = {
    AND?: PricingProfileScalarWhereWithAggregatesInput | PricingProfileScalarWhereWithAggregatesInput[]
    OR?: PricingProfileScalarWhereWithAggregatesInput[]
    NOT?: PricingProfileScalarWhereWithAggregatesInput | PricingProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PricingProfile"> | string
    companyId?: StringWithAggregatesFilter<"PricingProfile"> | string
    widgetSettingsId?: StringNullableWithAggregatesFilter<"PricingProfile"> | string | null
    baseRatePerMile?: FloatWithAggregatesFilter<"PricingProfile"> | number
    minimumCharge?: FloatWithAggregatesFilter<"PricingProfile"> | number
    useMinimumCharge?: BoolWithAggregatesFilter<"PricingProfile"> | boolean
    minMilesThreshold?: FloatWithAggregatesFilter<"PricingProfile"> | number
    weightFee?: FloatWithAggregatesFilter<"PricingProfile"> | number
    itemCountFee?: FloatWithAggregatesFilter<"PricingProfile"> | number
    stairsFee?: FloatWithAggregatesFilter<"PricingProfile"> | number
    insideDeliveryFee?: FloatWithAggregatesFilter<"PricingProfile"> | number
    addon3Fee?: FloatWithAggregatesFilter<"PricingProfile"> | number
    afterHoursFee?: FloatWithAggregatesFilter<"PricingProfile"> | number
    businessHoursStart?: StringWithAggregatesFilter<"PricingProfile"> | string
    businessHoursEnd?: StringWithAggregatesFilter<"PricingProfile"> | string
    businessDays?: StringWithAggregatesFilter<"PricingProfile"> | string
    largeItemFee?: FloatWithAggregatesFilter<"PricingProfile"> | number
    largeItemsEnabled?: BoolWithAggregatesFilter<"PricingProfile"> | boolean
    largeItemCategories?: JsonWithAggregatesFilter<"PricingProfile">
  }

  export type WidgetSettingsWhereInput = {
    AND?: WidgetSettingsWhereInput | WidgetSettingsWhereInput[]
    OR?: WidgetSettingsWhereInput[]
    NOT?: WidgetSettingsWhereInput | WidgetSettingsWhereInput[]
    id?: StringFilter<"WidgetSettings"> | string
    companyId?: StringFilter<"WidgetSettings"> | string
    name?: StringFilter<"WidgetSettings"> | string
    logoUrl?: StringNullableFilter<"WidgetSettings"> | string | null
    showWeight?: BoolFilter<"WidgetSettings"> | boolean
    showItemCount?: BoolFilter<"WidgetSettings"> | boolean
    showExtras?: BoolFilter<"WidgetSettings"> | boolean
    insideDeliveryLabel?: StringFilter<"WidgetSettings"> | string
    addon3Label?: StringFilter<"WidgetSettings"> | string
    primaryColor?: StringFilter<"WidgetSettings"> | string
    buttonText?: StringFilter<"WidgetSettings"> | string
    headerText?: StringFilter<"WidgetSettings"> | string
    disclaimerText?: StringFilter<"WidgetSettings"> | string
    companyNameText?: StringNullableFilter<"WidgetSettings"> | string | null
    companyNameFont?: StringFilter<"WidgetSettings"> | string
    backgroundImageUrl?: StringNullableFilter<"WidgetSettings"> | string | null
    mapLayout?: StringFilter<"WidgetSettings"> | string
    websiteUrl?: StringNullableFilter<"WidgetSettings"> | string | null
    paymentsEnabled?: BoolFilter<"WidgetSettings"> | boolean
    showVehicles?: BoolFilter<"WidgetSettings"> | boolean
    pricePerVehicle?: FloatFilter<"WidgetSettings"> | number
    showAwb?: BoolFilter<"WidgetSettings"> | boolean
    geoFencingEnabled?: BoolFilter<"WidgetSettings"> | boolean
    serviceZips?: StringNullableListFilter<"WidgetSettings">
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    pricingProfile?: XOR<PricingProfileNullableScalarRelationFilter, PricingProfileWhereInput> | null
  }

  export type WidgetSettingsOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    logoUrl?: SortOrderInput | SortOrder
    showWeight?: SortOrder
    showItemCount?: SortOrder
    showExtras?: SortOrder
    insideDeliveryLabel?: SortOrder
    addon3Label?: SortOrder
    primaryColor?: SortOrder
    buttonText?: SortOrder
    headerText?: SortOrder
    disclaimerText?: SortOrder
    companyNameText?: SortOrderInput | SortOrder
    companyNameFont?: SortOrder
    backgroundImageUrl?: SortOrderInput | SortOrder
    mapLayout?: SortOrder
    websiteUrl?: SortOrderInput | SortOrder
    paymentsEnabled?: SortOrder
    showVehicles?: SortOrder
    pricePerVehicle?: SortOrder
    showAwb?: SortOrder
    geoFencingEnabled?: SortOrder
    serviceZips?: SortOrder
    company?: CompanyOrderByWithRelationInput
    pricingProfile?: PricingProfileOrderByWithRelationInput
  }

  export type WidgetSettingsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WidgetSettingsWhereInput | WidgetSettingsWhereInput[]
    OR?: WidgetSettingsWhereInput[]
    NOT?: WidgetSettingsWhereInput | WidgetSettingsWhereInput[]
    companyId?: StringFilter<"WidgetSettings"> | string
    name?: StringFilter<"WidgetSettings"> | string
    logoUrl?: StringNullableFilter<"WidgetSettings"> | string | null
    showWeight?: BoolFilter<"WidgetSettings"> | boolean
    showItemCount?: BoolFilter<"WidgetSettings"> | boolean
    showExtras?: BoolFilter<"WidgetSettings"> | boolean
    insideDeliveryLabel?: StringFilter<"WidgetSettings"> | string
    addon3Label?: StringFilter<"WidgetSettings"> | string
    primaryColor?: StringFilter<"WidgetSettings"> | string
    buttonText?: StringFilter<"WidgetSettings"> | string
    headerText?: StringFilter<"WidgetSettings"> | string
    disclaimerText?: StringFilter<"WidgetSettings"> | string
    companyNameText?: StringNullableFilter<"WidgetSettings"> | string | null
    companyNameFont?: StringFilter<"WidgetSettings"> | string
    backgroundImageUrl?: StringNullableFilter<"WidgetSettings"> | string | null
    mapLayout?: StringFilter<"WidgetSettings"> | string
    websiteUrl?: StringNullableFilter<"WidgetSettings"> | string | null
    paymentsEnabled?: BoolFilter<"WidgetSettings"> | boolean
    showVehicles?: BoolFilter<"WidgetSettings"> | boolean
    pricePerVehicle?: FloatFilter<"WidgetSettings"> | number
    showAwb?: BoolFilter<"WidgetSettings"> | boolean
    geoFencingEnabled?: BoolFilter<"WidgetSettings"> | boolean
    serviceZips?: StringNullableListFilter<"WidgetSettings">
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    pricingProfile?: XOR<PricingProfileNullableScalarRelationFilter, PricingProfileWhereInput> | null
  }, "id">

  export type WidgetSettingsOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    logoUrl?: SortOrderInput | SortOrder
    showWeight?: SortOrder
    showItemCount?: SortOrder
    showExtras?: SortOrder
    insideDeliveryLabel?: SortOrder
    addon3Label?: SortOrder
    primaryColor?: SortOrder
    buttonText?: SortOrder
    headerText?: SortOrder
    disclaimerText?: SortOrder
    companyNameText?: SortOrderInput | SortOrder
    companyNameFont?: SortOrder
    backgroundImageUrl?: SortOrderInput | SortOrder
    mapLayout?: SortOrder
    websiteUrl?: SortOrderInput | SortOrder
    paymentsEnabled?: SortOrder
    showVehicles?: SortOrder
    pricePerVehicle?: SortOrder
    showAwb?: SortOrder
    geoFencingEnabled?: SortOrder
    serviceZips?: SortOrder
    _count?: WidgetSettingsCountOrderByAggregateInput
    _avg?: WidgetSettingsAvgOrderByAggregateInput
    _max?: WidgetSettingsMaxOrderByAggregateInput
    _min?: WidgetSettingsMinOrderByAggregateInput
    _sum?: WidgetSettingsSumOrderByAggregateInput
  }

  export type WidgetSettingsScalarWhereWithAggregatesInput = {
    AND?: WidgetSettingsScalarWhereWithAggregatesInput | WidgetSettingsScalarWhereWithAggregatesInput[]
    OR?: WidgetSettingsScalarWhereWithAggregatesInput[]
    NOT?: WidgetSettingsScalarWhereWithAggregatesInput | WidgetSettingsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WidgetSettings"> | string
    companyId?: StringWithAggregatesFilter<"WidgetSettings"> | string
    name?: StringWithAggregatesFilter<"WidgetSettings"> | string
    logoUrl?: StringNullableWithAggregatesFilter<"WidgetSettings"> | string | null
    showWeight?: BoolWithAggregatesFilter<"WidgetSettings"> | boolean
    showItemCount?: BoolWithAggregatesFilter<"WidgetSettings"> | boolean
    showExtras?: BoolWithAggregatesFilter<"WidgetSettings"> | boolean
    insideDeliveryLabel?: StringWithAggregatesFilter<"WidgetSettings"> | string
    addon3Label?: StringWithAggregatesFilter<"WidgetSettings"> | string
    primaryColor?: StringWithAggregatesFilter<"WidgetSettings"> | string
    buttonText?: StringWithAggregatesFilter<"WidgetSettings"> | string
    headerText?: StringWithAggregatesFilter<"WidgetSettings"> | string
    disclaimerText?: StringWithAggregatesFilter<"WidgetSettings"> | string
    companyNameText?: StringNullableWithAggregatesFilter<"WidgetSettings"> | string | null
    companyNameFont?: StringWithAggregatesFilter<"WidgetSettings"> | string
    backgroundImageUrl?: StringNullableWithAggregatesFilter<"WidgetSettings"> | string | null
    mapLayout?: StringWithAggregatesFilter<"WidgetSettings"> | string
    websiteUrl?: StringNullableWithAggregatesFilter<"WidgetSettings"> | string | null
    paymentsEnabled?: BoolWithAggregatesFilter<"WidgetSettings"> | boolean
    showVehicles?: BoolWithAggregatesFilter<"WidgetSettings"> | boolean
    pricePerVehicle?: FloatWithAggregatesFilter<"WidgetSettings"> | number
    showAwb?: BoolWithAggregatesFilter<"WidgetSettings"> | boolean
    geoFencingEnabled?: BoolWithAggregatesFilter<"WidgetSettings"> | boolean
    serviceZips?: StringNullableListFilter<"WidgetSettings">
  }

  export type QuoteRequestWhereInput = {
    AND?: QuoteRequestWhereInput | QuoteRequestWhereInput[]
    OR?: QuoteRequestWhereInput[]
    NOT?: QuoteRequestWhereInput | QuoteRequestWhereInput[]
    id?: StringFilter<"QuoteRequest"> | string
    companyId?: StringFilter<"QuoteRequest"> | string
    customerName?: StringFilter<"QuoteRequest"> | string
    customerEmail?: StringFilter<"QuoteRequest"> | string
    customerPhone?: StringNullableFilter<"QuoteRequest"> | string | null
    pickupZip?: StringFilter<"QuoteRequest"> | string
    dropoffZip?: StringFilter<"QuoteRequest"> | string
    distanceMiles?: FloatFilter<"QuoteRequest"> | number
    serviceType?: StringFilter<"QuoteRequest"> | string
    packageSize?: StringNullableFilter<"QuoteRequest"> | string | null
    packageWeight?: StringNullableFilter<"QuoteRequest"> | string | null
    selectedExtras?: StringNullableFilter<"QuoteRequest"> | string | null
    status?: StringFilter<"QuoteRequest"> | string
    estimatedPrice?: FloatFilter<"QuoteRequest"> | number
    vehicleCount?: IntNullableFilter<"QuoteRequest"> | number | null
    awbNumber?: StringNullableFilter<"QuoteRequest"> | string | null
    paymentStatus?: StringNullableFilter<"QuoteRequest"> | string | null
    stripePaymentIntentId?: StringNullableFilter<"QuoteRequest"> | string | null
    internalNotes?: StringNullableFilter<"QuoteRequest"> | string | null
    paidAt?: DateTimeNullableFilter<"QuoteRequest"> | Date | string | null
    createdAt?: DateTimeFilter<"QuoteRequest"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    jobs?: JobListRelationFilter
  }

  export type QuoteRequestOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    customerPhone?: SortOrderInput | SortOrder
    pickupZip?: SortOrder
    dropoffZip?: SortOrder
    distanceMiles?: SortOrder
    serviceType?: SortOrder
    packageSize?: SortOrderInput | SortOrder
    packageWeight?: SortOrderInput | SortOrder
    selectedExtras?: SortOrderInput | SortOrder
    status?: SortOrder
    estimatedPrice?: SortOrder
    vehicleCount?: SortOrderInput | SortOrder
    awbNumber?: SortOrderInput | SortOrder
    paymentStatus?: SortOrderInput | SortOrder
    stripePaymentIntentId?: SortOrderInput | SortOrder
    internalNotes?: SortOrderInput | SortOrder
    paidAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    company?: CompanyOrderByWithRelationInput
    jobs?: JobOrderByRelationAggregateInput
  }

  export type QuoteRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: QuoteRequestWhereInput | QuoteRequestWhereInput[]
    OR?: QuoteRequestWhereInput[]
    NOT?: QuoteRequestWhereInput | QuoteRequestWhereInput[]
    companyId?: StringFilter<"QuoteRequest"> | string
    customerName?: StringFilter<"QuoteRequest"> | string
    customerEmail?: StringFilter<"QuoteRequest"> | string
    customerPhone?: StringNullableFilter<"QuoteRequest"> | string | null
    pickupZip?: StringFilter<"QuoteRequest"> | string
    dropoffZip?: StringFilter<"QuoteRequest"> | string
    distanceMiles?: FloatFilter<"QuoteRequest"> | number
    serviceType?: StringFilter<"QuoteRequest"> | string
    packageSize?: StringNullableFilter<"QuoteRequest"> | string | null
    packageWeight?: StringNullableFilter<"QuoteRequest"> | string | null
    selectedExtras?: StringNullableFilter<"QuoteRequest"> | string | null
    status?: StringFilter<"QuoteRequest"> | string
    estimatedPrice?: FloatFilter<"QuoteRequest"> | number
    vehicleCount?: IntNullableFilter<"QuoteRequest"> | number | null
    awbNumber?: StringNullableFilter<"QuoteRequest"> | string | null
    paymentStatus?: StringNullableFilter<"QuoteRequest"> | string | null
    stripePaymentIntentId?: StringNullableFilter<"QuoteRequest"> | string | null
    internalNotes?: StringNullableFilter<"QuoteRequest"> | string | null
    paidAt?: DateTimeNullableFilter<"QuoteRequest"> | Date | string | null
    createdAt?: DateTimeFilter<"QuoteRequest"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    jobs?: JobListRelationFilter
  }, "id">

  export type QuoteRequestOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    customerPhone?: SortOrderInput | SortOrder
    pickupZip?: SortOrder
    dropoffZip?: SortOrder
    distanceMiles?: SortOrder
    serviceType?: SortOrder
    packageSize?: SortOrderInput | SortOrder
    packageWeight?: SortOrderInput | SortOrder
    selectedExtras?: SortOrderInput | SortOrder
    status?: SortOrder
    estimatedPrice?: SortOrder
    vehicleCount?: SortOrderInput | SortOrder
    awbNumber?: SortOrderInput | SortOrder
    paymentStatus?: SortOrderInput | SortOrder
    stripePaymentIntentId?: SortOrderInput | SortOrder
    internalNotes?: SortOrderInput | SortOrder
    paidAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: QuoteRequestCountOrderByAggregateInput
    _avg?: QuoteRequestAvgOrderByAggregateInput
    _max?: QuoteRequestMaxOrderByAggregateInput
    _min?: QuoteRequestMinOrderByAggregateInput
    _sum?: QuoteRequestSumOrderByAggregateInput
  }

  export type QuoteRequestScalarWhereWithAggregatesInput = {
    AND?: QuoteRequestScalarWhereWithAggregatesInput | QuoteRequestScalarWhereWithAggregatesInput[]
    OR?: QuoteRequestScalarWhereWithAggregatesInput[]
    NOT?: QuoteRequestScalarWhereWithAggregatesInput | QuoteRequestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"QuoteRequest"> | string
    companyId?: StringWithAggregatesFilter<"QuoteRequest"> | string
    customerName?: StringWithAggregatesFilter<"QuoteRequest"> | string
    customerEmail?: StringWithAggregatesFilter<"QuoteRequest"> | string
    customerPhone?: StringNullableWithAggregatesFilter<"QuoteRequest"> | string | null
    pickupZip?: StringWithAggregatesFilter<"QuoteRequest"> | string
    dropoffZip?: StringWithAggregatesFilter<"QuoteRequest"> | string
    distanceMiles?: FloatWithAggregatesFilter<"QuoteRequest"> | number
    serviceType?: StringWithAggregatesFilter<"QuoteRequest"> | string
    packageSize?: StringNullableWithAggregatesFilter<"QuoteRequest"> | string | null
    packageWeight?: StringNullableWithAggregatesFilter<"QuoteRequest"> | string | null
    selectedExtras?: StringNullableWithAggregatesFilter<"QuoteRequest"> | string | null
    status?: StringWithAggregatesFilter<"QuoteRequest"> | string
    estimatedPrice?: FloatWithAggregatesFilter<"QuoteRequest"> | number
    vehicleCount?: IntNullableWithAggregatesFilter<"QuoteRequest"> | number | null
    awbNumber?: StringNullableWithAggregatesFilter<"QuoteRequest"> | string | null
    paymentStatus?: StringNullableWithAggregatesFilter<"QuoteRequest"> | string | null
    stripePaymentIntentId?: StringNullableWithAggregatesFilter<"QuoteRequest"> | string | null
    internalNotes?: StringNullableWithAggregatesFilter<"QuoteRequest"> | string | null
    paidAt?: DateTimeNullableWithAggregatesFilter<"QuoteRequest"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"QuoteRequest"> | Date | string
  }

  export type WebhookWhereInput = {
    AND?: WebhookWhereInput | WebhookWhereInput[]
    OR?: WebhookWhereInput[]
    NOT?: WebhookWhereInput | WebhookWhereInput[]
    id?: StringFilter<"Webhook"> | string
    companyId?: StringFilter<"Webhook"> | string
    url?: StringFilter<"Webhook"> | string
    secret?: StringFilter<"Webhook"> | string
    events?: StringNullableListFilter<"Webhook">
    enabled?: BoolFilter<"Webhook"> | boolean
    createdAt?: DateTimeFilter<"Webhook"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
  }

  export type WebhookOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    url?: SortOrder
    secret?: SortOrder
    events?: SortOrder
    enabled?: SortOrder
    createdAt?: SortOrder
    company?: CompanyOrderByWithRelationInput
  }

  export type WebhookWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WebhookWhereInput | WebhookWhereInput[]
    OR?: WebhookWhereInput[]
    NOT?: WebhookWhereInput | WebhookWhereInput[]
    companyId?: StringFilter<"Webhook"> | string
    url?: StringFilter<"Webhook"> | string
    secret?: StringFilter<"Webhook"> | string
    events?: StringNullableListFilter<"Webhook">
    enabled?: BoolFilter<"Webhook"> | boolean
    createdAt?: DateTimeFilter<"Webhook"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
  }, "id">

  export type WebhookOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    url?: SortOrder
    secret?: SortOrder
    events?: SortOrder
    enabled?: SortOrder
    createdAt?: SortOrder
    _count?: WebhookCountOrderByAggregateInput
    _max?: WebhookMaxOrderByAggregateInput
    _min?: WebhookMinOrderByAggregateInput
  }

  export type WebhookScalarWhereWithAggregatesInput = {
    AND?: WebhookScalarWhereWithAggregatesInput | WebhookScalarWhereWithAggregatesInput[]
    OR?: WebhookScalarWhereWithAggregatesInput[]
    NOT?: WebhookScalarWhereWithAggregatesInput | WebhookScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Webhook"> | string
    companyId?: StringWithAggregatesFilter<"Webhook"> | string
    url?: StringWithAggregatesFilter<"Webhook"> | string
    secret?: StringWithAggregatesFilter<"Webhook"> | string
    events?: StringNullableListFilter<"Webhook">
    enabled?: BoolWithAggregatesFilter<"Webhook"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Webhook"> | Date | string
  }

  export type ShopifyInstallWhereInput = {
    AND?: ShopifyInstallWhereInput | ShopifyInstallWhereInput[]
    OR?: ShopifyInstallWhereInput[]
    NOT?: ShopifyInstallWhereInput | ShopifyInstallWhereInput[]
    id?: StringFilter<"ShopifyInstall"> | string
    shop?: StringFilter<"ShopifyInstall"> | string
    accessToken?: StringFilter<"ShopifyInstall"> | string
    companyId?: StringNullableFilter<"ShopifyInstall"> | string | null
    scriptTagId?: StringNullableFilter<"ShopifyInstall"> | string | null
    createdAt?: DateTimeFilter<"ShopifyInstall"> | Date | string
    updatedAt?: DateTimeFilter<"ShopifyInstall"> | Date | string
    company?: XOR<CompanyNullableScalarRelationFilter, CompanyWhereInput> | null
  }

  export type ShopifyInstallOrderByWithRelationInput = {
    id?: SortOrder
    shop?: SortOrder
    accessToken?: SortOrder
    companyId?: SortOrderInput | SortOrder
    scriptTagId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    company?: CompanyOrderByWithRelationInput
  }

  export type ShopifyInstallWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    shop?: string
    AND?: ShopifyInstallWhereInput | ShopifyInstallWhereInput[]
    OR?: ShopifyInstallWhereInput[]
    NOT?: ShopifyInstallWhereInput | ShopifyInstallWhereInput[]
    accessToken?: StringFilter<"ShopifyInstall"> | string
    companyId?: StringNullableFilter<"ShopifyInstall"> | string | null
    scriptTagId?: StringNullableFilter<"ShopifyInstall"> | string | null
    createdAt?: DateTimeFilter<"ShopifyInstall"> | Date | string
    updatedAt?: DateTimeFilter<"ShopifyInstall"> | Date | string
    company?: XOR<CompanyNullableScalarRelationFilter, CompanyWhereInput> | null
  }, "id" | "shop">

  export type ShopifyInstallOrderByWithAggregationInput = {
    id?: SortOrder
    shop?: SortOrder
    accessToken?: SortOrder
    companyId?: SortOrderInput | SortOrder
    scriptTagId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ShopifyInstallCountOrderByAggregateInput
    _max?: ShopifyInstallMaxOrderByAggregateInput
    _min?: ShopifyInstallMinOrderByAggregateInput
  }

  export type ShopifyInstallScalarWhereWithAggregatesInput = {
    AND?: ShopifyInstallScalarWhereWithAggregatesInput | ShopifyInstallScalarWhereWithAggregatesInput[]
    OR?: ShopifyInstallScalarWhereWithAggregatesInput[]
    NOT?: ShopifyInstallScalarWhereWithAggregatesInput | ShopifyInstallScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ShopifyInstall"> | string
    shop?: StringWithAggregatesFilter<"ShopifyInstall"> | string
    accessToken?: StringWithAggregatesFilter<"ShopifyInstall"> | string
    companyId?: StringNullableWithAggregatesFilter<"ShopifyInstall"> | string | null
    scriptTagId?: StringNullableWithAggregatesFilter<"ShopifyInstall"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ShopifyInstall"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ShopifyInstall"> | Date | string
  }

  export type PartnerInquiryWhereInput = {
    AND?: PartnerInquiryWhereInput | PartnerInquiryWhereInput[]
    OR?: PartnerInquiryWhereInput[]
    NOT?: PartnerInquiryWhereInput | PartnerInquiryWhereInput[]
    id?: StringFilter<"PartnerInquiry"> | string
    companyName?: StringFilter<"PartnerInquiry"> | string
    website?: StringNullableFilter<"PartnerInquiry"> | string | null
    contactName?: StringFilter<"PartnerInquiry"> | string
    email?: StringFilter<"PartnerInquiry"> | string
    partnershipType?: StringFilter<"PartnerInquiry"> | string
    message?: StringFilter<"PartnerInquiry"> | string
    status?: StringFilter<"PartnerInquiry"> | string
    createdAt?: DateTimeFilter<"PartnerInquiry"> | Date | string
    updatedAt?: DateTimeFilter<"PartnerInquiry"> | Date | string
  }

  export type PartnerInquiryOrderByWithRelationInput = {
    id?: SortOrder
    companyName?: SortOrder
    website?: SortOrderInput | SortOrder
    contactName?: SortOrder
    email?: SortOrder
    partnershipType?: SortOrder
    message?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PartnerInquiryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PartnerInquiryWhereInput | PartnerInquiryWhereInput[]
    OR?: PartnerInquiryWhereInput[]
    NOT?: PartnerInquiryWhereInput | PartnerInquiryWhereInput[]
    companyName?: StringFilter<"PartnerInquiry"> | string
    website?: StringNullableFilter<"PartnerInquiry"> | string | null
    contactName?: StringFilter<"PartnerInquiry"> | string
    email?: StringFilter<"PartnerInquiry"> | string
    partnershipType?: StringFilter<"PartnerInquiry"> | string
    message?: StringFilter<"PartnerInquiry"> | string
    status?: StringFilter<"PartnerInquiry"> | string
    createdAt?: DateTimeFilter<"PartnerInquiry"> | Date | string
    updatedAt?: DateTimeFilter<"PartnerInquiry"> | Date | string
  }, "id">

  export type PartnerInquiryOrderByWithAggregationInput = {
    id?: SortOrder
    companyName?: SortOrder
    website?: SortOrderInput | SortOrder
    contactName?: SortOrder
    email?: SortOrder
    partnershipType?: SortOrder
    message?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PartnerInquiryCountOrderByAggregateInput
    _max?: PartnerInquiryMaxOrderByAggregateInput
    _min?: PartnerInquiryMinOrderByAggregateInput
  }

  export type PartnerInquiryScalarWhereWithAggregatesInput = {
    AND?: PartnerInquiryScalarWhereWithAggregatesInput | PartnerInquiryScalarWhereWithAggregatesInput[]
    OR?: PartnerInquiryScalarWhereWithAggregatesInput[]
    NOT?: PartnerInquiryScalarWhereWithAggregatesInput | PartnerInquiryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PartnerInquiry"> | string
    companyName?: StringWithAggregatesFilter<"PartnerInquiry"> | string
    website?: StringNullableWithAggregatesFilter<"PartnerInquiry"> | string | null
    contactName?: StringWithAggregatesFilter<"PartnerInquiry"> | string
    email?: StringWithAggregatesFilter<"PartnerInquiry"> | string
    partnershipType?: StringWithAggregatesFilter<"PartnerInquiry"> | string
    message?: StringWithAggregatesFilter<"PartnerInquiry"> | string
    status?: StringWithAggregatesFilter<"PartnerInquiry"> | string
    createdAt?: DateTimeWithAggregatesFilter<"PartnerInquiry"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PartnerInquiry"> | Date | string
  }

  export type StopNoteWhereInput = {
    AND?: StopNoteWhereInput | StopNoteWhereInput[]
    OR?: StopNoteWhereInput[]
    NOT?: StopNoteWhereInput | StopNoteWhereInput[]
    id?: StringFilter<"StopNote"> | string
    companyId?: StringFilter<"StopNote"> | string
    companyName?: StringFilter<"StopNote"> | string
    address?: StringFilter<"StopNote"> | string
    contactName?: StringNullableFilter<"StopNote"> | string | null
    contactPhone?: StringNullableFilter<"StopNote"> | string | null
    gateCode?: StringNullableFilter<"StopNote"> | string | null
    dockInfo?: StringNullableFilter<"StopNote"> | string | null
    hours?: StringNullableFilter<"StopNote"> | string | null
    parkingNotes?: StringNullableFilter<"StopNote"> | string | null
    accessNotes?: StringNullableFilter<"StopNote"> | string | null
    deliveryNotes?: StringNullableFilter<"StopNote"> | string | null
    createdAt?: DateTimeFilter<"StopNote"> | Date | string
    updatedAt?: DateTimeFilter<"StopNote"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    readinessChecks?: ReadinessCheckListRelationFilter
    exceptionLogs?: ExceptionLogListRelationFilter
    jobStops?: JobStopListRelationFilter
  }

  export type StopNoteOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    companyName?: SortOrder
    address?: SortOrder
    contactName?: SortOrderInput | SortOrder
    contactPhone?: SortOrderInput | SortOrder
    gateCode?: SortOrderInput | SortOrder
    dockInfo?: SortOrderInput | SortOrder
    hours?: SortOrderInput | SortOrder
    parkingNotes?: SortOrderInput | SortOrder
    accessNotes?: SortOrderInput | SortOrder
    deliveryNotes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    company?: CompanyOrderByWithRelationInput
    readinessChecks?: ReadinessCheckOrderByRelationAggregateInput
    exceptionLogs?: ExceptionLogOrderByRelationAggregateInput
    jobStops?: JobStopOrderByRelationAggregateInput
  }

  export type StopNoteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: StopNoteWhereInput | StopNoteWhereInput[]
    OR?: StopNoteWhereInput[]
    NOT?: StopNoteWhereInput | StopNoteWhereInput[]
    companyId?: StringFilter<"StopNote"> | string
    companyName?: StringFilter<"StopNote"> | string
    address?: StringFilter<"StopNote"> | string
    contactName?: StringNullableFilter<"StopNote"> | string | null
    contactPhone?: StringNullableFilter<"StopNote"> | string | null
    gateCode?: StringNullableFilter<"StopNote"> | string | null
    dockInfo?: StringNullableFilter<"StopNote"> | string | null
    hours?: StringNullableFilter<"StopNote"> | string | null
    parkingNotes?: StringNullableFilter<"StopNote"> | string | null
    accessNotes?: StringNullableFilter<"StopNote"> | string | null
    deliveryNotes?: StringNullableFilter<"StopNote"> | string | null
    createdAt?: DateTimeFilter<"StopNote"> | Date | string
    updatedAt?: DateTimeFilter<"StopNote"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    readinessChecks?: ReadinessCheckListRelationFilter
    exceptionLogs?: ExceptionLogListRelationFilter
    jobStops?: JobStopListRelationFilter
  }, "id">

  export type StopNoteOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    companyName?: SortOrder
    address?: SortOrder
    contactName?: SortOrderInput | SortOrder
    contactPhone?: SortOrderInput | SortOrder
    gateCode?: SortOrderInput | SortOrder
    dockInfo?: SortOrderInput | SortOrder
    hours?: SortOrderInput | SortOrder
    parkingNotes?: SortOrderInput | SortOrder
    accessNotes?: SortOrderInput | SortOrder
    deliveryNotes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StopNoteCountOrderByAggregateInput
    _max?: StopNoteMaxOrderByAggregateInput
    _min?: StopNoteMinOrderByAggregateInput
  }

  export type StopNoteScalarWhereWithAggregatesInput = {
    AND?: StopNoteScalarWhereWithAggregatesInput | StopNoteScalarWhereWithAggregatesInput[]
    OR?: StopNoteScalarWhereWithAggregatesInput[]
    NOT?: StopNoteScalarWhereWithAggregatesInput | StopNoteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StopNote"> | string
    companyId?: StringWithAggregatesFilter<"StopNote"> | string
    companyName?: StringWithAggregatesFilter<"StopNote"> | string
    address?: StringWithAggregatesFilter<"StopNote"> | string
    contactName?: StringNullableWithAggregatesFilter<"StopNote"> | string | null
    contactPhone?: StringNullableWithAggregatesFilter<"StopNote"> | string | null
    gateCode?: StringNullableWithAggregatesFilter<"StopNote"> | string | null
    dockInfo?: StringNullableWithAggregatesFilter<"StopNote"> | string | null
    hours?: StringNullableWithAggregatesFilter<"StopNote"> | string | null
    parkingNotes?: StringNullableWithAggregatesFilter<"StopNote"> | string | null
    accessNotes?: StringNullableWithAggregatesFilter<"StopNote"> | string | null
    deliveryNotes?: StringNullableWithAggregatesFilter<"StopNote"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"StopNote"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"StopNote"> | Date | string
  }

  export type ReadinessCheckWhereInput = {
    AND?: ReadinessCheckWhereInput | ReadinessCheckWhereInput[]
    OR?: ReadinessCheckWhereInput[]
    NOT?: ReadinessCheckWhereInput | ReadinessCheckWhereInput[]
    id?: StringFilter<"ReadinessCheck"> | string
    stopNoteId?: StringFilter<"ReadinessCheck"> | string
    scheduledDate?: DateTimeFilter<"ReadinessCheck"> | Date | string
    contactConfirmed?: BoolFilter<"ReadinessCheck"> | boolean
    addressConfirmed?: BoolFilter<"ReadinessCheck"> | boolean
    accessConfirmed?: BoolFilter<"ReadinessCheck"> | boolean
    siteReady?: BoolFilter<"ReadinessCheck"> | boolean
    notes?: StringNullableFilter<"ReadinessCheck"> | string | null
    status?: StringFilter<"ReadinessCheck"> | string
    createdAt?: DateTimeFilter<"ReadinessCheck"> | Date | string
    jobId?: StringNullableFilter<"ReadinessCheck"> | string | null
    stopNote?: XOR<StopNoteScalarRelationFilter, StopNoteWhereInput>
    job?: XOR<JobNullableScalarRelationFilter, JobWhereInput> | null
  }

  export type ReadinessCheckOrderByWithRelationInput = {
    id?: SortOrder
    stopNoteId?: SortOrder
    scheduledDate?: SortOrder
    contactConfirmed?: SortOrder
    addressConfirmed?: SortOrder
    accessConfirmed?: SortOrder
    siteReady?: SortOrder
    notes?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    jobId?: SortOrderInput | SortOrder
    stopNote?: StopNoteOrderByWithRelationInput
    job?: JobOrderByWithRelationInput
  }

  export type ReadinessCheckWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ReadinessCheckWhereInput | ReadinessCheckWhereInput[]
    OR?: ReadinessCheckWhereInput[]
    NOT?: ReadinessCheckWhereInput | ReadinessCheckWhereInput[]
    stopNoteId?: StringFilter<"ReadinessCheck"> | string
    scheduledDate?: DateTimeFilter<"ReadinessCheck"> | Date | string
    contactConfirmed?: BoolFilter<"ReadinessCheck"> | boolean
    addressConfirmed?: BoolFilter<"ReadinessCheck"> | boolean
    accessConfirmed?: BoolFilter<"ReadinessCheck"> | boolean
    siteReady?: BoolFilter<"ReadinessCheck"> | boolean
    notes?: StringNullableFilter<"ReadinessCheck"> | string | null
    status?: StringFilter<"ReadinessCheck"> | string
    createdAt?: DateTimeFilter<"ReadinessCheck"> | Date | string
    jobId?: StringNullableFilter<"ReadinessCheck"> | string | null
    stopNote?: XOR<StopNoteScalarRelationFilter, StopNoteWhereInput>
    job?: XOR<JobNullableScalarRelationFilter, JobWhereInput> | null
  }, "id">

  export type ReadinessCheckOrderByWithAggregationInput = {
    id?: SortOrder
    stopNoteId?: SortOrder
    scheduledDate?: SortOrder
    contactConfirmed?: SortOrder
    addressConfirmed?: SortOrder
    accessConfirmed?: SortOrder
    siteReady?: SortOrder
    notes?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    jobId?: SortOrderInput | SortOrder
    _count?: ReadinessCheckCountOrderByAggregateInput
    _max?: ReadinessCheckMaxOrderByAggregateInput
    _min?: ReadinessCheckMinOrderByAggregateInput
  }

  export type ReadinessCheckScalarWhereWithAggregatesInput = {
    AND?: ReadinessCheckScalarWhereWithAggregatesInput | ReadinessCheckScalarWhereWithAggregatesInput[]
    OR?: ReadinessCheckScalarWhereWithAggregatesInput[]
    NOT?: ReadinessCheckScalarWhereWithAggregatesInput | ReadinessCheckScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ReadinessCheck"> | string
    stopNoteId?: StringWithAggregatesFilter<"ReadinessCheck"> | string
    scheduledDate?: DateTimeWithAggregatesFilter<"ReadinessCheck"> | Date | string
    contactConfirmed?: BoolWithAggregatesFilter<"ReadinessCheck"> | boolean
    addressConfirmed?: BoolWithAggregatesFilter<"ReadinessCheck"> | boolean
    accessConfirmed?: BoolWithAggregatesFilter<"ReadinessCheck"> | boolean
    siteReady?: BoolWithAggregatesFilter<"ReadinessCheck"> | boolean
    notes?: StringNullableWithAggregatesFilter<"ReadinessCheck"> | string | null
    status?: StringWithAggregatesFilter<"ReadinessCheck"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ReadinessCheck"> | Date | string
    jobId?: StringNullableWithAggregatesFilter<"ReadinessCheck"> | string | null
  }

  export type ExceptionLogWhereInput = {
    AND?: ExceptionLogWhereInput | ExceptionLogWhereInput[]
    OR?: ExceptionLogWhereInput[]
    NOT?: ExceptionLogWhereInput | ExceptionLogWhereInput[]
    id?: StringFilter<"ExceptionLog"> | string
    stopNoteId?: StringNullableFilter<"ExceptionLog"> | string | null
    type?: StringFilter<"ExceptionLog"> | string
    notes?: StringNullableFilter<"ExceptionLog"> | string | null
    timestamp?: DateTimeFilter<"ExceptionLog"> | Date | string
    jobId?: StringNullableFilter<"ExceptionLog"> | string | null
    stopNote?: XOR<StopNoteNullableScalarRelationFilter, StopNoteWhereInput> | null
    job?: XOR<JobNullableScalarRelationFilter, JobWhereInput> | null
  }

  export type ExceptionLogOrderByWithRelationInput = {
    id?: SortOrder
    stopNoteId?: SortOrderInput | SortOrder
    type?: SortOrder
    notes?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    jobId?: SortOrderInput | SortOrder
    stopNote?: StopNoteOrderByWithRelationInput
    job?: JobOrderByWithRelationInput
  }

  export type ExceptionLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ExceptionLogWhereInput | ExceptionLogWhereInput[]
    OR?: ExceptionLogWhereInput[]
    NOT?: ExceptionLogWhereInput | ExceptionLogWhereInput[]
    stopNoteId?: StringNullableFilter<"ExceptionLog"> | string | null
    type?: StringFilter<"ExceptionLog"> | string
    notes?: StringNullableFilter<"ExceptionLog"> | string | null
    timestamp?: DateTimeFilter<"ExceptionLog"> | Date | string
    jobId?: StringNullableFilter<"ExceptionLog"> | string | null
    stopNote?: XOR<StopNoteNullableScalarRelationFilter, StopNoteWhereInput> | null
    job?: XOR<JobNullableScalarRelationFilter, JobWhereInput> | null
  }, "id">

  export type ExceptionLogOrderByWithAggregationInput = {
    id?: SortOrder
    stopNoteId?: SortOrderInput | SortOrder
    type?: SortOrder
    notes?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    jobId?: SortOrderInput | SortOrder
    _count?: ExceptionLogCountOrderByAggregateInput
    _max?: ExceptionLogMaxOrderByAggregateInput
    _min?: ExceptionLogMinOrderByAggregateInput
  }

  export type ExceptionLogScalarWhereWithAggregatesInput = {
    AND?: ExceptionLogScalarWhereWithAggregatesInput | ExceptionLogScalarWhereWithAggregatesInput[]
    OR?: ExceptionLogScalarWhereWithAggregatesInput[]
    NOT?: ExceptionLogScalarWhereWithAggregatesInput | ExceptionLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ExceptionLog"> | string
    stopNoteId?: StringNullableWithAggregatesFilter<"ExceptionLog"> | string | null
    type?: StringWithAggregatesFilter<"ExceptionLog"> | string
    notes?: StringNullableWithAggregatesFilter<"ExceptionLog"> | string | null
    timestamp?: DateTimeWithAggregatesFilter<"ExceptionLog"> | Date | string
    jobId?: StringNullableWithAggregatesFilter<"ExceptionLog"> | string | null
  }

  export type JobWhereInput = {
    AND?: JobWhereInput | JobWhereInput[]
    OR?: JobWhereInput[]
    NOT?: JobWhereInput | JobWhereInput[]
    id?: StringFilter<"Job"> | string
    companyId?: StringFilter<"Job"> | string
    quoteRequestId?: StringNullableFilter<"Job"> | string | null
    status?: StringFilter<"Job"> | string
    scheduledDate?: DateTimeFilter<"Job"> | Date | string
    createdAt?: DateTimeFilter<"Job"> | Date | string
    updatedAt?: DateTimeFilter<"Job"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    quoteRequest?: XOR<QuoteRequestNullableScalarRelationFilter, QuoteRequestWhereInput> | null
    stops?: JobStopListRelationFilter
    readinessChecks?: ReadinessCheckListRelationFilter
    exceptionLogs?: ExceptionLogListRelationFilter
  }

  export type JobOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    quoteRequestId?: SortOrderInput | SortOrder
    status?: SortOrder
    scheduledDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    company?: CompanyOrderByWithRelationInput
    quoteRequest?: QuoteRequestOrderByWithRelationInput
    stops?: JobStopOrderByRelationAggregateInput
    readinessChecks?: ReadinessCheckOrderByRelationAggregateInput
    exceptionLogs?: ExceptionLogOrderByRelationAggregateInput
  }

  export type JobWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: JobWhereInput | JobWhereInput[]
    OR?: JobWhereInput[]
    NOT?: JobWhereInput | JobWhereInput[]
    companyId?: StringFilter<"Job"> | string
    quoteRequestId?: StringNullableFilter<"Job"> | string | null
    status?: StringFilter<"Job"> | string
    scheduledDate?: DateTimeFilter<"Job"> | Date | string
    createdAt?: DateTimeFilter<"Job"> | Date | string
    updatedAt?: DateTimeFilter<"Job"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    quoteRequest?: XOR<QuoteRequestNullableScalarRelationFilter, QuoteRequestWhereInput> | null
    stops?: JobStopListRelationFilter
    readinessChecks?: ReadinessCheckListRelationFilter
    exceptionLogs?: ExceptionLogListRelationFilter
  }, "id">

  export type JobOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    quoteRequestId?: SortOrderInput | SortOrder
    status?: SortOrder
    scheduledDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: JobCountOrderByAggregateInput
    _max?: JobMaxOrderByAggregateInput
    _min?: JobMinOrderByAggregateInput
  }

  export type JobScalarWhereWithAggregatesInput = {
    AND?: JobScalarWhereWithAggregatesInput | JobScalarWhereWithAggregatesInput[]
    OR?: JobScalarWhereWithAggregatesInput[]
    NOT?: JobScalarWhereWithAggregatesInput | JobScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Job"> | string
    companyId?: StringWithAggregatesFilter<"Job"> | string
    quoteRequestId?: StringNullableWithAggregatesFilter<"Job"> | string | null
    status?: StringWithAggregatesFilter<"Job"> | string
    scheduledDate?: DateTimeWithAggregatesFilter<"Job"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Job"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Job"> | Date | string
  }

  export type JobStopWhereInput = {
    AND?: JobStopWhereInput | JobStopWhereInput[]
    OR?: JobStopWhereInput[]
    NOT?: JobStopWhereInput | JobStopWhereInput[]
    id?: StringFilter<"JobStop"> | string
    jobId?: StringFilter<"JobStop"> | string
    stopNoteId?: StringFilter<"JobStop"> | string
    order?: IntFilter<"JobStop"> | number
    job?: XOR<JobScalarRelationFilter, JobWhereInput>
    stopNote?: XOR<StopNoteScalarRelationFilter, StopNoteWhereInput>
  }

  export type JobStopOrderByWithRelationInput = {
    id?: SortOrder
    jobId?: SortOrder
    stopNoteId?: SortOrder
    order?: SortOrder
    job?: JobOrderByWithRelationInput
    stopNote?: StopNoteOrderByWithRelationInput
  }

  export type JobStopWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: JobStopWhereInput | JobStopWhereInput[]
    OR?: JobStopWhereInput[]
    NOT?: JobStopWhereInput | JobStopWhereInput[]
    jobId?: StringFilter<"JobStop"> | string
    stopNoteId?: StringFilter<"JobStop"> | string
    order?: IntFilter<"JobStop"> | number
    job?: XOR<JobScalarRelationFilter, JobWhereInput>
    stopNote?: XOR<StopNoteScalarRelationFilter, StopNoteWhereInput>
  }, "id">

  export type JobStopOrderByWithAggregationInput = {
    id?: SortOrder
    jobId?: SortOrder
    stopNoteId?: SortOrder
    order?: SortOrder
    _count?: JobStopCountOrderByAggregateInput
    _avg?: JobStopAvgOrderByAggregateInput
    _max?: JobStopMaxOrderByAggregateInput
    _min?: JobStopMinOrderByAggregateInput
    _sum?: JobStopSumOrderByAggregateInput
  }

  export type JobStopScalarWhereWithAggregatesInput = {
    AND?: JobStopScalarWhereWithAggregatesInput | JobStopScalarWhereWithAggregatesInput[]
    OR?: JobStopScalarWhereWithAggregatesInput[]
    NOT?: JobStopScalarWhereWithAggregatesInput | JobStopScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"JobStop"> | string
    jobId?: StringWithAggregatesFilter<"JobStop"> | string
    stopNoteId?: StringWithAggregatesFilter<"JobStop"> | string
    order?: IntWithAggregatesFilter<"JobStop"> | number
  }

  export type CompanyCreateInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    logoUrl?: string | null
    profilePicUrl?: string | null
    phone?: string | null
    website?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    zip?: string | null
    contactName?: string | null
    timezone?: string
    subscriptionPlan?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripeConnectAccountId?: string | null
    trialEndsAt?: Date | string | null
    emailVerified?: boolean
    emailVerificationToken?: string | null
    customEmailDomain?: string | null
    customEmailFromName?: string | null
    resendDomainId?: string | null
    emailDomainVerified?: boolean
    emailDomainDnsRecords?: NullableJsonNullValueInput | InputJsonValue
    isAdmin?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    pricingProfiles?: PricingProfileCreateNestedManyWithoutCompanyInput
    quoteRequests?: QuoteRequestCreateNestedManyWithoutCompanyInput
    widgetSettings?: WidgetSettingsCreateNestedManyWithoutCompanyInput
    webhooks?: WebhookCreateNestedManyWithoutCompanyInput
    shopifyInstalls?: ShopifyInstallCreateNestedManyWithoutCompanyInput
    stopNotes?: StopNoteCreateNestedManyWithoutCompanyInput
    jobs?: JobCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    logoUrl?: string | null
    profilePicUrl?: string | null
    phone?: string | null
    website?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    zip?: string | null
    contactName?: string | null
    timezone?: string
    subscriptionPlan?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripeConnectAccountId?: string | null
    trialEndsAt?: Date | string | null
    emailVerified?: boolean
    emailVerificationToken?: string | null
    customEmailDomain?: string | null
    customEmailFromName?: string | null
    resendDomainId?: string | null
    emailDomainVerified?: boolean
    emailDomainDnsRecords?: NullableJsonNullValueInput | InputJsonValue
    isAdmin?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    pricingProfiles?: PricingProfileUncheckedCreateNestedManyWithoutCompanyInput
    quoteRequests?: QuoteRequestUncheckedCreateNestedManyWithoutCompanyInput
    widgetSettings?: WidgetSettingsUncheckedCreateNestedManyWithoutCompanyInput
    webhooks?: WebhookUncheckedCreateNestedManyWithoutCompanyInput
    shopifyInstalls?: ShopifyInstallUncheckedCreateNestedManyWithoutCompanyInput
    stopNotes?: StopNoteUncheckedCreateNestedManyWithoutCompanyInput
    jobs?: JobUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeConnectAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    customEmailDomain?: NullableStringFieldUpdateOperationsInput | string | null
    customEmailFromName?: NullableStringFieldUpdateOperationsInput | string | null
    resendDomainId?: NullableStringFieldUpdateOperationsInput | string | null
    emailDomainVerified?: BoolFieldUpdateOperationsInput | boolean
    emailDomainDnsRecords?: NullableJsonNullValueInput | InputJsonValue
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pricingProfiles?: PricingProfileUpdateManyWithoutCompanyNestedInput
    quoteRequests?: QuoteRequestUpdateManyWithoutCompanyNestedInput
    widgetSettings?: WidgetSettingsUpdateManyWithoutCompanyNestedInput
    webhooks?: WebhookUpdateManyWithoutCompanyNestedInput
    shopifyInstalls?: ShopifyInstallUpdateManyWithoutCompanyNestedInput
    stopNotes?: StopNoteUpdateManyWithoutCompanyNestedInput
    jobs?: JobUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeConnectAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    customEmailDomain?: NullableStringFieldUpdateOperationsInput | string | null
    customEmailFromName?: NullableStringFieldUpdateOperationsInput | string | null
    resendDomainId?: NullableStringFieldUpdateOperationsInput | string | null
    emailDomainVerified?: BoolFieldUpdateOperationsInput | boolean
    emailDomainDnsRecords?: NullableJsonNullValueInput | InputJsonValue
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pricingProfiles?: PricingProfileUncheckedUpdateManyWithoutCompanyNestedInput
    quoteRequests?: QuoteRequestUncheckedUpdateManyWithoutCompanyNestedInput
    widgetSettings?: WidgetSettingsUncheckedUpdateManyWithoutCompanyNestedInput
    webhooks?: WebhookUncheckedUpdateManyWithoutCompanyNestedInput
    shopifyInstalls?: ShopifyInstallUncheckedUpdateManyWithoutCompanyNestedInput
    stopNotes?: StopNoteUncheckedUpdateManyWithoutCompanyNestedInput
    jobs?: JobUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyCreateManyInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    logoUrl?: string | null
    profilePicUrl?: string | null
    phone?: string | null
    website?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    zip?: string | null
    contactName?: string | null
    timezone?: string
    subscriptionPlan?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripeConnectAccountId?: string | null
    trialEndsAt?: Date | string | null
    emailVerified?: boolean
    emailVerificationToken?: string | null
    customEmailDomain?: string | null
    customEmailFromName?: string | null
    resendDomainId?: string | null
    emailDomainVerified?: boolean
    emailDomainDnsRecords?: NullableJsonNullValueInput | InputJsonValue
    isAdmin?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
  }

  export type CompanyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeConnectAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    customEmailDomain?: NullableStringFieldUpdateOperationsInput | string | null
    customEmailFromName?: NullableStringFieldUpdateOperationsInput | string | null
    resendDomainId?: NullableStringFieldUpdateOperationsInput | string | null
    emailDomainVerified?: BoolFieldUpdateOperationsInput | boolean
    emailDomainDnsRecords?: NullableJsonNullValueInput | InputJsonValue
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeConnectAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    customEmailDomain?: NullableStringFieldUpdateOperationsInput | string | null
    customEmailFromName?: NullableStringFieldUpdateOperationsInput | string | null
    resendDomainId?: NullableStringFieldUpdateOperationsInput | string | null
    emailDomainVerified?: BoolFieldUpdateOperationsInput | boolean
    emailDomainDnsRecords?: NullableJsonNullValueInput | InputJsonValue
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PricingProfileCreateInput = {
    id?: string
    baseRatePerMile?: number
    minimumCharge?: number
    useMinimumCharge?: boolean
    minMilesThreshold?: number
    weightFee?: number
    itemCountFee?: number
    stairsFee?: number
    insideDeliveryFee?: number
    addon3Fee?: number
    afterHoursFee?: number
    businessHoursStart?: string
    businessHoursEnd?: string
    businessDays?: string
    largeItemFee?: number
    largeItemsEnabled?: boolean
    largeItemCategories?: JsonNullValueInput | InputJsonValue
    company: CompanyCreateNestedOneWithoutPricingProfilesInput
    widgetSettings?: WidgetSettingsCreateNestedOneWithoutPricingProfileInput
  }

  export type PricingProfileUncheckedCreateInput = {
    id?: string
    companyId: string
    widgetSettingsId?: string | null
    baseRatePerMile?: number
    minimumCharge?: number
    useMinimumCharge?: boolean
    minMilesThreshold?: number
    weightFee?: number
    itemCountFee?: number
    stairsFee?: number
    insideDeliveryFee?: number
    addon3Fee?: number
    afterHoursFee?: number
    businessHoursStart?: string
    businessHoursEnd?: string
    businessDays?: string
    largeItemFee?: number
    largeItemsEnabled?: boolean
    largeItemCategories?: JsonNullValueInput | InputJsonValue
  }

  export type PricingProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    baseRatePerMile?: FloatFieldUpdateOperationsInput | number
    minimumCharge?: FloatFieldUpdateOperationsInput | number
    useMinimumCharge?: BoolFieldUpdateOperationsInput | boolean
    minMilesThreshold?: FloatFieldUpdateOperationsInput | number
    weightFee?: FloatFieldUpdateOperationsInput | number
    itemCountFee?: FloatFieldUpdateOperationsInput | number
    stairsFee?: FloatFieldUpdateOperationsInput | number
    insideDeliveryFee?: FloatFieldUpdateOperationsInput | number
    addon3Fee?: FloatFieldUpdateOperationsInput | number
    afterHoursFee?: FloatFieldUpdateOperationsInput | number
    businessHoursStart?: StringFieldUpdateOperationsInput | string
    businessHoursEnd?: StringFieldUpdateOperationsInput | string
    businessDays?: StringFieldUpdateOperationsInput | string
    largeItemFee?: FloatFieldUpdateOperationsInput | number
    largeItemsEnabled?: BoolFieldUpdateOperationsInput | boolean
    largeItemCategories?: JsonNullValueInput | InputJsonValue
    company?: CompanyUpdateOneRequiredWithoutPricingProfilesNestedInput
    widgetSettings?: WidgetSettingsUpdateOneWithoutPricingProfileNestedInput
  }

  export type PricingProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    widgetSettingsId?: NullableStringFieldUpdateOperationsInput | string | null
    baseRatePerMile?: FloatFieldUpdateOperationsInput | number
    minimumCharge?: FloatFieldUpdateOperationsInput | number
    useMinimumCharge?: BoolFieldUpdateOperationsInput | boolean
    minMilesThreshold?: FloatFieldUpdateOperationsInput | number
    weightFee?: FloatFieldUpdateOperationsInput | number
    itemCountFee?: FloatFieldUpdateOperationsInput | number
    stairsFee?: FloatFieldUpdateOperationsInput | number
    insideDeliveryFee?: FloatFieldUpdateOperationsInput | number
    addon3Fee?: FloatFieldUpdateOperationsInput | number
    afterHoursFee?: FloatFieldUpdateOperationsInput | number
    businessHoursStart?: StringFieldUpdateOperationsInput | string
    businessHoursEnd?: StringFieldUpdateOperationsInput | string
    businessDays?: StringFieldUpdateOperationsInput | string
    largeItemFee?: FloatFieldUpdateOperationsInput | number
    largeItemsEnabled?: BoolFieldUpdateOperationsInput | boolean
    largeItemCategories?: JsonNullValueInput | InputJsonValue
  }

  export type PricingProfileCreateManyInput = {
    id?: string
    companyId: string
    widgetSettingsId?: string | null
    baseRatePerMile?: number
    minimumCharge?: number
    useMinimumCharge?: boolean
    minMilesThreshold?: number
    weightFee?: number
    itemCountFee?: number
    stairsFee?: number
    insideDeliveryFee?: number
    addon3Fee?: number
    afterHoursFee?: number
    businessHoursStart?: string
    businessHoursEnd?: string
    businessDays?: string
    largeItemFee?: number
    largeItemsEnabled?: boolean
    largeItemCategories?: JsonNullValueInput | InputJsonValue
  }

  export type PricingProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    baseRatePerMile?: FloatFieldUpdateOperationsInput | number
    minimumCharge?: FloatFieldUpdateOperationsInput | number
    useMinimumCharge?: BoolFieldUpdateOperationsInput | boolean
    minMilesThreshold?: FloatFieldUpdateOperationsInput | number
    weightFee?: FloatFieldUpdateOperationsInput | number
    itemCountFee?: FloatFieldUpdateOperationsInput | number
    stairsFee?: FloatFieldUpdateOperationsInput | number
    insideDeliveryFee?: FloatFieldUpdateOperationsInput | number
    addon3Fee?: FloatFieldUpdateOperationsInput | number
    afterHoursFee?: FloatFieldUpdateOperationsInput | number
    businessHoursStart?: StringFieldUpdateOperationsInput | string
    businessHoursEnd?: StringFieldUpdateOperationsInput | string
    businessDays?: StringFieldUpdateOperationsInput | string
    largeItemFee?: FloatFieldUpdateOperationsInput | number
    largeItemsEnabled?: BoolFieldUpdateOperationsInput | boolean
    largeItemCategories?: JsonNullValueInput | InputJsonValue
  }

  export type PricingProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    widgetSettingsId?: NullableStringFieldUpdateOperationsInput | string | null
    baseRatePerMile?: FloatFieldUpdateOperationsInput | number
    minimumCharge?: FloatFieldUpdateOperationsInput | number
    useMinimumCharge?: BoolFieldUpdateOperationsInput | boolean
    minMilesThreshold?: FloatFieldUpdateOperationsInput | number
    weightFee?: FloatFieldUpdateOperationsInput | number
    itemCountFee?: FloatFieldUpdateOperationsInput | number
    stairsFee?: FloatFieldUpdateOperationsInput | number
    insideDeliveryFee?: FloatFieldUpdateOperationsInput | number
    addon3Fee?: FloatFieldUpdateOperationsInput | number
    afterHoursFee?: FloatFieldUpdateOperationsInput | number
    businessHoursStart?: StringFieldUpdateOperationsInput | string
    businessHoursEnd?: StringFieldUpdateOperationsInput | string
    businessDays?: StringFieldUpdateOperationsInput | string
    largeItemFee?: FloatFieldUpdateOperationsInput | number
    largeItemsEnabled?: BoolFieldUpdateOperationsInput | boolean
    largeItemCategories?: JsonNullValueInput | InputJsonValue
  }

  export type WidgetSettingsCreateInput = {
    id?: string
    name?: string
    logoUrl?: string | null
    showWeight?: boolean
    showItemCount?: boolean
    showExtras?: boolean
    insideDeliveryLabel?: string
    addon3Label?: string
    primaryColor?: string
    buttonText?: string
    headerText?: string
    disclaimerText?: string
    companyNameText?: string | null
    companyNameFont?: string
    backgroundImageUrl?: string | null
    mapLayout?: string
    websiteUrl?: string | null
    paymentsEnabled?: boolean
    showVehicles?: boolean
    pricePerVehicle?: number
    showAwb?: boolean
    geoFencingEnabled?: boolean
    serviceZips?: WidgetSettingsCreateserviceZipsInput | string[]
    company: CompanyCreateNestedOneWithoutWidgetSettingsInput
    pricingProfile?: PricingProfileCreateNestedOneWithoutWidgetSettingsInput
  }

  export type WidgetSettingsUncheckedCreateInput = {
    id?: string
    companyId: string
    name?: string
    logoUrl?: string | null
    showWeight?: boolean
    showItemCount?: boolean
    showExtras?: boolean
    insideDeliveryLabel?: string
    addon3Label?: string
    primaryColor?: string
    buttonText?: string
    headerText?: string
    disclaimerText?: string
    companyNameText?: string | null
    companyNameFont?: string
    backgroundImageUrl?: string | null
    mapLayout?: string
    websiteUrl?: string | null
    paymentsEnabled?: boolean
    showVehicles?: boolean
    pricePerVehicle?: number
    showAwb?: boolean
    geoFencingEnabled?: boolean
    serviceZips?: WidgetSettingsCreateserviceZipsInput | string[]
    pricingProfile?: PricingProfileUncheckedCreateNestedOneWithoutWidgetSettingsInput
  }

  export type WidgetSettingsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    showWeight?: BoolFieldUpdateOperationsInput | boolean
    showItemCount?: BoolFieldUpdateOperationsInput | boolean
    showExtras?: BoolFieldUpdateOperationsInput | boolean
    insideDeliveryLabel?: StringFieldUpdateOperationsInput | string
    addon3Label?: StringFieldUpdateOperationsInput | string
    primaryColor?: StringFieldUpdateOperationsInput | string
    buttonText?: StringFieldUpdateOperationsInput | string
    headerText?: StringFieldUpdateOperationsInput | string
    disclaimerText?: StringFieldUpdateOperationsInput | string
    companyNameText?: NullableStringFieldUpdateOperationsInput | string | null
    companyNameFont?: StringFieldUpdateOperationsInput | string
    backgroundImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mapLayout?: StringFieldUpdateOperationsInput | string
    websiteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paymentsEnabled?: BoolFieldUpdateOperationsInput | boolean
    showVehicles?: BoolFieldUpdateOperationsInput | boolean
    pricePerVehicle?: FloatFieldUpdateOperationsInput | number
    showAwb?: BoolFieldUpdateOperationsInput | boolean
    geoFencingEnabled?: BoolFieldUpdateOperationsInput | boolean
    serviceZips?: WidgetSettingsUpdateserviceZipsInput | string[]
    company?: CompanyUpdateOneRequiredWithoutWidgetSettingsNestedInput
    pricingProfile?: PricingProfileUpdateOneWithoutWidgetSettingsNestedInput
  }

  export type WidgetSettingsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    showWeight?: BoolFieldUpdateOperationsInput | boolean
    showItemCount?: BoolFieldUpdateOperationsInput | boolean
    showExtras?: BoolFieldUpdateOperationsInput | boolean
    insideDeliveryLabel?: StringFieldUpdateOperationsInput | string
    addon3Label?: StringFieldUpdateOperationsInput | string
    primaryColor?: StringFieldUpdateOperationsInput | string
    buttonText?: StringFieldUpdateOperationsInput | string
    headerText?: StringFieldUpdateOperationsInput | string
    disclaimerText?: StringFieldUpdateOperationsInput | string
    companyNameText?: NullableStringFieldUpdateOperationsInput | string | null
    companyNameFont?: StringFieldUpdateOperationsInput | string
    backgroundImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mapLayout?: StringFieldUpdateOperationsInput | string
    websiteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paymentsEnabled?: BoolFieldUpdateOperationsInput | boolean
    showVehicles?: BoolFieldUpdateOperationsInput | boolean
    pricePerVehicle?: FloatFieldUpdateOperationsInput | number
    showAwb?: BoolFieldUpdateOperationsInput | boolean
    geoFencingEnabled?: BoolFieldUpdateOperationsInput | boolean
    serviceZips?: WidgetSettingsUpdateserviceZipsInput | string[]
    pricingProfile?: PricingProfileUncheckedUpdateOneWithoutWidgetSettingsNestedInput
  }

  export type WidgetSettingsCreateManyInput = {
    id?: string
    companyId: string
    name?: string
    logoUrl?: string | null
    showWeight?: boolean
    showItemCount?: boolean
    showExtras?: boolean
    insideDeliveryLabel?: string
    addon3Label?: string
    primaryColor?: string
    buttonText?: string
    headerText?: string
    disclaimerText?: string
    companyNameText?: string | null
    companyNameFont?: string
    backgroundImageUrl?: string | null
    mapLayout?: string
    websiteUrl?: string | null
    paymentsEnabled?: boolean
    showVehicles?: boolean
    pricePerVehicle?: number
    showAwb?: boolean
    geoFencingEnabled?: boolean
    serviceZips?: WidgetSettingsCreateserviceZipsInput | string[]
  }

  export type WidgetSettingsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    showWeight?: BoolFieldUpdateOperationsInput | boolean
    showItemCount?: BoolFieldUpdateOperationsInput | boolean
    showExtras?: BoolFieldUpdateOperationsInput | boolean
    insideDeliveryLabel?: StringFieldUpdateOperationsInput | string
    addon3Label?: StringFieldUpdateOperationsInput | string
    primaryColor?: StringFieldUpdateOperationsInput | string
    buttonText?: StringFieldUpdateOperationsInput | string
    headerText?: StringFieldUpdateOperationsInput | string
    disclaimerText?: StringFieldUpdateOperationsInput | string
    companyNameText?: NullableStringFieldUpdateOperationsInput | string | null
    companyNameFont?: StringFieldUpdateOperationsInput | string
    backgroundImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mapLayout?: StringFieldUpdateOperationsInput | string
    websiteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paymentsEnabled?: BoolFieldUpdateOperationsInput | boolean
    showVehicles?: BoolFieldUpdateOperationsInput | boolean
    pricePerVehicle?: FloatFieldUpdateOperationsInput | number
    showAwb?: BoolFieldUpdateOperationsInput | boolean
    geoFencingEnabled?: BoolFieldUpdateOperationsInput | boolean
    serviceZips?: WidgetSettingsUpdateserviceZipsInput | string[]
  }

  export type WidgetSettingsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    showWeight?: BoolFieldUpdateOperationsInput | boolean
    showItemCount?: BoolFieldUpdateOperationsInput | boolean
    showExtras?: BoolFieldUpdateOperationsInput | boolean
    insideDeliveryLabel?: StringFieldUpdateOperationsInput | string
    addon3Label?: StringFieldUpdateOperationsInput | string
    primaryColor?: StringFieldUpdateOperationsInput | string
    buttonText?: StringFieldUpdateOperationsInput | string
    headerText?: StringFieldUpdateOperationsInput | string
    disclaimerText?: StringFieldUpdateOperationsInput | string
    companyNameText?: NullableStringFieldUpdateOperationsInput | string | null
    companyNameFont?: StringFieldUpdateOperationsInput | string
    backgroundImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mapLayout?: StringFieldUpdateOperationsInput | string
    websiteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paymentsEnabled?: BoolFieldUpdateOperationsInput | boolean
    showVehicles?: BoolFieldUpdateOperationsInput | boolean
    pricePerVehicle?: FloatFieldUpdateOperationsInput | number
    showAwb?: BoolFieldUpdateOperationsInput | boolean
    geoFencingEnabled?: BoolFieldUpdateOperationsInput | boolean
    serviceZips?: WidgetSettingsUpdateserviceZipsInput | string[]
  }

  export type QuoteRequestCreateInput = {
    id?: string
    customerName: string
    customerEmail: string
    customerPhone?: string | null
    pickupZip: string
    dropoffZip: string
    distanceMiles: number
    serviceType: string
    packageSize?: string | null
    packageWeight?: string | null
    selectedExtras?: string | null
    status?: string
    estimatedPrice: number
    vehicleCount?: number | null
    awbNumber?: string | null
    paymentStatus?: string | null
    stripePaymentIntentId?: string | null
    internalNotes?: string | null
    paidAt?: Date | string | null
    createdAt?: Date | string
    company: CompanyCreateNestedOneWithoutQuoteRequestsInput
    jobs?: JobCreateNestedManyWithoutQuoteRequestInput
  }

  export type QuoteRequestUncheckedCreateInput = {
    id?: string
    companyId: string
    customerName: string
    customerEmail: string
    customerPhone?: string | null
    pickupZip: string
    dropoffZip: string
    distanceMiles: number
    serviceType: string
    packageSize?: string | null
    packageWeight?: string | null
    selectedExtras?: string | null
    status?: string
    estimatedPrice: number
    vehicleCount?: number | null
    awbNumber?: string | null
    paymentStatus?: string | null
    stripePaymentIntentId?: string | null
    internalNotes?: string | null
    paidAt?: Date | string | null
    createdAt?: Date | string
    jobs?: JobUncheckedCreateNestedManyWithoutQuoteRequestInput
  }

  export type QuoteRequestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    pickupZip?: StringFieldUpdateOperationsInput | string
    dropoffZip?: StringFieldUpdateOperationsInput | string
    distanceMiles?: FloatFieldUpdateOperationsInput | number
    serviceType?: StringFieldUpdateOperationsInput | string
    packageSize?: NullableStringFieldUpdateOperationsInput | string | null
    packageWeight?: NullableStringFieldUpdateOperationsInput | string | null
    selectedExtras?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    estimatedPrice?: FloatFieldUpdateOperationsInput | number
    vehicleCount?: NullableIntFieldUpdateOperationsInput | number | null
    awbNumber?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: NullableStringFieldUpdateOperationsInput | string | null
    stripePaymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    internalNotes?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutQuoteRequestsNestedInput
    jobs?: JobUpdateManyWithoutQuoteRequestNestedInput
  }

  export type QuoteRequestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    pickupZip?: StringFieldUpdateOperationsInput | string
    dropoffZip?: StringFieldUpdateOperationsInput | string
    distanceMiles?: FloatFieldUpdateOperationsInput | number
    serviceType?: StringFieldUpdateOperationsInput | string
    packageSize?: NullableStringFieldUpdateOperationsInput | string | null
    packageWeight?: NullableStringFieldUpdateOperationsInput | string | null
    selectedExtras?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    estimatedPrice?: FloatFieldUpdateOperationsInput | number
    vehicleCount?: NullableIntFieldUpdateOperationsInput | number | null
    awbNumber?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: NullableStringFieldUpdateOperationsInput | string | null
    stripePaymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    internalNotes?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobs?: JobUncheckedUpdateManyWithoutQuoteRequestNestedInput
  }

  export type QuoteRequestCreateManyInput = {
    id?: string
    companyId: string
    customerName: string
    customerEmail: string
    customerPhone?: string | null
    pickupZip: string
    dropoffZip: string
    distanceMiles: number
    serviceType: string
    packageSize?: string | null
    packageWeight?: string | null
    selectedExtras?: string | null
    status?: string
    estimatedPrice: number
    vehicleCount?: number | null
    awbNumber?: string | null
    paymentStatus?: string | null
    stripePaymentIntentId?: string | null
    internalNotes?: string | null
    paidAt?: Date | string | null
    createdAt?: Date | string
  }

  export type QuoteRequestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    pickupZip?: StringFieldUpdateOperationsInput | string
    dropoffZip?: StringFieldUpdateOperationsInput | string
    distanceMiles?: FloatFieldUpdateOperationsInput | number
    serviceType?: StringFieldUpdateOperationsInput | string
    packageSize?: NullableStringFieldUpdateOperationsInput | string | null
    packageWeight?: NullableStringFieldUpdateOperationsInput | string | null
    selectedExtras?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    estimatedPrice?: FloatFieldUpdateOperationsInput | number
    vehicleCount?: NullableIntFieldUpdateOperationsInput | number | null
    awbNumber?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: NullableStringFieldUpdateOperationsInput | string | null
    stripePaymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    internalNotes?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuoteRequestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    pickupZip?: StringFieldUpdateOperationsInput | string
    dropoffZip?: StringFieldUpdateOperationsInput | string
    distanceMiles?: FloatFieldUpdateOperationsInput | number
    serviceType?: StringFieldUpdateOperationsInput | string
    packageSize?: NullableStringFieldUpdateOperationsInput | string | null
    packageWeight?: NullableStringFieldUpdateOperationsInput | string | null
    selectedExtras?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    estimatedPrice?: FloatFieldUpdateOperationsInput | number
    vehicleCount?: NullableIntFieldUpdateOperationsInput | number | null
    awbNumber?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: NullableStringFieldUpdateOperationsInput | string | null
    stripePaymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    internalNotes?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookCreateInput = {
    id?: string
    url: string
    secret: string
    events?: WebhookCreateeventsInput | string[]
    enabled?: boolean
    createdAt?: Date | string
    company: CompanyCreateNestedOneWithoutWebhooksInput
  }

  export type WebhookUncheckedCreateInput = {
    id?: string
    companyId: string
    url: string
    secret: string
    events?: WebhookCreateeventsInput | string[]
    enabled?: boolean
    createdAt?: Date | string
  }

  export type WebhookUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    secret?: StringFieldUpdateOperationsInput | string
    events?: WebhookUpdateeventsInput | string[]
    enabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutWebhooksNestedInput
  }

  export type WebhookUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    secret?: StringFieldUpdateOperationsInput | string
    events?: WebhookUpdateeventsInput | string[]
    enabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookCreateManyInput = {
    id?: string
    companyId: string
    url: string
    secret: string
    events?: WebhookCreateeventsInput | string[]
    enabled?: boolean
    createdAt?: Date | string
  }

  export type WebhookUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    secret?: StringFieldUpdateOperationsInput | string
    events?: WebhookUpdateeventsInput | string[]
    enabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    secret?: StringFieldUpdateOperationsInput | string
    events?: WebhookUpdateeventsInput | string[]
    enabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShopifyInstallCreateInput = {
    id?: string
    shop: string
    accessToken: string
    scriptTagId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    company?: CompanyCreateNestedOneWithoutShopifyInstallsInput
  }

  export type ShopifyInstallUncheckedCreateInput = {
    id?: string
    shop: string
    accessToken: string
    companyId?: string | null
    scriptTagId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShopifyInstallUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    scriptTagId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneWithoutShopifyInstallsNestedInput
  }

  export type ShopifyInstallUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    scriptTagId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShopifyInstallCreateManyInput = {
    id?: string
    shop: string
    accessToken: string
    companyId?: string | null
    scriptTagId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShopifyInstallUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    scriptTagId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShopifyInstallUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    scriptTagId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartnerInquiryCreateInput = {
    id?: string
    companyName: string
    website?: string | null
    contactName: string
    email: string
    partnershipType: string
    message: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PartnerInquiryUncheckedCreateInput = {
    id?: string
    companyName: string
    website?: string | null
    contactName: string
    email: string
    partnershipType: string
    message: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PartnerInquiryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    contactName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    partnershipType?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartnerInquiryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    contactName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    partnershipType?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartnerInquiryCreateManyInput = {
    id?: string
    companyName: string
    website?: string | null
    contactName: string
    email: string
    partnershipType: string
    message: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PartnerInquiryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    contactName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    partnershipType?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartnerInquiryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    contactName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    partnershipType?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StopNoteCreateInput = {
    id?: string
    companyName: string
    address: string
    contactName?: string | null
    contactPhone?: string | null
    gateCode?: string | null
    dockInfo?: string | null
    hours?: string | null
    parkingNotes?: string | null
    accessNotes?: string | null
    deliveryNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutStopNotesInput
    readinessChecks?: ReadinessCheckCreateNestedManyWithoutStopNoteInput
    exceptionLogs?: ExceptionLogCreateNestedManyWithoutStopNoteInput
    jobStops?: JobStopCreateNestedManyWithoutStopNoteInput
  }

  export type StopNoteUncheckedCreateInput = {
    id?: string
    companyId: string
    companyName: string
    address: string
    contactName?: string | null
    contactPhone?: string | null
    gateCode?: string | null
    dockInfo?: string | null
    hours?: string | null
    parkingNotes?: string | null
    accessNotes?: string | null
    deliveryNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    readinessChecks?: ReadinessCheckUncheckedCreateNestedManyWithoutStopNoteInput
    exceptionLogs?: ExceptionLogUncheckedCreateNestedManyWithoutStopNoteInput
    jobStops?: JobStopUncheckedCreateNestedManyWithoutStopNoteInput
  }

  export type StopNoteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    gateCode?: NullableStringFieldUpdateOperationsInput | string | null
    dockInfo?: NullableStringFieldUpdateOperationsInput | string | null
    hours?: NullableStringFieldUpdateOperationsInput | string | null
    parkingNotes?: NullableStringFieldUpdateOperationsInput | string | null
    accessNotes?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutStopNotesNestedInput
    readinessChecks?: ReadinessCheckUpdateManyWithoutStopNoteNestedInput
    exceptionLogs?: ExceptionLogUpdateManyWithoutStopNoteNestedInput
    jobStops?: JobStopUpdateManyWithoutStopNoteNestedInput
  }

  export type StopNoteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    gateCode?: NullableStringFieldUpdateOperationsInput | string | null
    dockInfo?: NullableStringFieldUpdateOperationsInput | string | null
    hours?: NullableStringFieldUpdateOperationsInput | string | null
    parkingNotes?: NullableStringFieldUpdateOperationsInput | string | null
    accessNotes?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    readinessChecks?: ReadinessCheckUncheckedUpdateManyWithoutStopNoteNestedInput
    exceptionLogs?: ExceptionLogUncheckedUpdateManyWithoutStopNoteNestedInput
    jobStops?: JobStopUncheckedUpdateManyWithoutStopNoteNestedInput
  }

  export type StopNoteCreateManyInput = {
    id?: string
    companyId: string
    companyName: string
    address: string
    contactName?: string | null
    contactPhone?: string | null
    gateCode?: string | null
    dockInfo?: string | null
    hours?: string | null
    parkingNotes?: string | null
    accessNotes?: string | null
    deliveryNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StopNoteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    gateCode?: NullableStringFieldUpdateOperationsInput | string | null
    dockInfo?: NullableStringFieldUpdateOperationsInput | string | null
    hours?: NullableStringFieldUpdateOperationsInput | string | null
    parkingNotes?: NullableStringFieldUpdateOperationsInput | string | null
    accessNotes?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StopNoteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    gateCode?: NullableStringFieldUpdateOperationsInput | string | null
    dockInfo?: NullableStringFieldUpdateOperationsInput | string | null
    hours?: NullableStringFieldUpdateOperationsInput | string | null
    parkingNotes?: NullableStringFieldUpdateOperationsInput | string | null
    accessNotes?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReadinessCheckCreateInput = {
    id?: string
    scheduledDate: Date | string
    contactConfirmed?: boolean
    addressConfirmed?: boolean
    accessConfirmed?: boolean
    siteReady?: boolean
    notes?: string | null
    status?: string
    createdAt?: Date | string
    stopNote: StopNoteCreateNestedOneWithoutReadinessChecksInput
    job?: JobCreateNestedOneWithoutReadinessChecksInput
  }

  export type ReadinessCheckUncheckedCreateInput = {
    id?: string
    stopNoteId: string
    scheduledDate: Date | string
    contactConfirmed?: boolean
    addressConfirmed?: boolean
    accessConfirmed?: boolean
    siteReady?: boolean
    notes?: string | null
    status?: string
    createdAt?: Date | string
    jobId?: string | null
  }

  export type ReadinessCheckUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
    contactConfirmed?: BoolFieldUpdateOperationsInput | boolean
    addressConfirmed?: BoolFieldUpdateOperationsInput | boolean
    accessConfirmed?: BoolFieldUpdateOperationsInput | boolean
    siteReady?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stopNote?: StopNoteUpdateOneRequiredWithoutReadinessChecksNestedInput
    job?: JobUpdateOneWithoutReadinessChecksNestedInput
  }

  export type ReadinessCheckUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    stopNoteId?: StringFieldUpdateOperationsInput | string
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
    contactConfirmed?: BoolFieldUpdateOperationsInput | boolean
    addressConfirmed?: BoolFieldUpdateOperationsInput | boolean
    accessConfirmed?: BoolFieldUpdateOperationsInput | boolean
    siteReady?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReadinessCheckCreateManyInput = {
    id?: string
    stopNoteId: string
    scheduledDate: Date | string
    contactConfirmed?: boolean
    addressConfirmed?: boolean
    accessConfirmed?: boolean
    siteReady?: boolean
    notes?: string | null
    status?: string
    createdAt?: Date | string
    jobId?: string | null
  }

  export type ReadinessCheckUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
    contactConfirmed?: BoolFieldUpdateOperationsInput | boolean
    addressConfirmed?: BoolFieldUpdateOperationsInput | boolean
    accessConfirmed?: BoolFieldUpdateOperationsInput | boolean
    siteReady?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReadinessCheckUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    stopNoteId?: StringFieldUpdateOperationsInput | string
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
    contactConfirmed?: BoolFieldUpdateOperationsInput | boolean
    addressConfirmed?: BoolFieldUpdateOperationsInput | boolean
    accessConfirmed?: BoolFieldUpdateOperationsInput | boolean
    siteReady?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ExceptionLogCreateInput = {
    id?: string
    type: string
    notes?: string | null
    timestamp?: Date | string
    stopNote?: StopNoteCreateNestedOneWithoutExceptionLogsInput
    job?: JobCreateNestedOneWithoutExceptionLogsInput
  }

  export type ExceptionLogUncheckedCreateInput = {
    id?: string
    stopNoteId?: string | null
    type: string
    notes?: string | null
    timestamp?: Date | string
    jobId?: string | null
  }

  export type ExceptionLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    stopNote?: StopNoteUpdateOneWithoutExceptionLogsNestedInput
    job?: JobUpdateOneWithoutExceptionLogsNestedInput
  }

  export type ExceptionLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    stopNoteId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    jobId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ExceptionLogCreateManyInput = {
    id?: string
    stopNoteId?: string | null
    type: string
    notes?: string | null
    timestamp?: Date | string
    jobId?: string | null
  }

  export type ExceptionLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExceptionLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    stopNoteId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    jobId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type JobCreateInput = {
    id?: string
    status?: string
    scheduledDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutJobsInput
    quoteRequest?: QuoteRequestCreateNestedOneWithoutJobsInput
    stops?: JobStopCreateNestedManyWithoutJobInput
    readinessChecks?: ReadinessCheckCreateNestedManyWithoutJobInput
    exceptionLogs?: ExceptionLogCreateNestedManyWithoutJobInput
  }

  export type JobUncheckedCreateInput = {
    id?: string
    companyId: string
    quoteRequestId?: string | null
    status?: string
    scheduledDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    stops?: JobStopUncheckedCreateNestedManyWithoutJobInput
    readinessChecks?: ReadinessCheckUncheckedCreateNestedManyWithoutJobInput
    exceptionLogs?: ExceptionLogUncheckedCreateNestedManyWithoutJobInput
  }

  export type JobUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutJobsNestedInput
    quoteRequest?: QuoteRequestUpdateOneWithoutJobsNestedInput
    stops?: JobStopUpdateManyWithoutJobNestedInput
    readinessChecks?: ReadinessCheckUpdateManyWithoutJobNestedInput
    exceptionLogs?: ExceptionLogUpdateManyWithoutJobNestedInput
  }

  export type JobUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    quoteRequestId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stops?: JobStopUncheckedUpdateManyWithoutJobNestedInput
    readinessChecks?: ReadinessCheckUncheckedUpdateManyWithoutJobNestedInput
    exceptionLogs?: ExceptionLogUncheckedUpdateManyWithoutJobNestedInput
  }

  export type JobCreateManyInput = {
    id?: string
    companyId: string
    quoteRequestId?: string | null
    status?: string
    scheduledDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    quoteRequestId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobStopCreateInput = {
    id?: string
    order?: number
    job: JobCreateNestedOneWithoutStopsInput
    stopNote: StopNoteCreateNestedOneWithoutJobStopsInput
  }

  export type JobStopUncheckedCreateInput = {
    id?: string
    jobId: string
    stopNoteId: string
    order?: number
  }

  export type JobStopUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    job?: JobUpdateOneRequiredWithoutStopsNestedInput
    stopNote?: StopNoteUpdateOneRequiredWithoutJobStopsNestedInput
  }

  export type JobStopUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    stopNoteId?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
  }

  export type JobStopCreateManyInput = {
    id?: string
    jobId: string
    stopNoteId: string
    order?: number
  }

  export type JobStopUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
  }

  export type JobStopUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    stopNoteId?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PricingProfileListRelationFilter = {
    every?: PricingProfileWhereInput
    some?: PricingProfileWhereInput
    none?: PricingProfileWhereInput
  }

  export type QuoteRequestListRelationFilter = {
    every?: QuoteRequestWhereInput
    some?: QuoteRequestWhereInput
    none?: QuoteRequestWhereInput
  }

  export type WidgetSettingsListRelationFilter = {
    every?: WidgetSettingsWhereInput
    some?: WidgetSettingsWhereInput
    none?: WidgetSettingsWhereInput
  }

  export type WebhookListRelationFilter = {
    every?: WebhookWhereInput
    some?: WebhookWhereInput
    none?: WebhookWhereInput
  }

  export type ShopifyInstallListRelationFilter = {
    every?: ShopifyInstallWhereInput
    some?: ShopifyInstallWhereInput
    none?: ShopifyInstallWhereInput
  }

  export type StopNoteListRelationFilter = {
    every?: StopNoteWhereInput
    some?: StopNoteWhereInput
    none?: StopNoteWhereInput
  }

  export type JobListRelationFilter = {
    every?: JobWhereInput
    some?: JobWhereInput
    none?: JobWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PricingProfileOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type QuoteRequestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WidgetSettingsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WebhookOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ShopifyInstallOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StopNoteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type JobOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CompanyCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    logoUrl?: SortOrder
    profilePicUrl?: SortOrder
    phone?: SortOrder
    website?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    zip?: SortOrder
    contactName?: SortOrder
    timezone?: SortOrder
    subscriptionPlan?: SortOrder
    stripeCustomerId?: SortOrder
    stripeSubscriptionId?: SortOrder
    stripeConnectAccountId?: SortOrder
    trialEndsAt?: SortOrder
    emailVerified?: SortOrder
    emailVerificationToken?: SortOrder
    customEmailDomain?: SortOrder
    customEmailFromName?: SortOrder
    resendDomainId?: SortOrder
    emailDomainVerified?: SortOrder
    emailDomainDnsRecords?: SortOrder
    isAdmin?: SortOrder
    lastLoginAt?: SortOrder
    createdAt?: SortOrder
  }

  export type CompanyMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    logoUrl?: SortOrder
    profilePicUrl?: SortOrder
    phone?: SortOrder
    website?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    zip?: SortOrder
    contactName?: SortOrder
    timezone?: SortOrder
    subscriptionPlan?: SortOrder
    stripeCustomerId?: SortOrder
    stripeSubscriptionId?: SortOrder
    stripeConnectAccountId?: SortOrder
    trialEndsAt?: SortOrder
    emailVerified?: SortOrder
    emailVerificationToken?: SortOrder
    customEmailDomain?: SortOrder
    customEmailFromName?: SortOrder
    resendDomainId?: SortOrder
    emailDomainVerified?: SortOrder
    isAdmin?: SortOrder
    lastLoginAt?: SortOrder
    createdAt?: SortOrder
  }

  export type CompanyMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    logoUrl?: SortOrder
    profilePicUrl?: SortOrder
    phone?: SortOrder
    website?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    zip?: SortOrder
    contactName?: SortOrder
    timezone?: SortOrder
    subscriptionPlan?: SortOrder
    stripeCustomerId?: SortOrder
    stripeSubscriptionId?: SortOrder
    stripeConnectAccountId?: SortOrder
    trialEndsAt?: SortOrder
    emailVerified?: SortOrder
    emailVerificationToken?: SortOrder
    customEmailDomain?: SortOrder
    customEmailFromName?: SortOrder
    resendDomainId?: SortOrder
    emailDomainVerified?: SortOrder
    isAdmin?: SortOrder
    lastLoginAt?: SortOrder
    createdAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type CompanyScalarRelationFilter = {
    is?: CompanyWhereInput
    isNot?: CompanyWhereInput
  }

  export type WidgetSettingsNullableScalarRelationFilter = {
    is?: WidgetSettingsWhereInput | null
    isNot?: WidgetSettingsWhereInput | null
  }

  export type PricingProfileCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    widgetSettingsId?: SortOrder
    baseRatePerMile?: SortOrder
    minimumCharge?: SortOrder
    useMinimumCharge?: SortOrder
    minMilesThreshold?: SortOrder
    weightFee?: SortOrder
    itemCountFee?: SortOrder
    stairsFee?: SortOrder
    insideDeliveryFee?: SortOrder
    addon3Fee?: SortOrder
    afterHoursFee?: SortOrder
    businessHoursStart?: SortOrder
    businessHoursEnd?: SortOrder
    businessDays?: SortOrder
    largeItemFee?: SortOrder
    largeItemsEnabled?: SortOrder
    largeItemCategories?: SortOrder
  }

  export type PricingProfileAvgOrderByAggregateInput = {
    baseRatePerMile?: SortOrder
    minimumCharge?: SortOrder
    minMilesThreshold?: SortOrder
    weightFee?: SortOrder
    itemCountFee?: SortOrder
    stairsFee?: SortOrder
    insideDeliveryFee?: SortOrder
    addon3Fee?: SortOrder
    afterHoursFee?: SortOrder
    largeItemFee?: SortOrder
  }

  export type PricingProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    widgetSettingsId?: SortOrder
    baseRatePerMile?: SortOrder
    minimumCharge?: SortOrder
    useMinimumCharge?: SortOrder
    minMilesThreshold?: SortOrder
    weightFee?: SortOrder
    itemCountFee?: SortOrder
    stairsFee?: SortOrder
    insideDeliveryFee?: SortOrder
    addon3Fee?: SortOrder
    afterHoursFee?: SortOrder
    businessHoursStart?: SortOrder
    businessHoursEnd?: SortOrder
    businessDays?: SortOrder
    largeItemFee?: SortOrder
    largeItemsEnabled?: SortOrder
  }

  export type PricingProfileMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    widgetSettingsId?: SortOrder
    baseRatePerMile?: SortOrder
    minimumCharge?: SortOrder
    useMinimumCharge?: SortOrder
    minMilesThreshold?: SortOrder
    weightFee?: SortOrder
    itemCountFee?: SortOrder
    stairsFee?: SortOrder
    insideDeliveryFee?: SortOrder
    addon3Fee?: SortOrder
    afterHoursFee?: SortOrder
    businessHoursStart?: SortOrder
    businessHoursEnd?: SortOrder
    businessDays?: SortOrder
    largeItemFee?: SortOrder
    largeItemsEnabled?: SortOrder
  }

  export type PricingProfileSumOrderByAggregateInput = {
    baseRatePerMile?: SortOrder
    minimumCharge?: SortOrder
    minMilesThreshold?: SortOrder
    weightFee?: SortOrder
    itemCountFee?: SortOrder
    stairsFee?: SortOrder
    insideDeliveryFee?: SortOrder
    addon3Fee?: SortOrder
    afterHoursFee?: SortOrder
    largeItemFee?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type PricingProfileNullableScalarRelationFilter = {
    is?: PricingProfileWhereInput | null
    isNot?: PricingProfileWhereInput | null
  }

  export type WidgetSettingsCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    logoUrl?: SortOrder
    showWeight?: SortOrder
    showItemCount?: SortOrder
    showExtras?: SortOrder
    insideDeliveryLabel?: SortOrder
    addon3Label?: SortOrder
    primaryColor?: SortOrder
    buttonText?: SortOrder
    headerText?: SortOrder
    disclaimerText?: SortOrder
    companyNameText?: SortOrder
    companyNameFont?: SortOrder
    backgroundImageUrl?: SortOrder
    mapLayout?: SortOrder
    websiteUrl?: SortOrder
    paymentsEnabled?: SortOrder
    showVehicles?: SortOrder
    pricePerVehicle?: SortOrder
    showAwb?: SortOrder
    geoFencingEnabled?: SortOrder
    serviceZips?: SortOrder
  }

  export type WidgetSettingsAvgOrderByAggregateInput = {
    pricePerVehicle?: SortOrder
  }

  export type WidgetSettingsMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    logoUrl?: SortOrder
    showWeight?: SortOrder
    showItemCount?: SortOrder
    showExtras?: SortOrder
    insideDeliveryLabel?: SortOrder
    addon3Label?: SortOrder
    primaryColor?: SortOrder
    buttonText?: SortOrder
    headerText?: SortOrder
    disclaimerText?: SortOrder
    companyNameText?: SortOrder
    companyNameFont?: SortOrder
    backgroundImageUrl?: SortOrder
    mapLayout?: SortOrder
    websiteUrl?: SortOrder
    paymentsEnabled?: SortOrder
    showVehicles?: SortOrder
    pricePerVehicle?: SortOrder
    showAwb?: SortOrder
    geoFencingEnabled?: SortOrder
  }

  export type WidgetSettingsMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    logoUrl?: SortOrder
    showWeight?: SortOrder
    showItemCount?: SortOrder
    showExtras?: SortOrder
    insideDeliveryLabel?: SortOrder
    addon3Label?: SortOrder
    primaryColor?: SortOrder
    buttonText?: SortOrder
    headerText?: SortOrder
    disclaimerText?: SortOrder
    companyNameText?: SortOrder
    companyNameFont?: SortOrder
    backgroundImageUrl?: SortOrder
    mapLayout?: SortOrder
    websiteUrl?: SortOrder
    paymentsEnabled?: SortOrder
    showVehicles?: SortOrder
    pricePerVehicle?: SortOrder
    showAwb?: SortOrder
    geoFencingEnabled?: SortOrder
  }

  export type WidgetSettingsSumOrderByAggregateInput = {
    pricePerVehicle?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type QuoteRequestCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    customerPhone?: SortOrder
    pickupZip?: SortOrder
    dropoffZip?: SortOrder
    distanceMiles?: SortOrder
    serviceType?: SortOrder
    packageSize?: SortOrder
    packageWeight?: SortOrder
    selectedExtras?: SortOrder
    status?: SortOrder
    estimatedPrice?: SortOrder
    vehicleCount?: SortOrder
    awbNumber?: SortOrder
    paymentStatus?: SortOrder
    stripePaymentIntentId?: SortOrder
    internalNotes?: SortOrder
    paidAt?: SortOrder
    createdAt?: SortOrder
  }

  export type QuoteRequestAvgOrderByAggregateInput = {
    distanceMiles?: SortOrder
    estimatedPrice?: SortOrder
    vehicleCount?: SortOrder
  }

  export type QuoteRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    customerPhone?: SortOrder
    pickupZip?: SortOrder
    dropoffZip?: SortOrder
    distanceMiles?: SortOrder
    serviceType?: SortOrder
    packageSize?: SortOrder
    packageWeight?: SortOrder
    selectedExtras?: SortOrder
    status?: SortOrder
    estimatedPrice?: SortOrder
    vehicleCount?: SortOrder
    awbNumber?: SortOrder
    paymentStatus?: SortOrder
    stripePaymentIntentId?: SortOrder
    internalNotes?: SortOrder
    paidAt?: SortOrder
    createdAt?: SortOrder
  }

  export type QuoteRequestMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    customerPhone?: SortOrder
    pickupZip?: SortOrder
    dropoffZip?: SortOrder
    distanceMiles?: SortOrder
    serviceType?: SortOrder
    packageSize?: SortOrder
    packageWeight?: SortOrder
    selectedExtras?: SortOrder
    status?: SortOrder
    estimatedPrice?: SortOrder
    vehicleCount?: SortOrder
    awbNumber?: SortOrder
    paymentStatus?: SortOrder
    stripePaymentIntentId?: SortOrder
    internalNotes?: SortOrder
    paidAt?: SortOrder
    createdAt?: SortOrder
  }

  export type QuoteRequestSumOrderByAggregateInput = {
    distanceMiles?: SortOrder
    estimatedPrice?: SortOrder
    vehicleCount?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type WebhookCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    url?: SortOrder
    secret?: SortOrder
    events?: SortOrder
    enabled?: SortOrder
    createdAt?: SortOrder
  }

  export type WebhookMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    url?: SortOrder
    secret?: SortOrder
    enabled?: SortOrder
    createdAt?: SortOrder
  }

  export type WebhookMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    url?: SortOrder
    secret?: SortOrder
    enabled?: SortOrder
    createdAt?: SortOrder
  }

  export type CompanyNullableScalarRelationFilter = {
    is?: CompanyWhereInput | null
    isNot?: CompanyWhereInput | null
  }

  export type ShopifyInstallCountOrderByAggregateInput = {
    id?: SortOrder
    shop?: SortOrder
    accessToken?: SortOrder
    companyId?: SortOrder
    scriptTagId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ShopifyInstallMaxOrderByAggregateInput = {
    id?: SortOrder
    shop?: SortOrder
    accessToken?: SortOrder
    companyId?: SortOrder
    scriptTagId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ShopifyInstallMinOrderByAggregateInput = {
    id?: SortOrder
    shop?: SortOrder
    accessToken?: SortOrder
    companyId?: SortOrder
    scriptTagId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PartnerInquiryCountOrderByAggregateInput = {
    id?: SortOrder
    companyName?: SortOrder
    website?: SortOrder
    contactName?: SortOrder
    email?: SortOrder
    partnershipType?: SortOrder
    message?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PartnerInquiryMaxOrderByAggregateInput = {
    id?: SortOrder
    companyName?: SortOrder
    website?: SortOrder
    contactName?: SortOrder
    email?: SortOrder
    partnershipType?: SortOrder
    message?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PartnerInquiryMinOrderByAggregateInput = {
    id?: SortOrder
    companyName?: SortOrder
    website?: SortOrder
    contactName?: SortOrder
    email?: SortOrder
    partnershipType?: SortOrder
    message?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReadinessCheckListRelationFilter = {
    every?: ReadinessCheckWhereInput
    some?: ReadinessCheckWhereInput
    none?: ReadinessCheckWhereInput
  }

  export type ExceptionLogListRelationFilter = {
    every?: ExceptionLogWhereInput
    some?: ExceptionLogWhereInput
    none?: ExceptionLogWhereInput
  }

  export type JobStopListRelationFilter = {
    every?: JobStopWhereInput
    some?: JobStopWhereInput
    none?: JobStopWhereInput
  }

  export type ReadinessCheckOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExceptionLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type JobStopOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StopNoteCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    companyName?: SortOrder
    address?: SortOrder
    contactName?: SortOrder
    contactPhone?: SortOrder
    gateCode?: SortOrder
    dockInfo?: SortOrder
    hours?: SortOrder
    parkingNotes?: SortOrder
    accessNotes?: SortOrder
    deliveryNotes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StopNoteMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    companyName?: SortOrder
    address?: SortOrder
    contactName?: SortOrder
    contactPhone?: SortOrder
    gateCode?: SortOrder
    dockInfo?: SortOrder
    hours?: SortOrder
    parkingNotes?: SortOrder
    accessNotes?: SortOrder
    deliveryNotes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StopNoteMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    companyName?: SortOrder
    address?: SortOrder
    contactName?: SortOrder
    contactPhone?: SortOrder
    gateCode?: SortOrder
    dockInfo?: SortOrder
    hours?: SortOrder
    parkingNotes?: SortOrder
    accessNotes?: SortOrder
    deliveryNotes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StopNoteScalarRelationFilter = {
    is?: StopNoteWhereInput
    isNot?: StopNoteWhereInput
  }

  export type JobNullableScalarRelationFilter = {
    is?: JobWhereInput | null
    isNot?: JobWhereInput | null
  }

  export type ReadinessCheckCountOrderByAggregateInput = {
    id?: SortOrder
    stopNoteId?: SortOrder
    scheduledDate?: SortOrder
    contactConfirmed?: SortOrder
    addressConfirmed?: SortOrder
    accessConfirmed?: SortOrder
    siteReady?: SortOrder
    notes?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    jobId?: SortOrder
  }

  export type ReadinessCheckMaxOrderByAggregateInput = {
    id?: SortOrder
    stopNoteId?: SortOrder
    scheduledDate?: SortOrder
    contactConfirmed?: SortOrder
    addressConfirmed?: SortOrder
    accessConfirmed?: SortOrder
    siteReady?: SortOrder
    notes?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    jobId?: SortOrder
  }

  export type ReadinessCheckMinOrderByAggregateInput = {
    id?: SortOrder
    stopNoteId?: SortOrder
    scheduledDate?: SortOrder
    contactConfirmed?: SortOrder
    addressConfirmed?: SortOrder
    accessConfirmed?: SortOrder
    siteReady?: SortOrder
    notes?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    jobId?: SortOrder
  }

  export type StopNoteNullableScalarRelationFilter = {
    is?: StopNoteWhereInput | null
    isNot?: StopNoteWhereInput | null
  }

  export type ExceptionLogCountOrderByAggregateInput = {
    id?: SortOrder
    stopNoteId?: SortOrder
    type?: SortOrder
    notes?: SortOrder
    timestamp?: SortOrder
    jobId?: SortOrder
  }

  export type ExceptionLogMaxOrderByAggregateInput = {
    id?: SortOrder
    stopNoteId?: SortOrder
    type?: SortOrder
    notes?: SortOrder
    timestamp?: SortOrder
    jobId?: SortOrder
  }

  export type ExceptionLogMinOrderByAggregateInput = {
    id?: SortOrder
    stopNoteId?: SortOrder
    type?: SortOrder
    notes?: SortOrder
    timestamp?: SortOrder
    jobId?: SortOrder
  }

  export type QuoteRequestNullableScalarRelationFilter = {
    is?: QuoteRequestWhereInput | null
    isNot?: QuoteRequestWhereInput | null
  }

  export type JobCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    quoteRequestId?: SortOrder
    status?: SortOrder
    scheduledDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    quoteRequestId?: SortOrder
    status?: SortOrder
    scheduledDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    quoteRequestId?: SortOrder
    status?: SortOrder
    scheduledDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type JobScalarRelationFilter = {
    is?: JobWhereInput
    isNot?: JobWhereInput
  }

  export type JobStopCountOrderByAggregateInput = {
    id?: SortOrder
    jobId?: SortOrder
    stopNoteId?: SortOrder
    order?: SortOrder
  }

  export type JobStopAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type JobStopMaxOrderByAggregateInput = {
    id?: SortOrder
    jobId?: SortOrder
    stopNoteId?: SortOrder
    order?: SortOrder
  }

  export type JobStopMinOrderByAggregateInput = {
    id?: SortOrder
    jobId?: SortOrder
    stopNoteId?: SortOrder
    order?: SortOrder
  }

  export type JobStopSumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type PricingProfileCreateNestedManyWithoutCompanyInput = {
    create?: XOR<PricingProfileCreateWithoutCompanyInput, PricingProfileUncheckedCreateWithoutCompanyInput> | PricingProfileCreateWithoutCompanyInput[] | PricingProfileUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: PricingProfileCreateOrConnectWithoutCompanyInput | PricingProfileCreateOrConnectWithoutCompanyInput[]
    createMany?: PricingProfileCreateManyCompanyInputEnvelope
    connect?: PricingProfileWhereUniqueInput | PricingProfileWhereUniqueInput[]
  }

  export type QuoteRequestCreateNestedManyWithoutCompanyInput = {
    create?: XOR<QuoteRequestCreateWithoutCompanyInput, QuoteRequestUncheckedCreateWithoutCompanyInput> | QuoteRequestCreateWithoutCompanyInput[] | QuoteRequestUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: QuoteRequestCreateOrConnectWithoutCompanyInput | QuoteRequestCreateOrConnectWithoutCompanyInput[]
    createMany?: QuoteRequestCreateManyCompanyInputEnvelope
    connect?: QuoteRequestWhereUniqueInput | QuoteRequestWhereUniqueInput[]
  }

  export type WidgetSettingsCreateNestedManyWithoutCompanyInput = {
    create?: XOR<WidgetSettingsCreateWithoutCompanyInput, WidgetSettingsUncheckedCreateWithoutCompanyInput> | WidgetSettingsCreateWithoutCompanyInput[] | WidgetSettingsUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: WidgetSettingsCreateOrConnectWithoutCompanyInput | WidgetSettingsCreateOrConnectWithoutCompanyInput[]
    createMany?: WidgetSettingsCreateManyCompanyInputEnvelope
    connect?: WidgetSettingsWhereUniqueInput | WidgetSettingsWhereUniqueInput[]
  }

  export type WebhookCreateNestedManyWithoutCompanyInput = {
    create?: XOR<WebhookCreateWithoutCompanyInput, WebhookUncheckedCreateWithoutCompanyInput> | WebhookCreateWithoutCompanyInput[] | WebhookUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: WebhookCreateOrConnectWithoutCompanyInput | WebhookCreateOrConnectWithoutCompanyInput[]
    createMany?: WebhookCreateManyCompanyInputEnvelope
    connect?: WebhookWhereUniqueInput | WebhookWhereUniqueInput[]
  }

  export type ShopifyInstallCreateNestedManyWithoutCompanyInput = {
    create?: XOR<ShopifyInstallCreateWithoutCompanyInput, ShopifyInstallUncheckedCreateWithoutCompanyInput> | ShopifyInstallCreateWithoutCompanyInput[] | ShopifyInstallUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: ShopifyInstallCreateOrConnectWithoutCompanyInput | ShopifyInstallCreateOrConnectWithoutCompanyInput[]
    createMany?: ShopifyInstallCreateManyCompanyInputEnvelope
    connect?: ShopifyInstallWhereUniqueInput | ShopifyInstallWhereUniqueInput[]
  }

  export type StopNoteCreateNestedManyWithoutCompanyInput = {
    create?: XOR<StopNoteCreateWithoutCompanyInput, StopNoteUncheckedCreateWithoutCompanyInput> | StopNoteCreateWithoutCompanyInput[] | StopNoteUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: StopNoteCreateOrConnectWithoutCompanyInput | StopNoteCreateOrConnectWithoutCompanyInput[]
    createMany?: StopNoteCreateManyCompanyInputEnvelope
    connect?: StopNoteWhereUniqueInput | StopNoteWhereUniqueInput[]
  }

  export type JobCreateNestedManyWithoutCompanyInput = {
    create?: XOR<JobCreateWithoutCompanyInput, JobUncheckedCreateWithoutCompanyInput> | JobCreateWithoutCompanyInput[] | JobUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: JobCreateOrConnectWithoutCompanyInput | JobCreateOrConnectWithoutCompanyInput[]
    createMany?: JobCreateManyCompanyInputEnvelope
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
  }

  export type PricingProfileUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<PricingProfileCreateWithoutCompanyInput, PricingProfileUncheckedCreateWithoutCompanyInput> | PricingProfileCreateWithoutCompanyInput[] | PricingProfileUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: PricingProfileCreateOrConnectWithoutCompanyInput | PricingProfileCreateOrConnectWithoutCompanyInput[]
    createMany?: PricingProfileCreateManyCompanyInputEnvelope
    connect?: PricingProfileWhereUniqueInput | PricingProfileWhereUniqueInput[]
  }

  export type QuoteRequestUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<QuoteRequestCreateWithoutCompanyInput, QuoteRequestUncheckedCreateWithoutCompanyInput> | QuoteRequestCreateWithoutCompanyInput[] | QuoteRequestUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: QuoteRequestCreateOrConnectWithoutCompanyInput | QuoteRequestCreateOrConnectWithoutCompanyInput[]
    createMany?: QuoteRequestCreateManyCompanyInputEnvelope
    connect?: QuoteRequestWhereUniqueInput | QuoteRequestWhereUniqueInput[]
  }

  export type WidgetSettingsUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<WidgetSettingsCreateWithoutCompanyInput, WidgetSettingsUncheckedCreateWithoutCompanyInput> | WidgetSettingsCreateWithoutCompanyInput[] | WidgetSettingsUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: WidgetSettingsCreateOrConnectWithoutCompanyInput | WidgetSettingsCreateOrConnectWithoutCompanyInput[]
    createMany?: WidgetSettingsCreateManyCompanyInputEnvelope
    connect?: WidgetSettingsWhereUniqueInput | WidgetSettingsWhereUniqueInput[]
  }

  export type WebhookUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<WebhookCreateWithoutCompanyInput, WebhookUncheckedCreateWithoutCompanyInput> | WebhookCreateWithoutCompanyInput[] | WebhookUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: WebhookCreateOrConnectWithoutCompanyInput | WebhookCreateOrConnectWithoutCompanyInput[]
    createMany?: WebhookCreateManyCompanyInputEnvelope
    connect?: WebhookWhereUniqueInput | WebhookWhereUniqueInput[]
  }

  export type ShopifyInstallUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<ShopifyInstallCreateWithoutCompanyInput, ShopifyInstallUncheckedCreateWithoutCompanyInput> | ShopifyInstallCreateWithoutCompanyInput[] | ShopifyInstallUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: ShopifyInstallCreateOrConnectWithoutCompanyInput | ShopifyInstallCreateOrConnectWithoutCompanyInput[]
    createMany?: ShopifyInstallCreateManyCompanyInputEnvelope
    connect?: ShopifyInstallWhereUniqueInput | ShopifyInstallWhereUniqueInput[]
  }

  export type StopNoteUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<StopNoteCreateWithoutCompanyInput, StopNoteUncheckedCreateWithoutCompanyInput> | StopNoteCreateWithoutCompanyInput[] | StopNoteUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: StopNoteCreateOrConnectWithoutCompanyInput | StopNoteCreateOrConnectWithoutCompanyInput[]
    createMany?: StopNoteCreateManyCompanyInputEnvelope
    connect?: StopNoteWhereUniqueInput | StopNoteWhereUniqueInput[]
  }

  export type JobUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<JobCreateWithoutCompanyInput, JobUncheckedCreateWithoutCompanyInput> | JobCreateWithoutCompanyInput[] | JobUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: JobCreateOrConnectWithoutCompanyInput | JobCreateOrConnectWithoutCompanyInput[]
    createMany?: JobCreateManyCompanyInputEnvelope
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PricingProfileUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<PricingProfileCreateWithoutCompanyInput, PricingProfileUncheckedCreateWithoutCompanyInput> | PricingProfileCreateWithoutCompanyInput[] | PricingProfileUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: PricingProfileCreateOrConnectWithoutCompanyInput | PricingProfileCreateOrConnectWithoutCompanyInput[]
    upsert?: PricingProfileUpsertWithWhereUniqueWithoutCompanyInput | PricingProfileUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: PricingProfileCreateManyCompanyInputEnvelope
    set?: PricingProfileWhereUniqueInput | PricingProfileWhereUniqueInput[]
    disconnect?: PricingProfileWhereUniqueInput | PricingProfileWhereUniqueInput[]
    delete?: PricingProfileWhereUniqueInput | PricingProfileWhereUniqueInput[]
    connect?: PricingProfileWhereUniqueInput | PricingProfileWhereUniqueInput[]
    update?: PricingProfileUpdateWithWhereUniqueWithoutCompanyInput | PricingProfileUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: PricingProfileUpdateManyWithWhereWithoutCompanyInput | PricingProfileUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: PricingProfileScalarWhereInput | PricingProfileScalarWhereInput[]
  }

  export type QuoteRequestUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<QuoteRequestCreateWithoutCompanyInput, QuoteRequestUncheckedCreateWithoutCompanyInput> | QuoteRequestCreateWithoutCompanyInput[] | QuoteRequestUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: QuoteRequestCreateOrConnectWithoutCompanyInput | QuoteRequestCreateOrConnectWithoutCompanyInput[]
    upsert?: QuoteRequestUpsertWithWhereUniqueWithoutCompanyInput | QuoteRequestUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: QuoteRequestCreateManyCompanyInputEnvelope
    set?: QuoteRequestWhereUniqueInput | QuoteRequestWhereUniqueInput[]
    disconnect?: QuoteRequestWhereUniqueInput | QuoteRequestWhereUniqueInput[]
    delete?: QuoteRequestWhereUniqueInput | QuoteRequestWhereUniqueInput[]
    connect?: QuoteRequestWhereUniqueInput | QuoteRequestWhereUniqueInput[]
    update?: QuoteRequestUpdateWithWhereUniqueWithoutCompanyInput | QuoteRequestUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: QuoteRequestUpdateManyWithWhereWithoutCompanyInput | QuoteRequestUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: QuoteRequestScalarWhereInput | QuoteRequestScalarWhereInput[]
  }

  export type WidgetSettingsUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<WidgetSettingsCreateWithoutCompanyInput, WidgetSettingsUncheckedCreateWithoutCompanyInput> | WidgetSettingsCreateWithoutCompanyInput[] | WidgetSettingsUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: WidgetSettingsCreateOrConnectWithoutCompanyInput | WidgetSettingsCreateOrConnectWithoutCompanyInput[]
    upsert?: WidgetSettingsUpsertWithWhereUniqueWithoutCompanyInput | WidgetSettingsUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: WidgetSettingsCreateManyCompanyInputEnvelope
    set?: WidgetSettingsWhereUniqueInput | WidgetSettingsWhereUniqueInput[]
    disconnect?: WidgetSettingsWhereUniqueInput | WidgetSettingsWhereUniqueInput[]
    delete?: WidgetSettingsWhereUniqueInput | WidgetSettingsWhereUniqueInput[]
    connect?: WidgetSettingsWhereUniqueInput | WidgetSettingsWhereUniqueInput[]
    update?: WidgetSettingsUpdateWithWhereUniqueWithoutCompanyInput | WidgetSettingsUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: WidgetSettingsUpdateManyWithWhereWithoutCompanyInput | WidgetSettingsUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: WidgetSettingsScalarWhereInput | WidgetSettingsScalarWhereInput[]
  }

  export type WebhookUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<WebhookCreateWithoutCompanyInput, WebhookUncheckedCreateWithoutCompanyInput> | WebhookCreateWithoutCompanyInput[] | WebhookUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: WebhookCreateOrConnectWithoutCompanyInput | WebhookCreateOrConnectWithoutCompanyInput[]
    upsert?: WebhookUpsertWithWhereUniqueWithoutCompanyInput | WebhookUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: WebhookCreateManyCompanyInputEnvelope
    set?: WebhookWhereUniqueInput | WebhookWhereUniqueInput[]
    disconnect?: WebhookWhereUniqueInput | WebhookWhereUniqueInput[]
    delete?: WebhookWhereUniqueInput | WebhookWhereUniqueInput[]
    connect?: WebhookWhereUniqueInput | WebhookWhereUniqueInput[]
    update?: WebhookUpdateWithWhereUniqueWithoutCompanyInput | WebhookUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: WebhookUpdateManyWithWhereWithoutCompanyInput | WebhookUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: WebhookScalarWhereInput | WebhookScalarWhereInput[]
  }

  export type ShopifyInstallUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<ShopifyInstallCreateWithoutCompanyInput, ShopifyInstallUncheckedCreateWithoutCompanyInput> | ShopifyInstallCreateWithoutCompanyInput[] | ShopifyInstallUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: ShopifyInstallCreateOrConnectWithoutCompanyInput | ShopifyInstallCreateOrConnectWithoutCompanyInput[]
    upsert?: ShopifyInstallUpsertWithWhereUniqueWithoutCompanyInput | ShopifyInstallUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: ShopifyInstallCreateManyCompanyInputEnvelope
    set?: ShopifyInstallWhereUniqueInput | ShopifyInstallWhereUniqueInput[]
    disconnect?: ShopifyInstallWhereUniqueInput | ShopifyInstallWhereUniqueInput[]
    delete?: ShopifyInstallWhereUniqueInput | ShopifyInstallWhereUniqueInput[]
    connect?: ShopifyInstallWhereUniqueInput | ShopifyInstallWhereUniqueInput[]
    update?: ShopifyInstallUpdateWithWhereUniqueWithoutCompanyInput | ShopifyInstallUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: ShopifyInstallUpdateManyWithWhereWithoutCompanyInput | ShopifyInstallUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: ShopifyInstallScalarWhereInput | ShopifyInstallScalarWhereInput[]
  }

  export type StopNoteUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<StopNoteCreateWithoutCompanyInput, StopNoteUncheckedCreateWithoutCompanyInput> | StopNoteCreateWithoutCompanyInput[] | StopNoteUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: StopNoteCreateOrConnectWithoutCompanyInput | StopNoteCreateOrConnectWithoutCompanyInput[]
    upsert?: StopNoteUpsertWithWhereUniqueWithoutCompanyInput | StopNoteUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: StopNoteCreateManyCompanyInputEnvelope
    set?: StopNoteWhereUniqueInput | StopNoteWhereUniqueInput[]
    disconnect?: StopNoteWhereUniqueInput | StopNoteWhereUniqueInput[]
    delete?: StopNoteWhereUniqueInput | StopNoteWhereUniqueInput[]
    connect?: StopNoteWhereUniqueInput | StopNoteWhereUniqueInput[]
    update?: StopNoteUpdateWithWhereUniqueWithoutCompanyInput | StopNoteUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: StopNoteUpdateManyWithWhereWithoutCompanyInput | StopNoteUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: StopNoteScalarWhereInput | StopNoteScalarWhereInput[]
  }

  export type JobUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<JobCreateWithoutCompanyInput, JobUncheckedCreateWithoutCompanyInput> | JobCreateWithoutCompanyInput[] | JobUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: JobCreateOrConnectWithoutCompanyInput | JobCreateOrConnectWithoutCompanyInput[]
    upsert?: JobUpsertWithWhereUniqueWithoutCompanyInput | JobUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: JobCreateManyCompanyInputEnvelope
    set?: JobWhereUniqueInput | JobWhereUniqueInput[]
    disconnect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    delete?: JobWhereUniqueInput | JobWhereUniqueInput[]
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    update?: JobUpdateWithWhereUniqueWithoutCompanyInput | JobUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: JobUpdateManyWithWhereWithoutCompanyInput | JobUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: JobScalarWhereInput | JobScalarWhereInput[]
  }

  export type PricingProfileUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<PricingProfileCreateWithoutCompanyInput, PricingProfileUncheckedCreateWithoutCompanyInput> | PricingProfileCreateWithoutCompanyInput[] | PricingProfileUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: PricingProfileCreateOrConnectWithoutCompanyInput | PricingProfileCreateOrConnectWithoutCompanyInput[]
    upsert?: PricingProfileUpsertWithWhereUniqueWithoutCompanyInput | PricingProfileUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: PricingProfileCreateManyCompanyInputEnvelope
    set?: PricingProfileWhereUniqueInput | PricingProfileWhereUniqueInput[]
    disconnect?: PricingProfileWhereUniqueInput | PricingProfileWhereUniqueInput[]
    delete?: PricingProfileWhereUniqueInput | PricingProfileWhereUniqueInput[]
    connect?: PricingProfileWhereUniqueInput | PricingProfileWhereUniqueInput[]
    update?: PricingProfileUpdateWithWhereUniqueWithoutCompanyInput | PricingProfileUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: PricingProfileUpdateManyWithWhereWithoutCompanyInput | PricingProfileUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: PricingProfileScalarWhereInput | PricingProfileScalarWhereInput[]
  }

  export type QuoteRequestUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<QuoteRequestCreateWithoutCompanyInput, QuoteRequestUncheckedCreateWithoutCompanyInput> | QuoteRequestCreateWithoutCompanyInput[] | QuoteRequestUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: QuoteRequestCreateOrConnectWithoutCompanyInput | QuoteRequestCreateOrConnectWithoutCompanyInput[]
    upsert?: QuoteRequestUpsertWithWhereUniqueWithoutCompanyInput | QuoteRequestUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: QuoteRequestCreateManyCompanyInputEnvelope
    set?: QuoteRequestWhereUniqueInput | QuoteRequestWhereUniqueInput[]
    disconnect?: QuoteRequestWhereUniqueInput | QuoteRequestWhereUniqueInput[]
    delete?: QuoteRequestWhereUniqueInput | QuoteRequestWhereUniqueInput[]
    connect?: QuoteRequestWhereUniqueInput | QuoteRequestWhereUniqueInput[]
    update?: QuoteRequestUpdateWithWhereUniqueWithoutCompanyInput | QuoteRequestUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: QuoteRequestUpdateManyWithWhereWithoutCompanyInput | QuoteRequestUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: QuoteRequestScalarWhereInput | QuoteRequestScalarWhereInput[]
  }

  export type WidgetSettingsUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<WidgetSettingsCreateWithoutCompanyInput, WidgetSettingsUncheckedCreateWithoutCompanyInput> | WidgetSettingsCreateWithoutCompanyInput[] | WidgetSettingsUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: WidgetSettingsCreateOrConnectWithoutCompanyInput | WidgetSettingsCreateOrConnectWithoutCompanyInput[]
    upsert?: WidgetSettingsUpsertWithWhereUniqueWithoutCompanyInput | WidgetSettingsUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: WidgetSettingsCreateManyCompanyInputEnvelope
    set?: WidgetSettingsWhereUniqueInput | WidgetSettingsWhereUniqueInput[]
    disconnect?: WidgetSettingsWhereUniqueInput | WidgetSettingsWhereUniqueInput[]
    delete?: WidgetSettingsWhereUniqueInput | WidgetSettingsWhereUniqueInput[]
    connect?: WidgetSettingsWhereUniqueInput | WidgetSettingsWhereUniqueInput[]
    update?: WidgetSettingsUpdateWithWhereUniqueWithoutCompanyInput | WidgetSettingsUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: WidgetSettingsUpdateManyWithWhereWithoutCompanyInput | WidgetSettingsUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: WidgetSettingsScalarWhereInput | WidgetSettingsScalarWhereInput[]
  }

  export type WebhookUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<WebhookCreateWithoutCompanyInput, WebhookUncheckedCreateWithoutCompanyInput> | WebhookCreateWithoutCompanyInput[] | WebhookUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: WebhookCreateOrConnectWithoutCompanyInput | WebhookCreateOrConnectWithoutCompanyInput[]
    upsert?: WebhookUpsertWithWhereUniqueWithoutCompanyInput | WebhookUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: WebhookCreateManyCompanyInputEnvelope
    set?: WebhookWhereUniqueInput | WebhookWhereUniqueInput[]
    disconnect?: WebhookWhereUniqueInput | WebhookWhereUniqueInput[]
    delete?: WebhookWhereUniqueInput | WebhookWhereUniqueInput[]
    connect?: WebhookWhereUniqueInput | WebhookWhereUniqueInput[]
    update?: WebhookUpdateWithWhereUniqueWithoutCompanyInput | WebhookUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: WebhookUpdateManyWithWhereWithoutCompanyInput | WebhookUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: WebhookScalarWhereInput | WebhookScalarWhereInput[]
  }

  export type ShopifyInstallUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<ShopifyInstallCreateWithoutCompanyInput, ShopifyInstallUncheckedCreateWithoutCompanyInput> | ShopifyInstallCreateWithoutCompanyInput[] | ShopifyInstallUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: ShopifyInstallCreateOrConnectWithoutCompanyInput | ShopifyInstallCreateOrConnectWithoutCompanyInput[]
    upsert?: ShopifyInstallUpsertWithWhereUniqueWithoutCompanyInput | ShopifyInstallUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: ShopifyInstallCreateManyCompanyInputEnvelope
    set?: ShopifyInstallWhereUniqueInput | ShopifyInstallWhereUniqueInput[]
    disconnect?: ShopifyInstallWhereUniqueInput | ShopifyInstallWhereUniqueInput[]
    delete?: ShopifyInstallWhereUniqueInput | ShopifyInstallWhereUniqueInput[]
    connect?: ShopifyInstallWhereUniqueInput | ShopifyInstallWhereUniqueInput[]
    update?: ShopifyInstallUpdateWithWhereUniqueWithoutCompanyInput | ShopifyInstallUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: ShopifyInstallUpdateManyWithWhereWithoutCompanyInput | ShopifyInstallUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: ShopifyInstallScalarWhereInput | ShopifyInstallScalarWhereInput[]
  }

  export type StopNoteUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<StopNoteCreateWithoutCompanyInput, StopNoteUncheckedCreateWithoutCompanyInput> | StopNoteCreateWithoutCompanyInput[] | StopNoteUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: StopNoteCreateOrConnectWithoutCompanyInput | StopNoteCreateOrConnectWithoutCompanyInput[]
    upsert?: StopNoteUpsertWithWhereUniqueWithoutCompanyInput | StopNoteUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: StopNoteCreateManyCompanyInputEnvelope
    set?: StopNoteWhereUniqueInput | StopNoteWhereUniqueInput[]
    disconnect?: StopNoteWhereUniqueInput | StopNoteWhereUniqueInput[]
    delete?: StopNoteWhereUniqueInput | StopNoteWhereUniqueInput[]
    connect?: StopNoteWhereUniqueInput | StopNoteWhereUniqueInput[]
    update?: StopNoteUpdateWithWhereUniqueWithoutCompanyInput | StopNoteUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: StopNoteUpdateManyWithWhereWithoutCompanyInput | StopNoteUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: StopNoteScalarWhereInput | StopNoteScalarWhereInput[]
  }

  export type JobUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<JobCreateWithoutCompanyInput, JobUncheckedCreateWithoutCompanyInput> | JobCreateWithoutCompanyInput[] | JobUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: JobCreateOrConnectWithoutCompanyInput | JobCreateOrConnectWithoutCompanyInput[]
    upsert?: JobUpsertWithWhereUniqueWithoutCompanyInput | JobUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: JobCreateManyCompanyInputEnvelope
    set?: JobWhereUniqueInput | JobWhereUniqueInput[]
    disconnect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    delete?: JobWhereUniqueInput | JobWhereUniqueInput[]
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    update?: JobUpdateWithWhereUniqueWithoutCompanyInput | JobUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: JobUpdateManyWithWhereWithoutCompanyInput | JobUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: JobScalarWhereInput | JobScalarWhereInput[]
  }

  export type CompanyCreateNestedOneWithoutPricingProfilesInput = {
    create?: XOR<CompanyCreateWithoutPricingProfilesInput, CompanyUncheckedCreateWithoutPricingProfilesInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutPricingProfilesInput
    connect?: CompanyWhereUniqueInput
  }

  export type WidgetSettingsCreateNestedOneWithoutPricingProfileInput = {
    create?: XOR<WidgetSettingsCreateWithoutPricingProfileInput, WidgetSettingsUncheckedCreateWithoutPricingProfileInput>
    connectOrCreate?: WidgetSettingsCreateOrConnectWithoutPricingProfileInput
    connect?: WidgetSettingsWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CompanyUpdateOneRequiredWithoutPricingProfilesNestedInput = {
    create?: XOR<CompanyCreateWithoutPricingProfilesInput, CompanyUncheckedCreateWithoutPricingProfilesInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutPricingProfilesInput
    upsert?: CompanyUpsertWithoutPricingProfilesInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutPricingProfilesInput, CompanyUpdateWithoutPricingProfilesInput>, CompanyUncheckedUpdateWithoutPricingProfilesInput>
  }

  export type WidgetSettingsUpdateOneWithoutPricingProfileNestedInput = {
    create?: XOR<WidgetSettingsCreateWithoutPricingProfileInput, WidgetSettingsUncheckedCreateWithoutPricingProfileInput>
    connectOrCreate?: WidgetSettingsCreateOrConnectWithoutPricingProfileInput
    upsert?: WidgetSettingsUpsertWithoutPricingProfileInput
    disconnect?: WidgetSettingsWhereInput | boolean
    delete?: WidgetSettingsWhereInput | boolean
    connect?: WidgetSettingsWhereUniqueInput
    update?: XOR<XOR<WidgetSettingsUpdateToOneWithWhereWithoutPricingProfileInput, WidgetSettingsUpdateWithoutPricingProfileInput>, WidgetSettingsUncheckedUpdateWithoutPricingProfileInput>
  }

  export type WidgetSettingsCreateserviceZipsInput = {
    set: string[]
  }

  export type CompanyCreateNestedOneWithoutWidgetSettingsInput = {
    create?: XOR<CompanyCreateWithoutWidgetSettingsInput, CompanyUncheckedCreateWithoutWidgetSettingsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutWidgetSettingsInput
    connect?: CompanyWhereUniqueInput
  }

  export type PricingProfileCreateNestedOneWithoutWidgetSettingsInput = {
    create?: XOR<PricingProfileCreateWithoutWidgetSettingsInput, PricingProfileUncheckedCreateWithoutWidgetSettingsInput>
    connectOrCreate?: PricingProfileCreateOrConnectWithoutWidgetSettingsInput
    connect?: PricingProfileWhereUniqueInput
  }

  export type PricingProfileUncheckedCreateNestedOneWithoutWidgetSettingsInput = {
    create?: XOR<PricingProfileCreateWithoutWidgetSettingsInput, PricingProfileUncheckedCreateWithoutWidgetSettingsInput>
    connectOrCreate?: PricingProfileCreateOrConnectWithoutWidgetSettingsInput
    connect?: PricingProfileWhereUniqueInput
  }

  export type WidgetSettingsUpdateserviceZipsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type CompanyUpdateOneRequiredWithoutWidgetSettingsNestedInput = {
    create?: XOR<CompanyCreateWithoutWidgetSettingsInput, CompanyUncheckedCreateWithoutWidgetSettingsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutWidgetSettingsInput
    upsert?: CompanyUpsertWithoutWidgetSettingsInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutWidgetSettingsInput, CompanyUpdateWithoutWidgetSettingsInput>, CompanyUncheckedUpdateWithoutWidgetSettingsInput>
  }

  export type PricingProfileUpdateOneWithoutWidgetSettingsNestedInput = {
    create?: XOR<PricingProfileCreateWithoutWidgetSettingsInput, PricingProfileUncheckedCreateWithoutWidgetSettingsInput>
    connectOrCreate?: PricingProfileCreateOrConnectWithoutWidgetSettingsInput
    upsert?: PricingProfileUpsertWithoutWidgetSettingsInput
    disconnect?: PricingProfileWhereInput | boolean
    delete?: PricingProfileWhereInput | boolean
    connect?: PricingProfileWhereUniqueInput
    update?: XOR<XOR<PricingProfileUpdateToOneWithWhereWithoutWidgetSettingsInput, PricingProfileUpdateWithoutWidgetSettingsInput>, PricingProfileUncheckedUpdateWithoutWidgetSettingsInput>
  }

  export type PricingProfileUncheckedUpdateOneWithoutWidgetSettingsNestedInput = {
    create?: XOR<PricingProfileCreateWithoutWidgetSettingsInput, PricingProfileUncheckedCreateWithoutWidgetSettingsInput>
    connectOrCreate?: PricingProfileCreateOrConnectWithoutWidgetSettingsInput
    upsert?: PricingProfileUpsertWithoutWidgetSettingsInput
    disconnect?: PricingProfileWhereInput | boolean
    delete?: PricingProfileWhereInput | boolean
    connect?: PricingProfileWhereUniqueInput
    update?: XOR<XOR<PricingProfileUpdateToOneWithWhereWithoutWidgetSettingsInput, PricingProfileUpdateWithoutWidgetSettingsInput>, PricingProfileUncheckedUpdateWithoutWidgetSettingsInput>
  }

  export type CompanyCreateNestedOneWithoutQuoteRequestsInput = {
    create?: XOR<CompanyCreateWithoutQuoteRequestsInput, CompanyUncheckedCreateWithoutQuoteRequestsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutQuoteRequestsInput
    connect?: CompanyWhereUniqueInput
  }

  export type JobCreateNestedManyWithoutQuoteRequestInput = {
    create?: XOR<JobCreateWithoutQuoteRequestInput, JobUncheckedCreateWithoutQuoteRequestInput> | JobCreateWithoutQuoteRequestInput[] | JobUncheckedCreateWithoutQuoteRequestInput[]
    connectOrCreate?: JobCreateOrConnectWithoutQuoteRequestInput | JobCreateOrConnectWithoutQuoteRequestInput[]
    createMany?: JobCreateManyQuoteRequestInputEnvelope
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
  }

  export type JobUncheckedCreateNestedManyWithoutQuoteRequestInput = {
    create?: XOR<JobCreateWithoutQuoteRequestInput, JobUncheckedCreateWithoutQuoteRequestInput> | JobCreateWithoutQuoteRequestInput[] | JobUncheckedCreateWithoutQuoteRequestInput[]
    connectOrCreate?: JobCreateOrConnectWithoutQuoteRequestInput | JobCreateOrConnectWithoutQuoteRequestInput[]
    createMany?: JobCreateManyQuoteRequestInputEnvelope
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CompanyUpdateOneRequiredWithoutQuoteRequestsNestedInput = {
    create?: XOR<CompanyCreateWithoutQuoteRequestsInput, CompanyUncheckedCreateWithoutQuoteRequestsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutQuoteRequestsInput
    upsert?: CompanyUpsertWithoutQuoteRequestsInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutQuoteRequestsInput, CompanyUpdateWithoutQuoteRequestsInput>, CompanyUncheckedUpdateWithoutQuoteRequestsInput>
  }

  export type JobUpdateManyWithoutQuoteRequestNestedInput = {
    create?: XOR<JobCreateWithoutQuoteRequestInput, JobUncheckedCreateWithoutQuoteRequestInput> | JobCreateWithoutQuoteRequestInput[] | JobUncheckedCreateWithoutQuoteRequestInput[]
    connectOrCreate?: JobCreateOrConnectWithoutQuoteRequestInput | JobCreateOrConnectWithoutQuoteRequestInput[]
    upsert?: JobUpsertWithWhereUniqueWithoutQuoteRequestInput | JobUpsertWithWhereUniqueWithoutQuoteRequestInput[]
    createMany?: JobCreateManyQuoteRequestInputEnvelope
    set?: JobWhereUniqueInput | JobWhereUniqueInput[]
    disconnect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    delete?: JobWhereUniqueInput | JobWhereUniqueInput[]
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    update?: JobUpdateWithWhereUniqueWithoutQuoteRequestInput | JobUpdateWithWhereUniqueWithoutQuoteRequestInput[]
    updateMany?: JobUpdateManyWithWhereWithoutQuoteRequestInput | JobUpdateManyWithWhereWithoutQuoteRequestInput[]
    deleteMany?: JobScalarWhereInput | JobScalarWhereInput[]
  }

  export type JobUncheckedUpdateManyWithoutQuoteRequestNestedInput = {
    create?: XOR<JobCreateWithoutQuoteRequestInput, JobUncheckedCreateWithoutQuoteRequestInput> | JobCreateWithoutQuoteRequestInput[] | JobUncheckedCreateWithoutQuoteRequestInput[]
    connectOrCreate?: JobCreateOrConnectWithoutQuoteRequestInput | JobCreateOrConnectWithoutQuoteRequestInput[]
    upsert?: JobUpsertWithWhereUniqueWithoutQuoteRequestInput | JobUpsertWithWhereUniqueWithoutQuoteRequestInput[]
    createMany?: JobCreateManyQuoteRequestInputEnvelope
    set?: JobWhereUniqueInput | JobWhereUniqueInput[]
    disconnect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    delete?: JobWhereUniqueInput | JobWhereUniqueInput[]
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    update?: JobUpdateWithWhereUniqueWithoutQuoteRequestInput | JobUpdateWithWhereUniqueWithoutQuoteRequestInput[]
    updateMany?: JobUpdateManyWithWhereWithoutQuoteRequestInput | JobUpdateManyWithWhereWithoutQuoteRequestInput[]
    deleteMany?: JobScalarWhereInput | JobScalarWhereInput[]
  }

  export type WebhookCreateeventsInput = {
    set: string[]
  }

  export type CompanyCreateNestedOneWithoutWebhooksInput = {
    create?: XOR<CompanyCreateWithoutWebhooksInput, CompanyUncheckedCreateWithoutWebhooksInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutWebhooksInput
    connect?: CompanyWhereUniqueInput
  }

  export type WebhookUpdateeventsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type CompanyUpdateOneRequiredWithoutWebhooksNestedInput = {
    create?: XOR<CompanyCreateWithoutWebhooksInput, CompanyUncheckedCreateWithoutWebhooksInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutWebhooksInput
    upsert?: CompanyUpsertWithoutWebhooksInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutWebhooksInput, CompanyUpdateWithoutWebhooksInput>, CompanyUncheckedUpdateWithoutWebhooksInput>
  }

  export type CompanyCreateNestedOneWithoutShopifyInstallsInput = {
    create?: XOR<CompanyCreateWithoutShopifyInstallsInput, CompanyUncheckedCreateWithoutShopifyInstallsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutShopifyInstallsInput
    connect?: CompanyWhereUniqueInput
  }

  export type CompanyUpdateOneWithoutShopifyInstallsNestedInput = {
    create?: XOR<CompanyCreateWithoutShopifyInstallsInput, CompanyUncheckedCreateWithoutShopifyInstallsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutShopifyInstallsInput
    upsert?: CompanyUpsertWithoutShopifyInstallsInput
    disconnect?: CompanyWhereInput | boolean
    delete?: CompanyWhereInput | boolean
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutShopifyInstallsInput, CompanyUpdateWithoutShopifyInstallsInput>, CompanyUncheckedUpdateWithoutShopifyInstallsInput>
  }

  export type CompanyCreateNestedOneWithoutStopNotesInput = {
    create?: XOR<CompanyCreateWithoutStopNotesInput, CompanyUncheckedCreateWithoutStopNotesInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutStopNotesInput
    connect?: CompanyWhereUniqueInput
  }

  export type ReadinessCheckCreateNestedManyWithoutStopNoteInput = {
    create?: XOR<ReadinessCheckCreateWithoutStopNoteInput, ReadinessCheckUncheckedCreateWithoutStopNoteInput> | ReadinessCheckCreateWithoutStopNoteInput[] | ReadinessCheckUncheckedCreateWithoutStopNoteInput[]
    connectOrCreate?: ReadinessCheckCreateOrConnectWithoutStopNoteInput | ReadinessCheckCreateOrConnectWithoutStopNoteInput[]
    createMany?: ReadinessCheckCreateManyStopNoteInputEnvelope
    connect?: ReadinessCheckWhereUniqueInput | ReadinessCheckWhereUniqueInput[]
  }

  export type ExceptionLogCreateNestedManyWithoutStopNoteInput = {
    create?: XOR<ExceptionLogCreateWithoutStopNoteInput, ExceptionLogUncheckedCreateWithoutStopNoteInput> | ExceptionLogCreateWithoutStopNoteInput[] | ExceptionLogUncheckedCreateWithoutStopNoteInput[]
    connectOrCreate?: ExceptionLogCreateOrConnectWithoutStopNoteInput | ExceptionLogCreateOrConnectWithoutStopNoteInput[]
    createMany?: ExceptionLogCreateManyStopNoteInputEnvelope
    connect?: ExceptionLogWhereUniqueInput | ExceptionLogWhereUniqueInput[]
  }

  export type JobStopCreateNestedManyWithoutStopNoteInput = {
    create?: XOR<JobStopCreateWithoutStopNoteInput, JobStopUncheckedCreateWithoutStopNoteInput> | JobStopCreateWithoutStopNoteInput[] | JobStopUncheckedCreateWithoutStopNoteInput[]
    connectOrCreate?: JobStopCreateOrConnectWithoutStopNoteInput | JobStopCreateOrConnectWithoutStopNoteInput[]
    createMany?: JobStopCreateManyStopNoteInputEnvelope
    connect?: JobStopWhereUniqueInput | JobStopWhereUniqueInput[]
  }

  export type ReadinessCheckUncheckedCreateNestedManyWithoutStopNoteInput = {
    create?: XOR<ReadinessCheckCreateWithoutStopNoteInput, ReadinessCheckUncheckedCreateWithoutStopNoteInput> | ReadinessCheckCreateWithoutStopNoteInput[] | ReadinessCheckUncheckedCreateWithoutStopNoteInput[]
    connectOrCreate?: ReadinessCheckCreateOrConnectWithoutStopNoteInput | ReadinessCheckCreateOrConnectWithoutStopNoteInput[]
    createMany?: ReadinessCheckCreateManyStopNoteInputEnvelope
    connect?: ReadinessCheckWhereUniqueInput | ReadinessCheckWhereUniqueInput[]
  }

  export type ExceptionLogUncheckedCreateNestedManyWithoutStopNoteInput = {
    create?: XOR<ExceptionLogCreateWithoutStopNoteInput, ExceptionLogUncheckedCreateWithoutStopNoteInput> | ExceptionLogCreateWithoutStopNoteInput[] | ExceptionLogUncheckedCreateWithoutStopNoteInput[]
    connectOrCreate?: ExceptionLogCreateOrConnectWithoutStopNoteInput | ExceptionLogCreateOrConnectWithoutStopNoteInput[]
    createMany?: ExceptionLogCreateManyStopNoteInputEnvelope
    connect?: ExceptionLogWhereUniqueInput | ExceptionLogWhereUniqueInput[]
  }

  export type JobStopUncheckedCreateNestedManyWithoutStopNoteInput = {
    create?: XOR<JobStopCreateWithoutStopNoteInput, JobStopUncheckedCreateWithoutStopNoteInput> | JobStopCreateWithoutStopNoteInput[] | JobStopUncheckedCreateWithoutStopNoteInput[]
    connectOrCreate?: JobStopCreateOrConnectWithoutStopNoteInput | JobStopCreateOrConnectWithoutStopNoteInput[]
    createMany?: JobStopCreateManyStopNoteInputEnvelope
    connect?: JobStopWhereUniqueInput | JobStopWhereUniqueInput[]
  }

  export type CompanyUpdateOneRequiredWithoutStopNotesNestedInput = {
    create?: XOR<CompanyCreateWithoutStopNotesInput, CompanyUncheckedCreateWithoutStopNotesInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutStopNotesInput
    upsert?: CompanyUpsertWithoutStopNotesInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutStopNotesInput, CompanyUpdateWithoutStopNotesInput>, CompanyUncheckedUpdateWithoutStopNotesInput>
  }

  export type ReadinessCheckUpdateManyWithoutStopNoteNestedInput = {
    create?: XOR<ReadinessCheckCreateWithoutStopNoteInput, ReadinessCheckUncheckedCreateWithoutStopNoteInput> | ReadinessCheckCreateWithoutStopNoteInput[] | ReadinessCheckUncheckedCreateWithoutStopNoteInput[]
    connectOrCreate?: ReadinessCheckCreateOrConnectWithoutStopNoteInput | ReadinessCheckCreateOrConnectWithoutStopNoteInput[]
    upsert?: ReadinessCheckUpsertWithWhereUniqueWithoutStopNoteInput | ReadinessCheckUpsertWithWhereUniqueWithoutStopNoteInput[]
    createMany?: ReadinessCheckCreateManyStopNoteInputEnvelope
    set?: ReadinessCheckWhereUniqueInput | ReadinessCheckWhereUniqueInput[]
    disconnect?: ReadinessCheckWhereUniqueInput | ReadinessCheckWhereUniqueInput[]
    delete?: ReadinessCheckWhereUniqueInput | ReadinessCheckWhereUniqueInput[]
    connect?: ReadinessCheckWhereUniqueInput | ReadinessCheckWhereUniqueInput[]
    update?: ReadinessCheckUpdateWithWhereUniqueWithoutStopNoteInput | ReadinessCheckUpdateWithWhereUniqueWithoutStopNoteInput[]
    updateMany?: ReadinessCheckUpdateManyWithWhereWithoutStopNoteInput | ReadinessCheckUpdateManyWithWhereWithoutStopNoteInput[]
    deleteMany?: ReadinessCheckScalarWhereInput | ReadinessCheckScalarWhereInput[]
  }

  export type ExceptionLogUpdateManyWithoutStopNoteNestedInput = {
    create?: XOR<ExceptionLogCreateWithoutStopNoteInput, ExceptionLogUncheckedCreateWithoutStopNoteInput> | ExceptionLogCreateWithoutStopNoteInput[] | ExceptionLogUncheckedCreateWithoutStopNoteInput[]
    connectOrCreate?: ExceptionLogCreateOrConnectWithoutStopNoteInput | ExceptionLogCreateOrConnectWithoutStopNoteInput[]
    upsert?: ExceptionLogUpsertWithWhereUniqueWithoutStopNoteInput | ExceptionLogUpsertWithWhereUniqueWithoutStopNoteInput[]
    createMany?: ExceptionLogCreateManyStopNoteInputEnvelope
    set?: ExceptionLogWhereUniqueInput | ExceptionLogWhereUniqueInput[]
    disconnect?: ExceptionLogWhereUniqueInput | ExceptionLogWhereUniqueInput[]
    delete?: ExceptionLogWhereUniqueInput | ExceptionLogWhereUniqueInput[]
    connect?: ExceptionLogWhereUniqueInput | ExceptionLogWhereUniqueInput[]
    update?: ExceptionLogUpdateWithWhereUniqueWithoutStopNoteInput | ExceptionLogUpdateWithWhereUniqueWithoutStopNoteInput[]
    updateMany?: ExceptionLogUpdateManyWithWhereWithoutStopNoteInput | ExceptionLogUpdateManyWithWhereWithoutStopNoteInput[]
    deleteMany?: ExceptionLogScalarWhereInput | ExceptionLogScalarWhereInput[]
  }

  export type JobStopUpdateManyWithoutStopNoteNestedInput = {
    create?: XOR<JobStopCreateWithoutStopNoteInput, JobStopUncheckedCreateWithoutStopNoteInput> | JobStopCreateWithoutStopNoteInput[] | JobStopUncheckedCreateWithoutStopNoteInput[]
    connectOrCreate?: JobStopCreateOrConnectWithoutStopNoteInput | JobStopCreateOrConnectWithoutStopNoteInput[]
    upsert?: JobStopUpsertWithWhereUniqueWithoutStopNoteInput | JobStopUpsertWithWhereUniqueWithoutStopNoteInput[]
    createMany?: JobStopCreateManyStopNoteInputEnvelope
    set?: JobStopWhereUniqueInput | JobStopWhereUniqueInput[]
    disconnect?: JobStopWhereUniqueInput | JobStopWhereUniqueInput[]
    delete?: JobStopWhereUniqueInput | JobStopWhereUniqueInput[]
    connect?: JobStopWhereUniqueInput | JobStopWhereUniqueInput[]
    update?: JobStopUpdateWithWhereUniqueWithoutStopNoteInput | JobStopUpdateWithWhereUniqueWithoutStopNoteInput[]
    updateMany?: JobStopUpdateManyWithWhereWithoutStopNoteInput | JobStopUpdateManyWithWhereWithoutStopNoteInput[]
    deleteMany?: JobStopScalarWhereInput | JobStopScalarWhereInput[]
  }

  export type ReadinessCheckUncheckedUpdateManyWithoutStopNoteNestedInput = {
    create?: XOR<ReadinessCheckCreateWithoutStopNoteInput, ReadinessCheckUncheckedCreateWithoutStopNoteInput> | ReadinessCheckCreateWithoutStopNoteInput[] | ReadinessCheckUncheckedCreateWithoutStopNoteInput[]
    connectOrCreate?: ReadinessCheckCreateOrConnectWithoutStopNoteInput | ReadinessCheckCreateOrConnectWithoutStopNoteInput[]
    upsert?: ReadinessCheckUpsertWithWhereUniqueWithoutStopNoteInput | ReadinessCheckUpsertWithWhereUniqueWithoutStopNoteInput[]
    createMany?: ReadinessCheckCreateManyStopNoteInputEnvelope
    set?: ReadinessCheckWhereUniqueInput | ReadinessCheckWhereUniqueInput[]
    disconnect?: ReadinessCheckWhereUniqueInput | ReadinessCheckWhereUniqueInput[]
    delete?: ReadinessCheckWhereUniqueInput | ReadinessCheckWhereUniqueInput[]
    connect?: ReadinessCheckWhereUniqueInput | ReadinessCheckWhereUniqueInput[]
    update?: ReadinessCheckUpdateWithWhereUniqueWithoutStopNoteInput | ReadinessCheckUpdateWithWhereUniqueWithoutStopNoteInput[]
    updateMany?: ReadinessCheckUpdateManyWithWhereWithoutStopNoteInput | ReadinessCheckUpdateManyWithWhereWithoutStopNoteInput[]
    deleteMany?: ReadinessCheckScalarWhereInput | ReadinessCheckScalarWhereInput[]
  }

  export type ExceptionLogUncheckedUpdateManyWithoutStopNoteNestedInput = {
    create?: XOR<ExceptionLogCreateWithoutStopNoteInput, ExceptionLogUncheckedCreateWithoutStopNoteInput> | ExceptionLogCreateWithoutStopNoteInput[] | ExceptionLogUncheckedCreateWithoutStopNoteInput[]
    connectOrCreate?: ExceptionLogCreateOrConnectWithoutStopNoteInput | ExceptionLogCreateOrConnectWithoutStopNoteInput[]
    upsert?: ExceptionLogUpsertWithWhereUniqueWithoutStopNoteInput | ExceptionLogUpsertWithWhereUniqueWithoutStopNoteInput[]
    createMany?: ExceptionLogCreateManyStopNoteInputEnvelope
    set?: ExceptionLogWhereUniqueInput | ExceptionLogWhereUniqueInput[]
    disconnect?: ExceptionLogWhereUniqueInput | ExceptionLogWhereUniqueInput[]
    delete?: ExceptionLogWhereUniqueInput | ExceptionLogWhereUniqueInput[]
    connect?: ExceptionLogWhereUniqueInput | ExceptionLogWhereUniqueInput[]
    update?: ExceptionLogUpdateWithWhereUniqueWithoutStopNoteInput | ExceptionLogUpdateWithWhereUniqueWithoutStopNoteInput[]
    updateMany?: ExceptionLogUpdateManyWithWhereWithoutStopNoteInput | ExceptionLogUpdateManyWithWhereWithoutStopNoteInput[]
    deleteMany?: ExceptionLogScalarWhereInput | ExceptionLogScalarWhereInput[]
  }

  export type JobStopUncheckedUpdateManyWithoutStopNoteNestedInput = {
    create?: XOR<JobStopCreateWithoutStopNoteInput, JobStopUncheckedCreateWithoutStopNoteInput> | JobStopCreateWithoutStopNoteInput[] | JobStopUncheckedCreateWithoutStopNoteInput[]
    connectOrCreate?: JobStopCreateOrConnectWithoutStopNoteInput | JobStopCreateOrConnectWithoutStopNoteInput[]
    upsert?: JobStopUpsertWithWhereUniqueWithoutStopNoteInput | JobStopUpsertWithWhereUniqueWithoutStopNoteInput[]
    createMany?: JobStopCreateManyStopNoteInputEnvelope
    set?: JobStopWhereUniqueInput | JobStopWhereUniqueInput[]
    disconnect?: JobStopWhereUniqueInput | JobStopWhereUniqueInput[]
    delete?: JobStopWhereUniqueInput | JobStopWhereUniqueInput[]
    connect?: JobStopWhereUniqueInput | JobStopWhereUniqueInput[]
    update?: JobStopUpdateWithWhereUniqueWithoutStopNoteInput | JobStopUpdateWithWhereUniqueWithoutStopNoteInput[]
    updateMany?: JobStopUpdateManyWithWhereWithoutStopNoteInput | JobStopUpdateManyWithWhereWithoutStopNoteInput[]
    deleteMany?: JobStopScalarWhereInput | JobStopScalarWhereInput[]
  }

  export type StopNoteCreateNestedOneWithoutReadinessChecksInput = {
    create?: XOR<StopNoteCreateWithoutReadinessChecksInput, StopNoteUncheckedCreateWithoutReadinessChecksInput>
    connectOrCreate?: StopNoteCreateOrConnectWithoutReadinessChecksInput
    connect?: StopNoteWhereUniqueInput
  }

  export type JobCreateNestedOneWithoutReadinessChecksInput = {
    create?: XOR<JobCreateWithoutReadinessChecksInput, JobUncheckedCreateWithoutReadinessChecksInput>
    connectOrCreate?: JobCreateOrConnectWithoutReadinessChecksInput
    connect?: JobWhereUniqueInput
  }

  export type StopNoteUpdateOneRequiredWithoutReadinessChecksNestedInput = {
    create?: XOR<StopNoteCreateWithoutReadinessChecksInput, StopNoteUncheckedCreateWithoutReadinessChecksInput>
    connectOrCreate?: StopNoteCreateOrConnectWithoutReadinessChecksInput
    upsert?: StopNoteUpsertWithoutReadinessChecksInput
    connect?: StopNoteWhereUniqueInput
    update?: XOR<XOR<StopNoteUpdateToOneWithWhereWithoutReadinessChecksInput, StopNoteUpdateWithoutReadinessChecksInput>, StopNoteUncheckedUpdateWithoutReadinessChecksInput>
  }

  export type JobUpdateOneWithoutReadinessChecksNestedInput = {
    create?: XOR<JobCreateWithoutReadinessChecksInput, JobUncheckedCreateWithoutReadinessChecksInput>
    connectOrCreate?: JobCreateOrConnectWithoutReadinessChecksInput
    upsert?: JobUpsertWithoutReadinessChecksInput
    disconnect?: JobWhereInput | boolean
    delete?: JobWhereInput | boolean
    connect?: JobWhereUniqueInput
    update?: XOR<XOR<JobUpdateToOneWithWhereWithoutReadinessChecksInput, JobUpdateWithoutReadinessChecksInput>, JobUncheckedUpdateWithoutReadinessChecksInput>
  }

  export type StopNoteCreateNestedOneWithoutExceptionLogsInput = {
    create?: XOR<StopNoteCreateWithoutExceptionLogsInput, StopNoteUncheckedCreateWithoutExceptionLogsInput>
    connectOrCreate?: StopNoteCreateOrConnectWithoutExceptionLogsInput
    connect?: StopNoteWhereUniqueInput
  }

  export type JobCreateNestedOneWithoutExceptionLogsInput = {
    create?: XOR<JobCreateWithoutExceptionLogsInput, JobUncheckedCreateWithoutExceptionLogsInput>
    connectOrCreate?: JobCreateOrConnectWithoutExceptionLogsInput
    connect?: JobWhereUniqueInput
  }

  export type StopNoteUpdateOneWithoutExceptionLogsNestedInput = {
    create?: XOR<StopNoteCreateWithoutExceptionLogsInput, StopNoteUncheckedCreateWithoutExceptionLogsInput>
    connectOrCreate?: StopNoteCreateOrConnectWithoutExceptionLogsInput
    upsert?: StopNoteUpsertWithoutExceptionLogsInput
    disconnect?: StopNoteWhereInput | boolean
    delete?: StopNoteWhereInput | boolean
    connect?: StopNoteWhereUniqueInput
    update?: XOR<XOR<StopNoteUpdateToOneWithWhereWithoutExceptionLogsInput, StopNoteUpdateWithoutExceptionLogsInput>, StopNoteUncheckedUpdateWithoutExceptionLogsInput>
  }

  export type JobUpdateOneWithoutExceptionLogsNestedInput = {
    create?: XOR<JobCreateWithoutExceptionLogsInput, JobUncheckedCreateWithoutExceptionLogsInput>
    connectOrCreate?: JobCreateOrConnectWithoutExceptionLogsInput
    upsert?: JobUpsertWithoutExceptionLogsInput
    disconnect?: JobWhereInput | boolean
    delete?: JobWhereInput | boolean
    connect?: JobWhereUniqueInput
    update?: XOR<XOR<JobUpdateToOneWithWhereWithoutExceptionLogsInput, JobUpdateWithoutExceptionLogsInput>, JobUncheckedUpdateWithoutExceptionLogsInput>
  }

  export type CompanyCreateNestedOneWithoutJobsInput = {
    create?: XOR<CompanyCreateWithoutJobsInput, CompanyUncheckedCreateWithoutJobsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutJobsInput
    connect?: CompanyWhereUniqueInput
  }

  export type QuoteRequestCreateNestedOneWithoutJobsInput = {
    create?: XOR<QuoteRequestCreateWithoutJobsInput, QuoteRequestUncheckedCreateWithoutJobsInput>
    connectOrCreate?: QuoteRequestCreateOrConnectWithoutJobsInput
    connect?: QuoteRequestWhereUniqueInput
  }

  export type JobStopCreateNestedManyWithoutJobInput = {
    create?: XOR<JobStopCreateWithoutJobInput, JobStopUncheckedCreateWithoutJobInput> | JobStopCreateWithoutJobInput[] | JobStopUncheckedCreateWithoutJobInput[]
    connectOrCreate?: JobStopCreateOrConnectWithoutJobInput | JobStopCreateOrConnectWithoutJobInput[]
    createMany?: JobStopCreateManyJobInputEnvelope
    connect?: JobStopWhereUniqueInput | JobStopWhereUniqueInput[]
  }

  export type ReadinessCheckCreateNestedManyWithoutJobInput = {
    create?: XOR<ReadinessCheckCreateWithoutJobInput, ReadinessCheckUncheckedCreateWithoutJobInput> | ReadinessCheckCreateWithoutJobInput[] | ReadinessCheckUncheckedCreateWithoutJobInput[]
    connectOrCreate?: ReadinessCheckCreateOrConnectWithoutJobInput | ReadinessCheckCreateOrConnectWithoutJobInput[]
    createMany?: ReadinessCheckCreateManyJobInputEnvelope
    connect?: ReadinessCheckWhereUniqueInput | ReadinessCheckWhereUniqueInput[]
  }

  export type ExceptionLogCreateNestedManyWithoutJobInput = {
    create?: XOR<ExceptionLogCreateWithoutJobInput, ExceptionLogUncheckedCreateWithoutJobInput> | ExceptionLogCreateWithoutJobInput[] | ExceptionLogUncheckedCreateWithoutJobInput[]
    connectOrCreate?: ExceptionLogCreateOrConnectWithoutJobInput | ExceptionLogCreateOrConnectWithoutJobInput[]
    createMany?: ExceptionLogCreateManyJobInputEnvelope
    connect?: ExceptionLogWhereUniqueInput | ExceptionLogWhereUniqueInput[]
  }

  export type JobStopUncheckedCreateNestedManyWithoutJobInput = {
    create?: XOR<JobStopCreateWithoutJobInput, JobStopUncheckedCreateWithoutJobInput> | JobStopCreateWithoutJobInput[] | JobStopUncheckedCreateWithoutJobInput[]
    connectOrCreate?: JobStopCreateOrConnectWithoutJobInput | JobStopCreateOrConnectWithoutJobInput[]
    createMany?: JobStopCreateManyJobInputEnvelope
    connect?: JobStopWhereUniqueInput | JobStopWhereUniqueInput[]
  }

  export type ReadinessCheckUncheckedCreateNestedManyWithoutJobInput = {
    create?: XOR<ReadinessCheckCreateWithoutJobInput, ReadinessCheckUncheckedCreateWithoutJobInput> | ReadinessCheckCreateWithoutJobInput[] | ReadinessCheckUncheckedCreateWithoutJobInput[]
    connectOrCreate?: ReadinessCheckCreateOrConnectWithoutJobInput | ReadinessCheckCreateOrConnectWithoutJobInput[]
    createMany?: ReadinessCheckCreateManyJobInputEnvelope
    connect?: ReadinessCheckWhereUniqueInput | ReadinessCheckWhereUniqueInput[]
  }

  export type ExceptionLogUncheckedCreateNestedManyWithoutJobInput = {
    create?: XOR<ExceptionLogCreateWithoutJobInput, ExceptionLogUncheckedCreateWithoutJobInput> | ExceptionLogCreateWithoutJobInput[] | ExceptionLogUncheckedCreateWithoutJobInput[]
    connectOrCreate?: ExceptionLogCreateOrConnectWithoutJobInput | ExceptionLogCreateOrConnectWithoutJobInput[]
    createMany?: ExceptionLogCreateManyJobInputEnvelope
    connect?: ExceptionLogWhereUniqueInput | ExceptionLogWhereUniqueInput[]
  }

  export type CompanyUpdateOneRequiredWithoutJobsNestedInput = {
    create?: XOR<CompanyCreateWithoutJobsInput, CompanyUncheckedCreateWithoutJobsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutJobsInput
    upsert?: CompanyUpsertWithoutJobsInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutJobsInput, CompanyUpdateWithoutJobsInput>, CompanyUncheckedUpdateWithoutJobsInput>
  }

  export type QuoteRequestUpdateOneWithoutJobsNestedInput = {
    create?: XOR<QuoteRequestCreateWithoutJobsInput, QuoteRequestUncheckedCreateWithoutJobsInput>
    connectOrCreate?: QuoteRequestCreateOrConnectWithoutJobsInput
    upsert?: QuoteRequestUpsertWithoutJobsInput
    disconnect?: QuoteRequestWhereInput | boolean
    delete?: QuoteRequestWhereInput | boolean
    connect?: QuoteRequestWhereUniqueInput
    update?: XOR<XOR<QuoteRequestUpdateToOneWithWhereWithoutJobsInput, QuoteRequestUpdateWithoutJobsInput>, QuoteRequestUncheckedUpdateWithoutJobsInput>
  }

  export type JobStopUpdateManyWithoutJobNestedInput = {
    create?: XOR<JobStopCreateWithoutJobInput, JobStopUncheckedCreateWithoutJobInput> | JobStopCreateWithoutJobInput[] | JobStopUncheckedCreateWithoutJobInput[]
    connectOrCreate?: JobStopCreateOrConnectWithoutJobInput | JobStopCreateOrConnectWithoutJobInput[]
    upsert?: JobStopUpsertWithWhereUniqueWithoutJobInput | JobStopUpsertWithWhereUniqueWithoutJobInput[]
    createMany?: JobStopCreateManyJobInputEnvelope
    set?: JobStopWhereUniqueInput | JobStopWhereUniqueInput[]
    disconnect?: JobStopWhereUniqueInput | JobStopWhereUniqueInput[]
    delete?: JobStopWhereUniqueInput | JobStopWhereUniqueInput[]
    connect?: JobStopWhereUniqueInput | JobStopWhereUniqueInput[]
    update?: JobStopUpdateWithWhereUniqueWithoutJobInput | JobStopUpdateWithWhereUniqueWithoutJobInput[]
    updateMany?: JobStopUpdateManyWithWhereWithoutJobInput | JobStopUpdateManyWithWhereWithoutJobInput[]
    deleteMany?: JobStopScalarWhereInput | JobStopScalarWhereInput[]
  }

  export type ReadinessCheckUpdateManyWithoutJobNestedInput = {
    create?: XOR<ReadinessCheckCreateWithoutJobInput, ReadinessCheckUncheckedCreateWithoutJobInput> | ReadinessCheckCreateWithoutJobInput[] | ReadinessCheckUncheckedCreateWithoutJobInput[]
    connectOrCreate?: ReadinessCheckCreateOrConnectWithoutJobInput | ReadinessCheckCreateOrConnectWithoutJobInput[]
    upsert?: ReadinessCheckUpsertWithWhereUniqueWithoutJobInput | ReadinessCheckUpsertWithWhereUniqueWithoutJobInput[]
    createMany?: ReadinessCheckCreateManyJobInputEnvelope
    set?: ReadinessCheckWhereUniqueInput | ReadinessCheckWhereUniqueInput[]
    disconnect?: ReadinessCheckWhereUniqueInput | ReadinessCheckWhereUniqueInput[]
    delete?: ReadinessCheckWhereUniqueInput | ReadinessCheckWhereUniqueInput[]
    connect?: ReadinessCheckWhereUniqueInput | ReadinessCheckWhereUniqueInput[]
    update?: ReadinessCheckUpdateWithWhereUniqueWithoutJobInput | ReadinessCheckUpdateWithWhereUniqueWithoutJobInput[]
    updateMany?: ReadinessCheckUpdateManyWithWhereWithoutJobInput | ReadinessCheckUpdateManyWithWhereWithoutJobInput[]
    deleteMany?: ReadinessCheckScalarWhereInput | ReadinessCheckScalarWhereInput[]
  }

  export type ExceptionLogUpdateManyWithoutJobNestedInput = {
    create?: XOR<ExceptionLogCreateWithoutJobInput, ExceptionLogUncheckedCreateWithoutJobInput> | ExceptionLogCreateWithoutJobInput[] | ExceptionLogUncheckedCreateWithoutJobInput[]
    connectOrCreate?: ExceptionLogCreateOrConnectWithoutJobInput | ExceptionLogCreateOrConnectWithoutJobInput[]
    upsert?: ExceptionLogUpsertWithWhereUniqueWithoutJobInput | ExceptionLogUpsertWithWhereUniqueWithoutJobInput[]
    createMany?: ExceptionLogCreateManyJobInputEnvelope
    set?: ExceptionLogWhereUniqueInput | ExceptionLogWhereUniqueInput[]
    disconnect?: ExceptionLogWhereUniqueInput | ExceptionLogWhereUniqueInput[]
    delete?: ExceptionLogWhereUniqueInput | ExceptionLogWhereUniqueInput[]
    connect?: ExceptionLogWhereUniqueInput | ExceptionLogWhereUniqueInput[]
    update?: ExceptionLogUpdateWithWhereUniqueWithoutJobInput | ExceptionLogUpdateWithWhereUniqueWithoutJobInput[]
    updateMany?: ExceptionLogUpdateManyWithWhereWithoutJobInput | ExceptionLogUpdateManyWithWhereWithoutJobInput[]
    deleteMany?: ExceptionLogScalarWhereInput | ExceptionLogScalarWhereInput[]
  }

  export type JobStopUncheckedUpdateManyWithoutJobNestedInput = {
    create?: XOR<JobStopCreateWithoutJobInput, JobStopUncheckedCreateWithoutJobInput> | JobStopCreateWithoutJobInput[] | JobStopUncheckedCreateWithoutJobInput[]
    connectOrCreate?: JobStopCreateOrConnectWithoutJobInput | JobStopCreateOrConnectWithoutJobInput[]
    upsert?: JobStopUpsertWithWhereUniqueWithoutJobInput | JobStopUpsertWithWhereUniqueWithoutJobInput[]
    createMany?: JobStopCreateManyJobInputEnvelope
    set?: JobStopWhereUniqueInput | JobStopWhereUniqueInput[]
    disconnect?: JobStopWhereUniqueInput | JobStopWhereUniqueInput[]
    delete?: JobStopWhereUniqueInput | JobStopWhereUniqueInput[]
    connect?: JobStopWhereUniqueInput | JobStopWhereUniqueInput[]
    update?: JobStopUpdateWithWhereUniqueWithoutJobInput | JobStopUpdateWithWhereUniqueWithoutJobInput[]
    updateMany?: JobStopUpdateManyWithWhereWithoutJobInput | JobStopUpdateManyWithWhereWithoutJobInput[]
    deleteMany?: JobStopScalarWhereInput | JobStopScalarWhereInput[]
  }

  export type ReadinessCheckUncheckedUpdateManyWithoutJobNestedInput = {
    create?: XOR<ReadinessCheckCreateWithoutJobInput, ReadinessCheckUncheckedCreateWithoutJobInput> | ReadinessCheckCreateWithoutJobInput[] | ReadinessCheckUncheckedCreateWithoutJobInput[]
    connectOrCreate?: ReadinessCheckCreateOrConnectWithoutJobInput | ReadinessCheckCreateOrConnectWithoutJobInput[]
    upsert?: ReadinessCheckUpsertWithWhereUniqueWithoutJobInput | ReadinessCheckUpsertWithWhereUniqueWithoutJobInput[]
    createMany?: ReadinessCheckCreateManyJobInputEnvelope
    set?: ReadinessCheckWhereUniqueInput | ReadinessCheckWhereUniqueInput[]
    disconnect?: ReadinessCheckWhereUniqueInput | ReadinessCheckWhereUniqueInput[]
    delete?: ReadinessCheckWhereUniqueInput | ReadinessCheckWhereUniqueInput[]
    connect?: ReadinessCheckWhereUniqueInput | ReadinessCheckWhereUniqueInput[]
    update?: ReadinessCheckUpdateWithWhereUniqueWithoutJobInput | ReadinessCheckUpdateWithWhereUniqueWithoutJobInput[]
    updateMany?: ReadinessCheckUpdateManyWithWhereWithoutJobInput | ReadinessCheckUpdateManyWithWhereWithoutJobInput[]
    deleteMany?: ReadinessCheckScalarWhereInput | ReadinessCheckScalarWhereInput[]
  }

  export type ExceptionLogUncheckedUpdateManyWithoutJobNestedInput = {
    create?: XOR<ExceptionLogCreateWithoutJobInput, ExceptionLogUncheckedCreateWithoutJobInput> | ExceptionLogCreateWithoutJobInput[] | ExceptionLogUncheckedCreateWithoutJobInput[]
    connectOrCreate?: ExceptionLogCreateOrConnectWithoutJobInput | ExceptionLogCreateOrConnectWithoutJobInput[]
    upsert?: ExceptionLogUpsertWithWhereUniqueWithoutJobInput | ExceptionLogUpsertWithWhereUniqueWithoutJobInput[]
    createMany?: ExceptionLogCreateManyJobInputEnvelope
    set?: ExceptionLogWhereUniqueInput | ExceptionLogWhereUniqueInput[]
    disconnect?: ExceptionLogWhereUniqueInput | ExceptionLogWhereUniqueInput[]
    delete?: ExceptionLogWhereUniqueInput | ExceptionLogWhereUniqueInput[]
    connect?: ExceptionLogWhereUniqueInput | ExceptionLogWhereUniqueInput[]
    update?: ExceptionLogUpdateWithWhereUniqueWithoutJobInput | ExceptionLogUpdateWithWhereUniqueWithoutJobInput[]
    updateMany?: ExceptionLogUpdateManyWithWhereWithoutJobInput | ExceptionLogUpdateManyWithWhereWithoutJobInput[]
    deleteMany?: ExceptionLogScalarWhereInput | ExceptionLogScalarWhereInput[]
  }

  export type JobCreateNestedOneWithoutStopsInput = {
    create?: XOR<JobCreateWithoutStopsInput, JobUncheckedCreateWithoutStopsInput>
    connectOrCreate?: JobCreateOrConnectWithoutStopsInput
    connect?: JobWhereUniqueInput
  }

  export type StopNoteCreateNestedOneWithoutJobStopsInput = {
    create?: XOR<StopNoteCreateWithoutJobStopsInput, StopNoteUncheckedCreateWithoutJobStopsInput>
    connectOrCreate?: StopNoteCreateOrConnectWithoutJobStopsInput
    connect?: StopNoteWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type JobUpdateOneRequiredWithoutStopsNestedInput = {
    create?: XOR<JobCreateWithoutStopsInput, JobUncheckedCreateWithoutStopsInput>
    connectOrCreate?: JobCreateOrConnectWithoutStopsInput
    upsert?: JobUpsertWithoutStopsInput
    connect?: JobWhereUniqueInput
    update?: XOR<XOR<JobUpdateToOneWithWhereWithoutStopsInput, JobUpdateWithoutStopsInput>, JobUncheckedUpdateWithoutStopsInput>
  }

  export type StopNoteUpdateOneRequiredWithoutJobStopsNestedInput = {
    create?: XOR<StopNoteCreateWithoutJobStopsInput, StopNoteUncheckedCreateWithoutJobStopsInput>
    connectOrCreate?: StopNoteCreateOrConnectWithoutJobStopsInput
    upsert?: StopNoteUpsertWithoutJobStopsInput
    connect?: StopNoteWhereUniqueInput
    update?: XOR<XOR<StopNoteUpdateToOneWithWhereWithoutJobStopsInput, StopNoteUpdateWithoutJobStopsInput>, StopNoteUncheckedUpdateWithoutJobStopsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type PricingProfileCreateWithoutCompanyInput = {
    id?: string
    baseRatePerMile?: number
    minimumCharge?: number
    useMinimumCharge?: boolean
    minMilesThreshold?: number
    weightFee?: number
    itemCountFee?: number
    stairsFee?: number
    insideDeliveryFee?: number
    addon3Fee?: number
    afterHoursFee?: number
    businessHoursStart?: string
    businessHoursEnd?: string
    businessDays?: string
    largeItemFee?: number
    largeItemsEnabled?: boolean
    largeItemCategories?: JsonNullValueInput | InputJsonValue
    widgetSettings?: WidgetSettingsCreateNestedOneWithoutPricingProfileInput
  }

  export type PricingProfileUncheckedCreateWithoutCompanyInput = {
    id?: string
    widgetSettingsId?: string | null
    baseRatePerMile?: number
    minimumCharge?: number
    useMinimumCharge?: boolean
    minMilesThreshold?: number
    weightFee?: number
    itemCountFee?: number
    stairsFee?: number
    insideDeliveryFee?: number
    addon3Fee?: number
    afterHoursFee?: number
    businessHoursStart?: string
    businessHoursEnd?: string
    businessDays?: string
    largeItemFee?: number
    largeItemsEnabled?: boolean
    largeItemCategories?: JsonNullValueInput | InputJsonValue
  }

  export type PricingProfileCreateOrConnectWithoutCompanyInput = {
    where: PricingProfileWhereUniqueInput
    create: XOR<PricingProfileCreateWithoutCompanyInput, PricingProfileUncheckedCreateWithoutCompanyInput>
  }

  export type PricingProfileCreateManyCompanyInputEnvelope = {
    data: PricingProfileCreateManyCompanyInput | PricingProfileCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type QuoteRequestCreateWithoutCompanyInput = {
    id?: string
    customerName: string
    customerEmail: string
    customerPhone?: string | null
    pickupZip: string
    dropoffZip: string
    distanceMiles: number
    serviceType: string
    packageSize?: string | null
    packageWeight?: string | null
    selectedExtras?: string | null
    status?: string
    estimatedPrice: number
    vehicleCount?: number | null
    awbNumber?: string | null
    paymentStatus?: string | null
    stripePaymentIntentId?: string | null
    internalNotes?: string | null
    paidAt?: Date | string | null
    createdAt?: Date | string
    jobs?: JobCreateNestedManyWithoutQuoteRequestInput
  }

  export type QuoteRequestUncheckedCreateWithoutCompanyInput = {
    id?: string
    customerName: string
    customerEmail: string
    customerPhone?: string | null
    pickupZip: string
    dropoffZip: string
    distanceMiles: number
    serviceType: string
    packageSize?: string | null
    packageWeight?: string | null
    selectedExtras?: string | null
    status?: string
    estimatedPrice: number
    vehicleCount?: number | null
    awbNumber?: string | null
    paymentStatus?: string | null
    stripePaymentIntentId?: string | null
    internalNotes?: string | null
    paidAt?: Date | string | null
    createdAt?: Date | string
    jobs?: JobUncheckedCreateNestedManyWithoutQuoteRequestInput
  }

  export type QuoteRequestCreateOrConnectWithoutCompanyInput = {
    where: QuoteRequestWhereUniqueInput
    create: XOR<QuoteRequestCreateWithoutCompanyInput, QuoteRequestUncheckedCreateWithoutCompanyInput>
  }

  export type QuoteRequestCreateManyCompanyInputEnvelope = {
    data: QuoteRequestCreateManyCompanyInput | QuoteRequestCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type WidgetSettingsCreateWithoutCompanyInput = {
    id?: string
    name?: string
    logoUrl?: string | null
    showWeight?: boolean
    showItemCount?: boolean
    showExtras?: boolean
    insideDeliveryLabel?: string
    addon3Label?: string
    primaryColor?: string
    buttonText?: string
    headerText?: string
    disclaimerText?: string
    companyNameText?: string | null
    companyNameFont?: string
    backgroundImageUrl?: string | null
    mapLayout?: string
    websiteUrl?: string | null
    paymentsEnabled?: boolean
    showVehicles?: boolean
    pricePerVehicle?: number
    showAwb?: boolean
    geoFencingEnabled?: boolean
    serviceZips?: WidgetSettingsCreateserviceZipsInput | string[]
    pricingProfile?: PricingProfileCreateNestedOneWithoutWidgetSettingsInput
  }

  export type WidgetSettingsUncheckedCreateWithoutCompanyInput = {
    id?: string
    name?: string
    logoUrl?: string | null
    showWeight?: boolean
    showItemCount?: boolean
    showExtras?: boolean
    insideDeliveryLabel?: string
    addon3Label?: string
    primaryColor?: string
    buttonText?: string
    headerText?: string
    disclaimerText?: string
    companyNameText?: string | null
    companyNameFont?: string
    backgroundImageUrl?: string | null
    mapLayout?: string
    websiteUrl?: string | null
    paymentsEnabled?: boolean
    showVehicles?: boolean
    pricePerVehicle?: number
    showAwb?: boolean
    geoFencingEnabled?: boolean
    serviceZips?: WidgetSettingsCreateserviceZipsInput | string[]
    pricingProfile?: PricingProfileUncheckedCreateNestedOneWithoutWidgetSettingsInput
  }

  export type WidgetSettingsCreateOrConnectWithoutCompanyInput = {
    where: WidgetSettingsWhereUniqueInput
    create: XOR<WidgetSettingsCreateWithoutCompanyInput, WidgetSettingsUncheckedCreateWithoutCompanyInput>
  }

  export type WidgetSettingsCreateManyCompanyInputEnvelope = {
    data: WidgetSettingsCreateManyCompanyInput | WidgetSettingsCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type WebhookCreateWithoutCompanyInput = {
    id?: string
    url: string
    secret: string
    events?: WebhookCreateeventsInput | string[]
    enabled?: boolean
    createdAt?: Date | string
  }

  export type WebhookUncheckedCreateWithoutCompanyInput = {
    id?: string
    url: string
    secret: string
    events?: WebhookCreateeventsInput | string[]
    enabled?: boolean
    createdAt?: Date | string
  }

  export type WebhookCreateOrConnectWithoutCompanyInput = {
    where: WebhookWhereUniqueInput
    create: XOR<WebhookCreateWithoutCompanyInput, WebhookUncheckedCreateWithoutCompanyInput>
  }

  export type WebhookCreateManyCompanyInputEnvelope = {
    data: WebhookCreateManyCompanyInput | WebhookCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type ShopifyInstallCreateWithoutCompanyInput = {
    id?: string
    shop: string
    accessToken: string
    scriptTagId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShopifyInstallUncheckedCreateWithoutCompanyInput = {
    id?: string
    shop: string
    accessToken: string
    scriptTagId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShopifyInstallCreateOrConnectWithoutCompanyInput = {
    where: ShopifyInstallWhereUniqueInput
    create: XOR<ShopifyInstallCreateWithoutCompanyInput, ShopifyInstallUncheckedCreateWithoutCompanyInput>
  }

  export type ShopifyInstallCreateManyCompanyInputEnvelope = {
    data: ShopifyInstallCreateManyCompanyInput | ShopifyInstallCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type StopNoteCreateWithoutCompanyInput = {
    id?: string
    companyName: string
    address: string
    contactName?: string | null
    contactPhone?: string | null
    gateCode?: string | null
    dockInfo?: string | null
    hours?: string | null
    parkingNotes?: string | null
    accessNotes?: string | null
    deliveryNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    readinessChecks?: ReadinessCheckCreateNestedManyWithoutStopNoteInput
    exceptionLogs?: ExceptionLogCreateNestedManyWithoutStopNoteInput
    jobStops?: JobStopCreateNestedManyWithoutStopNoteInput
  }

  export type StopNoteUncheckedCreateWithoutCompanyInput = {
    id?: string
    companyName: string
    address: string
    contactName?: string | null
    contactPhone?: string | null
    gateCode?: string | null
    dockInfo?: string | null
    hours?: string | null
    parkingNotes?: string | null
    accessNotes?: string | null
    deliveryNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    readinessChecks?: ReadinessCheckUncheckedCreateNestedManyWithoutStopNoteInput
    exceptionLogs?: ExceptionLogUncheckedCreateNestedManyWithoutStopNoteInput
    jobStops?: JobStopUncheckedCreateNestedManyWithoutStopNoteInput
  }

  export type StopNoteCreateOrConnectWithoutCompanyInput = {
    where: StopNoteWhereUniqueInput
    create: XOR<StopNoteCreateWithoutCompanyInput, StopNoteUncheckedCreateWithoutCompanyInput>
  }

  export type StopNoteCreateManyCompanyInputEnvelope = {
    data: StopNoteCreateManyCompanyInput | StopNoteCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type JobCreateWithoutCompanyInput = {
    id?: string
    status?: string
    scheduledDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    quoteRequest?: QuoteRequestCreateNestedOneWithoutJobsInput
    stops?: JobStopCreateNestedManyWithoutJobInput
    readinessChecks?: ReadinessCheckCreateNestedManyWithoutJobInput
    exceptionLogs?: ExceptionLogCreateNestedManyWithoutJobInput
  }

  export type JobUncheckedCreateWithoutCompanyInput = {
    id?: string
    quoteRequestId?: string | null
    status?: string
    scheduledDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    stops?: JobStopUncheckedCreateNestedManyWithoutJobInput
    readinessChecks?: ReadinessCheckUncheckedCreateNestedManyWithoutJobInput
    exceptionLogs?: ExceptionLogUncheckedCreateNestedManyWithoutJobInput
  }

  export type JobCreateOrConnectWithoutCompanyInput = {
    where: JobWhereUniqueInput
    create: XOR<JobCreateWithoutCompanyInput, JobUncheckedCreateWithoutCompanyInput>
  }

  export type JobCreateManyCompanyInputEnvelope = {
    data: JobCreateManyCompanyInput | JobCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type PricingProfileUpsertWithWhereUniqueWithoutCompanyInput = {
    where: PricingProfileWhereUniqueInput
    update: XOR<PricingProfileUpdateWithoutCompanyInput, PricingProfileUncheckedUpdateWithoutCompanyInput>
    create: XOR<PricingProfileCreateWithoutCompanyInput, PricingProfileUncheckedCreateWithoutCompanyInput>
  }

  export type PricingProfileUpdateWithWhereUniqueWithoutCompanyInput = {
    where: PricingProfileWhereUniqueInput
    data: XOR<PricingProfileUpdateWithoutCompanyInput, PricingProfileUncheckedUpdateWithoutCompanyInput>
  }

  export type PricingProfileUpdateManyWithWhereWithoutCompanyInput = {
    where: PricingProfileScalarWhereInput
    data: XOR<PricingProfileUpdateManyMutationInput, PricingProfileUncheckedUpdateManyWithoutCompanyInput>
  }

  export type PricingProfileScalarWhereInput = {
    AND?: PricingProfileScalarWhereInput | PricingProfileScalarWhereInput[]
    OR?: PricingProfileScalarWhereInput[]
    NOT?: PricingProfileScalarWhereInput | PricingProfileScalarWhereInput[]
    id?: StringFilter<"PricingProfile"> | string
    companyId?: StringFilter<"PricingProfile"> | string
    widgetSettingsId?: StringNullableFilter<"PricingProfile"> | string | null
    baseRatePerMile?: FloatFilter<"PricingProfile"> | number
    minimumCharge?: FloatFilter<"PricingProfile"> | number
    useMinimumCharge?: BoolFilter<"PricingProfile"> | boolean
    minMilesThreshold?: FloatFilter<"PricingProfile"> | number
    weightFee?: FloatFilter<"PricingProfile"> | number
    itemCountFee?: FloatFilter<"PricingProfile"> | number
    stairsFee?: FloatFilter<"PricingProfile"> | number
    insideDeliveryFee?: FloatFilter<"PricingProfile"> | number
    addon3Fee?: FloatFilter<"PricingProfile"> | number
    afterHoursFee?: FloatFilter<"PricingProfile"> | number
    businessHoursStart?: StringFilter<"PricingProfile"> | string
    businessHoursEnd?: StringFilter<"PricingProfile"> | string
    businessDays?: StringFilter<"PricingProfile"> | string
    largeItemFee?: FloatFilter<"PricingProfile"> | number
    largeItemsEnabled?: BoolFilter<"PricingProfile"> | boolean
    largeItemCategories?: JsonFilter<"PricingProfile">
  }

  export type QuoteRequestUpsertWithWhereUniqueWithoutCompanyInput = {
    where: QuoteRequestWhereUniqueInput
    update: XOR<QuoteRequestUpdateWithoutCompanyInput, QuoteRequestUncheckedUpdateWithoutCompanyInput>
    create: XOR<QuoteRequestCreateWithoutCompanyInput, QuoteRequestUncheckedCreateWithoutCompanyInput>
  }

  export type QuoteRequestUpdateWithWhereUniqueWithoutCompanyInput = {
    where: QuoteRequestWhereUniqueInput
    data: XOR<QuoteRequestUpdateWithoutCompanyInput, QuoteRequestUncheckedUpdateWithoutCompanyInput>
  }

  export type QuoteRequestUpdateManyWithWhereWithoutCompanyInput = {
    where: QuoteRequestScalarWhereInput
    data: XOR<QuoteRequestUpdateManyMutationInput, QuoteRequestUncheckedUpdateManyWithoutCompanyInput>
  }

  export type QuoteRequestScalarWhereInput = {
    AND?: QuoteRequestScalarWhereInput | QuoteRequestScalarWhereInput[]
    OR?: QuoteRequestScalarWhereInput[]
    NOT?: QuoteRequestScalarWhereInput | QuoteRequestScalarWhereInput[]
    id?: StringFilter<"QuoteRequest"> | string
    companyId?: StringFilter<"QuoteRequest"> | string
    customerName?: StringFilter<"QuoteRequest"> | string
    customerEmail?: StringFilter<"QuoteRequest"> | string
    customerPhone?: StringNullableFilter<"QuoteRequest"> | string | null
    pickupZip?: StringFilter<"QuoteRequest"> | string
    dropoffZip?: StringFilter<"QuoteRequest"> | string
    distanceMiles?: FloatFilter<"QuoteRequest"> | number
    serviceType?: StringFilter<"QuoteRequest"> | string
    packageSize?: StringNullableFilter<"QuoteRequest"> | string | null
    packageWeight?: StringNullableFilter<"QuoteRequest"> | string | null
    selectedExtras?: StringNullableFilter<"QuoteRequest"> | string | null
    status?: StringFilter<"QuoteRequest"> | string
    estimatedPrice?: FloatFilter<"QuoteRequest"> | number
    vehicleCount?: IntNullableFilter<"QuoteRequest"> | number | null
    awbNumber?: StringNullableFilter<"QuoteRequest"> | string | null
    paymentStatus?: StringNullableFilter<"QuoteRequest"> | string | null
    stripePaymentIntentId?: StringNullableFilter<"QuoteRequest"> | string | null
    internalNotes?: StringNullableFilter<"QuoteRequest"> | string | null
    paidAt?: DateTimeNullableFilter<"QuoteRequest"> | Date | string | null
    createdAt?: DateTimeFilter<"QuoteRequest"> | Date | string
  }

  export type WidgetSettingsUpsertWithWhereUniqueWithoutCompanyInput = {
    where: WidgetSettingsWhereUniqueInput
    update: XOR<WidgetSettingsUpdateWithoutCompanyInput, WidgetSettingsUncheckedUpdateWithoutCompanyInput>
    create: XOR<WidgetSettingsCreateWithoutCompanyInput, WidgetSettingsUncheckedCreateWithoutCompanyInput>
  }

  export type WidgetSettingsUpdateWithWhereUniqueWithoutCompanyInput = {
    where: WidgetSettingsWhereUniqueInput
    data: XOR<WidgetSettingsUpdateWithoutCompanyInput, WidgetSettingsUncheckedUpdateWithoutCompanyInput>
  }

  export type WidgetSettingsUpdateManyWithWhereWithoutCompanyInput = {
    where: WidgetSettingsScalarWhereInput
    data: XOR<WidgetSettingsUpdateManyMutationInput, WidgetSettingsUncheckedUpdateManyWithoutCompanyInput>
  }

  export type WidgetSettingsScalarWhereInput = {
    AND?: WidgetSettingsScalarWhereInput | WidgetSettingsScalarWhereInput[]
    OR?: WidgetSettingsScalarWhereInput[]
    NOT?: WidgetSettingsScalarWhereInput | WidgetSettingsScalarWhereInput[]
    id?: StringFilter<"WidgetSettings"> | string
    companyId?: StringFilter<"WidgetSettings"> | string
    name?: StringFilter<"WidgetSettings"> | string
    logoUrl?: StringNullableFilter<"WidgetSettings"> | string | null
    showWeight?: BoolFilter<"WidgetSettings"> | boolean
    showItemCount?: BoolFilter<"WidgetSettings"> | boolean
    showExtras?: BoolFilter<"WidgetSettings"> | boolean
    insideDeliveryLabel?: StringFilter<"WidgetSettings"> | string
    addon3Label?: StringFilter<"WidgetSettings"> | string
    primaryColor?: StringFilter<"WidgetSettings"> | string
    buttonText?: StringFilter<"WidgetSettings"> | string
    headerText?: StringFilter<"WidgetSettings"> | string
    disclaimerText?: StringFilter<"WidgetSettings"> | string
    companyNameText?: StringNullableFilter<"WidgetSettings"> | string | null
    companyNameFont?: StringFilter<"WidgetSettings"> | string
    backgroundImageUrl?: StringNullableFilter<"WidgetSettings"> | string | null
    mapLayout?: StringFilter<"WidgetSettings"> | string
    websiteUrl?: StringNullableFilter<"WidgetSettings"> | string | null
    paymentsEnabled?: BoolFilter<"WidgetSettings"> | boolean
    showVehicles?: BoolFilter<"WidgetSettings"> | boolean
    pricePerVehicle?: FloatFilter<"WidgetSettings"> | number
    showAwb?: BoolFilter<"WidgetSettings"> | boolean
    geoFencingEnabled?: BoolFilter<"WidgetSettings"> | boolean
    serviceZips?: StringNullableListFilter<"WidgetSettings">
  }

  export type WebhookUpsertWithWhereUniqueWithoutCompanyInput = {
    where: WebhookWhereUniqueInput
    update: XOR<WebhookUpdateWithoutCompanyInput, WebhookUncheckedUpdateWithoutCompanyInput>
    create: XOR<WebhookCreateWithoutCompanyInput, WebhookUncheckedCreateWithoutCompanyInput>
  }

  export type WebhookUpdateWithWhereUniqueWithoutCompanyInput = {
    where: WebhookWhereUniqueInput
    data: XOR<WebhookUpdateWithoutCompanyInput, WebhookUncheckedUpdateWithoutCompanyInput>
  }

  export type WebhookUpdateManyWithWhereWithoutCompanyInput = {
    where: WebhookScalarWhereInput
    data: XOR<WebhookUpdateManyMutationInput, WebhookUncheckedUpdateManyWithoutCompanyInput>
  }

  export type WebhookScalarWhereInput = {
    AND?: WebhookScalarWhereInput | WebhookScalarWhereInput[]
    OR?: WebhookScalarWhereInput[]
    NOT?: WebhookScalarWhereInput | WebhookScalarWhereInput[]
    id?: StringFilter<"Webhook"> | string
    companyId?: StringFilter<"Webhook"> | string
    url?: StringFilter<"Webhook"> | string
    secret?: StringFilter<"Webhook"> | string
    events?: StringNullableListFilter<"Webhook">
    enabled?: BoolFilter<"Webhook"> | boolean
    createdAt?: DateTimeFilter<"Webhook"> | Date | string
  }

  export type ShopifyInstallUpsertWithWhereUniqueWithoutCompanyInput = {
    where: ShopifyInstallWhereUniqueInput
    update: XOR<ShopifyInstallUpdateWithoutCompanyInput, ShopifyInstallUncheckedUpdateWithoutCompanyInput>
    create: XOR<ShopifyInstallCreateWithoutCompanyInput, ShopifyInstallUncheckedCreateWithoutCompanyInput>
  }

  export type ShopifyInstallUpdateWithWhereUniqueWithoutCompanyInput = {
    where: ShopifyInstallWhereUniqueInput
    data: XOR<ShopifyInstallUpdateWithoutCompanyInput, ShopifyInstallUncheckedUpdateWithoutCompanyInput>
  }

  export type ShopifyInstallUpdateManyWithWhereWithoutCompanyInput = {
    where: ShopifyInstallScalarWhereInput
    data: XOR<ShopifyInstallUpdateManyMutationInput, ShopifyInstallUncheckedUpdateManyWithoutCompanyInput>
  }

  export type ShopifyInstallScalarWhereInput = {
    AND?: ShopifyInstallScalarWhereInput | ShopifyInstallScalarWhereInput[]
    OR?: ShopifyInstallScalarWhereInput[]
    NOT?: ShopifyInstallScalarWhereInput | ShopifyInstallScalarWhereInput[]
    id?: StringFilter<"ShopifyInstall"> | string
    shop?: StringFilter<"ShopifyInstall"> | string
    accessToken?: StringFilter<"ShopifyInstall"> | string
    companyId?: StringNullableFilter<"ShopifyInstall"> | string | null
    scriptTagId?: StringNullableFilter<"ShopifyInstall"> | string | null
    createdAt?: DateTimeFilter<"ShopifyInstall"> | Date | string
    updatedAt?: DateTimeFilter<"ShopifyInstall"> | Date | string
  }

  export type StopNoteUpsertWithWhereUniqueWithoutCompanyInput = {
    where: StopNoteWhereUniqueInput
    update: XOR<StopNoteUpdateWithoutCompanyInput, StopNoteUncheckedUpdateWithoutCompanyInput>
    create: XOR<StopNoteCreateWithoutCompanyInput, StopNoteUncheckedCreateWithoutCompanyInput>
  }

  export type StopNoteUpdateWithWhereUniqueWithoutCompanyInput = {
    where: StopNoteWhereUniqueInput
    data: XOR<StopNoteUpdateWithoutCompanyInput, StopNoteUncheckedUpdateWithoutCompanyInput>
  }

  export type StopNoteUpdateManyWithWhereWithoutCompanyInput = {
    where: StopNoteScalarWhereInput
    data: XOR<StopNoteUpdateManyMutationInput, StopNoteUncheckedUpdateManyWithoutCompanyInput>
  }

  export type StopNoteScalarWhereInput = {
    AND?: StopNoteScalarWhereInput | StopNoteScalarWhereInput[]
    OR?: StopNoteScalarWhereInput[]
    NOT?: StopNoteScalarWhereInput | StopNoteScalarWhereInput[]
    id?: StringFilter<"StopNote"> | string
    companyId?: StringFilter<"StopNote"> | string
    companyName?: StringFilter<"StopNote"> | string
    address?: StringFilter<"StopNote"> | string
    contactName?: StringNullableFilter<"StopNote"> | string | null
    contactPhone?: StringNullableFilter<"StopNote"> | string | null
    gateCode?: StringNullableFilter<"StopNote"> | string | null
    dockInfo?: StringNullableFilter<"StopNote"> | string | null
    hours?: StringNullableFilter<"StopNote"> | string | null
    parkingNotes?: StringNullableFilter<"StopNote"> | string | null
    accessNotes?: StringNullableFilter<"StopNote"> | string | null
    deliveryNotes?: StringNullableFilter<"StopNote"> | string | null
    createdAt?: DateTimeFilter<"StopNote"> | Date | string
    updatedAt?: DateTimeFilter<"StopNote"> | Date | string
  }

  export type JobUpsertWithWhereUniqueWithoutCompanyInput = {
    where: JobWhereUniqueInput
    update: XOR<JobUpdateWithoutCompanyInput, JobUncheckedUpdateWithoutCompanyInput>
    create: XOR<JobCreateWithoutCompanyInput, JobUncheckedCreateWithoutCompanyInput>
  }

  export type JobUpdateWithWhereUniqueWithoutCompanyInput = {
    where: JobWhereUniqueInput
    data: XOR<JobUpdateWithoutCompanyInput, JobUncheckedUpdateWithoutCompanyInput>
  }

  export type JobUpdateManyWithWhereWithoutCompanyInput = {
    where: JobScalarWhereInput
    data: XOR<JobUpdateManyMutationInput, JobUncheckedUpdateManyWithoutCompanyInput>
  }

  export type JobScalarWhereInput = {
    AND?: JobScalarWhereInput | JobScalarWhereInput[]
    OR?: JobScalarWhereInput[]
    NOT?: JobScalarWhereInput | JobScalarWhereInput[]
    id?: StringFilter<"Job"> | string
    companyId?: StringFilter<"Job"> | string
    quoteRequestId?: StringNullableFilter<"Job"> | string | null
    status?: StringFilter<"Job"> | string
    scheduledDate?: DateTimeFilter<"Job"> | Date | string
    createdAt?: DateTimeFilter<"Job"> | Date | string
    updatedAt?: DateTimeFilter<"Job"> | Date | string
  }

  export type CompanyCreateWithoutPricingProfilesInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    logoUrl?: string | null
    profilePicUrl?: string | null
    phone?: string | null
    website?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    zip?: string | null
    contactName?: string | null
    timezone?: string
    subscriptionPlan?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripeConnectAccountId?: string | null
    trialEndsAt?: Date | string | null
    emailVerified?: boolean
    emailVerificationToken?: string | null
    customEmailDomain?: string | null
    customEmailFromName?: string | null
    resendDomainId?: string | null
    emailDomainVerified?: boolean
    emailDomainDnsRecords?: NullableJsonNullValueInput | InputJsonValue
    isAdmin?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    quoteRequests?: QuoteRequestCreateNestedManyWithoutCompanyInput
    widgetSettings?: WidgetSettingsCreateNestedManyWithoutCompanyInput
    webhooks?: WebhookCreateNestedManyWithoutCompanyInput
    shopifyInstalls?: ShopifyInstallCreateNestedManyWithoutCompanyInput
    stopNotes?: StopNoteCreateNestedManyWithoutCompanyInput
    jobs?: JobCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutPricingProfilesInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    logoUrl?: string | null
    profilePicUrl?: string | null
    phone?: string | null
    website?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    zip?: string | null
    contactName?: string | null
    timezone?: string
    subscriptionPlan?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripeConnectAccountId?: string | null
    trialEndsAt?: Date | string | null
    emailVerified?: boolean
    emailVerificationToken?: string | null
    customEmailDomain?: string | null
    customEmailFromName?: string | null
    resendDomainId?: string | null
    emailDomainVerified?: boolean
    emailDomainDnsRecords?: NullableJsonNullValueInput | InputJsonValue
    isAdmin?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    quoteRequests?: QuoteRequestUncheckedCreateNestedManyWithoutCompanyInput
    widgetSettings?: WidgetSettingsUncheckedCreateNestedManyWithoutCompanyInput
    webhooks?: WebhookUncheckedCreateNestedManyWithoutCompanyInput
    shopifyInstalls?: ShopifyInstallUncheckedCreateNestedManyWithoutCompanyInput
    stopNotes?: StopNoteUncheckedCreateNestedManyWithoutCompanyInput
    jobs?: JobUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutPricingProfilesInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutPricingProfilesInput, CompanyUncheckedCreateWithoutPricingProfilesInput>
  }

  export type WidgetSettingsCreateWithoutPricingProfileInput = {
    id?: string
    name?: string
    logoUrl?: string | null
    showWeight?: boolean
    showItemCount?: boolean
    showExtras?: boolean
    insideDeliveryLabel?: string
    addon3Label?: string
    primaryColor?: string
    buttonText?: string
    headerText?: string
    disclaimerText?: string
    companyNameText?: string | null
    companyNameFont?: string
    backgroundImageUrl?: string | null
    mapLayout?: string
    websiteUrl?: string | null
    paymentsEnabled?: boolean
    showVehicles?: boolean
    pricePerVehicle?: number
    showAwb?: boolean
    geoFencingEnabled?: boolean
    serviceZips?: WidgetSettingsCreateserviceZipsInput | string[]
    company: CompanyCreateNestedOneWithoutWidgetSettingsInput
  }

  export type WidgetSettingsUncheckedCreateWithoutPricingProfileInput = {
    id?: string
    companyId: string
    name?: string
    logoUrl?: string | null
    showWeight?: boolean
    showItemCount?: boolean
    showExtras?: boolean
    insideDeliveryLabel?: string
    addon3Label?: string
    primaryColor?: string
    buttonText?: string
    headerText?: string
    disclaimerText?: string
    companyNameText?: string | null
    companyNameFont?: string
    backgroundImageUrl?: string | null
    mapLayout?: string
    websiteUrl?: string | null
    paymentsEnabled?: boolean
    showVehicles?: boolean
    pricePerVehicle?: number
    showAwb?: boolean
    geoFencingEnabled?: boolean
    serviceZips?: WidgetSettingsCreateserviceZipsInput | string[]
  }

  export type WidgetSettingsCreateOrConnectWithoutPricingProfileInput = {
    where: WidgetSettingsWhereUniqueInput
    create: XOR<WidgetSettingsCreateWithoutPricingProfileInput, WidgetSettingsUncheckedCreateWithoutPricingProfileInput>
  }

  export type CompanyUpsertWithoutPricingProfilesInput = {
    update: XOR<CompanyUpdateWithoutPricingProfilesInput, CompanyUncheckedUpdateWithoutPricingProfilesInput>
    create: XOR<CompanyCreateWithoutPricingProfilesInput, CompanyUncheckedCreateWithoutPricingProfilesInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutPricingProfilesInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutPricingProfilesInput, CompanyUncheckedUpdateWithoutPricingProfilesInput>
  }

  export type CompanyUpdateWithoutPricingProfilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeConnectAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    customEmailDomain?: NullableStringFieldUpdateOperationsInput | string | null
    customEmailFromName?: NullableStringFieldUpdateOperationsInput | string | null
    resendDomainId?: NullableStringFieldUpdateOperationsInput | string | null
    emailDomainVerified?: BoolFieldUpdateOperationsInput | boolean
    emailDomainDnsRecords?: NullableJsonNullValueInput | InputJsonValue
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quoteRequests?: QuoteRequestUpdateManyWithoutCompanyNestedInput
    widgetSettings?: WidgetSettingsUpdateManyWithoutCompanyNestedInput
    webhooks?: WebhookUpdateManyWithoutCompanyNestedInput
    shopifyInstalls?: ShopifyInstallUpdateManyWithoutCompanyNestedInput
    stopNotes?: StopNoteUpdateManyWithoutCompanyNestedInput
    jobs?: JobUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutPricingProfilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeConnectAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    customEmailDomain?: NullableStringFieldUpdateOperationsInput | string | null
    customEmailFromName?: NullableStringFieldUpdateOperationsInput | string | null
    resendDomainId?: NullableStringFieldUpdateOperationsInput | string | null
    emailDomainVerified?: BoolFieldUpdateOperationsInput | boolean
    emailDomainDnsRecords?: NullableJsonNullValueInput | InputJsonValue
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quoteRequests?: QuoteRequestUncheckedUpdateManyWithoutCompanyNestedInput
    widgetSettings?: WidgetSettingsUncheckedUpdateManyWithoutCompanyNestedInput
    webhooks?: WebhookUncheckedUpdateManyWithoutCompanyNestedInput
    shopifyInstalls?: ShopifyInstallUncheckedUpdateManyWithoutCompanyNestedInput
    stopNotes?: StopNoteUncheckedUpdateManyWithoutCompanyNestedInput
    jobs?: JobUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type WidgetSettingsUpsertWithoutPricingProfileInput = {
    update: XOR<WidgetSettingsUpdateWithoutPricingProfileInput, WidgetSettingsUncheckedUpdateWithoutPricingProfileInput>
    create: XOR<WidgetSettingsCreateWithoutPricingProfileInput, WidgetSettingsUncheckedCreateWithoutPricingProfileInput>
    where?: WidgetSettingsWhereInput
  }

  export type WidgetSettingsUpdateToOneWithWhereWithoutPricingProfileInput = {
    where?: WidgetSettingsWhereInput
    data: XOR<WidgetSettingsUpdateWithoutPricingProfileInput, WidgetSettingsUncheckedUpdateWithoutPricingProfileInput>
  }

  export type WidgetSettingsUpdateWithoutPricingProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    showWeight?: BoolFieldUpdateOperationsInput | boolean
    showItemCount?: BoolFieldUpdateOperationsInput | boolean
    showExtras?: BoolFieldUpdateOperationsInput | boolean
    insideDeliveryLabel?: StringFieldUpdateOperationsInput | string
    addon3Label?: StringFieldUpdateOperationsInput | string
    primaryColor?: StringFieldUpdateOperationsInput | string
    buttonText?: StringFieldUpdateOperationsInput | string
    headerText?: StringFieldUpdateOperationsInput | string
    disclaimerText?: StringFieldUpdateOperationsInput | string
    companyNameText?: NullableStringFieldUpdateOperationsInput | string | null
    companyNameFont?: StringFieldUpdateOperationsInput | string
    backgroundImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mapLayout?: StringFieldUpdateOperationsInput | string
    websiteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paymentsEnabled?: BoolFieldUpdateOperationsInput | boolean
    showVehicles?: BoolFieldUpdateOperationsInput | boolean
    pricePerVehicle?: FloatFieldUpdateOperationsInput | number
    showAwb?: BoolFieldUpdateOperationsInput | boolean
    geoFencingEnabled?: BoolFieldUpdateOperationsInput | boolean
    serviceZips?: WidgetSettingsUpdateserviceZipsInput | string[]
    company?: CompanyUpdateOneRequiredWithoutWidgetSettingsNestedInput
  }

  export type WidgetSettingsUncheckedUpdateWithoutPricingProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    showWeight?: BoolFieldUpdateOperationsInput | boolean
    showItemCount?: BoolFieldUpdateOperationsInput | boolean
    showExtras?: BoolFieldUpdateOperationsInput | boolean
    insideDeliveryLabel?: StringFieldUpdateOperationsInput | string
    addon3Label?: StringFieldUpdateOperationsInput | string
    primaryColor?: StringFieldUpdateOperationsInput | string
    buttonText?: StringFieldUpdateOperationsInput | string
    headerText?: StringFieldUpdateOperationsInput | string
    disclaimerText?: StringFieldUpdateOperationsInput | string
    companyNameText?: NullableStringFieldUpdateOperationsInput | string | null
    companyNameFont?: StringFieldUpdateOperationsInput | string
    backgroundImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mapLayout?: StringFieldUpdateOperationsInput | string
    websiteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paymentsEnabled?: BoolFieldUpdateOperationsInput | boolean
    showVehicles?: BoolFieldUpdateOperationsInput | boolean
    pricePerVehicle?: FloatFieldUpdateOperationsInput | number
    showAwb?: BoolFieldUpdateOperationsInput | boolean
    geoFencingEnabled?: BoolFieldUpdateOperationsInput | boolean
    serviceZips?: WidgetSettingsUpdateserviceZipsInput | string[]
  }

  export type CompanyCreateWithoutWidgetSettingsInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    logoUrl?: string | null
    profilePicUrl?: string | null
    phone?: string | null
    website?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    zip?: string | null
    contactName?: string | null
    timezone?: string
    subscriptionPlan?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripeConnectAccountId?: string | null
    trialEndsAt?: Date | string | null
    emailVerified?: boolean
    emailVerificationToken?: string | null
    customEmailDomain?: string | null
    customEmailFromName?: string | null
    resendDomainId?: string | null
    emailDomainVerified?: boolean
    emailDomainDnsRecords?: NullableJsonNullValueInput | InputJsonValue
    isAdmin?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    pricingProfiles?: PricingProfileCreateNestedManyWithoutCompanyInput
    quoteRequests?: QuoteRequestCreateNestedManyWithoutCompanyInput
    webhooks?: WebhookCreateNestedManyWithoutCompanyInput
    shopifyInstalls?: ShopifyInstallCreateNestedManyWithoutCompanyInput
    stopNotes?: StopNoteCreateNestedManyWithoutCompanyInput
    jobs?: JobCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutWidgetSettingsInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    logoUrl?: string | null
    profilePicUrl?: string | null
    phone?: string | null
    website?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    zip?: string | null
    contactName?: string | null
    timezone?: string
    subscriptionPlan?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripeConnectAccountId?: string | null
    trialEndsAt?: Date | string | null
    emailVerified?: boolean
    emailVerificationToken?: string | null
    customEmailDomain?: string | null
    customEmailFromName?: string | null
    resendDomainId?: string | null
    emailDomainVerified?: boolean
    emailDomainDnsRecords?: NullableJsonNullValueInput | InputJsonValue
    isAdmin?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    pricingProfiles?: PricingProfileUncheckedCreateNestedManyWithoutCompanyInput
    quoteRequests?: QuoteRequestUncheckedCreateNestedManyWithoutCompanyInput
    webhooks?: WebhookUncheckedCreateNestedManyWithoutCompanyInput
    shopifyInstalls?: ShopifyInstallUncheckedCreateNestedManyWithoutCompanyInput
    stopNotes?: StopNoteUncheckedCreateNestedManyWithoutCompanyInput
    jobs?: JobUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutWidgetSettingsInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutWidgetSettingsInput, CompanyUncheckedCreateWithoutWidgetSettingsInput>
  }

  export type PricingProfileCreateWithoutWidgetSettingsInput = {
    id?: string
    baseRatePerMile?: number
    minimumCharge?: number
    useMinimumCharge?: boolean
    minMilesThreshold?: number
    weightFee?: number
    itemCountFee?: number
    stairsFee?: number
    insideDeliveryFee?: number
    addon3Fee?: number
    afterHoursFee?: number
    businessHoursStart?: string
    businessHoursEnd?: string
    businessDays?: string
    largeItemFee?: number
    largeItemsEnabled?: boolean
    largeItemCategories?: JsonNullValueInput | InputJsonValue
    company: CompanyCreateNestedOneWithoutPricingProfilesInput
  }

  export type PricingProfileUncheckedCreateWithoutWidgetSettingsInput = {
    id?: string
    companyId: string
    baseRatePerMile?: number
    minimumCharge?: number
    useMinimumCharge?: boolean
    minMilesThreshold?: number
    weightFee?: number
    itemCountFee?: number
    stairsFee?: number
    insideDeliveryFee?: number
    addon3Fee?: number
    afterHoursFee?: number
    businessHoursStart?: string
    businessHoursEnd?: string
    businessDays?: string
    largeItemFee?: number
    largeItemsEnabled?: boolean
    largeItemCategories?: JsonNullValueInput | InputJsonValue
  }

  export type PricingProfileCreateOrConnectWithoutWidgetSettingsInput = {
    where: PricingProfileWhereUniqueInput
    create: XOR<PricingProfileCreateWithoutWidgetSettingsInput, PricingProfileUncheckedCreateWithoutWidgetSettingsInput>
  }

  export type CompanyUpsertWithoutWidgetSettingsInput = {
    update: XOR<CompanyUpdateWithoutWidgetSettingsInput, CompanyUncheckedUpdateWithoutWidgetSettingsInput>
    create: XOR<CompanyCreateWithoutWidgetSettingsInput, CompanyUncheckedCreateWithoutWidgetSettingsInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutWidgetSettingsInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutWidgetSettingsInput, CompanyUncheckedUpdateWithoutWidgetSettingsInput>
  }

  export type CompanyUpdateWithoutWidgetSettingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeConnectAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    customEmailDomain?: NullableStringFieldUpdateOperationsInput | string | null
    customEmailFromName?: NullableStringFieldUpdateOperationsInput | string | null
    resendDomainId?: NullableStringFieldUpdateOperationsInput | string | null
    emailDomainVerified?: BoolFieldUpdateOperationsInput | boolean
    emailDomainDnsRecords?: NullableJsonNullValueInput | InputJsonValue
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pricingProfiles?: PricingProfileUpdateManyWithoutCompanyNestedInput
    quoteRequests?: QuoteRequestUpdateManyWithoutCompanyNestedInput
    webhooks?: WebhookUpdateManyWithoutCompanyNestedInput
    shopifyInstalls?: ShopifyInstallUpdateManyWithoutCompanyNestedInput
    stopNotes?: StopNoteUpdateManyWithoutCompanyNestedInput
    jobs?: JobUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutWidgetSettingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeConnectAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    customEmailDomain?: NullableStringFieldUpdateOperationsInput | string | null
    customEmailFromName?: NullableStringFieldUpdateOperationsInput | string | null
    resendDomainId?: NullableStringFieldUpdateOperationsInput | string | null
    emailDomainVerified?: BoolFieldUpdateOperationsInput | boolean
    emailDomainDnsRecords?: NullableJsonNullValueInput | InputJsonValue
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pricingProfiles?: PricingProfileUncheckedUpdateManyWithoutCompanyNestedInput
    quoteRequests?: QuoteRequestUncheckedUpdateManyWithoutCompanyNestedInput
    webhooks?: WebhookUncheckedUpdateManyWithoutCompanyNestedInput
    shopifyInstalls?: ShopifyInstallUncheckedUpdateManyWithoutCompanyNestedInput
    stopNotes?: StopNoteUncheckedUpdateManyWithoutCompanyNestedInput
    jobs?: JobUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type PricingProfileUpsertWithoutWidgetSettingsInput = {
    update: XOR<PricingProfileUpdateWithoutWidgetSettingsInput, PricingProfileUncheckedUpdateWithoutWidgetSettingsInput>
    create: XOR<PricingProfileCreateWithoutWidgetSettingsInput, PricingProfileUncheckedCreateWithoutWidgetSettingsInput>
    where?: PricingProfileWhereInput
  }

  export type PricingProfileUpdateToOneWithWhereWithoutWidgetSettingsInput = {
    where?: PricingProfileWhereInput
    data: XOR<PricingProfileUpdateWithoutWidgetSettingsInput, PricingProfileUncheckedUpdateWithoutWidgetSettingsInput>
  }

  export type PricingProfileUpdateWithoutWidgetSettingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    baseRatePerMile?: FloatFieldUpdateOperationsInput | number
    minimumCharge?: FloatFieldUpdateOperationsInput | number
    useMinimumCharge?: BoolFieldUpdateOperationsInput | boolean
    minMilesThreshold?: FloatFieldUpdateOperationsInput | number
    weightFee?: FloatFieldUpdateOperationsInput | number
    itemCountFee?: FloatFieldUpdateOperationsInput | number
    stairsFee?: FloatFieldUpdateOperationsInput | number
    insideDeliveryFee?: FloatFieldUpdateOperationsInput | number
    addon3Fee?: FloatFieldUpdateOperationsInput | number
    afterHoursFee?: FloatFieldUpdateOperationsInput | number
    businessHoursStart?: StringFieldUpdateOperationsInput | string
    businessHoursEnd?: StringFieldUpdateOperationsInput | string
    businessDays?: StringFieldUpdateOperationsInput | string
    largeItemFee?: FloatFieldUpdateOperationsInput | number
    largeItemsEnabled?: BoolFieldUpdateOperationsInput | boolean
    largeItemCategories?: JsonNullValueInput | InputJsonValue
    company?: CompanyUpdateOneRequiredWithoutPricingProfilesNestedInput
  }

  export type PricingProfileUncheckedUpdateWithoutWidgetSettingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    baseRatePerMile?: FloatFieldUpdateOperationsInput | number
    minimumCharge?: FloatFieldUpdateOperationsInput | number
    useMinimumCharge?: BoolFieldUpdateOperationsInput | boolean
    minMilesThreshold?: FloatFieldUpdateOperationsInput | number
    weightFee?: FloatFieldUpdateOperationsInput | number
    itemCountFee?: FloatFieldUpdateOperationsInput | number
    stairsFee?: FloatFieldUpdateOperationsInput | number
    insideDeliveryFee?: FloatFieldUpdateOperationsInput | number
    addon3Fee?: FloatFieldUpdateOperationsInput | number
    afterHoursFee?: FloatFieldUpdateOperationsInput | number
    businessHoursStart?: StringFieldUpdateOperationsInput | string
    businessHoursEnd?: StringFieldUpdateOperationsInput | string
    businessDays?: StringFieldUpdateOperationsInput | string
    largeItemFee?: FloatFieldUpdateOperationsInput | number
    largeItemsEnabled?: BoolFieldUpdateOperationsInput | boolean
    largeItemCategories?: JsonNullValueInput | InputJsonValue
  }

  export type CompanyCreateWithoutQuoteRequestsInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    logoUrl?: string | null
    profilePicUrl?: string | null
    phone?: string | null
    website?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    zip?: string | null
    contactName?: string | null
    timezone?: string
    subscriptionPlan?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripeConnectAccountId?: string | null
    trialEndsAt?: Date | string | null
    emailVerified?: boolean
    emailVerificationToken?: string | null
    customEmailDomain?: string | null
    customEmailFromName?: string | null
    resendDomainId?: string | null
    emailDomainVerified?: boolean
    emailDomainDnsRecords?: NullableJsonNullValueInput | InputJsonValue
    isAdmin?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    pricingProfiles?: PricingProfileCreateNestedManyWithoutCompanyInput
    widgetSettings?: WidgetSettingsCreateNestedManyWithoutCompanyInput
    webhooks?: WebhookCreateNestedManyWithoutCompanyInput
    shopifyInstalls?: ShopifyInstallCreateNestedManyWithoutCompanyInput
    stopNotes?: StopNoteCreateNestedManyWithoutCompanyInput
    jobs?: JobCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutQuoteRequestsInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    logoUrl?: string | null
    profilePicUrl?: string | null
    phone?: string | null
    website?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    zip?: string | null
    contactName?: string | null
    timezone?: string
    subscriptionPlan?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripeConnectAccountId?: string | null
    trialEndsAt?: Date | string | null
    emailVerified?: boolean
    emailVerificationToken?: string | null
    customEmailDomain?: string | null
    customEmailFromName?: string | null
    resendDomainId?: string | null
    emailDomainVerified?: boolean
    emailDomainDnsRecords?: NullableJsonNullValueInput | InputJsonValue
    isAdmin?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    pricingProfiles?: PricingProfileUncheckedCreateNestedManyWithoutCompanyInput
    widgetSettings?: WidgetSettingsUncheckedCreateNestedManyWithoutCompanyInput
    webhooks?: WebhookUncheckedCreateNestedManyWithoutCompanyInput
    shopifyInstalls?: ShopifyInstallUncheckedCreateNestedManyWithoutCompanyInput
    stopNotes?: StopNoteUncheckedCreateNestedManyWithoutCompanyInput
    jobs?: JobUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutQuoteRequestsInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutQuoteRequestsInput, CompanyUncheckedCreateWithoutQuoteRequestsInput>
  }

  export type JobCreateWithoutQuoteRequestInput = {
    id?: string
    status?: string
    scheduledDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutJobsInput
    stops?: JobStopCreateNestedManyWithoutJobInput
    readinessChecks?: ReadinessCheckCreateNestedManyWithoutJobInput
    exceptionLogs?: ExceptionLogCreateNestedManyWithoutJobInput
  }

  export type JobUncheckedCreateWithoutQuoteRequestInput = {
    id?: string
    companyId: string
    status?: string
    scheduledDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    stops?: JobStopUncheckedCreateNestedManyWithoutJobInput
    readinessChecks?: ReadinessCheckUncheckedCreateNestedManyWithoutJobInput
    exceptionLogs?: ExceptionLogUncheckedCreateNestedManyWithoutJobInput
  }

  export type JobCreateOrConnectWithoutQuoteRequestInput = {
    where: JobWhereUniqueInput
    create: XOR<JobCreateWithoutQuoteRequestInput, JobUncheckedCreateWithoutQuoteRequestInput>
  }

  export type JobCreateManyQuoteRequestInputEnvelope = {
    data: JobCreateManyQuoteRequestInput | JobCreateManyQuoteRequestInput[]
    skipDuplicates?: boolean
  }

  export type CompanyUpsertWithoutQuoteRequestsInput = {
    update: XOR<CompanyUpdateWithoutQuoteRequestsInput, CompanyUncheckedUpdateWithoutQuoteRequestsInput>
    create: XOR<CompanyCreateWithoutQuoteRequestsInput, CompanyUncheckedCreateWithoutQuoteRequestsInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutQuoteRequestsInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutQuoteRequestsInput, CompanyUncheckedUpdateWithoutQuoteRequestsInput>
  }

  export type CompanyUpdateWithoutQuoteRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeConnectAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    customEmailDomain?: NullableStringFieldUpdateOperationsInput | string | null
    customEmailFromName?: NullableStringFieldUpdateOperationsInput | string | null
    resendDomainId?: NullableStringFieldUpdateOperationsInput | string | null
    emailDomainVerified?: BoolFieldUpdateOperationsInput | boolean
    emailDomainDnsRecords?: NullableJsonNullValueInput | InputJsonValue
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pricingProfiles?: PricingProfileUpdateManyWithoutCompanyNestedInput
    widgetSettings?: WidgetSettingsUpdateManyWithoutCompanyNestedInput
    webhooks?: WebhookUpdateManyWithoutCompanyNestedInput
    shopifyInstalls?: ShopifyInstallUpdateManyWithoutCompanyNestedInput
    stopNotes?: StopNoteUpdateManyWithoutCompanyNestedInput
    jobs?: JobUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutQuoteRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeConnectAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    customEmailDomain?: NullableStringFieldUpdateOperationsInput | string | null
    customEmailFromName?: NullableStringFieldUpdateOperationsInput | string | null
    resendDomainId?: NullableStringFieldUpdateOperationsInput | string | null
    emailDomainVerified?: BoolFieldUpdateOperationsInput | boolean
    emailDomainDnsRecords?: NullableJsonNullValueInput | InputJsonValue
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pricingProfiles?: PricingProfileUncheckedUpdateManyWithoutCompanyNestedInput
    widgetSettings?: WidgetSettingsUncheckedUpdateManyWithoutCompanyNestedInput
    webhooks?: WebhookUncheckedUpdateManyWithoutCompanyNestedInput
    shopifyInstalls?: ShopifyInstallUncheckedUpdateManyWithoutCompanyNestedInput
    stopNotes?: StopNoteUncheckedUpdateManyWithoutCompanyNestedInput
    jobs?: JobUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type JobUpsertWithWhereUniqueWithoutQuoteRequestInput = {
    where: JobWhereUniqueInput
    update: XOR<JobUpdateWithoutQuoteRequestInput, JobUncheckedUpdateWithoutQuoteRequestInput>
    create: XOR<JobCreateWithoutQuoteRequestInput, JobUncheckedCreateWithoutQuoteRequestInput>
  }

  export type JobUpdateWithWhereUniqueWithoutQuoteRequestInput = {
    where: JobWhereUniqueInput
    data: XOR<JobUpdateWithoutQuoteRequestInput, JobUncheckedUpdateWithoutQuoteRequestInput>
  }

  export type JobUpdateManyWithWhereWithoutQuoteRequestInput = {
    where: JobScalarWhereInput
    data: XOR<JobUpdateManyMutationInput, JobUncheckedUpdateManyWithoutQuoteRequestInput>
  }

  export type CompanyCreateWithoutWebhooksInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    logoUrl?: string | null
    profilePicUrl?: string | null
    phone?: string | null
    website?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    zip?: string | null
    contactName?: string | null
    timezone?: string
    subscriptionPlan?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripeConnectAccountId?: string | null
    trialEndsAt?: Date | string | null
    emailVerified?: boolean
    emailVerificationToken?: string | null
    customEmailDomain?: string | null
    customEmailFromName?: string | null
    resendDomainId?: string | null
    emailDomainVerified?: boolean
    emailDomainDnsRecords?: NullableJsonNullValueInput | InputJsonValue
    isAdmin?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    pricingProfiles?: PricingProfileCreateNestedManyWithoutCompanyInput
    quoteRequests?: QuoteRequestCreateNestedManyWithoutCompanyInput
    widgetSettings?: WidgetSettingsCreateNestedManyWithoutCompanyInput
    shopifyInstalls?: ShopifyInstallCreateNestedManyWithoutCompanyInput
    stopNotes?: StopNoteCreateNestedManyWithoutCompanyInput
    jobs?: JobCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutWebhooksInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    logoUrl?: string | null
    profilePicUrl?: string | null
    phone?: string | null
    website?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    zip?: string | null
    contactName?: string | null
    timezone?: string
    subscriptionPlan?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripeConnectAccountId?: string | null
    trialEndsAt?: Date | string | null
    emailVerified?: boolean
    emailVerificationToken?: string | null
    customEmailDomain?: string | null
    customEmailFromName?: string | null
    resendDomainId?: string | null
    emailDomainVerified?: boolean
    emailDomainDnsRecords?: NullableJsonNullValueInput | InputJsonValue
    isAdmin?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    pricingProfiles?: PricingProfileUncheckedCreateNestedManyWithoutCompanyInput
    quoteRequests?: QuoteRequestUncheckedCreateNestedManyWithoutCompanyInput
    widgetSettings?: WidgetSettingsUncheckedCreateNestedManyWithoutCompanyInput
    shopifyInstalls?: ShopifyInstallUncheckedCreateNestedManyWithoutCompanyInput
    stopNotes?: StopNoteUncheckedCreateNestedManyWithoutCompanyInput
    jobs?: JobUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutWebhooksInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutWebhooksInput, CompanyUncheckedCreateWithoutWebhooksInput>
  }

  export type CompanyUpsertWithoutWebhooksInput = {
    update: XOR<CompanyUpdateWithoutWebhooksInput, CompanyUncheckedUpdateWithoutWebhooksInput>
    create: XOR<CompanyCreateWithoutWebhooksInput, CompanyUncheckedCreateWithoutWebhooksInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutWebhooksInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutWebhooksInput, CompanyUncheckedUpdateWithoutWebhooksInput>
  }

  export type CompanyUpdateWithoutWebhooksInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeConnectAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    customEmailDomain?: NullableStringFieldUpdateOperationsInput | string | null
    customEmailFromName?: NullableStringFieldUpdateOperationsInput | string | null
    resendDomainId?: NullableStringFieldUpdateOperationsInput | string | null
    emailDomainVerified?: BoolFieldUpdateOperationsInput | boolean
    emailDomainDnsRecords?: NullableJsonNullValueInput | InputJsonValue
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pricingProfiles?: PricingProfileUpdateManyWithoutCompanyNestedInput
    quoteRequests?: QuoteRequestUpdateManyWithoutCompanyNestedInput
    widgetSettings?: WidgetSettingsUpdateManyWithoutCompanyNestedInput
    shopifyInstalls?: ShopifyInstallUpdateManyWithoutCompanyNestedInput
    stopNotes?: StopNoteUpdateManyWithoutCompanyNestedInput
    jobs?: JobUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutWebhooksInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeConnectAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    customEmailDomain?: NullableStringFieldUpdateOperationsInput | string | null
    customEmailFromName?: NullableStringFieldUpdateOperationsInput | string | null
    resendDomainId?: NullableStringFieldUpdateOperationsInput | string | null
    emailDomainVerified?: BoolFieldUpdateOperationsInput | boolean
    emailDomainDnsRecords?: NullableJsonNullValueInput | InputJsonValue
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pricingProfiles?: PricingProfileUncheckedUpdateManyWithoutCompanyNestedInput
    quoteRequests?: QuoteRequestUncheckedUpdateManyWithoutCompanyNestedInput
    widgetSettings?: WidgetSettingsUncheckedUpdateManyWithoutCompanyNestedInput
    shopifyInstalls?: ShopifyInstallUncheckedUpdateManyWithoutCompanyNestedInput
    stopNotes?: StopNoteUncheckedUpdateManyWithoutCompanyNestedInput
    jobs?: JobUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyCreateWithoutShopifyInstallsInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    logoUrl?: string | null
    profilePicUrl?: string | null
    phone?: string | null
    website?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    zip?: string | null
    contactName?: string | null
    timezone?: string
    subscriptionPlan?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripeConnectAccountId?: string | null
    trialEndsAt?: Date | string | null
    emailVerified?: boolean
    emailVerificationToken?: string | null
    customEmailDomain?: string | null
    customEmailFromName?: string | null
    resendDomainId?: string | null
    emailDomainVerified?: boolean
    emailDomainDnsRecords?: NullableJsonNullValueInput | InputJsonValue
    isAdmin?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    pricingProfiles?: PricingProfileCreateNestedManyWithoutCompanyInput
    quoteRequests?: QuoteRequestCreateNestedManyWithoutCompanyInput
    widgetSettings?: WidgetSettingsCreateNestedManyWithoutCompanyInput
    webhooks?: WebhookCreateNestedManyWithoutCompanyInput
    stopNotes?: StopNoteCreateNestedManyWithoutCompanyInput
    jobs?: JobCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutShopifyInstallsInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    logoUrl?: string | null
    profilePicUrl?: string | null
    phone?: string | null
    website?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    zip?: string | null
    contactName?: string | null
    timezone?: string
    subscriptionPlan?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripeConnectAccountId?: string | null
    trialEndsAt?: Date | string | null
    emailVerified?: boolean
    emailVerificationToken?: string | null
    customEmailDomain?: string | null
    customEmailFromName?: string | null
    resendDomainId?: string | null
    emailDomainVerified?: boolean
    emailDomainDnsRecords?: NullableJsonNullValueInput | InputJsonValue
    isAdmin?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    pricingProfiles?: PricingProfileUncheckedCreateNestedManyWithoutCompanyInput
    quoteRequests?: QuoteRequestUncheckedCreateNestedManyWithoutCompanyInput
    widgetSettings?: WidgetSettingsUncheckedCreateNestedManyWithoutCompanyInput
    webhooks?: WebhookUncheckedCreateNestedManyWithoutCompanyInput
    stopNotes?: StopNoteUncheckedCreateNestedManyWithoutCompanyInput
    jobs?: JobUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutShopifyInstallsInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutShopifyInstallsInput, CompanyUncheckedCreateWithoutShopifyInstallsInput>
  }

  export type CompanyUpsertWithoutShopifyInstallsInput = {
    update: XOR<CompanyUpdateWithoutShopifyInstallsInput, CompanyUncheckedUpdateWithoutShopifyInstallsInput>
    create: XOR<CompanyCreateWithoutShopifyInstallsInput, CompanyUncheckedCreateWithoutShopifyInstallsInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutShopifyInstallsInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutShopifyInstallsInput, CompanyUncheckedUpdateWithoutShopifyInstallsInput>
  }

  export type CompanyUpdateWithoutShopifyInstallsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeConnectAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    customEmailDomain?: NullableStringFieldUpdateOperationsInput | string | null
    customEmailFromName?: NullableStringFieldUpdateOperationsInput | string | null
    resendDomainId?: NullableStringFieldUpdateOperationsInput | string | null
    emailDomainVerified?: BoolFieldUpdateOperationsInput | boolean
    emailDomainDnsRecords?: NullableJsonNullValueInput | InputJsonValue
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pricingProfiles?: PricingProfileUpdateManyWithoutCompanyNestedInput
    quoteRequests?: QuoteRequestUpdateManyWithoutCompanyNestedInput
    widgetSettings?: WidgetSettingsUpdateManyWithoutCompanyNestedInput
    webhooks?: WebhookUpdateManyWithoutCompanyNestedInput
    stopNotes?: StopNoteUpdateManyWithoutCompanyNestedInput
    jobs?: JobUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutShopifyInstallsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeConnectAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    customEmailDomain?: NullableStringFieldUpdateOperationsInput | string | null
    customEmailFromName?: NullableStringFieldUpdateOperationsInput | string | null
    resendDomainId?: NullableStringFieldUpdateOperationsInput | string | null
    emailDomainVerified?: BoolFieldUpdateOperationsInput | boolean
    emailDomainDnsRecords?: NullableJsonNullValueInput | InputJsonValue
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pricingProfiles?: PricingProfileUncheckedUpdateManyWithoutCompanyNestedInput
    quoteRequests?: QuoteRequestUncheckedUpdateManyWithoutCompanyNestedInput
    widgetSettings?: WidgetSettingsUncheckedUpdateManyWithoutCompanyNestedInput
    webhooks?: WebhookUncheckedUpdateManyWithoutCompanyNestedInput
    stopNotes?: StopNoteUncheckedUpdateManyWithoutCompanyNestedInput
    jobs?: JobUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyCreateWithoutStopNotesInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    logoUrl?: string | null
    profilePicUrl?: string | null
    phone?: string | null
    website?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    zip?: string | null
    contactName?: string | null
    timezone?: string
    subscriptionPlan?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripeConnectAccountId?: string | null
    trialEndsAt?: Date | string | null
    emailVerified?: boolean
    emailVerificationToken?: string | null
    customEmailDomain?: string | null
    customEmailFromName?: string | null
    resendDomainId?: string | null
    emailDomainVerified?: boolean
    emailDomainDnsRecords?: NullableJsonNullValueInput | InputJsonValue
    isAdmin?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    pricingProfiles?: PricingProfileCreateNestedManyWithoutCompanyInput
    quoteRequests?: QuoteRequestCreateNestedManyWithoutCompanyInput
    widgetSettings?: WidgetSettingsCreateNestedManyWithoutCompanyInput
    webhooks?: WebhookCreateNestedManyWithoutCompanyInput
    shopifyInstalls?: ShopifyInstallCreateNestedManyWithoutCompanyInput
    jobs?: JobCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutStopNotesInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    logoUrl?: string | null
    profilePicUrl?: string | null
    phone?: string | null
    website?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    zip?: string | null
    contactName?: string | null
    timezone?: string
    subscriptionPlan?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripeConnectAccountId?: string | null
    trialEndsAt?: Date | string | null
    emailVerified?: boolean
    emailVerificationToken?: string | null
    customEmailDomain?: string | null
    customEmailFromName?: string | null
    resendDomainId?: string | null
    emailDomainVerified?: boolean
    emailDomainDnsRecords?: NullableJsonNullValueInput | InputJsonValue
    isAdmin?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    pricingProfiles?: PricingProfileUncheckedCreateNestedManyWithoutCompanyInput
    quoteRequests?: QuoteRequestUncheckedCreateNestedManyWithoutCompanyInput
    widgetSettings?: WidgetSettingsUncheckedCreateNestedManyWithoutCompanyInput
    webhooks?: WebhookUncheckedCreateNestedManyWithoutCompanyInput
    shopifyInstalls?: ShopifyInstallUncheckedCreateNestedManyWithoutCompanyInput
    jobs?: JobUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutStopNotesInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutStopNotesInput, CompanyUncheckedCreateWithoutStopNotesInput>
  }

  export type ReadinessCheckCreateWithoutStopNoteInput = {
    id?: string
    scheduledDate: Date | string
    contactConfirmed?: boolean
    addressConfirmed?: boolean
    accessConfirmed?: boolean
    siteReady?: boolean
    notes?: string | null
    status?: string
    createdAt?: Date | string
    job?: JobCreateNestedOneWithoutReadinessChecksInput
  }

  export type ReadinessCheckUncheckedCreateWithoutStopNoteInput = {
    id?: string
    scheduledDate: Date | string
    contactConfirmed?: boolean
    addressConfirmed?: boolean
    accessConfirmed?: boolean
    siteReady?: boolean
    notes?: string | null
    status?: string
    createdAt?: Date | string
    jobId?: string | null
  }

  export type ReadinessCheckCreateOrConnectWithoutStopNoteInput = {
    where: ReadinessCheckWhereUniqueInput
    create: XOR<ReadinessCheckCreateWithoutStopNoteInput, ReadinessCheckUncheckedCreateWithoutStopNoteInput>
  }

  export type ReadinessCheckCreateManyStopNoteInputEnvelope = {
    data: ReadinessCheckCreateManyStopNoteInput | ReadinessCheckCreateManyStopNoteInput[]
    skipDuplicates?: boolean
  }

  export type ExceptionLogCreateWithoutStopNoteInput = {
    id?: string
    type: string
    notes?: string | null
    timestamp?: Date | string
    job?: JobCreateNestedOneWithoutExceptionLogsInput
  }

  export type ExceptionLogUncheckedCreateWithoutStopNoteInput = {
    id?: string
    type: string
    notes?: string | null
    timestamp?: Date | string
    jobId?: string | null
  }

  export type ExceptionLogCreateOrConnectWithoutStopNoteInput = {
    where: ExceptionLogWhereUniqueInput
    create: XOR<ExceptionLogCreateWithoutStopNoteInput, ExceptionLogUncheckedCreateWithoutStopNoteInput>
  }

  export type ExceptionLogCreateManyStopNoteInputEnvelope = {
    data: ExceptionLogCreateManyStopNoteInput | ExceptionLogCreateManyStopNoteInput[]
    skipDuplicates?: boolean
  }

  export type JobStopCreateWithoutStopNoteInput = {
    id?: string
    order?: number
    job: JobCreateNestedOneWithoutStopsInput
  }

  export type JobStopUncheckedCreateWithoutStopNoteInput = {
    id?: string
    jobId: string
    order?: number
  }

  export type JobStopCreateOrConnectWithoutStopNoteInput = {
    where: JobStopWhereUniqueInput
    create: XOR<JobStopCreateWithoutStopNoteInput, JobStopUncheckedCreateWithoutStopNoteInput>
  }

  export type JobStopCreateManyStopNoteInputEnvelope = {
    data: JobStopCreateManyStopNoteInput | JobStopCreateManyStopNoteInput[]
    skipDuplicates?: boolean
  }

  export type CompanyUpsertWithoutStopNotesInput = {
    update: XOR<CompanyUpdateWithoutStopNotesInput, CompanyUncheckedUpdateWithoutStopNotesInput>
    create: XOR<CompanyCreateWithoutStopNotesInput, CompanyUncheckedCreateWithoutStopNotesInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutStopNotesInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutStopNotesInput, CompanyUncheckedUpdateWithoutStopNotesInput>
  }

  export type CompanyUpdateWithoutStopNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeConnectAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    customEmailDomain?: NullableStringFieldUpdateOperationsInput | string | null
    customEmailFromName?: NullableStringFieldUpdateOperationsInput | string | null
    resendDomainId?: NullableStringFieldUpdateOperationsInput | string | null
    emailDomainVerified?: BoolFieldUpdateOperationsInput | boolean
    emailDomainDnsRecords?: NullableJsonNullValueInput | InputJsonValue
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pricingProfiles?: PricingProfileUpdateManyWithoutCompanyNestedInput
    quoteRequests?: QuoteRequestUpdateManyWithoutCompanyNestedInput
    widgetSettings?: WidgetSettingsUpdateManyWithoutCompanyNestedInput
    webhooks?: WebhookUpdateManyWithoutCompanyNestedInput
    shopifyInstalls?: ShopifyInstallUpdateManyWithoutCompanyNestedInput
    jobs?: JobUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutStopNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeConnectAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    customEmailDomain?: NullableStringFieldUpdateOperationsInput | string | null
    customEmailFromName?: NullableStringFieldUpdateOperationsInput | string | null
    resendDomainId?: NullableStringFieldUpdateOperationsInput | string | null
    emailDomainVerified?: BoolFieldUpdateOperationsInput | boolean
    emailDomainDnsRecords?: NullableJsonNullValueInput | InputJsonValue
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pricingProfiles?: PricingProfileUncheckedUpdateManyWithoutCompanyNestedInput
    quoteRequests?: QuoteRequestUncheckedUpdateManyWithoutCompanyNestedInput
    widgetSettings?: WidgetSettingsUncheckedUpdateManyWithoutCompanyNestedInput
    webhooks?: WebhookUncheckedUpdateManyWithoutCompanyNestedInput
    shopifyInstalls?: ShopifyInstallUncheckedUpdateManyWithoutCompanyNestedInput
    jobs?: JobUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type ReadinessCheckUpsertWithWhereUniqueWithoutStopNoteInput = {
    where: ReadinessCheckWhereUniqueInput
    update: XOR<ReadinessCheckUpdateWithoutStopNoteInput, ReadinessCheckUncheckedUpdateWithoutStopNoteInput>
    create: XOR<ReadinessCheckCreateWithoutStopNoteInput, ReadinessCheckUncheckedCreateWithoutStopNoteInput>
  }

  export type ReadinessCheckUpdateWithWhereUniqueWithoutStopNoteInput = {
    where: ReadinessCheckWhereUniqueInput
    data: XOR<ReadinessCheckUpdateWithoutStopNoteInput, ReadinessCheckUncheckedUpdateWithoutStopNoteInput>
  }

  export type ReadinessCheckUpdateManyWithWhereWithoutStopNoteInput = {
    where: ReadinessCheckScalarWhereInput
    data: XOR<ReadinessCheckUpdateManyMutationInput, ReadinessCheckUncheckedUpdateManyWithoutStopNoteInput>
  }

  export type ReadinessCheckScalarWhereInput = {
    AND?: ReadinessCheckScalarWhereInput | ReadinessCheckScalarWhereInput[]
    OR?: ReadinessCheckScalarWhereInput[]
    NOT?: ReadinessCheckScalarWhereInput | ReadinessCheckScalarWhereInput[]
    id?: StringFilter<"ReadinessCheck"> | string
    stopNoteId?: StringFilter<"ReadinessCheck"> | string
    scheduledDate?: DateTimeFilter<"ReadinessCheck"> | Date | string
    contactConfirmed?: BoolFilter<"ReadinessCheck"> | boolean
    addressConfirmed?: BoolFilter<"ReadinessCheck"> | boolean
    accessConfirmed?: BoolFilter<"ReadinessCheck"> | boolean
    siteReady?: BoolFilter<"ReadinessCheck"> | boolean
    notes?: StringNullableFilter<"ReadinessCheck"> | string | null
    status?: StringFilter<"ReadinessCheck"> | string
    createdAt?: DateTimeFilter<"ReadinessCheck"> | Date | string
    jobId?: StringNullableFilter<"ReadinessCheck"> | string | null
  }

  export type ExceptionLogUpsertWithWhereUniqueWithoutStopNoteInput = {
    where: ExceptionLogWhereUniqueInput
    update: XOR<ExceptionLogUpdateWithoutStopNoteInput, ExceptionLogUncheckedUpdateWithoutStopNoteInput>
    create: XOR<ExceptionLogCreateWithoutStopNoteInput, ExceptionLogUncheckedCreateWithoutStopNoteInput>
  }

  export type ExceptionLogUpdateWithWhereUniqueWithoutStopNoteInput = {
    where: ExceptionLogWhereUniqueInput
    data: XOR<ExceptionLogUpdateWithoutStopNoteInput, ExceptionLogUncheckedUpdateWithoutStopNoteInput>
  }

  export type ExceptionLogUpdateManyWithWhereWithoutStopNoteInput = {
    where: ExceptionLogScalarWhereInput
    data: XOR<ExceptionLogUpdateManyMutationInput, ExceptionLogUncheckedUpdateManyWithoutStopNoteInput>
  }

  export type ExceptionLogScalarWhereInput = {
    AND?: ExceptionLogScalarWhereInput | ExceptionLogScalarWhereInput[]
    OR?: ExceptionLogScalarWhereInput[]
    NOT?: ExceptionLogScalarWhereInput | ExceptionLogScalarWhereInput[]
    id?: StringFilter<"ExceptionLog"> | string
    stopNoteId?: StringNullableFilter<"ExceptionLog"> | string | null
    type?: StringFilter<"ExceptionLog"> | string
    notes?: StringNullableFilter<"ExceptionLog"> | string | null
    timestamp?: DateTimeFilter<"ExceptionLog"> | Date | string
    jobId?: StringNullableFilter<"ExceptionLog"> | string | null
  }

  export type JobStopUpsertWithWhereUniqueWithoutStopNoteInput = {
    where: JobStopWhereUniqueInput
    update: XOR<JobStopUpdateWithoutStopNoteInput, JobStopUncheckedUpdateWithoutStopNoteInput>
    create: XOR<JobStopCreateWithoutStopNoteInput, JobStopUncheckedCreateWithoutStopNoteInput>
  }

  export type JobStopUpdateWithWhereUniqueWithoutStopNoteInput = {
    where: JobStopWhereUniqueInput
    data: XOR<JobStopUpdateWithoutStopNoteInput, JobStopUncheckedUpdateWithoutStopNoteInput>
  }

  export type JobStopUpdateManyWithWhereWithoutStopNoteInput = {
    where: JobStopScalarWhereInput
    data: XOR<JobStopUpdateManyMutationInput, JobStopUncheckedUpdateManyWithoutStopNoteInput>
  }

  export type JobStopScalarWhereInput = {
    AND?: JobStopScalarWhereInput | JobStopScalarWhereInput[]
    OR?: JobStopScalarWhereInput[]
    NOT?: JobStopScalarWhereInput | JobStopScalarWhereInput[]
    id?: StringFilter<"JobStop"> | string
    jobId?: StringFilter<"JobStop"> | string
    stopNoteId?: StringFilter<"JobStop"> | string
    order?: IntFilter<"JobStop"> | number
  }

  export type StopNoteCreateWithoutReadinessChecksInput = {
    id?: string
    companyName: string
    address: string
    contactName?: string | null
    contactPhone?: string | null
    gateCode?: string | null
    dockInfo?: string | null
    hours?: string | null
    parkingNotes?: string | null
    accessNotes?: string | null
    deliveryNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutStopNotesInput
    exceptionLogs?: ExceptionLogCreateNestedManyWithoutStopNoteInput
    jobStops?: JobStopCreateNestedManyWithoutStopNoteInput
  }

  export type StopNoteUncheckedCreateWithoutReadinessChecksInput = {
    id?: string
    companyId: string
    companyName: string
    address: string
    contactName?: string | null
    contactPhone?: string | null
    gateCode?: string | null
    dockInfo?: string | null
    hours?: string | null
    parkingNotes?: string | null
    accessNotes?: string | null
    deliveryNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    exceptionLogs?: ExceptionLogUncheckedCreateNestedManyWithoutStopNoteInput
    jobStops?: JobStopUncheckedCreateNestedManyWithoutStopNoteInput
  }

  export type StopNoteCreateOrConnectWithoutReadinessChecksInput = {
    where: StopNoteWhereUniqueInput
    create: XOR<StopNoteCreateWithoutReadinessChecksInput, StopNoteUncheckedCreateWithoutReadinessChecksInput>
  }

  export type JobCreateWithoutReadinessChecksInput = {
    id?: string
    status?: string
    scheduledDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutJobsInput
    quoteRequest?: QuoteRequestCreateNestedOneWithoutJobsInput
    stops?: JobStopCreateNestedManyWithoutJobInput
    exceptionLogs?: ExceptionLogCreateNestedManyWithoutJobInput
  }

  export type JobUncheckedCreateWithoutReadinessChecksInput = {
    id?: string
    companyId: string
    quoteRequestId?: string | null
    status?: string
    scheduledDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    stops?: JobStopUncheckedCreateNestedManyWithoutJobInput
    exceptionLogs?: ExceptionLogUncheckedCreateNestedManyWithoutJobInput
  }

  export type JobCreateOrConnectWithoutReadinessChecksInput = {
    where: JobWhereUniqueInput
    create: XOR<JobCreateWithoutReadinessChecksInput, JobUncheckedCreateWithoutReadinessChecksInput>
  }

  export type StopNoteUpsertWithoutReadinessChecksInput = {
    update: XOR<StopNoteUpdateWithoutReadinessChecksInput, StopNoteUncheckedUpdateWithoutReadinessChecksInput>
    create: XOR<StopNoteCreateWithoutReadinessChecksInput, StopNoteUncheckedCreateWithoutReadinessChecksInput>
    where?: StopNoteWhereInput
  }

  export type StopNoteUpdateToOneWithWhereWithoutReadinessChecksInput = {
    where?: StopNoteWhereInput
    data: XOR<StopNoteUpdateWithoutReadinessChecksInput, StopNoteUncheckedUpdateWithoutReadinessChecksInput>
  }

  export type StopNoteUpdateWithoutReadinessChecksInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    gateCode?: NullableStringFieldUpdateOperationsInput | string | null
    dockInfo?: NullableStringFieldUpdateOperationsInput | string | null
    hours?: NullableStringFieldUpdateOperationsInput | string | null
    parkingNotes?: NullableStringFieldUpdateOperationsInput | string | null
    accessNotes?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutStopNotesNestedInput
    exceptionLogs?: ExceptionLogUpdateManyWithoutStopNoteNestedInput
    jobStops?: JobStopUpdateManyWithoutStopNoteNestedInput
  }

  export type StopNoteUncheckedUpdateWithoutReadinessChecksInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    gateCode?: NullableStringFieldUpdateOperationsInput | string | null
    dockInfo?: NullableStringFieldUpdateOperationsInput | string | null
    hours?: NullableStringFieldUpdateOperationsInput | string | null
    parkingNotes?: NullableStringFieldUpdateOperationsInput | string | null
    accessNotes?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    exceptionLogs?: ExceptionLogUncheckedUpdateManyWithoutStopNoteNestedInput
    jobStops?: JobStopUncheckedUpdateManyWithoutStopNoteNestedInput
  }

  export type JobUpsertWithoutReadinessChecksInput = {
    update: XOR<JobUpdateWithoutReadinessChecksInput, JobUncheckedUpdateWithoutReadinessChecksInput>
    create: XOR<JobCreateWithoutReadinessChecksInput, JobUncheckedCreateWithoutReadinessChecksInput>
    where?: JobWhereInput
  }

  export type JobUpdateToOneWithWhereWithoutReadinessChecksInput = {
    where?: JobWhereInput
    data: XOR<JobUpdateWithoutReadinessChecksInput, JobUncheckedUpdateWithoutReadinessChecksInput>
  }

  export type JobUpdateWithoutReadinessChecksInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutJobsNestedInput
    quoteRequest?: QuoteRequestUpdateOneWithoutJobsNestedInput
    stops?: JobStopUpdateManyWithoutJobNestedInput
    exceptionLogs?: ExceptionLogUpdateManyWithoutJobNestedInput
  }

  export type JobUncheckedUpdateWithoutReadinessChecksInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    quoteRequestId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stops?: JobStopUncheckedUpdateManyWithoutJobNestedInput
    exceptionLogs?: ExceptionLogUncheckedUpdateManyWithoutJobNestedInput
  }

  export type StopNoteCreateWithoutExceptionLogsInput = {
    id?: string
    companyName: string
    address: string
    contactName?: string | null
    contactPhone?: string | null
    gateCode?: string | null
    dockInfo?: string | null
    hours?: string | null
    parkingNotes?: string | null
    accessNotes?: string | null
    deliveryNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutStopNotesInput
    readinessChecks?: ReadinessCheckCreateNestedManyWithoutStopNoteInput
    jobStops?: JobStopCreateNestedManyWithoutStopNoteInput
  }

  export type StopNoteUncheckedCreateWithoutExceptionLogsInput = {
    id?: string
    companyId: string
    companyName: string
    address: string
    contactName?: string | null
    contactPhone?: string | null
    gateCode?: string | null
    dockInfo?: string | null
    hours?: string | null
    parkingNotes?: string | null
    accessNotes?: string | null
    deliveryNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    readinessChecks?: ReadinessCheckUncheckedCreateNestedManyWithoutStopNoteInput
    jobStops?: JobStopUncheckedCreateNestedManyWithoutStopNoteInput
  }

  export type StopNoteCreateOrConnectWithoutExceptionLogsInput = {
    where: StopNoteWhereUniqueInput
    create: XOR<StopNoteCreateWithoutExceptionLogsInput, StopNoteUncheckedCreateWithoutExceptionLogsInput>
  }

  export type JobCreateWithoutExceptionLogsInput = {
    id?: string
    status?: string
    scheduledDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutJobsInput
    quoteRequest?: QuoteRequestCreateNestedOneWithoutJobsInput
    stops?: JobStopCreateNestedManyWithoutJobInput
    readinessChecks?: ReadinessCheckCreateNestedManyWithoutJobInput
  }

  export type JobUncheckedCreateWithoutExceptionLogsInput = {
    id?: string
    companyId: string
    quoteRequestId?: string | null
    status?: string
    scheduledDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    stops?: JobStopUncheckedCreateNestedManyWithoutJobInput
    readinessChecks?: ReadinessCheckUncheckedCreateNestedManyWithoutJobInput
  }

  export type JobCreateOrConnectWithoutExceptionLogsInput = {
    where: JobWhereUniqueInput
    create: XOR<JobCreateWithoutExceptionLogsInput, JobUncheckedCreateWithoutExceptionLogsInput>
  }

  export type StopNoteUpsertWithoutExceptionLogsInput = {
    update: XOR<StopNoteUpdateWithoutExceptionLogsInput, StopNoteUncheckedUpdateWithoutExceptionLogsInput>
    create: XOR<StopNoteCreateWithoutExceptionLogsInput, StopNoteUncheckedCreateWithoutExceptionLogsInput>
    where?: StopNoteWhereInput
  }

  export type StopNoteUpdateToOneWithWhereWithoutExceptionLogsInput = {
    where?: StopNoteWhereInput
    data: XOR<StopNoteUpdateWithoutExceptionLogsInput, StopNoteUncheckedUpdateWithoutExceptionLogsInput>
  }

  export type StopNoteUpdateWithoutExceptionLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    gateCode?: NullableStringFieldUpdateOperationsInput | string | null
    dockInfo?: NullableStringFieldUpdateOperationsInput | string | null
    hours?: NullableStringFieldUpdateOperationsInput | string | null
    parkingNotes?: NullableStringFieldUpdateOperationsInput | string | null
    accessNotes?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutStopNotesNestedInput
    readinessChecks?: ReadinessCheckUpdateManyWithoutStopNoteNestedInput
    jobStops?: JobStopUpdateManyWithoutStopNoteNestedInput
  }

  export type StopNoteUncheckedUpdateWithoutExceptionLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    gateCode?: NullableStringFieldUpdateOperationsInput | string | null
    dockInfo?: NullableStringFieldUpdateOperationsInput | string | null
    hours?: NullableStringFieldUpdateOperationsInput | string | null
    parkingNotes?: NullableStringFieldUpdateOperationsInput | string | null
    accessNotes?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    readinessChecks?: ReadinessCheckUncheckedUpdateManyWithoutStopNoteNestedInput
    jobStops?: JobStopUncheckedUpdateManyWithoutStopNoteNestedInput
  }

  export type JobUpsertWithoutExceptionLogsInput = {
    update: XOR<JobUpdateWithoutExceptionLogsInput, JobUncheckedUpdateWithoutExceptionLogsInput>
    create: XOR<JobCreateWithoutExceptionLogsInput, JobUncheckedCreateWithoutExceptionLogsInput>
    where?: JobWhereInput
  }

  export type JobUpdateToOneWithWhereWithoutExceptionLogsInput = {
    where?: JobWhereInput
    data: XOR<JobUpdateWithoutExceptionLogsInput, JobUncheckedUpdateWithoutExceptionLogsInput>
  }

  export type JobUpdateWithoutExceptionLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutJobsNestedInput
    quoteRequest?: QuoteRequestUpdateOneWithoutJobsNestedInput
    stops?: JobStopUpdateManyWithoutJobNestedInput
    readinessChecks?: ReadinessCheckUpdateManyWithoutJobNestedInput
  }

  export type JobUncheckedUpdateWithoutExceptionLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    quoteRequestId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stops?: JobStopUncheckedUpdateManyWithoutJobNestedInput
    readinessChecks?: ReadinessCheckUncheckedUpdateManyWithoutJobNestedInput
  }

  export type CompanyCreateWithoutJobsInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    logoUrl?: string | null
    profilePicUrl?: string | null
    phone?: string | null
    website?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    zip?: string | null
    contactName?: string | null
    timezone?: string
    subscriptionPlan?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripeConnectAccountId?: string | null
    trialEndsAt?: Date | string | null
    emailVerified?: boolean
    emailVerificationToken?: string | null
    customEmailDomain?: string | null
    customEmailFromName?: string | null
    resendDomainId?: string | null
    emailDomainVerified?: boolean
    emailDomainDnsRecords?: NullableJsonNullValueInput | InputJsonValue
    isAdmin?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    pricingProfiles?: PricingProfileCreateNestedManyWithoutCompanyInput
    quoteRequests?: QuoteRequestCreateNestedManyWithoutCompanyInput
    widgetSettings?: WidgetSettingsCreateNestedManyWithoutCompanyInput
    webhooks?: WebhookCreateNestedManyWithoutCompanyInput
    shopifyInstalls?: ShopifyInstallCreateNestedManyWithoutCompanyInput
    stopNotes?: StopNoteCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutJobsInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    logoUrl?: string | null
    profilePicUrl?: string | null
    phone?: string | null
    website?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    zip?: string | null
    contactName?: string | null
    timezone?: string
    subscriptionPlan?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripeConnectAccountId?: string | null
    trialEndsAt?: Date | string | null
    emailVerified?: boolean
    emailVerificationToken?: string | null
    customEmailDomain?: string | null
    customEmailFromName?: string | null
    resendDomainId?: string | null
    emailDomainVerified?: boolean
    emailDomainDnsRecords?: NullableJsonNullValueInput | InputJsonValue
    isAdmin?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    pricingProfiles?: PricingProfileUncheckedCreateNestedManyWithoutCompanyInput
    quoteRequests?: QuoteRequestUncheckedCreateNestedManyWithoutCompanyInput
    widgetSettings?: WidgetSettingsUncheckedCreateNestedManyWithoutCompanyInput
    webhooks?: WebhookUncheckedCreateNestedManyWithoutCompanyInput
    shopifyInstalls?: ShopifyInstallUncheckedCreateNestedManyWithoutCompanyInput
    stopNotes?: StopNoteUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutJobsInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutJobsInput, CompanyUncheckedCreateWithoutJobsInput>
  }

  export type QuoteRequestCreateWithoutJobsInput = {
    id?: string
    customerName: string
    customerEmail: string
    customerPhone?: string | null
    pickupZip: string
    dropoffZip: string
    distanceMiles: number
    serviceType: string
    packageSize?: string | null
    packageWeight?: string | null
    selectedExtras?: string | null
    status?: string
    estimatedPrice: number
    vehicleCount?: number | null
    awbNumber?: string | null
    paymentStatus?: string | null
    stripePaymentIntentId?: string | null
    internalNotes?: string | null
    paidAt?: Date | string | null
    createdAt?: Date | string
    company: CompanyCreateNestedOneWithoutQuoteRequestsInput
  }

  export type QuoteRequestUncheckedCreateWithoutJobsInput = {
    id?: string
    companyId: string
    customerName: string
    customerEmail: string
    customerPhone?: string | null
    pickupZip: string
    dropoffZip: string
    distanceMiles: number
    serviceType: string
    packageSize?: string | null
    packageWeight?: string | null
    selectedExtras?: string | null
    status?: string
    estimatedPrice: number
    vehicleCount?: number | null
    awbNumber?: string | null
    paymentStatus?: string | null
    stripePaymentIntentId?: string | null
    internalNotes?: string | null
    paidAt?: Date | string | null
    createdAt?: Date | string
  }

  export type QuoteRequestCreateOrConnectWithoutJobsInput = {
    where: QuoteRequestWhereUniqueInput
    create: XOR<QuoteRequestCreateWithoutJobsInput, QuoteRequestUncheckedCreateWithoutJobsInput>
  }

  export type JobStopCreateWithoutJobInput = {
    id?: string
    order?: number
    stopNote: StopNoteCreateNestedOneWithoutJobStopsInput
  }

  export type JobStopUncheckedCreateWithoutJobInput = {
    id?: string
    stopNoteId: string
    order?: number
  }

  export type JobStopCreateOrConnectWithoutJobInput = {
    where: JobStopWhereUniqueInput
    create: XOR<JobStopCreateWithoutJobInput, JobStopUncheckedCreateWithoutJobInput>
  }

  export type JobStopCreateManyJobInputEnvelope = {
    data: JobStopCreateManyJobInput | JobStopCreateManyJobInput[]
    skipDuplicates?: boolean
  }

  export type ReadinessCheckCreateWithoutJobInput = {
    id?: string
    scheduledDate: Date | string
    contactConfirmed?: boolean
    addressConfirmed?: boolean
    accessConfirmed?: boolean
    siteReady?: boolean
    notes?: string | null
    status?: string
    createdAt?: Date | string
    stopNote: StopNoteCreateNestedOneWithoutReadinessChecksInput
  }

  export type ReadinessCheckUncheckedCreateWithoutJobInput = {
    id?: string
    stopNoteId: string
    scheduledDate: Date | string
    contactConfirmed?: boolean
    addressConfirmed?: boolean
    accessConfirmed?: boolean
    siteReady?: boolean
    notes?: string | null
    status?: string
    createdAt?: Date | string
  }

  export type ReadinessCheckCreateOrConnectWithoutJobInput = {
    where: ReadinessCheckWhereUniqueInput
    create: XOR<ReadinessCheckCreateWithoutJobInput, ReadinessCheckUncheckedCreateWithoutJobInput>
  }

  export type ReadinessCheckCreateManyJobInputEnvelope = {
    data: ReadinessCheckCreateManyJobInput | ReadinessCheckCreateManyJobInput[]
    skipDuplicates?: boolean
  }

  export type ExceptionLogCreateWithoutJobInput = {
    id?: string
    type: string
    notes?: string | null
    timestamp?: Date | string
    stopNote?: StopNoteCreateNestedOneWithoutExceptionLogsInput
  }

  export type ExceptionLogUncheckedCreateWithoutJobInput = {
    id?: string
    stopNoteId?: string | null
    type: string
    notes?: string | null
    timestamp?: Date | string
  }

  export type ExceptionLogCreateOrConnectWithoutJobInput = {
    where: ExceptionLogWhereUniqueInput
    create: XOR<ExceptionLogCreateWithoutJobInput, ExceptionLogUncheckedCreateWithoutJobInput>
  }

  export type ExceptionLogCreateManyJobInputEnvelope = {
    data: ExceptionLogCreateManyJobInput | ExceptionLogCreateManyJobInput[]
    skipDuplicates?: boolean
  }

  export type CompanyUpsertWithoutJobsInput = {
    update: XOR<CompanyUpdateWithoutJobsInput, CompanyUncheckedUpdateWithoutJobsInput>
    create: XOR<CompanyCreateWithoutJobsInput, CompanyUncheckedCreateWithoutJobsInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutJobsInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutJobsInput, CompanyUncheckedUpdateWithoutJobsInput>
  }

  export type CompanyUpdateWithoutJobsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeConnectAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    customEmailDomain?: NullableStringFieldUpdateOperationsInput | string | null
    customEmailFromName?: NullableStringFieldUpdateOperationsInput | string | null
    resendDomainId?: NullableStringFieldUpdateOperationsInput | string | null
    emailDomainVerified?: BoolFieldUpdateOperationsInput | boolean
    emailDomainDnsRecords?: NullableJsonNullValueInput | InputJsonValue
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pricingProfiles?: PricingProfileUpdateManyWithoutCompanyNestedInput
    quoteRequests?: QuoteRequestUpdateManyWithoutCompanyNestedInput
    widgetSettings?: WidgetSettingsUpdateManyWithoutCompanyNestedInput
    webhooks?: WebhookUpdateManyWithoutCompanyNestedInput
    shopifyInstalls?: ShopifyInstallUpdateManyWithoutCompanyNestedInput
    stopNotes?: StopNoteUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutJobsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeConnectAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    customEmailDomain?: NullableStringFieldUpdateOperationsInput | string | null
    customEmailFromName?: NullableStringFieldUpdateOperationsInput | string | null
    resendDomainId?: NullableStringFieldUpdateOperationsInput | string | null
    emailDomainVerified?: BoolFieldUpdateOperationsInput | boolean
    emailDomainDnsRecords?: NullableJsonNullValueInput | InputJsonValue
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pricingProfiles?: PricingProfileUncheckedUpdateManyWithoutCompanyNestedInput
    quoteRequests?: QuoteRequestUncheckedUpdateManyWithoutCompanyNestedInput
    widgetSettings?: WidgetSettingsUncheckedUpdateManyWithoutCompanyNestedInput
    webhooks?: WebhookUncheckedUpdateManyWithoutCompanyNestedInput
    shopifyInstalls?: ShopifyInstallUncheckedUpdateManyWithoutCompanyNestedInput
    stopNotes?: StopNoteUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type QuoteRequestUpsertWithoutJobsInput = {
    update: XOR<QuoteRequestUpdateWithoutJobsInput, QuoteRequestUncheckedUpdateWithoutJobsInput>
    create: XOR<QuoteRequestCreateWithoutJobsInput, QuoteRequestUncheckedCreateWithoutJobsInput>
    where?: QuoteRequestWhereInput
  }

  export type QuoteRequestUpdateToOneWithWhereWithoutJobsInput = {
    where?: QuoteRequestWhereInput
    data: XOR<QuoteRequestUpdateWithoutJobsInput, QuoteRequestUncheckedUpdateWithoutJobsInput>
  }

  export type QuoteRequestUpdateWithoutJobsInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    pickupZip?: StringFieldUpdateOperationsInput | string
    dropoffZip?: StringFieldUpdateOperationsInput | string
    distanceMiles?: FloatFieldUpdateOperationsInput | number
    serviceType?: StringFieldUpdateOperationsInput | string
    packageSize?: NullableStringFieldUpdateOperationsInput | string | null
    packageWeight?: NullableStringFieldUpdateOperationsInput | string | null
    selectedExtras?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    estimatedPrice?: FloatFieldUpdateOperationsInput | number
    vehicleCount?: NullableIntFieldUpdateOperationsInput | number | null
    awbNumber?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: NullableStringFieldUpdateOperationsInput | string | null
    stripePaymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    internalNotes?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutQuoteRequestsNestedInput
  }

  export type QuoteRequestUncheckedUpdateWithoutJobsInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    pickupZip?: StringFieldUpdateOperationsInput | string
    dropoffZip?: StringFieldUpdateOperationsInput | string
    distanceMiles?: FloatFieldUpdateOperationsInput | number
    serviceType?: StringFieldUpdateOperationsInput | string
    packageSize?: NullableStringFieldUpdateOperationsInput | string | null
    packageWeight?: NullableStringFieldUpdateOperationsInput | string | null
    selectedExtras?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    estimatedPrice?: FloatFieldUpdateOperationsInput | number
    vehicleCount?: NullableIntFieldUpdateOperationsInput | number | null
    awbNumber?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: NullableStringFieldUpdateOperationsInput | string | null
    stripePaymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    internalNotes?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobStopUpsertWithWhereUniqueWithoutJobInput = {
    where: JobStopWhereUniqueInput
    update: XOR<JobStopUpdateWithoutJobInput, JobStopUncheckedUpdateWithoutJobInput>
    create: XOR<JobStopCreateWithoutJobInput, JobStopUncheckedCreateWithoutJobInput>
  }

  export type JobStopUpdateWithWhereUniqueWithoutJobInput = {
    where: JobStopWhereUniqueInput
    data: XOR<JobStopUpdateWithoutJobInput, JobStopUncheckedUpdateWithoutJobInput>
  }

  export type JobStopUpdateManyWithWhereWithoutJobInput = {
    where: JobStopScalarWhereInput
    data: XOR<JobStopUpdateManyMutationInput, JobStopUncheckedUpdateManyWithoutJobInput>
  }

  export type ReadinessCheckUpsertWithWhereUniqueWithoutJobInput = {
    where: ReadinessCheckWhereUniqueInput
    update: XOR<ReadinessCheckUpdateWithoutJobInput, ReadinessCheckUncheckedUpdateWithoutJobInput>
    create: XOR<ReadinessCheckCreateWithoutJobInput, ReadinessCheckUncheckedCreateWithoutJobInput>
  }

  export type ReadinessCheckUpdateWithWhereUniqueWithoutJobInput = {
    where: ReadinessCheckWhereUniqueInput
    data: XOR<ReadinessCheckUpdateWithoutJobInput, ReadinessCheckUncheckedUpdateWithoutJobInput>
  }

  export type ReadinessCheckUpdateManyWithWhereWithoutJobInput = {
    where: ReadinessCheckScalarWhereInput
    data: XOR<ReadinessCheckUpdateManyMutationInput, ReadinessCheckUncheckedUpdateManyWithoutJobInput>
  }

  export type ExceptionLogUpsertWithWhereUniqueWithoutJobInput = {
    where: ExceptionLogWhereUniqueInput
    update: XOR<ExceptionLogUpdateWithoutJobInput, ExceptionLogUncheckedUpdateWithoutJobInput>
    create: XOR<ExceptionLogCreateWithoutJobInput, ExceptionLogUncheckedCreateWithoutJobInput>
  }

  export type ExceptionLogUpdateWithWhereUniqueWithoutJobInput = {
    where: ExceptionLogWhereUniqueInput
    data: XOR<ExceptionLogUpdateWithoutJobInput, ExceptionLogUncheckedUpdateWithoutJobInput>
  }

  export type ExceptionLogUpdateManyWithWhereWithoutJobInput = {
    where: ExceptionLogScalarWhereInput
    data: XOR<ExceptionLogUpdateManyMutationInput, ExceptionLogUncheckedUpdateManyWithoutJobInput>
  }

  export type JobCreateWithoutStopsInput = {
    id?: string
    status?: string
    scheduledDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutJobsInput
    quoteRequest?: QuoteRequestCreateNestedOneWithoutJobsInput
    readinessChecks?: ReadinessCheckCreateNestedManyWithoutJobInput
    exceptionLogs?: ExceptionLogCreateNestedManyWithoutJobInput
  }

  export type JobUncheckedCreateWithoutStopsInput = {
    id?: string
    companyId: string
    quoteRequestId?: string | null
    status?: string
    scheduledDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    readinessChecks?: ReadinessCheckUncheckedCreateNestedManyWithoutJobInput
    exceptionLogs?: ExceptionLogUncheckedCreateNestedManyWithoutJobInput
  }

  export type JobCreateOrConnectWithoutStopsInput = {
    where: JobWhereUniqueInput
    create: XOR<JobCreateWithoutStopsInput, JobUncheckedCreateWithoutStopsInput>
  }

  export type StopNoteCreateWithoutJobStopsInput = {
    id?: string
    companyName: string
    address: string
    contactName?: string | null
    contactPhone?: string | null
    gateCode?: string | null
    dockInfo?: string | null
    hours?: string | null
    parkingNotes?: string | null
    accessNotes?: string | null
    deliveryNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutStopNotesInput
    readinessChecks?: ReadinessCheckCreateNestedManyWithoutStopNoteInput
    exceptionLogs?: ExceptionLogCreateNestedManyWithoutStopNoteInput
  }

  export type StopNoteUncheckedCreateWithoutJobStopsInput = {
    id?: string
    companyId: string
    companyName: string
    address: string
    contactName?: string | null
    contactPhone?: string | null
    gateCode?: string | null
    dockInfo?: string | null
    hours?: string | null
    parkingNotes?: string | null
    accessNotes?: string | null
    deliveryNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    readinessChecks?: ReadinessCheckUncheckedCreateNestedManyWithoutStopNoteInput
    exceptionLogs?: ExceptionLogUncheckedCreateNestedManyWithoutStopNoteInput
  }

  export type StopNoteCreateOrConnectWithoutJobStopsInput = {
    where: StopNoteWhereUniqueInput
    create: XOR<StopNoteCreateWithoutJobStopsInput, StopNoteUncheckedCreateWithoutJobStopsInput>
  }

  export type JobUpsertWithoutStopsInput = {
    update: XOR<JobUpdateWithoutStopsInput, JobUncheckedUpdateWithoutStopsInput>
    create: XOR<JobCreateWithoutStopsInput, JobUncheckedCreateWithoutStopsInput>
    where?: JobWhereInput
  }

  export type JobUpdateToOneWithWhereWithoutStopsInput = {
    where?: JobWhereInput
    data: XOR<JobUpdateWithoutStopsInput, JobUncheckedUpdateWithoutStopsInput>
  }

  export type JobUpdateWithoutStopsInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutJobsNestedInput
    quoteRequest?: QuoteRequestUpdateOneWithoutJobsNestedInput
    readinessChecks?: ReadinessCheckUpdateManyWithoutJobNestedInput
    exceptionLogs?: ExceptionLogUpdateManyWithoutJobNestedInput
  }

  export type JobUncheckedUpdateWithoutStopsInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    quoteRequestId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    readinessChecks?: ReadinessCheckUncheckedUpdateManyWithoutJobNestedInput
    exceptionLogs?: ExceptionLogUncheckedUpdateManyWithoutJobNestedInput
  }

  export type StopNoteUpsertWithoutJobStopsInput = {
    update: XOR<StopNoteUpdateWithoutJobStopsInput, StopNoteUncheckedUpdateWithoutJobStopsInput>
    create: XOR<StopNoteCreateWithoutJobStopsInput, StopNoteUncheckedCreateWithoutJobStopsInput>
    where?: StopNoteWhereInput
  }

  export type StopNoteUpdateToOneWithWhereWithoutJobStopsInput = {
    where?: StopNoteWhereInput
    data: XOR<StopNoteUpdateWithoutJobStopsInput, StopNoteUncheckedUpdateWithoutJobStopsInput>
  }

  export type StopNoteUpdateWithoutJobStopsInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    gateCode?: NullableStringFieldUpdateOperationsInput | string | null
    dockInfo?: NullableStringFieldUpdateOperationsInput | string | null
    hours?: NullableStringFieldUpdateOperationsInput | string | null
    parkingNotes?: NullableStringFieldUpdateOperationsInput | string | null
    accessNotes?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutStopNotesNestedInput
    readinessChecks?: ReadinessCheckUpdateManyWithoutStopNoteNestedInput
    exceptionLogs?: ExceptionLogUpdateManyWithoutStopNoteNestedInput
  }

  export type StopNoteUncheckedUpdateWithoutJobStopsInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    gateCode?: NullableStringFieldUpdateOperationsInput | string | null
    dockInfo?: NullableStringFieldUpdateOperationsInput | string | null
    hours?: NullableStringFieldUpdateOperationsInput | string | null
    parkingNotes?: NullableStringFieldUpdateOperationsInput | string | null
    accessNotes?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    readinessChecks?: ReadinessCheckUncheckedUpdateManyWithoutStopNoteNestedInput
    exceptionLogs?: ExceptionLogUncheckedUpdateManyWithoutStopNoteNestedInput
  }

  export type PricingProfileCreateManyCompanyInput = {
    id?: string
    widgetSettingsId?: string | null
    baseRatePerMile?: number
    minimumCharge?: number
    useMinimumCharge?: boolean
    minMilesThreshold?: number
    weightFee?: number
    itemCountFee?: number
    stairsFee?: number
    insideDeliveryFee?: number
    addon3Fee?: number
    afterHoursFee?: number
    businessHoursStart?: string
    businessHoursEnd?: string
    businessDays?: string
    largeItemFee?: number
    largeItemsEnabled?: boolean
    largeItemCategories?: JsonNullValueInput | InputJsonValue
  }

  export type QuoteRequestCreateManyCompanyInput = {
    id?: string
    customerName: string
    customerEmail: string
    customerPhone?: string | null
    pickupZip: string
    dropoffZip: string
    distanceMiles: number
    serviceType: string
    packageSize?: string | null
    packageWeight?: string | null
    selectedExtras?: string | null
    status?: string
    estimatedPrice: number
    vehicleCount?: number | null
    awbNumber?: string | null
    paymentStatus?: string | null
    stripePaymentIntentId?: string | null
    internalNotes?: string | null
    paidAt?: Date | string | null
    createdAt?: Date | string
  }

  export type WidgetSettingsCreateManyCompanyInput = {
    id?: string
    name?: string
    logoUrl?: string | null
    showWeight?: boolean
    showItemCount?: boolean
    showExtras?: boolean
    insideDeliveryLabel?: string
    addon3Label?: string
    primaryColor?: string
    buttonText?: string
    headerText?: string
    disclaimerText?: string
    companyNameText?: string | null
    companyNameFont?: string
    backgroundImageUrl?: string | null
    mapLayout?: string
    websiteUrl?: string | null
    paymentsEnabled?: boolean
    showVehicles?: boolean
    pricePerVehicle?: number
    showAwb?: boolean
    geoFencingEnabled?: boolean
    serviceZips?: WidgetSettingsCreateserviceZipsInput | string[]
  }

  export type WebhookCreateManyCompanyInput = {
    id?: string
    url: string
    secret: string
    events?: WebhookCreateeventsInput | string[]
    enabled?: boolean
    createdAt?: Date | string
  }

  export type ShopifyInstallCreateManyCompanyInput = {
    id?: string
    shop: string
    accessToken: string
    scriptTagId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StopNoteCreateManyCompanyInput = {
    id?: string
    companyName: string
    address: string
    contactName?: string | null
    contactPhone?: string | null
    gateCode?: string | null
    dockInfo?: string | null
    hours?: string | null
    parkingNotes?: string | null
    accessNotes?: string | null
    deliveryNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobCreateManyCompanyInput = {
    id?: string
    quoteRequestId?: string | null
    status?: string
    scheduledDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PricingProfileUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    baseRatePerMile?: FloatFieldUpdateOperationsInput | number
    minimumCharge?: FloatFieldUpdateOperationsInput | number
    useMinimumCharge?: BoolFieldUpdateOperationsInput | boolean
    minMilesThreshold?: FloatFieldUpdateOperationsInput | number
    weightFee?: FloatFieldUpdateOperationsInput | number
    itemCountFee?: FloatFieldUpdateOperationsInput | number
    stairsFee?: FloatFieldUpdateOperationsInput | number
    insideDeliveryFee?: FloatFieldUpdateOperationsInput | number
    addon3Fee?: FloatFieldUpdateOperationsInput | number
    afterHoursFee?: FloatFieldUpdateOperationsInput | number
    businessHoursStart?: StringFieldUpdateOperationsInput | string
    businessHoursEnd?: StringFieldUpdateOperationsInput | string
    businessDays?: StringFieldUpdateOperationsInput | string
    largeItemFee?: FloatFieldUpdateOperationsInput | number
    largeItemsEnabled?: BoolFieldUpdateOperationsInput | boolean
    largeItemCategories?: JsonNullValueInput | InputJsonValue
    widgetSettings?: WidgetSettingsUpdateOneWithoutPricingProfileNestedInput
  }

  export type PricingProfileUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    widgetSettingsId?: NullableStringFieldUpdateOperationsInput | string | null
    baseRatePerMile?: FloatFieldUpdateOperationsInput | number
    minimumCharge?: FloatFieldUpdateOperationsInput | number
    useMinimumCharge?: BoolFieldUpdateOperationsInput | boolean
    minMilesThreshold?: FloatFieldUpdateOperationsInput | number
    weightFee?: FloatFieldUpdateOperationsInput | number
    itemCountFee?: FloatFieldUpdateOperationsInput | number
    stairsFee?: FloatFieldUpdateOperationsInput | number
    insideDeliveryFee?: FloatFieldUpdateOperationsInput | number
    addon3Fee?: FloatFieldUpdateOperationsInput | number
    afterHoursFee?: FloatFieldUpdateOperationsInput | number
    businessHoursStart?: StringFieldUpdateOperationsInput | string
    businessHoursEnd?: StringFieldUpdateOperationsInput | string
    businessDays?: StringFieldUpdateOperationsInput | string
    largeItemFee?: FloatFieldUpdateOperationsInput | number
    largeItemsEnabled?: BoolFieldUpdateOperationsInput | boolean
    largeItemCategories?: JsonNullValueInput | InputJsonValue
  }

  export type PricingProfileUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    widgetSettingsId?: NullableStringFieldUpdateOperationsInput | string | null
    baseRatePerMile?: FloatFieldUpdateOperationsInput | number
    minimumCharge?: FloatFieldUpdateOperationsInput | number
    useMinimumCharge?: BoolFieldUpdateOperationsInput | boolean
    minMilesThreshold?: FloatFieldUpdateOperationsInput | number
    weightFee?: FloatFieldUpdateOperationsInput | number
    itemCountFee?: FloatFieldUpdateOperationsInput | number
    stairsFee?: FloatFieldUpdateOperationsInput | number
    insideDeliveryFee?: FloatFieldUpdateOperationsInput | number
    addon3Fee?: FloatFieldUpdateOperationsInput | number
    afterHoursFee?: FloatFieldUpdateOperationsInput | number
    businessHoursStart?: StringFieldUpdateOperationsInput | string
    businessHoursEnd?: StringFieldUpdateOperationsInput | string
    businessDays?: StringFieldUpdateOperationsInput | string
    largeItemFee?: FloatFieldUpdateOperationsInput | number
    largeItemsEnabled?: BoolFieldUpdateOperationsInput | boolean
    largeItemCategories?: JsonNullValueInput | InputJsonValue
  }

  export type QuoteRequestUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    pickupZip?: StringFieldUpdateOperationsInput | string
    dropoffZip?: StringFieldUpdateOperationsInput | string
    distanceMiles?: FloatFieldUpdateOperationsInput | number
    serviceType?: StringFieldUpdateOperationsInput | string
    packageSize?: NullableStringFieldUpdateOperationsInput | string | null
    packageWeight?: NullableStringFieldUpdateOperationsInput | string | null
    selectedExtras?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    estimatedPrice?: FloatFieldUpdateOperationsInput | number
    vehicleCount?: NullableIntFieldUpdateOperationsInput | number | null
    awbNumber?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: NullableStringFieldUpdateOperationsInput | string | null
    stripePaymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    internalNotes?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobs?: JobUpdateManyWithoutQuoteRequestNestedInput
  }

  export type QuoteRequestUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    pickupZip?: StringFieldUpdateOperationsInput | string
    dropoffZip?: StringFieldUpdateOperationsInput | string
    distanceMiles?: FloatFieldUpdateOperationsInput | number
    serviceType?: StringFieldUpdateOperationsInput | string
    packageSize?: NullableStringFieldUpdateOperationsInput | string | null
    packageWeight?: NullableStringFieldUpdateOperationsInput | string | null
    selectedExtras?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    estimatedPrice?: FloatFieldUpdateOperationsInput | number
    vehicleCount?: NullableIntFieldUpdateOperationsInput | number | null
    awbNumber?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: NullableStringFieldUpdateOperationsInput | string | null
    stripePaymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    internalNotes?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobs?: JobUncheckedUpdateManyWithoutQuoteRequestNestedInput
  }

  export type QuoteRequestUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    pickupZip?: StringFieldUpdateOperationsInput | string
    dropoffZip?: StringFieldUpdateOperationsInput | string
    distanceMiles?: FloatFieldUpdateOperationsInput | number
    serviceType?: StringFieldUpdateOperationsInput | string
    packageSize?: NullableStringFieldUpdateOperationsInput | string | null
    packageWeight?: NullableStringFieldUpdateOperationsInput | string | null
    selectedExtras?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    estimatedPrice?: FloatFieldUpdateOperationsInput | number
    vehicleCount?: NullableIntFieldUpdateOperationsInput | number | null
    awbNumber?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: NullableStringFieldUpdateOperationsInput | string | null
    stripePaymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    internalNotes?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WidgetSettingsUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    showWeight?: BoolFieldUpdateOperationsInput | boolean
    showItemCount?: BoolFieldUpdateOperationsInput | boolean
    showExtras?: BoolFieldUpdateOperationsInput | boolean
    insideDeliveryLabel?: StringFieldUpdateOperationsInput | string
    addon3Label?: StringFieldUpdateOperationsInput | string
    primaryColor?: StringFieldUpdateOperationsInput | string
    buttonText?: StringFieldUpdateOperationsInput | string
    headerText?: StringFieldUpdateOperationsInput | string
    disclaimerText?: StringFieldUpdateOperationsInput | string
    companyNameText?: NullableStringFieldUpdateOperationsInput | string | null
    companyNameFont?: StringFieldUpdateOperationsInput | string
    backgroundImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mapLayout?: StringFieldUpdateOperationsInput | string
    websiteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paymentsEnabled?: BoolFieldUpdateOperationsInput | boolean
    showVehicles?: BoolFieldUpdateOperationsInput | boolean
    pricePerVehicle?: FloatFieldUpdateOperationsInput | number
    showAwb?: BoolFieldUpdateOperationsInput | boolean
    geoFencingEnabled?: BoolFieldUpdateOperationsInput | boolean
    serviceZips?: WidgetSettingsUpdateserviceZipsInput | string[]
    pricingProfile?: PricingProfileUpdateOneWithoutWidgetSettingsNestedInput
  }

  export type WidgetSettingsUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    showWeight?: BoolFieldUpdateOperationsInput | boolean
    showItemCount?: BoolFieldUpdateOperationsInput | boolean
    showExtras?: BoolFieldUpdateOperationsInput | boolean
    insideDeliveryLabel?: StringFieldUpdateOperationsInput | string
    addon3Label?: StringFieldUpdateOperationsInput | string
    primaryColor?: StringFieldUpdateOperationsInput | string
    buttonText?: StringFieldUpdateOperationsInput | string
    headerText?: StringFieldUpdateOperationsInput | string
    disclaimerText?: StringFieldUpdateOperationsInput | string
    companyNameText?: NullableStringFieldUpdateOperationsInput | string | null
    companyNameFont?: StringFieldUpdateOperationsInput | string
    backgroundImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mapLayout?: StringFieldUpdateOperationsInput | string
    websiteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paymentsEnabled?: BoolFieldUpdateOperationsInput | boolean
    showVehicles?: BoolFieldUpdateOperationsInput | boolean
    pricePerVehicle?: FloatFieldUpdateOperationsInput | number
    showAwb?: BoolFieldUpdateOperationsInput | boolean
    geoFencingEnabled?: BoolFieldUpdateOperationsInput | boolean
    serviceZips?: WidgetSettingsUpdateserviceZipsInput | string[]
    pricingProfile?: PricingProfileUncheckedUpdateOneWithoutWidgetSettingsNestedInput
  }

  export type WidgetSettingsUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    showWeight?: BoolFieldUpdateOperationsInput | boolean
    showItemCount?: BoolFieldUpdateOperationsInput | boolean
    showExtras?: BoolFieldUpdateOperationsInput | boolean
    insideDeliveryLabel?: StringFieldUpdateOperationsInput | string
    addon3Label?: StringFieldUpdateOperationsInput | string
    primaryColor?: StringFieldUpdateOperationsInput | string
    buttonText?: StringFieldUpdateOperationsInput | string
    headerText?: StringFieldUpdateOperationsInput | string
    disclaimerText?: StringFieldUpdateOperationsInput | string
    companyNameText?: NullableStringFieldUpdateOperationsInput | string | null
    companyNameFont?: StringFieldUpdateOperationsInput | string
    backgroundImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mapLayout?: StringFieldUpdateOperationsInput | string
    websiteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paymentsEnabled?: BoolFieldUpdateOperationsInput | boolean
    showVehicles?: BoolFieldUpdateOperationsInput | boolean
    pricePerVehicle?: FloatFieldUpdateOperationsInput | number
    showAwb?: BoolFieldUpdateOperationsInput | boolean
    geoFencingEnabled?: BoolFieldUpdateOperationsInput | boolean
    serviceZips?: WidgetSettingsUpdateserviceZipsInput | string[]
  }

  export type WebhookUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    secret?: StringFieldUpdateOperationsInput | string
    events?: WebhookUpdateeventsInput | string[]
    enabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    secret?: StringFieldUpdateOperationsInput | string
    events?: WebhookUpdateeventsInput | string[]
    enabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    secret?: StringFieldUpdateOperationsInput | string
    events?: WebhookUpdateeventsInput | string[]
    enabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShopifyInstallUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    scriptTagId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShopifyInstallUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    scriptTagId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShopifyInstallUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    scriptTagId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StopNoteUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    gateCode?: NullableStringFieldUpdateOperationsInput | string | null
    dockInfo?: NullableStringFieldUpdateOperationsInput | string | null
    hours?: NullableStringFieldUpdateOperationsInput | string | null
    parkingNotes?: NullableStringFieldUpdateOperationsInput | string | null
    accessNotes?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    readinessChecks?: ReadinessCheckUpdateManyWithoutStopNoteNestedInput
    exceptionLogs?: ExceptionLogUpdateManyWithoutStopNoteNestedInput
    jobStops?: JobStopUpdateManyWithoutStopNoteNestedInput
  }

  export type StopNoteUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    gateCode?: NullableStringFieldUpdateOperationsInput | string | null
    dockInfo?: NullableStringFieldUpdateOperationsInput | string | null
    hours?: NullableStringFieldUpdateOperationsInput | string | null
    parkingNotes?: NullableStringFieldUpdateOperationsInput | string | null
    accessNotes?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    readinessChecks?: ReadinessCheckUncheckedUpdateManyWithoutStopNoteNestedInput
    exceptionLogs?: ExceptionLogUncheckedUpdateManyWithoutStopNoteNestedInput
    jobStops?: JobStopUncheckedUpdateManyWithoutStopNoteNestedInput
  }

  export type StopNoteUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    gateCode?: NullableStringFieldUpdateOperationsInput | string | null
    dockInfo?: NullableStringFieldUpdateOperationsInput | string | null
    hours?: NullableStringFieldUpdateOperationsInput | string | null
    parkingNotes?: NullableStringFieldUpdateOperationsInput | string | null
    accessNotes?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quoteRequest?: QuoteRequestUpdateOneWithoutJobsNestedInput
    stops?: JobStopUpdateManyWithoutJobNestedInput
    readinessChecks?: ReadinessCheckUpdateManyWithoutJobNestedInput
    exceptionLogs?: ExceptionLogUpdateManyWithoutJobNestedInput
  }

  export type JobUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    quoteRequestId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stops?: JobStopUncheckedUpdateManyWithoutJobNestedInput
    readinessChecks?: ReadinessCheckUncheckedUpdateManyWithoutJobNestedInput
    exceptionLogs?: ExceptionLogUncheckedUpdateManyWithoutJobNestedInput
  }

  export type JobUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    quoteRequestId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobCreateManyQuoteRequestInput = {
    id?: string
    companyId: string
    status?: string
    scheduledDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobUpdateWithoutQuoteRequestInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutJobsNestedInput
    stops?: JobStopUpdateManyWithoutJobNestedInput
    readinessChecks?: ReadinessCheckUpdateManyWithoutJobNestedInput
    exceptionLogs?: ExceptionLogUpdateManyWithoutJobNestedInput
  }

  export type JobUncheckedUpdateWithoutQuoteRequestInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stops?: JobStopUncheckedUpdateManyWithoutJobNestedInput
    readinessChecks?: ReadinessCheckUncheckedUpdateManyWithoutJobNestedInput
    exceptionLogs?: ExceptionLogUncheckedUpdateManyWithoutJobNestedInput
  }

  export type JobUncheckedUpdateManyWithoutQuoteRequestInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReadinessCheckCreateManyStopNoteInput = {
    id?: string
    scheduledDate: Date | string
    contactConfirmed?: boolean
    addressConfirmed?: boolean
    accessConfirmed?: boolean
    siteReady?: boolean
    notes?: string | null
    status?: string
    createdAt?: Date | string
    jobId?: string | null
  }

  export type ExceptionLogCreateManyStopNoteInput = {
    id?: string
    type: string
    notes?: string | null
    timestamp?: Date | string
    jobId?: string | null
  }

  export type JobStopCreateManyStopNoteInput = {
    id?: string
    jobId: string
    order?: number
  }

  export type ReadinessCheckUpdateWithoutStopNoteInput = {
    id?: StringFieldUpdateOperationsInput | string
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
    contactConfirmed?: BoolFieldUpdateOperationsInput | boolean
    addressConfirmed?: BoolFieldUpdateOperationsInput | boolean
    accessConfirmed?: BoolFieldUpdateOperationsInput | boolean
    siteReady?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    job?: JobUpdateOneWithoutReadinessChecksNestedInput
  }

  export type ReadinessCheckUncheckedUpdateWithoutStopNoteInput = {
    id?: StringFieldUpdateOperationsInput | string
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
    contactConfirmed?: BoolFieldUpdateOperationsInput | boolean
    addressConfirmed?: BoolFieldUpdateOperationsInput | boolean
    accessConfirmed?: BoolFieldUpdateOperationsInput | boolean
    siteReady?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReadinessCheckUncheckedUpdateManyWithoutStopNoteInput = {
    id?: StringFieldUpdateOperationsInput | string
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
    contactConfirmed?: BoolFieldUpdateOperationsInput | boolean
    addressConfirmed?: BoolFieldUpdateOperationsInput | boolean
    accessConfirmed?: BoolFieldUpdateOperationsInput | boolean
    siteReady?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ExceptionLogUpdateWithoutStopNoteInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    job?: JobUpdateOneWithoutExceptionLogsNestedInput
  }

  export type ExceptionLogUncheckedUpdateWithoutStopNoteInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    jobId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ExceptionLogUncheckedUpdateManyWithoutStopNoteInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    jobId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type JobStopUpdateWithoutStopNoteInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    job?: JobUpdateOneRequiredWithoutStopsNestedInput
  }

  export type JobStopUncheckedUpdateWithoutStopNoteInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
  }

  export type JobStopUncheckedUpdateManyWithoutStopNoteInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
  }

  export type JobStopCreateManyJobInput = {
    id?: string
    stopNoteId: string
    order?: number
  }

  export type ReadinessCheckCreateManyJobInput = {
    id?: string
    stopNoteId: string
    scheduledDate: Date | string
    contactConfirmed?: boolean
    addressConfirmed?: boolean
    accessConfirmed?: boolean
    siteReady?: boolean
    notes?: string | null
    status?: string
    createdAt?: Date | string
  }

  export type ExceptionLogCreateManyJobInput = {
    id?: string
    stopNoteId?: string | null
    type: string
    notes?: string | null
    timestamp?: Date | string
  }

  export type JobStopUpdateWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    stopNote?: StopNoteUpdateOneRequiredWithoutJobStopsNestedInput
  }

  export type JobStopUncheckedUpdateWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    stopNoteId?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
  }

  export type JobStopUncheckedUpdateManyWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    stopNoteId?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
  }

  export type ReadinessCheckUpdateWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
    contactConfirmed?: BoolFieldUpdateOperationsInput | boolean
    addressConfirmed?: BoolFieldUpdateOperationsInput | boolean
    accessConfirmed?: BoolFieldUpdateOperationsInput | boolean
    siteReady?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stopNote?: StopNoteUpdateOneRequiredWithoutReadinessChecksNestedInput
  }

  export type ReadinessCheckUncheckedUpdateWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    stopNoteId?: StringFieldUpdateOperationsInput | string
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
    contactConfirmed?: BoolFieldUpdateOperationsInput | boolean
    addressConfirmed?: BoolFieldUpdateOperationsInput | boolean
    accessConfirmed?: BoolFieldUpdateOperationsInput | boolean
    siteReady?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReadinessCheckUncheckedUpdateManyWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    stopNoteId?: StringFieldUpdateOperationsInput | string
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
    contactConfirmed?: BoolFieldUpdateOperationsInput | boolean
    addressConfirmed?: BoolFieldUpdateOperationsInput | boolean
    accessConfirmed?: BoolFieldUpdateOperationsInput | boolean
    siteReady?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExceptionLogUpdateWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    stopNote?: StopNoteUpdateOneWithoutExceptionLogsNestedInput
  }

  export type ExceptionLogUncheckedUpdateWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    stopNoteId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExceptionLogUncheckedUpdateManyWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    stopNoteId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}