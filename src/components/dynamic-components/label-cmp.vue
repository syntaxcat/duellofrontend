<template>
  <section class="labels-cmp">
    <header>
      <h2>Labels</h2>
      <button @click="close">
        <icon-base iconName="x" />
      </button>
    </header>
    <input
      type="search"
      placeholder="Search labels..."
    />
    <div class="main-content">
      <h2>Labels</h2>
      <ul>
        <li
          v-for="label in labels"
          :key="label.id"
        >
          <div
            @click="addLabel(label)"
            class="edit-label"
            :style="'background-color:'+label.color"
          >
            <span>{{ label.title }}</span>
          </div>
          <label>
            <icon-base iconName="pencil" />
          </label>
        </li>
      </ul>
    </div>
    <button>Create a new label</button>
  </section>
</template>
<script>
import iconBase from "../icon-base.vue";
export default {
  components: { iconBase },
  props: ["board"],
  data() {
    return {
      labels: this.board.labels,
    };
  },
  methods: {
    addLabel(label) {
      console.log(label);
      this.$emit("addLabel", label);
    },
    close() {
      this.$emit("closeLabel");
    },
  },
};
</script>
