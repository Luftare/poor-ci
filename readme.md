# Poor CI

A simple server to listen to github hooks and to run scripts. It can be used to automatically keep deployments up-to-date without having to ssh to the machine.

## Setup

1. generate `.env`: `npm run generate-env`
2. fill values to `.env`
3. modify: `push-hook.sh`
4. install dependencies: `npm i`
5. run server: `npm start`

## FAQ

### How to setup GITHUB_HOOK_SECRET at Github?

At the repo > Settings > Webhooks > Add webhook

When the form opens up, fill in:

- Payload URL: the url (or ip) where this server runs with port (defined in `.env`) e.g. `123.234.345.123:1234`
- Content type: `application/json`
- Secret: same as in the `.env` at the server
- Just the push event
- Active: yes

### What to write into the push-hook.sh?

Simple script to keep other repository up-to-date, using [pm2](https://pm2.keymetrics.io/)

```sh
pm2 stop other-app-name
cd /path/to/other/app/repo
git pull
npm i
pm2 start other-app-name
```
