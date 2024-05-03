import Bowser from "bowser";

export const parse_useragent = function (user_agent) {
    const ua = Bowser.parse(user_agent);
    return {
        user_agent,
        ua_browser: ua.browser.name,
        ua_browser_version: ua.browser.version,
        ua_device: ua.platform.type,
        ua_os: ua.os.name,
        ua_os_version: ua.os.version,
        ua_platform: ua.platform.vendor,
    }
}

export const parse_useragent_test = function () {
    const user_agent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36";
    const expected = {
        user_agent,
        ua_browser: "Chrome",
        ua_browser_version: "87.0.4280.88",
        ua_device: "desktop",
        ua_os: "macOS",
        ua_os_version: "10.15.7",
        ua_platform: "Apple",
    }
    const actual = parse_user_agent(user_agent);
    console.log(actual);
    console.assert(JSON.stringify(actual) === JSON.stringify(expected));
}