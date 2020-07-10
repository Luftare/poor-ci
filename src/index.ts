#!/usr/bin/env node
import { readFileSync, existsSync } from 'fs';
import { execSync } from 'child_process';
import { createGithubHookListener } from './create-github-hook-listener';

interface CiConfig {
  port: number;
  secret: string;
  events: {
    push: string;
  };
}

const CONFIG_FILENAME = 'ci.json';

if (!existsSync(CONFIG_FILENAME)) {
  throw new Error(`Missing ci config file: ${CONFIG_FILENAME}`);
}
const { secret, events, port } = JSON.parse(
  readFileSync(CONFIG_FILENAME, 'utf8')
) as CiConfig;

createGithubHookListener({
  secret,
  onAuthorizedCall: () => execSync(events.push),
}).listen(port, () => console.log(`Listening to Github hook at: ${port}`));
