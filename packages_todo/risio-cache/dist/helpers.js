"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
function env(key, defaultValue) {
    return lodash_1.get(process.env, key, defaultValue);
}
exports.env = env;
