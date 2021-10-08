const API_LINK = 'https://cors-anywhere.herokuapp.com/http://3.231.167.221/storage/3'

const DEFAULT_ERR_HANDLER = (reason) => {
    console.log(reason)
}

function __internal_fetch(link, headers, handleError, callback){
    headers['apiKey'] = '';
    fetch(API_LINK + link, headers)
        .then(res => res.json())
        .then(data => callback(data))
        .catch(reason => handleError(reason))
}

function getTest(){
    __internal_fetch('/', getMethod, (e) => {console.log(e)}, (e) => {console.log(e)})
}

const putMethod = {
    method: 'PUT', 
    headers: {
     'Content-type': 'application/json'
    },
    //body: JSON.stringify({'type' : 'flow', 'value' : {'TEST' : 'TEST'}})
}

const getMethod = {
    method: 'GET', 
    headers: {
     'Content-type': 'application/json'
    },
    //body: JSON.stringify({'type' : 'flow', 'value' : {'TEST' : 'TEST'}})
}

/**
 * Autosaving Documentation
 * 
 * Autosaving will autosave to a .tmp folder (where '.tmp' will be a reserved folder name).
 * In this .tmp folder, only one file of _tmp.flow will be present that stores this autosaved file. **Only one of these files can exist at a time!**
 * If the user doesn't choose to save the file, they can discard it. If they choose, they can save it to the file they opened, or a new file.
 * However, if autosaving can't connect to the internet, the user's changes will still be present when the webpage is open. A prompt will warn the user of unsaved changes.
 * When they reconnect to the internet, autosave will resume and they can continue working on the internet.
 */

/**
 * Every user's filesystem is assumed to be a JSON where keys on the root are folders while the values of those keys are flows.
 * FLows are represented by a flow name, and flow ID.
 * @param {string} userTok A token that the backend uses in order to access the user data.
 */
export function getUserFilesystem(userTok, callback){

}

// Handle "unsaved changes"
export function openFile(userTok, path, callback){
}

/**
 * Retrieves the tmp file from the database.
 * In the return data, the root contains "status" and "data"
 * A status of 0 means that the call what successful and data was found 
 * A status of 1 means that the call what successful, however, no data was found
 * A status of 2 means invalid user token
 * 
 * @param {string} userTok 
 * @param {function(json)} callback 
 */
export function getTmpFile(userTok, callback){
    callback({status: '1', data: {}})
}

export function saveToTmpFile(userTok, contents, callback){

}