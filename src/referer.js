import Referer from "referer-parser";

export const parse_referer = function (referer, url) {
    let referer_medium = "direct";
    let referer_source = "";
    if (referer) {
        let referer = new Referer(referer, url);
        referer_medium = referer.medium;
        referer_source = referer.referer;
        if (referer_medium === "unknown")
            referer_medium = "external";
    }
    return {
        referer_medium,
        referer_source,
    }
}

export const parse_referer_test = function () {
    const url = "https://www.example.com/";
    const referer = "https://www.google.com/";
    const expected = {
        referer_medium: "search",
        referer_source: "Google",
    }
    const actual = parse_referer(referer, url);
    console.assert(JSON.stringify(actual) === JSON.stringify(expected));
}