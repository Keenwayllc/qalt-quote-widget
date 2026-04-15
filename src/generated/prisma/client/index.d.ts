
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
    PartnerInquiry: 'PartnerInquiry'
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
      modelProps: "company" | "pricingProfile" | "widgetSettings" | "quoteRequest" | "webhook" | "shopifyInstall" | "partnerInquiry"
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
  }

  export type CompanyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pricingProfiles?: boolean | CompanyCountOutputTypeCountPricingProfilesArgs
    quoteRequests?: boolean | CompanyCountOutputTypeCountQuoteRequestsArgs
    widgetSettings?: boolean | CompanyCountOutputTypeCountWidgetSettingsArgs
    webhooks?: boolean | CompanyCountOutputTypeCountWebhooksArgs
    shopifyInstalls?: boolean | CompanyCountOutputTypeCountShopifyInstallsArgs
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
    timezone: string | null
    subscriptionPlan: string | null
    stripeCustomerId: string | null
    stripeSubscriptionId: string | null
    stripeConnectAccountId: string | null
    trialEndsAt: Date | null
    createdAt: Date | null
  }

  export type CompanyMaxAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    name: string | null
    logoUrl: string | null
    timezone: string | null
    subscriptionPlan: string | null
    stripeCustomerId: string | null
    stripeSubscriptionId: string | null
    stripeConnectAccountId: string | null
    trialEndsAt: Date | null
    createdAt: Date | null
  }

  export type CompanyCountAggregateOutputType = {
    id: number
    email: number
    passwordHash: number
    name: number
    logoUrl: number
    timezone: number
    subscriptionPlan: number
    stripeCustomerId: number
    stripeSubscriptionId: number
    stripeConnectAccountId: number
    trialEndsAt: number
    createdAt: number
    _all: number
  }


  export type CompanyMinAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    name?: true
    logoUrl?: true
    timezone?: true
    subscriptionPlan?: true
    stripeCustomerId?: true
    stripeSubscriptionId?: true
    stripeConnectAccountId?: true
    trialEndsAt?: true
    createdAt?: true
  }

  export type CompanyMaxAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    name?: true
    logoUrl?: true
    timezone?: true
    subscriptionPlan?: true
    stripeCustomerId?: true
    stripeSubscriptionId?: true
    stripeConnectAccountId?: true
    trialEndsAt?: true
    createdAt?: true
  }

  export type CompanyCountAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    name?: true
    logoUrl?: true
    timezone?: true
    subscriptionPlan?: true
    stripeCustomerId?: true
    stripeSubscriptionId?: true
    stripeConnectAccountId?: true
    trialEndsAt?: true
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
    timezone: string
    subscriptionPlan: string
    stripeCustomerId: string | null
    stripeSubscriptionId: string | null
    stripeConnectAccountId: string | null
    trialEndsAt: Date | null
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
    timezone?: boolean
    subscriptionPlan?: boolean
    stripeCustomerId?: boolean
    stripeSubscriptionId?: boolean
    stripeConnectAccountId?: boolean
    trialEndsAt?: boolean
    createdAt?: boolean
    pricingProfiles?: boolean | Company$pricingProfilesArgs<ExtArgs>
    quoteRequests?: boolean | Company$quoteRequestsArgs<ExtArgs>
    widgetSettings?: boolean | Company$widgetSettingsArgs<ExtArgs>
    webhooks?: boolean | Company$webhooksArgs<ExtArgs>
    shopifyInstalls?: boolean | Company$shopifyInstallsArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["company"]>

  export type CompanySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    name?: boolean
    logoUrl?: boolean
    timezone?: boolean
    subscriptionPlan?: boolean
    stripeCustomerId?: boolean
    stripeSubscriptionId?: boolean
    stripeConnectAccountId?: boolean
    trialEndsAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["company"]>

  export type CompanySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    name?: boolean
    logoUrl?: boolean
    timezone?: boolean
    subscriptionPlan?: boolean
    stripeCustomerId?: boolean
    stripeSubscriptionId?: boolean
    stripeConnectAccountId?: boolean
    trialEndsAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["company"]>

  export type CompanySelectScalar = {
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    name?: boolean
    logoUrl?: boolean
    timezone?: boolean
    subscriptionPlan?: boolean
    stripeCustomerId?: boolean
    stripeSubscriptionId?: boolean
    stripeConnectAccountId?: boolean
    trialEndsAt?: boolean
    createdAt?: boolean
  }

  export type CompanyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "passwordHash" | "name" | "logoUrl" | "timezone" | "subscriptionPlan" | "stripeCustomerId" | "stripeSubscriptionId" | "stripeConnectAccountId" | "trialEndsAt" | "createdAt", ExtArgs["result"]["company"]>
  export type CompanyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pricingProfiles?: boolean | Company$pricingProfilesArgs<ExtArgs>
    quoteRequests?: boolean | Company$quoteRequestsArgs<ExtArgs>
    widgetSettings?: boolean | Company$widgetSettingsArgs<ExtArgs>
    webhooks?: boolean | Company$webhooksArgs<ExtArgs>
    shopifyInstalls?: boolean | Company$shopifyInstallsArgs<ExtArgs>
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
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      passwordHash: string
      name: string
      logoUrl: string | null
      timezone: string
      subscriptionPlan: string
      stripeCustomerId: string | null
      stripeSubscriptionId: string | null
      stripeConnectAccountId: string | null
      trialEndsAt: Date | null
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
    readonly timezone: FieldRef<"Company", 'String'>
    readonly subscriptionPlan: FieldRef<"Company", 'String'>
    readonly stripeCustomerId: FieldRef<"Company", 'String'>
    readonly stripeSubscriptionId: FieldRef<"Company", 'String'>
    readonly stripeConnectAccountId: FieldRef<"Company", 'String'>
    readonly trialEndsAt: FieldRef<"Company", 'DateTime'>
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
    afterHoursFee?: boolean
    businessHoursStart?: boolean
    businessHoursEnd?: boolean
    businessDays?: boolean
    largeItemFee?: boolean
    largeItemsEnabled?: boolean
    largeItemCategories?: boolean
  }

  export type PricingProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "companyId" | "widgetSettingsId" | "baseRatePerMile" | "minimumCharge" | "useMinimumCharge" | "minMilesThreshold" | "weightFee" | "itemCountFee" | "stairsFee" | "insideDeliveryFee" | "afterHoursFee" | "businessHoursStart" | "businessHoursEnd" | "businessDays" | "largeItemFee" | "largeItemsEnabled" | "largeItemCategories", ExtArgs["result"]["pricingProfile"]>
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
  }

  export type WidgetSettingsMaxAggregateOutputType = {
    id: string | null
    companyId: string | null
    name: string | null
    logoUrl: string | null
    showWeight: boolean | null
    showItemCount: boolean | null
    showExtras: boolean | null
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
  }

  export type WidgetSettingsCountAggregateOutputType = {
    id: number
    companyId: number
    name: number
    logoUrl: number
    showWeight: number
    showItemCount: number
    showExtras: number
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
  }

  export type WidgetSettingsMaxAggregateInputType = {
    id?: true
    companyId?: true
    name?: true
    logoUrl?: true
    showWeight?: true
    showItemCount?: true
    showExtras?: true
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
  }

  export type WidgetSettingsCountAggregateInputType = {
    id?: true
    companyId?: true
    name?: true
    logoUrl?: true
    showWeight?: true
    showItemCount?: true
    showExtras?: true
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
  }

  export type WidgetSettingsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "companyId" | "name" | "logoUrl" | "showWeight" | "showItemCount" | "showExtras" | "primaryColor" | "buttonText" | "headerText" | "disclaimerText" | "companyNameText" | "companyNameFont" | "backgroundImageUrl" | "mapLayout" | "websiteUrl" | "paymentsEnabled" | "showVehicles" | "pricePerVehicle" | "showAwb", ExtArgs["result"]["widgetSettings"]>
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
    timezone: 'timezone',
    subscriptionPlan: 'subscriptionPlan',
    stripeCustomerId: 'stripeCustomerId',
    stripeSubscriptionId: 'stripeSubscriptionId',
    stripeConnectAccountId: 'stripeConnectAccountId',
    trialEndsAt: 'trialEndsAt',
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
    showAwb: 'showAwb'
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


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


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
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


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
    timezone?: StringFilter<"Company"> | string
    subscriptionPlan?: StringFilter<"Company"> | string
    stripeCustomerId?: StringNullableFilter<"Company"> | string | null
    stripeSubscriptionId?: StringNullableFilter<"Company"> | string | null
    stripeConnectAccountId?: StringNullableFilter<"Company"> | string | null
    trialEndsAt?: DateTimeNullableFilter<"Company"> | Date | string | null
    createdAt?: DateTimeFilter<"Company"> | Date | string
    pricingProfiles?: PricingProfileListRelationFilter
    quoteRequests?: QuoteRequestListRelationFilter
    widgetSettings?: WidgetSettingsListRelationFilter
    webhooks?: WebhookListRelationFilter
    shopifyInstalls?: ShopifyInstallListRelationFilter
  }

  export type CompanyOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    logoUrl?: SortOrderInput | SortOrder
    timezone?: SortOrder
    subscriptionPlan?: SortOrder
    stripeCustomerId?: SortOrderInput | SortOrder
    stripeSubscriptionId?: SortOrderInput | SortOrder
    stripeConnectAccountId?: SortOrderInput | SortOrder
    trialEndsAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    pricingProfiles?: PricingProfileOrderByRelationAggregateInput
    quoteRequests?: QuoteRequestOrderByRelationAggregateInput
    widgetSettings?: WidgetSettingsOrderByRelationAggregateInput
    webhooks?: WebhookOrderByRelationAggregateInput
    shopifyInstalls?: ShopifyInstallOrderByRelationAggregateInput
  }

  export type CompanyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    passwordHash?: StringFilter<"Company"> | string
    name?: StringFilter<"Company"> | string
    logoUrl?: StringNullableFilter<"Company"> | string | null
    timezone?: StringFilter<"Company"> | string
    subscriptionPlan?: StringFilter<"Company"> | string
    stripeCustomerId?: StringNullableFilter<"Company"> | string | null
    stripeSubscriptionId?: StringNullableFilter<"Company"> | string | null
    stripeConnectAccountId?: StringNullableFilter<"Company"> | string | null
    trialEndsAt?: DateTimeNullableFilter<"Company"> | Date | string | null
    createdAt?: DateTimeFilter<"Company"> | Date | string
    pricingProfiles?: PricingProfileListRelationFilter
    quoteRequests?: QuoteRequestListRelationFilter
    widgetSettings?: WidgetSettingsListRelationFilter
    webhooks?: WebhookListRelationFilter
    shopifyInstalls?: ShopifyInstallListRelationFilter
  }, "id" | "email">

  export type CompanyOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    logoUrl?: SortOrderInput | SortOrder
    timezone?: SortOrder
    subscriptionPlan?: SortOrder
    stripeCustomerId?: SortOrderInput | SortOrder
    stripeSubscriptionId?: SortOrderInput | SortOrder
    stripeConnectAccountId?: SortOrderInput | SortOrder
    trialEndsAt?: SortOrderInput | SortOrder
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
    timezone?: StringWithAggregatesFilter<"Company"> | string
    subscriptionPlan?: StringWithAggregatesFilter<"Company"> | string
    stripeCustomerId?: StringNullableWithAggregatesFilter<"Company"> | string | null
    stripeSubscriptionId?: StringNullableWithAggregatesFilter<"Company"> | string | null
    stripeConnectAccountId?: StringNullableWithAggregatesFilter<"Company"> | string | null
    trialEndsAt?: DateTimeNullableWithAggregatesFilter<"Company"> | Date | string | null
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

  export type CompanyCreateInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    logoUrl?: string | null
    timezone?: string
    subscriptionPlan?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripeConnectAccountId?: string | null
    trialEndsAt?: Date | string | null
    createdAt?: Date | string
    pricingProfiles?: PricingProfileCreateNestedManyWithoutCompanyInput
    quoteRequests?: QuoteRequestCreateNestedManyWithoutCompanyInput
    widgetSettings?: WidgetSettingsCreateNestedManyWithoutCompanyInput
    webhooks?: WebhookCreateNestedManyWithoutCompanyInput
    shopifyInstalls?: ShopifyInstallCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    logoUrl?: string | null
    timezone?: string
    subscriptionPlan?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripeConnectAccountId?: string | null
    trialEndsAt?: Date | string | null
    createdAt?: Date | string
    pricingProfiles?: PricingProfileUncheckedCreateNestedManyWithoutCompanyInput
    quoteRequests?: QuoteRequestUncheckedCreateNestedManyWithoutCompanyInput
    widgetSettings?: WidgetSettingsUncheckedCreateNestedManyWithoutCompanyInput
    webhooks?: WebhookUncheckedCreateNestedManyWithoutCompanyInput
    shopifyInstalls?: ShopifyInstallUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeConnectAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pricingProfiles?: PricingProfileUpdateManyWithoutCompanyNestedInput
    quoteRequests?: QuoteRequestUpdateManyWithoutCompanyNestedInput
    widgetSettings?: WidgetSettingsUpdateManyWithoutCompanyNestedInput
    webhooks?: WebhookUpdateManyWithoutCompanyNestedInput
    shopifyInstalls?: ShopifyInstallUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeConnectAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pricingProfiles?: PricingProfileUncheckedUpdateManyWithoutCompanyNestedInput
    quoteRequests?: QuoteRequestUncheckedUpdateManyWithoutCompanyNestedInput
    widgetSettings?: WidgetSettingsUncheckedUpdateManyWithoutCompanyNestedInput
    webhooks?: WebhookUncheckedUpdateManyWithoutCompanyNestedInput
    shopifyInstalls?: ShopifyInstallUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyCreateManyInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    logoUrl?: string | null
    timezone?: string
    subscriptionPlan?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripeConnectAccountId?: string | null
    trialEndsAt?: Date | string | null
    createdAt?: Date | string
  }

  export type CompanyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeConnectAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeConnectAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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
    pricingProfile?: PricingProfileUncheckedCreateNestedOneWithoutWidgetSettingsInput
  }

  export type WidgetSettingsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    showWeight?: BoolFieldUpdateOperationsInput | boolean
    showItemCount?: BoolFieldUpdateOperationsInput | boolean
    showExtras?: BoolFieldUpdateOperationsInput | boolean
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
  }

  export type WidgetSettingsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    showWeight?: BoolFieldUpdateOperationsInput | boolean
    showItemCount?: BoolFieldUpdateOperationsInput | boolean
    showExtras?: BoolFieldUpdateOperationsInput | boolean
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
  }

  export type WidgetSettingsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    showWeight?: BoolFieldUpdateOperationsInput | boolean
    showItemCount?: BoolFieldUpdateOperationsInput | boolean
    showExtras?: BoolFieldUpdateOperationsInput | boolean
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

  export type CompanyCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    logoUrl?: SortOrder
    timezone?: SortOrder
    subscriptionPlan?: SortOrder
    stripeCustomerId?: SortOrder
    stripeSubscriptionId?: SortOrder
    stripeConnectAccountId?: SortOrder
    trialEndsAt?: SortOrder
    createdAt?: SortOrder
  }

  export type CompanyMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    logoUrl?: SortOrder
    timezone?: SortOrder
    subscriptionPlan?: SortOrder
    stripeCustomerId?: SortOrder
    stripeSubscriptionId?: SortOrder
    stripeConnectAccountId?: SortOrder
    trialEndsAt?: SortOrder
    createdAt?: SortOrder
  }

  export type CompanyMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    logoUrl?: SortOrder
    timezone?: SortOrder
    subscriptionPlan?: SortOrder
    stripeCustomerId?: SortOrder
    stripeSubscriptionId?: SortOrder
    stripeConnectAccountId?: SortOrder
    trialEndsAt?: SortOrder
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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
  }

  export type WidgetSettingsMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    logoUrl?: SortOrder
    showWeight?: SortOrder
    showItemCount?: SortOrder
    showExtras?: SortOrder
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

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
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

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
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

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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
    pricingProfile?: PricingProfileCreateNestedOneWithoutWidgetSettingsInput
  }

  export type WidgetSettingsUncheckedCreateWithoutCompanyInput = {
    id?: string
    name?: string
    logoUrl?: string | null
    showWeight?: boolean
    showItemCount?: boolean
    showExtras?: boolean
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

  export type CompanyCreateWithoutPricingProfilesInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    logoUrl?: string | null
    timezone?: string
    subscriptionPlan?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripeConnectAccountId?: string | null
    trialEndsAt?: Date | string | null
    createdAt?: Date | string
    quoteRequests?: QuoteRequestCreateNestedManyWithoutCompanyInput
    widgetSettings?: WidgetSettingsCreateNestedManyWithoutCompanyInput
    webhooks?: WebhookCreateNestedManyWithoutCompanyInput
    shopifyInstalls?: ShopifyInstallCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutPricingProfilesInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    logoUrl?: string | null
    timezone?: string
    subscriptionPlan?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripeConnectAccountId?: string | null
    trialEndsAt?: Date | string | null
    createdAt?: Date | string
    quoteRequests?: QuoteRequestUncheckedCreateNestedManyWithoutCompanyInput
    widgetSettings?: WidgetSettingsUncheckedCreateNestedManyWithoutCompanyInput
    webhooks?: WebhookUncheckedCreateNestedManyWithoutCompanyInput
    shopifyInstalls?: ShopifyInstallUncheckedCreateNestedManyWithoutCompanyInput
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
    timezone?: StringFieldUpdateOperationsInput | string
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeConnectAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quoteRequests?: QuoteRequestUpdateManyWithoutCompanyNestedInput
    widgetSettings?: WidgetSettingsUpdateManyWithoutCompanyNestedInput
    webhooks?: WebhookUpdateManyWithoutCompanyNestedInput
    shopifyInstalls?: ShopifyInstallUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutPricingProfilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeConnectAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quoteRequests?: QuoteRequestUncheckedUpdateManyWithoutCompanyNestedInput
    widgetSettings?: WidgetSettingsUncheckedUpdateManyWithoutCompanyNestedInput
    webhooks?: WebhookUncheckedUpdateManyWithoutCompanyNestedInput
    shopifyInstalls?: ShopifyInstallUncheckedUpdateManyWithoutCompanyNestedInput
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
  }

  export type CompanyCreateWithoutWidgetSettingsInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    logoUrl?: string | null
    timezone?: string
    subscriptionPlan?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripeConnectAccountId?: string | null
    trialEndsAt?: Date | string | null
    createdAt?: Date | string
    pricingProfiles?: PricingProfileCreateNestedManyWithoutCompanyInput
    quoteRequests?: QuoteRequestCreateNestedManyWithoutCompanyInput
    webhooks?: WebhookCreateNestedManyWithoutCompanyInput
    shopifyInstalls?: ShopifyInstallCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutWidgetSettingsInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    logoUrl?: string | null
    timezone?: string
    subscriptionPlan?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripeConnectAccountId?: string | null
    trialEndsAt?: Date | string | null
    createdAt?: Date | string
    pricingProfiles?: PricingProfileUncheckedCreateNestedManyWithoutCompanyInput
    quoteRequests?: QuoteRequestUncheckedCreateNestedManyWithoutCompanyInput
    webhooks?: WebhookUncheckedCreateNestedManyWithoutCompanyInput
    shopifyInstalls?: ShopifyInstallUncheckedCreateNestedManyWithoutCompanyInput
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
    timezone?: StringFieldUpdateOperationsInput | string
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeConnectAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pricingProfiles?: PricingProfileUpdateManyWithoutCompanyNestedInput
    quoteRequests?: QuoteRequestUpdateManyWithoutCompanyNestedInput
    webhooks?: WebhookUpdateManyWithoutCompanyNestedInput
    shopifyInstalls?: ShopifyInstallUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutWidgetSettingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeConnectAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pricingProfiles?: PricingProfileUncheckedUpdateManyWithoutCompanyNestedInput
    quoteRequests?: QuoteRequestUncheckedUpdateManyWithoutCompanyNestedInput
    webhooks?: WebhookUncheckedUpdateManyWithoutCompanyNestedInput
    shopifyInstalls?: ShopifyInstallUncheckedUpdateManyWithoutCompanyNestedInput
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
    timezone?: string
    subscriptionPlan?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripeConnectAccountId?: string | null
    trialEndsAt?: Date | string | null
    createdAt?: Date | string
    pricingProfiles?: PricingProfileCreateNestedManyWithoutCompanyInput
    widgetSettings?: WidgetSettingsCreateNestedManyWithoutCompanyInput
    webhooks?: WebhookCreateNestedManyWithoutCompanyInput
    shopifyInstalls?: ShopifyInstallCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutQuoteRequestsInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    logoUrl?: string | null
    timezone?: string
    subscriptionPlan?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripeConnectAccountId?: string | null
    trialEndsAt?: Date | string | null
    createdAt?: Date | string
    pricingProfiles?: PricingProfileUncheckedCreateNestedManyWithoutCompanyInput
    widgetSettings?: WidgetSettingsUncheckedCreateNestedManyWithoutCompanyInput
    webhooks?: WebhookUncheckedCreateNestedManyWithoutCompanyInput
    shopifyInstalls?: ShopifyInstallUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutQuoteRequestsInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutQuoteRequestsInput, CompanyUncheckedCreateWithoutQuoteRequestsInput>
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
    timezone?: StringFieldUpdateOperationsInput | string
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeConnectAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pricingProfiles?: PricingProfileUpdateManyWithoutCompanyNestedInput
    widgetSettings?: WidgetSettingsUpdateManyWithoutCompanyNestedInput
    webhooks?: WebhookUpdateManyWithoutCompanyNestedInput
    shopifyInstalls?: ShopifyInstallUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutQuoteRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeConnectAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pricingProfiles?: PricingProfileUncheckedUpdateManyWithoutCompanyNestedInput
    widgetSettings?: WidgetSettingsUncheckedUpdateManyWithoutCompanyNestedInput
    webhooks?: WebhookUncheckedUpdateManyWithoutCompanyNestedInput
    shopifyInstalls?: ShopifyInstallUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyCreateWithoutWebhooksInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    logoUrl?: string | null
    timezone?: string
    subscriptionPlan?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripeConnectAccountId?: string | null
    trialEndsAt?: Date | string | null
    createdAt?: Date | string
    pricingProfiles?: PricingProfileCreateNestedManyWithoutCompanyInput
    quoteRequests?: QuoteRequestCreateNestedManyWithoutCompanyInput
    widgetSettings?: WidgetSettingsCreateNestedManyWithoutCompanyInput
    shopifyInstalls?: ShopifyInstallCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutWebhooksInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    logoUrl?: string | null
    timezone?: string
    subscriptionPlan?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripeConnectAccountId?: string | null
    trialEndsAt?: Date | string | null
    createdAt?: Date | string
    pricingProfiles?: PricingProfileUncheckedCreateNestedManyWithoutCompanyInput
    quoteRequests?: QuoteRequestUncheckedCreateNestedManyWithoutCompanyInput
    widgetSettings?: WidgetSettingsUncheckedCreateNestedManyWithoutCompanyInput
    shopifyInstalls?: ShopifyInstallUncheckedCreateNestedManyWithoutCompanyInput
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
    timezone?: StringFieldUpdateOperationsInput | string
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeConnectAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pricingProfiles?: PricingProfileUpdateManyWithoutCompanyNestedInput
    quoteRequests?: QuoteRequestUpdateManyWithoutCompanyNestedInput
    widgetSettings?: WidgetSettingsUpdateManyWithoutCompanyNestedInput
    shopifyInstalls?: ShopifyInstallUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutWebhooksInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeConnectAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pricingProfiles?: PricingProfileUncheckedUpdateManyWithoutCompanyNestedInput
    quoteRequests?: QuoteRequestUncheckedUpdateManyWithoutCompanyNestedInput
    widgetSettings?: WidgetSettingsUncheckedUpdateManyWithoutCompanyNestedInput
    shopifyInstalls?: ShopifyInstallUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyCreateWithoutShopifyInstallsInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    logoUrl?: string | null
    timezone?: string
    subscriptionPlan?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripeConnectAccountId?: string | null
    trialEndsAt?: Date | string | null
    createdAt?: Date | string
    pricingProfiles?: PricingProfileCreateNestedManyWithoutCompanyInput
    quoteRequests?: QuoteRequestCreateNestedManyWithoutCompanyInput
    widgetSettings?: WidgetSettingsCreateNestedManyWithoutCompanyInput
    webhooks?: WebhookCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutShopifyInstallsInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    logoUrl?: string | null
    timezone?: string
    subscriptionPlan?: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripeConnectAccountId?: string | null
    trialEndsAt?: Date | string | null
    createdAt?: Date | string
    pricingProfiles?: PricingProfileUncheckedCreateNestedManyWithoutCompanyInput
    quoteRequests?: QuoteRequestUncheckedCreateNestedManyWithoutCompanyInput
    widgetSettings?: WidgetSettingsUncheckedCreateNestedManyWithoutCompanyInput
    webhooks?: WebhookUncheckedCreateNestedManyWithoutCompanyInput
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
    timezone?: StringFieldUpdateOperationsInput | string
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeConnectAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pricingProfiles?: PricingProfileUpdateManyWithoutCompanyNestedInput
    quoteRequests?: QuoteRequestUpdateManyWithoutCompanyNestedInput
    widgetSettings?: WidgetSettingsUpdateManyWithoutCompanyNestedInput
    webhooks?: WebhookUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutShopifyInstallsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeConnectAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pricingProfiles?: PricingProfileUncheckedUpdateManyWithoutCompanyNestedInput
    quoteRequests?: QuoteRequestUncheckedUpdateManyWithoutCompanyNestedInput
    widgetSettings?: WidgetSettingsUncheckedUpdateManyWithoutCompanyNestedInput
    webhooks?: WebhookUncheckedUpdateManyWithoutCompanyNestedInput
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
    pricingProfile?: PricingProfileUpdateOneWithoutWidgetSettingsNestedInput
  }

  export type WidgetSettingsUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    showWeight?: BoolFieldUpdateOperationsInput | boolean
    showItemCount?: BoolFieldUpdateOperationsInput | boolean
    showExtras?: BoolFieldUpdateOperationsInput | boolean
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
    pricingProfile?: PricingProfileUncheckedUpdateOneWithoutWidgetSettingsNestedInput
  }

  export type WidgetSettingsUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    showWeight?: BoolFieldUpdateOperationsInput | boolean
    showItemCount?: BoolFieldUpdateOperationsInput | boolean
    showExtras?: BoolFieldUpdateOperationsInput | boolean
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