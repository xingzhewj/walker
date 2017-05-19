/**
 * @file indexdb主文件
 * @author walker
 */

define(function (require) {
    var exports = {};

    /**
     * 存储空间中添加数据
     * @method storage
     * @param  {Object} db        已连接的数据库
     * @param  {string} storeName 存储空间名称
     * @param  {Object} data      要存入的数据
     * @return {[type]}           [description]
     */
    function storage(db, storeName, data) {
        var objectStore = db.createObjectStore(
            'life',
            {
                keyPath: 'dy-wj'
            }
        );
        var transaction = db.transaction(storeName, "readwrite");
        var store = transaction.objectStore(storeName);
        store.add(data);
        transaction.oncomplete = function (ev) {
            alert('数据填入完毕!');
        };
    }

    /**
     * 连接数据库
     * @method connectDB
     * @param  {string}  name 数据库名
     * @return {Object}       连接的数据库
     */
    function connectDB(name) {
        var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;
        window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
        window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
        if (!window.indexedDB) {
            alert('浏览器版本过低不支持数据存储，请更换浏览器。如：chrome！');
        }
        //open  ： indexedDB只有这一个方法  打开（数据库名）
        var db;
        var request = indexedDB.open(name, 2);
        // 异步
        request.onsuccess = function(e) {
            
        };
        request.onupgradeneeded = function (ev) {
            db = event.target.result;
            // 创建一个对象存储空间
            var storageName = 'lift';
            var objectStore;
            if(!db.objectStoreNames.contains(storageName)){
                objectStore = db.createObjectStore(
                    storageName,
                    {
                        keyPath: "dy-wj"
                    }
                );
            }
        };
        request.onerror = function (err) {
            alert('数据库连接错误！');
        };
        return db;
    }

    /**
     * indexdb初始化函数
     * @method init
     * @param  {Object} options 初始化的参数
     * @param  {string} options.db db名称
     * @return {[type]}         [description]
     */
    exports.init = function (options) {
        
    };

    return exports;
});
