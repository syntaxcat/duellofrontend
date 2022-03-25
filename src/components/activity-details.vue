<template>
  <section class="activity" v-if="task && user">
    <div class="header">
      <!-- <img src="../assets/icons/activity.svg" /> -->
      <icon-base class="activity-icon" iconName="real-activity" />
      <div>
        <h3>Activity</h3>
        <button @click="show = !show">{{ showDetails }}</button>
      </div>
    </div>

    <div class="activity-form">
      <!-- <img :src="user.imgUrl" alt="user" /> -->
      <img src="../assets/imgs/background.jpg" alt="user" />

      <form>
        <div class="comment-frame">
          <div class="comment-box">
            <textarea
              type="text"
              placeholder="Write a comment..."
              v-model="comment"
            ></textarea>
            <div class="comment-controls">
              <button :class="['save-comment', isAllowed]">Save</button>

              <div class="comment-box-options">
                <icon-base iconName="paperclip" />
                <icon-base iconName="mention" />
                <icon-base iconName="emoji" />
                <icon-base iconName="cardS" />
              </div>
            </div>
          </div>
        </div>
      </form>
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
  },
  data() {
    return {
      show: true,
      comment: "",
    };
  },
  methods: {},
  computed: {
    showDetails() {
      return this.show ? "Hide details" : "Show details";
    },
    isAllowed() {
      return this.comment ? "allowed" : "";
    },
  },
  components:{iconBase}
};
</script>

<style></style>
