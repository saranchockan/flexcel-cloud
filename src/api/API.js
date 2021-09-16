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