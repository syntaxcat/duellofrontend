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
      <img :src="user.imgUrl" alt="user" />
      <!-- <img src="../assets/imgs/background.jpg" alt="user" /> -->

      <div :class="['comment-frame', isShow]">
        <div class="comment-box">
          <textarea
            type="text"
            placeholder="Write a comment..."
            ref="textarea"
            v-model="commentToEdit.txt"
            @click="open"
            @blur="close"
          ></textarea>

          <button :class="['save-comment', isAllowed]" @click.stop="save">Save</button>

          <div class="comment-box-options">
            <icon-base class="option" @click="log" iconName="paperclip" />
            <icon-base class="option" @click="log" iconName="mention" />
            <icon-base class="option" @click="log" iconName="emoji" />
            <icon-base class="option" @click="log" iconName="cardS" />
          </div>
        </div>
      </div>
    </div>

    <div class="activity-list">
      <div v-for="comment in taskToEdit.comments" :key="comment.id">
        <comment-cmp :comment="comment" @edit="editComment" @deleteComment="deleteComment(comment.id)" />
      </div>
    </div>
  </section>
</template>

<script>
import { taskService } from '../services/task.service';
import iconBase from './icon-base.vue';
import commentCmp from './comment-cmp.vue';

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
      commentToEdit: taskService.getEmptyComment(),
      add: false,
      isAction: false,
      taskToEdit: { ...this.task },
    };
  },
  created() {
    socketService.on('added-comment', (task) => {
      console.log('got a comment');
      this.taskToEdit = { ...task };
    });
  },
  methods: {
    deleteComment(commentId) {
      this.$emit('deleteComment', commentId);
    },
    editComment(comment) {
      this.$emit('edit', comment, this.task.id);
    },
    log() {
      this.isAction = !this.isAction;
    },
    close() {
      setTimeout(() => {
        if (this.isAction) {
          this.isAction = !this.isAction;
          this.$refs.textarea.focus();
          return;
        }
        this.add = !this.add;
      }, 150);
    },
    open() {
      if (this.add) return;
      this.add = !this.add;
    },
    save() {
      if (!this.commentToEdit.txt) return;
      this.commentToEdit.byMember = {
        id: this.user._id,
        fullname: this.user.fullname,
        imgUrl: this.user.imgUrl,
      };
      this.commentToEdit.createdAt = Date.now();
      this.$emit('save', { ...this.commentToEdit }, this.task.id);
      this.$refs.textarea.blur();
      this.commentToEdit = taskService.getEmptyComment();
      this.commentToEdit.txt = '';
    },
  },
  computed: {
    showDetails() {
      return this.show ? 'Hide details' : 'Show details';
    },
    isAllowed() {
      return this.commentToEdit.txt ? 'allowed' : '';
    },
    isShow() {
      return this.add ? 'show' : '';
    },
  },
  destroyed() {
    socketService.off('added-comment');
  },
  components: { iconBase, commentCmp },
};
</script>

<style></style>
