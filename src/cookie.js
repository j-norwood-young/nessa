import Cookies from 'cookies'
import { v4 as uuid } from 'uuid'

const secret = process.env.SECRET || "verysecret"

export function set_cookie(req, res) {
    const cookies = new Cookies(req, res, { keys: [ secret ] })
    var uid = cookies.get('uid', { signed: true })
    if (!uid) {
        uid = uuid();
        cookies.set('uid', uid, { signed: true })
    }
    return uid;
}