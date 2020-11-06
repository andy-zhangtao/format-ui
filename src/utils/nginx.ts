import { post } from "./request"
import Qs from 'qs'

export function postFormatContent(content: string): Promise<string> {
    return new Promise<string>(function (resolve, reject) {
        post('/transfer', Qs.stringify(
            {
                nginx: content,
            }
        )).then(r => {
            resolve(r.data)
        }).catch(e => {
            reject(e)
        })
    })
}