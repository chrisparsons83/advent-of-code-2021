"use strict";
exports.__esModule = true;
var fs = require("fs");
var depths = fs.readFileSync('./part1input.txt').toString().split("\n").map(function (x) { return +x; });
console.log(depths);
