export function assertObject(value: unknown, entityName: string): asserts value is Record<string, unknown> {
    if (typeof value !== 'object') {
        throw new Error(`${entityName} must be presented as object`);
    }
}
