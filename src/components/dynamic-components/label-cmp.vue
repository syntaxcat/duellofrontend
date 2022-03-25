<template>
  <section class="label-cmp">
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
            <icon-base
              iconName="check"
              v-if="isLabelSelected(label)"
            />
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
  props: ["board", "task"],
  data() {
    return {
      labels: this.board.labels,
    };
  },
  methods: {
    addLabel(label) {
      this.$emit("addLabel", label);
    },
    close() {
      this.$emit("closeLabel");
    },
    isLabelSelected(label) {
      for (let i = 0; i < this.task.labels.length; i++) {
        if (this.task.labels[i].id === label.id) {
          return true;
        }
      }
      return false;
    },
  },
};
</script>
