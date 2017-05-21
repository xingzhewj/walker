/**
 * @file 本地存储脚本
 * @author walker
 */

function setItem(key, value) {
    localStorage.setItem(key, value);
}

function deleteItem(key) {
    localStorage.removeItem(key);
}

function getItem(key) {
    return localStorage.getItem(key);
}

export default {
    setItem,
    deleteItem,
    getItem
};
