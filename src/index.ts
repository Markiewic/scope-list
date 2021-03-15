import minimatch from 'minimatch';

import { getConfig } from './config/get-config';
import { readOptions } from './options/options';
import { Config } from './types/config';
import { Options } from './types/options';
import { filterUnique } from './utils/filter-unique';
import { readGitStaged } from './utils/read-git-staged';
import { readInput } from './utils/read-input';

// eslint-disable-next-line no-console
scopeList().then(console.log);
// asdf
async function scopeList(): Promise<string> {
    const options: Options = readOptions();
    const config: Config = getConfig();
    const paths: string[] = await listPaths(options);
    return pickScopes(paths, config);
}

async function listPaths(options: Options): Promise<string[]> {
    if (options.input) {
        return await readInput();
    } else {
        return readGitStaged();
    }
}

function pickScopes(paths: string[], { scopes, scopesLimit, separator, fallback }: Config): string {
    let pathsLeft: string[] = paths.slice();

    let fitScopes: string[] = Object.entries(scopes)
        .filter(([_, glob]: [string, string]): boolean => {
            const pathsLeftBeforeCount: number = pathsLeft.length;
            pathsLeft = pathsLeft.filter((path: string): boolean => !minimatch(path, glob));
            return pathsLeft.length < pathsLeftBeforeCount;
        })
        .map(([scope]: [string, string]): string => scope);

    if (fallback && pathsLeft.length > 0) {
        fitScopes.push(fallback);
    }

    fitScopes = filterUnique(fitScopes);
    if (scopesLimit && fitScopes.length > scopesLimit.maxCount) {
        fitScopes = scopesLimit.replaceWith;
    }
    return fitScopes.join(separator);
}
