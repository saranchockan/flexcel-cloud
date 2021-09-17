const API_LINK = ''

const DEFAULT_ERR_HANDLER = (reason) => {
    console.log(reason)
}

function __internal_fetch(link, headers, params, handleError, callback){
    headers['apiKey'] = '';
    fetch(API_LINK + link, headers)
        .then(res => res.json())
        .then(data => callback(data))
        .catch(reason => handleError(reason))
}

/**
 * Every user's filesystem is assumed to be a JSON where keys on the root are folders while the values of those keys are flows.
 * FLows are represented by a flow name, and flow ID.
 * @param {string} userTok A token that the backend uses in order to access the user data.
 */
export function getUserFilesystem(userTok){

}