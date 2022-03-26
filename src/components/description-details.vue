<template>
  <section class="description">
    <div class="header">
      <!-- <img src="../assets/icons/align-left.svg" /> -->
      <icon-base class="description-icon" iconName="description"></icon-base>
      <h3>Description</h3>
    </div>
    <div class="description-content">
      <div class="fake-textarea" v-if="!addDescription && !taskToEdit.description" @click="addDesc">
        Add a more detailed description...
      </div>
      <div class="fake-textarea description" v-else-if="!addDescription && taskToEdit.description" @click="addDesc">
        {{ taskToEdit.description }}
      </div>

      <div class="real-textarea" v-else>
        <textarea
          type="text"
          ref="addDesc"
          @blur="saveDesc"
          v-model="taskToEdit.description"
          placeholder="Add a more detailed description..."
        ></textarea>

        <div class="actions">
          <button class="save-description" @click="saveDesc">Save</button>
          <button class="close-btn">
            <img src="../assets/icons/x.svg" alt="close" @click="addDescription = !addDescription" />
          </button>
        </div>
      </div>
      
    </div>
  </section>
</template>

<script>
import iconBase from './icon-base.vue';
export default {
  components: { iconBase },
  props: {
    taskToEdit: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      addDescription: false,
    };
  },
  methods: {
    addDesc() {
      this.addDescription = !this.addDescription;
      this.$nextTick(() => this.$refs.addDesc.focus());
    },
    saveDesc() {
      this.$emit('save', { ...this.taskToEdit });
      this.addDescription = !this.addDescription;
    },
  },
};
</script>
