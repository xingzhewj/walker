<template lang="html">
    <div class="order-container">
        <mt-header title="点餐" fixed>
            <router-link to="/menu" class="feature-link" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <div class="order-tool">
            <p class="order-title">
                {{ orderTitle }}
                <span class="datepicker-btn" v-on:click="pickTime">{{ pickerValueFormat }}</span>
            </p>
            <mt-datetime-picker
            ref="datePicker"
            type="date"
            v-model="pickerValue"
            year-format="{value}年"
            month-format="{value}月"
            date-format="{value}日"
            @confirm="datePickerFun">
            </mt-datetime-picker>
        </div>
        <mt-tab-container v-model="selected" class="order-body">
            <mt-tab-container-item id="breakFast">
                <menuList @selectEvent="selectDish" :list="breakFastList"></menuList>
            </mt-tab-container-item>
            <mt-tab-container-item id="lunch">
                <menuList @selectEvent="selectDish" :list="lunchList"></menuList>
            </mt-tab-container-item>
            <mt-tab-container-item id="dinner">
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
import ajaxUrl from './ajaxUrl';
import fAjax from '@/common/util/fAjax';
import cloudConfig from '@/common/db/cloudConfig';
import "./css/orderMain.less";

export default {
    components: {
        menuList
    },
    computed: {
        pickerValueFormat() {
            return this.dateFormat(this.pickerValue);
        }
    },
    data() {
        return {
            sqlName: 'selectMenu',
            selected: 'breakFast',
            orderTitle: '早餐',
            breakFastList: [],
            dinnerList: [],
            lunchList: [],
            pickerValue: new Date()
        };
    },
    methods: {
        selectDish(data) {
            var dishType = this.$refs.tabbar.value;
            fAjax.get(ajaxUrl.addFoodUrl, {
                foodId: data.id,
                time: +new Date()
            }).then(data => {
                console.log(data);
            }, err => {
                alert('失败！');
            });
        },
        pickTime() {
            this.$refs.datePicker.open();
        },
        dateFormat(time) {
            return time.toLocaleDateString();
        },
        datePickerFun(time) {
            this.dateFormat(time);
        }
    },
    mounted() {
        fAjax.get(ajaxUrl.menuListUrl, {
            foodType: 0
        }).then(data => {
            fAjax.get(ajaxUrl.foodSelectSqlUrl, {
                name: this.sqlName
            }).then(dt => {
                data[1].forEach(item => {
                    let foodType = item.foodType;
                    let token = localStorage.getItem('token');
                    const temItem = {
                        name: item.name,
                        des: '',
                        id: item.id,
                        imgUrl: ajaxUrl.showImgUrl + '?appid=' + cloudConfig.appid
                            + '&token=' + token + '&uuid=' + item.foodImg
                    };
                    dt[1].filter(it => {
                        if (it.foodId === item.id) {
                            temItem.isSelect = true;
                            return true;
                        }
                    });
                    if (foodType === 0) {
                        this.breakFastList.push(temItem);
                    }
                    else if (foodType === 1) {
                        this.lunchList.push(temItem);
                    }
                    else {
                        this.dinnerList.push(temItem);
                    }
                    console.log(this.breakFastList);
                });
            });
        });
    },
    watch: {
        selected(val, oldVal) {
            switch (val) {
                case 'breakFast':
                    this.orderTitle = '早餐';
                    break;
                case 'lunch':
                    this.orderTitle = '午餐';
                    break;
                case 'dinner':
                    this.orderTitle = '晚餐';
                    break;
                default:
                    this.orderTitle = '早餐';
            }
        }
    }
}
</script>

<style lang="less" scoped>
@import "../../common/css/vary.less";
.order-container {
    .mint-header {
        background-color: @themeColor;
    }
}
.order-tool {
    position: relative;
    top: 40px;
    overflow: hidden;
}
.datepicker-btn {
    float: right;
}
.order-title {
    margin: 10px 5px 0;
    padding: 5px;
    text-align: left;
    background-color: #e4e4e4;
    font-size: 14px;
    border-left: 3px solid @themeColor;
}
.order-body {
    top: 40px;
}
.order-btns {
    border-top: 0.5px solid #e0e0e0;
}
.mint-tab-item.is-selected {
    color: @themeColor!important;
}
</style>
