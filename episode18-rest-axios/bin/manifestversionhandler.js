'use strict';

const replace = require("replace-in-file");
const fs = require('fs-extra');

function manifestversionhandler() {};

/**
 * Sources given mixManifestVersionFile
 * @method
 * @param  {string} replaceIntoFile        [description]
 * @param  {string} mixManifestVersionFile [description]
 * @param  {boolean} failOnError           [description]
 */
manifestversionhandler.doReplace = function(replaceIntoFile, mixManifestVersionFile, failOnError = false) {
    try {

        var mixManifestVersion = JSON.parse(fs.readFileSync(mixManifestVersionFile, 'utf8'));

        const optionsForReplace = {
            files: replaceIntoFile,
        }

        let arrayFrom = [];
        let arrayTo = [];


        debugger;

        for (var defaultName in mixManifestVersion) {
            arrayFrom.push(new RegExp(defaultName, "g"));
            arrayTo.push(mixManifestVersion[defaultName]);
        }

        optionsForReplace['from'] = arrayFrom;
        optionsForReplace['to'] = arrayTo;

        replace(optionsForReplace, (error, changedFiles) => {
            if (error) {
                return console.error('Error occurred:', error);
                throw error;
            }
            console.log('manifest version handler modified the following files:', changedFiles.join(', '));

        });
    } catch (error) {
        if (failOnError) {
            console.error(error);
        } else {
            console.info(error.message);
        }
    }
};

//Export
module.exports = manifestversionhandler;
