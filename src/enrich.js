import { parse_referer } from './referer.js';
import { parse_useragent } from './useragent.js';
import { geolocate } from './geolocate.js';
import { parse_utm } from './utm.js';

export const enrich = async function (hit) {
    const referer = parse_referer(hit.referer);
    const useragent = parse_useragent(hit.ua);
    const geo = await geolocate(hit.ip);
    const utm = parse_utm(hit.url);
    return { ...hit, ...referer, ...useragent, ...geo, ...utm };
}