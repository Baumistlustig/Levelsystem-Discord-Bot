import https from 'https';
import fs from 'fs';

function getOptions(port, host, path) {
    return {
        port: port,
        host: host,
        path: path,
    };
}

function callback(response) {
    let str = '';

    //another chunk of data has been received, so append it to `str`
    response.on('data', function (chunk) {
        str += chunk;
    });

    //the whole response has been received, so we just print it out here
    response.on('end', function () {
        console.log(str);
    });
}