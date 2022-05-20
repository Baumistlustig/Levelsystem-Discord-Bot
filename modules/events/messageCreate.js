import request from "request";
import { callback, getOptions } from "../service/http.service.js";
import dotenv from "dotenv";

export async function messageCreate(message) {
    if (message.author.bot) { return; }

    dotenv.config('../config/.env')

    request.post(getOptions(
        'http://localhost:8090/api/message',
        {
            author: message.author.id,
            token: process.env.ACCESS_TOKEN
        }
    ), (err, res, body) => {
        callback(err);
    });
}