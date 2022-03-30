<template>
  <section class="giphy-cmp">
    <header>
      <h2>Attach GIF</h2>
      <button @click="close">
        <icon-base iconName="x" />
      </button>
    </header>
    <h2>Search</h2>
    <input v-model="searchTerm" type="text" placeholder="Search giphy..." />
    <div class="giphy-container">
      <button @click="search">Search</button>
      <img src="../../assets/icons/Poweredby_100px-White_VertLogo.png" />
    </div>
    <div class="gif-options">
      <img @click="select(url)" v-for="url in urls" :key="url" :src="url" alt="" />
    </div>
  </section>
</template>
<script>
import iconBase from '../icon-base.vue';
import { giphyService } from '../../services/giphy.service';

export default {
  data() {
    return {
      urls: [],
      searchTerm: '',
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    select(url) {
      this.$emit('setCoverImg', url);
    },
    async search() {
      const res = await giphyService.search(this.searchTerm);
      this.urls = res;
    },
  },
  async created() {
    const res = await giphyService.getTrending();
    this.urls = res;
  },

  components: {
    iconBase,
  },
};
</script>
