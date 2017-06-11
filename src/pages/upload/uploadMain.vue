<template lang="html">
    <div class="upload-container">
        <label ref="photoWrap" for="camera" :class="photoWrapCls">
            <canvas id="canvas" class="canvas" width="300" height="300"></canvas>
            <input ref="photo" class="pick-photo" id="camera" name="uploadfile" type="file" accept="image/*" capture="camera" @change="photo">
        </label>
        <mt-field class="food-name" placeholder="请输入菜名" v-model="foodName">
        </mt-field>
        <mt-actionsheet
            :actions="actions"
            v-model="sheetVisible">
        </mt-actionsheet>
        <mt-picker :slots="slots" :visibleItemCount="slotVisibleCount" @change="foodType"></mt-picker>
        <mt-button class="save-btn" size="large" type="primary" @click="btnSave">保存</mt-button>
    </div>
</template>

<script>
import ajaxUrl from './ajaxUrl';
import axios from 'axios';
import { Toast } from 'mint-ui';
import fAjax from '@/common/util/fAjax';
import VueRouter from 'vue-router';
import cloudConfig from '../../common/db/cloudConfig';

export default {
    data () {
        return {
            photoStatus: 0,
            actions: [
                {
                    name: '拍照',
                    method() {
                        // alert('拍照')
                    }
                }
            ],
            slots: [
                {
                    flex: 1,
                    values: [
                        '早餐', '午餐', '晚餐'
                    ],
                    className: 'slot1'
                }
            ],
            slotVisibleCount: 1,
            sheetVisible: false,
            foodName: '',
            foodCategory: '',
            imgFormUrl: ajaxUrl.uploadImgUrl,
            imgUuid: ''
        };
    },
    components: {
    },
    computed: {
        photoWrapCls() {
            let cls = 'photo-wrap';
            if (this.photoStatus === 1) {
                cls = cls + ' photo-loading';
            }
            else if (this.photoStatus === 2) {
                cls = cls + ' photo-loaded';
            }
            return cls;
        }
    },
    methods: {
        foodFocus() {
            this.sheetVisible = true;
        },
        foodType(picker, values) {
            this.foodCategory = picker.slots[0].values.findIndex(val => {
                return val === values[0];
            });;
        },
        compress(file) {
            const cvs = document.querySelector('#canvas');
            let dataUrl = cvs.toDataURL('image/jpeg', 0.8);
            return dataUrl;
        },
        photo(e) {
            const self = this;
            const $refs = this.$refs;
            this.photoStatus = 1;
            let reader = new FileReader();
            reader.readAsDataURL($refs.photo.files[0]);
            reader.onload = function () {
                $refs.photoWrap.style.backgroundImage = 'url(' + this.result + ')';
                self.photoStatus = 2;
            }


            let url = `${this.imgFormUrl}?appid=${cloudConfig.appid}`;
            const formData = new FormData();
            formData.append('uploadfile', $refs.photo.files[0]);
            formData.append('appid', cloudConfig.appid);
            axios.post(
                url,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            ).then(res => {
                const {data} = res;
                const [status, fileId , uuid] = data;
                if (status === 'OK') {
                    this.imgUuid = uuid;
                    Toast({
                        message: '图片上传成功',
                        iconClass: 'icon icon-success'
                    });
                }
                else {
                    Toast({
                        message: '图片上传失败',
                        iconClass: 'icon icon-warn'
                    });
                }
            });
        },
        btnSave() {
            fAjax.get(
                ajaxUrl.addFoodUrl,
                {
                    name: this.foodName,
                    foodImg: this.imgUuid,
                    foodType: this.foodCategory
                }
            ).then(data => {
                Toast({
                    message: '添加成功',
                    iconClass: 'icon icon-success',
                    duration: 2000
                });
                setTimeout(() => {
                    var vueRouter = new VueRouter();
                    vueRouter.push({
                        path: '/menu'
                    });
                }, 2000);
            });;
        }
    }
}
</script>

<style lang="less">
.photo-wrap {
    display: inline-block;
    margin: 50px auto;
    height: 120px;
    width: 120px;
    border: 1px dashed #cacaca;
    background: url(./css/img/camera.png) no-repeat center;

    .pick-photo {
        display: block;
        display: none;
    }

    .canvas {
        display: none;
    }
}

.photo-loading {
    background-image: url(./css/img/loading.png);
    background-color: rgba(0, 0, 0, .3);
}

.photo-loaded {
    background-size: cover;
}

.food-name .mint-field-core {
    text-align: center!important;
}

.save-btn {
    width: 90%;
    margin: 20px auto;
}
</style>
