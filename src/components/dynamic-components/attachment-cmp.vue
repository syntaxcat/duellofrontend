<template>
  <section class="attachment-cmp">
    <header>
      <h2>Attach from…</h2>
      <button @click="close">
        <icon-base iconName="x" />
      </button>
    </header>
    <button class="save-btn" @click="saveDate">Attach</button>
  </section>
</template>
<script>
import iconBase from '../icon-base.vue';
export default {
  props: {},
  data() {
    return {};
  },
  methods: {},
  components: {
    iconBase,
  },
};
</script>
