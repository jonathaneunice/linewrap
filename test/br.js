var assert = require('assert');
var linewrap = require('../');

var fs = require('fs');
var content = fs.readFileSync(__dirname + '/br.json', 'utf8'),
    data = JSON.parse(content);
var brPat = /<\s*br(?:[\s/]*|\s[^>]*)>/i;

exports.stop30 = function () {
    var wrap = linewrap(30, {lineBreakScheme: 'html'}),
        wrapLF = linewrap(30, {lineBreakRegex: brPat, lineBreakStr: '\n'});

    var text = data.text,
        res = wrap(text),
        resLF = wrapLF(text);

    assert.equal(res, data.res);
    assert.equal(resLF, data.resLF);

    assert.equal(/\n/.test(res), false);
    assert.equal(brPat.test(resLF), false);

    res.split(/<br>/).forEach(function (line) {
        assert.ok(line.length <= 30, 'line > 30 columns');
    });
    resLF.split(/\n/).forEach(function (line) {
        assert.ok(line.length <= 30, 'line > 30 columns');
    });
};
