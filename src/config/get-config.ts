import { cosmiconfigSync } from 'cosmiconfig';

import { Config } from '../types/config';
import { assertConfig } from './assert-config';

const CONFIG_NAME: string = 'scope-list';

export function getConfig(): Config {
    const config: unknown = cosmiconfigSync(CONFIG_NAME).search()?.config;
    assertConfig(config);
    return config;
}

// sdfsdf
