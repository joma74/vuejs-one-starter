import axios from 'axios';
import Errors from './Errors';
import Vue from 'vue';

class Form {

    constructor(data) {
        this.originalData = data;

        for (let field in this.originalData) {
            this[field] = this.originalData[field];
        }

        this.fieldErrors = new Errors();
    }

    reset() {
        for (let field in this.originalData) {
            this[field] = null;
        }
    }

    getPayload() {
        let payload = Object.assign({}, this);
        delete payload.originalData;
        delete payload.fieldErrors;
        return payload;
    }
}

export default Form;
