/**
 * @file ajax通信脚本
 * @author walker
 */

import axios from 'axios';
import jQuery from 'jquery';
import auth from '../db/auth';
import cloudConfig from '../db/cloudConfig';

function success(result, res) {
    const {data} = res;
    if (data[0] === 'OK') {
        result.resolve(data.splice(1));
    }
    else {
        result.reject(res);
    }
}

function fail(result, res) {
    result.reject(res);
}

function request(url, params, type) {
    let result = jQuery.Deferred();
    auth.check().then(token => {
        params.token = token;
        let ajaxLoading = null;
        if (type === 'get') {
            ajaxLoading = axios.get(
                url + '?appid=' + cloudConfig.appid,
                {
                    params
                }
            );
        }
        else {
            ajaxLoading = axios.post(
                url + '?appid=' + cloudConfig.appid,
                {
                    params
                }
            );
        }
        ajaxLoading.then(res => {
            success.bind(this)(result, res);
            return result;
        }, err => {
            fail.bind(this)(result, err);
        });
    }, err => {

    });

    return result;
}

export default {
    get(url, params) {
        return request(url, params || {}, 'get');
    },
    post(url, params) {
        request(url, params || {}, 'post');
    }
};
