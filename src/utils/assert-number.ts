export function assertNumber(value: unknown, entityName: string): asserts value is number {
    if (typeof value !== 'number') {
        throw new Error(`${entityName} must be presented as number`);
    }
}
