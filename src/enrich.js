import { parse_referer } from './referer.js';
import { parse_useragent } from './useragent.js';
import { geolocate } from './geolocate.js';
import { parse_utm } from './utm.js';
import { referer_lookup } from './referer_lookup.js';

export const enrich = async function (hit) {
    let referer = parse_referer(hit.referer);
    if (!referer.referer_source) {
        referer = referer_lookup(hit.url);
    }
    const useragent = parse_useragent(hit.ua);
    const geo = await geolocate(hit.ip);
    const utm = parse_utm(hit.url);
    return { ...hit, ...referer, ...useragent, ...geo, ...utm };
}