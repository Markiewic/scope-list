import { Config } from '../types/config';
import { assertNumber } from '../utils/assert-number';
import { assertObject } from '../utils/assert-object';
import { assertStringArray } from '../utils/assert-string-array';

export function assertConfig(candidate: unknown): asserts candidate is Config {
    assertObject(candidate, 'config');
    assertObject(candidate?.scopes, 'scopes');
    if (!candidate?.scopes) {
        throw new Error('Configuration file must contain dictionary of scopes');
    }
    const scopes: unknown[] = Object.values(candidate.scopes);
    if (scopes.some((scope: unknown): scope is string => typeof scope !== 'string')) {
        throw new Error('Each scope in config file must be a string representing a glob');
    }
    if (candidate.scopesLimit) {
        assertObject(candidate.scopesLimit, 'candidate.scopesLimit');
        assertStringArray(candidate.scopesLimit.replaceWith, 'scopesLimit.replaceWith');
        assertNumber(candidate.scopesLimit.maxCount, 'scopesLimit.maxCount');
    }
}
