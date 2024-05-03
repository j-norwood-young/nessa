import { Utm as utmExtractor } from "utm-extractor";

export const parse_utm = function (url) {
    let utm = {};
    try {
        utm = new utmExtractor(url).get();
    } catch (err) {
        utm = {
            utm_medium: null,
            utm_campaign: null,
            utm_content: null,
            utm_source: null,
            utm_term: null,
        };
    }
    return {
        utm_campaign: utm.utm_campaign,
        utm_content: utm.utm_content,
        utm_medium: utm.utm_medium,
        utm_source: utm.utm_source,
        utm_term: utm.utm_term,
    }
}

export const parse_utm_test = function () {
    const url = "https://www.example.com/?utm_medium=email&utm_campaign=welcome&utm_content=button&utm_source=mailchimp&utm_term=click";
    const expected = {
        utm_campaign: "welcome",
        utm_content: "button",
        utm_medium: "email",
        utm_source: "mailchimp",
        utm_term: "click",
    }
    const actual = parse_utm(url);
    console.assert(JSON.stringify(actual) === JSON.stringify(expected));
}