import Queue from 'bull';
import { Client } from '@elastic/elasticsearch';
import { enrich } from "./enrich.js";
import fs from 'fs';

const esclient = new Client({ 
    node: process.env.ELASTICSEARCH_URL,
    auth: {
        username: process.env.ELASTIC_USERNAME || "elastic",
        password: process.env.ELASTIC_PASSWORD
    },
    tls: {
        ca: fs.readFileSync('/usr/share/kibana/config/certs/ca/ca.crt'),
        rejectUnauthorized: false
    }
});
const queue_name = process.env.QUEUE_NAME || "pageviews";
const index = process.env.ELASTICSEARCH_INDEX || "pageviews";

export class Consumer {
    constructor() {
        this.queue = new Queue(queue_name, process.env.REDIS_URL || "redis://localhost:6379");
        this.esclient = esclient;
        this.queue.process(async job => {
            const data = await enrich(job.data);
            console.log(data);
            await this.esclient.index({
                index,
                body: data
            });
        })
    }
}