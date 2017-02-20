class Errors {

    constructor() {
        this.fieldErrorsArray = [];
    }

    /**
     *
     */
    /**
     * Convert multi-objects at 1-st level into an array of objects
     * @method _objectsToArray
     * @param  {Object} objs the multi-objects to be converted
     * @return {array} an array of objects
     */
    _objectsToArray(objs) {
        return Object.keys(objs).map(function(key) {
            return objs[key];
        });
    }

    /**
     * Returns the first fieldError with the same
     * field value as the parameter.
     * @method _findBy
     * @param {string} byFieldName The name of the field to filter errors for.
     */
    _findBy(byFieldName) {
        let filtered = this.fieldErrorsArray.filter(function(fieldError) {
            if (fieldError.field == byFieldName) {
                return true;
            }
            return false;
        });
        return filtered[0];
    }

    /**
     * Deletes the first fieldErrors with the same
     * field value as the parameter.
     * @method _deleteBy
     * @param {string} byFieldName The name of the field to filter errors for.
     */
    _deleteBy(byFieldName) {
        let foundIndex = this.fieldErrorsArray.findIndex(function(fieldError) {
            if (fieldError.field == byFieldName) {
                return true;
            }
            return false;
        });
        if (foundIndex >= 0) {
            // remove an element at index foundIndex
            this.fieldErrorsArray.splice(foundIndex, 1);
        }
    }

    /**
     * Constructs an error message from the given field error for displayment
     * @method _constructErrorMessage
     * @param  {Object} fieldError the fieldError as returned by the serevr
     * @return {string} the error message for displayment
     */
    _constructErrorMessage(fieldError) {
        if (fieldError) {
            return "Das Feld " + fieldError.error;
        }
    }

    /**
     * Get the error message for displayment by the given fieldName
     * @method get
     * @param  {string} fieldName the name of the field
     * @return {string} the error message for displayment
     */
    get(fieldName) {
        let fieldError = this._findBy(fieldName);
        return this._constructErrorMessage(fieldError);
    }

    /**
     * Clear the fieldError for the given fieldName, if any
     * @method clear
     * @param  {string} fieldName to clear, if any
     */
    clear(fieldName) {
        this._deleteBy(fieldName);
    }

    /**
     * Record a multi-object of fieldErrors
     * <pre>
     * {
     *  "fieldErrors": [
     *   {
     *      "field": "name",
     *      "error": "darf nicht leer sein"
     *    },
     *    {
     *      "field": "description",
     *      "error": "darf nicht leer sein"
     *    }
     *  ]
     *}
     * </pre>
     * @method record
     * @param  {Object[]} fieldErrors
     * @return {[type]}             [description]
     */
    record(fieldErrors) {
        this.fieldErrorsArray = this._objectsToArray(fieldErrors);
    }

    has(fieldName) {
        return this.get(fieldName);
    }

    any() {
        return this.fieldErrorsArray.length > 0;
    }
}

export default Errors;
