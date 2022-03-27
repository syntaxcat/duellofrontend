<template>
  <section class="attachment-cmp">
    <header>
      <h2>Attach from…</h2>
      <button @click="close">
        <icon-base iconName="x" />
      </button>
    </header>
    <div class="upload-container">
      <label for="uploadImg">
        Computer
        <input id="uploadImg" type="file" @change="onUploadImg" hidden />
      </label>
    </div>
    <div class="attach-link-container">
      <h2>Attach a link</h2>
      <input type="text" name="" id="" placeholder="Paste any link here..." />
      <button class="attach-btn" @click="attachLink">Attach</button>
    </div>
  </section>
</template>
<script>
import iconBase from '../icon-base.vue';
import { uploadImg } from '../../services/imgUpload.service.js';
export default {
  props: {},
  data() {
    return {};
  },
  methods: {
    async onUploadImg(ev) {
      const res = await uploadImg(ev);
      this.$emit('saveImg', res.url);
    },

    close() {
      this.$emit('closeAttachment');
    },
  },
  components: {
    iconBase,
  },
};
</script>
