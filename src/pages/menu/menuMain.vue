<template lang="html">
    <div class="menu-container">
        <mt-header fixed title="菜谱">
            <router-link to="/order" class="feature-link" slot="right">
                <mt-button icon="search"></mt-button>
            </router-link>
        </mt-header>
        <div class="banner-wrap">
            <mt-swipe :auto="4000">
                <mt-swipe-item>
                    <div class="swipe-img swipe-img-1"></div>
                </mt-swipe-item>
                <mt-swipe-item>
                    <div class="swipe-img swipe-img-2"></div>
                </mt-swipe-item>
                <mt-swipe-item>
                    <div class="swipe-img swipe-img-3"></div>
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div class="body-wrap">
            <div class="dish-menu-wrap">
                <div class="dish-container">
                    <p class="dish-type">
                        早餐
                        <span class="dish-date">{{ breakFastDate }}</span>
                    </p>
                    <list :list="breakFast()"></list>
                </div>
                <div class="dish-container">
                    <p class="dish-type">
                        午餐
                        <span class="dish-date">{{ lunchDate }}</span>
                    </p>
                    <list :list="lunch()"></list>
                </div>
                <div class="dish-container">
                    <p class="dish-type">
                        晚餐
                        <span class="dish-date">{{ dinnerDate }}</span>
                    </p>
                    <list :list="dinner()"></list>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import list from '@/components/list.vue';
import ajaxUrl from './ajaxUrl';
import fAjax from '@/common/util/fAjax';
import cloudConfig from '@/common/db/cloudConfig';
import "./css/menuMain.less";
import '../orderMenu/css/orderMain.less';

export default {
    components: {
        list
    },
    data() {
        return {
            menuList: [],
            sqlName: 'todayMenu',
            imgBasePath: ajaxUrl.getMenuIdUrl,
            breakFastDate: (new Date()).toLocaleDateString(),
            lunchDate: (new Date()).toLocaleDateString(),
            dinnerDate: (new Date()).toLocaleDateString()
        };
    },
    computed: {
    },
    methods: {
        breakFast() {
            let arr = [];
            this.menuList.forEach(item => {
                if (item.type === 0) {
                    arr.push(item);
                }
            });
            return arr;
        },
        lunch() {
            let arr = [];
            this.menuList.forEach(item => {
                if (item.type === 1) {
                    arr.push(item);
                }
            });
            return arr;
        },
        dinner() {
            let arr = [];
            this.menuList.forEach(item => {
                if (item.type === 2) {
                    arr.push(item);
                }
            });
            return arr;
        }
    },
    mounted() {
        fAjax.get(
            ajaxUrl.foodSelectSqlUrl,
            {
                name: this.sqlName,
                pageSize: 50
            }
        ).then(data => {
            const list = data[1];
            this.menuList = [];
            list.forEach(item => {
                let token = localStorage.getItem('token');
                const obj = {
                    name: item.name,
                    type: item.foodType,
                    imgUrl: ajaxUrl.showImgUrl + '?appid=' + cloudConfig.appid
                        + '&token=' + token + '&uuid=' + item.foodImg
                }
                this.menuList.push(obj);
            });
        });
    }
}
</script>

<style lang="less" scoped>
@import "../../common/css/vary.less";
.menu-container {
    .mint-header {
        background-color: @themeColor;
    }
}
.banner-wrap {
    height: 200px;

    .swipe-img {
        height: 100%;
        background: url(./css/img/soup.jpg) no-repeat center;
        background-size: cover;
    }

    .swipe-img-1 {
        background-image: url(./css/img/soup.jpg);
    }

    .swipe-img-2 {
        background-image: url(./css/img/cake.jpg);
    }

    .swipe-img-3 {
        background-image: url(./css/img/pasta.jpg);
    }
}
.body-wrap {
    .feature-list {
        display: flex;
        padding: 10px;
        justify-content: center;
        border: 1px solid #f5f5f5;
    }

    .dish-container {
        border: 1px solid #f5f5f5;
    }

    .dish-type {
        text-align: left;
        padding: 5px;
        background-color: #e4e4e4;
        border-left: 3px solid @themeColor;
        overflow: hidden;
    }

    .dish-date {
        float: right;
    }
}
.banner-bg {
    height: 200px;
}
</style>
