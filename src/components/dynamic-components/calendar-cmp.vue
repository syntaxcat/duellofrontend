<template>
  <section class="calendar-cmp">
    <header>
      <h2>Dates</h2>
      <button>
          <img src="../../assets/icons/x.svg" alt="close">
      </button>
    </header>
    <v-date-picker v-model="date" />
    {{date}}
  <button class="save-btn" @click="saveDate">Save</button>
  </section>
</template>
<script>
  import { DatePicker } from "v-calendar";
  export default {
    data() {
      return {
          date: new Date().getTime(),
      }
    },
    methods: {
        saveDate(){
            this.$emit("saveDate", this.date);
        }
    },
    components: {
      DatePicker,
    },
  };
</script>
