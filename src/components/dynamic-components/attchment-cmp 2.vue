<template>
  <section class="attchment-cmp">
    <header>
      <h2>Attach from…</h2>
      <button @click="close">
        <icon-base iconName="x" />
      </button>
    </header>
    <h2>Attach a link</h2>
    <input type="text" placeholder="Paste any link here..." />
    <button class="remove-btn" @click="removeDate">Attach</button>
  </section>
</template>
<script>
import iconBase from '../icon-base.vue';
export default {
  props: {
    date: {
      type: String,
      required: true,
    },
  },
  data() {},
  methods: {},
  components: {
    iconBase,
  },
};
</script>
