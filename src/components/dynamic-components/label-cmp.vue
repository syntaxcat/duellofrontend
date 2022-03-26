<template>
  <section v-if="editingLabel" class="label-cmp">
    <header>
      <button class="back-btn" @click="goBack">
        <icon-base iconName="chevron-left" />
      </button>
      <h2>Change label</h2>
      <button @click="close">
        <icon-base iconName="x" />
      </button>
    </header>
    <div class="main-content">
      <h2>Name</h2>
      <input type="text" v-model="editingLabel.title" />
      <h2>Select a color</h2>
      <ul class="color-options">
        <li v-for="option in labelOptions" @click="selectColor(option)" :style="'background-color:' + option">
          <icon-base iconName="check" v-if="editingLabel.color === option" />
        </li>
      </ul>
      <button @click="updateLabel">Save</button>
    </div>
  </section>

  <section v-else class="label-cmp">
    <header>
      <h2>Labels</h2>
      <button @click="close">
        <icon-base iconName="x" />
      </button>
    </header>
    <input type="search" placeholder="Search labels..." v-model="search" />
    <div class="main-content">
      <h2>Labels</h2>
      <ul>
        <li v-for="label in filteredLabels" :key="label.id">
          <div @click="addLabel(label)" class="edit-label" :style="'background-color:' + label.color">
            <span>{{ label.title }}</span>
            <icon-base iconName="check" v-if="isLabelSelected(label)" />
          </div>
          <button @click="edit(label)">
            <icon-base iconName="pencil" />
          </button>
        </li>
      </ul>
    </div>
    <button>Create a new label</button>
  </section>
</template>
<script>
import iconBase from '../icon-base.vue';
export default {
  components: { iconBase },
  props: ['board', 'task'],
  data() {
    return {
      search: '',
      editingLabel: null,
      labelOptions: [
        '#61bd4f',
        '#f2d600',
        '#ff9f1a',
        '#eb5a46',
        '#c377e0',
        '#0079bf',
        '#00c2e0',
        '#51e898',
        '#ff78cb',
        '#344563',
      ],
    };
  },
  methods: {
    selectColor(option) {
      this.editingLabel.color = option;
    },
    updateLabel() {
      this.$emit('updateBoardLabel', {
        ...this.editingLabel.label,
        title: this.editingLabel.title,
        color: this.editingLabel.color,
      });
      this.editingLabel = null;
    },
    goBack() {
      this.editingLabel = null;
    },
    edit(label) {
      this.editingLabel = { label, title: label.title, color: label.color };
    },
    addLabel(label) {
      this.$emit('addLabel', label);
    },
    close() {
      this.$emit('closeLabel');
    },
    isLabelSelected(label) {
      for (let i = 0; i < this.task.labels.length; i++) {
        if (this.task.labelIds[i] === label.id) {
          return true;
        }
      }
      return false;
    },
  },
  computed: {
    filteredLabels() {
      return this.board.labels.filter((label) => label.title.includes(this.search.trim()));
    },
  },
};
</script>
