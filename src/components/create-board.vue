<template>
  <section class="create-board">
    <header>
      <div class="header-btn-container">
        <icon-base  @click="closeModal" iconName="x"></icon-base>
        <icon-base iconName="icon-back"></icon-base>
        </div>
      <h2>Create board</h2>
    </header>
    <div class="main-content">
      <div class="board-prev" :style="getPrevStyle">
      <icon-base iconName="board-prev"></icon-base>
    </div>
    <p>Background</p>
    <div class="img-container">
      <div class="img-boxes" v-for="img in imgs" :key="img" @click="setBoardImg(img)">
        <img :src="img" />
      </div>
    </div>
    <div class="color-container">
      <div
        @click="setBoardClr(color.color)"
        v-for="color in colorsPrev"
        :key="color.id"
        class="color-boxes"
        :style="'background-color:' + color.color"
      ></div>
      <button @click="toggleCostumizeModal" class="more-btn">
        <icon-base iconName="more"></icon-base>
      </button>
    </div>
    <p>
      Board title
      <span>*</span>
    </p>
    <form @submit.prevent="create">
      <input ref="myInput" :class="['board-name', isTitle]" type="text" v-model="boardToEdit.title" />
      <h3 v-if="!boardToEdit.title">👋 Board title is required</h3>
      <input class="add-btn" type="submit" value="Create" :disabled="!boardToEdit.title" />
    </form>
    <!-- <img src="../assets/imgs/welcome-img.png" />

    <div class="background-picker">
      <div v-for="background in backgrounds" :key="background">
        <span @click="setBackground(background)">{{ background }}</span>
      </div>
    </div>

    <label for="title">
      Board title
      <input ref="myInput" type="text" id="title" v-model="boardToEdit.title" />
    </label>

    <button @click="create">Create</button>-->
    <!-- <img @click="setBackground(background.src)" :src="background.src"> -->
      </div>
  </section>
  <section class="costumize-modal" v-if="isCostumize">
    <header>
      <div class="header-btn-container">
        <icon-base iconName="x"></icon-base>
      </div>
        <h2>Board background</h2>
    </header>
    <div class="main-content">
      <h3>Photos</h3>
      <h6>See more</h6>
      <div class="img-container">
        <img v-for="img in imgs" :key="img" :src="img"/>
      </div>
        <h3>colors</h3>
        <h6>See more</h6>
      <div class="color-container">
        <div v-for="color in colors" :key="color.color" :style="'background-color:'+color.color" class="color-box"></div>
      </div>
    </div>
  </section>
</template>

<script>
import { boardService } from '../services/board.service';
import { designService } from '../services/design.services';
import iconBase from './icon-base.vue';

export default {
  data() {
    return {
      isCostumize: false,
      boardToEdit: boardService.getEmptyBoard(),
      loggedinUser: null,
      backgrounds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      imgs: null,
      searchImgs: null,
    };
  },
  async created() {
    this.loggedinUser = this.$store.getters.user;
    this.$store.dispatch('loadDesign');
    const imgs = await designService.getImgsLarge(4, 'pastel');
    this.imgs = imgs;
    this.boardToEdit.style.backgroundImg = imgs[0];
  },
  mounted() {
    this.$refs.myInput.focus();
  },
  methods: {
    setBoardClr(color) {
      this.boardToEdit.style.color = color;
      this.boardToEdit.style.type = 'color';
      this.boardToEdit.style.backgroundImg = '';
    },
   async setBoardImg(imgUrl) {
     console.log('dfgldgkl')
      this.boardToEdit.style.backgroundImg = imgUrl;
      this.boardToEdit.style.type = 'img';
      // this.boardToEdit.style.color = '';
      const color = await designService.getAvgColor(imgUrl)
      this.boardToEdit.style.color = color.hex
      this.boardToEdit.style.isDark= color.isDark
      console.log(this.boardToEdit.style)
    },
    closeModal() {
      this.$emit('closeModal');
    },
    create() {
      // console.log(this.boardToEdit)
      this.boardToEdit.createdBy = this.loggedinUser;
      this.boardToEdit.members.unshift(this.loggedinUser)
      this.$emit('create', { ...this.boardToEdit });
    },
    toggleCostumizeModal(){
      this.isCostumize = !this.isCostumize
    }
  },
  computed: {
    colors() {
      return this.$store.getters.colors;
    },
    colorsPrev() {
      if (!this.boardToEdit) return;
      return JSON.parse(JSON.stringify(this.$store.getters.colors)).splice(0, 5);
    },
    getPrevStyle() {
      if (!this.boardToEdit) return;
      if (this.boardToEdit.style.type === 'color') {
        return `background-color: ${this.boardToEdit.style.color};`;
      } else return `background-image: url(${this.boardToEdit.style.backgroundImg});`;
    },
    isTitle() {
      if (!this.boardToEdit.title) return 'no-title';
    },
  },
  components: { iconBase },
};
</script>

<style></style>
