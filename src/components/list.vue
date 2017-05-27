<template lang="html">
    <ul class="dish-list">
        <li class="dish-item" v-for="item in list">
            <div class="dish-img">
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
            this.$emit('selectEvent', dishData);
            let tarParent = tar.parentElement;
            if (tarParent.className.indexOf('dish-selected') === -1) {
                tarParent.className = tarParent.className + ' dish-selected';
            }
            else {
                tarParent.className = tarParent.className.replace(/ dish\-selected/g, '');
            }
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
        height: 70px;
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
        position: absolute;
        right: 0;
        top: 0;
        border-top: 15px solid @themeColor;
        border-left: 15px solid transparent;
    }
}
</style>
