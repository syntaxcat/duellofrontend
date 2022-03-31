<template>
  <section class="activity" v-if="task && user">
    <div class="header">
      <icon-base class="activity-icon" iconName="real-activity" />
      <div>
        <h3>Activity</h3>
        <button @click.stop="isFilter = !isFilter">{{ showDetails }}</button>
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

    <!-- <activity-cmp /> -->

    <div class="activity-list">
      <div v-for="content in contentForDisplay" :key="content.id">
        <component
          :is="content.type"
          :comment="content"
          :info="content"
          @edit="editComment"
          @deleteComment="deleteComment(content.id)"
        />
      </div>
    </div>
    <!-- <div class="activity-list">
      <div v-for="comment in taskToEdit.comments" :key="comment.id">
        <comment-cmp :comment="comment" @edit="editComment" @deleteComment="deleteComment(comment.id)" />
      </div>
    </div> -->
  </section>
</template>

<script>
import { taskService } from '../services/task.service';
import { socketService } from '../services/socket.service';
import iconBase from './icon-base.vue';
import commentCmp from './comment-cmp.vue';
import activityCmp from './dynamic-components/activity-cmp.vue';

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
      commentToEdit: taskService.getEmptyComment(),
      add: false,
      isAction: false,
      taskToEdit: { ...this.task },
      isFilter: true,
      mixedContent: [],
      cmpType: '',
    };
  },
  created() {
    this.getContentForDisplay();
    // socketService.on('update', () => {
    //   console.log('yas');
    // });
    socketService.on('update', () => {
      console.log('here');
      // console.log('comments activity', this.task.comments);
      this.getContentForDisplay();
    });
  },
  methods: {
    getContentForDisplay() {
      const activities = this.task.activities.filter((activity) => activity.task.id === this.taskToEdit.id);
      this.mixedContent = this.task.comments.concat(activities).sort((a, b) => b.createdAt - a.createdAt);
    },
    deleteComment(commentId) {
      this.$emit('deleteComment', commentId);
      this.getContentForDisplay();
    },
    editComment(comment) {
      this.$emit('edit', comment, this.task.id);
      this.getContentForDisplay();
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
      this.getContentForDisplay();
    },
  },
  computed: {
    showDetails() {
      return this.isFilter ? 'Show details' : 'Hide details';
    },
    isAllowed() {
      return this.commentToEdit.txt ? 'allowed' : '';
    },
    isShow() {
      return this.add ? 'show' : '';
    },
    contentForDisplay() {
      if (!this.isFilter) return this.mixedContent;
      return this.mixedContent.filter((content) => !content.action).sort((a, b) => b.createdAt - a.createdAt);
    },
  },
  components: { iconBase, commentCmp, activityCmp, activityCmp },
};
</script>
