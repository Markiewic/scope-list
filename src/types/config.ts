import { Scopes } from './scopes';
import { ScopesLimit } from './scopes-limit';

export interface Config {
    scopes: Scopes;
    fallback?: string;
    scopesLimit?: ScopesLimit;
    separator?: string;
}
