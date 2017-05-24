/**
 * @file ajax通信脚本
 * @author walker
 */

import axios from 'axios';
import auth from '../db/auth';
import cloudConfig from '../db/cloudConfig';

function getAjax(url, params) {
    return axios.get(
        url + '?appid=' + cloudConfig.appid,
        {
            params
        }
    );
}

function postAjax(url, params) {

}

function request(url, params, type) {
    let fun = getAjax;
    if (type === 'post') {
        fun = postAjax;
    }
    return auth.check().then(token => {
        params.token = token;
        return fun(url, params);
    }, err => {

    });
}

export default {
    get(url, params) {
        return request(url, params || {}, 'get');
    },
    post(url, params) {
        request(url, params || {}, 'post');
    }
};
