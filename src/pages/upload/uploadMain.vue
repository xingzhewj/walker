<template lang="html">
    <div class="upload-container">
        <label for="camera" class="photo-wrap">
            <input class="pick-photo" id="camera" type="file" accept="image/*" capture="camera">
        </label>
        <mt-button class="save-btn" size="large" type="primary">保存</mt-button>
    </div>
</template>

<script>
export default {
    components: {
    },
    methods: {
        btnSave() {

        }
    }
}
</script>

<style lang="less" scoped>
.photo-wrap {
    display: inline-block;
    margin: 50px auto;
    height: 120px;
    border: 1px solid #cacaca;
    background: url(./css/img/camera.png) no-repeat center;
    background-size: 48px;

    .pick-photo {
        display: block;
        height: 100%;
        width: 120px;
        visibility: hidden;
    }
}

.save-btn {
    width: 90%;
    margin: 0 auto;
}
</style>
