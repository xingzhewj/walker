<template lang="html">
    <ul class="dish-list">
        <li class="dish-item" v-for="item in list">
            <div :class="imgClass(item)">
                <img class="dish-img-url" :data-dish="JSON.stringify(item)" v-on:click="selected" :src="item.imgUrl" alt="">
            </div>
            <p class="dish-des">{{ item.name }}</p>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        list: {
            default: [],
            type: Array
        }
    },
    computed: {

    },
    methods: {
        selected(ev) {
            let tar = ev.target;
            let dishData = tar.dataset.dish;
            dishData = JSON.parse(dishData);
            let tarParent = tar.parentElement;
            if (tarParent.className.indexOf('dish-selected') === -1) {
                tarParent.className = tarParent.className + ' dish-selected';
                dishData.isSelected = true;
            }
            else {
                tarParent.className = tarParent.className.replace(/ dish\-selected/g, '');
                dishData.isSelected = false;
            }
            // 出发选中事件
            this.$emit('selectEvent', dishData);
        },
        imgClass(it) {
            let cls = 'dish-img'
            if (it.isSelect) {
                cls += ' dish-selected';
            }
            return cls;
        }
    }
}
</script>

<style lang="less" scoped>
@import "../common/css/vary.less";
.dish-list {
    display: flex;
    padding: 10px;
    flex-wrap: wrap;
    justify-content: space-between;

    .dish-item {
        width: 32%;
        margin-top: 5px;
        position: relative;
        border: 1px solid #d4d4d4;
    }

    .dish-img {
        width: 100%;
        height: 80px;
        background: no-repeat center;
        background-size: cover;
    }

    .dish-img-url {
        width: 100%;
        height: 100%;
    }

    .dish-des {
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        text-align: center;
    }

    .dish-selected::before {
        content: '';
        display: inline-block;
        width: 24px;
        height: 24px;
        position: absolute;
        left: 0;
        top: 0;
        background-image: url(./css/img/select.png);
    }
}
</style>
