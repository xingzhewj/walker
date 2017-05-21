<template lang="html">
    <div class="account-container">
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
                <p class="dish-title">今日菜单</p>
                <div class="dish-container">
                    <p class="dish-type">早餐</p>
                    <list :list="breakFast"></list>
                </div>
                <div class="dish-container">
                    <p class="dish-type">午餐</p>
                    <list :list="lunch"></list>
                </div>
                <div class="dish-container">
                    <p class="dish-type">晚餐</p>
                    <list :list="dinner"></list>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import list from '@/components/list.vue';
import storage from '@/common/db/storage';
import "./css/menuMain.less";
import '../orderMenu/css/orderMain.less';

export default {
    components: {
        list
    },
    data() {
        return {
        };
    },
    computed: {
        breakFast() {
            return JSON.parse(storage.getItem('breakFast') || '[]');
        },
        lunch() {
            return JSON.parse(storage.getItem('lunch') || '[]');;
        },
        dinner() {
            return JSON.parse(storage.getItem('dinner') || '[]');;
        }
    },
    methods: {
    }
}
</script>

<style lang="less" scoped>
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

    .dish-title {
        height: 30px;
        line-height: 30px;
        background-color: #26a2ff;
        color: #fff;
    }

    .dish-container {
        padding: 10px;
        border: 1px solid #f5f5f5;
    }

    .dish-type {
        text-align: left;
        padding: 5px;
        border-left: 3px solid #26a2ff;
    }
}
.banner-bg {
    height: 200px;
}
</style>
