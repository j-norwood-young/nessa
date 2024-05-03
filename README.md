# NESSA

Record Analytics hits from a third-party site through an embedded PNG or message and analyse the data.

## Overview

- We capture clicks on an image or message embedded in a third-party site;
- We enrich that data with geodata, user agent data, UTM data and referer data;
- We then send that to a queue running on KeyDB and Bull for processing;
- A worker then picks that up and saves it to ElasticSearch;
- You can use Kibana to analyse the data.

## Requirements

This system runs on Docker, so you will need Docker installed. 

Based on the current configuration, we suggest 8GB of RAM and 4 CPUs. You may need to increase this depending on load, but it should be sufficient for a couple of million hits per month.

There is also the posiblity of scaling out using Docker Swarm or Kubernetes.

We do not include a web server in this setup. We recommend running this separately using Nginx or Apache and a reverse proxy to the Node.js server and Kibana server. This will give you future flexiblity to scale out.

## Setup

Copy the example env file to .env

`cp env-example .env`

Customise the .env file to your needs. 

**Make sure you update the passwords to your own values.**

Download the GeoIP database from [DB-IP](https://db-ip.com/db/download/ip-to-city-lite) and save it do `db/dbip-city-lite.mmdb`. If you call it something else, config in the .env file. You can use any mmdb file, such as a commercial one from [MaxMind](https://www.maxmind.com/en/home).

## Running

We use Docker Compose to run the entire system.

To start the system, simply run:
`docker compose up -d`

The first time it runs, it will run a setup that generates SSL certificates. 

## Usage

### Basic Usage

Simply append any page you'd like to impersonate. Eg. if running on localhost, embed this in your webpage:

```
<img src="http://localhost:4011/some-random-page" />
```

This will record a "hit" to "/some-random-page".

### Iframe

To serve an iframe with the image embedded in the iframe, append `?iframe` to your url.

```
<iframe border="0" src="http://localhost:4011/some-random-page?iframe"></iframe>
```

You can customise the `iframe.html` with your own message.

# Thanks and Credits

We build on the work of others. Here are some of the projects we use:

- [IP Geolocation by DB-IP](https://db-ip.com)
- [Bowser for browser detection](https://www.npmjs.com/package/bowser)
- [utm-extractor for UTM extraction](https://www.npmjs.com/package/utm-extractor)
- [Bull for queueing](https://www.npmjs.com/package/bull)
