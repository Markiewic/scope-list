import { createInterface, Interface } from 'readline';

export function readInput(): Promise<string[]> {
    return new Promise((resolve: (value: string[]) => void): void => {
        const lines: string[] = [];
        const readline: Interface = createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false
        });
        readline.addListener('line', (input: string): number => lines.push(input));
        readline.addListener('close', (): void => resolve(lines));
    });
}
