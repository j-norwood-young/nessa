import { set_cookie } from "./cookie.js";
import Queue from 'bull';

const queue_name = process.env.QUEUE_NAME || "pageviews";

export class ESCollect {
    constructor() {
        this.queue = new Queue(queue_name, process.env.REDIS_URL || "redis://localhost:6379");
    }

    hit(req, res) {
        console.log("Hit");
        const uid = set_cookie(req, res);
        const raw_hit = {
            uid,
            ua: req.headers["user-agent"],
            ip: req.headers['x-forwarded-for'] || req.headers['X-Forwarded-For']  || req.connection.remoteAddress || req.socket.remoteAddress || (req.connection.socket ? req.connection.socket.remoteAddress : null),
            referer: req.headers.referer,
            url: req.url,
            host: req.headers.host,
            time: new Date(),
        };
        // console.log(raw_hit);
        try {
            this.queue.add(raw_hit);
        } catch(err) {
            console.error(new Date(), err);
        }
    }
}