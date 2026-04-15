/**
 * Client
 **/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types; // general types
import $Public = runtime.Types.Public;
import $Utils = runtime.Types.Utils;
import $Extensions = runtime.Types.Extensions;
import $Result = runtime.Types.Result;

export type PrismaPromise<T> = $Public.PrismaPromise<T>;

/**
 * Model User
 * Participant in the system; owns memberships, messages, receipts, uploads.
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>;
/**
 * Model Room
 * Conversation container: either a GROUP with many members or DIRECT (two users, unique directKey).
 */
export type Room = $Result.DefaultSelection<Prisma.$RoomPayload>;
/**
 * Model RoomMember
 * Join table: which users belong to which room + per-user read pointers.
 */
export type RoomMember = $Result.DefaultSelection<Prisma.$RoomMemberPayload>;
/**
 * Model Message
 * A chat line item; optional thread link via replyToId (same room only, enforced in app layer).
 */
export type Message = $Result.DefaultSelection<Prisma.$MessagePayload>;
/**
 * Model Attachment
 * Binary payload metadata; may exist before a message claims it (messageId null while pending upload).
 */
export type Attachment = $Result.DefaultSelection<Prisma.$AttachmentPayload>;
/**
 * Model MessageReceipt
 * Per-user delivery/read state for a message (composite PK includes status).
 */
export type MessageReceipt =
  $Result.DefaultSelection<Prisma.$MessageReceiptPayload>;

/**
 * Enums
 */
export namespace $Enums {
  export const RoomType: {
    DIRECT: 'DIRECT';
    GROUP: 'GROUP';
  };

  export type RoomType = (typeof RoomType)[keyof typeof RoomType];

  export const RoomRole: {
    OWNER: 'OWNER';
    MEMBER: 'MEMBER';
  };

  export type RoomRole = (typeof RoomRole)[keyof typeof RoomRole];

  export const AttachmentKind: {
    IMAGE: 'IMAGE';
    FILE: 'FILE';
  };

  export type AttachmentKind =
    (typeof AttachmentKind)[keyof typeof AttachmentKind];

  export const ReceiptStatus: {
    DELIVERED: 'DELIVERED';
    READ: 'READ';
  };

  export type ReceiptStatus =
    (typeof ReceiptStatus)[keyof typeof ReceiptStatus];
}

export type RoomType = $Enums.RoomType;

export const RoomType: typeof $Enums.RoomType;

export type RoomRole = $Enums.RoomRole;

export const RoomRole: typeof $Enums.RoomRole;

export type AttachmentKind = $Enums.AttachmentKind;

export const AttachmentKind: typeof $Enums.AttachmentKind;

export type ReceiptStatus = $Enums.ReceiptStatus;

export const ReceiptStatus: typeof $Enums.ReceiptStatus;

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions
    ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
      ? Prisma.GetEvents<ClientOptions['log']>
      : never
    : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] };

  /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(
    optionsArg?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>,
  );
  $on<V extends U>(
    eventType: V,
    callback: (
      event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent,
    ) => void,
  ): PrismaClient;

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
  $executeRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

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
  $executeRawUnsafe<T = unknown>(
    query: string,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

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
  $queryRawUnsafe<T = unknown>(
    query: string,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(
    arg: [...P],
    options?: { isolationLevel?: Prisma.TransactionIsolationLevel },
  ): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;

  $transaction<R>(
    fn: (
      prisma: Omit<PrismaClient, runtime.ITXClientDenyList>,
    ) => $Utils.JsPromise<R>,
    options?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    },
  ): $Utils.JsPromise<R>;

  $extends: $Extensions.ExtendsHook<
    'extends',
    Prisma.TypeMapCb<ClientOptions>,
    ExtArgs,
    $Utils.Call<
      Prisma.TypeMapCb<ClientOptions>,
      {
        extArgs: ExtArgs;
      }
    >
  >;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.room`: Exposes CRUD operations for the **Room** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Rooms
   * const rooms = await prisma.room.findMany()
   * ```
   */
  get room(): Prisma.RoomDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.roomMember`: Exposes CRUD operations for the **RoomMember** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more RoomMembers
   * const roomMembers = await prisma.roomMember.findMany()
   * ```
   */
  get roomMember(): Prisma.RoomMemberDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.message`: Exposes CRUD operations for the **Message** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Messages
   * const messages = await prisma.message.findMany()
   * ```
   */
  get message(): Prisma.MessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.attachment`: Exposes CRUD operations for the **Attachment** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Attachments
   * const attachments = await prisma.attachment.findMany()
   * ```
   */
  get attachment(): Prisma.AttachmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.messageReceipt`: Exposes CRUD operations for the **MessageReceipt** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more MessageReceipts
   * const messageReceipts = await prisma.messageReceipt.findMany()
   * ```
   */
  get messageReceipt(): Prisma.MessageReceiptDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF;

  export type PrismaPromise<T> = $Public.PrismaPromise<T>;

  /**
   * Validator
   */
  export import validator = runtime.Public.validator;

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError;
  export import PrismaClientValidationError = runtime.PrismaClientValidationError;

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag;
  export import empty = runtime.empty;
  export import join = runtime.join;
  export import raw = runtime.raw;
  export import Sql = runtime.Sql;

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal;

  export type DecimalJsLike = runtime.DecimalJsLike;

  /**
   * Extensions
   */
  export import Extension = $Extensions.UserArgs;
  export import getExtensionContext = runtime.Extensions.getExtensionContext;
  export import Args = $Public.Args;
  export import Payload = $Public.Payload;
  export import Result = $Public.Result;
  export import Exact = $Public.Exact;

  /**
   * Prisma Client JS version: 7.7.0
   * Query Engine version: 75cbdc1eb7150937890ad5465d861175c6624711
   */
  export type PrismaVersion = {
    client: string;
    engine: string;
  };

  export const prismaVersion: PrismaVersion;

  /**
   * Utility Types
   */

  export import Bytes = runtime.Bytes;
  export import JsonObject = runtime.JsonObject;
  export import JsonArray = runtime.JsonArray;
  export import JsonValue = runtime.JsonValue;
  export import InputJsonObject = runtime.InputJsonObject;
  export import InputJsonArray = runtime.InputJsonArray;
  export import InputJsonValue = runtime.InputJsonValue;

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
      private DbNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.JsonNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class JsonNull {
      private JsonNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.AnyNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class AnyNull {
      private AnyNull: never;
      private constructor();
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull;

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull;

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull;

  type SelectAndInclude = {
    select: any;
    include: any;
  };

  type SelectAndOmit = {
    select: any;
    omit: any;
  };

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> =
    T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<
    T extends (...args: any) => $Utils.JsPromise<any>,
  > = PromiseType<ReturnType<T>>;

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K;
  }[keyof T];

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K;
  };

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>;

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
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & (T extends SelectAndInclude
    ? 'Please either choose `select` or `include`.'
    : T extends SelectAndOmit
      ? 'Please either choose `select` or `omit`.'
      : {});

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & K;

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = T extends object
    ? U extends object
      ? (Without<T, U> & U) | (Without<U, T> & T)
      : U
    : T;

  /**
   * Is T a Record?
   */
  type IsObject<T extends any> =
    T extends Array<any>
      ? False
      : T extends Date
        ? False
        : T extends Uint8Array
          ? False
          : T extends BigInt
            ? False
            : T extends object
              ? True
              : False;

  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O>; // With K possibilities
    }[K];

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<
    __Either<O, K>
  >;

  type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
  }[strict];

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1,
  > = O extends unknown ? _Either<O, K, strict> : never;

  export type Union = any;

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
  } & {};

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never;

  export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<
    Overwrite<
      U,
      {
        [K in keyof U]-?: At<U, K>;
      }
    >
  >;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O
    ? O[K]
    : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown
    ? AtStrict<O, K>
    : never;
  export type At<
    O extends object,
    K extends Key,
    strict extends Boolean = 1,
  > = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function
    ? A
    : {
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
      ?
          | (K extends keyof O ? { [P in K]: O[P] } & O : O)
          | ({ [P in keyof O as P extends K ? P : never]-?: O[P] } & O)
      : never
  >;

  type _Strict<U, _U = U> = U extends unknown
    ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>>
    : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False;

  // /**
  // 1
  // */
  export type True = 1;

  /**
  0
  */
  export type False = 0;

  export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
  }[B];

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
      ? 1
      : 0;

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >;

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0;
      1: 1;
    };
    1: {
      0: 1;
      1: 1;
    };
  }[B1][B2];

  export type Keys<U extends Union> = U extends unknown ? keyof U : never;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object
    ? {
        [P in keyof T]: P extends keyof O ? O[P] : never;
      }
    : never;

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>,
  > = IsObject<T> extends True ? U : T;

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<
            UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never
          >
        : never
      : {} extends FieldPaths<T[K]>
        ? never
        : K;
  }[keyof T];

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<
    T,
    K extends Enumerable<keyof T> | keyof T,
  > = Prisma__Pick<T, MaybeTupleToUnion<K>>;

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}`
    ? never
    : T;

  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;

  type FieldRefInputType<Model, FieldType> = Model extends never
    ? never
    : FieldRef<Model, FieldType>;

  export const ModelName: {
    User: 'User';
    Room: 'Room';
    RoomMember: 'RoomMember';
    Message: 'Message';
    Attachment: 'Attachment';
    MessageReceipt: 'MessageReceipt';
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName];

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<
    { extArgs: $Extensions.InternalArgs },
    $Utils.Record<string, any>
  > {
    returns: Prisma.TypeMap<
      this['params']['extArgs'],
      ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}
    >;
  }

  export type TypeMap<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > = {
    globalOmitOptions: {
      omit: GlobalOmitOptions;
    };
    meta: {
      modelProps:
        | 'user'
        | 'room'
        | 'roomMember'
        | 'message'
        | 'attachment'
        | 'messageReceipt';
      txIsolationLevel: Prisma.TransactionIsolationLevel;
    };
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>;
        fields: Prisma.UserFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateUser>;
          };
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>;
            result: $Utils.Optional<UserGroupByOutputType>[];
          };
          count: {
            args: Prisma.UserCountArgs<ExtArgs>;
            result: $Utils.Optional<UserCountAggregateOutputType> | number;
          };
        };
      };
      Room: {
        payload: Prisma.$RoomPayload<ExtArgs>;
        fields: Prisma.RoomFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.RoomFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RoomPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.RoomFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>;
          };
          findFirst: {
            args: Prisma.RoomFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RoomPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.RoomFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>;
          };
          findMany: {
            args: Prisma.RoomFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>[];
          };
          create: {
            args: Prisma.RoomCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>;
          };
          createMany: {
            args: Prisma.RoomCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.RoomCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>[];
          };
          delete: {
            args: Prisma.RoomDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>;
          };
          update: {
            args: Prisma.RoomUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>;
          };
          deleteMany: {
            args: Prisma.RoomDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.RoomUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.RoomUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>[];
          };
          upsert: {
            args: Prisma.RoomUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>;
          };
          aggregate: {
            args: Prisma.RoomAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateRoom>;
          };
          groupBy: {
            args: Prisma.RoomGroupByArgs<ExtArgs>;
            result: $Utils.Optional<RoomGroupByOutputType>[];
          };
          count: {
            args: Prisma.RoomCountArgs<ExtArgs>;
            result: $Utils.Optional<RoomCountAggregateOutputType> | number;
          };
        };
      };
      RoomMember: {
        payload: Prisma.$RoomMemberPayload<ExtArgs>;
        fields: Prisma.RoomMemberFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.RoomMemberFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RoomMemberPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.RoomMemberFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RoomMemberPayload>;
          };
          findFirst: {
            args: Prisma.RoomMemberFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RoomMemberPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.RoomMemberFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RoomMemberPayload>;
          };
          findMany: {
            args: Prisma.RoomMemberFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RoomMemberPayload>[];
          };
          create: {
            args: Prisma.RoomMemberCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RoomMemberPayload>;
          };
          createMany: {
            args: Prisma.RoomMemberCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.RoomMemberCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RoomMemberPayload>[];
          };
          delete: {
            args: Prisma.RoomMemberDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RoomMemberPayload>;
          };
          update: {
            args: Prisma.RoomMemberUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RoomMemberPayload>;
          };
          deleteMany: {
            args: Prisma.RoomMemberDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.RoomMemberUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.RoomMemberUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RoomMemberPayload>[];
          };
          upsert: {
            args: Prisma.RoomMemberUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RoomMemberPayload>;
          };
          aggregate: {
            args: Prisma.RoomMemberAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateRoomMember>;
          };
          groupBy: {
            args: Prisma.RoomMemberGroupByArgs<ExtArgs>;
            result: $Utils.Optional<RoomMemberGroupByOutputType>[];
          };
          count: {
            args: Prisma.RoomMemberCountArgs<ExtArgs>;
            result:
              | $Utils.Optional<RoomMemberCountAggregateOutputType>
              | number;
          };
        };
      };
      Message: {
        payload: Prisma.$MessagePayload<ExtArgs>;
        fields: Prisma.MessageFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.MessageFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.MessageFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>;
          };
          findFirst: {
            args: Prisma.MessageFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.MessageFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>;
          };
          findMany: {
            args: Prisma.MessageFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[];
          };
          create: {
            args: Prisma.MessageCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>;
          };
          createMany: {
            args: Prisma.MessageCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.MessageCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[];
          };
          delete: {
            args: Prisma.MessageDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>;
          };
          update: {
            args: Prisma.MessageUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>;
          };
          deleteMany: {
            args: Prisma.MessageDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.MessageUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.MessageUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[];
          };
          upsert: {
            args: Prisma.MessageUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>;
          };
          aggregate: {
            args: Prisma.MessageAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateMessage>;
          };
          groupBy: {
            args: Prisma.MessageGroupByArgs<ExtArgs>;
            result: $Utils.Optional<MessageGroupByOutputType>[];
          };
          count: {
            args: Prisma.MessageCountArgs<ExtArgs>;
            result: $Utils.Optional<MessageCountAggregateOutputType> | number;
          };
        };
      };
      Attachment: {
        payload: Prisma.$AttachmentPayload<ExtArgs>;
        fields: Prisma.AttachmentFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.AttachmentFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.AttachmentFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>;
          };
          findFirst: {
            args: Prisma.AttachmentFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.AttachmentFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>;
          };
          findMany: {
            args: Prisma.AttachmentFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>[];
          };
          create: {
            args: Prisma.AttachmentCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>;
          };
          createMany: {
            args: Prisma.AttachmentCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.AttachmentCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>[];
          };
          delete: {
            args: Prisma.AttachmentDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>;
          };
          update: {
            args: Prisma.AttachmentUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>;
          };
          deleteMany: {
            args: Prisma.AttachmentDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.AttachmentUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.AttachmentUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>[];
          };
          upsert: {
            args: Prisma.AttachmentUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>;
          };
          aggregate: {
            args: Prisma.AttachmentAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateAttachment>;
          };
          groupBy: {
            args: Prisma.AttachmentGroupByArgs<ExtArgs>;
            result: $Utils.Optional<AttachmentGroupByOutputType>[];
          };
          count: {
            args: Prisma.AttachmentCountArgs<ExtArgs>;
            result:
              | $Utils.Optional<AttachmentCountAggregateOutputType>
              | number;
          };
        };
      };
      MessageReceipt: {
        payload: Prisma.$MessageReceiptPayload<ExtArgs>;
        fields: Prisma.MessageReceiptFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.MessageReceiptFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessageReceiptPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.MessageReceiptFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessageReceiptPayload>;
          };
          findFirst: {
            args: Prisma.MessageReceiptFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessageReceiptPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.MessageReceiptFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessageReceiptPayload>;
          };
          findMany: {
            args: Prisma.MessageReceiptFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessageReceiptPayload>[];
          };
          create: {
            args: Prisma.MessageReceiptCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessageReceiptPayload>;
          };
          createMany: {
            args: Prisma.MessageReceiptCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.MessageReceiptCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessageReceiptPayload>[];
          };
          delete: {
            args: Prisma.MessageReceiptDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessageReceiptPayload>;
          };
          update: {
            args: Prisma.MessageReceiptUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessageReceiptPayload>;
          };
          deleteMany: {
            args: Prisma.MessageReceiptDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.MessageReceiptUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.MessageReceiptUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessageReceiptPayload>[];
          };
          upsert: {
            args: Prisma.MessageReceiptUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessageReceiptPayload>;
          };
          aggregate: {
            args: Prisma.MessageReceiptAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateMessageReceipt>;
          };
          groupBy: {
            args: Prisma.MessageReceiptGroupByArgs<ExtArgs>;
            result: $Utils.Optional<MessageReceiptGroupByOutputType>[];
          };
          count: {
            args: Prisma.MessageReceiptCountArgs<ExtArgs>;
            result:
              | $Utils.Optional<MessageReceiptCountAggregateOutputType>
              | number;
          };
        };
      };
    };
  } & {
    other: {
      payload: any;
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
      };
    };
  };
  export const defineExtension: $Extensions.ExtendsHook<
    'define',
    Prisma.TypeMapCb,
    $Extensions.DefaultArgs
  >;
  export type DefaultPrismaClient = PrismaClient;
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
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
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    };
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory;
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string;
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
    omit?: Prisma.GlobalOmitConfig;
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
    comments?: runtime.SqlCommenterPlugin[];
  }
  export type GlobalOmitConfig = {
    user?: UserOmit;
    room?: RoomOmit;
    roomMember?: RoomMemberOmit;
    message?: MessageOmit;
    attachment?: AttachmentOmit;
    messageReceipt?: MessageReceiptOmit;
  };

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error';
  export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
  };

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> =
    T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;

  export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
  };

  export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
  };
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
    | 'groupBy';

  // tested in getLogLevel.test.ts
  export function getLogLevel(
    log: Array<LogLevel | LogDefinition>,
  ): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<
    Prisma.DefaultPrismaClient,
    runtime.ITXClientDenyList
  >;

  export type Datasource = {
    url?: string;
  };

  /**
   * Count Types
   */

  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    memberships: number;
    messages: number;
    receipts: number;
    uploads: number;
  };

  export type UserCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    memberships?: boolean | UserCountOutputTypeCountMembershipsArgs;
    messages?: boolean | UserCountOutputTypeCountMessagesArgs;
    receipts?: boolean | UserCountOutputTypeCountReceiptsArgs;
    uploads?: boolean | UserCountOutputTypeCountUploadsArgs;
  };

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMembershipsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: RoomMemberWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMessagesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: MessageWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReceiptsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: MessageReceiptWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUploadsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: AttachmentWhereInput;
  };

  /**
   * Count Type RoomCountOutputType
   */

  export type RoomCountOutputType = {
    members: number;
    messages: number;
    uploads: number;
  };

  export type RoomCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    members?: boolean | RoomCountOutputTypeCountMembersArgs;
    messages?: boolean | RoomCountOutputTypeCountMessagesArgs;
    uploads?: boolean | RoomCountOutputTypeCountUploadsArgs;
  };

  // Custom InputTypes
  /**
   * RoomCountOutputType without action
   */
  export type RoomCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RoomCountOutputType
     */
    select?: RoomCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * RoomCountOutputType without action
   */
  export type RoomCountOutputTypeCountMembersArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: RoomMemberWhereInput;
  };

  /**
   * RoomCountOutputType without action
   */
  export type RoomCountOutputTypeCountMessagesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: MessageWhereInput;
  };

  /**
   * RoomCountOutputType without action
   */
  export type RoomCountOutputTypeCountUploadsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: AttachmentWhereInput;
  };

  /**
   * Count Type MessageCountOutputType
   */

  export type MessageCountOutputType = {
    replies: number;
    receipts: number;
    attachments: number;
  };

  export type MessageCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    replies?: boolean | MessageCountOutputTypeCountRepliesArgs;
    receipts?: boolean | MessageCountOutputTypeCountReceiptsArgs;
    attachments?: boolean | MessageCountOutputTypeCountAttachmentsArgs;
  };

  // Custom InputTypes
  /**
   * MessageCountOutputType without action
   */
  export type MessageCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the MessageCountOutputType
     */
    select?: MessageCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * MessageCountOutputType without action
   */
  export type MessageCountOutputTypeCountRepliesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: MessageWhereInput;
  };

  /**
   * MessageCountOutputType without action
   */
  export type MessageCountOutputTypeCountReceiptsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: MessageReceiptWhereInput;
  };

  /**
   * MessageCountOutputType without action
   */
  export type MessageCountOutputTypeCountAttachmentsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: AttachmentWhereInput;
  };

  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
  };

  export type UserMinAggregateOutputType = {
    id: string | null;
    email: string | null;
    name: string | null;
    passwordHash: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type UserMaxAggregateOutputType = {
    id: string | null;
    email: string | null;
    name: string | null;
    passwordHash: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type UserCountAggregateOutputType = {
    id: number;
    email: number;
    name: number;
    passwordHash: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type UserMinAggregateInputType = {
    id?: true;
    email?: true;
    name?: true;
    passwordHash?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type UserMaxAggregateInputType = {
    id?: true;
    email?: true;
    name?: true;
    passwordHash?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type UserCountAggregateInputType = {
    id?: true;
    email?: true;
    name?: true;
    passwordHash?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type UserAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Users
     **/
    _count?: true | UserCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: UserMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: UserMaxAggregateInputType;
  };

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>;
  };

  export type UserGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: UserWhereInput;
    orderBy?:
      | UserOrderByWithAggregationInput
      | UserOrderByWithAggregationInput[];
    by: UserScalarFieldEnum[] | UserScalarFieldEnum;
    having?: UserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCountAggregateInputType | true;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
  };

  export type UserGroupByOutputType = {
    id: string;
    email: string | null;
    name: string;
    passwordHash: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
  };

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> & {
        [P in keyof T & keyof UserGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], UserGroupByOutputType[P]>
          : GetScalarType<T[P], UserGroupByOutputType[P]>;
      }
    >
  >;

  export type UserSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      email?: boolean;
      name?: boolean;
      passwordHash?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      memberships?: boolean | User$membershipsArgs<ExtArgs>;
      messages?: boolean | User$messagesArgs<ExtArgs>;
      receipts?: boolean | User$receiptsArgs<ExtArgs>;
      uploads?: boolean | User$uploadsArgs<ExtArgs>;
      _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['user']
  >;

  export type UserSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      email?: boolean;
      name?: boolean;
      passwordHash?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['user']
  >;

  export type UserSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      email?: boolean;
      name?: boolean;
      passwordHash?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['user']
  >;

  export type UserSelectScalar = {
    id?: boolean;
    email?: boolean;
    name?: boolean;
    passwordHash?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type UserOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    'id' | 'email' | 'name' | 'passwordHash' | 'createdAt' | 'updatedAt',
    ExtArgs['result']['user']
  >;
  export type UserInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    memberships?: boolean | User$membershipsArgs<ExtArgs>;
    messages?: boolean | User$messagesArgs<ExtArgs>;
    receipts?: boolean | User$receiptsArgs<ExtArgs>;
    uploads?: boolean | User$uploadsArgs<ExtArgs>;
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type UserIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};
  export type UserIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};

  export type $UserPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'User';
    objects: {
      memberships: Prisma.$RoomMemberPayload<ExtArgs>[];
      messages: Prisma.$MessagePayload<ExtArgs>[];
      receipts: Prisma.$MessageReceiptPayload<ExtArgs>[];
      uploads: Prisma.$AttachmentPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        email: string | null;
        name: string;
        passwordHash: string | null;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['user']
    >;
    composites: {};
  };

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> =
    $Result.GetResult<Prisma.$UserPayload, S>;

  type UserCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserCountAggregateInputType | true;
  };

  export interface UserDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['User'];
      meta: { name: 'User' };
    };
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(
      args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
      args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(
      args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     *
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     *
     */
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     *
     */
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(
      args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     *
     */
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(
      args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
     **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(
      args: Subset<T, UserAggregateArgs>,
    ): Prisma.PrismaPromise<GetUserAggregateType<T>>;

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
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
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetUserGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the User model
     */
    readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    memberships<T extends User$membershipsArgs<ExtArgs> = {}>(
      args?: Subset<T, User$membershipsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$RoomMemberPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    messages<T extends User$messagesArgs<ExtArgs> = {}>(
      args?: Subset<T, User$messagesArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$MessagePayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    receipts<T extends User$receiptsArgs<ExtArgs> = {}>(
      args?: Subset<T, User$receiptsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$MessageReceiptPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    uploads<T extends User$uploadsArgs<ExtArgs> = {}>(
      args?: Subset<T, User$uploadsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$AttachmentPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<'User', 'String'>;
    readonly email: FieldRef<'User', 'String'>;
    readonly name: FieldRef<'User', 'String'>;
    readonly passwordHash: FieldRef<'User', 'String'>;
    readonly createdAt: FieldRef<'User', 'DateTime'>;
    readonly updatedAt: FieldRef<'User', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User findMany
   */
  export type UserFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User create
   */
  export type UserCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>;
  };

  /**
   * User createMany
   */
  export type UserCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * User update
   */
  export type UserUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
  };

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
  };

  /**
   * User upsert
   */
  export type UserUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput;
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>;
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
  };

  /**
   * User delete
   */
  export type UserDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to delete.
     */
    limit?: number;
  };

  /**
   * User.memberships
   */
  export type User$membershipsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RoomMember
     */
    select?: RoomMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RoomMember
     */
    omit?: RoomMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomMemberInclude<ExtArgs> | null;
    where?: RoomMemberWhereInput;
    orderBy?:
      | RoomMemberOrderByWithRelationInput
      | RoomMemberOrderByWithRelationInput[];
    cursor?: RoomMemberWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: RoomMemberScalarFieldEnum | RoomMemberScalarFieldEnum[];
  };

  /**
   * User.messages
   */
  export type User$messagesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null;
    where?: MessageWhereInput;
    orderBy?:
      | MessageOrderByWithRelationInput
      | MessageOrderByWithRelationInput[];
    cursor?: MessageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[];
  };

  /**
   * User.receipts
   */
  export type User$receiptsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the MessageReceipt
     */
    select?: MessageReceiptSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MessageReceipt
     */
    omit?: MessageReceiptOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageReceiptInclude<ExtArgs> | null;
    where?: MessageReceiptWhereInput;
    orderBy?:
      | MessageReceiptOrderByWithRelationInput
      | MessageReceiptOrderByWithRelationInput[];
    cursor?: MessageReceiptWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: MessageReceiptScalarFieldEnum | MessageReceiptScalarFieldEnum[];
  };

  /**
   * User.uploads
   */
  export type User$uploadsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null;
    where?: AttachmentWhereInput;
    orderBy?:
      | AttachmentOrderByWithRelationInput
      | AttachmentOrderByWithRelationInput[];
    cursor?: AttachmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: AttachmentScalarFieldEnum | AttachmentScalarFieldEnum[];
  };

  /**
   * User without action
   */
  export type UserDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
  };

  /**
   * Model Room
   */

  export type AggregateRoom = {
    _count: RoomCountAggregateOutputType | null;
    _min: RoomMinAggregateOutputType | null;
    _max: RoomMaxAggregateOutputType | null;
  };

  export type RoomMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    type: $Enums.RoomType | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    directKey: string | null;
  };

  export type RoomMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    type: $Enums.RoomType | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    directKey: string | null;
  };

  export type RoomCountAggregateOutputType = {
    id: number;
    name: number;
    type: number;
    createdAt: number;
    updatedAt: number;
    directKey: number;
    _all: number;
  };

  export type RoomMinAggregateInputType = {
    id?: true;
    name?: true;
    type?: true;
    createdAt?: true;
    updatedAt?: true;
    directKey?: true;
  };

  export type RoomMaxAggregateInputType = {
    id?: true;
    name?: true;
    type?: true;
    createdAt?: true;
    updatedAt?: true;
    directKey?: true;
  };

  export type RoomCountAggregateInputType = {
    id?: true;
    name?: true;
    type?: true;
    createdAt?: true;
    updatedAt?: true;
    directKey?: true;
    _all?: true;
  };

  export type RoomAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Room to aggregate.
     */
    where?: RoomWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: RoomWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Rooms.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Rooms
     **/
    _count?: true | RoomCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: RoomMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: RoomMaxAggregateInputType;
  };

  export type GetRoomAggregateType<T extends RoomAggregateArgs> = {
    [P in keyof T & keyof AggregateRoom]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoom[P]>
      : GetScalarType<T[P], AggregateRoom[P]>;
  };

  export type RoomGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: RoomWhereInput;
    orderBy?:
      | RoomOrderByWithAggregationInput
      | RoomOrderByWithAggregationInput[];
    by: RoomScalarFieldEnum[] | RoomScalarFieldEnum;
    having?: RoomScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RoomCountAggregateInputType | true;
    _min?: RoomMinAggregateInputType;
    _max?: RoomMaxAggregateInputType;
  };

  export type RoomGroupByOutputType = {
    id: string;
    name: string;
    type: $Enums.RoomType;
    createdAt: Date;
    updatedAt: Date;
    directKey: string | null;
    _count: RoomCountAggregateOutputType | null;
    _min: RoomMinAggregateOutputType | null;
    _max: RoomMaxAggregateOutputType | null;
  };

  type GetRoomGroupByPayload<T extends RoomGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoomGroupByOutputType, T['by']> & {
        [P in keyof T & keyof RoomGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], RoomGroupByOutputType[P]>
          : GetScalarType<T[P], RoomGroupByOutputType[P]>;
      }
    >
  >;

  export type RoomSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      type?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      directKey?: boolean;
      members?: boolean | Room$membersArgs<ExtArgs>;
      messages?: boolean | Room$messagesArgs<ExtArgs>;
      uploads?: boolean | Room$uploadsArgs<ExtArgs>;
      _count?: boolean | RoomCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['room']
  >;

  export type RoomSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      type?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      directKey?: boolean;
    },
    ExtArgs['result']['room']
  >;

  export type RoomSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      type?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      directKey?: boolean;
    },
    ExtArgs['result']['room']
  >;

  export type RoomSelectScalar = {
    id?: boolean;
    name?: boolean;
    type?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    directKey?: boolean;
  };

  export type RoomOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    'id' | 'name' | 'type' | 'createdAt' | 'updatedAt' | 'directKey',
    ExtArgs['result']['room']
  >;
  export type RoomInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    members?: boolean | Room$membersArgs<ExtArgs>;
    messages?: boolean | Room$messagesArgs<ExtArgs>;
    uploads?: boolean | Room$uploadsArgs<ExtArgs>;
    _count?: boolean | RoomCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type RoomIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};
  export type RoomIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};

  export type $RoomPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'Room';
    objects: {
      members: Prisma.$RoomMemberPayload<ExtArgs>[];
      messages: Prisma.$MessagePayload<ExtArgs>[];
      uploads: Prisma.$AttachmentPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        name: string;
        type: $Enums.RoomType;
        createdAt: Date;
        updatedAt: Date;
        /**
         * For DIRECT rooms only: stable key "userA:userB" (sorted ids) for idempotent room lookup.
         */
        directKey: string | null;
      },
      ExtArgs['result']['room']
    >;
    composites: {};
  };

  type RoomGetPayload<S extends boolean | null | undefined | RoomDefaultArgs> =
    $Result.GetResult<Prisma.$RoomPayload, S>;

  type RoomCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<RoomFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RoomCountAggregateInputType | true;
  };

  export interface RoomDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Room'];
      meta: { name: 'Room' };
    };
    /**
     * Find zero or one Room that matches the filter.
     * @param {RoomFindUniqueArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoomFindUniqueArgs>(
      args: SelectSubset<T, RoomFindUniqueArgs<ExtArgs>>,
    ): Prisma__RoomClient<
      $Result.GetResult<
        Prisma.$RoomPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Room that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoomFindUniqueOrThrowArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoomFindUniqueOrThrowArgs>(
      args: SelectSubset<T, RoomFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__RoomClient<
      $Result.GetResult<
        Prisma.$RoomPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Room that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindFirstArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoomFindFirstArgs>(
      args?: SelectSubset<T, RoomFindFirstArgs<ExtArgs>>,
    ): Prisma__RoomClient<
      $Result.GetResult<
        Prisma.$RoomPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Room that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindFirstOrThrowArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoomFindFirstOrThrowArgs>(
      args?: SelectSubset<T, RoomFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__RoomClient<
      $Result.GetResult<
        Prisma.$RoomPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Rooms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Rooms
     * const rooms = await prisma.room.findMany()
     *
     * // Get first 10 Rooms
     * const rooms = await prisma.room.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const roomWithIdOnly = await prisma.room.findMany({ select: { id: true } })
     *
     */
    findMany<T extends RoomFindManyArgs>(
      args?: SelectSubset<T, RoomFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$RoomPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Room.
     * @param {RoomCreateArgs} args - Arguments to create a Room.
     * @example
     * // Create one Room
     * const Room = await prisma.room.create({
     *   data: {
     *     // ... data to create a Room
     *   }
     * })
     *
     */
    create<T extends RoomCreateArgs>(
      args: SelectSubset<T, RoomCreateArgs<ExtArgs>>,
    ): Prisma__RoomClient<
      $Result.GetResult<
        Prisma.$RoomPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Rooms.
     * @param {RoomCreateManyArgs} args - Arguments to create many Rooms.
     * @example
     * // Create many Rooms
     * const room = await prisma.room.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends RoomCreateManyArgs>(
      args?: SelectSubset<T, RoomCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Rooms and returns the data saved in the database.
     * @param {RoomCreateManyAndReturnArgs} args - Arguments to create many Rooms.
     * @example
     * // Create many Rooms
     * const room = await prisma.room.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Rooms and only return the `id`
     * const roomWithIdOnly = await prisma.room.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends RoomCreateManyAndReturnArgs>(
      args?: SelectSubset<T, RoomCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$RoomPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Room.
     * @param {RoomDeleteArgs} args - Arguments to delete one Room.
     * @example
     * // Delete one Room
     * const Room = await prisma.room.delete({
     *   where: {
     *     // ... filter to delete one Room
     *   }
     * })
     *
     */
    delete<T extends RoomDeleteArgs>(
      args: SelectSubset<T, RoomDeleteArgs<ExtArgs>>,
    ): Prisma__RoomClient<
      $Result.GetResult<
        Prisma.$RoomPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Room.
     * @param {RoomUpdateArgs} args - Arguments to update one Room.
     * @example
     * // Update one Room
     * const room = await prisma.room.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends RoomUpdateArgs>(
      args: SelectSubset<T, RoomUpdateArgs<ExtArgs>>,
    ): Prisma__RoomClient<
      $Result.GetResult<
        Prisma.$RoomPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Rooms.
     * @param {RoomDeleteManyArgs} args - Arguments to filter Rooms to delete.
     * @example
     * // Delete a few Rooms
     * const { count } = await prisma.room.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends RoomDeleteManyArgs>(
      args?: SelectSubset<T, RoomDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Rooms
     * const room = await prisma.room.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends RoomUpdateManyArgs>(
      args: SelectSubset<T, RoomUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Rooms and returns the data updated in the database.
     * @param {RoomUpdateManyAndReturnArgs} args - Arguments to update many Rooms.
     * @example
     * // Update many Rooms
     * const room = await prisma.room.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Rooms and only return the `id`
     * const roomWithIdOnly = await prisma.room.updateManyAndReturn({
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
    updateManyAndReturn<T extends RoomUpdateManyAndReturnArgs>(
      args: SelectSubset<T, RoomUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$RoomPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Room.
     * @param {RoomUpsertArgs} args - Arguments to update or create a Room.
     * @example
     * // Update or create a Room
     * const room = await prisma.room.upsert({
     *   create: {
     *     // ... data to create a Room
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Room we want to update
     *   }
     * })
     */
    upsert<T extends RoomUpsertArgs>(
      args: SelectSubset<T, RoomUpsertArgs<ExtArgs>>,
    ): Prisma__RoomClient<
      $Result.GetResult<
        Prisma.$RoomPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomCountArgs} args - Arguments to filter Rooms to count.
     * @example
     * // Count the number of Rooms
     * const count = await prisma.room.count({
     *   where: {
     *     // ... the filter for the Rooms we want to count
     *   }
     * })
     **/
    count<T extends RoomCountArgs>(
      args?: Subset<T, RoomCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoomCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Room.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RoomAggregateArgs>(
      args: Subset<T, RoomAggregateArgs>,
    ): Prisma.PrismaPromise<GetRoomAggregateType<T>>;

    /**
     * Group by Room.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomGroupByArgs} args - Group by arguments.
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
      T extends RoomGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoomGroupByArgs['orderBy'] }
        : { orderBy?: RoomGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
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
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, RoomGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetRoomGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Room model
     */
    readonly fields: RoomFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Room.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoomClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    members<T extends Room$membersArgs<ExtArgs> = {}>(
      args?: Subset<T, Room$membersArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$RoomMemberPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    messages<T extends Room$messagesArgs<ExtArgs> = {}>(
      args?: Subset<T, Room$messagesArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$MessagePayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    uploads<T extends Room$uploadsArgs<ExtArgs> = {}>(
      args?: Subset<T, Room$uploadsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$AttachmentPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Room model
   */
  interface RoomFieldRefs {
    readonly id: FieldRef<'Room', 'String'>;
    readonly name: FieldRef<'Room', 'String'>;
    readonly type: FieldRef<'Room', 'RoomType'>;
    readonly createdAt: FieldRef<'Room', 'DateTime'>;
    readonly updatedAt: FieldRef<'Room', 'DateTime'>;
    readonly directKey: FieldRef<'Room', 'String'>;
  }

  // Custom InputTypes
  /**
   * Room findUnique
   */
  export type RoomFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null;
    /**
     * Filter, which Room to fetch.
     */
    where: RoomWhereUniqueInput;
  };

  /**
   * Room findUniqueOrThrow
   */
  export type RoomFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null;
    /**
     * Filter, which Room to fetch.
     */
    where: RoomWhereUniqueInput;
  };

  /**
   * Room findFirst
   */
  export type RoomFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null;
    /**
     * Filter, which Room to fetch.
     */
    where?: RoomWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Rooms.
     */
    cursor?: RoomWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Rooms.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Rooms.
     */
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[];
  };

  /**
   * Room findFirstOrThrow
   */
  export type RoomFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null;
    /**
     * Filter, which Room to fetch.
     */
    where?: RoomWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Rooms.
     */
    cursor?: RoomWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Rooms.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Rooms.
     */
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[];
  };

  /**
   * Room findMany
   */
  export type RoomFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null;
    /**
     * Filter, which Rooms to fetch.
     */
    where?: RoomWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Rooms.
     */
    cursor?: RoomWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Rooms.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Rooms.
     */
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[];
  };

  /**
   * Room create
   */
  export type RoomCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null;
    /**
     * The data needed to create a Room.
     */
    data: XOR<RoomCreateInput, RoomUncheckedCreateInput>;
  };

  /**
   * Room createMany
   */
  export type RoomCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Rooms.
     */
    data: RoomCreateManyInput | RoomCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Room createManyAndReturn
   */
  export type RoomCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null;
    /**
     * The data used to create many Rooms.
     */
    data: RoomCreateManyInput | RoomCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Room update
   */
  export type RoomUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null;
    /**
     * The data needed to update a Room.
     */
    data: XOR<RoomUpdateInput, RoomUncheckedUpdateInput>;
    /**
     * Choose, which Room to update.
     */
    where: RoomWhereUniqueInput;
  };

  /**
   * Room updateMany
   */
  export type RoomUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Rooms.
     */
    data: XOR<RoomUpdateManyMutationInput, RoomUncheckedUpdateManyInput>;
    /**
     * Filter which Rooms to update
     */
    where?: RoomWhereInput;
    /**
     * Limit how many Rooms to update.
     */
    limit?: number;
  };

  /**
   * Room updateManyAndReturn
   */
  export type RoomUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null;
    /**
     * The data used to update Rooms.
     */
    data: XOR<RoomUpdateManyMutationInput, RoomUncheckedUpdateManyInput>;
    /**
     * Filter which Rooms to update
     */
    where?: RoomWhereInput;
    /**
     * Limit how many Rooms to update.
     */
    limit?: number;
  };

  /**
   * Room upsert
   */
  export type RoomUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null;
    /**
     * The filter to search for the Room to update in case it exists.
     */
    where: RoomWhereUniqueInput;
    /**
     * In case the Room found by the `where` argument doesn't exist, create a new Room with this data.
     */
    create: XOR<RoomCreateInput, RoomUncheckedCreateInput>;
    /**
     * In case the Room was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoomUpdateInput, RoomUncheckedUpdateInput>;
  };

  /**
   * Room delete
   */
  export type RoomDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null;
    /**
     * Filter which Room to delete.
     */
    where: RoomWhereUniqueInput;
  };

  /**
   * Room deleteMany
   */
  export type RoomDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Rooms to delete
     */
    where?: RoomWhereInput;
    /**
     * Limit how many Rooms to delete.
     */
    limit?: number;
  };

  /**
   * Room.members
   */
  export type Room$membersArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RoomMember
     */
    select?: RoomMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RoomMember
     */
    omit?: RoomMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomMemberInclude<ExtArgs> | null;
    where?: RoomMemberWhereInput;
    orderBy?:
      | RoomMemberOrderByWithRelationInput
      | RoomMemberOrderByWithRelationInput[];
    cursor?: RoomMemberWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: RoomMemberScalarFieldEnum | RoomMemberScalarFieldEnum[];
  };

  /**
   * Room.messages
   */
  export type Room$messagesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null;
    where?: MessageWhereInput;
    orderBy?:
      | MessageOrderByWithRelationInput
      | MessageOrderByWithRelationInput[];
    cursor?: MessageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[];
  };

  /**
   * Room.uploads
   */
  export type Room$uploadsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null;
    where?: AttachmentWhereInput;
    orderBy?:
      | AttachmentOrderByWithRelationInput
      | AttachmentOrderByWithRelationInput[];
    cursor?: AttachmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: AttachmentScalarFieldEnum | AttachmentScalarFieldEnum[];
  };

  /**
   * Room without action
   */
  export type RoomDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null;
  };

  /**
   * Model RoomMember
   */

  export type AggregateRoomMember = {
    _count: RoomMemberCountAggregateOutputType | null;
    _min: RoomMemberMinAggregateOutputType | null;
    _max: RoomMemberMaxAggregateOutputType | null;
  };

  export type RoomMemberMinAggregateOutputType = {
    roomId: string | null;
    userId: string | null;
    role: $Enums.RoomRole | null;
    joinedAt: Date | null;
    lastReadAt: Date | null;
    lastReadMessageId: string | null;
  };

  export type RoomMemberMaxAggregateOutputType = {
    roomId: string | null;
    userId: string | null;
    role: $Enums.RoomRole | null;
    joinedAt: Date | null;
    lastReadAt: Date | null;
    lastReadMessageId: string | null;
  };

  export type RoomMemberCountAggregateOutputType = {
    roomId: number;
    userId: number;
    role: number;
    joinedAt: number;
    lastReadAt: number;
    lastReadMessageId: number;
    _all: number;
  };

  export type RoomMemberMinAggregateInputType = {
    roomId?: true;
    userId?: true;
    role?: true;
    joinedAt?: true;
    lastReadAt?: true;
    lastReadMessageId?: true;
  };

  export type RoomMemberMaxAggregateInputType = {
    roomId?: true;
    userId?: true;
    role?: true;
    joinedAt?: true;
    lastReadAt?: true;
    lastReadMessageId?: true;
  };

  export type RoomMemberCountAggregateInputType = {
    roomId?: true;
    userId?: true;
    role?: true;
    joinedAt?: true;
    lastReadAt?: true;
    lastReadMessageId?: true;
    _all?: true;
  };

  export type RoomMemberAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which RoomMember to aggregate.
     */
    where?: RoomMemberWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RoomMembers to fetch.
     */
    orderBy?:
      | RoomMemberOrderByWithRelationInput
      | RoomMemberOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: RoomMemberWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RoomMembers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RoomMembers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned RoomMembers
     **/
    _count?: true | RoomMemberCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: RoomMemberMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: RoomMemberMaxAggregateInputType;
  };

  export type GetRoomMemberAggregateType<T extends RoomMemberAggregateArgs> = {
    [P in keyof T & keyof AggregateRoomMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoomMember[P]>
      : GetScalarType<T[P], AggregateRoomMember[P]>;
  };

  export type RoomMemberGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: RoomMemberWhereInput;
    orderBy?:
      | RoomMemberOrderByWithAggregationInput
      | RoomMemberOrderByWithAggregationInput[];
    by: RoomMemberScalarFieldEnum[] | RoomMemberScalarFieldEnum;
    having?: RoomMemberScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RoomMemberCountAggregateInputType | true;
    _min?: RoomMemberMinAggregateInputType;
    _max?: RoomMemberMaxAggregateInputType;
  };

  export type RoomMemberGroupByOutputType = {
    roomId: string;
    userId: string;
    role: $Enums.RoomRole;
    joinedAt: Date;
    lastReadAt: Date | null;
    lastReadMessageId: string | null;
    _count: RoomMemberCountAggregateOutputType | null;
    _min: RoomMemberMinAggregateOutputType | null;
    _max: RoomMemberMaxAggregateOutputType | null;
  };

  type GetRoomMemberGroupByPayload<T extends RoomMemberGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<RoomMemberGroupByOutputType, T['by']> & {
          [P in keyof T & keyof RoomMemberGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoomMemberGroupByOutputType[P]>
            : GetScalarType<T[P], RoomMemberGroupByOutputType[P]>;
        }
      >
    >;

  export type RoomMemberSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      roomId?: boolean;
      userId?: boolean;
      role?: boolean;
      joinedAt?: boolean;
      lastReadAt?: boolean;
      lastReadMessageId?: boolean;
      room?: boolean | RoomDefaultArgs<ExtArgs>;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['roomMember']
  >;

  export type RoomMemberSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      roomId?: boolean;
      userId?: boolean;
      role?: boolean;
      joinedAt?: boolean;
      lastReadAt?: boolean;
      lastReadMessageId?: boolean;
      room?: boolean | RoomDefaultArgs<ExtArgs>;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['roomMember']
  >;

  export type RoomMemberSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      roomId?: boolean;
      userId?: boolean;
      role?: boolean;
      joinedAt?: boolean;
      lastReadAt?: boolean;
      lastReadMessageId?: boolean;
      room?: boolean | RoomDefaultArgs<ExtArgs>;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['roomMember']
  >;

  export type RoomMemberSelectScalar = {
    roomId?: boolean;
    userId?: boolean;
    role?: boolean;
    joinedAt?: boolean;
    lastReadAt?: boolean;
    lastReadMessageId?: boolean;
  };

  export type RoomMemberOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    | 'roomId'
    | 'userId'
    | 'role'
    | 'joinedAt'
    | 'lastReadAt'
    | 'lastReadMessageId',
    ExtArgs['result']['roomMember']
  >;
  export type RoomMemberInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    room?: boolean | RoomDefaultArgs<ExtArgs>;
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type RoomMemberIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    room?: boolean | RoomDefaultArgs<ExtArgs>;
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type RoomMemberIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    room?: boolean | RoomDefaultArgs<ExtArgs>;
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $RoomMemberPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'RoomMember';
    objects: {
      room: Prisma.$RoomPayload<ExtArgs>;
      user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        roomId: string;
        userId: string;
        role: $Enums.RoomRole;
        joinedAt: Date;
        lastReadAt: Date | null;
        lastReadMessageId: string | null;
      },
      ExtArgs['result']['roomMember']
    >;
    composites: {};
  };

  type RoomMemberGetPayload<
    S extends boolean | null | undefined | RoomMemberDefaultArgs,
  > = $Result.GetResult<Prisma.$RoomMemberPayload, S>;

  type RoomMemberCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<
    RoomMemberFindManyArgs,
    'select' | 'include' | 'distinct' | 'omit'
  > & {
    select?: RoomMemberCountAggregateInputType | true;
  };

  export interface RoomMemberDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['RoomMember'];
      meta: { name: 'RoomMember' };
    };
    /**
     * Find zero or one RoomMember that matches the filter.
     * @param {RoomMemberFindUniqueArgs} args - Arguments to find a RoomMember
     * @example
     * // Get one RoomMember
     * const roomMember = await prisma.roomMember.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoomMemberFindUniqueArgs>(
      args: SelectSubset<T, RoomMemberFindUniqueArgs<ExtArgs>>,
    ): Prisma__RoomMemberClient<
      $Result.GetResult<
        Prisma.$RoomMemberPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one RoomMember that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoomMemberFindUniqueOrThrowArgs} args - Arguments to find a RoomMember
     * @example
     * // Get one RoomMember
     * const roomMember = await prisma.roomMember.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoomMemberFindUniqueOrThrowArgs>(
      args: SelectSubset<T, RoomMemberFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__RoomMemberClient<
      $Result.GetResult<
        Prisma.$RoomMemberPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first RoomMember that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomMemberFindFirstArgs} args - Arguments to find a RoomMember
     * @example
     * // Get one RoomMember
     * const roomMember = await prisma.roomMember.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoomMemberFindFirstArgs>(
      args?: SelectSubset<T, RoomMemberFindFirstArgs<ExtArgs>>,
    ): Prisma__RoomMemberClient<
      $Result.GetResult<
        Prisma.$RoomMemberPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first RoomMember that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomMemberFindFirstOrThrowArgs} args - Arguments to find a RoomMember
     * @example
     * // Get one RoomMember
     * const roomMember = await prisma.roomMember.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoomMemberFindFirstOrThrowArgs>(
      args?: SelectSubset<T, RoomMemberFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__RoomMemberClient<
      $Result.GetResult<
        Prisma.$RoomMemberPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more RoomMembers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomMemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RoomMembers
     * const roomMembers = await prisma.roomMember.findMany()
     *
     * // Get first 10 RoomMembers
     * const roomMembers = await prisma.roomMember.findMany({ take: 10 })
     *
     * // Only select the `roomId`
     * const roomMemberWithRoomIdOnly = await prisma.roomMember.findMany({ select: { roomId: true } })
     *
     */
    findMany<T extends RoomMemberFindManyArgs>(
      args?: SelectSubset<T, RoomMemberFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$RoomMemberPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a RoomMember.
     * @param {RoomMemberCreateArgs} args - Arguments to create a RoomMember.
     * @example
     * // Create one RoomMember
     * const RoomMember = await prisma.roomMember.create({
     *   data: {
     *     // ... data to create a RoomMember
     *   }
     * })
     *
     */
    create<T extends RoomMemberCreateArgs>(
      args: SelectSubset<T, RoomMemberCreateArgs<ExtArgs>>,
    ): Prisma__RoomMemberClient<
      $Result.GetResult<
        Prisma.$RoomMemberPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many RoomMembers.
     * @param {RoomMemberCreateManyArgs} args - Arguments to create many RoomMembers.
     * @example
     * // Create many RoomMembers
     * const roomMember = await prisma.roomMember.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends RoomMemberCreateManyArgs>(
      args?: SelectSubset<T, RoomMemberCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many RoomMembers and returns the data saved in the database.
     * @param {RoomMemberCreateManyAndReturnArgs} args - Arguments to create many RoomMembers.
     * @example
     * // Create many RoomMembers
     * const roomMember = await prisma.roomMember.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many RoomMembers and only return the `roomId`
     * const roomMemberWithRoomIdOnly = await prisma.roomMember.createManyAndReturn({
     *   select: { roomId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends RoomMemberCreateManyAndReturnArgs>(
      args?: SelectSubset<T, RoomMemberCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$RoomMemberPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a RoomMember.
     * @param {RoomMemberDeleteArgs} args - Arguments to delete one RoomMember.
     * @example
     * // Delete one RoomMember
     * const RoomMember = await prisma.roomMember.delete({
     *   where: {
     *     // ... filter to delete one RoomMember
     *   }
     * })
     *
     */
    delete<T extends RoomMemberDeleteArgs>(
      args: SelectSubset<T, RoomMemberDeleteArgs<ExtArgs>>,
    ): Prisma__RoomMemberClient<
      $Result.GetResult<
        Prisma.$RoomMemberPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one RoomMember.
     * @param {RoomMemberUpdateArgs} args - Arguments to update one RoomMember.
     * @example
     * // Update one RoomMember
     * const roomMember = await prisma.roomMember.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends RoomMemberUpdateArgs>(
      args: SelectSubset<T, RoomMemberUpdateArgs<ExtArgs>>,
    ): Prisma__RoomMemberClient<
      $Result.GetResult<
        Prisma.$RoomMemberPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more RoomMembers.
     * @param {RoomMemberDeleteManyArgs} args - Arguments to filter RoomMembers to delete.
     * @example
     * // Delete a few RoomMembers
     * const { count } = await prisma.roomMember.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends RoomMemberDeleteManyArgs>(
      args?: SelectSubset<T, RoomMemberDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more RoomMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomMemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RoomMembers
     * const roomMember = await prisma.roomMember.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends RoomMemberUpdateManyArgs>(
      args: SelectSubset<T, RoomMemberUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more RoomMembers and returns the data updated in the database.
     * @param {RoomMemberUpdateManyAndReturnArgs} args - Arguments to update many RoomMembers.
     * @example
     * // Update many RoomMembers
     * const roomMember = await prisma.roomMember.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more RoomMembers and only return the `roomId`
     * const roomMemberWithRoomIdOnly = await prisma.roomMember.updateManyAndReturn({
     *   select: { roomId: true },
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
    updateManyAndReturn<T extends RoomMemberUpdateManyAndReturnArgs>(
      args: SelectSubset<T, RoomMemberUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$RoomMemberPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one RoomMember.
     * @param {RoomMemberUpsertArgs} args - Arguments to update or create a RoomMember.
     * @example
     * // Update or create a RoomMember
     * const roomMember = await prisma.roomMember.upsert({
     *   create: {
     *     // ... data to create a RoomMember
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RoomMember we want to update
     *   }
     * })
     */
    upsert<T extends RoomMemberUpsertArgs>(
      args: SelectSubset<T, RoomMemberUpsertArgs<ExtArgs>>,
    ): Prisma__RoomMemberClient<
      $Result.GetResult<
        Prisma.$RoomMemberPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of RoomMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomMemberCountArgs} args - Arguments to filter RoomMembers to count.
     * @example
     * // Count the number of RoomMembers
     * const count = await prisma.roomMember.count({
     *   where: {
     *     // ... the filter for the RoomMembers we want to count
     *   }
     * })
     **/
    count<T extends RoomMemberCountArgs>(
      args?: Subset<T, RoomMemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoomMemberCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a RoomMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomMemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RoomMemberAggregateArgs>(
      args: Subset<T, RoomMemberAggregateArgs>,
    ): Prisma.PrismaPromise<GetRoomMemberAggregateType<T>>;

    /**
     * Group by RoomMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomMemberGroupByArgs} args - Group by arguments.
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
      T extends RoomMemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoomMemberGroupByArgs['orderBy'] }
        : { orderBy?: RoomMemberGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
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
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, RoomMemberGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetRoomMemberGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the RoomMember model
     */
    readonly fields: RoomMemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RoomMember.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoomMemberClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    room<T extends RoomDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, RoomDefaultArgs<ExtArgs>>,
    ): Prisma__RoomClient<
      | $Result.GetResult<
          Prisma.$RoomPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      | $Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the RoomMember model
   */
  interface RoomMemberFieldRefs {
    readonly roomId: FieldRef<'RoomMember', 'String'>;
    readonly userId: FieldRef<'RoomMember', 'String'>;
    readonly role: FieldRef<'RoomMember', 'RoomRole'>;
    readonly joinedAt: FieldRef<'RoomMember', 'DateTime'>;
    readonly lastReadAt: FieldRef<'RoomMember', 'DateTime'>;
    readonly lastReadMessageId: FieldRef<'RoomMember', 'String'>;
  }

  // Custom InputTypes
  /**
   * RoomMember findUnique
   */
  export type RoomMemberFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RoomMember
     */
    select?: RoomMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RoomMember
     */
    omit?: RoomMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomMemberInclude<ExtArgs> | null;
    /**
     * Filter, which RoomMember to fetch.
     */
    where: RoomMemberWhereUniqueInput;
  };

  /**
   * RoomMember findUniqueOrThrow
   */
  export type RoomMemberFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RoomMember
     */
    select?: RoomMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RoomMember
     */
    omit?: RoomMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomMemberInclude<ExtArgs> | null;
    /**
     * Filter, which RoomMember to fetch.
     */
    where: RoomMemberWhereUniqueInput;
  };

  /**
   * RoomMember findFirst
   */
  export type RoomMemberFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RoomMember
     */
    select?: RoomMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RoomMember
     */
    omit?: RoomMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomMemberInclude<ExtArgs> | null;
    /**
     * Filter, which RoomMember to fetch.
     */
    where?: RoomMemberWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RoomMembers to fetch.
     */
    orderBy?:
      | RoomMemberOrderByWithRelationInput
      | RoomMemberOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for RoomMembers.
     */
    cursor?: RoomMemberWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RoomMembers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RoomMembers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of RoomMembers.
     */
    distinct?: RoomMemberScalarFieldEnum | RoomMemberScalarFieldEnum[];
  };

  /**
   * RoomMember findFirstOrThrow
   */
  export type RoomMemberFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RoomMember
     */
    select?: RoomMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RoomMember
     */
    omit?: RoomMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomMemberInclude<ExtArgs> | null;
    /**
     * Filter, which RoomMember to fetch.
     */
    where?: RoomMemberWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RoomMembers to fetch.
     */
    orderBy?:
      | RoomMemberOrderByWithRelationInput
      | RoomMemberOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for RoomMembers.
     */
    cursor?: RoomMemberWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RoomMembers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RoomMembers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of RoomMembers.
     */
    distinct?: RoomMemberScalarFieldEnum | RoomMemberScalarFieldEnum[];
  };

  /**
   * RoomMember findMany
   */
  export type RoomMemberFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RoomMember
     */
    select?: RoomMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RoomMember
     */
    omit?: RoomMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomMemberInclude<ExtArgs> | null;
    /**
     * Filter, which RoomMembers to fetch.
     */
    where?: RoomMemberWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RoomMembers to fetch.
     */
    orderBy?:
      | RoomMemberOrderByWithRelationInput
      | RoomMemberOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing RoomMembers.
     */
    cursor?: RoomMemberWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RoomMembers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RoomMembers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of RoomMembers.
     */
    distinct?: RoomMemberScalarFieldEnum | RoomMemberScalarFieldEnum[];
  };

  /**
   * RoomMember create
   */
  export type RoomMemberCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RoomMember
     */
    select?: RoomMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RoomMember
     */
    omit?: RoomMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomMemberInclude<ExtArgs> | null;
    /**
     * The data needed to create a RoomMember.
     */
    data: XOR<RoomMemberCreateInput, RoomMemberUncheckedCreateInput>;
  };

  /**
   * RoomMember createMany
   */
  export type RoomMemberCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many RoomMembers.
     */
    data: RoomMemberCreateManyInput | RoomMemberCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * RoomMember createManyAndReturn
   */
  export type RoomMemberCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RoomMember
     */
    select?: RoomMemberSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the RoomMember
     */
    omit?: RoomMemberOmit<ExtArgs> | null;
    /**
     * The data used to create many RoomMembers.
     */
    data: RoomMemberCreateManyInput | RoomMemberCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomMemberIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * RoomMember update
   */
  export type RoomMemberUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RoomMember
     */
    select?: RoomMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RoomMember
     */
    omit?: RoomMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomMemberInclude<ExtArgs> | null;
    /**
     * The data needed to update a RoomMember.
     */
    data: XOR<RoomMemberUpdateInput, RoomMemberUncheckedUpdateInput>;
    /**
     * Choose, which RoomMember to update.
     */
    where: RoomMemberWhereUniqueInput;
  };

  /**
   * RoomMember updateMany
   */
  export type RoomMemberUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update RoomMembers.
     */
    data: XOR<
      RoomMemberUpdateManyMutationInput,
      RoomMemberUncheckedUpdateManyInput
    >;
    /**
     * Filter which RoomMembers to update
     */
    where?: RoomMemberWhereInput;
    /**
     * Limit how many RoomMembers to update.
     */
    limit?: number;
  };

  /**
   * RoomMember updateManyAndReturn
   */
  export type RoomMemberUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RoomMember
     */
    select?: RoomMemberSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the RoomMember
     */
    omit?: RoomMemberOmit<ExtArgs> | null;
    /**
     * The data used to update RoomMembers.
     */
    data: XOR<
      RoomMemberUpdateManyMutationInput,
      RoomMemberUncheckedUpdateManyInput
    >;
    /**
     * Filter which RoomMembers to update
     */
    where?: RoomMemberWhereInput;
    /**
     * Limit how many RoomMembers to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomMemberIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * RoomMember upsert
   */
  export type RoomMemberUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RoomMember
     */
    select?: RoomMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RoomMember
     */
    omit?: RoomMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomMemberInclude<ExtArgs> | null;
    /**
     * The filter to search for the RoomMember to update in case it exists.
     */
    where: RoomMemberWhereUniqueInput;
    /**
     * In case the RoomMember found by the `where` argument doesn't exist, create a new RoomMember with this data.
     */
    create: XOR<RoomMemberCreateInput, RoomMemberUncheckedCreateInput>;
    /**
     * In case the RoomMember was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoomMemberUpdateInput, RoomMemberUncheckedUpdateInput>;
  };

  /**
   * RoomMember delete
   */
  export type RoomMemberDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RoomMember
     */
    select?: RoomMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RoomMember
     */
    omit?: RoomMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomMemberInclude<ExtArgs> | null;
    /**
     * Filter which RoomMember to delete.
     */
    where: RoomMemberWhereUniqueInput;
  };

  /**
   * RoomMember deleteMany
   */
  export type RoomMemberDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which RoomMembers to delete
     */
    where?: RoomMemberWhereInput;
    /**
     * Limit how many RoomMembers to delete.
     */
    limit?: number;
  };

  /**
   * RoomMember without action
   */
  export type RoomMemberDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RoomMember
     */
    select?: RoomMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RoomMember
     */
    omit?: RoomMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomMemberInclude<ExtArgs> | null;
  };

  /**
   * Model Message
   */

  export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null;
    _min: MessageMinAggregateOutputType | null;
    _max: MessageMaxAggregateOutputType | null;
  };

  export type MessageMinAggregateOutputType = {
    id: string | null;
    roomId: string | null;
    userId: string | null;
    body: string | null;
    replyToId: string | null;
    createdAt: Date | null;
  };

  export type MessageMaxAggregateOutputType = {
    id: string | null;
    roomId: string | null;
    userId: string | null;
    body: string | null;
    replyToId: string | null;
    createdAt: Date | null;
  };

  export type MessageCountAggregateOutputType = {
    id: number;
    roomId: number;
    userId: number;
    body: number;
    replyToId: number;
    createdAt: number;
    _all: number;
  };

  export type MessageMinAggregateInputType = {
    id?: true;
    roomId?: true;
    userId?: true;
    body?: true;
    replyToId?: true;
    createdAt?: true;
  };

  export type MessageMaxAggregateInputType = {
    id?: true;
    roomId?: true;
    userId?: true;
    body?: true;
    replyToId?: true;
    createdAt?: true;
  };

  export type MessageCountAggregateInputType = {
    id?: true;
    roomId?: true;
    userId?: true;
    body?: true;
    replyToId?: true;
    createdAt?: true;
    _all?: true;
  };

  export type MessageAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Message to aggregate.
     */
    where?: MessageWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Messages to fetch.
     */
    orderBy?:
      | MessageOrderByWithRelationInput
      | MessageOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: MessageWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Messages.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Messages
     **/
    _count?: true | MessageCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: MessageMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: MessageMaxAggregateInputType;
  };

  export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
    [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessage[P]>
      : GetScalarType<T[P], AggregateMessage[P]>;
  };

  export type MessageGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: MessageWhereInput;
    orderBy?:
      | MessageOrderByWithAggregationInput
      | MessageOrderByWithAggregationInput[];
    by: MessageScalarFieldEnum[] | MessageScalarFieldEnum;
    having?: MessageScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MessageCountAggregateInputType | true;
    _min?: MessageMinAggregateInputType;
    _max?: MessageMaxAggregateInputType;
  };

  export type MessageGroupByOutputType = {
    id: string;
    roomId: string;
    userId: string;
    body: string;
    replyToId: string | null;
    createdAt: Date;
    _count: MessageCountAggregateOutputType | null;
    _min: MessageMinAggregateOutputType | null;
    _max: MessageMaxAggregateOutputType | null;
  };

  type GetMessageGroupByPayload<T extends MessageGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<MessageGroupByOutputType, T['by']> & {
          [P in keyof T & keyof MessageGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageGroupByOutputType[P]>;
        }
      >
    >;

  export type MessageSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      roomId?: boolean;
      userId?: boolean;
      body?: boolean;
      replyToId?: boolean;
      createdAt?: boolean;
      room?: boolean | RoomDefaultArgs<ExtArgs>;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      replyTo?: boolean | Message$replyToArgs<ExtArgs>;
      replies?: boolean | Message$repliesArgs<ExtArgs>;
      receipts?: boolean | Message$receiptsArgs<ExtArgs>;
      attachments?: boolean | Message$attachmentsArgs<ExtArgs>;
      _count?: boolean | MessageCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['message']
  >;

  export type MessageSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      roomId?: boolean;
      userId?: boolean;
      body?: boolean;
      replyToId?: boolean;
      createdAt?: boolean;
      room?: boolean | RoomDefaultArgs<ExtArgs>;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      replyTo?: boolean | Message$replyToArgs<ExtArgs>;
    },
    ExtArgs['result']['message']
  >;

  export type MessageSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      roomId?: boolean;
      userId?: boolean;
      body?: boolean;
      replyToId?: boolean;
      createdAt?: boolean;
      room?: boolean | RoomDefaultArgs<ExtArgs>;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      replyTo?: boolean | Message$replyToArgs<ExtArgs>;
    },
    ExtArgs['result']['message']
  >;

  export type MessageSelectScalar = {
    id?: boolean;
    roomId?: boolean;
    userId?: boolean;
    body?: boolean;
    replyToId?: boolean;
    createdAt?: boolean;
  };

  export type MessageOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    'id' | 'roomId' | 'userId' | 'body' | 'replyToId' | 'createdAt',
    ExtArgs['result']['message']
  >;
  export type MessageInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    room?: boolean | RoomDefaultArgs<ExtArgs>;
    user?: boolean | UserDefaultArgs<ExtArgs>;
    replyTo?: boolean | Message$replyToArgs<ExtArgs>;
    replies?: boolean | Message$repliesArgs<ExtArgs>;
    receipts?: boolean | Message$receiptsArgs<ExtArgs>;
    attachments?: boolean | Message$attachmentsArgs<ExtArgs>;
    _count?: boolean | MessageCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type MessageIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    room?: boolean | RoomDefaultArgs<ExtArgs>;
    user?: boolean | UserDefaultArgs<ExtArgs>;
    replyTo?: boolean | Message$replyToArgs<ExtArgs>;
  };
  export type MessageIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    room?: boolean | RoomDefaultArgs<ExtArgs>;
    user?: boolean | UserDefaultArgs<ExtArgs>;
    replyTo?: boolean | Message$replyToArgs<ExtArgs>;
  };

  export type $MessagePayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'Message';
    objects: {
      room: Prisma.$RoomPayload<ExtArgs>;
      user: Prisma.$UserPayload<ExtArgs>;
      replyTo: Prisma.$MessagePayload<ExtArgs> | null;
      replies: Prisma.$MessagePayload<ExtArgs>[];
      receipts: Prisma.$MessageReceiptPayload<ExtArgs>[];
      attachments: Prisma.$AttachmentPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        roomId: string;
        userId: string;
        body: string;
        replyToId: string | null;
        createdAt: Date;
      },
      ExtArgs['result']['message']
    >;
    composites: {};
  };

  type MessageGetPayload<
    S extends boolean | null | undefined | MessageDefaultArgs,
  > = $Result.GetResult<Prisma.$MessagePayload, S>;

  type MessageCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<MessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MessageCountAggregateInputType | true;
  };

  export interface MessageDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Message'];
      meta: { name: 'Message' };
    };
    /**
     * Find zero or one Message that matches the filter.
     * @param {MessageFindUniqueArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageFindUniqueArgs>(
      args: SelectSubset<T, MessageFindUniqueArgs<ExtArgs>>,
    ): Prisma__MessageClient<
      $Result.GetResult<
        Prisma.$MessagePayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Message that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageFindUniqueOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs>(
      args: SelectSubset<T, MessageFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__MessageClient<
      $Result.GetResult<
        Prisma.$MessagePayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Message that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageFindFirstArgs>(
      args?: SelectSubset<T, MessageFindFirstArgs<ExtArgs>>,
    ): Prisma__MessageClient<
      $Result.GetResult<
        Prisma.$MessagePayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Message that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs>(
      args?: SelectSubset<T, MessageFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__MessageClient<
      $Result.GetResult<
        Prisma.$MessagePayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.message.findMany()
     *
     * // Get first 10 Messages
     * const messages = await prisma.message.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
     *
     */
    findMany<T extends MessageFindManyArgs>(
      args?: SelectSubset<T, MessageFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$MessagePayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Message.
     * @param {MessageCreateArgs} args - Arguments to create a Message.
     * @example
     * // Create one Message
     * const Message = await prisma.message.create({
     *   data: {
     *     // ... data to create a Message
     *   }
     * })
     *
     */
    create<T extends MessageCreateArgs>(
      args: SelectSubset<T, MessageCreateArgs<ExtArgs>>,
    ): Prisma__MessageClient<
      $Result.GetResult<
        Prisma.$MessagePayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Messages.
     * @param {MessageCreateManyArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends MessageCreateManyArgs>(
      args?: SelectSubset<T, MessageCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Messages and returns the data saved in the database.
     * @param {MessageCreateManyAndReturnArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends MessageCreateManyAndReturnArgs>(
      args?: SelectSubset<T, MessageCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$MessagePayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Message.
     * @param {MessageDeleteArgs} args - Arguments to delete one Message.
     * @example
     * // Delete one Message
     * const Message = await prisma.message.delete({
     *   where: {
     *     // ... filter to delete one Message
     *   }
     * })
     *
     */
    delete<T extends MessageDeleteArgs>(
      args: SelectSubset<T, MessageDeleteArgs<ExtArgs>>,
    ): Prisma__MessageClient<
      $Result.GetResult<
        Prisma.$MessagePayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Message.
     * @param {MessageUpdateArgs} args - Arguments to update one Message.
     * @example
     * // Update one Message
     * const message = await prisma.message.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends MessageUpdateArgs>(
      args: SelectSubset<T, MessageUpdateArgs<ExtArgs>>,
    ): Prisma__MessageClient<
      $Result.GetResult<
        Prisma.$MessagePayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Messages.
     * @param {MessageDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.message.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends MessageDeleteManyArgs>(
      args?: SelectSubset<T, MessageDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends MessageUpdateManyArgs>(
      args: SelectSubset<T, MessageUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Messages and returns the data updated in the database.
     * @param {MessageUpdateManyAndReturnArgs} args - Arguments to update many Messages.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.updateManyAndReturn({
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
    updateManyAndReturn<T extends MessageUpdateManyAndReturnArgs>(
      args: SelectSubset<T, MessageUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$MessagePayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Message.
     * @param {MessageUpsertArgs} args - Arguments to update or create a Message.
     * @example
     * // Update or create a Message
     * const message = await prisma.message.upsert({
     *   create: {
     *     // ... data to create a Message
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Message we want to update
     *   }
     * })
     */
    upsert<T extends MessageUpsertArgs>(
      args: SelectSubset<T, MessageUpsertArgs<ExtArgs>>,
    ): Prisma__MessageClient<
      $Result.GetResult<
        Prisma.$MessagePayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.message.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
     **/
    count<T extends MessageCountArgs>(
      args?: Subset<T, MessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MessageAggregateArgs>(
      args: Subset<T, MessageAggregateArgs>,
    ): Prisma.PrismaPromise<GetMessageAggregateType<T>>;

    /**
     * Group by Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageGroupByArgs} args - Group by arguments.
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
      T extends MessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageGroupByArgs['orderBy'] }
        : { orderBy?: MessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
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
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetMessageGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Message model
     */
    readonly fields: MessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Message.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    room<T extends RoomDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, RoomDefaultArgs<ExtArgs>>,
    ): Prisma__RoomClient<
      | $Result.GetResult<
          Prisma.$RoomPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      | $Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    replyTo<T extends Message$replyToArgs<ExtArgs> = {}>(
      args?: Subset<T, Message$replyToArgs<ExtArgs>>,
    ): Prisma__MessageClient<
      $Result.GetResult<
        Prisma.$MessagePayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;
    replies<T extends Message$repliesArgs<ExtArgs> = {}>(
      args?: Subset<T, Message$repliesArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$MessagePayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    receipts<T extends Message$receiptsArgs<ExtArgs> = {}>(
      args?: Subset<T, Message$receiptsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$MessageReceiptPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    attachments<T extends Message$attachmentsArgs<ExtArgs> = {}>(
      args?: Subset<T, Message$attachmentsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$AttachmentPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Message model
   */
  interface MessageFieldRefs {
    readonly id: FieldRef<'Message', 'String'>;
    readonly roomId: FieldRef<'Message', 'String'>;
    readonly userId: FieldRef<'Message', 'String'>;
    readonly body: FieldRef<'Message', 'String'>;
    readonly replyToId: FieldRef<'Message', 'String'>;
    readonly createdAt: FieldRef<'Message', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Message findUnique
   */
  export type MessageFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null;
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput;
  };

  /**
   * Message findUniqueOrThrow
   */
  export type MessageFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null;
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput;
  };

  /**
   * Message findFirst
   */
  export type MessageFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null;
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Messages to fetch.
     */
    orderBy?:
      | MessageOrderByWithRelationInput
      | MessageOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Messages.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[];
  };

  /**
   * Message findFirstOrThrow
   */
  export type MessageFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null;
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Messages to fetch.
     */
    orderBy?:
      | MessageOrderByWithRelationInput
      | MessageOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Messages.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[];
  };

  /**
   * Message findMany
   */
  export type MessageFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null;
    /**
     * Filter, which Messages to fetch.
     */
    where?: MessageWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Messages to fetch.
     */
    orderBy?:
      | MessageOrderByWithRelationInput
      | MessageOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Messages.
     */
    cursor?: MessageWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Messages.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[];
  };

  /**
   * Message create
   */
  export type MessageCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null;
    /**
     * The data needed to create a Message.
     */
    data: XOR<MessageCreateInput, MessageUncheckedCreateInput>;
  };

  /**
   * Message createMany
   */
  export type MessageCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Message createManyAndReturn
   */
  export type MessageCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Message update
   */
  export type MessageUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null;
    /**
     * The data needed to update a Message.
     */
    data: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>;
    /**
     * Choose, which Message to update.
     */
    where: MessageWhereUniqueInput;
  };

  /**
   * Message updateMany
   */
  export type MessageUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>;
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput;
    /**
     * Limit how many Messages to update.
     */
    limit?: number;
  };

  /**
   * Message updateManyAndReturn
   */
  export type MessageUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>;
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput;
    /**
     * Limit how many Messages to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Message upsert
   */
  export type MessageUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null;
    /**
     * The filter to search for the Message to update in case it exists.
     */
    where: MessageWhereUniqueInput;
    /**
     * In case the Message found by the `where` argument doesn't exist, create a new Message with this data.
     */
    create: XOR<MessageCreateInput, MessageUncheckedCreateInput>;
    /**
     * In case the Message was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>;
  };

  /**
   * Message delete
   */
  export type MessageDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null;
    /**
     * Filter which Message to delete.
     */
    where: MessageWhereUniqueInput;
  };

  /**
   * Message deleteMany
   */
  export type MessageDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Messages to delete
     */
    where?: MessageWhereInput;
    /**
     * Limit how many Messages to delete.
     */
    limit?: number;
  };

  /**
   * Message.replyTo
   */
  export type Message$replyToArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null;
    where?: MessageWhereInput;
  };

  /**
   * Message.replies
   */
  export type Message$repliesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null;
    where?: MessageWhereInput;
    orderBy?:
      | MessageOrderByWithRelationInput
      | MessageOrderByWithRelationInput[];
    cursor?: MessageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[];
  };

  /**
   * Message.receipts
   */
  export type Message$receiptsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the MessageReceipt
     */
    select?: MessageReceiptSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MessageReceipt
     */
    omit?: MessageReceiptOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageReceiptInclude<ExtArgs> | null;
    where?: MessageReceiptWhereInput;
    orderBy?:
      | MessageReceiptOrderByWithRelationInput
      | MessageReceiptOrderByWithRelationInput[];
    cursor?: MessageReceiptWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: MessageReceiptScalarFieldEnum | MessageReceiptScalarFieldEnum[];
  };

  /**
   * Message.attachments
   */
  export type Message$attachmentsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null;
    where?: AttachmentWhereInput;
    orderBy?:
      | AttachmentOrderByWithRelationInput
      | AttachmentOrderByWithRelationInput[];
    cursor?: AttachmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: AttachmentScalarFieldEnum | AttachmentScalarFieldEnum[];
  };

  /**
   * Message without action
   */
  export type MessageDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null;
  };

  /**
   * Model Attachment
   */

  export type AggregateAttachment = {
    _count: AttachmentCountAggregateOutputType | null;
    _avg: AttachmentAvgAggregateOutputType | null;
    _sum: AttachmentSumAggregateOutputType | null;
    _min: AttachmentMinAggregateOutputType | null;
    _max: AttachmentMaxAggregateOutputType | null;
  };

  export type AttachmentAvgAggregateOutputType = {
    sizeBytes: number | null;
  };

  export type AttachmentSumAggregateOutputType = {
    sizeBytes: number | null;
  };

  export type AttachmentMinAggregateOutputType = {
    id: string | null;
    kind: $Enums.AttachmentKind | null;
    fileName: string | null;
    mimeType: string | null;
    sizeBytes: number | null;
    url: string | null;
    createdAt: Date | null;
    roomId: string | null;
    messageId: string | null;
    uploaderId: string | null;
  };

  export type AttachmentMaxAggregateOutputType = {
    id: string | null;
    kind: $Enums.AttachmentKind | null;
    fileName: string | null;
    mimeType: string | null;
    sizeBytes: number | null;
    url: string | null;
    createdAt: Date | null;
    roomId: string | null;
    messageId: string | null;
    uploaderId: string | null;
  };

  export type AttachmentCountAggregateOutputType = {
    id: number;
    kind: number;
    fileName: number;
    mimeType: number;
    sizeBytes: number;
    url: number;
    createdAt: number;
    roomId: number;
    messageId: number;
    uploaderId: number;
    _all: number;
  };

  export type AttachmentAvgAggregateInputType = {
    sizeBytes?: true;
  };

  export type AttachmentSumAggregateInputType = {
    sizeBytes?: true;
  };

  export type AttachmentMinAggregateInputType = {
    id?: true;
    kind?: true;
    fileName?: true;
    mimeType?: true;
    sizeBytes?: true;
    url?: true;
    createdAt?: true;
    roomId?: true;
    messageId?: true;
    uploaderId?: true;
  };

  export type AttachmentMaxAggregateInputType = {
    id?: true;
    kind?: true;
    fileName?: true;
    mimeType?: true;
    sizeBytes?: true;
    url?: true;
    createdAt?: true;
    roomId?: true;
    messageId?: true;
    uploaderId?: true;
  };

  export type AttachmentCountAggregateInputType = {
    id?: true;
    kind?: true;
    fileName?: true;
    mimeType?: true;
    sizeBytes?: true;
    url?: true;
    createdAt?: true;
    roomId?: true;
    messageId?: true;
    uploaderId?: true;
    _all?: true;
  };

  export type AttachmentAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Attachment to aggregate.
     */
    where?: AttachmentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Attachments to fetch.
     */
    orderBy?:
      | AttachmentOrderByWithRelationInput
      | AttachmentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: AttachmentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Attachments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Attachments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Attachments
     **/
    _count?: true | AttachmentCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: AttachmentAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: AttachmentSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: AttachmentMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: AttachmentMaxAggregateInputType;
  };

  export type GetAttachmentAggregateType<T extends AttachmentAggregateArgs> = {
    [P in keyof T & keyof AggregateAttachment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAttachment[P]>
      : GetScalarType<T[P], AggregateAttachment[P]>;
  };

  export type AttachmentGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: AttachmentWhereInput;
    orderBy?:
      | AttachmentOrderByWithAggregationInput
      | AttachmentOrderByWithAggregationInput[];
    by: AttachmentScalarFieldEnum[] | AttachmentScalarFieldEnum;
    having?: AttachmentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AttachmentCountAggregateInputType | true;
    _avg?: AttachmentAvgAggregateInputType;
    _sum?: AttachmentSumAggregateInputType;
    _min?: AttachmentMinAggregateInputType;
    _max?: AttachmentMaxAggregateInputType;
  };

  export type AttachmentGroupByOutputType = {
    id: string;
    kind: $Enums.AttachmentKind;
    fileName: string;
    mimeType: string;
    sizeBytes: number;
    url: string;
    createdAt: Date;
    roomId: string;
    messageId: string | null;
    uploaderId: string;
    _count: AttachmentCountAggregateOutputType | null;
    _avg: AttachmentAvgAggregateOutputType | null;
    _sum: AttachmentSumAggregateOutputType | null;
    _min: AttachmentMinAggregateOutputType | null;
    _max: AttachmentMaxAggregateOutputType | null;
  };

  type GetAttachmentGroupByPayload<T extends AttachmentGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<AttachmentGroupByOutputType, T['by']> & {
          [P in keyof T & keyof AttachmentGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AttachmentGroupByOutputType[P]>
            : GetScalarType<T[P], AttachmentGroupByOutputType[P]>;
        }
      >
    >;

  export type AttachmentSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      kind?: boolean;
      fileName?: boolean;
      mimeType?: boolean;
      sizeBytes?: boolean;
      url?: boolean;
      createdAt?: boolean;
      roomId?: boolean;
      messageId?: boolean;
      uploaderId?: boolean;
      room?: boolean | RoomDefaultArgs<ExtArgs>;
      message?: boolean | Attachment$messageArgs<ExtArgs>;
      uploader?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['attachment']
  >;

  export type AttachmentSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      kind?: boolean;
      fileName?: boolean;
      mimeType?: boolean;
      sizeBytes?: boolean;
      url?: boolean;
      createdAt?: boolean;
      roomId?: boolean;
      messageId?: boolean;
      uploaderId?: boolean;
      room?: boolean | RoomDefaultArgs<ExtArgs>;
      message?: boolean | Attachment$messageArgs<ExtArgs>;
      uploader?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['attachment']
  >;

  export type AttachmentSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      kind?: boolean;
      fileName?: boolean;
      mimeType?: boolean;
      sizeBytes?: boolean;
      url?: boolean;
      createdAt?: boolean;
      roomId?: boolean;
      messageId?: boolean;
      uploaderId?: boolean;
      room?: boolean | RoomDefaultArgs<ExtArgs>;
      message?: boolean | Attachment$messageArgs<ExtArgs>;
      uploader?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['attachment']
  >;

  export type AttachmentSelectScalar = {
    id?: boolean;
    kind?: boolean;
    fileName?: boolean;
    mimeType?: boolean;
    sizeBytes?: boolean;
    url?: boolean;
    createdAt?: boolean;
    roomId?: boolean;
    messageId?: boolean;
    uploaderId?: boolean;
  };

  export type AttachmentOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    | 'id'
    | 'kind'
    | 'fileName'
    | 'mimeType'
    | 'sizeBytes'
    | 'url'
    | 'createdAt'
    | 'roomId'
    | 'messageId'
    | 'uploaderId',
    ExtArgs['result']['attachment']
  >;
  export type AttachmentInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    room?: boolean | RoomDefaultArgs<ExtArgs>;
    message?: boolean | Attachment$messageArgs<ExtArgs>;
    uploader?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type AttachmentIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    room?: boolean | RoomDefaultArgs<ExtArgs>;
    message?: boolean | Attachment$messageArgs<ExtArgs>;
    uploader?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type AttachmentIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    room?: boolean | RoomDefaultArgs<ExtArgs>;
    message?: boolean | Attachment$messageArgs<ExtArgs>;
    uploader?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $AttachmentPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'Attachment';
    objects: {
      room: Prisma.$RoomPayload<ExtArgs>;
      message: Prisma.$MessagePayload<ExtArgs> | null;
      uploader: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        kind: $Enums.AttachmentKind;
        fileName: string;
        mimeType: string;
        sizeBytes: number;
        url: string;
        createdAt: Date;
        roomId: string;
        messageId: string | null;
        uploaderId: string;
      },
      ExtArgs['result']['attachment']
    >;
    composites: {};
  };

  type AttachmentGetPayload<
    S extends boolean | null | undefined | AttachmentDefaultArgs,
  > = $Result.GetResult<Prisma.$AttachmentPayload, S>;

  type AttachmentCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<
    AttachmentFindManyArgs,
    'select' | 'include' | 'distinct' | 'omit'
  > & {
    select?: AttachmentCountAggregateInputType | true;
  };

  export interface AttachmentDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Attachment'];
      meta: { name: 'Attachment' };
    };
    /**
     * Find zero or one Attachment that matches the filter.
     * @param {AttachmentFindUniqueArgs} args - Arguments to find a Attachment
     * @example
     * // Get one Attachment
     * const attachment = await prisma.attachment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AttachmentFindUniqueArgs>(
      args: SelectSubset<T, AttachmentFindUniqueArgs<ExtArgs>>,
    ): Prisma__AttachmentClient<
      $Result.GetResult<
        Prisma.$AttachmentPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Attachment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AttachmentFindUniqueOrThrowArgs} args - Arguments to find a Attachment
     * @example
     * // Get one Attachment
     * const attachment = await prisma.attachment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AttachmentFindUniqueOrThrowArgs>(
      args: SelectSubset<T, AttachmentFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__AttachmentClient<
      $Result.GetResult<
        Prisma.$AttachmentPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Attachment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentFindFirstArgs} args - Arguments to find a Attachment
     * @example
     * // Get one Attachment
     * const attachment = await prisma.attachment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AttachmentFindFirstArgs>(
      args?: SelectSubset<T, AttachmentFindFirstArgs<ExtArgs>>,
    ): Prisma__AttachmentClient<
      $Result.GetResult<
        Prisma.$AttachmentPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Attachment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentFindFirstOrThrowArgs} args - Arguments to find a Attachment
     * @example
     * // Get one Attachment
     * const attachment = await prisma.attachment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AttachmentFindFirstOrThrowArgs>(
      args?: SelectSubset<T, AttachmentFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__AttachmentClient<
      $Result.GetResult<
        Prisma.$AttachmentPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Attachments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Attachments
     * const attachments = await prisma.attachment.findMany()
     *
     * // Get first 10 Attachments
     * const attachments = await prisma.attachment.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const attachmentWithIdOnly = await prisma.attachment.findMany({ select: { id: true } })
     *
     */
    findMany<T extends AttachmentFindManyArgs>(
      args?: SelectSubset<T, AttachmentFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$AttachmentPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Attachment.
     * @param {AttachmentCreateArgs} args - Arguments to create a Attachment.
     * @example
     * // Create one Attachment
     * const Attachment = await prisma.attachment.create({
     *   data: {
     *     // ... data to create a Attachment
     *   }
     * })
     *
     */
    create<T extends AttachmentCreateArgs>(
      args: SelectSubset<T, AttachmentCreateArgs<ExtArgs>>,
    ): Prisma__AttachmentClient<
      $Result.GetResult<
        Prisma.$AttachmentPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Attachments.
     * @param {AttachmentCreateManyArgs} args - Arguments to create many Attachments.
     * @example
     * // Create many Attachments
     * const attachment = await prisma.attachment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends AttachmentCreateManyArgs>(
      args?: SelectSubset<T, AttachmentCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Attachments and returns the data saved in the database.
     * @param {AttachmentCreateManyAndReturnArgs} args - Arguments to create many Attachments.
     * @example
     * // Create many Attachments
     * const attachment = await prisma.attachment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Attachments and only return the `id`
     * const attachmentWithIdOnly = await prisma.attachment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends AttachmentCreateManyAndReturnArgs>(
      args?: SelectSubset<T, AttachmentCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$AttachmentPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Attachment.
     * @param {AttachmentDeleteArgs} args - Arguments to delete one Attachment.
     * @example
     * // Delete one Attachment
     * const Attachment = await prisma.attachment.delete({
     *   where: {
     *     // ... filter to delete one Attachment
     *   }
     * })
     *
     */
    delete<T extends AttachmentDeleteArgs>(
      args: SelectSubset<T, AttachmentDeleteArgs<ExtArgs>>,
    ): Prisma__AttachmentClient<
      $Result.GetResult<
        Prisma.$AttachmentPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Attachment.
     * @param {AttachmentUpdateArgs} args - Arguments to update one Attachment.
     * @example
     * // Update one Attachment
     * const attachment = await prisma.attachment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends AttachmentUpdateArgs>(
      args: SelectSubset<T, AttachmentUpdateArgs<ExtArgs>>,
    ): Prisma__AttachmentClient<
      $Result.GetResult<
        Prisma.$AttachmentPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Attachments.
     * @param {AttachmentDeleteManyArgs} args - Arguments to filter Attachments to delete.
     * @example
     * // Delete a few Attachments
     * const { count } = await prisma.attachment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends AttachmentDeleteManyArgs>(
      args?: SelectSubset<T, AttachmentDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Attachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Attachments
     * const attachment = await prisma.attachment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends AttachmentUpdateManyArgs>(
      args: SelectSubset<T, AttachmentUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Attachments and returns the data updated in the database.
     * @param {AttachmentUpdateManyAndReturnArgs} args - Arguments to update many Attachments.
     * @example
     * // Update many Attachments
     * const attachment = await prisma.attachment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Attachments and only return the `id`
     * const attachmentWithIdOnly = await prisma.attachment.updateManyAndReturn({
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
    updateManyAndReturn<T extends AttachmentUpdateManyAndReturnArgs>(
      args: SelectSubset<T, AttachmentUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$AttachmentPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Attachment.
     * @param {AttachmentUpsertArgs} args - Arguments to update or create a Attachment.
     * @example
     * // Update or create a Attachment
     * const attachment = await prisma.attachment.upsert({
     *   create: {
     *     // ... data to create a Attachment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Attachment we want to update
     *   }
     * })
     */
    upsert<T extends AttachmentUpsertArgs>(
      args: SelectSubset<T, AttachmentUpsertArgs<ExtArgs>>,
    ): Prisma__AttachmentClient<
      $Result.GetResult<
        Prisma.$AttachmentPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Attachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentCountArgs} args - Arguments to filter Attachments to count.
     * @example
     * // Count the number of Attachments
     * const count = await prisma.attachment.count({
     *   where: {
     *     // ... the filter for the Attachments we want to count
     *   }
     * })
     **/
    count<T extends AttachmentCountArgs>(
      args?: Subset<T, AttachmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AttachmentCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Attachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AttachmentAggregateArgs>(
      args: Subset<T, AttachmentAggregateArgs>,
    ): Prisma.PrismaPromise<GetAttachmentAggregateType<T>>;

    /**
     * Group by Attachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentGroupByArgs} args - Group by arguments.
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
      T extends AttachmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AttachmentGroupByArgs['orderBy'] }
        : { orderBy?: AttachmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
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
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, AttachmentGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetAttachmentGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Attachment model
     */
    readonly fields: AttachmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Attachment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AttachmentClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    room<T extends RoomDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, RoomDefaultArgs<ExtArgs>>,
    ): Prisma__RoomClient<
      | $Result.GetResult<
          Prisma.$RoomPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    message<T extends Attachment$messageArgs<ExtArgs> = {}>(
      args?: Subset<T, Attachment$messageArgs<ExtArgs>>,
    ): Prisma__MessageClient<
      $Result.GetResult<
        Prisma.$MessagePayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;
    uploader<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      | $Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Attachment model
   */
  interface AttachmentFieldRefs {
    readonly id: FieldRef<'Attachment', 'String'>;
    readonly kind: FieldRef<'Attachment', 'AttachmentKind'>;
    readonly fileName: FieldRef<'Attachment', 'String'>;
    readonly mimeType: FieldRef<'Attachment', 'String'>;
    readonly sizeBytes: FieldRef<'Attachment', 'Int'>;
    readonly url: FieldRef<'Attachment', 'String'>;
    readonly createdAt: FieldRef<'Attachment', 'DateTime'>;
    readonly roomId: FieldRef<'Attachment', 'String'>;
    readonly messageId: FieldRef<'Attachment', 'String'>;
    readonly uploaderId: FieldRef<'Attachment', 'String'>;
  }

  // Custom InputTypes
  /**
   * Attachment findUnique
   */
  export type AttachmentFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null;
    /**
     * Filter, which Attachment to fetch.
     */
    where: AttachmentWhereUniqueInput;
  };

  /**
   * Attachment findUniqueOrThrow
   */
  export type AttachmentFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null;
    /**
     * Filter, which Attachment to fetch.
     */
    where: AttachmentWhereUniqueInput;
  };

  /**
   * Attachment findFirst
   */
  export type AttachmentFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null;
    /**
     * Filter, which Attachment to fetch.
     */
    where?: AttachmentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Attachments to fetch.
     */
    orderBy?:
      | AttachmentOrderByWithRelationInput
      | AttachmentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Attachments.
     */
    cursor?: AttachmentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Attachments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Attachments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Attachments.
     */
    distinct?: AttachmentScalarFieldEnum | AttachmentScalarFieldEnum[];
  };

  /**
   * Attachment findFirstOrThrow
   */
  export type AttachmentFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null;
    /**
     * Filter, which Attachment to fetch.
     */
    where?: AttachmentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Attachments to fetch.
     */
    orderBy?:
      | AttachmentOrderByWithRelationInput
      | AttachmentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Attachments.
     */
    cursor?: AttachmentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Attachments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Attachments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Attachments.
     */
    distinct?: AttachmentScalarFieldEnum | AttachmentScalarFieldEnum[];
  };

  /**
   * Attachment findMany
   */
  export type AttachmentFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null;
    /**
     * Filter, which Attachments to fetch.
     */
    where?: AttachmentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Attachments to fetch.
     */
    orderBy?:
      | AttachmentOrderByWithRelationInput
      | AttachmentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Attachments.
     */
    cursor?: AttachmentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Attachments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Attachments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Attachments.
     */
    distinct?: AttachmentScalarFieldEnum | AttachmentScalarFieldEnum[];
  };

  /**
   * Attachment create
   */
  export type AttachmentCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null;
    /**
     * The data needed to create a Attachment.
     */
    data: XOR<AttachmentCreateInput, AttachmentUncheckedCreateInput>;
  };

  /**
   * Attachment createMany
   */
  export type AttachmentCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Attachments.
     */
    data: AttachmentCreateManyInput | AttachmentCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Attachment createManyAndReturn
   */
  export type AttachmentCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null;
    /**
     * The data used to create many Attachments.
     */
    data: AttachmentCreateManyInput | AttachmentCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Attachment update
   */
  export type AttachmentUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null;
    /**
     * The data needed to update a Attachment.
     */
    data: XOR<AttachmentUpdateInput, AttachmentUncheckedUpdateInput>;
    /**
     * Choose, which Attachment to update.
     */
    where: AttachmentWhereUniqueInput;
  };

  /**
   * Attachment updateMany
   */
  export type AttachmentUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Attachments.
     */
    data: XOR<
      AttachmentUpdateManyMutationInput,
      AttachmentUncheckedUpdateManyInput
    >;
    /**
     * Filter which Attachments to update
     */
    where?: AttachmentWhereInput;
    /**
     * Limit how many Attachments to update.
     */
    limit?: number;
  };

  /**
   * Attachment updateManyAndReturn
   */
  export type AttachmentUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null;
    /**
     * The data used to update Attachments.
     */
    data: XOR<
      AttachmentUpdateManyMutationInput,
      AttachmentUncheckedUpdateManyInput
    >;
    /**
     * Filter which Attachments to update
     */
    where?: AttachmentWhereInput;
    /**
     * Limit how many Attachments to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Attachment upsert
   */
  export type AttachmentUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null;
    /**
     * The filter to search for the Attachment to update in case it exists.
     */
    where: AttachmentWhereUniqueInput;
    /**
     * In case the Attachment found by the `where` argument doesn't exist, create a new Attachment with this data.
     */
    create: XOR<AttachmentCreateInput, AttachmentUncheckedCreateInput>;
    /**
     * In case the Attachment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AttachmentUpdateInput, AttachmentUncheckedUpdateInput>;
  };

  /**
   * Attachment delete
   */
  export type AttachmentDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null;
    /**
     * Filter which Attachment to delete.
     */
    where: AttachmentWhereUniqueInput;
  };

  /**
   * Attachment deleteMany
   */
  export type AttachmentDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Attachments to delete
     */
    where?: AttachmentWhereInput;
    /**
     * Limit how many Attachments to delete.
     */
    limit?: number;
  };

  /**
   * Attachment.message
   */
  export type Attachment$messageArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null;
    where?: MessageWhereInput;
  };

  /**
   * Attachment without action
   */
  export type AttachmentDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null;
  };

  /**
   * Model MessageReceipt
   */

  export type AggregateMessageReceipt = {
    _count: MessageReceiptCountAggregateOutputType | null;
    _min: MessageReceiptMinAggregateOutputType | null;
    _max: MessageReceiptMaxAggregateOutputType | null;
  };

  export type MessageReceiptMinAggregateOutputType = {
    messageId: string | null;
    userId: string | null;
    status: $Enums.ReceiptStatus | null;
    at: Date | null;
  };

  export type MessageReceiptMaxAggregateOutputType = {
    messageId: string | null;
    userId: string | null;
    status: $Enums.ReceiptStatus | null;
    at: Date | null;
  };

  export type MessageReceiptCountAggregateOutputType = {
    messageId: number;
    userId: number;
    status: number;
    at: number;
    _all: number;
  };

  export type MessageReceiptMinAggregateInputType = {
    messageId?: true;
    userId?: true;
    status?: true;
    at?: true;
  };

  export type MessageReceiptMaxAggregateInputType = {
    messageId?: true;
    userId?: true;
    status?: true;
    at?: true;
  };

  export type MessageReceiptCountAggregateInputType = {
    messageId?: true;
    userId?: true;
    status?: true;
    at?: true;
    _all?: true;
  };

  export type MessageReceiptAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which MessageReceipt to aggregate.
     */
    where?: MessageReceiptWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MessageReceipts to fetch.
     */
    orderBy?:
      | MessageReceiptOrderByWithRelationInput
      | MessageReceiptOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: MessageReceiptWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MessageReceipts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MessageReceipts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned MessageReceipts
     **/
    _count?: true | MessageReceiptCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: MessageReceiptMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: MessageReceiptMaxAggregateInputType;
  };

  export type GetMessageReceiptAggregateType<
    T extends MessageReceiptAggregateArgs,
  > = {
    [P in keyof T & keyof AggregateMessageReceipt]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessageReceipt[P]>
      : GetScalarType<T[P], AggregateMessageReceipt[P]>;
  };

  export type MessageReceiptGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: MessageReceiptWhereInput;
    orderBy?:
      | MessageReceiptOrderByWithAggregationInput
      | MessageReceiptOrderByWithAggregationInput[];
    by: MessageReceiptScalarFieldEnum[] | MessageReceiptScalarFieldEnum;
    having?: MessageReceiptScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MessageReceiptCountAggregateInputType | true;
    _min?: MessageReceiptMinAggregateInputType;
    _max?: MessageReceiptMaxAggregateInputType;
  };

  export type MessageReceiptGroupByOutputType = {
    messageId: string;
    userId: string;
    status: $Enums.ReceiptStatus;
    at: Date;
    _count: MessageReceiptCountAggregateOutputType | null;
    _min: MessageReceiptMinAggregateOutputType | null;
    _max: MessageReceiptMaxAggregateOutputType | null;
  };

  type GetMessageReceiptGroupByPayload<T extends MessageReceiptGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<MessageReceiptGroupByOutputType, T['by']> & {
          [P in keyof T &
            keyof MessageReceiptGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageReceiptGroupByOutputType[P]>
            : GetScalarType<T[P], MessageReceiptGroupByOutputType[P]>;
        }
      >
    >;

  export type MessageReceiptSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      messageId?: boolean;
      userId?: boolean;
      status?: boolean;
      at?: boolean;
      message?: boolean | MessageDefaultArgs<ExtArgs>;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['messageReceipt']
  >;

  export type MessageReceiptSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      messageId?: boolean;
      userId?: boolean;
      status?: boolean;
      at?: boolean;
      message?: boolean | MessageDefaultArgs<ExtArgs>;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['messageReceipt']
  >;

  export type MessageReceiptSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      messageId?: boolean;
      userId?: boolean;
      status?: boolean;
      at?: boolean;
      message?: boolean | MessageDefaultArgs<ExtArgs>;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['messageReceipt']
  >;

  export type MessageReceiptSelectScalar = {
    messageId?: boolean;
    userId?: boolean;
    status?: boolean;
    at?: boolean;
  };

  export type MessageReceiptOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    'messageId' | 'userId' | 'status' | 'at',
    ExtArgs['result']['messageReceipt']
  >;
  export type MessageReceiptInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    message?: boolean | MessageDefaultArgs<ExtArgs>;
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type MessageReceiptIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    message?: boolean | MessageDefaultArgs<ExtArgs>;
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type MessageReceiptIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    message?: boolean | MessageDefaultArgs<ExtArgs>;
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $MessageReceiptPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'MessageReceipt';
    objects: {
      message: Prisma.$MessagePayload<ExtArgs>;
      user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        messageId: string;
        userId: string;
        status: $Enums.ReceiptStatus;
        at: Date;
      },
      ExtArgs['result']['messageReceipt']
    >;
    composites: {};
  };

  type MessageReceiptGetPayload<
    S extends boolean | null | undefined | MessageReceiptDefaultArgs,
  > = $Result.GetResult<Prisma.$MessageReceiptPayload, S>;

  type MessageReceiptCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<
    MessageReceiptFindManyArgs,
    'select' | 'include' | 'distinct' | 'omit'
  > & {
    select?: MessageReceiptCountAggregateInputType | true;
  };

  export interface MessageReceiptDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['MessageReceipt'];
      meta: { name: 'MessageReceipt' };
    };
    /**
     * Find zero or one MessageReceipt that matches the filter.
     * @param {MessageReceiptFindUniqueArgs} args - Arguments to find a MessageReceipt
     * @example
     * // Get one MessageReceipt
     * const messageReceipt = await prisma.messageReceipt.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageReceiptFindUniqueArgs>(
      args: SelectSubset<T, MessageReceiptFindUniqueArgs<ExtArgs>>,
    ): Prisma__MessageReceiptClient<
      $Result.GetResult<
        Prisma.$MessageReceiptPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one MessageReceipt that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageReceiptFindUniqueOrThrowArgs} args - Arguments to find a MessageReceipt
     * @example
     * // Get one MessageReceipt
     * const messageReceipt = await prisma.messageReceipt.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageReceiptFindUniqueOrThrowArgs>(
      args: SelectSubset<T, MessageReceiptFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__MessageReceiptClient<
      $Result.GetResult<
        Prisma.$MessageReceiptPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first MessageReceipt that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageReceiptFindFirstArgs} args - Arguments to find a MessageReceipt
     * @example
     * // Get one MessageReceipt
     * const messageReceipt = await prisma.messageReceipt.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageReceiptFindFirstArgs>(
      args?: SelectSubset<T, MessageReceiptFindFirstArgs<ExtArgs>>,
    ): Prisma__MessageReceiptClient<
      $Result.GetResult<
        Prisma.$MessageReceiptPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first MessageReceipt that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageReceiptFindFirstOrThrowArgs} args - Arguments to find a MessageReceipt
     * @example
     * // Get one MessageReceipt
     * const messageReceipt = await prisma.messageReceipt.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageReceiptFindFirstOrThrowArgs>(
      args?: SelectSubset<T, MessageReceiptFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__MessageReceiptClient<
      $Result.GetResult<
        Prisma.$MessageReceiptPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more MessageReceipts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageReceiptFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MessageReceipts
     * const messageReceipts = await prisma.messageReceipt.findMany()
     *
     * // Get first 10 MessageReceipts
     * const messageReceipts = await prisma.messageReceipt.findMany({ take: 10 })
     *
     * // Only select the `messageId`
     * const messageReceiptWithMessageIdOnly = await prisma.messageReceipt.findMany({ select: { messageId: true } })
     *
     */
    findMany<T extends MessageReceiptFindManyArgs>(
      args?: SelectSubset<T, MessageReceiptFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$MessageReceiptPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a MessageReceipt.
     * @param {MessageReceiptCreateArgs} args - Arguments to create a MessageReceipt.
     * @example
     * // Create one MessageReceipt
     * const MessageReceipt = await prisma.messageReceipt.create({
     *   data: {
     *     // ... data to create a MessageReceipt
     *   }
     * })
     *
     */
    create<T extends MessageReceiptCreateArgs>(
      args: SelectSubset<T, MessageReceiptCreateArgs<ExtArgs>>,
    ): Prisma__MessageReceiptClient<
      $Result.GetResult<
        Prisma.$MessageReceiptPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many MessageReceipts.
     * @param {MessageReceiptCreateManyArgs} args - Arguments to create many MessageReceipts.
     * @example
     * // Create many MessageReceipts
     * const messageReceipt = await prisma.messageReceipt.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends MessageReceiptCreateManyArgs>(
      args?: SelectSubset<T, MessageReceiptCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many MessageReceipts and returns the data saved in the database.
     * @param {MessageReceiptCreateManyAndReturnArgs} args - Arguments to create many MessageReceipts.
     * @example
     * // Create many MessageReceipts
     * const messageReceipt = await prisma.messageReceipt.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many MessageReceipts and only return the `messageId`
     * const messageReceiptWithMessageIdOnly = await prisma.messageReceipt.createManyAndReturn({
     *   select: { messageId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends MessageReceiptCreateManyAndReturnArgs>(
      args?: SelectSubset<T, MessageReceiptCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$MessageReceiptPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a MessageReceipt.
     * @param {MessageReceiptDeleteArgs} args - Arguments to delete one MessageReceipt.
     * @example
     * // Delete one MessageReceipt
     * const MessageReceipt = await prisma.messageReceipt.delete({
     *   where: {
     *     // ... filter to delete one MessageReceipt
     *   }
     * })
     *
     */
    delete<T extends MessageReceiptDeleteArgs>(
      args: SelectSubset<T, MessageReceiptDeleteArgs<ExtArgs>>,
    ): Prisma__MessageReceiptClient<
      $Result.GetResult<
        Prisma.$MessageReceiptPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one MessageReceipt.
     * @param {MessageReceiptUpdateArgs} args - Arguments to update one MessageReceipt.
     * @example
     * // Update one MessageReceipt
     * const messageReceipt = await prisma.messageReceipt.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends MessageReceiptUpdateArgs>(
      args: SelectSubset<T, MessageReceiptUpdateArgs<ExtArgs>>,
    ): Prisma__MessageReceiptClient<
      $Result.GetResult<
        Prisma.$MessageReceiptPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more MessageReceipts.
     * @param {MessageReceiptDeleteManyArgs} args - Arguments to filter MessageReceipts to delete.
     * @example
     * // Delete a few MessageReceipts
     * const { count } = await prisma.messageReceipt.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends MessageReceiptDeleteManyArgs>(
      args?: SelectSubset<T, MessageReceiptDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more MessageReceipts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageReceiptUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MessageReceipts
     * const messageReceipt = await prisma.messageReceipt.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends MessageReceiptUpdateManyArgs>(
      args: SelectSubset<T, MessageReceiptUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more MessageReceipts and returns the data updated in the database.
     * @param {MessageReceiptUpdateManyAndReturnArgs} args - Arguments to update many MessageReceipts.
     * @example
     * // Update many MessageReceipts
     * const messageReceipt = await prisma.messageReceipt.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more MessageReceipts and only return the `messageId`
     * const messageReceiptWithMessageIdOnly = await prisma.messageReceipt.updateManyAndReturn({
     *   select: { messageId: true },
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
    updateManyAndReturn<T extends MessageReceiptUpdateManyAndReturnArgs>(
      args: SelectSubset<T, MessageReceiptUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$MessageReceiptPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one MessageReceipt.
     * @param {MessageReceiptUpsertArgs} args - Arguments to update or create a MessageReceipt.
     * @example
     * // Update or create a MessageReceipt
     * const messageReceipt = await prisma.messageReceipt.upsert({
     *   create: {
     *     // ... data to create a MessageReceipt
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MessageReceipt we want to update
     *   }
     * })
     */
    upsert<T extends MessageReceiptUpsertArgs>(
      args: SelectSubset<T, MessageReceiptUpsertArgs<ExtArgs>>,
    ): Prisma__MessageReceiptClient<
      $Result.GetResult<
        Prisma.$MessageReceiptPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of MessageReceipts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageReceiptCountArgs} args - Arguments to filter MessageReceipts to count.
     * @example
     * // Count the number of MessageReceipts
     * const count = await prisma.messageReceipt.count({
     *   where: {
     *     // ... the filter for the MessageReceipts we want to count
     *   }
     * })
     **/
    count<T extends MessageReceiptCountArgs>(
      args?: Subset<T, MessageReceiptCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageReceiptCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a MessageReceipt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageReceiptAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MessageReceiptAggregateArgs>(
      args: Subset<T, MessageReceiptAggregateArgs>,
    ): Prisma.PrismaPromise<GetMessageReceiptAggregateType<T>>;

    /**
     * Group by MessageReceipt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageReceiptGroupByArgs} args - Group by arguments.
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
      T extends MessageReceiptGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageReceiptGroupByArgs['orderBy'] }
        : { orderBy?: MessageReceiptGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
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
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, MessageReceiptGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetMessageReceiptGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the MessageReceipt model
     */
    readonly fields: MessageReceiptFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MessageReceipt.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageReceiptClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    message<T extends MessageDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, MessageDefaultArgs<ExtArgs>>,
    ): Prisma__MessageClient<
      | $Result.GetResult<
          Prisma.$MessagePayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      | $Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the MessageReceipt model
   */
  interface MessageReceiptFieldRefs {
    readonly messageId: FieldRef<'MessageReceipt', 'String'>;
    readonly userId: FieldRef<'MessageReceipt', 'String'>;
    readonly status: FieldRef<'MessageReceipt', 'ReceiptStatus'>;
    readonly at: FieldRef<'MessageReceipt', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * MessageReceipt findUnique
   */
  export type MessageReceiptFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the MessageReceipt
     */
    select?: MessageReceiptSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MessageReceipt
     */
    omit?: MessageReceiptOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageReceiptInclude<ExtArgs> | null;
    /**
     * Filter, which MessageReceipt to fetch.
     */
    where: MessageReceiptWhereUniqueInput;
  };

  /**
   * MessageReceipt findUniqueOrThrow
   */
  export type MessageReceiptFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the MessageReceipt
     */
    select?: MessageReceiptSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MessageReceipt
     */
    omit?: MessageReceiptOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageReceiptInclude<ExtArgs> | null;
    /**
     * Filter, which MessageReceipt to fetch.
     */
    where: MessageReceiptWhereUniqueInput;
  };

  /**
   * MessageReceipt findFirst
   */
  export type MessageReceiptFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the MessageReceipt
     */
    select?: MessageReceiptSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MessageReceipt
     */
    omit?: MessageReceiptOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageReceiptInclude<ExtArgs> | null;
    /**
     * Filter, which MessageReceipt to fetch.
     */
    where?: MessageReceiptWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MessageReceipts to fetch.
     */
    orderBy?:
      | MessageReceiptOrderByWithRelationInput
      | MessageReceiptOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for MessageReceipts.
     */
    cursor?: MessageReceiptWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MessageReceipts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MessageReceipts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MessageReceipts.
     */
    distinct?: MessageReceiptScalarFieldEnum | MessageReceiptScalarFieldEnum[];
  };

  /**
   * MessageReceipt findFirstOrThrow
   */
  export type MessageReceiptFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the MessageReceipt
     */
    select?: MessageReceiptSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MessageReceipt
     */
    omit?: MessageReceiptOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageReceiptInclude<ExtArgs> | null;
    /**
     * Filter, which MessageReceipt to fetch.
     */
    where?: MessageReceiptWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MessageReceipts to fetch.
     */
    orderBy?:
      | MessageReceiptOrderByWithRelationInput
      | MessageReceiptOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for MessageReceipts.
     */
    cursor?: MessageReceiptWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MessageReceipts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MessageReceipts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MessageReceipts.
     */
    distinct?: MessageReceiptScalarFieldEnum | MessageReceiptScalarFieldEnum[];
  };

  /**
   * MessageReceipt findMany
   */
  export type MessageReceiptFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the MessageReceipt
     */
    select?: MessageReceiptSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MessageReceipt
     */
    omit?: MessageReceiptOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageReceiptInclude<ExtArgs> | null;
    /**
     * Filter, which MessageReceipts to fetch.
     */
    where?: MessageReceiptWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MessageReceipts to fetch.
     */
    orderBy?:
      | MessageReceiptOrderByWithRelationInput
      | MessageReceiptOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing MessageReceipts.
     */
    cursor?: MessageReceiptWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MessageReceipts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MessageReceipts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MessageReceipts.
     */
    distinct?: MessageReceiptScalarFieldEnum | MessageReceiptScalarFieldEnum[];
  };

  /**
   * MessageReceipt create
   */
  export type MessageReceiptCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the MessageReceipt
     */
    select?: MessageReceiptSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MessageReceipt
     */
    omit?: MessageReceiptOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageReceiptInclude<ExtArgs> | null;
    /**
     * The data needed to create a MessageReceipt.
     */
    data: XOR<MessageReceiptCreateInput, MessageReceiptUncheckedCreateInput>;
  };

  /**
   * MessageReceipt createMany
   */
  export type MessageReceiptCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many MessageReceipts.
     */
    data: MessageReceiptCreateManyInput | MessageReceiptCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * MessageReceipt createManyAndReturn
   */
  export type MessageReceiptCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the MessageReceipt
     */
    select?: MessageReceiptSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the MessageReceipt
     */
    omit?: MessageReceiptOmit<ExtArgs> | null;
    /**
     * The data used to create many MessageReceipts.
     */
    data: MessageReceiptCreateManyInput | MessageReceiptCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageReceiptIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * MessageReceipt update
   */
  export type MessageReceiptUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the MessageReceipt
     */
    select?: MessageReceiptSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MessageReceipt
     */
    omit?: MessageReceiptOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageReceiptInclude<ExtArgs> | null;
    /**
     * The data needed to update a MessageReceipt.
     */
    data: XOR<MessageReceiptUpdateInput, MessageReceiptUncheckedUpdateInput>;
    /**
     * Choose, which MessageReceipt to update.
     */
    where: MessageReceiptWhereUniqueInput;
  };

  /**
   * MessageReceipt updateMany
   */
  export type MessageReceiptUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update MessageReceipts.
     */
    data: XOR<
      MessageReceiptUpdateManyMutationInput,
      MessageReceiptUncheckedUpdateManyInput
    >;
    /**
     * Filter which MessageReceipts to update
     */
    where?: MessageReceiptWhereInput;
    /**
     * Limit how many MessageReceipts to update.
     */
    limit?: number;
  };

  /**
   * MessageReceipt updateManyAndReturn
   */
  export type MessageReceiptUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the MessageReceipt
     */
    select?: MessageReceiptSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the MessageReceipt
     */
    omit?: MessageReceiptOmit<ExtArgs> | null;
    /**
     * The data used to update MessageReceipts.
     */
    data: XOR<
      MessageReceiptUpdateManyMutationInput,
      MessageReceiptUncheckedUpdateManyInput
    >;
    /**
     * Filter which MessageReceipts to update
     */
    where?: MessageReceiptWhereInput;
    /**
     * Limit how many MessageReceipts to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageReceiptIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * MessageReceipt upsert
   */
  export type MessageReceiptUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the MessageReceipt
     */
    select?: MessageReceiptSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MessageReceipt
     */
    omit?: MessageReceiptOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageReceiptInclude<ExtArgs> | null;
    /**
     * The filter to search for the MessageReceipt to update in case it exists.
     */
    where: MessageReceiptWhereUniqueInput;
    /**
     * In case the MessageReceipt found by the `where` argument doesn't exist, create a new MessageReceipt with this data.
     */
    create: XOR<MessageReceiptCreateInput, MessageReceiptUncheckedCreateInput>;
    /**
     * In case the MessageReceipt was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageReceiptUpdateInput, MessageReceiptUncheckedUpdateInput>;
  };

  /**
   * MessageReceipt delete
   */
  export type MessageReceiptDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the MessageReceipt
     */
    select?: MessageReceiptSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MessageReceipt
     */
    omit?: MessageReceiptOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageReceiptInclude<ExtArgs> | null;
    /**
     * Filter which MessageReceipt to delete.
     */
    where: MessageReceiptWhereUniqueInput;
  };

  /**
   * MessageReceipt deleteMany
   */
  export type MessageReceiptDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which MessageReceipts to delete
     */
    where?: MessageReceiptWhereInput;
    /**
     * Limit how many MessageReceipts to delete.
     */
    limit?: number;
  };

  /**
   * MessageReceipt without action
   */
  export type MessageReceiptDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the MessageReceipt
     */
    select?: MessageReceiptSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MessageReceipt
     */
    omit?: MessageReceiptOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageReceiptInclude<ExtArgs> | null;
  };

  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted';
    ReadCommitted: 'ReadCommitted';
    RepeatableRead: 'RepeatableRead';
    Serializable: 'Serializable';
  };

  export type TransactionIsolationLevel =
    (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];

  export const UserScalarFieldEnum: {
    id: 'id';
    email: 'email';
    name: 'name';
    passwordHash: 'passwordHash';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type UserScalarFieldEnum =
    (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];

  export const RoomScalarFieldEnum: {
    id: 'id';
    name: 'name';
    type: 'type';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
    directKey: 'directKey';
  };

  export type RoomScalarFieldEnum =
    (typeof RoomScalarFieldEnum)[keyof typeof RoomScalarFieldEnum];

  export const RoomMemberScalarFieldEnum: {
    roomId: 'roomId';
    userId: 'userId';
    role: 'role';
    joinedAt: 'joinedAt';
    lastReadAt: 'lastReadAt';
    lastReadMessageId: 'lastReadMessageId';
  };

  export type RoomMemberScalarFieldEnum =
    (typeof RoomMemberScalarFieldEnum)[keyof typeof RoomMemberScalarFieldEnum];

  export const MessageScalarFieldEnum: {
    id: 'id';
    roomId: 'roomId';
    userId: 'userId';
    body: 'body';
    replyToId: 'replyToId';
    createdAt: 'createdAt';
  };

  export type MessageScalarFieldEnum =
    (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum];

  export const AttachmentScalarFieldEnum: {
    id: 'id';
    kind: 'kind';
    fileName: 'fileName';
    mimeType: 'mimeType';
    sizeBytes: 'sizeBytes';
    url: 'url';
    createdAt: 'createdAt';
    roomId: 'roomId';
    messageId: 'messageId';
    uploaderId: 'uploaderId';
  };

  export type AttachmentScalarFieldEnum =
    (typeof AttachmentScalarFieldEnum)[keyof typeof AttachmentScalarFieldEnum];

  export const MessageReceiptScalarFieldEnum: {
    messageId: 'messageId';
    userId: 'userId';
    status: 'status';
    at: 'at';
  };

  export type MessageReceiptScalarFieldEnum =
    (typeof MessageReceiptScalarFieldEnum)[keyof typeof MessageReceiptScalarFieldEnum];

  export const SortOrder: {
    asc: 'asc';
    desc: 'desc';
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

  export const QueryMode: {
    default: 'default';
    insensitive: 'insensitive';
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];

  export const NullsOrder: {
    first: 'first';
    last: 'last';
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];

  /**
   * Field references
   */

  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'String'
  >;

  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'String[]'
  >;

  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'DateTime'
  >;

  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'DateTime[]'
  >;

  /**
   * Reference to a field of type 'RoomType'
   */
  export type EnumRoomTypeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'RoomType'
  >;

  /**
   * Reference to a field of type 'RoomType[]'
   */
  export type ListEnumRoomTypeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'RoomType[]'
  >;

  /**
   * Reference to a field of type 'RoomRole'
   */
  export type EnumRoomRoleFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'RoomRole'
  >;

  /**
   * Reference to a field of type 'RoomRole[]'
   */
  export type ListEnumRoomRoleFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'RoomRole[]'
  >;

  /**
   * Reference to a field of type 'AttachmentKind'
   */
  export type EnumAttachmentKindFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'AttachmentKind'
  >;

  /**
   * Reference to a field of type 'AttachmentKind[]'
   */
  export type ListEnumAttachmentKindFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, 'AttachmentKind[]'>;

  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Int'
  >;

  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Int[]'
  >;

  /**
   * Reference to a field of type 'ReceiptStatus'
   */
  export type EnumReceiptStatusFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'ReceiptStatus'
  >;

  /**
   * Reference to a field of type 'ReceiptStatus[]'
   */
  export type ListEnumReceiptStatusFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, 'ReceiptStatus[]'>;

  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Float'
  >;

  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Float[]'
  >;

  /**
   * Deep Input Types
   */

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[];
    OR?: UserWhereInput[];
    NOT?: UserWhereInput | UserWhereInput[];
    id?: StringFilter<'User'> | string;
    email?: StringNullableFilter<'User'> | string | null;
    name?: StringFilter<'User'> | string;
    passwordHash?: StringNullableFilter<'User'> | string | null;
    createdAt?: DateTimeFilter<'User'> | Date | string;
    updatedAt?: DateTimeFilter<'User'> | Date | string;
    memberships?: RoomMemberListRelationFilter;
    messages?: MessageListRelationFilter;
    receipts?: MessageReceiptListRelationFilter;
    uploads?: AttachmentListRelationFilter;
  };

  export type UserOrderByWithRelationInput = {
    id?: SortOrder;
    email?: SortOrderInput | SortOrder;
    name?: SortOrder;
    passwordHash?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    memberships?: RoomMemberOrderByRelationAggregateInput;
    messages?: MessageOrderByRelationAggregateInput;
    receipts?: MessageReceiptOrderByRelationAggregateInput;
    uploads?: AttachmentOrderByRelationAggregateInput;
  };

  export type UserWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      email?: string;
      AND?: UserWhereInput | UserWhereInput[];
      OR?: UserWhereInput[];
      NOT?: UserWhereInput | UserWhereInput[];
      name?: StringFilter<'User'> | string;
      passwordHash?: StringNullableFilter<'User'> | string | null;
      createdAt?: DateTimeFilter<'User'> | Date | string;
      updatedAt?: DateTimeFilter<'User'> | Date | string;
      memberships?: RoomMemberListRelationFilter;
      messages?: MessageListRelationFilter;
      receipts?: MessageReceiptListRelationFilter;
      uploads?: AttachmentListRelationFilter;
    },
    'id' | 'email'
  >;

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder;
    email?: SortOrderInput | SortOrder;
    name?: SortOrder;
    passwordHash?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: UserCountOrderByAggregateInput;
    _max?: UserMaxOrderByAggregateInput;
    _min?: UserMinOrderByAggregateInput;
  };

  export type UserScalarWhereWithAggregatesInput = {
    AND?:
      | UserScalarWhereWithAggregatesInput
      | UserScalarWhereWithAggregatesInput[];
    OR?: UserScalarWhereWithAggregatesInput[];
    NOT?:
      | UserScalarWhereWithAggregatesInput
      | UserScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'User'> | string;
    email?: StringNullableWithAggregatesFilter<'User'> | string | null;
    name?: StringWithAggregatesFilter<'User'> | string;
    passwordHash?: StringNullableWithAggregatesFilter<'User'> | string | null;
    createdAt?: DateTimeWithAggregatesFilter<'User'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'User'> | Date | string;
  };

  export type RoomWhereInput = {
    AND?: RoomWhereInput | RoomWhereInput[];
    OR?: RoomWhereInput[];
    NOT?: RoomWhereInput | RoomWhereInput[];
    id?: StringFilter<'Room'> | string;
    name?: StringFilter<'Room'> | string;
    type?: EnumRoomTypeFilter<'Room'> | $Enums.RoomType;
    createdAt?: DateTimeFilter<'Room'> | Date | string;
    updatedAt?: DateTimeFilter<'Room'> | Date | string;
    directKey?: StringNullableFilter<'Room'> | string | null;
    members?: RoomMemberListRelationFilter;
    messages?: MessageListRelationFilter;
    uploads?: AttachmentListRelationFilter;
  };

  export type RoomOrderByWithRelationInput = {
    id?: SortOrder;
    name?: SortOrder;
    type?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    directKey?: SortOrderInput | SortOrder;
    members?: RoomMemberOrderByRelationAggregateInput;
    messages?: MessageOrderByRelationAggregateInput;
    uploads?: AttachmentOrderByRelationAggregateInput;
  };

  export type RoomWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      directKey?: string;
      AND?: RoomWhereInput | RoomWhereInput[];
      OR?: RoomWhereInput[];
      NOT?: RoomWhereInput | RoomWhereInput[];
      name?: StringFilter<'Room'> | string;
      type?: EnumRoomTypeFilter<'Room'> | $Enums.RoomType;
      createdAt?: DateTimeFilter<'Room'> | Date | string;
      updatedAt?: DateTimeFilter<'Room'> | Date | string;
      members?: RoomMemberListRelationFilter;
      messages?: MessageListRelationFilter;
      uploads?: AttachmentListRelationFilter;
    },
    'id' | 'directKey'
  >;

  export type RoomOrderByWithAggregationInput = {
    id?: SortOrder;
    name?: SortOrder;
    type?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    directKey?: SortOrderInput | SortOrder;
    _count?: RoomCountOrderByAggregateInput;
    _max?: RoomMaxOrderByAggregateInput;
    _min?: RoomMinOrderByAggregateInput;
  };

  export type RoomScalarWhereWithAggregatesInput = {
    AND?:
      | RoomScalarWhereWithAggregatesInput
      | RoomScalarWhereWithAggregatesInput[];
    OR?: RoomScalarWhereWithAggregatesInput[];
    NOT?:
      | RoomScalarWhereWithAggregatesInput
      | RoomScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'Room'> | string;
    name?: StringWithAggregatesFilter<'Room'> | string;
    type?: EnumRoomTypeWithAggregatesFilter<'Room'> | $Enums.RoomType;
    createdAt?: DateTimeWithAggregatesFilter<'Room'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'Room'> | Date | string;
    directKey?: StringNullableWithAggregatesFilter<'Room'> | string | null;
  };

  export type RoomMemberWhereInput = {
    AND?: RoomMemberWhereInput | RoomMemberWhereInput[];
    OR?: RoomMemberWhereInput[];
    NOT?: RoomMemberWhereInput | RoomMemberWhereInput[];
    roomId?: StringFilter<'RoomMember'> | string;
    userId?: StringFilter<'RoomMember'> | string;
    role?: EnumRoomRoleFilter<'RoomMember'> | $Enums.RoomRole;
    joinedAt?: DateTimeFilter<'RoomMember'> | Date | string;
    lastReadAt?: DateTimeNullableFilter<'RoomMember'> | Date | string | null;
    lastReadMessageId?: StringNullableFilter<'RoomMember'> | string | null;
    room?: XOR<RoomScalarRelationFilter, RoomWhereInput>;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
  };

  export type RoomMemberOrderByWithRelationInput = {
    roomId?: SortOrder;
    userId?: SortOrder;
    role?: SortOrder;
    joinedAt?: SortOrder;
    lastReadAt?: SortOrderInput | SortOrder;
    lastReadMessageId?: SortOrderInput | SortOrder;
    room?: RoomOrderByWithRelationInput;
    user?: UserOrderByWithRelationInput;
  };

  export type RoomMemberWhereUniqueInput = Prisma.AtLeast<
    {
      roomId_userId?: RoomMemberRoomIdUserIdCompoundUniqueInput;
      AND?: RoomMemberWhereInput | RoomMemberWhereInput[];
      OR?: RoomMemberWhereInput[];
      NOT?: RoomMemberWhereInput | RoomMemberWhereInput[];
      roomId?: StringFilter<'RoomMember'> | string;
      userId?: StringFilter<'RoomMember'> | string;
      role?: EnumRoomRoleFilter<'RoomMember'> | $Enums.RoomRole;
      joinedAt?: DateTimeFilter<'RoomMember'> | Date | string;
      lastReadAt?: DateTimeNullableFilter<'RoomMember'> | Date | string | null;
      lastReadMessageId?: StringNullableFilter<'RoomMember'> | string | null;
      room?: XOR<RoomScalarRelationFilter, RoomWhereInput>;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    },
    'roomId_userId'
  >;

  export type RoomMemberOrderByWithAggregationInput = {
    roomId?: SortOrder;
    userId?: SortOrder;
    role?: SortOrder;
    joinedAt?: SortOrder;
    lastReadAt?: SortOrderInput | SortOrder;
    lastReadMessageId?: SortOrderInput | SortOrder;
    _count?: RoomMemberCountOrderByAggregateInput;
    _max?: RoomMemberMaxOrderByAggregateInput;
    _min?: RoomMemberMinOrderByAggregateInput;
  };

  export type RoomMemberScalarWhereWithAggregatesInput = {
    AND?:
      | RoomMemberScalarWhereWithAggregatesInput
      | RoomMemberScalarWhereWithAggregatesInput[];
    OR?: RoomMemberScalarWhereWithAggregatesInput[];
    NOT?:
      | RoomMemberScalarWhereWithAggregatesInput
      | RoomMemberScalarWhereWithAggregatesInput[];
    roomId?: StringWithAggregatesFilter<'RoomMember'> | string;
    userId?: StringWithAggregatesFilter<'RoomMember'> | string;
    role?: EnumRoomRoleWithAggregatesFilter<'RoomMember'> | $Enums.RoomRole;
    joinedAt?: DateTimeWithAggregatesFilter<'RoomMember'> | Date | string;
    lastReadAt?:
      | DateTimeNullableWithAggregatesFilter<'RoomMember'>
      | Date
      | string
      | null;
    lastReadMessageId?:
      | StringNullableWithAggregatesFilter<'RoomMember'>
      | string
      | null;
  };

  export type MessageWhereInput = {
    AND?: MessageWhereInput | MessageWhereInput[];
    OR?: MessageWhereInput[];
    NOT?: MessageWhereInput | MessageWhereInput[];
    id?: StringFilter<'Message'> | string;
    roomId?: StringFilter<'Message'> | string;
    userId?: StringFilter<'Message'> | string;
    body?: StringFilter<'Message'> | string;
    replyToId?: StringNullableFilter<'Message'> | string | null;
    createdAt?: DateTimeFilter<'Message'> | Date | string;
    room?: XOR<RoomScalarRelationFilter, RoomWhereInput>;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    replyTo?: XOR<
      MessageNullableScalarRelationFilter,
      MessageWhereInput
    > | null;
    replies?: MessageListRelationFilter;
    receipts?: MessageReceiptListRelationFilter;
    attachments?: AttachmentListRelationFilter;
  };

  export type MessageOrderByWithRelationInput = {
    id?: SortOrder;
    roomId?: SortOrder;
    userId?: SortOrder;
    body?: SortOrder;
    replyToId?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    room?: RoomOrderByWithRelationInput;
    user?: UserOrderByWithRelationInput;
    replyTo?: MessageOrderByWithRelationInput;
    replies?: MessageOrderByRelationAggregateInput;
    receipts?: MessageReceiptOrderByRelationAggregateInput;
    attachments?: AttachmentOrderByRelationAggregateInput;
  };

  export type MessageWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: MessageWhereInput | MessageWhereInput[];
      OR?: MessageWhereInput[];
      NOT?: MessageWhereInput | MessageWhereInput[];
      roomId?: StringFilter<'Message'> | string;
      userId?: StringFilter<'Message'> | string;
      body?: StringFilter<'Message'> | string;
      replyToId?: StringNullableFilter<'Message'> | string | null;
      createdAt?: DateTimeFilter<'Message'> | Date | string;
      room?: XOR<RoomScalarRelationFilter, RoomWhereInput>;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
      replyTo?: XOR<
        MessageNullableScalarRelationFilter,
        MessageWhereInput
      > | null;
      replies?: MessageListRelationFilter;
      receipts?: MessageReceiptListRelationFilter;
      attachments?: AttachmentListRelationFilter;
    },
    'id'
  >;

  export type MessageOrderByWithAggregationInput = {
    id?: SortOrder;
    roomId?: SortOrder;
    userId?: SortOrder;
    body?: SortOrder;
    replyToId?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    _count?: MessageCountOrderByAggregateInput;
    _max?: MessageMaxOrderByAggregateInput;
    _min?: MessageMinOrderByAggregateInput;
  };

  export type MessageScalarWhereWithAggregatesInput = {
    AND?:
      | MessageScalarWhereWithAggregatesInput
      | MessageScalarWhereWithAggregatesInput[];
    OR?: MessageScalarWhereWithAggregatesInput[];
    NOT?:
      | MessageScalarWhereWithAggregatesInput
      | MessageScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'Message'> | string;
    roomId?: StringWithAggregatesFilter<'Message'> | string;
    userId?: StringWithAggregatesFilter<'Message'> | string;
    body?: StringWithAggregatesFilter<'Message'> | string;
    replyToId?: StringNullableWithAggregatesFilter<'Message'> | string | null;
    createdAt?: DateTimeWithAggregatesFilter<'Message'> | Date | string;
  };

  export type AttachmentWhereInput = {
    AND?: AttachmentWhereInput | AttachmentWhereInput[];
    OR?: AttachmentWhereInput[];
    NOT?: AttachmentWhereInput | AttachmentWhereInput[];
    id?: StringFilter<'Attachment'> | string;
    kind?: EnumAttachmentKindFilter<'Attachment'> | $Enums.AttachmentKind;
    fileName?: StringFilter<'Attachment'> | string;
    mimeType?: StringFilter<'Attachment'> | string;
    sizeBytes?: IntFilter<'Attachment'> | number;
    url?: StringFilter<'Attachment'> | string;
    createdAt?: DateTimeFilter<'Attachment'> | Date | string;
    roomId?: StringFilter<'Attachment'> | string;
    messageId?: StringNullableFilter<'Attachment'> | string | null;
    uploaderId?: StringFilter<'Attachment'> | string;
    room?: XOR<RoomScalarRelationFilter, RoomWhereInput>;
    message?: XOR<
      MessageNullableScalarRelationFilter,
      MessageWhereInput
    > | null;
    uploader?: XOR<UserScalarRelationFilter, UserWhereInput>;
  };

  export type AttachmentOrderByWithRelationInput = {
    id?: SortOrder;
    kind?: SortOrder;
    fileName?: SortOrder;
    mimeType?: SortOrder;
    sizeBytes?: SortOrder;
    url?: SortOrder;
    createdAt?: SortOrder;
    roomId?: SortOrder;
    messageId?: SortOrderInput | SortOrder;
    uploaderId?: SortOrder;
    room?: RoomOrderByWithRelationInput;
    message?: MessageOrderByWithRelationInput;
    uploader?: UserOrderByWithRelationInput;
  };

  export type AttachmentWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: AttachmentWhereInput | AttachmentWhereInput[];
      OR?: AttachmentWhereInput[];
      NOT?: AttachmentWhereInput | AttachmentWhereInput[];
      kind?: EnumAttachmentKindFilter<'Attachment'> | $Enums.AttachmentKind;
      fileName?: StringFilter<'Attachment'> | string;
      mimeType?: StringFilter<'Attachment'> | string;
      sizeBytes?: IntFilter<'Attachment'> | number;
      url?: StringFilter<'Attachment'> | string;
      createdAt?: DateTimeFilter<'Attachment'> | Date | string;
      roomId?: StringFilter<'Attachment'> | string;
      messageId?: StringNullableFilter<'Attachment'> | string | null;
      uploaderId?: StringFilter<'Attachment'> | string;
      room?: XOR<RoomScalarRelationFilter, RoomWhereInput>;
      message?: XOR<
        MessageNullableScalarRelationFilter,
        MessageWhereInput
      > | null;
      uploader?: XOR<UserScalarRelationFilter, UserWhereInput>;
    },
    'id'
  >;

  export type AttachmentOrderByWithAggregationInput = {
    id?: SortOrder;
    kind?: SortOrder;
    fileName?: SortOrder;
    mimeType?: SortOrder;
    sizeBytes?: SortOrder;
    url?: SortOrder;
    createdAt?: SortOrder;
    roomId?: SortOrder;
    messageId?: SortOrderInput | SortOrder;
    uploaderId?: SortOrder;
    _count?: AttachmentCountOrderByAggregateInput;
    _avg?: AttachmentAvgOrderByAggregateInput;
    _max?: AttachmentMaxOrderByAggregateInput;
    _min?: AttachmentMinOrderByAggregateInput;
    _sum?: AttachmentSumOrderByAggregateInput;
  };

  export type AttachmentScalarWhereWithAggregatesInput = {
    AND?:
      | AttachmentScalarWhereWithAggregatesInput
      | AttachmentScalarWhereWithAggregatesInput[];
    OR?: AttachmentScalarWhereWithAggregatesInput[];
    NOT?:
      | AttachmentScalarWhereWithAggregatesInput
      | AttachmentScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'Attachment'> | string;
    kind?:
      | EnumAttachmentKindWithAggregatesFilter<'Attachment'>
      | $Enums.AttachmentKind;
    fileName?: StringWithAggregatesFilter<'Attachment'> | string;
    mimeType?: StringWithAggregatesFilter<'Attachment'> | string;
    sizeBytes?: IntWithAggregatesFilter<'Attachment'> | number;
    url?: StringWithAggregatesFilter<'Attachment'> | string;
    createdAt?: DateTimeWithAggregatesFilter<'Attachment'> | Date | string;
    roomId?: StringWithAggregatesFilter<'Attachment'> | string;
    messageId?:
      | StringNullableWithAggregatesFilter<'Attachment'>
      | string
      | null;
    uploaderId?: StringWithAggregatesFilter<'Attachment'> | string;
  };

  export type MessageReceiptWhereInput = {
    AND?: MessageReceiptWhereInput | MessageReceiptWhereInput[];
    OR?: MessageReceiptWhereInput[];
    NOT?: MessageReceiptWhereInput | MessageReceiptWhereInput[];
    messageId?: StringFilter<'MessageReceipt'> | string;
    userId?: StringFilter<'MessageReceipt'> | string;
    status?: EnumReceiptStatusFilter<'MessageReceipt'> | $Enums.ReceiptStatus;
    at?: DateTimeFilter<'MessageReceipt'> | Date | string;
    message?: XOR<MessageScalarRelationFilter, MessageWhereInput>;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
  };

  export type MessageReceiptOrderByWithRelationInput = {
    messageId?: SortOrder;
    userId?: SortOrder;
    status?: SortOrder;
    at?: SortOrder;
    message?: MessageOrderByWithRelationInput;
    user?: UserOrderByWithRelationInput;
  };

  export type MessageReceiptWhereUniqueInput = Prisma.AtLeast<
    {
      messageId_userId_status?: MessageReceiptMessageIdUserIdStatusCompoundUniqueInput;
      AND?: MessageReceiptWhereInput | MessageReceiptWhereInput[];
      OR?: MessageReceiptWhereInput[];
      NOT?: MessageReceiptWhereInput | MessageReceiptWhereInput[];
      messageId?: StringFilter<'MessageReceipt'> | string;
      userId?: StringFilter<'MessageReceipt'> | string;
      status?: EnumReceiptStatusFilter<'MessageReceipt'> | $Enums.ReceiptStatus;
      at?: DateTimeFilter<'MessageReceipt'> | Date | string;
      message?: XOR<MessageScalarRelationFilter, MessageWhereInput>;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    },
    'messageId_userId_status'
  >;

  export type MessageReceiptOrderByWithAggregationInput = {
    messageId?: SortOrder;
    userId?: SortOrder;
    status?: SortOrder;
    at?: SortOrder;
    _count?: MessageReceiptCountOrderByAggregateInput;
    _max?: MessageReceiptMaxOrderByAggregateInput;
    _min?: MessageReceiptMinOrderByAggregateInput;
  };

  export type MessageReceiptScalarWhereWithAggregatesInput = {
    AND?:
      | MessageReceiptScalarWhereWithAggregatesInput
      | MessageReceiptScalarWhereWithAggregatesInput[];
    OR?: MessageReceiptScalarWhereWithAggregatesInput[];
    NOT?:
      | MessageReceiptScalarWhereWithAggregatesInput
      | MessageReceiptScalarWhereWithAggregatesInput[];
    messageId?: StringWithAggregatesFilter<'MessageReceipt'> | string;
    userId?: StringWithAggregatesFilter<'MessageReceipt'> | string;
    status?:
      | EnumReceiptStatusWithAggregatesFilter<'MessageReceipt'>
      | $Enums.ReceiptStatus;
    at?: DateTimeWithAggregatesFilter<'MessageReceipt'> | Date | string;
  };

  export type UserCreateInput = {
    id?: string;
    email?: string | null;
    name: string;
    passwordHash?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    memberships?: RoomMemberCreateNestedManyWithoutUserInput;
    messages?: MessageCreateNestedManyWithoutUserInput;
    receipts?: MessageReceiptCreateNestedManyWithoutUserInput;
    uploads?: AttachmentCreateNestedManyWithoutUploaderInput;
  };

  export type UserUncheckedCreateInput = {
    id?: string;
    email?: string | null;
    name: string;
    passwordHash?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    memberships?: RoomMemberUncheckedCreateNestedManyWithoutUserInput;
    messages?: MessageUncheckedCreateNestedManyWithoutUserInput;
    receipts?: MessageReceiptUncheckedCreateNestedManyWithoutUserInput;
    uploads?: AttachmentUncheckedCreateNestedManyWithoutUploaderInput;
  };

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    name?: StringFieldUpdateOperationsInput | string;
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    memberships?: RoomMemberUpdateManyWithoutUserNestedInput;
    messages?: MessageUpdateManyWithoutUserNestedInput;
    receipts?: MessageReceiptUpdateManyWithoutUserNestedInput;
    uploads?: AttachmentUpdateManyWithoutUploaderNestedInput;
  };

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    name?: StringFieldUpdateOperationsInput | string;
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    memberships?: RoomMemberUncheckedUpdateManyWithoutUserNestedInput;
    messages?: MessageUncheckedUpdateManyWithoutUserNestedInput;
    receipts?: MessageReceiptUncheckedUpdateManyWithoutUserNestedInput;
    uploads?: AttachmentUncheckedUpdateManyWithoutUploaderNestedInput;
  };

  export type UserCreateManyInput = {
    id?: string;
    email?: string | null;
    name: string;
    passwordHash?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    name?: StringFieldUpdateOperationsInput | string;
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    name?: StringFieldUpdateOperationsInput | string;
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type RoomCreateInput = {
    id?: string;
    name: string;
    type?: $Enums.RoomType;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    directKey?: string | null;
    members?: RoomMemberCreateNestedManyWithoutRoomInput;
    messages?: MessageCreateNestedManyWithoutRoomInput;
    uploads?: AttachmentCreateNestedManyWithoutRoomInput;
  };

  export type RoomUncheckedCreateInput = {
    id?: string;
    name: string;
    type?: $Enums.RoomType;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    directKey?: string | null;
    members?: RoomMemberUncheckedCreateNestedManyWithoutRoomInput;
    messages?: MessageUncheckedCreateNestedManyWithoutRoomInput;
    uploads?: AttachmentUncheckedCreateNestedManyWithoutRoomInput;
  };

  export type RoomUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    type?: EnumRoomTypeFieldUpdateOperationsInput | $Enums.RoomType;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    directKey?: NullableStringFieldUpdateOperationsInput | string | null;
    members?: RoomMemberUpdateManyWithoutRoomNestedInput;
    messages?: MessageUpdateManyWithoutRoomNestedInput;
    uploads?: AttachmentUpdateManyWithoutRoomNestedInput;
  };

  export type RoomUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    type?: EnumRoomTypeFieldUpdateOperationsInput | $Enums.RoomType;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    directKey?: NullableStringFieldUpdateOperationsInput | string | null;
    members?: RoomMemberUncheckedUpdateManyWithoutRoomNestedInput;
    messages?: MessageUncheckedUpdateManyWithoutRoomNestedInput;
    uploads?: AttachmentUncheckedUpdateManyWithoutRoomNestedInput;
  };

  export type RoomCreateManyInput = {
    id?: string;
    name: string;
    type?: $Enums.RoomType;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    directKey?: string | null;
  };

  export type RoomUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    type?: EnumRoomTypeFieldUpdateOperationsInput | $Enums.RoomType;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    directKey?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type RoomUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    type?: EnumRoomTypeFieldUpdateOperationsInput | $Enums.RoomType;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    directKey?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type RoomMemberCreateInput = {
    role?: $Enums.RoomRole;
    joinedAt?: Date | string;
    lastReadAt?: Date | string | null;
    lastReadMessageId?: string | null;
    room: RoomCreateNestedOneWithoutMembersInput;
    user: UserCreateNestedOneWithoutMembershipsInput;
  };

  export type RoomMemberUncheckedCreateInput = {
    roomId: string;
    userId: string;
    role?: $Enums.RoomRole;
    joinedAt?: Date | string;
    lastReadAt?: Date | string | null;
    lastReadMessageId?: string | null;
  };

  export type RoomMemberUpdateInput = {
    role?: EnumRoomRoleFieldUpdateOperationsInput | $Enums.RoomRole;
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    lastReadAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    lastReadMessageId?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    room?: RoomUpdateOneRequiredWithoutMembersNestedInput;
    user?: UserUpdateOneRequiredWithoutMembershipsNestedInput;
  };

  export type RoomMemberUncheckedUpdateInput = {
    roomId?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    role?: EnumRoomRoleFieldUpdateOperationsInput | $Enums.RoomRole;
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    lastReadAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    lastReadMessageId?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
  };

  export type RoomMemberCreateManyInput = {
    roomId: string;
    userId: string;
    role?: $Enums.RoomRole;
    joinedAt?: Date | string;
    lastReadAt?: Date | string | null;
    lastReadMessageId?: string | null;
  };

  export type RoomMemberUpdateManyMutationInput = {
    role?: EnumRoomRoleFieldUpdateOperationsInput | $Enums.RoomRole;
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    lastReadAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    lastReadMessageId?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
  };

  export type RoomMemberUncheckedUpdateManyInput = {
    roomId?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    role?: EnumRoomRoleFieldUpdateOperationsInput | $Enums.RoomRole;
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    lastReadAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    lastReadMessageId?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
  };

  export type MessageCreateInput = {
    id?: string;
    body: string;
    createdAt?: Date | string;
    room: RoomCreateNestedOneWithoutMessagesInput;
    user: UserCreateNestedOneWithoutMessagesInput;
    replyTo?: MessageCreateNestedOneWithoutRepliesInput;
    replies?: MessageCreateNestedManyWithoutReplyToInput;
    receipts?: MessageReceiptCreateNestedManyWithoutMessageInput;
    attachments?: AttachmentCreateNestedManyWithoutMessageInput;
  };

  export type MessageUncheckedCreateInput = {
    id?: string;
    roomId: string;
    userId: string;
    body: string;
    replyToId?: string | null;
    createdAt?: Date | string;
    replies?: MessageUncheckedCreateNestedManyWithoutReplyToInput;
    receipts?: MessageReceiptUncheckedCreateNestedManyWithoutMessageInput;
    attachments?: AttachmentUncheckedCreateNestedManyWithoutMessageInput;
  };

  export type MessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    body?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    room?: RoomUpdateOneRequiredWithoutMessagesNestedInput;
    user?: UserUpdateOneRequiredWithoutMessagesNestedInput;
    replyTo?: MessageUpdateOneWithoutRepliesNestedInput;
    replies?: MessageUpdateManyWithoutReplyToNestedInput;
    receipts?: MessageReceiptUpdateManyWithoutMessageNestedInput;
    attachments?: AttachmentUpdateManyWithoutMessageNestedInput;
  };

  export type MessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    roomId?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    body?: StringFieldUpdateOperationsInput | string;
    replyToId?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    replies?: MessageUncheckedUpdateManyWithoutReplyToNestedInput;
    receipts?: MessageReceiptUncheckedUpdateManyWithoutMessageNestedInput;
    attachments?: AttachmentUncheckedUpdateManyWithoutMessageNestedInput;
  };

  export type MessageCreateManyInput = {
    id?: string;
    roomId: string;
    userId: string;
    body: string;
    replyToId?: string | null;
    createdAt?: Date | string;
  };

  export type MessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    body?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type MessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    roomId?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    body?: StringFieldUpdateOperationsInput | string;
    replyToId?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AttachmentCreateInput = {
    id?: string;
    kind: $Enums.AttachmentKind;
    fileName: string;
    mimeType: string;
    sizeBytes: number;
    url: string;
    createdAt?: Date | string;
    room: RoomCreateNestedOneWithoutUploadsInput;
    message?: MessageCreateNestedOneWithoutAttachmentsInput;
    uploader: UserCreateNestedOneWithoutUploadsInput;
  };

  export type AttachmentUncheckedCreateInput = {
    id?: string;
    kind: $Enums.AttachmentKind;
    fileName: string;
    mimeType: string;
    sizeBytes: number;
    url: string;
    createdAt?: Date | string;
    roomId: string;
    messageId?: string | null;
    uploaderId: string;
  };

  export type AttachmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    kind?: EnumAttachmentKindFieldUpdateOperationsInput | $Enums.AttachmentKind;
    fileName?: StringFieldUpdateOperationsInput | string;
    mimeType?: StringFieldUpdateOperationsInput | string;
    sizeBytes?: IntFieldUpdateOperationsInput | number;
    url?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    room?: RoomUpdateOneRequiredWithoutUploadsNestedInput;
    message?: MessageUpdateOneWithoutAttachmentsNestedInput;
    uploader?: UserUpdateOneRequiredWithoutUploadsNestedInput;
  };

  export type AttachmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    kind?: EnumAttachmentKindFieldUpdateOperationsInput | $Enums.AttachmentKind;
    fileName?: StringFieldUpdateOperationsInput | string;
    mimeType?: StringFieldUpdateOperationsInput | string;
    sizeBytes?: IntFieldUpdateOperationsInput | number;
    url?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    roomId?: StringFieldUpdateOperationsInput | string;
    messageId?: NullableStringFieldUpdateOperationsInput | string | null;
    uploaderId?: StringFieldUpdateOperationsInput | string;
  };

  export type AttachmentCreateManyInput = {
    id?: string;
    kind: $Enums.AttachmentKind;
    fileName: string;
    mimeType: string;
    sizeBytes: number;
    url: string;
    createdAt?: Date | string;
    roomId: string;
    messageId?: string | null;
    uploaderId: string;
  };

  export type AttachmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    kind?: EnumAttachmentKindFieldUpdateOperationsInput | $Enums.AttachmentKind;
    fileName?: StringFieldUpdateOperationsInput | string;
    mimeType?: StringFieldUpdateOperationsInput | string;
    sizeBytes?: IntFieldUpdateOperationsInput | number;
    url?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AttachmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    kind?: EnumAttachmentKindFieldUpdateOperationsInput | $Enums.AttachmentKind;
    fileName?: StringFieldUpdateOperationsInput | string;
    mimeType?: StringFieldUpdateOperationsInput | string;
    sizeBytes?: IntFieldUpdateOperationsInput | number;
    url?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    roomId?: StringFieldUpdateOperationsInput | string;
    messageId?: NullableStringFieldUpdateOperationsInput | string | null;
    uploaderId?: StringFieldUpdateOperationsInput | string;
  };

  export type MessageReceiptCreateInput = {
    status: $Enums.ReceiptStatus;
    at?: Date | string;
    message: MessageCreateNestedOneWithoutReceiptsInput;
    user: UserCreateNestedOneWithoutReceiptsInput;
  };

  export type MessageReceiptUncheckedCreateInput = {
    messageId: string;
    userId: string;
    status: $Enums.ReceiptStatus;
    at?: Date | string;
  };

  export type MessageReceiptUpdateInput = {
    status?: EnumReceiptStatusFieldUpdateOperationsInput | $Enums.ReceiptStatus;
    at?: DateTimeFieldUpdateOperationsInput | Date | string;
    message?: MessageUpdateOneRequiredWithoutReceiptsNestedInput;
    user?: UserUpdateOneRequiredWithoutReceiptsNestedInput;
  };

  export type MessageReceiptUncheckedUpdateInput = {
    messageId?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    status?: EnumReceiptStatusFieldUpdateOperationsInput | $Enums.ReceiptStatus;
    at?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type MessageReceiptCreateManyInput = {
    messageId: string;
    userId: string;
    status: $Enums.ReceiptStatus;
    at?: Date | string;
  };

  export type MessageReceiptUpdateManyMutationInput = {
    status?: EnumReceiptStatusFieldUpdateOperationsInput | $Enums.ReceiptStatus;
    at?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type MessageReceiptUncheckedUpdateManyInput = {
    messageId?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    status?: EnumReceiptStatusFieldUpdateOperationsInput | $Enums.ReceiptStatus;
    at?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type RoomMemberListRelationFilter = {
    every?: RoomMemberWhereInput;
    some?: RoomMemberWhereInput;
    none?: RoomMemberWhereInput;
  };

  export type MessageListRelationFilter = {
    every?: MessageWhereInput;
    some?: MessageWhereInput;
    none?: MessageWhereInput;
  };

  export type MessageReceiptListRelationFilter = {
    every?: MessageReceiptWhereInput;
    some?: MessageReceiptWhereInput;
    none?: MessageReceiptWhereInput;
  };

  export type AttachmentListRelationFilter = {
    every?: AttachmentWhereInput;
    some?: AttachmentWhereInput;
    none?: AttachmentWhereInput;
  };

  export type SortOrderInput = {
    sort: SortOrder;
    nulls?: NullsOrder;
  };

  export type RoomMemberOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type MessageOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type MessageReceiptOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type AttachmentOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder;
    email?: SortOrder;
    name?: SortOrder;
    passwordHash?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder;
    email?: SortOrder;
    name?: SortOrder;
    passwordHash?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder;
    email?: SortOrder;
    name?: SortOrder;
    passwordHash?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?:
      | NestedStringNullableWithAggregatesFilter<$PrismaModel>
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type EnumRoomTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.RoomType | EnumRoomTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.RoomType[] | ListEnumRoomTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RoomType[] | ListEnumRoomTypeFieldRefInput<$PrismaModel>;
    not?: NestedEnumRoomTypeFilter<$PrismaModel> | $Enums.RoomType;
  };

  export type RoomCountOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    type?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    directKey?: SortOrder;
  };

  export type RoomMaxOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    type?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    directKey?: SortOrder;
  };

  export type RoomMinOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    type?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    directKey?: SortOrder;
  };

  export type EnumRoomTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RoomType | EnumRoomTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.RoomType[] | ListEnumRoomTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RoomType[] | ListEnumRoomTypeFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumRoomTypeWithAggregatesFilter<$PrismaModel>
      | $Enums.RoomType;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumRoomTypeFilter<$PrismaModel>;
    _max?: NestedEnumRoomTypeFilter<$PrismaModel>;
  };

  export type EnumRoomRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.RoomRole | EnumRoomRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.RoomRole[] | ListEnumRoomRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RoomRole[] | ListEnumRoomRoleFieldRefInput<$PrismaModel>;
    not?: NestedEnumRoomRoleFilter<$PrismaModel> | $Enums.RoomRole;
  };

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
  };

  export type RoomScalarRelationFilter = {
    is?: RoomWhereInput;
    isNot?: RoomWhereInput;
  };

  export type UserScalarRelationFilter = {
    is?: UserWhereInput;
    isNot?: UserWhereInput;
  };

  export type RoomMemberRoomIdUserIdCompoundUniqueInput = {
    roomId: string;
    userId: string;
  };

  export type RoomMemberCountOrderByAggregateInput = {
    roomId?: SortOrder;
    userId?: SortOrder;
    role?: SortOrder;
    joinedAt?: SortOrder;
    lastReadAt?: SortOrder;
    lastReadMessageId?: SortOrder;
  };

  export type RoomMemberMaxOrderByAggregateInput = {
    roomId?: SortOrder;
    userId?: SortOrder;
    role?: SortOrder;
    joinedAt?: SortOrder;
    lastReadAt?: SortOrder;
    lastReadMessageId?: SortOrder;
  };

  export type RoomMemberMinOrderByAggregateInput = {
    roomId?: SortOrder;
    userId?: SortOrder;
    role?: SortOrder;
    joinedAt?: SortOrder;
    lastReadAt?: SortOrder;
    lastReadMessageId?: SortOrder;
  };

  export type EnumRoomRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RoomRole | EnumRoomRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.RoomRole[] | ListEnumRoomRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RoomRole[] | ListEnumRoomRoleFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumRoomRoleWithAggregatesFilter<$PrismaModel>
      | $Enums.RoomRole;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumRoomRoleFilter<$PrismaModel>;
    _max?: NestedEnumRoomRoleFilter<$PrismaModel>;
  };

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?:
      | NestedDateTimeNullableWithAggregatesFilter<$PrismaModel>
      | Date
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: NestedDateTimeNullableFilter<$PrismaModel>;
  };

  export type MessageNullableScalarRelationFilter = {
    is?: MessageWhereInput | null;
    isNot?: MessageWhereInput | null;
  };

  export type MessageCountOrderByAggregateInput = {
    id?: SortOrder;
    roomId?: SortOrder;
    userId?: SortOrder;
    body?: SortOrder;
    replyToId?: SortOrder;
    createdAt?: SortOrder;
  };

  export type MessageMaxOrderByAggregateInput = {
    id?: SortOrder;
    roomId?: SortOrder;
    userId?: SortOrder;
    body?: SortOrder;
    replyToId?: SortOrder;
    createdAt?: SortOrder;
  };

  export type MessageMinOrderByAggregateInput = {
    id?: SortOrder;
    roomId?: SortOrder;
    userId?: SortOrder;
    body?: SortOrder;
    replyToId?: SortOrder;
    createdAt?: SortOrder;
  };

  export type EnumAttachmentKindFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.AttachmentKind
      | EnumAttachmentKindFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.AttachmentKind[]
      | ListEnumAttachmentKindFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.AttachmentKind[]
      | ListEnumAttachmentKindFieldRefInput<$PrismaModel>;
    not?: NestedEnumAttachmentKindFilter<$PrismaModel> | $Enums.AttachmentKind;
  };

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type AttachmentCountOrderByAggregateInput = {
    id?: SortOrder;
    kind?: SortOrder;
    fileName?: SortOrder;
    mimeType?: SortOrder;
    sizeBytes?: SortOrder;
    url?: SortOrder;
    createdAt?: SortOrder;
    roomId?: SortOrder;
    messageId?: SortOrder;
    uploaderId?: SortOrder;
  };

  export type AttachmentAvgOrderByAggregateInput = {
    sizeBytes?: SortOrder;
  };

  export type AttachmentMaxOrderByAggregateInput = {
    id?: SortOrder;
    kind?: SortOrder;
    fileName?: SortOrder;
    mimeType?: SortOrder;
    sizeBytes?: SortOrder;
    url?: SortOrder;
    createdAt?: SortOrder;
    roomId?: SortOrder;
    messageId?: SortOrder;
    uploaderId?: SortOrder;
  };

  export type AttachmentMinOrderByAggregateInput = {
    id?: SortOrder;
    kind?: SortOrder;
    fileName?: SortOrder;
    mimeType?: SortOrder;
    sizeBytes?: SortOrder;
    url?: SortOrder;
    createdAt?: SortOrder;
    roomId?: SortOrder;
    messageId?: SortOrder;
    uploaderId?: SortOrder;
  };

  export type AttachmentSumOrderByAggregateInput = {
    sizeBytes?: SortOrder;
  };

  export type EnumAttachmentKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.AttachmentKind
      | EnumAttachmentKindFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.AttachmentKind[]
      | ListEnumAttachmentKindFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.AttachmentKind[]
      | ListEnumAttachmentKindFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumAttachmentKindWithAggregatesFilter<$PrismaModel>
      | $Enums.AttachmentKind;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumAttachmentKindFilter<$PrismaModel>;
    _max?: NestedEnumAttachmentKindFilter<$PrismaModel>;
  };

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type EnumReceiptStatusFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.ReceiptStatus
      | EnumReceiptStatusFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.ReceiptStatus[]
      | ListEnumReceiptStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.ReceiptStatus[]
      | ListEnumReceiptStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumReceiptStatusFilter<$PrismaModel> | $Enums.ReceiptStatus;
  };

  export type MessageScalarRelationFilter = {
    is?: MessageWhereInput;
    isNot?: MessageWhereInput;
  };

  export type MessageReceiptMessageIdUserIdStatusCompoundUniqueInput = {
    messageId: string;
    userId: string;
    status: $Enums.ReceiptStatus;
  };

  export type MessageReceiptCountOrderByAggregateInput = {
    messageId?: SortOrder;
    userId?: SortOrder;
    status?: SortOrder;
    at?: SortOrder;
  };

  export type MessageReceiptMaxOrderByAggregateInput = {
    messageId?: SortOrder;
    userId?: SortOrder;
    status?: SortOrder;
    at?: SortOrder;
  };

  export type MessageReceiptMinOrderByAggregateInput = {
    messageId?: SortOrder;
    userId?: SortOrder;
    status?: SortOrder;
    at?: SortOrder;
  };

  export type EnumReceiptStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.ReceiptStatus
      | EnumReceiptStatusFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.ReceiptStatus[]
      | ListEnumReceiptStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.ReceiptStatus[]
      | ListEnumReceiptStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumReceiptStatusWithAggregatesFilter<$PrismaModel>
      | $Enums.ReceiptStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumReceiptStatusFilter<$PrismaModel>;
    _max?: NestedEnumReceiptStatusFilter<$PrismaModel>;
  };

  export type RoomMemberCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          RoomMemberCreateWithoutUserInput,
          RoomMemberUncheckedCreateWithoutUserInput
        >
      | RoomMemberCreateWithoutUserInput[]
      | RoomMemberUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | RoomMemberCreateOrConnectWithoutUserInput
      | RoomMemberCreateOrConnectWithoutUserInput[];
    createMany?: RoomMemberCreateManyUserInputEnvelope;
    connect?: RoomMemberWhereUniqueInput | RoomMemberWhereUniqueInput[];
  };

  export type MessageCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          MessageCreateWithoutUserInput,
          MessageUncheckedCreateWithoutUserInput
        >
      | MessageCreateWithoutUserInput[]
      | MessageUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | MessageCreateOrConnectWithoutUserInput
      | MessageCreateOrConnectWithoutUserInput[];
    createMany?: MessageCreateManyUserInputEnvelope;
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
  };

  export type MessageReceiptCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          MessageReceiptCreateWithoutUserInput,
          MessageReceiptUncheckedCreateWithoutUserInput
        >
      | MessageReceiptCreateWithoutUserInput[]
      | MessageReceiptUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | MessageReceiptCreateOrConnectWithoutUserInput
      | MessageReceiptCreateOrConnectWithoutUserInput[];
    createMany?: MessageReceiptCreateManyUserInputEnvelope;
    connect?: MessageReceiptWhereUniqueInput | MessageReceiptWhereUniqueInput[];
  };

  export type AttachmentCreateNestedManyWithoutUploaderInput = {
    create?:
      | XOR<
          AttachmentCreateWithoutUploaderInput,
          AttachmentUncheckedCreateWithoutUploaderInput
        >
      | AttachmentCreateWithoutUploaderInput[]
      | AttachmentUncheckedCreateWithoutUploaderInput[];
    connectOrCreate?:
      | AttachmentCreateOrConnectWithoutUploaderInput
      | AttachmentCreateOrConnectWithoutUploaderInput[];
    createMany?: AttachmentCreateManyUploaderInputEnvelope;
    connect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[];
  };

  export type RoomMemberUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          RoomMemberCreateWithoutUserInput,
          RoomMemberUncheckedCreateWithoutUserInput
        >
      | RoomMemberCreateWithoutUserInput[]
      | RoomMemberUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | RoomMemberCreateOrConnectWithoutUserInput
      | RoomMemberCreateOrConnectWithoutUserInput[];
    createMany?: RoomMemberCreateManyUserInputEnvelope;
    connect?: RoomMemberWhereUniqueInput | RoomMemberWhereUniqueInput[];
  };

  export type MessageUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          MessageCreateWithoutUserInput,
          MessageUncheckedCreateWithoutUserInput
        >
      | MessageCreateWithoutUserInput[]
      | MessageUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | MessageCreateOrConnectWithoutUserInput
      | MessageCreateOrConnectWithoutUserInput[];
    createMany?: MessageCreateManyUserInputEnvelope;
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
  };

  export type MessageReceiptUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          MessageReceiptCreateWithoutUserInput,
          MessageReceiptUncheckedCreateWithoutUserInput
        >
      | MessageReceiptCreateWithoutUserInput[]
      | MessageReceiptUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | MessageReceiptCreateOrConnectWithoutUserInput
      | MessageReceiptCreateOrConnectWithoutUserInput[];
    createMany?: MessageReceiptCreateManyUserInputEnvelope;
    connect?: MessageReceiptWhereUniqueInput | MessageReceiptWhereUniqueInput[];
  };

  export type AttachmentUncheckedCreateNestedManyWithoutUploaderInput = {
    create?:
      | XOR<
          AttachmentCreateWithoutUploaderInput,
          AttachmentUncheckedCreateWithoutUploaderInput
        >
      | AttachmentCreateWithoutUploaderInput[]
      | AttachmentUncheckedCreateWithoutUploaderInput[];
    connectOrCreate?:
      | AttachmentCreateOrConnectWithoutUploaderInput
      | AttachmentCreateOrConnectWithoutUploaderInput[];
    createMany?: AttachmentCreateManyUploaderInputEnvelope;
    connect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[];
  };

  export type StringFieldUpdateOperationsInput = {
    set?: string;
  };

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
  };

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
  };

  export type RoomMemberUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          RoomMemberCreateWithoutUserInput,
          RoomMemberUncheckedCreateWithoutUserInput
        >
      | RoomMemberCreateWithoutUserInput[]
      | RoomMemberUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | RoomMemberCreateOrConnectWithoutUserInput
      | RoomMemberCreateOrConnectWithoutUserInput[];
    upsert?:
      | RoomMemberUpsertWithWhereUniqueWithoutUserInput
      | RoomMemberUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: RoomMemberCreateManyUserInputEnvelope;
    set?: RoomMemberWhereUniqueInput | RoomMemberWhereUniqueInput[];
    disconnect?: RoomMemberWhereUniqueInput | RoomMemberWhereUniqueInput[];
    delete?: RoomMemberWhereUniqueInput | RoomMemberWhereUniqueInput[];
    connect?: RoomMemberWhereUniqueInput | RoomMemberWhereUniqueInput[];
    update?:
      | RoomMemberUpdateWithWhereUniqueWithoutUserInput
      | RoomMemberUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | RoomMemberUpdateManyWithWhereWithoutUserInput
      | RoomMemberUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: RoomMemberScalarWhereInput | RoomMemberScalarWhereInput[];
  };

  export type MessageUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          MessageCreateWithoutUserInput,
          MessageUncheckedCreateWithoutUserInput
        >
      | MessageCreateWithoutUserInput[]
      | MessageUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | MessageCreateOrConnectWithoutUserInput
      | MessageCreateOrConnectWithoutUserInput[];
    upsert?:
      | MessageUpsertWithWhereUniqueWithoutUserInput
      | MessageUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: MessageCreateManyUserInputEnvelope;
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    update?:
      | MessageUpdateWithWhereUniqueWithoutUserInput
      | MessageUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | MessageUpdateManyWithWhereWithoutUserInput
      | MessageUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[];
  };

  export type MessageReceiptUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          MessageReceiptCreateWithoutUserInput,
          MessageReceiptUncheckedCreateWithoutUserInput
        >
      | MessageReceiptCreateWithoutUserInput[]
      | MessageReceiptUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | MessageReceiptCreateOrConnectWithoutUserInput
      | MessageReceiptCreateOrConnectWithoutUserInput[];
    upsert?:
      | MessageReceiptUpsertWithWhereUniqueWithoutUserInput
      | MessageReceiptUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: MessageReceiptCreateManyUserInputEnvelope;
    set?: MessageReceiptWhereUniqueInput | MessageReceiptWhereUniqueInput[];
    disconnect?:
      | MessageReceiptWhereUniqueInput
      | MessageReceiptWhereUniqueInput[];
    delete?: MessageReceiptWhereUniqueInput | MessageReceiptWhereUniqueInput[];
    connect?: MessageReceiptWhereUniqueInput | MessageReceiptWhereUniqueInput[];
    update?:
      | MessageReceiptUpdateWithWhereUniqueWithoutUserInput
      | MessageReceiptUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | MessageReceiptUpdateManyWithWhereWithoutUserInput
      | MessageReceiptUpdateManyWithWhereWithoutUserInput[];
    deleteMany?:
      | MessageReceiptScalarWhereInput
      | MessageReceiptScalarWhereInput[];
  };

  export type AttachmentUpdateManyWithoutUploaderNestedInput = {
    create?:
      | XOR<
          AttachmentCreateWithoutUploaderInput,
          AttachmentUncheckedCreateWithoutUploaderInput
        >
      | AttachmentCreateWithoutUploaderInput[]
      | AttachmentUncheckedCreateWithoutUploaderInput[];
    connectOrCreate?:
      | AttachmentCreateOrConnectWithoutUploaderInput
      | AttachmentCreateOrConnectWithoutUploaderInput[];
    upsert?:
      | AttachmentUpsertWithWhereUniqueWithoutUploaderInput
      | AttachmentUpsertWithWhereUniqueWithoutUploaderInput[];
    createMany?: AttachmentCreateManyUploaderInputEnvelope;
    set?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[];
    disconnect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[];
    delete?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[];
    connect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[];
    update?:
      | AttachmentUpdateWithWhereUniqueWithoutUploaderInput
      | AttachmentUpdateWithWhereUniqueWithoutUploaderInput[];
    updateMany?:
      | AttachmentUpdateManyWithWhereWithoutUploaderInput
      | AttachmentUpdateManyWithWhereWithoutUploaderInput[];
    deleteMany?: AttachmentScalarWhereInput | AttachmentScalarWhereInput[];
  };

  export type RoomMemberUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          RoomMemberCreateWithoutUserInput,
          RoomMemberUncheckedCreateWithoutUserInput
        >
      | RoomMemberCreateWithoutUserInput[]
      | RoomMemberUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | RoomMemberCreateOrConnectWithoutUserInput
      | RoomMemberCreateOrConnectWithoutUserInput[];
    upsert?:
      | RoomMemberUpsertWithWhereUniqueWithoutUserInput
      | RoomMemberUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: RoomMemberCreateManyUserInputEnvelope;
    set?: RoomMemberWhereUniqueInput | RoomMemberWhereUniqueInput[];
    disconnect?: RoomMemberWhereUniqueInput | RoomMemberWhereUniqueInput[];
    delete?: RoomMemberWhereUniqueInput | RoomMemberWhereUniqueInput[];
    connect?: RoomMemberWhereUniqueInput | RoomMemberWhereUniqueInput[];
    update?:
      | RoomMemberUpdateWithWhereUniqueWithoutUserInput
      | RoomMemberUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | RoomMemberUpdateManyWithWhereWithoutUserInput
      | RoomMemberUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: RoomMemberScalarWhereInput | RoomMemberScalarWhereInput[];
  };

  export type MessageUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          MessageCreateWithoutUserInput,
          MessageUncheckedCreateWithoutUserInput
        >
      | MessageCreateWithoutUserInput[]
      | MessageUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | MessageCreateOrConnectWithoutUserInput
      | MessageCreateOrConnectWithoutUserInput[];
    upsert?:
      | MessageUpsertWithWhereUniqueWithoutUserInput
      | MessageUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: MessageCreateManyUserInputEnvelope;
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    update?:
      | MessageUpdateWithWhereUniqueWithoutUserInput
      | MessageUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | MessageUpdateManyWithWhereWithoutUserInput
      | MessageUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[];
  };

  export type MessageReceiptUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          MessageReceiptCreateWithoutUserInput,
          MessageReceiptUncheckedCreateWithoutUserInput
        >
      | MessageReceiptCreateWithoutUserInput[]
      | MessageReceiptUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | MessageReceiptCreateOrConnectWithoutUserInput
      | MessageReceiptCreateOrConnectWithoutUserInput[];
    upsert?:
      | MessageReceiptUpsertWithWhereUniqueWithoutUserInput
      | MessageReceiptUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: MessageReceiptCreateManyUserInputEnvelope;
    set?: MessageReceiptWhereUniqueInput | MessageReceiptWhereUniqueInput[];
    disconnect?:
      | MessageReceiptWhereUniqueInput
      | MessageReceiptWhereUniqueInput[];
    delete?: MessageReceiptWhereUniqueInput | MessageReceiptWhereUniqueInput[];
    connect?: MessageReceiptWhereUniqueInput | MessageReceiptWhereUniqueInput[];
    update?:
      | MessageReceiptUpdateWithWhereUniqueWithoutUserInput
      | MessageReceiptUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | MessageReceiptUpdateManyWithWhereWithoutUserInput
      | MessageReceiptUpdateManyWithWhereWithoutUserInput[];
    deleteMany?:
      | MessageReceiptScalarWhereInput
      | MessageReceiptScalarWhereInput[];
  };

  export type AttachmentUncheckedUpdateManyWithoutUploaderNestedInput = {
    create?:
      | XOR<
          AttachmentCreateWithoutUploaderInput,
          AttachmentUncheckedCreateWithoutUploaderInput
        >
      | AttachmentCreateWithoutUploaderInput[]
      | AttachmentUncheckedCreateWithoutUploaderInput[];
    connectOrCreate?:
      | AttachmentCreateOrConnectWithoutUploaderInput
      | AttachmentCreateOrConnectWithoutUploaderInput[];
    upsert?:
      | AttachmentUpsertWithWhereUniqueWithoutUploaderInput
      | AttachmentUpsertWithWhereUniqueWithoutUploaderInput[];
    createMany?: AttachmentCreateManyUploaderInputEnvelope;
    set?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[];
    disconnect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[];
    delete?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[];
    connect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[];
    update?:
      | AttachmentUpdateWithWhereUniqueWithoutUploaderInput
      | AttachmentUpdateWithWhereUniqueWithoutUploaderInput[];
    updateMany?:
      | AttachmentUpdateManyWithWhereWithoutUploaderInput
      | AttachmentUpdateManyWithWhereWithoutUploaderInput[];
    deleteMany?: AttachmentScalarWhereInput | AttachmentScalarWhereInput[];
  };

  export type RoomMemberCreateNestedManyWithoutRoomInput = {
    create?:
      | XOR<
          RoomMemberCreateWithoutRoomInput,
          RoomMemberUncheckedCreateWithoutRoomInput
        >
      | RoomMemberCreateWithoutRoomInput[]
      | RoomMemberUncheckedCreateWithoutRoomInput[];
    connectOrCreate?:
      | RoomMemberCreateOrConnectWithoutRoomInput
      | RoomMemberCreateOrConnectWithoutRoomInput[];
    createMany?: RoomMemberCreateManyRoomInputEnvelope;
    connect?: RoomMemberWhereUniqueInput | RoomMemberWhereUniqueInput[];
  };

  export type MessageCreateNestedManyWithoutRoomInput = {
    create?:
      | XOR<
          MessageCreateWithoutRoomInput,
          MessageUncheckedCreateWithoutRoomInput
        >
      | MessageCreateWithoutRoomInput[]
      | MessageUncheckedCreateWithoutRoomInput[];
    connectOrCreate?:
      | MessageCreateOrConnectWithoutRoomInput
      | MessageCreateOrConnectWithoutRoomInput[];
    createMany?: MessageCreateManyRoomInputEnvelope;
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
  };

  export type AttachmentCreateNestedManyWithoutRoomInput = {
    create?:
      | XOR<
          AttachmentCreateWithoutRoomInput,
          AttachmentUncheckedCreateWithoutRoomInput
        >
      | AttachmentCreateWithoutRoomInput[]
      | AttachmentUncheckedCreateWithoutRoomInput[];
    connectOrCreate?:
      | AttachmentCreateOrConnectWithoutRoomInput
      | AttachmentCreateOrConnectWithoutRoomInput[];
    createMany?: AttachmentCreateManyRoomInputEnvelope;
    connect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[];
  };

  export type RoomMemberUncheckedCreateNestedManyWithoutRoomInput = {
    create?:
      | XOR<
          RoomMemberCreateWithoutRoomInput,
          RoomMemberUncheckedCreateWithoutRoomInput
        >
      | RoomMemberCreateWithoutRoomInput[]
      | RoomMemberUncheckedCreateWithoutRoomInput[];
    connectOrCreate?:
      | RoomMemberCreateOrConnectWithoutRoomInput
      | RoomMemberCreateOrConnectWithoutRoomInput[];
    createMany?: RoomMemberCreateManyRoomInputEnvelope;
    connect?: RoomMemberWhereUniqueInput | RoomMemberWhereUniqueInput[];
  };

  export type MessageUncheckedCreateNestedManyWithoutRoomInput = {
    create?:
      | XOR<
          MessageCreateWithoutRoomInput,
          MessageUncheckedCreateWithoutRoomInput
        >
      | MessageCreateWithoutRoomInput[]
      | MessageUncheckedCreateWithoutRoomInput[];
    connectOrCreate?:
      | MessageCreateOrConnectWithoutRoomInput
      | MessageCreateOrConnectWithoutRoomInput[];
    createMany?: MessageCreateManyRoomInputEnvelope;
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
  };

  export type AttachmentUncheckedCreateNestedManyWithoutRoomInput = {
    create?:
      | XOR<
          AttachmentCreateWithoutRoomInput,
          AttachmentUncheckedCreateWithoutRoomInput
        >
      | AttachmentCreateWithoutRoomInput[]
      | AttachmentUncheckedCreateWithoutRoomInput[];
    connectOrCreate?:
      | AttachmentCreateOrConnectWithoutRoomInput
      | AttachmentCreateOrConnectWithoutRoomInput[];
    createMany?: AttachmentCreateManyRoomInputEnvelope;
    connect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[];
  };

  export type EnumRoomTypeFieldUpdateOperationsInput = {
    set?: $Enums.RoomType;
  };

  export type RoomMemberUpdateManyWithoutRoomNestedInput = {
    create?:
      | XOR<
          RoomMemberCreateWithoutRoomInput,
          RoomMemberUncheckedCreateWithoutRoomInput
        >
      | RoomMemberCreateWithoutRoomInput[]
      | RoomMemberUncheckedCreateWithoutRoomInput[];
    connectOrCreate?:
      | RoomMemberCreateOrConnectWithoutRoomInput
      | RoomMemberCreateOrConnectWithoutRoomInput[];
    upsert?:
      | RoomMemberUpsertWithWhereUniqueWithoutRoomInput
      | RoomMemberUpsertWithWhereUniqueWithoutRoomInput[];
    createMany?: RoomMemberCreateManyRoomInputEnvelope;
    set?: RoomMemberWhereUniqueInput | RoomMemberWhereUniqueInput[];
    disconnect?: RoomMemberWhereUniqueInput | RoomMemberWhereUniqueInput[];
    delete?: RoomMemberWhereUniqueInput | RoomMemberWhereUniqueInput[];
    connect?: RoomMemberWhereUniqueInput | RoomMemberWhereUniqueInput[];
    update?:
      | RoomMemberUpdateWithWhereUniqueWithoutRoomInput
      | RoomMemberUpdateWithWhereUniqueWithoutRoomInput[];
    updateMany?:
      | RoomMemberUpdateManyWithWhereWithoutRoomInput
      | RoomMemberUpdateManyWithWhereWithoutRoomInput[];
    deleteMany?: RoomMemberScalarWhereInput | RoomMemberScalarWhereInput[];
  };

  export type MessageUpdateManyWithoutRoomNestedInput = {
    create?:
      | XOR<
          MessageCreateWithoutRoomInput,
          MessageUncheckedCreateWithoutRoomInput
        >
      | MessageCreateWithoutRoomInput[]
      | MessageUncheckedCreateWithoutRoomInput[];
    connectOrCreate?:
      | MessageCreateOrConnectWithoutRoomInput
      | MessageCreateOrConnectWithoutRoomInput[];
    upsert?:
      | MessageUpsertWithWhereUniqueWithoutRoomInput
      | MessageUpsertWithWhereUniqueWithoutRoomInput[];
    createMany?: MessageCreateManyRoomInputEnvelope;
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    update?:
      | MessageUpdateWithWhereUniqueWithoutRoomInput
      | MessageUpdateWithWhereUniqueWithoutRoomInput[];
    updateMany?:
      | MessageUpdateManyWithWhereWithoutRoomInput
      | MessageUpdateManyWithWhereWithoutRoomInput[];
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[];
  };

  export type AttachmentUpdateManyWithoutRoomNestedInput = {
    create?:
      | XOR<
          AttachmentCreateWithoutRoomInput,
          AttachmentUncheckedCreateWithoutRoomInput
        >
      | AttachmentCreateWithoutRoomInput[]
      | AttachmentUncheckedCreateWithoutRoomInput[];
    connectOrCreate?:
      | AttachmentCreateOrConnectWithoutRoomInput
      | AttachmentCreateOrConnectWithoutRoomInput[];
    upsert?:
      | AttachmentUpsertWithWhereUniqueWithoutRoomInput
      | AttachmentUpsertWithWhereUniqueWithoutRoomInput[];
    createMany?: AttachmentCreateManyRoomInputEnvelope;
    set?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[];
    disconnect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[];
    delete?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[];
    connect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[];
    update?:
      | AttachmentUpdateWithWhereUniqueWithoutRoomInput
      | AttachmentUpdateWithWhereUniqueWithoutRoomInput[];
    updateMany?:
      | AttachmentUpdateManyWithWhereWithoutRoomInput
      | AttachmentUpdateManyWithWhereWithoutRoomInput[];
    deleteMany?: AttachmentScalarWhereInput | AttachmentScalarWhereInput[];
  };

  export type RoomMemberUncheckedUpdateManyWithoutRoomNestedInput = {
    create?:
      | XOR<
          RoomMemberCreateWithoutRoomInput,
          RoomMemberUncheckedCreateWithoutRoomInput
        >
      | RoomMemberCreateWithoutRoomInput[]
      | RoomMemberUncheckedCreateWithoutRoomInput[];
    connectOrCreate?:
      | RoomMemberCreateOrConnectWithoutRoomInput
      | RoomMemberCreateOrConnectWithoutRoomInput[];
    upsert?:
      | RoomMemberUpsertWithWhereUniqueWithoutRoomInput
      | RoomMemberUpsertWithWhereUniqueWithoutRoomInput[];
    createMany?: RoomMemberCreateManyRoomInputEnvelope;
    set?: RoomMemberWhereUniqueInput | RoomMemberWhereUniqueInput[];
    disconnect?: RoomMemberWhereUniqueInput | RoomMemberWhereUniqueInput[];
    delete?: RoomMemberWhereUniqueInput | RoomMemberWhereUniqueInput[];
    connect?: RoomMemberWhereUniqueInput | RoomMemberWhereUniqueInput[];
    update?:
      | RoomMemberUpdateWithWhereUniqueWithoutRoomInput
      | RoomMemberUpdateWithWhereUniqueWithoutRoomInput[];
    updateMany?:
      | RoomMemberUpdateManyWithWhereWithoutRoomInput
      | RoomMemberUpdateManyWithWhereWithoutRoomInput[];
    deleteMany?: RoomMemberScalarWhereInput | RoomMemberScalarWhereInput[];
  };

  export type MessageUncheckedUpdateManyWithoutRoomNestedInput = {
    create?:
      | XOR<
          MessageCreateWithoutRoomInput,
          MessageUncheckedCreateWithoutRoomInput
        >
      | MessageCreateWithoutRoomInput[]
      | MessageUncheckedCreateWithoutRoomInput[];
    connectOrCreate?:
      | MessageCreateOrConnectWithoutRoomInput
      | MessageCreateOrConnectWithoutRoomInput[];
    upsert?:
      | MessageUpsertWithWhereUniqueWithoutRoomInput
      | MessageUpsertWithWhereUniqueWithoutRoomInput[];
    createMany?: MessageCreateManyRoomInputEnvelope;
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    update?:
      | MessageUpdateWithWhereUniqueWithoutRoomInput
      | MessageUpdateWithWhereUniqueWithoutRoomInput[];
    updateMany?:
      | MessageUpdateManyWithWhereWithoutRoomInput
      | MessageUpdateManyWithWhereWithoutRoomInput[];
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[];
  };

  export type AttachmentUncheckedUpdateManyWithoutRoomNestedInput = {
    create?:
      | XOR<
          AttachmentCreateWithoutRoomInput,
          AttachmentUncheckedCreateWithoutRoomInput
        >
      | AttachmentCreateWithoutRoomInput[]
      | AttachmentUncheckedCreateWithoutRoomInput[];
    connectOrCreate?:
      | AttachmentCreateOrConnectWithoutRoomInput
      | AttachmentCreateOrConnectWithoutRoomInput[];
    upsert?:
      | AttachmentUpsertWithWhereUniqueWithoutRoomInput
      | AttachmentUpsertWithWhereUniqueWithoutRoomInput[];
    createMany?: AttachmentCreateManyRoomInputEnvelope;
    set?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[];
    disconnect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[];
    delete?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[];
    connect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[];
    update?:
      | AttachmentUpdateWithWhereUniqueWithoutRoomInput
      | AttachmentUpdateWithWhereUniqueWithoutRoomInput[];
    updateMany?:
      | AttachmentUpdateManyWithWhereWithoutRoomInput
      | AttachmentUpdateManyWithWhereWithoutRoomInput[];
    deleteMany?: AttachmentScalarWhereInput | AttachmentScalarWhereInput[];
  };

  export type RoomCreateNestedOneWithoutMembersInput = {
    create?: XOR<
      RoomCreateWithoutMembersInput,
      RoomUncheckedCreateWithoutMembersInput
    >;
    connectOrCreate?: RoomCreateOrConnectWithoutMembersInput;
    connect?: RoomWhereUniqueInput;
  };

  export type UserCreateNestedOneWithoutMembershipsInput = {
    create?: XOR<
      UserCreateWithoutMembershipsInput,
      UserUncheckedCreateWithoutMembershipsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutMembershipsInput;
    connect?: UserWhereUniqueInput;
  };

  export type EnumRoomRoleFieldUpdateOperationsInput = {
    set?: $Enums.RoomRole;
  };

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
  };

  export type RoomUpdateOneRequiredWithoutMembersNestedInput = {
    create?: XOR<
      RoomCreateWithoutMembersInput,
      RoomUncheckedCreateWithoutMembersInput
    >;
    connectOrCreate?: RoomCreateOrConnectWithoutMembersInput;
    upsert?: RoomUpsertWithoutMembersInput;
    connect?: RoomWhereUniqueInput;
    update?: XOR<
      XOR<
        RoomUpdateToOneWithWhereWithoutMembersInput,
        RoomUpdateWithoutMembersInput
      >,
      RoomUncheckedUpdateWithoutMembersInput
    >;
  };

  export type UserUpdateOneRequiredWithoutMembershipsNestedInput = {
    create?: XOR<
      UserCreateWithoutMembershipsInput,
      UserUncheckedCreateWithoutMembershipsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutMembershipsInput;
    upsert?: UserUpsertWithoutMembershipsInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutMembershipsInput,
        UserUpdateWithoutMembershipsInput
      >,
      UserUncheckedUpdateWithoutMembershipsInput
    >;
  };

  export type RoomCreateNestedOneWithoutMessagesInput = {
    create?: XOR<
      RoomCreateWithoutMessagesInput,
      RoomUncheckedCreateWithoutMessagesInput
    >;
    connectOrCreate?: RoomCreateOrConnectWithoutMessagesInput;
    connect?: RoomWhereUniqueInput;
  };

  export type UserCreateNestedOneWithoutMessagesInput = {
    create?: XOR<
      UserCreateWithoutMessagesInput,
      UserUncheckedCreateWithoutMessagesInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutMessagesInput;
    connect?: UserWhereUniqueInput;
  };

  export type MessageCreateNestedOneWithoutRepliesInput = {
    create?: XOR<
      MessageCreateWithoutRepliesInput,
      MessageUncheckedCreateWithoutRepliesInput
    >;
    connectOrCreate?: MessageCreateOrConnectWithoutRepliesInput;
    connect?: MessageWhereUniqueInput;
  };

  export type MessageCreateNestedManyWithoutReplyToInput = {
    create?:
      | XOR<
          MessageCreateWithoutReplyToInput,
          MessageUncheckedCreateWithoutReplyToInput
        >
      | MessageCreateWithoutReplyToInput[]
      | MessageUncheckedCreateWithoutReplyToInput[];
    connectOrCreate?:
      | MessageCreateOrConnectWithoutReplyToInput
      | MessageCreateOrConnectWithoutReplyToInput[];
    createMany?: MessageCreateManyReplyToInputEnvelope;
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
  };

  export type MessageReceiptCreateNestedManyWithoutMessageInput = {
    create?:
      | XOR<
          MessageReceiptCreateWithoutMessageInput,
          MessageReceiptUncheckedCreateWithoutMessageInput
        >
      | MessageReceiptCreateWithoutMessageInput[]
      | MessageReceiptUncheckedCreateWithoutMessageInput[];
    connectOrCreate?:
      | MessageReceiptCreateOrConnectWithoutMessageInput
      | MessageReceiptCreateOrConnectWithoutMessageInput[];
    createMany?: MessageReceiptCreateManyMessageInputEnvelope;
    connect?: MessageReceiptWhereUniqueInput | MessageReceiptWhereUniqueInput[];
  };

  export type AttachmentCreateNestedManyWithoutMessageInput = {
    create?:
      | XOR<
          AttachmentCreateWithoutMessageInput,
          AttachmentUncheckedCreateWithoutMessageInput
        >
      | AttachmentCreateWithoutMessageInput[]
      | AttachmentUncheckedCreateWithoutMessageInput[];
    connectOrCreate?:
      | AttachmentCreateOrConnectWithoutMessageInput
      | AttachmentCreateOrConnectWithoutMessageInput[];
    createMany?: AttachmentCreateManyMessageInputEnvelope;
    connect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[];
  };

  export type MessageUncheckedCreateNestedManyWithoutReplyToInput = {
    create?:
      | XOR<
          MessageCreateWithoutReplyToInput,
          MessageUncheckedCreateWithoutReplyToInput
        >
      | MessageCreateWithoutReplyToInput[]
      | MessageUncheckedCreateWithoutReplyToInput[];
    connectOrCreate?:
      | MessageCreateOrConnectWithoutReplyToInput
      | MessageCreateOrConnectWithoutReplyToInput[];
    createMany?: MessageCreateManyReplyToInputEnvelope;
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
  };

  export type MessageReceiptUncheckedCreateNestedManyWithoutMessageInput = {
    create?:
      | XOR<
          MessageReceiptCreateWithoutMessageInput,
          MessageReceiptUncheckedCreateWithoutMessageInput
        >
      | MessageReceiptCreateWithoutMessageInput[]
      | MessageReceiptUncheckedCreateWithoutMessageInput[];
    connectOrCreate?:
      | MessageReceiptCreateOrConnectWithoutMessageInput
      | MessageReceiptCreateOrConnectWithoutMessageInput[];
    createMany?: MessageReceiptCreateManyMessageInputEnvelope;
    connect?: MessageReceiptWhereUniqueInput | MessageReceiptWhereUniqueInput[];
  };

  export type AttachmentUncheckedCreateNestedManyWithoutMessageInput = {
    create?:
      | XOR<
          AttachmentCreateWithoutMessageInput,
          AttachmentUncheckedCreateWithoutMessageInput
        >
      | AttachmentCreateWithoutMessageInput[]
      | AttachmentUncheckedCreateWithoutMessageInput[];
    connectOrCreate?:
      | AttachmentCreateOrConnectWithoutMessageInput
      | AttachmentCreateOrConnectWithoutMessageInput[];
    createMany?: AttachmentCreateManyMessageInputEnvelope;
    connect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[];
  };

  export type RoomUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<
      RoomCreateWithoutMessagesInput,
      RoomUncheckedCreateWithoutMessagesInput
    >;
    connectOrCreate?: RoomCreateOrConnectWithoutMessagesInput;
    upsert?: RoomUpsertWithoutMessagesInput;
    connect?: RoomWhereUniqueInput;
    update?: XOR<
      XOR<
        RoomUpdateToOneWithWhereWithoutMessagesInput,
        RoomUpdateWithoutMessagesInput
      >,
      RoomUncheckedUpdateWithoutMessagesInput
    >;
  };

  export type UserUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<
      UserCreateWithoutMessagesInput,
      UserUncheckedCreateWithoutMessagesInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutMessagesInput;
    upsert?: UserUpsertWithoutMessagesInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutMessagesInput,
        UserUpdateWithoutMessagesInput
      >,
      UserUncheckedUpdateWithoutMessagesInput
    >;
  };

  export type MessageUpdateOneWithoutRepliesNestedInput = {
    create?: XOR<
      MessageCreateWithoutRepliesInput,
      MessageUncheckedCreateWithoutRepliesInput
    >;
    connectOrCreate?: MessageCreateOrConnectWithoutRepliesInput;
    upsert?: MessageUpsertWithoutRepliesInput;
    disconnect?: MessageWhereInput | boolean;
    delete?: MessageWhereInput | boolean;
    connect?: MessageWhereUniqueInput;
    update?: XOR<
      XOR<
        MessageUpdateToOneWithWhereWithoutRepliesInput,
        MessageUpdateWithoutRepliesInput
      >,
      MessageUncheckedUpdateWithoutRepliesInput
    >;
  };

  export type MessageUpdateManyWithoutReplyToNestedInput = {
    create?:
      | XOR<
          MessageCreateWithoutReplyToInput,
          MessageUncheckedCreateWithoutReplyToInput
        >
      | MessageCreateWithoutReplyToInput[]
      | MessageUncheckedCreateWithoutReplyToInput[];
    connectOrCreate?:
      | MessageCreateOrConnectWithoutReplyToInput
      | MessageCreateOrConnectWithoutReplyToInput[];
    upsert?:
      | MessageUpsertWithWhereUniqueWithoutReplyToInput
      | MessageUpsertWithWhereUniqueWithoutReplyToInput[];
    createMany?: MessageCreateManyReplyToInputEnvelope;
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    update?:
      | MessageUpdateWithWhereUniqueWithoutReplyToInput
      | MessageUpdateWithWhereUniqueWithoutReplyToInput[];
    updateMany?:
      | MessageUpdateManyWithWhereWithoutReplyToInput
      | MessageUpdateManyWithWhereWithoutReplyToInput[];
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[];
  };

  export type MessageReceiptUpdateManyWithoutMessageNestedInput = {
    create?:
      | XOR<
          MessageReceiptCreateWithoutMessageInput,
          MessageReceiptUncheckedCreateWithoutMessageInput
        >
      | MessageReceiptCreateWithoutMessageInput[]
      | MessageReceiptUncheckedCreateWithoutMessageInput[];
    connectOrCreate?:
      | MessageReceiptCreateOrConnectWithoutMessageInput
      | MessageReceiptCreateOrConnectWithoutMessageInput[];
    upsert?:
      | MessageReceiptUpsertWithWhereUniqueWithoutMessageInput
      | MessageReceiptUpsertWithWhereUniqueWithoutMessageInput[];
    createMany?: MessageReceiptCreateManyMessageInputEnvelope;
    set?: MessageReceiptWhereUniqueInput | MessageReceiptWhereUniqueInput[];
    disconnect?:
      | MessageReceiptWhereUniqueInput
      | MessageReceiptWhereUniqueInput[];
    delete?: MessageReceiptWhereUniqueInput | MessageReceiptWhereUniqueInput[];
    connect?: MessageReceiptWhereUniqueInput | MessageReceiptWhereUniqueInput[];
    update?:
      | MessageReceiptUpdateWithWhereUniqueWithoutMessageInput
      | MessageReceiptUpdateWithWhereUniqueWithoutMessageInput[];
    updateMany?:
      | MessageReceiptUpdateManyWithWhereWithoutMessageInput
      | MessageReceiptUpdateManyWithWhereWithoutMessageInput[];
    deleteMany?:
      | MessageReceiptScalarWhereInput
      | MessageReceiptScalarWhereInput[];
  };

  export type AttachmentUpdateManyWithoutMessageNestedInput = {
    create?:
      | XOR<
          AttachmentCreateWithoutMessageInput,
          AttachmentUncheckedCreateWithoutMessageInput
        >
      | AttachmentCreateWithoutMessageInput[]
      | AttachmentUncheckedCreateWithoutMessageInput[];
    connectOrCreate?:
      | AttachmentCreateOrConnectWithoutMessageInput
      | AttachmentCreateOrConnectWithoutMessageInput[];
    upsert?:
      | AttachmentUpsertWithWhereUniqueWithoutMessageInput
      | AttachmentUpsertWithWhereUniqueWithoutMessageInput[];
    createMany?: AttachmentCreateManyMessageInputEnvelope;
    set?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[];
    disconnect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[];
    delete?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[];
    connect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[];
    update?:
      | AttachmentUpdateWithWhereUniqueWithoutMessageInput
      | AttachmentUpdateWithWhereUniqueWithoutMessageInput[];
    updateMany?:
      | AttachmentUpdateManyWithWhereWithoutMessageInput
      | AttachmentUpdateManyWithWhereWithoutMessageInput[];
    deleteMany?: AttachmentScalarWhereInput | AttachmentScalarWhereInput[];
  };

  export type MessageUncheckedUpdateManyWithoutReplyToNestedInput = {
    create?:
      | XOR<
          MessageCreateWithoutReplyToInput,
          MessageUncheckedCreateWithoutReplyToInput
        >
      | MessageCreateWithoutReplyToInput[]
      | MessageUncheckedCreateWithoutReplyToInput[];
    connectOrCreate?:
      | MessageCreateOrConnectWithoutReplyToInput
      | MessageCreateOrConnectWithoutReplyToInput[];
    upsert?:
      | MessageUpsertWithWhereUniqueWithoutReplyToInput
      | MessageUpsertWithWhereUniqueWithoutReplyToInput[];
    createMany?: MessageCreateManyReplyToInputEnvelope;
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    update?:
      | MessageUpdateWithWhereUniqueWithoutReplyToInput
      | MessageUpdateWithWhereUniqueWithoutReplyToInput[];
    updateMany?:
      | MessageUpdateManyWithWhereWithoutReplyToInput
      | MessageUpdateManyWithWhereWithoutReplyToInput[];
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[];
  };

  export type MessageReceiptUncheckedUpdateManyWithoutMessageNestedInput = {
    create?:
      | XOR<
          MessageReceiptCreateWithoutMessageInput,
          MessageReceiptUncheckedCreateWithoutMessageInput
        >
      | MessageReceiptCreateWithoutMessageInput[]
      | MessageReceiptUncheckedCreateWithoutMessageInput[];
    connectOrCreate?:
      | MessageReceiptCreateOrConnectWithoutMessageInput
      | MessageReceiptCreateOrConnectWithoutMessageInput[];
    upsert?:
      | MessageReceiptUpsertWithWhereUniqueWithoutMessageInput
      | MessageReceiptUpsertWithWhereUniqueWithoutMessageInput[];
    createMany?: MessageReceiptCreateManyMessageInputEnvelope;
    set?: MessageReceiptWhereUniqueInput | MessageReceiptWhereUniqueInput[];
    disconnect?:
      | MessageReceiptWhereUniqueInput
      | MessageReceiptWhereUniqueInput[];
    delete?: MessageReceiptWhereUniqueInput | MessageReceiptWhereUniqueInput[];
    connect?: MessageReceiptWhereUniqueInput | MessageReceiptWhereUniqueInput[];
    update?:
      | MessageReceiptUpdateWithWhereUniqueWithoutMessageInput
      | MessageReceiptUpdateWithWhereUniqueWithoutMessageInput[];
    updateMany?:
      | MessageReceiptUpdateManyWithWhereWithoutMessageInput
      | MessageReceiptUpdateManyWithWhereWithoutMessageInput[];
    deleteMany?:
      | MessageReceiptScalarWhereInput
      | MessageReceiptScalarWhereInput[];
  };

  export type AttachmentUncheckedUpdateManyWithoutMessageNestedInput = {
    create?:
      | XOR<
          AttachmentCreateWithoutMessageInput,
          AttachmentUncheckedCreateWithoutMessageInput
        >
      | AttachmentCreateWithoutMessageInput[]
      | AttachmentUncheckedCreateWithoutMessageInput[];
    connectOrCreate?:
      | AttachmentCreateOrConnectWithoutMessageInput
      | AttachmentCreateOrConnectWithoutMessageInput[];
    upsert?:
      | AttachmentUpsertWithWhereUniqueWithoutMessageInput
      | AttachmentUpsertWithWhereUniqueWithoutMessageInput[];
    createMany?: AttachmentCreateManyMessageInputEnvelope;
    set?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[];
    disconnect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[];
    delete?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[];
    connect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[];
    update?:
      | AttachmentUpdateWithWhereUniqueWithoutMessageInput
      | AttachmentUpdateWithWhereUniqueWithoutMessageInput[];
    updateMany?:
      | AttachmentUpdateManyWithWhereWithoutMessageInput
      | AttachmentUpdateManyWithWhereWithoutMessageInput[];
    deleteMany?: AttachmentScalarWhereInput | AttachmentScalarWhereInput[];
  };

  export type RoomCreateNestedOneWithoutUploadsInput = {
    create?: XOR<
      RoomCreateWithoutUploadsInput,
      RoomUncheckedCreateWithoutUploadsInput
    >;
    connectOrCreate?: RoomCreateOrConnectWithoutUploadsInput;
    connect?: RoomWhereUniqueInput;
  };

  export type MessageCreateNestedOneWithoutAttachmentsInput = {
    create?: XOR<
      MessageCreateWithoutAttachmentsInput,
      MessageUncheckedCreateWithoutAttachmentsInput
    >;
    connectOrCreate?: MessageCreateOrConnectWithoutAttachmentsInput;
    connect?: MessageWhereUniqueInput;
  };

  export type UserCreateNestedOneWithoutUploadsInput = {
    create?: XOR<
      UserCreateWithoutUploadsInput,
      UserUncheckedCreateWithoutUploadsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutUploadsInput;
    connect?: UserWhereUniqueInput;
  };

  export type EnumAttachmentKindFieldUpdateOperationsInput = {
    set?: $Enums.AttachmentKind;
  };

  export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type RoomUpdateOneRequiredWithoutUploadsNestedInput = {
    create?: XOR<
      RoomCreateWithoutUploadsInput,
      RoomUncheckedCreateWithoutUploadsInput
    >;
    connectOrCreate?: RoomCreateOrConnectWithoutUploadsInput;
    upsert?: RoomUpsertWithoutUploadsInput;
    connect?: RoomWhereUniqueInput;
    update?: XOR<
      XOR<
        RoomUpdateToOneWithWhereWithoutUploadsInput,
        RoomUpdateWithoutUploadsInput
      >,
      RoomUncheckedUpdateWithoutUploadsInput
    >;
  };

  export type MessageUpdateOneWithoutAttachmentsNestedInput = {
    create?: XOR<
      MessageCreateWithoutAttachmentsInput,
      MessageUncheckedCreateWithoutAttachmentsInput
    >;
    connectOrCreate?: MessageCreateOrConnectWithoutAttachmentsInput;
    upsert?: MessageUpsertWithoutAttachmentsInput;
    disconnect?: MessageWhereInput | boolean;
    delete?: MessageWhereInput | boolean;
    connect?: MessageWhereUniqueInput;
    update?: XOR<
      XOR<
        MessageUpdateToOneWithWhereWithoutAttachmentsInput,
        MessageUpdateWithoutAttachmentsInput
      >,
      MessageUncheckedUpdateWithoutAttachmentsInput
    >;
  };

  export type UserUpdateOneRequiredWithoutUploadsNestedInput = {
    create?: XOR<
      UserCreateWithoutUploadsInput,
      UserUncheckedCreateWithoutUploadsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutUploadsInput;
    upsert?: UserUpsertWithoutUploadsInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutUploadsInput,
        UserUpdateWithoutUploadsInput
      >,
      UserUncheckedUpdateWithoutUploadsInput
    >;
  };

  export type MessageCreateNestedOneWithoutReceiptsInput = {
    create?: XOR<
      MessageCreateWithoutReceiptsInput,
      MessageUncheckedCreateWithoutReceiptsInput
    >;
    connectOrCreate?: MessageCreateOrConnectWithoutReceiptsInput;
    connect?: MessageWhereUniqueInput;
  };

  export type UserCreateNestedOneWithoutReceiptsInput = {
    create?: XOR<
      UserCreateWithoutReceiptsInput,
      UserUncheckedCreateWithoutReceiptsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutReceiptsInput;
    connect?: UserWhereUniqueInput;
  };

  export type EnumReceiptStatusFieldUpdateOperationsInput = {
    set?: $Enums.ReceiptStatus;
  };

  export type MessageUpdateOneRequiredWithoutReceiptsNestedInput = {
    create?: XOR<
      MessageCreateWithoutReceiptsInput,
      MessageUncheckedCreateWithoutReceiptsInput
    >;
    connectOrCreate?: MessageCreateOrConnectWithoutReceiptsInput;
    upsert?: MessageUpsertWithoutReceiptsInput;
    connect?: MessageWhereUniqueInput;
    update?: XOR<
      XOR<
        MessageUpdateToOneWithWhereWithoutReceiptsInput,
        MessageUpdateWithoutReceiptsInput
      >,
      MessageUncheckedUpdateWithoutReceiptsInput
    >;
  };

  export type UserUpdateOneRequiredWithoutReceiptsNestedInput = {
    create?: XOR<
      UserCreateWithoutReceiptsInput,
      UserUncheckedCreateWithoutReceiptsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutReceiptsInput;
    upsert?: UserUpsertWithoutReceiptsInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutReceiptsInput,
        UserUpdateWithoutReceiptsInput
      >,
      UserUncheckedUpdateWithoutReceiptsInput
    >;
  };

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?:
      | NestedStringNullableWithAggregatesFilter<$PrismaModel>
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableFilter<$PrismaModel> | number | null;
  };

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type NestedEnumRoomTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.RoomType | EnumRoomTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.RoomType[] | ListEnumRoomTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RoomType[] | ListEnumRoomTypeFieldRefInput<$PrismaModel>;
    not?: NestedEnumRoomTypeFilter<$PrismaModel> | $Enums.RoomType;
  };

  export type NestedEnumRoomTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RoomType | EnumRoomTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.RoomType[] | ListEnumRoomTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RoomType[] | ListEnumRoomTypeFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumRoomTypeWithAggregatesFilter<$PrismaModel>
      | $Enums.RoomType;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumRoomTypeFilter<$PrismaModel>;
    _max?: NestedEnumRoomTypeFilter<$PrismaModel>;
  };

  export type NestedEnumRoomRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.RoomRole | EnumRoomRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.RoomRole[] | ListEnumRoomRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RoomRole[] | ListEnumRoomRoleFieldRefInput<$PrismaModel>;
    not?: NestedEnumRoomRoleFilter<$PrismaModel> | $Enums.RoomRole;
  };

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
  };

  export type NestedEnumRoomRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RoomRole | EnumRoomRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.RoomRole[] | ListEnumRoomRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RoomRole[] | ListEnumRoomRoleFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumRoomRoleWithAggregatesFilter<$PrismaModel>
      | $Enums.RoomRole;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumRoomRoleFilter<$PrismaModel>;
    _max?: NestedEnumRoomRoleFilter<$PrismaModel>;
  };

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> =
    {
      equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
      in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
      notIn?:
        | Date[]
        | string[]
        | ListDateTimeFieldRefInput<$PrismaModel>
        | null;
      lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      not?:
        | NestedDateTimeNullableWithAggregatesFilter<$PrismaModel>
        | Date
        | string
        | null;
      _count?: NestedIntNullableFilter<$PrismaModel>;
      _min?: NestedDateTimeNullableFilter<$PrismaModel>;
      _max?: NestedDateTimeNullableFilter<$PrismaModel>;
    };

  export type NestedEnumAttachmentKindFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.AttachmentKind
      | EnumAttachmentKindFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.AttachmentKind[]
      | ListEnumAttachmentKindFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.AttachmentKind[]
      | ListEnumAttachmentKindFieldRefInput<$PrismaModel>;
    not?: NestedEnumAttachmentKindFilter<$PrismaModel> | $Enums.AttachmentKind;
  };

  export type NestedEnumAttachmentKindWithAggregatesFilter<
    $PrismaModel = never,
  > = {
    equals?:
      | $Enums.AttachmentKind
      | EnumAttachmentKindFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.AttachmentKind[]
      | ListEnumAttachmentKindFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.AttachmentKind[]
      | ListEnumAttachmentKindFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumAttachmentKindWithAggregatesFilter<$PrismaModel>
      | $Enums.AttachmentKind;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumAttachmentKindFilter<$PrismaModel>;
    _max?: NestedEnumAttachmentKindFilter<$PrismaModel>;
  };

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatFilter<$PrismaModel> | number;
  };

  export type NestedEnumReceiptStatusFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.ReceiptStatus
      | EnumReceiptStatusFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.ReceiptStatus[]
      | ListEnumReceiptStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.ReceiptStatus[]
      | ListEnumReceiptStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumReceiptStatusFilter<$PrismaModel> | $Enums.ReceiptStatus;
  };

  export type NestedEnumReceiptStatusWithAggregatesFilter<
    $PrismaModel = never,
  > = {
    equals?:
      | $Enums.ReceiptStatus
      | EnumReceiptStatusFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.ReceiptStatus[]
      | ListEnumReceiptStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.ReceiptStatus[]
      | ListEnumReceiptStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumReceiptStatusWithAggregatesFilter<$PrismaModel>
      | $Enums.ReceiptStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumReceiptStatusFilter<$PrismaModel>;
    _max?: NestedEnumReceiptStatusFilter<$PrismaModel>;
  };

  export type RoomMemberCreateWithoutUserInput = {
    role?: $Enums.RoomRole;
    joinedAt?: Date | string;
    lastReadAt?: Date | string | null;
    lastReadMessageId?: string | null;
    room: RoomCreateNestedOneWithoutMembersInput;
  };

  export type RoomMemberUncheckedCreateWithoutUserInput = {
    roomId: string;
    role?: $Enums.RoomRole;
    joinedAt?: Date | string;
    lastReadAt?: Date | string | null;
    lastReadMessageId?: string | null;
  };

  export type RoomMemberCreateOrConnectWithoutUserInput = {
    where: RoomMemberWhereUniqueInput;
    create: XOR<
      RoomMemberCreateWithoutUserInput,
      RoomMemberUncheckedCreateWithoutUserInput
    >;
  };

  export type RoomMemberCreateManyUserInputEnvelope = {
    data: RoomMemberCreateManyUserInput | RoomMemberCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type MessageCreateWithoutUserInput = {
    id?: string;
    body: string;
    createdAt?: Date | string;
    room: RoomCreateNestedOneWithoutMessagesInput;
    replyTo?: MessageCreateNestedOneWithoutRepliesInput;
    replies?: MessageCreateNestedManyWithoutReplyToInput;
    receipts?: MessageReceiptCreateNestedManyWithoutMessageInput;
    attachments?: AttachmentCreateNestedManyWithoutMessageInput;
  };

  export type MessageUncheckedCreateWithoutUserInput = {
    id?: string;
    roomId: string;
    body: string;
    replyToId?: string | null;
    createdAt?: Date | string;
    replies?: MessageUncheckedCreateNestedManyWithoutReplyToInput;
    receipts?: MessageReceiptUncheckedCreateNestedManyWithoutMessageInput;
    attachments?: AttachmentUncheckedCreateNestedManyWithoutMessageInput;
  };

  export type MessageCreateOrConnectWithoutUserInput = {
    where: MessageWhereUniqueInput;
    create: XOR<
      MessageCreateWithoutUserInput,
      MessageUncheckedCreateWithoutUserInput
    >;
  };

  export type MessageCreateManyUserInputEnvelope = {
    data: MessageCreateManyUserInput | MessageCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type MessageReceiptCreateWithoutUserInput = {
    status: $Enums.ReceiptStatus;
    at?: Date | string;
    message: MessageCreateNestedOneWithoutReceiptsInput;
  };

  export type MessageReceiptUncheckedCreateWithoutUserInput = {
    messageId: string;
    status: $Enums.ReceiptStatus;
    at?: Date | string;
  };

  export type MessageReceiptCreateOrConnectWithoutUserInput = {
    where: MessageReceiptWhereUniqueInput;
    create: XOR<
      MessageReceiptCreateWithoutUserInput,
      MessageReceiptUncheckedCreateWithoutUserInput
    >;
  };

  export type MessageReceiptCreateManyUserInputEnvelope = {
    data:
      | MessageReceiptCreateManyUserInput
      | MessageReceiptCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type AttachmentCreateWithoutUploaderInput = {
    id?: string;
    kind: $Enums.AttachmentKind;
    fileName: string;
    mimeType: string;
    sizeBytes: number;
    url: string;
    createdAt?: Date | string;
    room: RoomCreateNestedOneWithoutUploadsInput;
    message?: MessageCreateNestedOneWithoutAttachmentsInput;
  };

  export type AttachmentUncheckedCreateWithoutUploaderInput = {
    id?: string;
    kind: $Enums.AttachmentKind;
    fileName: string;
    mimeType: string;
    sizeBytes: number;
    url: string;
    createdAt?: Date | string;
    roomId: string;
    messageId?: string | null;
  };

  export type AttachmentCreateOrConnectWithoutUploaderInput = {
    where: AttachmentWhereUniqueInput;
    create: XOR<
      AttachmentCreateWithoutUploaderInput,
      AttachmentUncheckedCreateWithoutUploaderInput
    >;
  };

  export type AttachmentCreateManyUploaderInputEnvelope = {
    data:
      | AttachmentCreateManyUploaderInput
      | AttachmentCreateManyUploaderInput[];
    skipDuplicates?: boolean;
  };

  export type RoomMemberUpsertWithWhereUniqueWithoutUserInput = {
    where: RoomMemberWhereUniqueInput;
    update: XOR<
      RoomMemberUpdateWithoutUserInput,
      RoomMemberUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      RoomMemberCreateWithoutUserInput,
      RoomMemberUncheckedCreateWithoutUserInput
    >;
  };

  export type RoomMemberUpdateWithWhereUniqueWithoutUserInput = {
    where: RoomMemberWhereUniqueInput;
    data: XOR<
      RoomMemberUpdateWithoutUserInput,
      RoomMemberUncheckedUpdateWithoutUserInput
    >;
  };

  export type RoomMemberUpdateManyWithWhereWithoutUserInput = {
    where: RoomMemberScalarWhereInput;
    data: XOR<
      RoomMemberUpdateManyMutationInput,
      RoomMemberUncheckedUpdateManyWithoutUserInput
    >;
  };

  export type RoomMemberScalarWhereInput = {
    AND?: RoomMemberScalarWhereInput | RoomMemberScalarWhereInput[];
    OR?: RoomMemberScalarWhereInput[];
    NOT?: RoomMemberScalarWhereInput | RoomMemberScalarWhereInput[];
    roomId?: StringFilter<'RoomMember'> | string;
    userId?: StringFilter<'RoomMember'> | string;
    role?: EnumRoomRoleFilter<'RoomMember'> | $Enums.RoomRole;
    joinedAt?: DateTimeFilter<'RoomMember'> | Date | string;
    lastReadAt?: DateTimeNullableFilter<'RoomMember'> | Date | string | null;
    lastReadMessageId?: StringNullableFilter<'RoomMember'> | string | null;
  };

  export type MessageUpsertWithWhereUniqueWithoutUserInput = {
    where: MessageWhereUniqueInput;
    update: XOR<
      MessageUpdateWithoutUserInput,
      MessageUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      MessageCreateWithoutUserInput,
      MessageUncheckedCreateWithoutUserInput
    >;
  };

  export type MessageUpdateWithWhereUniqueWithoutUserInput = {
    where: MessageWhereUniqueInput;
    data: XOR<
      MessageUpdateWithoutUserInput,
      MessageUncheckedUpdateWithoutUserInput
    >;
  };

  export type MessageUpdateManyWithWhereWithoutUserInput = {
    where: MessageScalarWhereInput;
    data: XOR<
      MessageUpdateManyMutationInput,
      MessageUncheckedUpdateManyWithoutUserInput
    >;
  };

  export type MessageScalarWhereInput = {
    AND?: MessageScalarWhereInput | MessageScalarWhereInput[];
    OR?: MessageScalarWhereInput[];
    NOT?: MessageScalarWhereInput | MessageScalarWhereInput[];
    id?: StringFilter<'Message'> | string;
    roomId?: StringFilter<'Message'> | string;
    userId?: StringFilter<'Message'> | string;
    body?: StringFilter<'Message'> | string;
    replyToId?: StringNullableFilter<'Message'> | string | null;
    createdAt?: DateTimeFilter<'Message'> | Date | string;
  };

  export type MessageReceiptUpsertWithWhereUniqueWithoutUserInput = {
    where: MessageReceiptWhereUniqueInput;
    update: XOR<
      MessageReceiptUpdateWithoutUserInput,
      MessageReceiptUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      MessageReceiptCreateWithoutUserInput,
      MessageReceiptUncheckedCreateWithoutUserInput
    >;
  };

  export type MessageReceiptUpdateWithWhereUniqueWithoutUserInput = {
    where: MessageReceiptWhereUniqueInput;
    data: XOR<
      MessageReceiptUpdateWithoutUserInput,
      MessageReceiptUncheckedUpdateWithoutUserInput
    >;
  };

  export type MessageReceiptUpdateManyWithWhereWithoutUserInput = {
    where: MessageReceiptScalarWhereInput;
    data: XOR<
      MessageReceiptUpdateManyMutationInput,
      MessageReceiptUncheckedUpdateManyWithoutUserInput
    >;
  };

  export type MessageReceiptScalarWhereInput = {
    AND?: MessageReceiptScalarWhereInput | MessageReceiptScalarWhereInput[];
    OR?: MessageReceiptScalarWhereInput[];
    NOT?: MessageReceiptScalarWhereInput | MessageReceiptScalarWhereInput[];
    messageId?: StringFilter<'MessageReceipt'> | string;
    userId?: StringFilter<'MessageReceipt'> | string;
    status?: EnumReceiptStatusFilter<'MessageReceipt'> | $Enums.ReceiptStatus;
    at?: DateTimeFilter<'MessageReceipt'> | Date | string;
  };

  export type AttachmentUpsertWithWhereUniqueWithoutUploaderInput = {
    where: AttachmentWhereUniqueInput;
    update: XOR<
      AttachmentUpdateWithoutUploaderInput,
      AttachmentUncheckedUpdateWithoutUploaderInput
    >;
    create: XOR<
      AttachmentCreateWithoutUploaderInput,
      AttachmentUncheckedCreateWithoutUploaderInput
    >;
  };

  export type AttachmentUpdateWithWhereUniqueWithoutUploaderInput = {
    where: AttachmentWhereUniqueInput;
    data: XOR<
      AttachmentUpdateWithoutUploaderInput,
      AttachmentUncheckedUpdateWithoutUploaderInput
    >;
  };

  export type AttachmentUpdateManyWithWhereWithoutUploaderInput = {
    where: AttachmentScalarWhereInput;
    data: XOR<
      AttachmentUpdateManyMutationInput,
      AttachmentUncheckedUpdateManyWithoutUploaderInput
    >;
  };

  export type AttachmentScalarWhereInput = {
    AND?: AttachmentScalarWhereInput | AttachmentScalarWhereInput[];
    OR?: AttachmentScalarWhereInput[];
    NOT?: AttachmentScalarWhereInput | AttachmentScalarWhereInput[];
    id?: StringFilter<'Attachment'> | string;
    kind?: EnumAttachmentKindFilter<'Attachment'> | $Enums.AttachmentKind;
    fileName?: StringFilter<'Attachment'> | string;
    mimeType?: StringFilter<'Attachment'> | string;
    sizeBytes?: IntFilter<'Attachment'> | number;
    url?: StringFilter<'Attachment'> | string;
    createdAt?: DateTimeFilter<'Attachment'> | Date | string;
    roomId?: StringFilter<'Attachment'> | string;
    messageId?: StringNullableFilter<'Attachment'> | string | null;
    uploaderId?: StringFilter<'Attachment'> | string;
  };

  export type RoomMemberCreateWithoutRoomInput = {
    role?: $Enums.RoomRole;
    joinedAt?: Date | string;
    lastReadAt?: Date | string | null;
    lastReadMessageId?: string | null;
    user: UserCreateNestedOneWithoutMembershipsInput;
  };

  export type RoomMemberUncheckedCreateWithoutRoomInput = {
    userId: string;
    role?: $Enums.RoomRole;
    joinedAt?: Date | string;
    lastReadAt?: Date | string | null;
    lastReadMessageId?: string | null;
  };

  export type RoomMemberCreateOrConnectWithoutRoomInput = {
    where: RoomMemberWhereUniqueInput;
    create: XOR<
      RoomMemberCreateWithoutRoomInput,
      RoomMemberUncheckedCreateWithoutRoomInput
    >;
  };

  export type RoomMemberCreateManyRoomInputEnvelope = {
    data: RoomMemberCreateManyRoomInput | RoomMemberCreateManyRoomInput[];
    skipDuplicates?: boolean;
  };

  export type MessageCreateWithoutRoomInput = {
    id?: string;
    body: string;
    createdAt?: Date | string;
    user: UserCreateNestedOneWithoutMessagesInput;
    replyTo?: MessageCreateNestedOneWithoutRepliesInput;
    replies?: MessageCreateNestedManyWithoutReplyToInput;
    receipts?: MessageReceiptCreateNestedManyWithoutMessageInput;
    attachments?: AttachmentCreateNestedManyWithoutMessageInput;
  };

  export type MessageUncheckedCreateWithoutRoomInput = {
    id?: string;
    userId: string;
    body: string;
    replyToId?: string | null;
    createdAt?: Date | string;
    replies?: MessageUncheckedCreateNestedManyWithoutReplyToInput;
    receipts?: MessageReceiptUncheckedCreateNestedManyWithoutMessageInput;
    attachments?: AttachmentUncheckedCreateNestedManyWithoutMessageInput;
  };

  export type MessageCreateOrConnectWithoutRoomInput = {
    where: MessageWhereUniqueInput;
    create: XOR<
      MessageCreateWithoutRoomInput,
      MessageUncheckedCreateWithoutRoomInput
    >;
  };

  export type MessageCreateManyRoomInputEnvelope = {
    data: MessageCreateManyRoomInput | MessageCreateManyRoomInput[];
    skipDuplicates?: boolean;
  };

  export type AttachmentCreateWithoutRoomInput = {
    id?: string;
    kind: $Enums.AttachmentKind;
    fileName: string;
    mimeType: string;
    sizeBytes: number;
    url: string;
    createdAt?: Date | string;
    message?: MessageCreateNestedOneWithoutAttachmentsInput;
    uploader: UserCreateNestedOneWithoutUploadsInput;
  };

  export type AttachmentUncheckedCreateWithoutRoomInput = {
    id?: string;
    kind: $Enums.AttachmentKind;
    fileName: string;
    mimeType: string;
    sizeBytes: number;
    url: string;
    createdAt?: Date | string;
    messageId?: string | null;
    uploaderId: string;
  };

  export type AttachmentCreateOrConnectWithoutRoomInput = {
    where: AttachmentWhereUniqueInput;
    create: XOR<
      AttachmentCreateWithoutRoomInput,
      AttachmentUncheckedCreateWithoutRoomInput
    >;
  };

  export type AttachmentCreateManyRoomInputEnvelope = {
    data: AttachmentCreateManyRoomInput | AttachmentCreateManyRoomInput[];
    skipDuplicates?: boolean;
  };

  export type RoomMemberUpsertWithWhereUniqueWithoutRoomInput = {
    where: RoomMemberWhereUniqueInput;
    update: XOR<
      RoomMemberUpdateWithoutRoomInput,
      RoomMemberUncheckedUpdateWithoutRoomInput
    >;
    create: XOR<
      RoomMemberCreateWithoutRoomInput,
      RoomMemberUncheckedCreateWithoutRoomInput
    >;
  };

  export type RoomMemberUpdateWithWhereUniqueWithoutRoomInput = {
    where: RoomMemberWhereUniqueInput;
    data: XOR<
      RoomMemberUpdateWithoutRoomInput,
      RoomMemberUncheckedUpdateWithoutRoomInput
    >;
  };

  export type RoomMemberUpdateManyWithWhereWithoutRoomInput = {
    where: RoomMemberScalarWhereInput;
    data: XOR<
      RoomMemberUpdateManyMutationInput,
      RoomMemberUncheckedUpdateManyWithoutRoomInput
    >;
  };

  export type MessageUpsertWithWhereUniqueWithoutRoomInput = {
    where: MessageWhereUniqueInput;
    update: XOR<
      MessageUpdateWithoutRoomInput,
      MessageUncheckedUpdateWithoutRoomInput
    >;
    create: XOR<
      MessageCreateWithoutRoomInput,
      MessageUncheckedCreateWithoutRoomInput
    >;
  };

  export type MessageUpdateWithWhereUniqueWithoutRoomInput = {
    where: MessageWhereUniqueInput;
    data: XOR<
      MessageUpdateWithoutRoomInput,
      MessageUncheckedUpdateWithoutRoomInput
    >;
  };

  export type MessageUpdateManyWithWhereWithoutRoomInput = {
    where: MessageScalarWhereInput;
    data: XOR<
      MessageUpdateManyMutationInput,
      MessageUncheckedUpdateManyWithoutRoomInput
    >;
  };

  export type AttachmentUpsertWithWhereUniqueWithoutRoomInput = {
    where: AttachmentWhereUniqueInput;
    update: XOR<
      AttachmentUpdateWithoutRoomInput,
      AttachmentUncheckedUpdateWithoutRoomInput
    >;
    create: XOR<
      AttachmentCreateWithoutRoomInput,
      AttachmentUncheckedCreateWithoutRoomInput
    >;
  };

  export type AttachmentUpdateWithWhereUniqueWithoutRoomInput = {
    where: AttachmentWhereUniqueInput;
    data: XOR<
      AttachmentUpdateWithoutRoomInput,
      AttachmentUncheckedUpdateWithoutRoomInput
    >;
  };

  export type AttachmentUpdateManyWithWhereWithoutRoomInput = {
    where: AttachmentScalarWhereInput;
    data: XOR<
      AttachmentUpdateManyMutationInput,
      AttachmentUncheckedUpdateManyWithoutRoomInput
    >;
  };

  export type RoomCreateWithoutMembersInput = {
    id?: string;
    name: string;
    type?: $Enums.RoomType;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    directKey?: string | null;
    messages?: MessageCreateNestedManyWithoutRoomInput;
    uploads?: AttachmentCreateNestedManyWithoutRoomInput;
  };

  export type RoomUncheckedCreateWithoutMembersInput = {
    id?: string;
    name: string;
    type?: $Enums.RoomType;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    directKey?: string | null;
    messages?: MessageUncheckedCreateNestedManyWithoutRoomInput;
    uploads?: AttachmentUncheckedCreateNestedManyWithoutRoomInput;
  };

  export type RoomCreateOrConnectWithoutMembersInput = {
    where: RoomWhereUniqueInput;
    create: XOR<
      RoomCreateWithoutMembersInput,
      RoomUncheckedCreateWithoutMembersInput
    >;
  };

  export type UserCreateWithoutMembershipsInput = {
    id?: string;
    email?: string | null;
    name: string;
    passwordHash?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    messages?: MessageCreateNestedManyWithoutUserInput;
    receipts?: MessageReceiptCreateNestedManyWithoutUserInput;
    uploads?: AttachmentCreateNestedManyWithoutUploaderInput;
  };

  export type UserUncheckedCreateWithoutMembershipsInput = {
    id?: string;
    email?: string | null;
    name: string;
    passwordHash?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    messages?: MessageUncheckedCreateNestedManyWithoutUserInput;
    receipts?: MessageReceiptUncheckedCreateNestedManyWithoutUserInput;
    uploads?: AttachmentUncheckedCreateNestedManyWithoutUploaderInput;
  };

  export type UserCreateOrConnectWithoutMembershipsInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutMembershipsInput,
      UserUncheckedCreateWithoutMembershipsInput
    >;
  };

  export type RoomUpsertWithoutMembersInput = {
    update: XOR<
      RoomUpdateWithoutMembersInput,
      RoomUncheckedUpdateWithoutMembersInput
    >;
    create: XOR<
      RoomCreateWithoutMembersInput,
      RoomUncheckedCreateWithoutMembersInput
    >;
    where?: RoomWhereInput;
  };

  export type RoomUpdateToOneWithWhereWithoutMembersInput = {
    where?: RoomWhereInput;
    data: XOR<
      RoomUpdateWithoutMembersInput,
      RoomUncheckedUpdateWithoutMembersInput
    >;
  };

  export type RoomUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    type?: EnumRoomTypeFieldUpdateOperationsInput | $Enums.RoomType;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    directKey?: NullableStringFieldUpdateOperationsInput | string | null;
    messages?: MessageUpdateManyWithoutRoomNestedInput;
    uploads?: AttachmentUpdateManyWithoutRoomNestedInput;
  };

  export type RoomUncheckedUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    type?: EnumRoomTypeFieldUpdateOperationsInput | $Enums.RoomType;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    directKey?: NullableStringFieldUpdateOperationsInput | string | null;
    messages?: MessageUncheckedUpdateManyWithoutRoomNestedInput;
    uploads?: AttachmentUncheckedUpdateManyWithoutRoomNestedInput;
  };

  export type UserUpsertWithoutMembershipsInput = {
    update: XOR<
      UserUpdateWithoutMembershipsInput,
      UserUncheckedUpdateWithoutMembershipsInput
    >;
    create: XOR<
      UserCreateWithoutMembershipsInput,
      UserUncheckedCreateWithoutMembershipsInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutMembershipsInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutMembershipsInput,
      UserUncheckedUpdateWithoutMembershipsInput
    >;
  };

  export type UserUpdateWithoutMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    name?: StringFieldUpdateOperationsInput | string;
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    messages?: MessageUpdateManyWithoutUserNestedInput;
    receipts?: MessageReceiptUpdateManyWithoutUserNestedInput;
    uploads?: AttachmentUpdateManyWithoutUploaderNestedInput;
  };

  export type UserUncheckedUpdateWithoutMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    name?: StringFieldUpdateOperationsInput | string;
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    messages?: MessageUncheckedUpdateManyWithoutUserNestedInput;
    receipts?: MessageReceiptUncheckedUpdateManyWithoutUserNestedInput;
    uploads?: AttachmentUncheckedUpdateManyWithoutUploaderNestedInput;
  };

  export type RoomCreateWithoutMessagesInput = {
    id?: string;
    name: string;
    type?: $Enums.RoomType;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    directKey?: string | null;
    members?: RoomMemberCreateNestedManyWithoutRoomInput;
    uploads?: AttachmentCreateNestedManyWithoutRoomInput;
  };

  export type RoomUncheckedCreateWithoutMessagesInput = {
    id?: string;
    name: string;
    type?: $Enums.RoomType;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    directKey?: string | null;
    members?: RoomMemberUncheckedCreateNestedManyWithoutRoomInput;
    uploads?: AttachmentUncheckedCreateNestedManyWithoutRoomInput;
  };

  export type RoomCreateOrConnectWithoutMessagesInput = {
    where: RoomWhereUniqueInput;
    create: XOR<
      RoomCreateWithoutMessagesInput,
      RoomUncheckedCreateWithoutMessagesInput
    >;
  };

  export type UserCreateWithoutMessagesInput = {
    id?: string;
    email?: string | null;
    name: string;
    passwordHash?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    memberships?: RoomMemberCreateNestedManyWithoutUserInput;
    receipts?: MessageReceiptCreateNestedManyWithoutUserInput;
    uploads?: AttachmentCreateNestedManyWithoutUploaderInput;
  };

  export type UserUncheckedCreateWithoutMessagesInput = {
    id?: string;
    email?: string | null;
    name: string;
    passwordHash?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    memberships?: RoomMemberUncheckedCreateNestedManyWithoutUserInput;
    receipts?: MessageReceiptUncheckedCreateNestedManyWithoutUserInput;
    uploads?: AttachmentUncheckedCreateNestedManyWithoutUploaderInput;
  };

  export type UserCreateOrConnectWithoutMessagesInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutMessagesInput,
      UserUncheckedCreateWithoutMessagesInput
    >;
  };

  export type MessageCreateWithoutRepliesInput = {
    id?: string;
    body: string;
    createdAt?: Date | string;
    room: RoomCreateNestedOneWithoutMessagesInput;
    user: UserCreateNestedOneWithoutMessagesInput;
    replyTo?: MessageCreateNestedOneWithoutRepliesInput;
    receipts?: MessageReceiptCreateNestedManyWithoutMessageInput;
    attachments?: AttachmentCreateNestedManyWithoutMessageInput;
  };

  export type MessageUncheckedCreateWithoutRepliesInput = {
    id?: string;
    roomId: string;
    userId: string;
    body: string;
    replyToId?: string | null;
    createdAt?: Date | string;
    receipts?: MessageReceiptUncheckedCreateNestedManyWithoutMessageInput;
    attachments?: AttachmentUncheckedCreateNestedManyWithoutMessageInput;
  };

  export type MessageCreateOrConnectWithoutRepliesInput = {
    where: MessageWhereUniqueInput;
    create: XOR<
      MessageCreateWithoutRepliesInput,
      MessageUncheckedCreateWithoutRepliesInput
    >;
  };

  export type MessageCreateWithoutReplyToInput = {
    id?: string;
    body: string;
    createdAt?: Date | string;
    room: RoomCreateNestedOneWithoutMessagesInput;
    user: UserCreateNestedOneWithoutMessagesInput;
    replies?: MessageCreateNestedManyWithoutReplyToInput;
    receipts?: MessageReceiptCreateNestedManyWithoutMessageInput;
    attachments?: AttachmentCreateNestedManyWithoutMessageInput;
  };

  export type MessageUncheckedCreateWithoutReplyToInput = {
    id?: string;
    roomId: string;
    userId: string;
    body: string;
    createdAt?: Date | string;
    replies?: MessageUncheckedCreateNestedManyWithoutReplyToInput;
    receipts?: MessageReceiptUncheckedCreateNestedManyWithoutMessageInput;
    attachments?: AttachmentUncheckedCreateNestedManyWithoutMessageInput;
  };

  export type MessageCreateOrConnectWithoutReplyToInput = {
    where: MessageWhereUniqueInput;
    create: XOR<
      MessageCreateWithoutReplyToInput,
      MessageUncheckedCreateWithoutReplyToInput
    >;
  };

  export type MessageCreateManyReplyToInputEnvelope = {
    data: MessageCreateManyReplyToInput | MessageCreateManyReplyToInput[];
    skipDuplicates?: boolean;
  };

  export type MessageReceiptCreateWithoutMessageInput = {
    status: $Enums.ReceiptStatus;
    at?: Date | string;
    user: UserCreateNestedOneWithoutReceiptsInput;
  };

  export type MessageReceiptUncheckedCreateWithoutMessageInput = {
    userId: string;
    status: $Enums.ReceiptStatus;
    at?: Date | string;
  };

  export type MessageReceiptCreateOrConnectWithoutMessageInput = {
    where: MessageReceiptWhereUniqueInput;
    create: XOR<
      MessageReceiptCreateWithoutMessageInput,
      MessageReceiptUncheckedCreateWithoutMessageInput
    >;
  };

  export type MessageReceiptCreateManyMessageInputEnvelope = {
    data:
      | MessageReceiptCreateManyMessageInput
      | MessageReceiptCreateManyMessageInput[];
    skipDuplicates?: boolean;
  };

  export type AttachmentCreateWithoutMessageInput = {
    id?: string;
    kind: $Enums.AttachmentKind;
    fileName: string;
    mimeType: string;
    sizeBytes: number;
    url: string;
    createdAt?: Date | string;
    room: RoomCreateNestedOneWithoutUploadsInput;
    uploader: UserCreateNestedOneWithoutUploadsInput;
  };

  export type AttachmentUncheckedCreateWithoutMessageInput = {
    id?: string;
    kind: $Enums.AttachmentKind;
    fileName: string;
    mimeType: string;
    sizeBytes: number;
    url: string;
    createdAt?: Date | string;
    roomId: string;
    uploaderId: string;
  };

  export type AttachmentCreateOrConnectWithoutMessageInput = {
    where: AttachmentWhereUniqueInput;
    create: XOR<
      AttachmentCreateWithoutMessageInput,
      AttachmentUncheckedCreateWithoutMessageInput
    >;
  };

  export type AttachmentCreateManyMessageInputEnvelope = {
    data: AttachmentCreateManyMessageInput | AttachmentCreateManyMessageInput[];
    skipDuplicates?: boolean;
  };

  export type RoomUpsertWithoutMessagesInput = {
    update: XOR<
      RoomUpdateWithoutMessagesInput,
      RoomUncheckedUpdateWithoutMessagesInput
    >;
    create: XOR<
      RoomCreateWithoutMessagesInput,
      RoomUncheckedCreateWithoutMessagesInput
    >;
    where?: RoomWhereInput;
  };

  export type RoomUpdateToOneWithWhereWithoutMessagesInput = {
    where?: RoomWhereInput;
    data: XOR<
      RoomUpdateWithoutMessagesInput,
      RoomUncheckedUpdateWithoutMessagesInput
    >;
  };

  export type RoomUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    type?: EnumRoomTypeFieldUpdateOperationsInput | $Enums.RoomType;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    directKey?: NullableStringFieldUpdateOperationsInput | string | null;
    members?: RoomMemberUpdateManyWithoutRoomNestedInput;
    uploads?: AttachmentUpdateManyWithoutRoomNestedInput;
  };

  export type RoomUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    type?: EnumRoomTypeFieldUpdateOperationsInput | $Enums.RoomType;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    directKey?: NullableStringFieldUpdateOperationsInput | string | null;
    members?: RoomMemberUncheckedUpdateManyWithoutRoomNestedInput;
    uploads?: AttachmentUncheckedUpdateManyWithoutRoomNestedInput;
  };

  export type UserUpsertWithoutMessagesInput = {
    update: XOR<
      UserUpdateWithoutMessagesInput,
      UserUncheckedUpdateWithoutMessagesInput
    >;
    create: XOR<
      UserCreateWithoutMessagesInput,
      UserUncheckedCreateWithoutMessagesInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutMessagesInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutMessagesInput,
      UserUncheckedUpdateWithoutMessagesInput
    >;
  };

  export type UserUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    name?: StringFieldUpdateOperationsInput | string;
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    memberships?: RoomMemberUpdateManyWithoutUserNestedInput;
    receipts?: MessageReceiptUpdateManyWithoutUserNestedInput;
    uploads?: AttachmentUpdateManyWithoutUploaderNestedInput;
  };

  export type UserUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    name?: StringFieldUpdateOperationsInput | string;
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    memberships?: RoomMemberUncheckedUpdateManyWithoutUserNestedInput;
    receipts?: MessageReceiptUncheckedUpdateManyWithoutUserNestedInput;
    uploads?: AttachmentUncheckedUpdateManyWithoutUploaderNestedInput;
  };

  export type MessageUpsertWithoutRepliesInput = {
    update: XOR<
      MessageUpdateWithoutRepliesInput,
      MessageUncheckedUpdateWithoutRepliesInput
    >;
    create: XOR<
      MessageCreateWithoutRepliesInput,
      MessageUncheckedCreateWithoutRepliesInput
    >;
    where?: MessageWhereInput;
  };

  export type MessageUpdateToOneWithWhereWithoutRepliesInput = {
    where?: MessageWhereInput;
    data: XOR<
      MessageUpdateWithoutRepliesInput,
      MessageUncheckedUpdateWithoutRepliesInput
    >;
  };

  export type MessageUpdateWithoutRepliesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    body?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    room?: RoomUpdateOneRequiredWithoutMessagesNestedInput;
    user?: UserUpdateOneRequiredWithoutMessagesNestedInput;
    replyTo?: MessageUpdateOneWithoutRepliesNestedInput;
    receipts?: MessageReceiptUpdateManyWithoutMessageNestedInput;
    attachments?: AttachmentUpdateManyWithoutMessageNestedInput;
  };

  export type MessageUncheckedUpdateWithoutRepliesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    roomId?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    body?: StringFieldUpdateOperationsInput | string;
    replyToId?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    receipts?: MessageReceiptUncheckedUpdateManyWithoutMessageNestedInput;
    attachments?: AttachmentUncheckedUpdateManyWithoutMessageNestedInput;
  };

  export type MessageUpsertWithWhereUniqueWithoutReplyToInput = {
    where: MessageWhereUniqueInput;
    update: XOR<
      MessageUpdateWithoutReplyToInput,
      MessageUncheckedUpdateWithoutReplyToInput
    >;
    create: XOR<
      MessageCreateWithoutReplyToInput,
      MessageUncheckedCreateWithoutReplyToInput
    >;
  };

  export type MessageUpdateWithWhereUniqueWithoutReplyToInput = {
    where: MessageWhereUniqueInput;
    data: XOR<
      MessageUpdateWithoutReplyToInput,
      MessageUncheckedUpdateWithoutReplyToInput
    >;
  };

  export type MessageUpdateManyWithWhereWithoutReplyToInput = {
    where: MessageScalarWhereInput;
    data: XOR<
      MessageUpdateManyMutationInput,
      MessageUncheckedUpdateManyWithoutReplyToInput
    >;
  };

  export type MessageReceiptUpsertWithWhereUniqueWithoutMessageInput = {
    where: MessageReceiptWhereUniqueInput;
    update: XOR<
      MessageReceiptUpdateWithoutMessageInput,
      MessageReceiptUncheckedUpdateWithoutMessageInput
    >;
    create: XOR<
      MessageReceiptCreateWithoutMessageInput,
      MessageReceiptUncheckedCreateWithoutMessageInput
    >;
  };

  export type MessageReceiptUpdateWithWhereUniqueWithoutMessageInput = {
    where: MessageReceiptWhereUniqueInput;
    data: XOR<
      MessageReceiptUpdateWithoutMessageInput,
      MessageReceiptUncheckedUpdateWithoutMessageInput
    >;
  };

  export type MessageReceiptUpdateManyWithWhereWithoutMessageInput = {
    where: MessageReceiptScalarWhereInput;
    data: XOR<
      MessageReceiptUpdateManyMutationInput,
      MessageReceiptUncheckedUpdateManyWithoutMessageInput
    >;
  };

  export type AttachmentUpsertWithWhereUniqueWithoutMessageInput = {
    where: AttachmentWhereUniqueInput;
    update: XOR<
      AttachmentUpdateWithoutMessageInput,
      AttachmentUncheckedUpdateWithoutMessageInput
    >;
    create: XOR<
      AttachmentCreateWithoutMessageInput,
      AttachmentUncheckedCreateWithoutMessageInput
    >;
  };

  export type AttachmentUpdateWithWhereUniqueWithoutMessageInput = {
    where: AttachmentWhereUniqueInput;
    data: XOR<
      AttachmentUpdateWithoutMessageInput,
      AttachmentUncheckedUpdateWithoutMessageInput
    >;
  };

  export type AttachmentUpdateManyWithWhereWithoutMessageInput = {
    where: AttachmentScalarWhereInput;
    data: XOR<
      AttachmentUpdateManyMutationInput,
      AttachmentUncheckedUpdateManyWithoutMessageInput
    >;
  };

  export type RoomCreateWithoutUploadsInput = {
    id?: string;
    name: string;
    type?: $Enums.RoomType;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    directKey?: string | null;
    members?: RoomMemberCreateNestedManyWithoutRoomInput;
    messages?: MessageCreateNestedManyWithoutRoomInput;
  };

  export type RoomUncheckedCreateWithoutUploadsInput = {
    id?: string;
    name: string;
    type?: $Enums.RoomType;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    directKey?: string | null;
    members?: RoomMemberUncheckedCreateNestedManyWithoutRoomInput;
    messages?: MessageUncheckedCreateNestedManyWithoutRoomInput;
  };

  export type RoomCreateOrConnectWithoutUploadsInput = {
    where: RoomWhereUniqueInput;
    create: XOR<
      RoomCreateWithoutUploadsInput,
      RoomUncheckedCreateWithoutUploadsInput
    >;
  };

  export type MessageCreateWithoutAttachmentsInput = {
    id?: string;
    body: string;
    createdAt?: Date | string;
    room: RoomCreateNestedOneWithoutMessagesInput;
    user: UserCreateNestedOneWithoutMessagesInput;
    replyTo?: MessageCreateNestedOneWithoutRepliesInput;
    replies?: MessageCreateNestedManyWithoutReplyToInput;
    receipts?: MessageReceiptCreateNestedManyWithoutMessageInput;
  };

  export type MessageUncheckedCreateWithoutAttachmentsInput = {
    id?: string;
    roomId: string;
    userId: string;
    body: string;
    replyToId?: string | null;
    createdAt?: Date | string;
    replies?: MessageUncheckedCreateNestedManyWithoutReplyToInput;
    receipts?: MessageReceiptUncheckedCreateNestedManyWithoutMessageInput;
  };

  export type MessageCreateOrConnectWithoutAttachmentsInput = {
    where: MessageWhereUniqueInput;
    create: XOR<
      MessageCreateWithoutAttachmentsInput,
      MessageUncheckedCreateWithoutAttachmentsInput
    >;
  };

  export type UserCreateWithoutUploadsInput = {
    id?: string;
    email?: string | null;
    name: string;
    passwordHash?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    memberships?: RoomMemberCreateNestedManyWithoutUserInput;
    messages?: MessageCreateNestedManyWithoutUserInput;
    receipts?: MessageReceiptCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateWithoutUploadsInput = {
    id?: string;
    email?: string | null;
    name: string;
    passwordHash?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    memberships?: RoomMemberUncheckedCreateNestedManyWithoutUserInput;
    messages?: MessageUncheckedCreateNestedManyWithoutUserInput;
    receipts?: MessageReceiptUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserCreateOrConnectWithoutUploadsInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutUploadsInput,
      UserUncheckedCreateWithoutUploadsInput
    >;
  };

  export type RoomUpsertWithoutUploadsInput = {
    update: XOR<
      RoomUpdateWithoutUploadsInput,
      RoomUncheckedUpdateWithoutUploadsInput
    >;
    create: XOR<
      RoomCreateWithoutUploadsInput,
      RoomUncheckedCreateWithoutUploadsInput
    >;
    where?: RoomWhereInput;
  };

  export type RoomUpdateToOneWithWhereWithoutUploadsInput = {
    where?: RoomWhereInput;
    data: XOR<
      RoomUpdateWithoutUploadsInput,
      RoomUncheckedUpdateWithoutUploadsInput
    >;
  };

  export type RoomUpdateWithoutUploadsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    type?: EnumRoomTypeFieldUpdateOperationsInput | $Enums.RoomType;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    directKey?: NullableStringFieldUpdateOperationsInput | string | null;
    members?: RoomMemberUpdateManyWithoutRoomNestedInput;
    messages?: MessageUpdateManyWithoutRoomNestedInput;
  };

  export type RoomUncheckedUpdateWithoutUploadsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    type?: EnumRoomTypeFieldUpdateOperationsInput | $Enums.RoomType;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    directKey?: NullableStringFieldUpdateOperationsInput | string | null;
    members?: RoomMemberUncheckedUpdateManyWithoutRoomNestedInput;
    messages?: MessageUncheckedUpdateManyWithoutRoomNestedInput;
  };

  export type MessageUpsertWithoutAttachmentsInput = {
    update: XOR<
      MessageUpdateWithoutAttachmentsInput,
      MessageUncheckedUpdateWithoutAttachmentsInput
    >;
    create: XOR<
      MessageCreateWithoutAttachmentsInput,
      MessageUncheckedCreateWithoutAttachmentsInput
    >;
    where?: MessageWhereInput;
  };

  export type MessageUpdateToOneWithWhereWithoutAttachmentsInput = {
    where?: MessageWhereInput;
    data: XOR<
      MessageUpdateWithoutAttachmentsInput,
      MessageUncheckedUpdateWithoutAttachmentsInput
    >;
  };

  export type MessageUpdateWithoutAttachmentsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    body?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    room?: RoomUpdateOneRequiredWithoutMessagesNestedInput;
    user?: UserUpdateOneRequiredWithoutMessagesNestedInput;
    replyTo?: MessageUpdateOneWithoutRepliesNestedInput;
    replies?: MessageUpdateManyWithoutReplyToNestedInput;
    receipts?: MessageReceiptUpdateManyWithoutMessageNestedInput;
  };

  export type MessageUncheckedUpdateWithoutAttachmentsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    roomId?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    body?: StringFieldUpdateOperationsInput | string;
    replyToId?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    replies?: MessageUncheckedUpdateManyWithoutReplyToNestedInput;
    receipts?: MessageReceiptUncheckedUpdateManyWithoutMessageNestedInput;
  };

  export type UserUpsertWithoutUploadsInput = {
    update: XOR<
      UserUpdateWithoutUploadsInput,
      UserUncheckedUpdateWithoutUploadsInput
    >;
    create: XOR<
      UserCreateWithoutUploadsInput,
      UserUncheckedCreateWithoutUploadsInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutUploadsInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutUploadsInput,
      UserUncheckedUpdateWithoutUploadsInput
    >;
  };

  export type UserUpdateWithoutUploadsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    name?: StringFieldUpdateOperationsInput | string;
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    memberships?: RoomMemberUpdateManyWithoutUserNestedInput;
    messages?: MessageUpdateManyWithoutUserNestedInput;
    receipts?: MessageReceiptUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateWithoutUploadsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    name?: StringFieldUpdateOperationsInput | string;
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    memberships?: RoomMemberUncheckedUpdateManyWithoutUserNestedInput;
    messages?: MessageUncheckedUpdateManyWithoutUserNestedInput;
    receipts?: MessageReceiptUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type MessageCreateWithoutReceiptsInput = {
    id?: string;
    body: string;
    createdAt?: Date | string;
    room: RoomCreateNestedOneWithoutMessagesInput;
    user: UserCreateNestedOneWithoutMessagesInput;
    replyTo?: MessageCreateNestedOneWithoutRepliesInput;
    replies?: MessageCreateNestedManyWithoutReplyToInput;
    attachments?: AttachmentCreateNestedManyWithoutMessageInput;
  };

  export type MessageUncheckedCreateWithoutReceiptsInput = {
    id?: string;
    roomId: string;
    userId: string;
    body: string;
    replyToId?: string | null;
    createdAt?: Date | string;
    replies?: MessageUncheckedCreateNestedManyWithoutReplyToInput;
    attachments?: AttachmentUncheckedCreateNestedManyWithoutMessageInput;
  };

  export type MessageCreateOrConnectWithoutReceiptsInput = {
    where: MessageWhereUniqueInput;
    create: XOR<
      MessageCreateWithoutReceiptsInput,
      MessageUncheckedCreateWithoutReceiptsInput
    >;
  };

  export type UserCreateWithoutReceiptsInput = {
    id?: string;
    email?: string | null;
    name: string;
    passwordHash?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    memberships?: RoomMemberCreateNestedManyWithoutUserInput;
    messages?: MessageCreateNestedManyWithoutUserInput;
    uploads?: AttachmentCreateNestedManyWithoutUploaderInput;
  };

  export type UserUncheckedCreateWithoutReceiptsInput = {
    id?: string;
    email?: string | null;
    name: string;
    passwordHash?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    memberships?: RoomMemberUncheckedCreateNestedManyWithoutUserInput;
    messages?: MessageUncheckedCreateNestedManyWithoutUserInput;
    uploads?: AttachmentUncheckedCreateNestedManyWithoutUploaderInput;
  };

  export type UserCreateOrConnectWithoutReceiptsInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutReceiptsInput,
      UserUncheckedCreateWithoutReceiptsInput
    >;
  };

  export type MessageUpsertWithoutReceiptsInput = {
    update: XOR<
      MessageUpdateWithoutReceiptsInput,
      MessageUncheckedUpdateWithoutReceiptsInput
    >;
    create: XOR<
      MessageCreateWithoutReceiptsInput,
      MessageUncheckedCreateWithoutReceiptsInput
    >;
    where?: MessageWhereInput;
  };

  export type MessageUpdateToOneWithWhereWithoutReceiptsInput = {
    where?: MessageWhereInput;
    data: XOR<
      MessageUpdateWithoutReceiptsInput,
      MessageUncheckedUpdateWithoutReceiptsInput
    >;
  };

  export type MessageUpdateWithoutReceiptsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    body?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    room?: RoomUpdateOneRequiredWithoutMessagesNestedInput;
    user?: UserUpdateOneRequiredWithoutMessagesNestedInput;
    replyTo?: MessageUpdateOneWithoutRepliesNestedInput;
    replies?: MessageUpdateManyWithoutReplyToNestedInput;
    attachments?: AttachmentUpdateManyWithoutMessageNestedInput;
  };

  export type MessageUncheckedUpdateWithoutReceiptsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    roomId?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    body?: StringFieldUpdateOperationsInput | string;
    replyToId?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    replies?: MessageUncheckedUpdateManyWithoutReplyToNestedInput;
    attachments?: AttachmentUncheckedUpdateManyWithoutMessageNestedInput;
  };

  export type UserUpsertWithoutReceiptsInput = {
    update: XOR<
      UserUpdateWithoutReceiptsInput,
      UserUncheckedUpdateWithoutReceiptsInput
    >;
    create: XOR<
      UserCreateWithoutReceiptsInput,
      UserUncheckedCreateWithoutReceiptsInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutReceiptsInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutReceiptsInput,
      UserUncheckedUpdateWithoutReceiptsInput
    >;
  };

  export type UserUpdateWithoutReceiptsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    name?: StringFieldUpdateOperationsInput | string;
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    memberships?: RoomMemberUpdateManyWithoutUserNestedInput;
    messages?: MessageUpdateManyWithoutUserNestedInput;
    uploads?: AttachmentUpdateManyWithoutUploaderNestedInput;
  };

  export type UserUncheckedUpdateWithoutReceiptsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    name?: StringFieldUpdateOperationsInput | string;
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    memberships?: RoomMemberUncheckedUpdateManyWithoutUserNestedInput;
    messages?: MessageUncheckedUpdateManyWithoutUserNestedInput;
    uploads?: AttachmentUncheckedUpdateManyWithoutUploaderNestedInput;
  };

  export type RoomMemberCreateManyUserInput = {
    roomId: string;
    role?: $Enums.RoomRole;
    joinedAt?: Date | string;
    lastReadAt?: Date | string | null;
    lastReadMessageId?: string | null;
  };

  export type MessageCreateManyUserInput = {
    id?: string;
    roomId: string;
    body: string;
    replyToId?: string | null;
    createdAt?: Date | string;
  };

  export type MessageReceiptCreateManyUserInput = {
    messageId: string;
    status: $Enums.ReceiptStatus;
    at?: Date | string;
  };

  export type AttachmentCreateManyUploaderInput = {
    id?: string;
    kind: $Enums.AttachmentKind;
    fileName: string;
    mimeType: string;
    sizeBytes: number;
    url: string;
    createdAt?: Date | string;
    roomId: string;
    messageId?: string | null;
  };

  export type RoomMemberUpdateWithoutUserInput = {
    role?: EnumRoomRoleFieldUpdateOperationsInput | $Enums.RoomRole;
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    lastReadAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    lastReadMessageId?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    room?: RoomUpdateOneRequiredWithoutMembersNestedInput;
  };

  export type RoomMemberUncheckedUpdateWithoutUserInput = {
    roomId?: StringFieldUpdateOperationsInput | string;
    role?: EnumRoomRoleFieldUpdateOperationsInput | $Enums.RoomRole;
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    lastReadAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    lastReadMessageId?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
  };

  export type RoomMemberUncheckedUpdateManyWithoutUserInput = {
    roomId?: StringFieldUpdateOperationsInput | string;
    role?: EnumRoomRoleFieldUpdateOperationsInput | $Enums.RoomRole;
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    lastReadAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    lastReadMessageId?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
  };

  export type MessageUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    body?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    room?: RoomUpdateOneRequiredWithoutMessagesNestedInput;
    replyTo?: MessageUpdateOneWithoutRepliesNestedInput;
    replies?: MessageUpdateManyWithoutReplyToNestedInput;
    receipts?: MessageReceiptUpdateManyWithoutMessageNestedInput;
    attachments?: AttachmentUpdateManyWithoutMessageNestedInput;
  };

  export type MessageUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    roomId?: StringFieldUpdateOperationsInput | string;
    body?: StringFieldUpdateOperationsInput | string;
    replyToId?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    replies?: MessageUncheckedUpdateManyWithoutReplyToNestedInput;
    receipts?: MessageReceiptUncheckedUpdateManyWithoutMessageNestedInput;
    attachments?: AttachmentUncheckedUpdateManyWithoutMessageNestedInput;
  };

  export type MessageUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    roomId?: StringFieldUpdateOperationsInput | string;
    body?: StringFieldUpdateOperationsInput | string;
    replyToId?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type MessageReceiptUpdateWithoutUserInput = {
    status?: EnumReceiptStatusFieldUpdateOperationsInput | $Enums.ReceiptStatus;
    at?: DateTimeFieldUpdateOperationsInput | Date | string;
    message?: MessageUpdateOneRequiredWithoutReceiptsNestedInput;
  };

  export type MessageReceiptUncheckedUpdateWithoutUserInput = {
    messageId?: StringFieldUpdateOperationsInput | string;
    status?: EnumReceiptStatusFieldUpdateOperationsInput | $Enums.ReceiptStatus;
    at?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type MessageReceiptUncheckedUpdateManyWithoutUserInput = {
    messageId?: StringFieldUpdateOperationsInput | string;
    status?: EnumReceiptStatusFieldUpdateOperationsInput | $Enums.ReceiptStatus;
    at?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AttachmentUpdateWithoutUploaderInput = {
    id?: StringFieldUpdateOperationsInput | string;
    kind?: EnumAttachmentKindFieldUpdateOperationsInput | $Enums.AttachmentKind;
    fileName?: StringFieldUpdateOperationsInput | string;
    mimeType?: StringFieldUpdateOperationsInput | string;
    sizeBytes?: IntFieldUpdateOperationsInput | number;
    url?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    room?: RoomUpdateOneRequiredWithoutUploadsNestedInput;
    message?: MessageUpdateOneWithoutAttachmentsNestedInput;
  };

  export type AttachmentUncheckedUpdateWithoutUploaderInput = {
    id?: StringFieldUpdateOperationsInput | string;
    kind?: EnumAttachmentKindFieldUpdateOperationsInput | $Enums.AttachmentKind;
    fileName?: StringFieldUpdateOperationsInput | string;
    mimeType?: StringFieldUpdateOperationsInput | string;
    sizeBytes?: IntFieldUpdateOperationsInput | number;
    url?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    roomId?: StringFieldUpdateOperationsInput | string;
    messageId?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type AttachmentUncheckedUpdateManyWithoutUploaderInput = {
    id?: StringFieldUpdateOperationsInput | string;
    kind?: EnumAttachmentKindFieldUpdateOperationsInput | $Enums.AttachmentKind;
    fileName?: StringFieldUpdateOperationsInput | string;
    mimeType?: StringFieldUpdateOperationsInput | string;
    sizeBytes?: IntFieldUpdateOperationsInput | number;
    url?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    roomId?: StringFieldUpdateOperationsInput | string;
    messageId?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type RoomMemberCreateManyRoomInput = {
    userId: string;
    role?: $Enums.RoomRole;
    joinedAt?: Date | string;
    lastReadAt?: Date | string | null;
    lastReadMessageId?: string | null;
  };

  export type MessageCreateManyRoomInput = {
    id?: string;
    userId: string;
    body: string;
    replyToId?: string | null;
    createdAt?: Date | string;
  };

  export type AttachmentCreateManyRoomInput = {
    id?: string;
    kind: $Enums.AttachmentKind;
    fileName: string;
    mimeType: string;
    sizeBytes: number;
    url: string;
    createdAt?: Date | string;
    messageId?: string | null;
    uploaderId: string;
  };

  export type RoomMemberUpdateWithoutRoomInput = {
    role?: EnumRoomRoleFieldUpdateOperationsInput | $Enums.RoomRole;
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    lastReadAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    lastReadMessageId?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    user?: UserUpdateOneRequiredWithoutMembershipsNestedInput;
  };

  export type RoomMemberUncheckedUpdateWithoutRoomInput = {
    userId?: StringFieldUpdateOperationsInput | string;
    role?: EnumRoomRoleFieldUpdateOperationsInput | $Enums.RoomRole;
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    lastReadAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    lastReadMessageId?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
  };

  export type RoomMemberUncheckedUpdateManyWithoutRoomInput = {
    userId?: StringFieldUpdateOperationsInput | string;
    role?: EnumRoomRoleFieldUpdateOperationsInput | $Enums.RoomRole;
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    lastReadAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    lastReadMessageId?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
  };

  export type MessageUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string;
    body?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutMessagesNestedInput;
    replyTo?: MessageUpdateOneWithoutRepliesNestedInput;
    replies?: MessageUpdateManyWithoutReplyToNestedInput;
    receipts?: MessageReceiptUpdateManyWithoutMessageNestedInput;
    attachments?: AttachmentUpdateManyWithoutMessageNestedInput;
  };

  export type MessageUncheckedUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    body?: StringFieldUpdateOperationsInput | string;
    replyToId?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    replies?: MessageUncheckedUpdateManyWithoutReplyToNestedInput;
    receipts?: MessageReceiptUncheckedUpdateManyWithoutMessageNestedInput;
    attachments?: AttachmentUncheckedUpdateManyWithoutMessageNestedInput;
  };

  export type MessageUncheckedUpdateManyWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    body?: StringFieldUpdateOperationsInput | string;
    replyToId?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AttachmentUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string;
    kind?: EnumAttachmentKindFieldUpdateOperationsInput | $Enums.AttachmentKind;
    fileName?: StringFieldUpdateOperationsInput | string;
    mimeType?: StringFieldUpdateOperationsInput | string;
    sizeBytes?: IntFieldUpdateOperationsInput | number;
    url?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    message?: MessageUpdateOneWithoutAttachmentsNestedInput;
    uploader?: UserUpdateOneRequiredWithoutUploadsNestedInput;
  };

  export type AttachmentUncheckedUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string;
    kind?: EnumAttachmentKindFieldUpdateOperationsInput | $Enums.AttachmentKind;
    fileName?: StringFieldUpdateOperationsInput | string;
    mimeType?: StringFieldUpdateOperationsInput | string;
    sizeBytes?: IntFieldUpdateOperationsInput | number;
    url?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    messageId?: NullableStringFieldUpdateOperationsInput | string | null;
    uploaderId?: StringFieldUpdateOperationsInput | string;
  };

  export type AttachmentUncheckedUpdateManyWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string;
    kind?: EnumAttachmentKindFieldUpdateOperationsInput | $Enums.AttachmentKind;
    fileName?: StringFieldUpdateOperationsInput | string;
    mimeType?: StringFieldUpdateOperationsInput | string;
    sizeBytes?: IntFieldUpdateOperationsInput | number;
    url?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    messageId?: NullableStringFieldUpdateOperationsInput | string | null;
    uploaderId?: StringFieldUpdateOperationsInput | string;
  };

  export type MessageCreateManyReplyToInput = {
    id?: string;
    roomId: string;
    userId: string;
    body: string;
    createdAt?: Date | string;
  };

  export type MessageReceiptCreateManyMessageInput = {
    userId: string;
    status: $Enums.ReceiptStatus;
    at?: Date | string;
  };

  export type AttachmentCreateManyMessageInput = {
    id?: string;
    kind: $Enums.AttachmentKind;
    fileName: string;
    mimeType: string;
    sizeBytes: number;
    url: string;
    createdAt?: Date | string;
    roomId: string;
    uploaderId: string;
  };

  export type MessageUpdateWithoutReplyToInput = {
    id?: StringFieldUpdateOperationsInput | string;
    body?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    room?: RoomUpdateOneRequiredWithoutMessagesNestedInput;
    user?: UserUpdateOneRequiredWithoutMessagesNestedInput;
    replies?: MessageUpdateManyWithoutReplyToNestedInput;
    receipts?: MessageReceiptUpdateManyWithoutMessageNestedInput;
    attachments?: AttachmentUpdateManyWithoutMessageNestedInput;
  };

  export type MessageUncheckedUpdateWithoutReplyToInput = {
    id?: StringFieldUpdateOperationsInput | string;
    roomId?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    body?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    replies?: MessageUncheckedUpdateManyWithoutReplyToNestedInput;
    receipts?: MessageReceiptUncheckedUpdateManyWithoutMessageNestedInput;
    attachments?: AttachmentUncheckedUpdateManyWithoutMessageNestedInput;
  };

  export type MessageUncheckedUpdateManyWithoutReplyToInput = {
    id?: StringFieldUpdateOperationsInput | string;
    roomId?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    body?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type MessageReceiptUpdateWithoutMessageInput = {
    status?: EnumReceiptStatusFieldUpdateOperationsInput | $Enums.ReceiptStatus;
    at?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutReceiptsNestedInput;
  };

  export type MessageReceiptUncheckedUpdateWithoutMessageInput = {
    userId?: StringFieldUpdateOperationsInput | string;
    status?: EnumReceiptStatusFieldUpdateOperationsInput | $Enums.ReceiptStatus;
    at?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type MessageReceiptUncheckedUpdateManyWithoutMessageInput = {
    userId?: StringFieldUpdateOperationsInput | string;
    status?: EnumReceiptStatusFieldUpdateOperationsInput | $Enums.ReceiptStatus;
    at?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AttachmentUpdateWithoutMessageInput = {
    id?: StringFieldUpdateOperationsInput | string;
    kind?: EnumAttachmentKindFieldUpdateOperationsInput | $Enums.AttachmentKind;
    fileName?: StringFieldUpdateOperationsInput | string;
    mimeType?: StringFieldUpdateOperationsInput | string;
    sizeBytes?: IntFieldUpdateOperationsInput | number;
    url?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    room?: RoomUpdateOneRequiredWithoutUploadsNestedInput;
    uploader?: UserUpdateOneRequiredWithoutUploadsNestedInput;
  };

  export type AttachmentUncheckedUpdateWithoutMessageInput = {
    id?: StringFieldUpdateOperationsInput | string;
    kind?: EnumAttachmentKindFieldUpdateOperationsInput | $Enums.AttachmentKind;
    fileName?: StringFieldUpdateOperationsInput | string;
    mimeType?: StringFieldUpdateOperationsInput | string;
    sizeBytes?: IntFieldUpdateOperationsInput | number;
    url?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    roomId?: StringFieldUpdateOperationsInput | string;
    uploaderId?: StringFieldUpdateOperationsInput | string;
  };

  export type AttachmentUncheckedUpdateManyWithoutMessageInput = {
    id?: StringFieldUpdateOperationsInput | string;
    kind?: EnumAttachmentKindFieldUpdateOperationsInput | $Enums.AttachmentKind;
    fileName?: StringFieldUpdateOperationsInput | string;
    mimeType?: StringFieldUpdateOperationsInput | string;
    sizeBytes?: IntFieldUpdateOperationsInput | number;
    url?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    roomId?: StringFieldUpdateOperationsInput | string;
    uploaderId?: StringFieldUpdateOperationsInput | string;
  };

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number;
  };

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF;
}
