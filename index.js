'use strict';
var fs = require('fs');
var path = require('path');
var git = require('gulp-git');
var gulp = require('gulp');
var modulepath = path.resolve('node_modules/gulp-enyo-builder');
var enyo = modulepath + '/enyo';
var exec = require('child_process').exec;
var sys = require('sys')

module.exports = function (opts) {
    opts = opts || {};
    opts.cwd = opts.cwd || process.cwd();
    opts.tag = opts.tag || '2.4.0';
    opts.lib = opts.lib || 'lib';

    try {
        //see if enyo has been cloned
        var files = fs.readdirSync(enyo);
    } catch (e) {
        //clone enyo
        git.clone('https://github.com/enyojs/enyo.git', {
            args: enyo
        });

        git.checkout(opts.tag);
    }

    var deploypath = enyo + '/tools/deploy.js';
    var buildCmd = ['nodejs ', deploypath, ' -T -e ', enyo, ' -s ', process.cwd(), ' -o ', process.cwd(), '/dist -l ', opts.lib];

    return exec(buildCmd.join(''), function (error, stdout, stderr) {
        sys.print('stdout: ' + stdout);
        sys.print('stderr: ' + stderr);
    });

};