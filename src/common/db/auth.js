/**
 * @file 聚云服务器权限校验脚本
 * @author walker
 */

import fAjax from '../util/fAjax';
import cloudConfig from './cloudConfig';
import axios from 'axios';

const authUrl = 'http://v2.mashupcloud.cn/developer/auth.do';

function auth() {
    const params = {
        appkey: cloudConfig.appkey,
        appsecret: cloudConfig.appsecret
    };
    return axios.get(authUrl, {
        params: params
    });
}

function check() {
    return new Promise(function(resolve, reject) {
        const token = localStorage.getItem('token');
        if (token) {
            resolve(token);
        }
        else {
            auth().then(res => {
                const {data} = res;
                if (data[0] === 'OK') {
                    let token = data[1];
                    localStorage.setItem('token', token);
                    resolve(token);
                }
            }).catch(err => {
                reject(err);
            });
        }
    });
}

export default {
    check
};
