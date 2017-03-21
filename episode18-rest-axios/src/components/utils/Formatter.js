/**
 * Left pads the given number with '0'.
 * @method formatZeroPadded
 * @param  {Number}   number     to format
 * @param  {Number}   [toDigits=2] supports only positive numbers
 * @return {String}              formatted value
 * @preserve
 */
export const formatZeroPadded = (number, toDigits = 2) => {
    const zeroPads = Array(toDigits).fill("0").join("") + number;
    return zeroPads.slice(-toDigits);
}
