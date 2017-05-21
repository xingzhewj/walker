<template lang="html">
    <div class="order-container">
        <mt-header title="点餐" fixed>
            <router-link to="/menu" class="feature-link" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <mt-tab-container v-model="selected" class="order-body">
            <mt-tab-container-item id="breakFast">
                <p class="order-title">早餐</p>
                <menuList @selectEvent="selectDish" :list="breakFastList"></menuList>
            </mt-tab-container-item>
            <mt-tab-container-item id="lunch">
                <p class="order-title">午餐</p>
                <menuList @selectEvent="selectDish" :list="lunchList"></menuList>
            </mt-tab-container-item>
            <mt-tab-container-item id="dinner">
                <p class="order-title">晚餐</p>
                <menuList @selectEvent="selectDish" :list="dinnerList"></menuList>
            </mt-tab-container-item>
        </mt-tab-container>
        <mt-tabbar v-model="selected" class="order-btns" ref="tabbar">
            <mt-tab-item id="breakFast">
                <img slot="icon" src="./css/img/breakfast.png" alt="">
                早餐
            </mt-tab-item>
            <mt-tab-item id="lunch">
                <img slot="icon" src="./css/img/lunch.png" alt="">
                午餐
            </mt-tab-item>
            <mt-tab-item id="dinner">
                <img slot="icon" src="./css/img/dinner.png" alt="">
                晚餐
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>

<script>
import menuList from '@/components/list.vue';
import config from './config';
import storage from '../../common/db/storage';
import "./css/orderMain.less";

export default {
    components: {
        menuList
    },
    data() {
        return {
            selected: 'breakFast',
            breakFastList: config.breakFast,
            dinnerList: config.dinner,
            lunchList: config.lunch,
            breakDishData: [],
            lunchDishData: [],
            dinnerDishData: []
        };
    },
    methods: {
        selectDish(data) {
            var dishType = this.$refs.tabbar.value;
            switch (dishType) {
                case 'breakFast':
                    this.breakDishData.push(JSON.parse(data));
                    storage.setItem('breakFast', JSON.stringify(this.breakDishData));
                    break;
                case 'lunch':
                    this.lunchDishData.push(JSON.parse(data));
                    storage.setItem('lunch', JSON.stringify(this.lunchDishData));
                    break;
                case 'dinner':
                    this.dinnerDishData.push(JSON.parse(data));
                    storage.setItem('dinner', JSON.stringify(this.dinnerDishData));
                    break;
                default:
            }
        }
    },
    watch: {
        selected(val, oldVal) {
            this.selectDishData = [];
        }
    }
}
</script>

<style lang="less" scoped>
.order-title {
    margin: 10px 5px 0;
    padding: 5px;
    text-align: left;
    background-color: #e4e4e4;
    font-size: 14px;
    border-left: 3px solid #26a2ff;
}
.order-body {
    top: 40px;
}
.order-btns {
    border-top: 1px solid #e0e0e0;
}
</style>
