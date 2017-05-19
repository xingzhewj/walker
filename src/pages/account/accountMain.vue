<template lang="html">
    <div class="account-container">
        <mt-header fixed title="菜谱"></mt-header>
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
        <mt-button type="primary" size="large">提交</mt-button>
    </div>
</template>

<script>
export default {
    components: {
    }
}
</script>

<style lang="less" scoped>
.banner-wrap {
    height: 200px;

    .swipe-img {
        height: 100%;
        background: url(./img/soup.jpg) no-repeat center;
        background-size: cover;
    }
    
    .swipe-img-1 {
        background-image: url(./img/soup.jpg);
    }
    
    .swipe-img-2 {
        background-image: url(./img/cake.jpg);
    }
    
    .swipe-img-3 {
        background-image: url(./img/pasta.jpg);
    }
}
.banner-bg {
    height: 200px;
}
</style>
