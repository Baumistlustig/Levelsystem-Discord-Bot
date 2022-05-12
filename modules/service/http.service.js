export function getOptions(url, body) {
    return {
        url: url,
        form: body,
    };
}

export function callback(err, res, body)  {
    if (err) {
        return console.log(err);
    }
    console.log(JSON.parse(body));

}