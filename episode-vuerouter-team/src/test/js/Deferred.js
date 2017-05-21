/**
 * Creates a new pending promise and provides methods to resolve or reject it.
 * See also
 * - https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Deferred#backwards_forwards_compatible
 * - http://stackoverflow.com/questions/37651780/why-does-the-promise-constructor-need-an-executor/37673534#37673534
 * @method      Deferred
 * @constructor
 */
export default function Deferred() {
  var self = this;
  /* A newly created Pomise object.
   * Initially in pending state.
   */
  var p = this.promise = new Promise(function (resolve, reject) {
    /** A method to resolve the associated Promise with the value passed.
     * If the promise is already settled it does nothing.
     *
     * @param {anything} value : This value is used to resolve the promise
     * If the value is a Promise then the associated promise assumes the state
     * of Promise passed as value.
     */
    this.resolve = null;
    self.resolve = resolve;

    /** A method to reject the assocaited Promise with the value passed.
     * If the promise is already settled it does nothing.
     *
     * @param {anything} reason: The reason for the rejection of the Promise.
     * Generally its an Error object. If however a Promise is passed, then the Promise
     * itself will be the reason for rejection no matter the state of the Promise.
     */
    this.reject = null;
    self.reject = reject;
  }.bind(this));
  this.then = this.promise.then.bind(p);
  this.catch = this.promise.catch.bind(p);
  Object.freeze(this);
};
