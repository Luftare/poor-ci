#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var child_process_1 = require("child_process");
var create_github_hook_listener_1 = require("./create-github-hook-listener");
var CONFIG_FILENAME = 'ci.json';
if (!fs_1.existsSync(CONFIG_FILENAME)) {
    throw new Error("Missing ci config file: " + CONFIG_FILENAME);
}
var _a = JSON.parse(fs_1.readFileSync(CONFIG_FILENAME, 'utf8')), secret = _a.secret, events = _a.events, port = _a.port;
create_github_hook_listener_1.createGithubHookListener({
    secret: secret,
    onAuthorizedCall: function () { return child_process_1.execSync(events.push); }
}).listen(port, function () { return console.log("Listening to Github hook at: " + port); });
//# sourceMappingURL=index.js.map