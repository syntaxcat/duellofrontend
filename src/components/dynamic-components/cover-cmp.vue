<template>
    <section class="cover-cmp">
        <header>
            <h2>Cover</h2>
            <label>
                <icon-base @click="closeModal" iconName="x"></icon-base>
            </label>
        </header>
        <hr />
        <div>
            <p>Size</p>
            <div class="cover-container">
                <div :style="coverStyle" @click="setCoverStyle('solid')" class="cover-prev"></div>
                <div :style="coverStyle" @click="setCoverStyle('background')" class="cover-prev"></div>
            </div>
        </div>
        <hr />
        <div v-if="colors">
            <p>Colors</p>
            <div class="color-container">
                <div
                    @click="setCoverColor(color.color)"
                    class="color-boxes"
                    v-for="color in colors"
                    :key="color.id"
                    :style="'background-color:' + color.color"
                ></div>
            </div>
        </div>
        <div>
            <p>Attachments</p>
        </div>
        <div v-if="imgs">
            <p>Pohots:</p>
            <div class="img-container">
                <div
                    @click="setCoverImg(img.url)"
                    class="img-boxes"
                    v-for=" img in imgs"
                    :key="img._id"
                >
                    <img :src="img.url" />
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import iconBase from '../icon-base.vue'
export default {
    props: {
        task: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            currColor: '',
            currImg: '',
        }
    },
    computed: {
        colors() {
            // console.log(this.$store.getters.colors)
            return this.$store.getters.colors
        },
        imgs() {
            return this.$store.getters.imgs
        },
        coverStyle() {
            if(this.currImg) return `background-image: url(${this.currImg})`
            return `background-color: ${this.currColor}`
        }
    },
    components: { iconBase },
    methods: {
        closeModal() {
            this.$emit('closeModal')
        },
        setCoverColor(color) {
            console.log(this.currColor, color)
            if (color === this.currColor) {
                this.currColor = ''
                // console.log(this.currColor)
            } else {
                this.currColor = color
            }
            this.currImg = ''
            this.$emit('setCoverColor', this.currColor)
        },
        setCoverImg(imgUrl) {
            if (imgUrl === this.currImg) {
                this.currImg = ''
            } else {
                this.currImg = imgUrl
            }
            this.currColor = ''
            this.$emit('setCoverImg', this.currImg)
        },
        setCoverStyle(coverStyle){
            this.$emit('setCoverStyle', coverStyle)
        }
    },
    async created() {
        this.$store.dispatch('loadDesign')
        console.log(this.task.style.cover)
        this.currColor = this.task.style.cover.color
        this.currImg = this.task.style.cover.imgUrl
    }
};
</script>
