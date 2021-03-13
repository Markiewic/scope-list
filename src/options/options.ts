import commander, { Command } from 'commander';

import { Options } from '../types/options';

export function readOptions(): Options {
    const program: commander.Command = new Command();
    program.option('-i, --input', 'Handle file list from stdin instead of parsing git staged');
    program.parse(process.argv);
    return program.opts() as Options;
}
