export function getOptions(url, body) {
    return {
        url: url,
        form: body,
    };
}

export function callback(err)  {
    if (err) {
        return console.log(err);
    }
}