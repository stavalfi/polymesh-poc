/// <reference types="vite/client" />
declare module 'object-deep-contain' {
  export default function (bigObject: unknown, smallerObject: unknown): boolean
}

// The following code is a copy-paste from @types/jest and @types/testing-library__jest-dom
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/jest/index.d.ts
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/testing-library__jest-dom/index.d.ts
//
// Why: I could integrate yarn2,jest,typescript, but I failed to integrate @testing-library/jest-dom as well.
//      so this is a workaround.

declare var beforeAll: jest.Lifecycle
declare var beforeEach: jest.Lifecycle
declare var afterAll: jest.Lifecycle
declare var afterEach: jest.Lifecycle
declare var describe: jest.Describe
declare var fdescribe: jest.Describe
declare var xdescribe: jest.Describe
declare var it: jest.It
declare var fit: jest.It
declare var xit: jest.It
declare var test: jest.It
declare var xtest: jest.It

declare const expect: jest.Expect

type ExtractEachCallbackArgs<T extends ReadonlyArray<any>> = {
  1: [T[0]]
  2: [T[0], T[1]]
  3: [T[0], T[1], T[2]]
  4: [T[0], T[1], T[2], T[3]]
  5: [T[0], T[1], T[2], T[3], T[4]]
  6: [T[0], T[1], T[2], T[3], T[4], T[5]]
  7: [T[0], T[1], T[2], T[3], T[4], T[5], T[6]]
  8: [T[0], T[1], T[2], T[3], T[4], T[5], T[6], T[7]]
  9: [T[0], T[1], T[2], T[3], T[4], T[5], T[6], T[7], T[8]]
  10: [T[0], T[1], T[2], T[3], T[4], T[5], T[6], T[7], T[8], T[9]]
  fallback: Array<T extends ReadonlyArray<infer U> ? U : any>
}[T extends Readonly<[any]>
  ? 1
  : T extends Readonly<[any, any]>
  ? 2
  : T extends Readonly<[any, any, any]>
  ? 3
  : T extends Readonly<[any, any, any, any]>
  ? 4
  : T extends Readonly<[any, any, any, any, any]>
  ? 5
  : T extends Readonly<[any, any, any, any, any, any]>
  ? 6
  : T extends Readonly<[any, any, any, any, any, any, any]>
  ? 7
  : T extends Readonly<[any, any, any, any, any, any, any, any]>
  ? 8
  : T extends Readonly<[any, any, any, any, any, any, any, any, any]>
  ? 9
  : T extends Readonly<[any, any, any, any, any, any, any, any, any, any]>
  ? 10
  : 'fallback']

declare namespace jest {
  /**
   * Provides a way to add Jasmine-compatible matchers into your Jest context.
   */
  function addMatchers(matchers: jasmine.CustomMatcherFactories): typeof jest
  /**
   * Disables automatic mocking in the module loader.
   */
  function autoMockOff(): typeof jest
  /**
   * Enables automatic mocking in the module loader.
   */
  function autoMockOn(): typeof jest
  /**
   * Clears the mock.calls and mock.instances properties of all mocks.
   * Equivalent to calling .mockClear() on every mocked function.
   */
  function clearAllMocks(): typeof jest
  /**
   * Use the automatic mocking system to generate a mocked version of the given module.
   */
  // tslint:disable-next-line: no-unnecessary-generics
  function createMockFromModule<T>(moduleName: string): T
  /**
   * Resets the state of all mocks.
   * Equivalent to calling .mockReset() on every mocked function.
   */
  function resetAllMocks(): typeof jest
  /**
   * available since Jest 21.1.0
   * Restores all mocks back to their original value.
   * Equivalent to calling .mockRestore on every mocked function.
   * Beware that jest.restoreAllMocks() only works when mock was created with
   * jest.spyOn; other mocks will require you to manually restore them.
   */
  function restoreAllMocks(): typeof jest
  /**
   * Removes any pending timers from the timer system. If any timers have
   * been scheduled, they will be cleared and will never have the opportunity
   * to execute in the future.
   */
  function clearAllTimers(): typeof jest
  /**
   * Returns the number of fake timers still left to run.
   */
  function getTimerCount(): number
  /**
   * Set the current system time used by fake timers. Simulates a user
   * changing the system clock while your program is running. It affects the
   * current time but it does not in itself cause e.g. timers to fire; they
   * will fire exactly as they would have done without the call to
   * jest.setSystemTime().
   *
   * > Note: This function is only available when using modern fake timers
   * > implementation
   */
  function setSystemTime(now?: number | Date): void
  /**
   * When mocking time, Date.now() will also be mocked. If you for some
   * reason need access to the real current time, you can invoke this
   * function.
   *
   * > Note: This function is only available when using modern fake timers
   * > implementation
   */
  function getRealSystemTime(): number
  /**
   * Indicates that the module system should never return a mocked version
   * of the specified module, including all of the specificied module's dependencies.
   */
  function deepUnmock(moduleName: string): typeof jest
  /**
   * Disables automatic mocking in the module loader.
   */
  function disableAutomock(): typeof jest
  /**
   * Mocks a module with an auto-mocked version when it is being required.
   */
  function doMock(moduleName: string, factory?: () => unknown, options?: MockOptions): typeof jest
  /**
   * Indicates that the module system should never return a mocked version
   * of the specified module from require() (e.g. that it should always return the real module).
   */
  function dontMock(moduleName: string): typeof jest
  /**
   * Enables automatic mocking in the module loader.
   */
  function enableAutomock(): typeof jest
  /**
   * Creates a mock function. Optionally takes a mock implementation.
   */
  function fn(): Mock
  /**
   * Creates a mock function. Optionally takes a mock implementation.
   */
  function fn<T, Y extends any[]>(implementation?: (...args: Y) => T): Mock<T, Y>
  /**
   * (renamed to `createMockFromModule` in Jest 26.0.0+)
   * Use the automatic mocking system to generate a mocked version of the given module.
   */
  // tslint:disable-next-line: no-unnecessary-generics
  function genMockFromModule<T>(moduleName: string): T
  /**
   * Returns whether the given function is a mock function.
   */
  function isMockFunction(fn: any): fn is Mock
  /**
   * Mocks a module with an auto-mocked version when it is being required.
   */
  function mock(moduleName: string, factory?: () => unknown, options?: MockOptions): typeof jest
  /**
   * Returns the actual module instead of a mock, bypassing all checks on
   * whether the module should receive a mock implementation or not.
   */
  // tslint:disable-next-line: no-unnecessary-generics
  function requireActual<TModule extends {} = any>(moduleName: string): TModule
  /**
   * Returns a mock module instead of the actual module, bypassing all checks
   * on whether the module should be required normally or not.
   */
  // tslint:disable-next-line: no-unnecessary-generics
  function requireMock<TModule extends {} = any>(moduleName: string): TModule
  /**
   * Resets the module registry - the cache of all required modules. This is
   * useful to isolate modules where local state might conflict between tests.
   */
  function resetModuleRegistry(): typeof jest
  /**
   * Resets the module registry - the cache of all required modules. This is
   * useful to isolate modules where local state might conflict between tests.
   */
  function resetModules(): typeof jest
  /**
   * Creates a sandbox registry for the modules that are loaded inside the callback function..
   * This is useful to isolate specific modules for every test so that local module state doesn't conflict between tests.
   */
  function isolateModules(fn: () => void): typeof jest
  /**
   * Runs failed tests n-times until they pass or until the max number of retries is exhausted.
   * This only works with jest-circus!
   */
  function retryTimes(numRetries: number): typeof jest
  /**
   * Exhausts tasks queued by setImmediate().
   */
  function runAllImmediates(): typeof jest
  /**
   * Exhausts the micro-task queue (usually interfaced in node via process.nextTick).
   */
  function runAllTicks(): typeof jest
  /**
   * Exhausts the macro-task queue (i.e., all tasks queued by setTimeout() and setInterval()).
   */
  function runAllTimers(): typeof jest
  /**
   * Executes only the macro-tasks that are currently pending (i.e., only the
   * tasks that have been queued by setTimeout() or setInterval() up to this point).
   * If any of the currently pending macro-tasks schedule new macro-tasks,
   * those new tasks will not be executed by this call.
   */
  function runOnlyPendingTimers(): typeof jest
  /**
   * (renamed to `advanceTimersByTime` in Jest 21.3.0+) Executes only the macro
   * task queue (i.e. all tasks queued by setTimeout() or setInterval() and setImmediate()).
   */
  function runTimersToTime(msToRun: number): typeof jest
  /**
   * Advances all timers by msToRun milliseconds. All pending "macro-tasks" that have been
   * queued via setTimeout() or setInterval(), and would be executed within this timeframe
   * will be executed.
   */
  function advanceTimersByTime(msToRun: number): typeof jest
  /**
   * Advances all timers by the needed milliseconds so that only the next
   * timeouts/intervals will run. Optionally, you can provide steps, so it
   * will run steps amount of next timeouts/intervals.
   */
  function advanceTimersToNextTimer(step?: number): void
  /**
   * Explicitly supplies the mock object that the module system should return
   * for the specified module.
   */
  // tslint:disable-next-line: no-unnecessary-generics
  function setMock<T>(moduleName: string, moduleExports: T): typeof jest
  /**
   * Set the default timeout interval for tests and before/after hooks in milliseconds.
   * Note: The default timeout interval is 5 seconds if this method is not called.
   */
  function setTimeout(timeout: number): typeof jest
  /**
   * Creates a mock function similar to jest.fn but also tracks calls to `object[methodName]`
   *
   * Note: By default, jest.spyOn also calls the spied method. This is different behavior from most
   * other test libraries.
   *
   * @example
   *
   * const video = require('./video');
   *
   * test('plays video', () => {
   *   const spy = jest.spyOn(video, 'play');
   *   const isPlaying = video.play();
   *
   *   expect(spy).toHaveBeenCalled();
   *   expect(isPlaying).toBe(true);
   *
   *   spy.mockReset();
   *   spy.mockRestore();
   * });
   */
  function spyOn<T extends {}, M extends NonFunctionPropertyNames<Required<T>>>(
    object: T,
    method: M,
    accessType: 'get',
  ): SpyInstance<Required<T>[M], []>
  function spyOn<T extends {}, M extends NonFunctionPropertyNames<Required<T>>>(
    object: T,
    method: M,
    accessType: 'set',
  ): SpyInstance<void, [Required<T>[M]]>
  function spyOn<T extends {}, M extends FunctionPropertyNames<Required<T>>>(
    object: T,
    method: M,
  ): Required<T>[M] extends (...args: any[]) => any
    ? SpyInstance<ReturnType<Required<T>[M]>, ArgsType<Required<T>[M]>>
    : never
  function spyOn<T extends {}, M extends ConstructorPropertyNames<Required<T>>>(
    object: T,
    method: M,
  ): Required<T>[M] extends new (...args: any[]) => any
    ? SpyInstance<InstanceType<Required<T>[M]>, ConstructorArgsType<Required<T>[M]>>
    : never
  /**
   * Indicates that the module system should never return a mocked version of
   * the specified module from require() (e.g. that it should always return the real module).
   */
  function unmock(moduleName: string): typeof jest
  /**
   * Instructs Jest to use fake versions of the standard timer functions.
   */
  function useFakeTimers(implementation?: 'modern' | 'legacy'): typeof jest
  /**
   * Instructs Jest to use the real versions of the standard timer functions.
   */
  function useRealTimers(): typeof jest

  interface MockOptions {
    virtual?: boolean | undefined
  }

  type EmptyFunction = () => void
  type ArgsType<T> = T extends (...args: infer A) => any ? A : never
  type ConstructorArgsType<T> = T extends new (...args: infer A) => any ? A : never
  type RejectedValue<T> = T extends PromiseLike<any> ? any : never
  type ResolvedValue<T> = T extends PromiseLike<infer U> ? U | T : never
  // see https://github.com/Microsoft/TypeScript/issues/25215
  type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends (...args: any[]) => any ? never : K }[keyof T] &
    string
  type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never }[keyof T] & string
  type ConstructorPropertyNames<T> = { [K in keyof T]: T[K] extends new (...args: any[]) => any ? K : never }[keyof T] &
    string

  interface DoneCallback {
    (...args: any[]): any
    fail(error?: string | { message: string }): any
  }

  type ProvidesCallback = (cb: DoneCallback) => any

  type Lifecycle = (fn: ProvidesCallback, timeout?: number) => any

  interface FunctionLike {
    readonly name: string
  }

  interface Each {
    // Exclusively arrays.
    <T extends any[] | [any]>(cases: ReadonlyArray<T>): (
      name: string,
      fn: (...args: T) => any,
      timeout?: number,
    ) => void
    <T extends ReadonlyArray<any>>(cases: ReadonlyArray<T>): (
      name: string,
      fn: (...args: ExtractEachCallbackArgs<T>) => any,
      timeout?: number,
    ) => void
    // Not arrays.
    <T>(cases: ReadonlyArray<T>): (name: string, fn: (...args: T[]) => any, timeout?: number) => void
    (cases: ReadonlyArray<ReadonlyArray<any>>): (name: string, fn: (...args: any[]) => any, timeout?: number) => void
    (strings: TemplateStringsArray, ...placeholders: any[]): (
      name: string,
      fn: (arg: any) => any,
      timeout?: number,
    ) => void
  }

  /**
   * Creates a test closure
   */
  interface It {
    /**
     * Creates a test closure.
     *
     * @param name The name of your test
     * @param fn The function for your test
     * @param timeout The timeout for an async function test
     */
    (name: string, fn?: ProvidesCallback, timeout?: number): void
    /**
     * Only runs this test in the current file.
     */
    only: It
    /**
     * Skips running this test in the current file.
     */
    skip: It
    /**
     * Sketch out which tests to write in the future.
     */
    todo: It
    /**
     * Experimental and should be avoided.
     */
    concurrent: It
    /**
     * Use if you keep duplicating the same test with different data. `.each` allows you to write the
     * test once and pass data in.
     *
     * `.each` is available with two APIs:
     *
     * #### 1  `test.each(table)(name, fn)`
     *
     * - `table`: Array of Arrays with the arguments that are passed into the test fn for each row.
     * - `name`: String the title of the test block.
     * - `fn`: Function the test to be ran, this is the function that will receive the parameters in each row as function arguments.
     *
     *
     * #### 2  `test.each table(name, fn)`
     *
     * - `table`: Tagged Template Literal
     * - `name`: String the title of the test, use `$variable` to inject test data into the test title from the tagged template expressions.
     * - `fn`: Function the test to be ran, this is the function that will receive the test data object..
     *
     * @example
     *
     * // API 1
     * test.each([[1, 1, 2], [1, 2, 3], [2, 1, 3]])(
     *   '.add(%i, %i)',
     *   (a, b, expected) => {
     *     expect(a + b).toBe(expected);
     *   },
     * );
     *
     * // API 2
     * test.each`
     * a    | b    | expected
     * ${1} | ${1} | ${2}
     * ${1} | ${2} | ${3}
     * ${2} | ${1} | ${3}
     * `('returns $expected when $a is added $b', ({a, b, expected}) => {
     *    expect(a + b).toBe(expected);
     * });
     *
     */
    each: Each
  }

  interface Describe {
    // tslint:disable-next-line ban-types
    (name: number | string | Function | FunctionLike, fn: EmptyFunction): void
    /** Only runs the tests inside this `describe` for the current file */
    only: Describe
    /** Skips running the tests inside this `describe` for the current file */
    skip: Describe
    each: Each
  }

  type PrintLabel = (string: string) => string

  type MatcherHintColor = (arg: string) => string

  interface MatcherHintOptions {
    comment?: string | undefined
    expectedColor?: MatcherHintColor | undefined
    isDirectExpectCall?: boolean | undefined
    isNot?: boolean | undefined
    promise?: string | undefined
    receivedColor?: MatcherHintColor | undefined
    secondArgument?: string | undefined
    secondArgumentColor?: MatcherHintColor | undefined
  }

  interface ChalkFunction {
    (text: TemplateStringsArray, ...placeholders: any[]): string
    (...text: any[]): string
  }

  interface ChalkColorSupport {
    level: 0 | 1 | 2 | 3
    hasBasic: boolean
    has256: boolean
    has16m: boolean
  }

  type MatcherColorFn = ChalkFunction & { supportsColor: ChalkColorSupport }

  type EqualityTester = (a: any, b: any) => boolean | undefined

  interface MatcherUtils {
    readonly isNot: boolean
    readonly dontThrow: () => void
    readonly promise: string
    readonly assertionCalls: number
    readonly expectedAssertionsNumber: number | null
    readonly isExpectingAssertions: boolean
    readonly suppressedErrors: any[]
    readonly expand: boolean
    readonly testPath: string
    readonly currentTestName: string
    utils: {
      readonly EXPECTED_COLOR: MatcherColorFn
      readonly RECEIVED_COLOR: MatcherColorFn
      readonly INVERTED_COLOR: MatcherColorFn
      readonly BOLD_WEIGHT: MatcherColorFn
      readonly DIM_COLOR: MatcherColorFn
      readonly SUGGEST_TO_CONTAIN_EQUAL: string
      diff(a: any, b: any, options?: import('jest-diff').DiffOptions): string | null
      ensureActualIsNumber(actual: any, matcherName: string, options?: MatcherHintOptions): void
      ensureExpectedIsNumber(actual: any, matcherName: string, options?: MatcherHintOptions): void
      ensureNoExpected(actual: any, matcherName: string, options?: MatcherHintOptions): void
      ensureNumbers(actual: any, expected: any, matcherName: string, options?: MatcherHintOptions): void
      ensureExpectedIsNonNegativeInteger(expected: any, matcherName: string, options?: MatcherHintOptions): void
      matcherHint(matcherName: string, received?: string, expected?: string, options?: MatcherHintOptions): string
      matcherErrorMessage(hint: string, generic: string, specific: string): string
      pluralize(word: string, count: number): string
      printReceived(object: any): string
      printExpected(value: any): string
      printWithType(name: string, value: any, print: (value: any) => string): string
      stringify(object: {}, maxDepth?: number): string
      highlightTrailingWhitespace(text: string): string

      printDiffOrStringify(
        expected: any,
        received: any,
        expectedLabel: string,
        receivedLabel: string,
        expand: boolean,
      ): string

      getLabelPrinter(...strings: string[]): PrintLabel

      iterableEquality: EqualityTester
      subsetEquality: EqualityTester
    }
    /**
     *  This is a deep-equality function that will return true if two objects have the same values (recursively).
     */
    equals(a: any, b: any, customTesters?: EqualityTester[], strictCheck?: boolean): boolean
    [other: string]: any
  }

  interface ExpectExtendMap {
    [key: string]: CustomMatcher
  }

  type MatcherContext = MatcherUtils & Readonly<MatcherState>
  type CustomMatcher = (
    this: MatcherContext,
    received: any,
    ...actual: any[]
  ) => CustomMatcherResult | Promise<CustomMatcherResult>

  interface CustomMatcherResult {
    pass: boolean
    message: () => string
  }

  type SnapshotSerializerPlugin = import('pretty-format').Plugin

  interface InverseAsymmetricMatchers {
    /**
     * `expect.not.arrayContaining(array)` matches a received array which
     * does not contain all of the elements in the expected array. That is,
     * the expected array is not a subset of the received array. It is the
     * inverse of `expect.arrayContaining`.
     *
     * Optionally, you can provide a type for the elements via a generic.
     */
    // tslint:disable-next-line: no-unnecessary-generics
    arrayContaining<E = any>(arr: E[]): any
    /**
     * `expect.not.objectContaining(object)` matches any received object
     * that does not recursively match the expected properties. That is, the
     * expected object is not a subset of the received object. Therefore,
     * it matches a received object which contains properties that are not
     * in the expected object. It is the inverse of `expect.objectContaining`.
     *
     * Optionally, you can provide a type for the object via a generic.
     * This ensures that the object contains the desired structure.
     */
    // tslint:disable-next-line: no-unnecessary-generics
    objectContaining<E = {}>(obj: E): any
    /**
     * `expect.not.stringMatching(string | regexp)` matches the received
     * string that does not match the expected regexp. It is the inverse of
     * `expect.stringMatching`.
     */
    stringMatching(str: string | RegExp): any
    /**
     * `expect.not.stringContaining(string)` matches the received string
     * that does not contain the exact expected string. It is the inverse of
     * `expect.stringContaining`.
     */
    stringContaining(str: string): any
  }
  interface MatcherState {
    assertionCalls: number
    currentTestName: string
    expand: boolean
    expectedAssertionsNumber: number
    isExpectingAssertions?: boolean | undefined
    suppressedErrors: Error[]
    testPath: string
  }
  /**
   * The `expect` function is used every time you want to test a value.
   * You will rarely call `expect` by itself.
   */
  interface Expect {
    /**
     * The `expect` function is used every time you want to test a value.
     * You will rarely call `expect` by itself.
     *
     * @param actual The value to apply matchers against.
     */
    <T = any>(actual: T): JestMatchers<T>
    /**
     * Matches anything but null or undefined. You can use it inside `toEqual` or `toBeCalledWith` instead
     * of a literal value. For example, if you want to check that a mock function is called with a
     * non-null argument:
     *
     * @example
     *
     * test('map calls its argument with a non-null argument', () => {
     *   const mock = jest.fn();
     *   [1].map(x => mock(x));
     *   expect(mock).toBeCalledWith(expect.anything());
     * });
     *
     */
    anything(): any
    /**
     * Matches anything that was created with the given constructor.
     * You can use it inside `toEqual` or `toBeCalledWith` instead of a literal value.
     *
     * @example
     *
     * function randocall(fn) {
     *   return fn(Math.floor(Math.random() * 6 + 1));
     * }
     *
     * test('randocall calls its callback with a number', () => {
     *   const mock = jest.fn();
     *   randocall(mock);
     *   expect(mock).toBeCalledWith(expect.any(Number));
     * });
     */
    any(classType: any): any
    /**
     * Matches any array made up entirely of elements in the provided array.
     * You can use it inside `toEqual` or `toBeCalledWith` instead of a literal value.
     *
     * Optionally, you can provide a type for the elements via a generic.
     */
    // tslint:disable-next-line: no-unnecessary-generics
    arrayContaining<E = any>(arr: E[]): any
    /**
     * Verifies that a certain number of assertions are called during a test.
     * This is often useful when testing asynchronous code, in order to
     * make sure that assertions in a callback actually got called.
     */
    assertions(num: number): void
    /**
     * Verifies that at least one assertion is called during a test.
     * This is often useful when testing asynchronous code, in order to
     * make sure that assertions in a callback actually got called.
     */
    hasAssertions(): void
    /**
     * You can use `expect.extend` to add your own matchers to Jest.
     */
    extend(obj: ExpectExtendMap): void
    /**
     * Adds a module to format application-specific data structures for serialization.
     */
    addSnapshotSerializer(serializer: SnapshotSerializerPlugin): void
    /**
     * Matches any object that recursively matches the provided keys.
     * This is often handy in conjunction with other asymmetric matchers.
     *
     * Optionally, you can provide a type for the object via a generic.
     * This ensures that the object contains the desired structure.
     */
    // tslint:disable-next-line: no-unnecessary-generics
    objectContaining<E = {}>(obj: E): any
    /**
     * Matches any string that contains the exact provided string
     */
    stringMatching(str: string | RegExp): any
    /**
     * Matches any received string that contains the exact expected string
     */
    stringContaining(str: string): any

    not: InverseAsymmetricMatchers

    setState(state: object): void
    getState(): MatcherState & Record<string, any>
  }

  type JestMatchers<T> = JestMatchersShape<Matchers<void, T>, Matchers<Promise<void>, T>>

  type JestMatchersShape<TNonPromise extends {} = {}, TPromise extends {} = {}> = {
    /**
     * Use resolves to unwrap the value of a fulfilled promise so any other
     * matcher can be chained. If the promise is rejected the assertion fails.
     */
    resolves: AndNot<TPromise>
    /**
     * Unwraps the reason of a rejected promise so any other matcher can be chained.
     * If the promise is fulfilled the assertion fails.
     */
    rejects: AndNot<TPromise>
  } & AndNot<TNonPromise>
  type AndNot<T> = T & {
    not: T
  }

  // should be R extends void|Promise<void> but getting dtslint error
  interface Matchers<R, T = {}> {
    /**
     * Ensures the last call to a mock function was provided specific args.
     *
     * Optionally, you can provide a type for the expected arguments via a generic.
     * Note that the type must be either an array or a tuple.
     */
    // tslint:disable-next-line: no-unnecessary-generics
    lastCalledWith<E extends any[]>(...args: E): R
    /**
     * Ensure that the last call to a mock function has returned a specified value.
     *
     * Optionally, you can provide a type for the expected value via a generic.
     * This is particularly useful for ensuring expected objects have the right structure.
     */
    // tslint:disable-next-line: no-unnecessary-generics
    lastReturnedWith<E = any>(value: E): R
    /**
     * Ensure that a mock function is called with specific arguments on an Nth call.
     *
     * Optionally, you can provide a type for the expected arguments via a generic.
     * Note that the type must be either an array or a tuple.
     */
    // tslint:disable-next-line: no-unnecessary-generics
    nthCalledWith<E extends any[]>(nthCall: number, ...params: E): R
    /**
     * Ensure that the nth call to a mock function has returned a specified value.
     *
     * Optionally, you can provide a type for the expected value via a generic.
     * This is particularly useful for ensuring expected objects have the right structure.
     */
    // tslint:disable-next-line: no-unnecessary-generics
    nthReturnedWith<E = any>(n: number, value: E): R
    /**
     * Checks that a value is what you expect. It uses `Object.is` to check strict equality.
     * Don't use `toBe` with floating-point numbers.
     *
     * Optionally, you can provide a type for the expected value via a generic.
     * This is particularly useful for ensuring expected objects have the right structure.
     */
    // tslint:disable-next-line: no-unnecessary-generics
    toBe<E = any>(expected: E): R
    /**
     * Ensures that a mock function is called.
     */
    toBeCalled(): R
    /**
     * Ensures that a mock function is called an exact number of times.
     */
    toBeCalledTimes(expected: number): R
    /**
     * Ensure that a mock function is called with specific arguments.
     *
     * Optionally, you can provide a type for the expected arguments via a generic.
     * Note that the type must be either an array or a tuple.
     */
    // tslint:disable-next-line: no-unnecessary-generics
    toBeCalledWith<E extends any[]>(...args: E): R
    /**
     * Using exact equality with floating point numbers is a bad idea.
     * Rounding means that intuitive things fail.
     * The default for numDigits is 2.
     */
    toBeCloseTo(expected: number, numDigits?: number): R
    /**
     * Ensure that a variable is not undefined.
     */
    toBeDefined(): R
    /**
     * When you don't care what a value is, you just want to
     * ensure a value is false in a boolean context.
     */
    toBeFalsy(): R
    /**
     * For comparing floating point or big integer numbers.
     */
    toBeGreaterThan(expected: number | bigint): R
    /**
     * For comparing floating point or big integer numbers.
     */
    toBeGreaterThanOrEqual(expected: number | bigint): R
    /**
     * Ensure that an object is an instance of a class.
     * This matcher uses `instanceof` underneath.
     *
     * Optionally, you can provide a type for the expected value via a generic.
     * This is particularly useful for ensuring expected objects have the right structure.
     */
    // tslint:disable-next-line: no-unnecessary-generics
    toBeInstanceOf<E = any>(expected: E): R
    /**
     * For comparing floating point or big integer numbers.
     */
    toBeLessThan(expected: number | bigint): R
    /**
     * For comparing floating point or big integer numbers.
     */
    toBeLessThanOrEqual(expected: number | bigint): R
    /**
     * This is the same as `.toBe(null)` but the error messages are a bit nicer.
     * So use `.toBeNull()` when you want to check that something is null.
     */
    toBeNull(): R
    /**
     * Use when you don't care what a value is, you just want to ensure a value
     * is true in a boolean context. In JavaScript, there are six falsy values:
     * `false`, `0`, `''`, `null`, `undefined`, and `NaN`. Everything else is truthy.
     */
    toBeTruthy(): R
    /**
     * Used to check that a variable is undefined.
     */
    toBeUndefined(): R
    /**
     * Used to check that a variable is NaN.
     */
    toBeNaN(): R
    /**
     * Used when you want to check that an item is in a list.
     * For testing the items in the list, this uses `===`, a strict equality check.
     * It can also check whether a string is a substring of another string.
     *
     * Optionally, you can provide a type for the expected value via a generic.
     * This is particularly useful for ensuring expected objects have the right structure.
     */
    // tslint:disable-next-line: no-unnecessary-generics
    toContain<E = any>(expected: E): R
    /**
     * Used when you want to check that an item is in a list.
     * For testing the items in the list, this matcher recursively checks the
     * equality of all fields, rather than checking for object identity.
     *
     * Optionally, you can provide a type for the expected value via a generic.
     * This is particularly useful for ensuring expected objects have the right structure.
     */
    // tslint:disable-next-line: no-unnecessary-generics
    toContainEqual<E = any>(expected: E): R
    /**
     * Used when you want to check that two objects have the same value.
     * This matcher recursively checks the equality of all fields, rather than checking for object identity.
     *
     * Optionally, you can provide a type for the expected value via a generic.
     * This is particularly useful for ensuring expected objects have the right structure.
     */
    // tslint:disable-next-line: no-unnecessary-generics
    toEqual<E = any>(expected: E): R
    /**
     * Ensures that a mock function is called.
     */
    toHaveBeenCalled(): R
    /**
     * Ensures that a mock function is called an exact number of times.
     */
    toHaveBeenCalledTimes(expected: number): R
    /**
     * Ensure that a mock function is called with specific arguments.
     *
     * Optionally, you can provide a type for the expected arguments via a generic.
     * Note that the type must be either an array or a tuple.
     */
    // tslint:disable-next-line: no-unnecessary-generics
    toHaveBeenCalledWith<E extends any[]>(...params: E): R
    /**
     * Ensure that a mock function is called with specific arguments on an Nth call.
     *
     * Optionally, you can provide a type for the expected arguments via a generic.
     * Note that the type must be either an array or a tuple.
     */
    // tslint:disable-next-line: no-unnecessary-generics
    toHaveBeenNthCalledWith<E extends any[]>(nthCall: number, ...params: E): R
    /**
     * If you have a mock function, you can use `.toHaveBeenLastCalledWith`
     * to test what arguments it was last called with.
     *
     * Optionally, you can provide a type for the expected arguments via a generic.
     * Note that the type must be either an array or a tuple.
     */
    // tslint:disable-next-line: no-unnecessary-generics
    toHaveBeenLastCalledWith<E extends any[]>(...params: E): R
    /**
     * Use to test the specific value that a mock function last returned.
     * If the last call to the mock function threw an error, then this matcher will fail
     * no matter what value you provided as the expected return value.
     *
     * Optionally, you can provide a type for the expected value via a generic.
     * This is particularly useful for ensuring expected objects have the right structure.
     */
    // tslint:disable-next-line: no-unnecessary-generics
    toHaveLastReturnedWith<E = any>(expected: E): R
    /**
     * Used to check that an object has a `.length` property
     * and it is set to a certain numeric value.
     */
    toHaveLength(expected: number): R
    /**
     * Use to test the specific value that a mock function returned for the nth call.
     * If the nth call to the mock function threw an error, then this matcher will fail
     * no matter what value you provided as the expected return value.
     *
     * Optionally, you can provide a type for the expected value via a generic.
     * This is particularly useful for ensuring expected objects have the right structure.
     */
    // tslint:disable-next-line: no-unnecessary-generics
    toHaveNthReturnedWith<E = any>(nthCall: number, expected: E): R
    /**
     * Use to check if property at provided reference keyPath exists for an object.
     * For checking deeply nested properties in an object you may use dot notation or an array containing
     * the keyPath for deep references.
     *
     * Optionally, you can provide a value to check if it's equal to the value present at keyPath
     * on the target object. This matcher uses 'deep equality' (like `toEqual()`) and recursively checks
     * the equality of all fields.
     *
     * @example
     *
     * expect(houseForSale).toHaveProperty('kitchen.area', 20);
     */
    // tslint:disable-next-line: no-unnecessary-generics
    toHaveProperty<E = any>(propertyPath: string | any[], value?: E): R
    /**
     * Use to test that the mock function successfully returned (i.e., did not throw an error) at least one time
     */
    toHaveReturned(): R
    /**
     * Use to ensure that a mock function returned successfully (i.e., did not throw an error) an exact number of times.
     * Any calls to the mock function that throw an error are not counted toward the number of times the function returned.
     */
    toHaveReturnedTimes(expected: number): R
    /**
     * Use to ensure that a mock function returned a specific value.
     *
     * Optionally, you can provide a type for the expected value via a generic.
     * This is particularly useful for ensuring expected objects have the right structure.
     */
    // tslint:disable-next-line: no-unnecessary-generics
    toHaveReturnedWith<E = any>(expected: E): R
    /**
     * Check that a string matches a regular expression.
     */
    toMatch(expected: string | RegExp): R
    /**
     * Used to check that a JavaScript object matches a subset of the properties of an object
     *
     * Optionally, you can provide an object to use as Generic type for the expected value.
     * This ensures that the matching object matches the structure of the provided object-like type.
     *
     * @example
     *
     * type House = {
     *   bath: boolean;
     *   bedrooms: number;
     *   kitchen: {
     *     amenities: string[];
     *     area: number;
     *     wallColor: string;
     *   }
     * };
     *
     * expect(desiredHouse).toMatchObject<House>({...standardHouse, kitchen: {area: 20}}) // wherein standardHouse is some base object of type House
     */
    // tslint:disable-next-line: no-unnecessary-generics
    toMatchObject<E extends {} | any[]>(expected: E): R
    /**
     * This ensures that a value matches the most recent snapshot with property matchers.
     * Check out [the Snapshot Testing guide](http://facebook.github.io/jest/docs/snapshot-testing.html) for more information.
     */
    // tslint:disable-next-line: no-unnecessary-generics
    toMatchSnapshot<U extends { [P in keyof T]: any }>(propertyMatchers: Partial<U>, snapshotName?: string): R
    /**
     * This ensures that a value matches the most recent snapshot.
     * Check out [the Snapshot Testing guide](http://facebook.github.io/jest/docs/snapshot-testing.html) for more information.
     */
    toMatchSnapshot(snapshotName?: string): R
    /**
     * This ensures that a value matches the most recent snapshot with property matchers.
     * Instead of writing the snapshot value to a .snap file, it will be written into the source code automatically.
     * Check out [the Snapshot Testing guide](http://facebook.github.io/jest/docs/snapshot-testing.html) for more information.
     */
    // tslint:disable-next-line: no-unnecessary-generics
    toMatchInlineSnapshot<U extends { [P in keyof T]: any }>(propertyMatchers: Partial<U>, snapshot?: string): R
    /**
     * This ensures that a value matches the most recent snapshot with property matchers.
     * Instead of writing the snapshot value to a .snap file, it will be written into the source code automatically.
     * Check out [the Snapshot Testing guide](http://facebook.github.io/jest/docs/snapshot-testing.html) for more information.
     */
    toMatchInlineSnapshot(snapshot?: string): R
    /**
     * Ensure that a mock function has returned (as opposed to thrown) at least once.
     */
    toReturn(): R
    /**
     * Ensure that a mock function has returned (as opposed to thrown) a specified number of times.
     */
    toReturnTimes(count: number): R
    /**
     * Ensure that a mock function has returned a specified value at least once.
     *
     * Optionally, you can provide a type for the expected value via a generic.
     * This is particularly useful for ensuring expected objects have the right structure.
     */
    // tslint:disable-next-line: no-unnecessary-generics
    toReturnWith<E = any>(value: E): R
    /**
     * Use to test that objects have the same types as well as structure.
     *
     * Optionally, you can provide a type for the expected value via a generic.
     * This is particularly useful for ensuring expected objects have the right structure.
     */
    // tslint:disable-next-line: no-unnecessary-generics
    toStrictEqual<E = any>(expected: E): R
    /**
     * Used to test that a function throws when it is called.
     */
    toThrow(error?: string | Constructable | RegExp | Error): R
    /**
     * If you want to test that a specific error is thrown inside a function.
     */
    toThrowError(error?: string | Constructable | RegExp | Error): R
    /**
     * Used to test that a function throws a error matching the most recent snapshot when it is called.
     */
    toThrowErrorMatchingSnapshot(snapshotName?: string): R
    /**
     * Used to test that a function throws a error matching the most recent snapshot when it is called.
     * Instead of writing the snapshot value to a .snap file, it will be written into the source code automatically.
     */
    toThrowErrorMatchingInlineSnapshot(snapshot?: string): R
  }

  type RemoveFirstFromTuple<T extends any[]> = T['length'] extends 0
    ? []
    : ((...b: T) => void) extends (a: any, ...b: infer I) => void
    ? I
    : []

  interface AsymmetricMatcher {
    asymmetricMatch(other: unknown): boolean
  }
  type NonAsyncMatchers<TMatchers extends ExpectExtendMap> = {
    [K in keyof TMatchers]: ReturnType<TMatchers[K]> extends Promise<CustomMatcherResult> ? never : K
  }[keyof TMatchers]
  type CustomAsyncMatchers<TMatchers extends ExpectExtendMap> = {
    [K in NonAsyncMatchers<TMatchers>]: CustomAsymmetricMatcher<TMatchers[K]>
  }
  type CustomAsymmetricMatcher<TMatcher extends (...args: any[]) => any> = (
    ...args: RemoveFirstFromTuple<Parameters<TMatcher>>
  ) => AsymmetricMatcher

  // should be TMatcherReturn extends void|Promise<void> but getting dtslint error
  type CustomJestMatcher<TMatcher extends (...args: any[]) => any, TMatcherReturn> = (
    ...args: RemoveFirstFromTuple<Parameters<TMatcher>>
  ) => TMatcherReturn

  type ExpectProperties = {
    [K in keyof Expect]: Expect[K]
  }
  // should be TMatcherReturn extends void|Promise<void> but getting dtslint error
  // Use the `void` type for return types only. Otherwise, use `undefined`. See: https://github.com/Microsoft/dtslint/blob/master/docs/void-return.md
  // have added issue https://github.com/microsoft/dtslint/issues/256 - Cannot have type union containing void ( to be used as return type only
  type ExtendedMatchers<TMatchers extends ExpectExtendMap, TMatcherReturn, TActual> = Matchers<
    TMatcherReturn,
    TActual
  > &
    { [K in keyof TMatchers]: CustomJestMatcher<TMatchers[K], TMatcherReturn> }
  type JestExtendedMatchers<TMatchers extends ExpectExtendMap, TActual> = JestMatchersShape<
    ExtendedMatchers<TMatchers, void, TActual>,
    ExtendedMatchers<TMatchers, Promise<void>, TActual>
  >

  // when have called expect.extend
  type ExtendedExpectFunction<TMatchers extends ExpectExtendMap> = <TActual>(
    actual: TActual,
  ) => JestExtendedMatchers<TMatchers, TActual>

  type ExtendedExpect<TMatchers extends ExpectExtendMap> = ExpectProperties &
    AndNot<CustomAsyncMatchers<TMatchers>> &
    ExtendedExpectFunction<TMatchers>

  type NonPromiseMatchers<T extends JestMatchersShape<any>> = Omit<T, 'resolves' | 'rejects' | 'not'>
  type PromiseMatchers<T extends JestMatchersShape> = Omit<T['resolves'], 'not'>

  interface Constructable {
    new (...args: any[]): any
  }

  interface Mock<T = any, Y extends any[] = any> extends Function, MockInstance<T, Y> {
    new (...args: Y): T
    (...args: Y): T
  }

  interface SpyInstance<T = any, Y extends any[] = any> extends MockInstance<T, Y> {}

  /**
   * Represents a function that has been spied on.
   */
  type SpiedFunction<T extends (...args: any[]) => any> = SpyInstance<ReturnType<T>, ArgsType<T>>

  /**
   * Wrap a function with mock definitions
   *
   * @example
   *
   *  import { myFunction } from "./library";
   *  jest.mock("./library");
   *
   *  const mockMyFunction = myFunction as jest.MockedFunction<typeof myFunction>;
   *  expect(mockMyFunction.mock.calls[0][0]).toBe(42);
   */
  type MockedFunction<T extends (...args: any[]) => any> = MockInstance<ReturnType<T>, ArgsType<T>> & T

  /**
   * Wrap a class with mock definitions
   *
   * @example
   *
   *  import { MyClass } from "./library";
   *  jest.mock("./library");
   *
   *  const mockedMyClass = MyClass as jest.MockedClass<typeof MyClass>;
   *
   *  expect(mockedMyClass.mock.calls[0][0]).toBe(42); // Constructor calls
   *  expect(mockedMyClass.prototype.myMethod.mock.calls[0][0]).toBe(42); // Method calls
   */

  type MockedClass<T extends Constructable> = MockInstance<
    InstanceType<T>,
    T extends new (...args: infer P) => any ? P : never
  > & {
    prototype: T extends { prototype: any } ? Mocked<T['prototype']> : never
  } & T

  /**
   * Wrap an object or a module with mock definitions
   *
   * @example
   *
   *  jest.mock("../api");
   *  import * as api from "../api";
   *
   *  const mockApi = api as jest.Mocked<typeof api>;
   *  api.MyApi.prototype.myApiMethod.mockImplementation(() => "test");
   */
  type Mocked<T> = {
    [P in keyof T]: T[P] extends (...args: any[]) => any
      ? MockInstance<ReturnType<T[P]>, ArgsType<T[P]>>
      : T[P] extends Constructable
      ? MockedClass<T[P]>
      : T[P]
  } &
    T

  interface MockInstance<T, Y extends any[]> {
    /** Returns the mock name string set by calling `mockFn.mockName(value)`. */
    getMockName(): string
    /** Provides access to the mock's metadata */
    mock: MockContext<T, Y>
    /**
     * Resets all information stored in the mockFn.mock.calls and mockFn.mock.instances arrays.
     *
     * Often this is useful when you want to clean up a mock's usage data between two assertions.
     *
     * Beware that `mockClear` will replace `mockFn.mock`, not just `mockFn.mock.calls` and `mockFn.mock.instances`.
     * You should therefore avoid assigning mockFn.mock to other variables, temporary or not, to make sure you
     * don't access stale data.
     */
    mockClear(): this
    /**
     * Resets all information stored in the mock, including any initial implementation and mock name given.
     *
     * This is useful when you want to completely restore a mock back to its initial state.
     *
     * Beware that `mockReset` will replace `mockFn.mock`, not just `mockFn.mock.calls` and `mockFn.mock.instances`.
     * You should therefore avoid assigning mockFn.mock to other variables, temporary or not, to make sure you
     * don't access stale data.
     */
    mockReset(): this
    /**
     * Does everything that `mockFn.mockReset()` does, and also restores the original (non-mocked) implementation.
     *
     * This is useful when you want to mock functions in certain test cases and restore the original implementation in others.
     *
     * Beware that `mockFn.mockRestore` only works when mock was created with `jest.spyOn`. Thus you have to take care of restoration
     * yourself when manually assigning `jest.fn()`.
     *
     * The [`restoreMocks`](https://jestjs.io/docs/en/configuration.html#restoremocks-boolean) configuration option is available
     * to restore mocks automatically between tests.
     */
    mockRestore(): void
    /**
     * Returns the function that was set as the implementation of the mock (using mockImplementation).
     */
    getMockImplementation(): ((...args: Y) => T) | undefined
    /**
     * Accepts a function that should be used as the implementation of the mock. The mock itself will still record
     * all calls that go into and instances that come from itself – the only difference is that the implementation
     * will also be executed when the mock is called.
     *
     * Note: `jest.fn(implementation)` is a shorthand for `jest.fn().mockImplementation(implementation)`.
     */
    mockImplementation(fn?: (...args: Y) => T): this
    /**
     * Accepts a function that will be used as an implementation of the mock for one call to the mocked function.
     * Can be chained so that multiple function calls produce different results.
     *
     * @example
     *
     * const myMockFn = jest
     *   .fn()
     *    .mockImplementationOnce(cb => cb(null, true))
     *    .mockImplementationOnce(cb => cb(null, false));
     *
     * myMockFn((err, val) => console.log(val)); // true
     *
     * myMockFn((err, val) => console.log(val)); // false
     */
    mockImplementationOnce(fn: (...args: Y) => T): this
    /** Sets the name of the mock`. */
    mockName(name: string): this
    /**
     * Just a simple sugar function for:
     *
     * @example
     *
     *   jest.fn(function() {
     *     return this;
     *   });
     */
    mockReturnThis(): this
    /**
     * Accepts a value that will be returned whenever the mock function is called.
     *
     * @example
     *
     * const mock = jest.fn();
     * mock.mockReturnValue(42);
     * mock(); // 42
     * mock.mockReturnValue(43);
     * mock(); // 43
     */
    mockReturnValue(value: T): this
    /**
     * Accepts a value that will be returned for one call to the mock function. Can be chained so that
     * successive calls to the mock function return different values. When there are no more
     * `mockReturnValueOnce` values to use, calls will return a value specified by `mockReturnValue`.
     *
     * @example
     *
     * const myMockFn = jest.fn()
     *   .mockReturnValue('default')
     *   .mockReturnValueOnce('first call')
     *   .mockReturnValueOnce('second call');
     *
     * // 'first call', 'second call', 'default', 'default'
     * console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn());
     *
     */
    mockReturnValueOnce(value: T): this
    /**
     * Simple sugar function for: `jest.fn().mockImplementation(() => Promise.resolve(value));`
     */
    mockResolvedValue(value: ResolvedValue<T>): this
    /**
     * Simple sugar function for: `jest.fn().mockImplementationOnce(() => Promise.resolve(value));`
     *
     * @example
     *
     * test('async test', async () => {
     *  const asyncMock = jest
     *    .fn()
     *    .mockResolvedValue('default')
     *    .mockResolvedValueOnce('first call')
     *    .mockResolvedValueOnce('second call');
     *
     *  await asyncMock(); // first call
     *  await asyncMock(); // second call
     *  await asyncMock(); // default
     *  await asyncMock(); // default
     * });
     *
     */
    mockResolvedValueOnce(value: ResolvedValue<T>): this
    /**
     * Simple sugar function for: `jest.fn().mockImplementation(() => Promise.reject(value));`
     *
     * @example
     *
     * test('async test', async () => {
     *   const asyncMock = jest.fn().mockRejectedValue(new Error('Async error'));
     *
     *   await asyncMock(); // throws "Async error"
     * });
     */
    mockRejectedValue(value: RejectedValue<T>): this

    /**
     * Simple sugar function for: `jest.fn().mockImplementationOnce(() => Promise.reject(value));`
     *
     * @example
     *
     * test('async test', async () => {
     *  const asyncMock = jest
     *    .fn()
     *    .mockResolvedValueOnce('first call')
     *    .mockRejectedValueOnce(new Error('Async error'));
     *
     *  await asyncMock(); // first call
     *  await asyncMock(); // throws "Async error"
     * });
     *
     */
    mockRejectedValueOnce(value: RejectedValue<T>): this
  }

  /**
   * Represents the result of a single call to a mock function with a return value.
   */
  interface MockResultReturn<T> {
    type: 'return'
    value: T
  }
  /**
   * Represents the result of a single incomplete call to a mock function.
   */
  interface MockResultIncomplete {
    type: 'incomplete'
    value: undefined
  }
  /**
   * Represents the result of a single call to a mock function with a thrown error.
   */
  interface MockResultThrow {
    type: 'throw'
    value: any
  }

  type MockResult<T> = MockResultReturn<T> | MockResultThrow | MockResultIncomplete

  interface MockContext<T, Y extends any[]> {
    calls: Y[]
    instances: T[]
    invocationCallOrder: number[]
    /**
     * List of results of calls to the mock function.
     */
    results: Array<MockResult<T>>
  }
}

// Jest ships with a copy of Jasmine. They monkey-patch its APIs and divergence/deprecation are expected.
// Relevant parts of Jasmine's API are below so they can be changed and removed over time.
// This file can't reference jasmine.d.ts since the globals aren't compatible.

declare function spyOn<T>(object: T, method: keyof T): jasmine.Spy
/**
 * If you call the function pending anywhere in the spec body,
 * no matter the expectations, the spec will be marked pending.
 */
declare function pending(reason?: string): void
/**
 * Fails a test when called within one.
 */
declare function fail(error?: any): never
declare namespace jasmine {
  let DEFAULT_TIMEOUT_INTERVAL: number
  function clock(): Clock
  function any(aclass: any): Any
  function anything(): Any
  function arrayContaining(sample: any[]): ArrayContaining
  function objectContaining(sample: any): ObjectContaining
  function createSpy(name?: string, originalFn?: (...args: any[]) => any): Spy
  function createSpyObj(baseName: string, methodNames: any[]): any
  // tslint:disable-next-line: no-unnecessary-generics
  function createSpyObj<T>(baseName: string, methodNames: any[]): T
  function pp(value: any): string
  function addCustomEqualityTester(equalityTester: CustomEqualityTester): void
  function addMatchers(matchers: CustomMatcherFactories): void
  function stringMatching(value: string | RegExp): Any

  interface Clock {
    install(): void
    uninstall(): void
    /**
     * Calls to any registered callback are triggered when the clock isticked forward
     * via the jasmine.clock().tick function, which takes a number of milliseconds.
     */
    tick(ms: number): void
    mockDate(date?: Date): void
  }

  interface Any {
    new (expectedClass: any): any
    jasmineMatches(other: any): boolean
    jasmineToString(): string
  }

  interface ArrayContaining {
    new (sample: any[]): any
    asymmetricMatch(other: any): boolean
    jasmineToString(): string
  }

  interface ObjectContaining {
    new (sample: any): any
    jasmineMatches(other: any, mismatchKeys: any[], mismatchValues: any[]): boolean
    jasmineToString(): string
  }

  interface Spy {
    (...params: any[]): any
    identity: string
    and: SpyAnd
    calls: Calls
    mostRecentCall: { args: any[] }
    argsForCall: any[]
    wasCalled: boolean
  }

  interface SpyAnd {
    /**
     * By chaining the spy with and.callThrough, the spy will still track all
     * calls to it but in addition it will delegate to the actual implementation.
     */
    callThrough(): Spy
    /**
     * By chaining the spy with and.returnValue, all calls to the function
     * will return a specific value.
     */
    returnValue(val: any): Spy
    /**
     * By chaining the spy with and.returnValues, all calls to the function
     * will return specific values in order until it reaches the end of the return values list.
     */
    returnValues(...values: any[]): Spy
    /**
     * By chaining the spy with and.callFake, all calls to the spy
     * will delegate to the supplied function.
     */
    callFake(fn: (...args: any[]) => any): Spy
    /**
     * By chaining the spy with and.throwError, all calls to the spy
     * will throw the specified value.
     */
    throwError(msg: string): Spy
    /**
     * When a calling strategy is used for a spy, the original stubbing
     * behavior can be returned at any time with and.stub.
     */
    stub(): Spy
  }

  interface Calls {
    /**
     * By chaining the spy with calls.any(),
     * will return false if the spy has not been called at all,
     * and then true once at least one call happens.
     */
    any(): boolean
    /**
     * By chaining the spy with calls.count(),
     * will return the number of times the spy was called
     */
    count(): number
    /**
     * By chaining the spy with calls.argsFor(),
     * will return the arguments passed to call number index
     */
    argsFor(index: number): any[]
    /**
     * By chaining the spy with calls.allArgs(),
     * will return the arguments to all calls
     */
    allArgs(): any[]
    /**
     * By chaining the spy with calls.all(), will return the
     * context (the this) and arguments passed all calls
     */
    all(): CallInfo[]
    /**
     * By chaining the spy with calls.mostRecent(), will return the
     * context (the this) and arguments for the most recent call
     */
    mostRecent(): CallInfo
    /**
     * By chaining the spy with calls.first(), will return the
     * context (the this) and arguments for the first call
     */
    first(): CallInfo
    /**
     * By chaining the spy with calls.reset(), will clears all tracking for a spy
     */
    reset(): void
  }

  interface CallInfo {
    /**
     * The context (the this) for the call
     */
    object: any
    /**
     * All arguments passed to the call
     */
    args: any[]
    /**
     * The return value of the call
     */
    returnValue: any
  }

  interface CustomMatcherFactories {
    [index: string]: CustomMatcherFactory
  }

  type CustomMatcherFactory = (util: MatchersUtil, customEqualityTesters: CustomEqualityTester[]) => CustomMatcher

  interface MatchersUtil {
    equals(a: any, b: any, customTesters?: CustomEqualityTester[]): boolean
    // tslint:disable-next-line: no-unnecessary-generics
    contains<T>(haystack: ArrayLike<T> | string, needle: any, customTesters?: CustomEqualityTester[]): boolean
    buildFailureMessage(matcherName: string, isNot: boolean, actual: any, ...expected: any[]): string
  }

  type CustomEqualityTester = (first: any, second: any) => boolean

  interface CustomMatcher {
    compare<T>(actual: T, expected: T, ...args: any[]): CustomMatcherResult
    compare(actual: any, ...expected: any[]): CustomMatcherResult
  }

  interface CustomMatcherResult {
    pass: boolean
    message: string | (() => string)
  }

  interface ArrayLike<T> {
    length: number
    [n: number]: T
  }
}

declare namespace jest {
  interface Matchers<R, T> {
    /**
     * @deprecated
     * since v1.9.0
     * @description
     * Assert whether a value is a DOM element, or not. Contrary to what its name implies, this matcher only checks
     * that you passed to it a valid DOM element.
     *
     * It does not have a clear definition of what "the DOM" is. Therefore, it does not check whether that element
     * is contained anywhere.
     * @see
     * [testing-library/jest-dom#toBeInTheDom](https://github.com/testing-library/jest-dom#toBeInTheDom)
     */
    toBeInTheDOM(container?: HTMLElement | SVGElement): R
    /**
     * @description
     * Assert whether an element is present in the document or not.
     * @example
     * <svg data-testid="svg-element"></svg>
     *
     * expect(queryByTestId('svg-element')).toBeInTheDocument()
     * expect(queryByTestId('does-not-exist')).not.toBeInTheDocument()
     * @see
     * [testing-library/jest-dom#tobeinthedocument](https://github.com/testing-library/jest-dom#tobeinthedocument)
     */
    toBeInTheDocument(): R
    /**
     * @description
     * This allows you to check if an element is currently visible to the user.
     *
     * An element is visible if **all** the following conditions are met:
     * * it does not have its css property display set to none
     * * it does not have its css property visibility set to either hidden or collapse
     * * it does not have its css property opacity set to 0
     * * its parent element is also visible (and so on up to the top of the DOM tree)
     * * it does not have the hidden attribute
     * * if `<details />` it has the open attribute
     * @example
     * <div
     *   data-testid="zero-opacity"
     *   style="opacity: 0"
     * >
     *   Zero Opacity
     * </div>
     *
     * <div data-testid="visible">Visible Example</div>
     *
     * expect(getByTestId('zero-opacity')).not.toBeVisible()
     * expect(getByTestId('visible')).toBeVisible()
     * @see
     * [testing-library/jest-dom#tobevisible](https://github.com/testing-library/jest-dom#tobevisible)
     */
    toBeVisible(): R
    /**
     * @deprecated
     * since v5.9.0
     * @description
     * Assert whether an element has content or not.
     * @example
     * <span data-testid="not-empty">
     *   <span data-testid="empty"></span>
     * </span>
     *
     * expect(getByTestId('empty')).toBeEmpty()
     * expect(getByTestId('not-empty')).not.toBeEmpty()
     * @see
     * [testing-library/jest-dom#tobeempty](https://github.com/testing-library/jest-dom#tobeempty)
     */
    toBeEmpty(): R
    /**
     * @description
     * Assert whether an element has content or not.
     * @example
     * <span data-testid="not-empty">
     *   <span data-testid="empty"></span>
     * </span>
     *
     * expect(getByTestId('empty')).toBeEmptyDOMElement()
     * expect(getByTestId('not-empty')).not.toBeEmptyDOMElement()
     * @see
     * [testing-library/jest-dom#tobeemptydomelement](https://github.com/testing-library/jest-dom#tobeemptydomelement)
     */
    toBeEmptyDOMElement(): R
    /**
     * @description
     * Allows you to check whether an element is disabled from the user's perspective.
     *
     * Matches if the element is a form control and the `disabled` attribute is specified on this element or the
     * element is a descendant of a form element with a `disabled` attribute.
     * @example
     * <button
     *   data-testid="button"
     *   type="submit"
     *   disabled
     * >
     *   submit
     * </button>
     *
     * expect(getByTestId('button')).toBeDisabled()
     * @see
     * [testing-library/jest-dom#tobedisabled](https://github.com/testing-library/jest-dom#tobedisabled)
     */
    toBeDisabled(): R
    /**
     * @description
     * Allows you to check whether an element is not disabled from the user's perspective.
     *
     * Works like `not.toBeDisabled()`.
     *
     * Use this matcher to avoid double negation in your tests.
     * @example
     * <button
     *   data-testid="button"
     *   type="submit"
     * >
     *   submit
     * </button>
     *
     * expect(getByTestId('button')).toBeEnabled()
     * @see
     * [testing-library/jest-dom#tobeenabled](https://github.com/testing-library/jest-dom#tobeenabled)
     */
    toBeEnabled(): R
    /**
     * @description
     * Check if a form element, or the entire `form`, is currently invalid.
     *
     * An `input`, `select`, `textarea`, or `form` element is invalid if it has an `aria-invalid` attribute with no
     * value or a value of "true", or if the result of `checkValidity()` is false.
     * @example
     * <input data-testid="no-aria-invalid" />
     *
     * <form data-testid="invalid-form">
     *   <input required />
     * </form>
     *
     * expect(getByTestId('no-aria-invalid')).not.toBeInvalid()
     * expect(getByTestId('invalid-form')).toBeInvalid()
     * @see
     * [testing-library/jest-dom#tobeinvalid](https://github.com/testing-library/jest-dom#tobeinvalid)
     */
    toBeInvalid(): R
    /**
     * @description
     * This allows you to check if a form element is currently required.
     *
     * An element is required if it is having a `required` or `aria-required="true"` attribute.
     * @example
     * <input data-testid="required-input" required />
     * <div
     *   data-testid="supported-role"
     *   role="tree"
     *   required />
     *
     * expect(getByTestId('required-input')).toBeRequired()
     * expect(getByTestId('supported-role')).not.toBeRequired()
     * @see
     * [testing-library/jest-dom#toberequired](https://github.com/testing-library/jest-dom#toberequired)
     */
    toBeRequired(): R
    /**
     * @description
     * Allows you to check if a form element is currently required.
     *
     * An `input`, `select`, `textarea`, or `form` element is invalid if it has an `aria-invalid` attribute with no
     * value or a value of "false", or if the result of `checkValidity()` is true.
     * @example
     * <input data-testid="aria-invalid" aria-invalid />
     *
     * <form data-testid="valid-form">
     *   <input />
     * </form>
     *
     * expect(getByTestId('no-aria-invalid')).not.toBeValid()
     * expect(getByTestId('invalid-form')).toBeInvalid()
     * @see
     * [testing-library/jest-dom#tobevalid](https://github.com/testing-library/jest-dom#tobevalid)
     */
    toBeValid(): R
    /**
     * @description
     * Allows you to assert whether an element contains another element as a descendant or not.
     * @example
     * <span data-testid="ancestor">
     *   <span data-testid="descendant"></span>
     * </span>
     *
     * const ancestor = getByTestId('ancestor')
     * const descendant = getByTestId('descendant')
     * const nonExistantElement = getByTestId('does-not-exist')
     * expect(ancestor).toContainElement(descendant)
     * expect(descendant).not.toContainElement(ancestor)
     * expect(ancestor).not.toContainElement(nonExistantElement)
     * @see
     * [testing-library/jest-dom#tocontainelement](https://github.com/testing-library/jest-dom#tocontainelement)
     */
    toContainElement(element: HTMLElement | SVGElement | null): R
    /**
     * @description
     * Assert whether a string representing a HTML element is contained in another element.
     * @example
     * <span data-testid="parent"><span data-testid="child"></span></span>
     *
     * expect(getByTestId('parent')).toContainHTML('<span data-testid="child"></span>')
     * @see
     * [testing-library/jest-dom#tocontainhtml](https://github.com/testing-library/jest-dom#tocontainhtml)
     */
    toContainHTML(htmlText: string): R
    /**
     * @description
     * Allows you to check if a given element has an attribute or not.
     *
     * You can also optionally check that the attribute has a specific expected value or partial match using
     * [expect.stringContaining](https://jestjs.io/docs/en/expect.html#expectnotstringcontainingstring) or
     * [expect.stringMatching](https://jestjs.io/docs/en/expect.html#expectstringmatchingstring-regexp).
     * @example
     * <button
     *   data-testid="ok-button"
     *   type="submit"
     *   disabled
     * >
     *   ok
     * </button>
     *
     * expect(button).toHaveAttribute('disabled')
     * expect(button).toHaveAttribute('type', 'submit')
     * expect(button).not.toHaveAttribute('type', 'button')
     * @see
     * [testing-library/jest-dom#tohaveattribute](https://github.com/testing-library/jest-dom#tohaveattribute)
     */
    toHaveAttribute(attr: string, value?: unknown): R
    /**
     * @description
     * Check whether the given element has certain classes within its `class` attribute.
     *
     * You must provide at least one class, unless you are asserting that an element does not have any classes.
     * @example
     * <button
     *   data-testid="delete-button"
     *   class="btn xs btn-danger"
     * >
     *   delete item
     * </button>
     *
     * <div data-testid="no-classes">no classes</div>
     *
     * const deleteButton = getByTestId('delete-button')
     * const noClasses = getByTestId('no-classes')
     * expect(deleteButton).toHaveClass('btn')
     * expect(deleteButton).toHaveClass('btn-danger xs')
     * expect(deleteButton).toHaveClass('btn xs btn-danger', {exact: true})
     * expect(deleteButton).not.toHaveClass('btn xs btn-danger', {exact: true})
     * expect(noClasses).not.toHaveClass()
     * @see
     * [testing-library/jest-dom#tohaveclass](https://github.com/testing-library/jest-dom#tohaveclass)
     */
    toHaveClass(...classNames: string[]): R
    toHaveClass(classNames: string, options?: { exact: boolean }): R
    /**
     * @description
     * This allows you to check whether the given form element has the specified displayed value (the one the
     * end user will see). It accepts <input>, <select> and <textarea> elements with the exception of <input type="checkbox">
     * and <input type="radio">, which can be meaningfully matched only using toBeChecked or toHaveFormValues.
     * @example
     * <label for="input-example">First name</label>
     * <input type="text" id="input-example" value="Luca" />
     *
     * <label for="textarea-example">Description</label>
     * <textarea id="textarea-example">An example description here.</textarea>
     *
     * <label for="single-select-example">Fruit</label>
     * <select id="single-select-example">
     *   <option value="">Select a fruit...</option>
     *   <option value="banana">Banana</option>
     *   <option value="ananas">Ananas</option>
     *   <option value="avocado">Avocado</option>
     * </select>
     *
     * <label for="mutiple-select-example">Fruits</label>
     * <select id="multiple-select-example" multiple>
     *   <option value="">Select a fruit...</option>
     *   <option value="banana" selected>Banana</option>
     *   <option value="ananas">Ananas</option>
     *   <option value="avocado" selected>Avocado</option>
     * </select>
     *
     * const input = screen.getByLabelText('First name')
     * const textarea = screen.getByLabelText('Description')
     * const selectSingle = screen.getByLabelText('Fruit')
     * const selectMultiple = screen.getByLabelText('Fruits')
     *
     * expect(input).toHaveDisplayValue('Luca')
     * expect(textarea).toHaveDisplayValue('An example description here.')
     * expect(selectSingle).toHaveDisplayValue('Select a fruit...')
     * expect(selectMultiple).toHaveDisplayValue(['Banana', 'Avocado'])
     *
     * @see
     * [testing-library/jest-dom#tohavedisplayvalue](https://github.com/testing-library/jest-dom#tohavedisplayvalue)
     */
    toHaveDisplayValue(value: string | RegExp | Array<string | RegExp>): R
    /**
     * @description
     * Assert whether an element has focus or not.
     * @example
     * <div>
     *   <input type="text" data-testid="element-to-focus" />
     * </div>
     *
     * const input = getByTestId('element-to-focus')
     * input.focus()
     * expect(input).toHaveFocus()
     * input.blur()
     * expect(input).not.toHaveFocus()
     * @see
     * [testing-library/jest-dom#tohavefocus](https://github.com/testing-library/jest-dom#tohavefocus)
     */
    toHaveFocus(): R
    /**
     * @description
     * Check if a form or fieldset contains form controls for each given name, and having the specified value.
     *
     * Can only be invoked on a form or fieldset element.
     * @example
     * <form data-testid="login-form">
     *   <input type="text" name="username" value="jane.doe" />
     *   <input type="password" name="password" value="123" />
     *   <input type="checkbox" name="rememberMe" checked />
     *   <button type="submit">Sign in</button>
     * </form>
     *
     * expect(getByTestId('login-form')).toHaveFormValues({
     *   username: 'jane.doe',
     *   rememberMe: true,
     * })
     * @see
     * [testing-library/jest-dom#tohaveformvalues](https://github.com/testing-library/jest-dom#tohaveformvalues)
     */
    toHaveFormValues(expectedValues: Record<string, unknown>): R
    /**
     * @description
     * Check if an element has specific css properties with specific values applied.
     *
     * Only matches if the element has *all* the expected properties applied, not just some of them.
     * @example
     * <button
     *   data-test-id="submit-button"
     *   style="background-color: green; display: none"
     * >
     *   submit
     * </button>
     *
     * const button = getByTestId('submit-button')
     * expect(button).toHaveStyle('background-color: green')
     * expect(button).toHaveStyle({
     *   background-color: 'green',
     *   display: none
     * })
     * @see
     * [testing-library/jest-dom#tohavestyle](https://github.com/testing-library/jest-dom#tohavestyle)
     */
    toHaveStyle(css: string | Record<string, unknown>): R
    /**
     * @description
     * Check whether the given element has a text content or not.
     *
     * When a string argument is passed through, it will perform a partial case-sensitive match to the element
     * content.
     *
     * To perform a case-insensitive match, you can use a RegExp with the `/i` modifier.
     *
     * If you want to match the whole content, you can use a RegExp to do it.
     * @example
     * <span data-testid="text-content">Text Content</span>
     *
     * const element = getByTestId('text-content')
     * expect(element).toHaveTextContent('Content')
     * // to match the whole content
     * expect(element).toHaveTextContent(/^Text Content$/)
     * // to use case-insentive match
     * expect(element).toHaveTextContent(/content$/i)
     * expect(element).not.toHaveTextContent('content')
     * @see
     * [testing-library/jest-dom#tohavetextcontent](https://github.com/testing-library/jest-dom#tohavetextcontent)
     */
    toHaveTextContent(text: string | RegExp, options?: { normalizeWhitespace: boolean }): R
    /**
     * @description
     * Check whether the given form element has the specified value.
     *
     * Accepts `<input>`, `<select>`, and `<textarea>` elements with the exception of `<input type="checkbox">` and
     * `<input type="radiobox">`, which can be matched only using
     * [toBeChecked](https://github.com/testing-library/jest-dom#tobechecked) or
     * [toHaveFormValues](https://github.com/testing-library/jest-dom#tohaveformvalues).
     * @example
     * <input
     *   type="number"
     *   value="5"
     *   data-testid="input-number" />
     *
     * const numberInput = getByTestId('input-number')
     * expect(numberInput).toHaveValue(5)
     * @see
     * [testing-library/jest-dom#tohavevalue](https://github.com/testing-library/jest-dom#tohavevalue)
     */
    toHaveValue(value?: string | string[] | number | null): R
    /**
     * @description
     * Assert whether the given element is checked.
     *
     * It accepts an `input` of type `checkbox` or `radio` and elements with a `role` of `radio` with a valid
     * `aria-checked` attribute of "true" or "false".
     * @example
     * <input
     *   type="checkbox"
     *   checked
     *   data-testid="input-checkbox" />
     * <input
     *   type="radio"
     *   value="foo"
     *   data-testid="input-radio" />
     *
     * const inputCheckbox = getByTestId('input-checkbox')
     * const inputRadio = getByTestId('input-radio')
     * expect(inputCheckbox).toBeChecked()
     * expect(inputRadio).not.toBeChecked()
     * @see
     * [testing-library/jest-dom#tobechecked](https://github.com/testing-library/jest-dom#tobechecked)
     */
    toBeChecked(): R
    /**
     * @deprecated
     * since v5.14.1
     * @description
     * Check the accessible description for an element.
     * This allows you to check whether the given element has a description or not.
     *
     * An element gets its description via the
     * [`aria-describedby` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-describedby_attribute).
     * Set this to the `id` of one or more other elements. These elements may be nested
     * inside, be outside, or a sibling of the passed in element.
     *
     * Whitespace is normalized. Using multiple ids will
     * [join the referenced elements’ text content separated by a space](https://www.w3.org/TR/accname-1.1/#mapping_additional_nd_description).
     *
     * When a `string` argument is passed through, it will perform a whole
     * case-sensitive match to the description text.
     *
     * To perform a case-insensitive match, you can use a `RegExp` with the `/i`
     * modifier.
     *
     * To perform a partial match, you can pass a `RegExp` or use
     * `expect.stringContaining("partial string")`.
     *
     * @example
     * <button aria-label="Close" aria-describedby="description-close">
     *   X
     * </button>
     * <div id="description-close">
     *   Closing will discard any changes
     * </div>
     *
     * <button>Delete</button>
     *
     * const closeButton = getByRole('button', {name: 'Close'})
     *
     * expect(closeButton).toHaveDescription('Closing will discard any changes')
     * expect(closeButton).toHaveDescription(/will discard/) // to partially match
     * expect(closeButton).toHaveDescription(expect.stringContaining('will discard')) // to partially match
     * expect(closeButton).toHaveDescription(/^closing/i) // to use case-insensitive match
     * expect(closeButton).not.toHaveDescription('Other description')
     *
     * const deleteButton = getByRole('button', {name: 'Delete'})
     * expect(deleteButton).not.toHaveDescription()
     * expect(deleteButton).toHaveDescription('') // Missing or empty description always becomes a blank string
     * @see
     * [testing-library/jest-dom#tohavedescription](https://github.com/testing-library/jest-dom#tohavedescription)
     */
    toHaveDescription(text?: string | RegExp | ReturnType<typeof expect.stringContaining>): R
    /**
     * @description
     * This allows to assert that an element has the expected [accessible description](https://w3c.github.io/accname/).
     *
     * You can pass the exact string of the expected accessible description, or you can make a
     * partial match passing a regular expression, or by using either
     * [expect.stringContaining](https://jestjs.io/docs/en/expect.html#expectnotstringcontainingstring)
     * or [expect.stringMatching](https://jestjs.io/docs/en/expect.html#expectstringmatchingstring-regexp).
     * @example
     * <a data-testid="link" href="/" aria-label="Home page" title="A link to start over">Start</a>
     * <a data-testid="extra-link" href="/about" aria-label="About page">About</a>
     * <img src="avatar.jpg" data-testid="avatar" alt="User profile pic" />
     * <img src="logo.jpg" data-testid="logo" alt="Company logo" aria-describedby="t1" />
     * <span id="t1" role="presentation">The logo of Our Company</span>
     *
     * expect(getByTestId('link')).toHaveAccessibleDescription()
     * expect(getByTestId('link')).toHaveAccessibleDescription('A link to start over')
     * expect(getByTestId('link')).not.toHaveAccessibleDescription('Home page')
     * expect(getByTestId('extra-link')).not.toHaveAccessibleDescription()
     * expect(getByTestId('avatar')).not.toHaveAccessibleDescription()
     * expect(getByTestId('logo')).not.toHaveAccessibleDescription('Company logo')
     * expect(getByTestId('logo')).toHaveAccessibleDescription('The logo of Our Company')
     * @see
     * [testing-library/jest-dom#tohaveaccessibledescription](https://github.com/testing-library/jest-dom#tohaveaccessibledescription)
     */
    toHaveAccessibleDescription(text?: string | RegExp | ReturnType<typeof expect.stringContaining>): R
    /**
     * @description
     * This allows to assert that an element has the expected [accessible name](https://w3c.github.io/accname/).
     * It is useful, for instance, to assert that form elements and buttons are properly labelled.
     *
     * You can pass the exact string of the expected accessible name, or you can make a
     * partial match passing a regular expression, or by using either
     * [expect.stringContaining](https://jestjs.io/docs/en/expect.html#expectnotstringcontainingstring)
     * or [expect.stringMatching](https://jestjs.io/docs/en/expect.html#expectstringmatchingstring-regexp).
     * @example
     * <img data-testid="img-alt" src="" alt="Test alt" />
     * <img data-testid="img-empty-alt" src="" alt="" />
     * <svg data-testid="svg-title"><title>Test title</title></svg>
     * <button data-testid="button-img-alt"><img src="" alt="Test" /></button>
     * <p><img data-testid="img-paragraph" src="" alt="" /> Test content</p>
     * <button data-testid="svg-button"><svg><title>Test</title></svg></p>
     * <div><svg data-testid="svg-without-title"></svg></div>
     * <input data-testid="input-title" title="test" />
     *
     * expect(getByTestId('img-alt')).toHaveAccessibleName('Test alt')
     * expect(getByTestId('img-empty-alt')).not.toHaveAccessibleName()
     * expect(getByTestId('svg-title')).toHaveAccessibleName('Test title')
     * expect(getByTestId('button-img-alt')).toHaveAccessibleName()
     * expect(getByTestId('img-paragraph')).not.toHaveAccessibleName()
     * expect(getByTestId('svg-button')).toHaveAccessibleName()
     * expect(getByTestId('svg-without-title')).not.toHaveAccessibleName()
     * expect(getByTestId('input-title')).toHaveAccessibleName()
     * @see
     * [testing-library/jest-dom#tohaveaccessiblename](https://github.com/testing-library/jest-dom#tohaveaccessiblename)
     */
    toHaveAccessibleName(text?: string | RegExp | ReturnType<typeof expect.stringContaining>): R
    /**
     * @description
     * This allows you to check whether the given element is partially checked.
     * It accepts an input of type checkbox and elements with a role of checkbox
     * with a aria-checked="mixed", or input of type checkbox with indeterminate
     * set to true
     *
     * @example
     * <input type="checkbox" aria-checked="mixed" data-testid="aria-checkbox-mixed" />
     * <input type="checkbox" checked data-testid="input-checkbox-checked" />
     * <input type="checkbox" data-testid="input-checkbox-unchecked" />
     * <div role="checkbox" aria-checked="true" data-testid="aria-checkbox-checked" />
     * <div
     *   role="checkbox"
     *   aria-checked="false"
     *   data-testid="aria-checkbox-unchecked"
     * />
     * <input type="checkbox" data-testid="input-checkbox-indeterminate" />
     *
     * const ariaCheckboxMixed = getByTestId('aria-checkbox-mixed')
     * const inputCheckboxChecked = getByTestId('input-checkbox-checked')
     * const inputCheckboxUnchecked = getByTestId('input-checkbox-unchecked')
     * const ariaCheckboxChecked = getByTestId('aria-checkbox-checked')
     * const ariaCheckboxUnchecked = getByTestId('aria-checkbox-unchecked')
     * const inputCheckboxIndeterminate = getByTestId('input-checkbox-indeterminate')
     *
     * expect(ariaCheckboxMixed).toBePartiallyChecked()
     * expect(inputCheckboxChecked).not.toBePartiallyChecked()
     * expect(inputCheckboxUnchecked).not.toBePartiallyChecked()
     * expect(ariaCheckboxChecked).not.toBePartiallyChecked()
     * expect(ariaCheckboxUnchecked).not.toBePartiallyChecked()
     *
     * inputCheckboxIndeterminate.indeterminate = true
     * expect(inputCheckboxIndeterminate).toBePartiallyChecked()
     * @see
     * [testing-library/jest-dom#tobepartiallychecked](https://github.com/testing-library/jest-dom#tobepartiallychecked)
     */
    toBePartiallyChecked(): R
    /**
     * @description
     *
     * Check whether the given element has an [ARIA error message](https://www.w3.org/TR/wai-aria/#aria-errormessage) or not.
     *
     * Use the `aria-errormessage` attribute to reference another element that contains
     * custom error message text. Multiple ids is **NOT** allowed. Authors MUST use
     * `aria-invalid` in conjunction with `aria-errormessage`. Learn more from the
     * [`aria-errormessage` spec](https://www.w3.org/TR/wai-aria/#aria-errormessage).
     *
     * Whitespace is normalized.
     *
     * When a `string` argument is passed through, it will perform a whole
     * case-sensitive match to the error message text.
     *
     * To perform a case-insensitive match, you can use a `RegExp` with the `/i`
     * modifier.
     *
     * To perform a partial match, you can pass a `RegExp` or use
     * expect.stringContaining("partial string")`.
     *
     * @example
     * <label for="startTime"> Please enter a start time for the meeting: </label>
     * <input id="startTime" type="text" aria-errormessage="msgID" aria-invalid="true" value="11:30 PM" />
     * <span id="msgID" aria-live="assertive" style="visibility:visible">
     *   Invalid time: the time must be between 9:00 AM and 5:00 PM"
     * </span>
     *
     *
     * const timeInput = getByLabel('startTime')
     *
     * expect(timeInput).toHaveErrorMessage(
     *   'Invalid time: the time must be between 9:00 AM and 5:00 PM',
     * )
     * expect(timeInput).toHaveErrorMessage(/invalid time/i) // to partially match
     * expect(timeInput).toHaveErrorMessage(expect.stringContaining('Invalid time')) // to partially match
     * expect(timeInput).not.toHaveErrorMessage('Pikachu!')
     * @see
     * [testing-library/jest-dom#tohaveerrormessage](https://github.com/testing-library/jest-dom#tohaveerrormessage)
     */
    toHaveErrorMessage(text?: string | RegExp | ReturnType<typeof expect.stringContaining>): R
  }
}
