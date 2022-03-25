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

      <form>
        <div class="comment-frame">
          <div :class="['comment-box',isShow]">
            <textarea
              type="text"
              placeholder="Write a comment..."
              v-model="comment"
              @click="add = !add"
              @blur="add = !add"
              

            ></textarea>

            <div :class="['comment-controls', isShow]">
              <button :class="['save-comment', isAllowed]">Save</button>

              <div class="comment-box-options">
                <icon-base class="option" @click.stop="log" iconName="paperclip" />
                <icon-base class="option" @click.stop="log" iconName="mention" />
                <icon-base class="option" @click.stop="log" iconName="emoji" />
                <icon-base class="option" @click.stop="log" iconName="cardS" />
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
      add: false
    };
  },
  methods: {
      log(){
          console.log('hi');
      }
  },
  computed: {
    showDetails() {
      return this.show ? "Hide details" : "Show details";
    },
    isAllowed() {
      return this.comment ? "allowed" : "";
    },
    isShow(){
        return this.add ? 'show' : '';
    }
  },
  components:{iconBase}
};
</script>

<style></style>
