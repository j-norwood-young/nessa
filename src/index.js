import http from 'http';
import fs from 'fs';
import Url from 'url';
import template from 'lodash.template';
// import { AnalyticsCollect } from './analytics-collect.js';
import { ESCollect } from './es-collect.js';
import { Consumer } from './consumer.js';

const filename = process.env.FILENAME || "1px-transparent.png"
const port = process.env.PORT || 4011
const host = process.env.HOST || "127.0.0.1"

let hits = 0

const analytics = new ESCollect(process.env.GA);

const iframe_html = fs.readFileSync("./iframe.html");
const iframe_template = template(iframe_html)
const iframe = iframe_template({
    img_width: process.env.IMG_WIDTH,
    img_height: process.env.IMG_HEIGHT,
})

const img = fs.readFileSync(filename)

http.createServer((req, res) => {
    if (req.url == '/favicon.ico') return;
    const url = Url.parse(req.url);
    if (url.query === "iframe") {
        analytics.hit(req, res)
        res.writeHead(200, { "Content-Type": "text/html" })
        res.write(iframe);
        res.end();
        hits++;
    } else if (url.query === "nohit") {
        res.writeHead(200, { "Content-Type": "image/png" })
        res.write(img);
        res.end();
    } else {
        analytics.hit(req, res)
        res.writeHead(200, { "Content-Type" : "image/png" })
        res.write(img);
        res.end();
        hits++;
    }
}).listen(port, host, () => {
    console.log(new Date(), `Server listening ${ host }:${ port }`);
});

const consumer = new Consumer();

// if (process.env.REPORTINTERVAL) setInterval(() => { console.log(new Date(), "Hits", hits)}, process.env.REPORTINTERVAL)