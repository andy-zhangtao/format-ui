import originAxios from 'axios';

const addr = process.env.REACT_APP_SRV_ADDR

const axios = originAxios.create(
    {
        timeout: 20000
    }
)

axios.interceptors.response.use(
    function (response) {
        return Promise.resolve(response);
    },
    function (error) {
        return Promise.reject(error);
    }
);

export function get(url: string, data: any) {
    return axios.get(url)
}

export function post(url: string, data: string) {

    return axios({
        method: 'post',
        url: addr + url,
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        data
    });

}

export default axios