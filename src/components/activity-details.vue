<template>
  <section class="activity" v-if="task && user">
    <div class="header">
      <icon-base class="activity-icon" iconName="real-activity" />
      <div>
        <h3>Activity</h3>
        <button @click.stop="show = !show">{{ showDetails }}</button>
      </div>
    </div>

    <div class="activity-form">
      <!-- <img :src="user.imgUrl" alt="user" /> -->
      <img src="../assets/imgs/background.jpg" alt="user" />

      <div :class="['comment-frame', isShow]">
        <div class="comment-box">
          <textarea
            type="text"
            placeholder="Write a comment..."
            v-model="comment"
            @click="add = !add"
          ></textarea>

          <button :class="['save-comment', isAllowed]">Save</button>

          <div class="comment-box-options">
            <icon-base class="option" @click="log" iconName="paperclip" />
            <icon-base class="option" @click="log" iconName="mention" />
            <icon-base class="option" @click="log" iconName="emoji" />
            <icon-base class="option" @click="log" iconName="cardS" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import iconBase from "./icon-base.vue";
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
    isFocus: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      show: true,
      comment: "",
      add: false,
    };
  },
  methods: {
    log() {
      console.log("hi");
    },
  },
  computed: {
    showDetails() {
      return this.show ? "Hide details" : "Show details";
    },
    isAllowed() {
      return this.comment ? "allowed" : "";
    },
    isShow() {
      if (!this.isFocus) return "";
      else if (this.add) return "show";
      else return "";
    },
  },
  components: { iconBase },
};
</script>

<style></style>
