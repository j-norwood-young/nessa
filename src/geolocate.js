import { Reader } from 'maxmind';
import * as fs from 'fs';

const mmdb_file = process.env.MMDB_FILE || "../db/dbip-city-lite-2024-05.mmdb";

const buffer = fs.readFileSync(mmdb_file);
const geo = new Reader(buffer);

export const geolocate = async function (ip) {
    const geo_data = geo.get(ip);
    if (!geo_data) return {};
    return {
        location_city: geo_data.city.names.en,
        location_country: geo_data.country.names.en,
        location_country_code: geo_data.country.iso_code,
        location_latitude: geo_data.location.latitude,
        location_longitude: geo_data.location.longitude,
        location_region: Array.isArray(geo_data.subdivisions) ? geo_data.subdivisions[0]?.names.en : undefined,
    }
}

export const geolocate_test = async function () {
    const ip = "8.8.8.8";
    const expected = {
        location_city: "Mountain View",
        location_country: "United States",
        location_country_code: "US",
        location_latitude: 37.4223,
        location_longitude: -122.085,
        location_region: "California",
    }
    const actual = await geolocate_ip(ip);
    console.assert(JSON.stringify(actual) === JSON.stringify(expected));
}