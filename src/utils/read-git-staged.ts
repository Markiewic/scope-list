import { execSync } from 'child_process';

export function readGitStaged(): string[] {
    return execSync('git diff --name-only --cached').toString().split('\n');
}
