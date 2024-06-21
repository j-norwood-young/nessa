const referer_lookup_table = [
    {
        regex: /-n24\?/i,
        referer_source: "https://news24.com"
    },
    {
        regex: /-news24\?/i,
        referer_source: "https://news24.com"
    },
    {
        regex: /-ewn\?/i,
        referer_source: "https://www.ewn.co.za"
    },
    {
        regex: /-dm\?/i,
        referer_source: "https://www.dailymaverick.co.za"
    },
    {
        regex: /-bd\?/i,
        referer_source: "https://www.businesslive.co.za"
    },
];

export const referer_lookup = function (url) {
    let referer_medium = "direct";
    let referer_source = "";
    for (let i = 0; i < referer_lookup_table.length; i++) {
        if (referer_lookup_table[i].regex.test(url)) {
            referer_source = referer_lookup_table[i].referer_source;
            referer_medium = "external";
            break;
        }
    }
    return {
        referer_medium,
        referer_source,
    }
}