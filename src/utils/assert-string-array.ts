export function assertStringArray(array: unknown, entityName: string): asserts array is string[] {
    const isArrayOfStrings: boolean =
        Array.isArray(array) && array.every((value: unknown): value is string => typeof value === 'string');
    if (!isArrayOfStrings) {
        throw new Error(`${entityName} must be presented as array of string`);
    }
}
