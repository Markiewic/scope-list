export function filterUnique<T>(array: T[]): T[] {
    return Array.from(new Set(array));
}
