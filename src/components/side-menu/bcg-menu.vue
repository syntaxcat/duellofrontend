<template>
    <section class="bcColor-menu">
        <h1>testtttt</h1>
        <!-- <div class="main-content">
            <input type="text" v-model="imgSearch" placeholder="Photos" />
            <div class="img-container">
                <img v-if="imgs" class="img-box" v-for="img in imgs" :key="img" :src="img" />
            </div>
        </div> -->
    </section>
</template>

<script>
import { designService } from '../../services/design.services';

export default {
    data() {
        return {
            imgSearch: '',
            imgs: null
        };
    },
    async created() {
        const imgs = await designService.getImgs(100, 'desktop wallpaper', 'full')
        this.imgs = imgs
        console.log(imgs)
    },
    methods: {
        async searchImgs() {
            const imgs = await designService.getImgs(100, this.imgSearch, 'full')
            this.imgs = imgs
        }
    },
};
</script>
