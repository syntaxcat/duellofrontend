<template>
  <section class="calendar-cmp">
    <header>
      <h2>Dates</h2>
      <button @click="close">
        <icon-base iconName="x" />
      </button>
    </header>
    <v-date-picker
      class="calendar"
      v-model="selectedDate"
    />
    <button
      class="save-btn"
      @click="saveDate"
    >Save</button>
  </section>
</template>
<script>
import { DatePicker } from "v-calendar";
import iconBase from "../icon-base.vue";
export default {
  props: {
    date: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      selectedDate: this.date ?? new Date().getTime(),
    };
  },
  methods: {
    saveDate() {
      this.$emit("saveDate", this.selectedDate);
    },
    close() {
      this.$emit("closeCalendar");
    },
  },
  components: {
    DatePicker,
    iconBase,
  },
};
</script>
