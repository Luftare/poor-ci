# Poor CI

A simple server to listen to github hooks and to run scripts. It can be used to automatically keep deployments up-to-date without having to ssh to the machine.

## Getting started

1. Generate `ci.json` with contents of:

```json
{
  "port": 3000,
  "secret": "same-as-in-github",
  "events": {
    "push": "echo 'some bash script'"
  }
}
```

2. Start the ci: `listen-to-github`

## FAQ

### How to setup GITHUB_HOOK_SECRET at Github?

At the repo > Settings > Webhooks > Add webhook

When the form opens up, fill in:

- Payload URL: the url (or ip) where this server runs with port (defined in `.env`) e.g. `123.234.345.123:1234`
- Content type: `application/json`
- Secret: same as in the `.env` at the server
- Just the push event
- Active: yes

### How to deploy after push to master?

Very simple script to keep other repository up-to-date, using [pm2](https://pm2.keymetrics.io/):

In `ci.json`:

```json
{
  "port": 3000,
  "secret": "same-as-in-github",
  "events": {
    "push": "sh deploy.sh"
  }
}
```

Create script file `deploy.sh`:

```sh
#!/bin/sh
pm2 stop other-app-name
cd /path/to/other/app/repo
git pull
npm i
pm2 start other-app-name
```

Here's a more involved example including running tests before deploying:

```sh
#!/bin/sh

abort()
{
    # Scripts to run after failed tests such as teardown
    echo "Tests failed. Let's teardown..."
    exit 1
}

trap 'abort' 0

set -e

# Scripts to run to test the new code
cd path/to/other/app
git pull
npm i
npm run test

trap : 0
# Scripts to run after successfull tests
echo "Tests passed! Now let's deploy..."
```
