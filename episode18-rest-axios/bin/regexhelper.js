'use strict';

function regexhelper() {
}

/**
 * Returns a literal pattern String for the specified String.
 * This method produces a String that can be used to create a Pattern that
 * would match the string s as if it were a literal pattern.
 * Metacharacters or escape sequences in the input sequence will be given
 * no special meaning.
 * @method
 * @param  {string} s The string to be literalized
 * @return {string}   A literal string replacement
 */
regexhelper.quote = function(s) {
    var daRegex = new RegExp(s);
    return daRegex.source;
};

/**
 * [description]
 * @method
 * @param  {string} s     transform to a regexp string
 * @param  {string} flags [flags=''] Optional regex flags
 * @return {string}       the resulting regexp string
 */
regexhelper.quoteAsRegExp = function(s, flags) {
    let quoted = this.quote(s);
    return this.asRegExp(quoted, flags || '');
};

regexhelper.asRegExp = function(s, flags) {
    return `\/${s}\/${flags}`
};

//Export
module.exports = regexhelper;
