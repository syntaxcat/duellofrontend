<template>
  <section class="attachment-cmp">
    <header>
      <h2>Attach from…</h2>
      <button @click="close">
        <icon-base iconName="x" />
      </button>
    </header>
    <h2>Attach a link</h2>
    <input type="text" placeholder="Paste any link here..." />
    <button class="attach-btn" @click="AttachLink">Attach</button>
  </section>
</template>
<script>
import iconBase from '../icon-base.vue';
export default {
  props: {},
  data() {},
  methods: {},
  components: {
    iconBase,
  },
};
</script>
