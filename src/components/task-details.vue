<template>
  <div @click.self="closeTaskDetails" class="details-bc">
    <div class="task-details" v-if="taskToEdit">
      <div class="task-header-container">
        <button class="details-btn" @click="closeTaskDetails">
          <icon-base iconName="x" />
        </button>

        <div v-if="taskToEdit.style.cover.type" class="cover-container">
          <div class="cover-clr" :style="'background-color:' + taskToEdit.style.cover.color">
            <img class="cover-img" v-if="taskToEdit.style.cover.type === 'img'" :src="taskToEdit.style.cover.imgUrl" />
          </div>
        </div>
        <div class="task-details-container">
          <icon-base class="card-header" iconName="cardB" />
          <div>
            <textarea type="text" v-model="taskToEdit.title"></textarea>
            <div class="info-in-group">
              <p>
                in list
                <span>{{ group.title }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="main-container">
        <div class="content-displayed">
          <div class="container">
            <div v-if="taskToEdit.members.length" class="member-list">
              <h2>Memebers</h2>
              <div class="member-container">
                <ul>
                  <li v-for="member in taskToEdit.members" :key="member._id">
                    <img :src="member.imgUrl" />
                  </li>
                </ul>
                <button class="add-btn" @click="selectComponent('member-cmp')">
                  <icon-base iconName="plus" />
                </button>
              </div>
            </div>
            <div class="labels-for-display" v-if="labels.length >= 1">
              <h2>Labels</h2>
              <div class="labels-container">
                <div class="label" v-for="label in labels" :key="label.id" :style="'background-color:' + label.color">
                  {{ label.title }}
                </div>
                <button class="add-btn" @click="selectComponent('label-cmp')">
                  <icon-base iconName="plus" />
                </button>
              </div>
            </div>
            <div class="dueDate" v-if="taskToEdit.dueDate" @click="selectComponent('calendar-cmp')">
              <h2>Due date</h2>
              <span>
                {{ formatDate(taskToEdit.dueDate) }}
                <icon-base iconName="chevron-down" />
              </span>
            </div>
          </div>
          <description-details :taskToEdit="taskToEdit" @save="saveDesc" />
          <attachment-details :attachments="taskToEdit.attachments" />
          <checklist-details
            v-for="checklist in taskToEdit.checklist"
            :key="checklist.id"
            :checklist="checklist"
            @save="updateChecklist"
            @remove="removeChecklist"
          />
          <activity-details
            :task="taskToEdit"
            :user="loggedinUser"
            @save="saveComment"
            @edit="editComment"
            @deleteComment="deleteComment"
          />
        </div>
        <task-details-menu
          :isMember="isMember"
          @joinTask="joinTask"
          @openModal="selectComponent"
          @removeTask="removeTask"
        />
        <div class="dynamic-cmp">
          <component
            :is="cmp"
            :board="board"
            :task="taskToEdit"
            :date="taskToEdit.dueDate"
            @saveDate="saveDate"
            @removeDate="removeDate"
            @addLabel="addLabel"
            @updateBoardLabel="updateBoardLabel"
            @deleteBoardLabel="deleteBoardLabel"
            @createBoardLabel="createBoardLabel"
            @close="hideComponent"
            @addMember="addMember"
            @saveAttachment="saveAttachment"
            @setCoverColor="setCoverColor"
            @setCoverImg="setCoverImg"
            @setCoverStyle="setCoverStyle"
            @addChecklist="addChecklist"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { socketService } from '../services/socket.service';
import { taskService } from '../services/task.service';
import { designService } from '../services/design.services';
import iconBase from './icon-base.vue';
import taskDetailsMenu from '../components/task-details-menu.vue';
import labelCmp from './dynamic-components/label-cmp.vue';
import memberCmp from './dynamic-components/member-cmp.vue';
import checklistCmp from './dynamic-components/checklist-cmp.vue';
import calendarCmp from './dynamic-components/calendar-cmp.vue';
import attachmentCmp from './dynamic-components/attachment-cmp.vue';
import descriptionDetails from './description-details.vue';
import activityDetails from './activity-details.vue';
import attachmentDetails from '../components/attachment-details.vue';
import checklistDetails from './checklist-details.vue';
import coverCmp from './dynamic-components/cover-cmp.vue';
import giphyCmp from './dynamic-components/giphy-cmp.vue';

export default {
  props: {
    taskId: {
      type: String,
      required: true,
    },
    groupId: {
      type: String,
      required: true,
    },
    boardId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      taskToEdit: null,
      loggedinUser: null,
      group: null,
      savedDate: null,
      cmp: null,
    };
  },
  async created() {
    const user = await this.$store.getters.user;
    this.loggedinUser = user;
    const res = await taskService.getById(this.taskId, this.groupId, this.boardId);
    this.taskToEdit = { ...res.task };
    this.group = { ...res.group };
    socketService.emit('details', this.taskToEdit.id);
    // socketService.on('added-comment', this.saveComment);
  },
  methods: {
    removeChecklist(checkId) {
      const idx = this.taskToEdit.checklist.findIndex((list) => list.id === checkId);
      this.taskToEdit.checklist.splice(idx, 1);
      this.$store.dispatch({
        type: 'updateTask',
        taskPartial: JSON.parse(JSON.stringify(this.taskToEdit)),
        groupId: this.groupId,
      });
    },
    updateChecklist(checklist) {
      const idx = this.taskToEdit.checklist.findIndex((list) => list.id === checklist.id);
      this.taskToEdit.checklist.splice(idx, 1, checklist);
      this.$store.dispatch({
        type: 'updateTask',
        taskPartial: JSON.parse(JSON.stringify(this.taskToEdit)),
        groupId: this.groupId,
      });
    },
    async addChecklist(newChecklist) {
      this.taskToEdit.checklist.unshift(newChecklist);
      const group = await this.$store.dispatch({
        type: 'updateTask',
        taskPartial: JSON.parse(JSON.stringify(this.taskToEdit)),
        groupId: this.groupId,
      });
      console.log(group);
      this.hideComponent();
    },
    saveAttachment(attachment) {
      const attachments = [attachment, ...this.taskToEdit.attachments];
      this.$store.dispatch({
        type: 'updateTask',
        taskPartial: { id: this.taskId, attachments },
        groupId: this.groupId,
      });
      this.taskToEdit.attachments = attachments;
    },
    deleteComment(commentId) {
      const comments = this.taskToEdit.comments.filter((com) => com.id !== commentId);
      this.$store.dispatch({
        type: 'updateTask',
        taskPartial: { id: this.taskId, comments },
        groupId: this.groupId,
      });
      this.taskToEdit.comments = comments;
    },
    editComment(comment) {
      const comments = this.taskToEdit.comments.map((com) => {
        if (com.id === comment.id) {
          com = comment;
          return com;
        }
        return com;
      });
      this.$store.dispatch({
        type: 'updateTask',
        taskPartial: { id: this.taskId, comments },
        groupId: this.groupId,
      });
      this.taskToEdit.comments = comments;
    },
    async saveComment(comment, taskId) {
      if (!taskId) {
        taskId = this.taskToEdit.id;
      }
      this.taskToEdit.comments.unshift(comment);
      await this.$store.dispatch({
        type: 'updateTask',
        taskPartial: { id: taskId, comments: [...this.taskToEdit.comments] },
        groupId: this.groupId,
      });
      socketService.emit('added-comment', { ...this.taskToEdit });
    },
    formatDate(dateString) {
      return new Date(dateString).toDateString();
    },
    async joinTask() {
      this.taskToEdit.members.unshift(this.loggedinUser);
      this.$store.dispatch({
        type: 'updateTask',
        taskPartial: JSON.parse(JSON.stringify(this.taskToEdit)),
        groupId: this.groupId,
      });
    },
    saveDesc(task) {
      this.$store.dispatch({
        type: 'updateTask',
        taskPartial: task,
        groupId: this.groupId,
      });
    },
    selectComponent(type) {
      if (this.cmp === type) {
        this.hideComponent();
      } else {
        this.cmp = type;
      }
    },
    hideComponent() {
      this.cmp = null;
    },
    closeTaskDetails() {
      this.$emit('closeTaskDetails');
    },
    setCoverColor(color) {
      this.taskToEdit.style.cover.type = 'color';
      this.taskToEdit.style.cover.color = color;
      this.taskToEdit.style.cover.imgUrl = '';
      if (!this.taskToEdit.style.cover.style && color) this.taskToEdit.style.cover.style = 'solid';
      this.$store.dispatch({
        type: 'updateTask',
        taskPartial: JSON.parse(JSON.stringify(this.taskToEdit)),
        groupId: this.groupId,
      });
    },
    async setCoverImg(imgUrl) {
      this.taskToEdit.style.cover.type = 'img';
      this.taskToEdit.style.cover.imgUrl = imgUrl;
      if (imgUrl)
        this.taskToEdit.style.cover.color = (await designService.getAvgColor(this.taskToEdit.style.cover.imgUrl)).hex;
      else this.taskToEdit.style.cover.color = '';
      if (!this.taskToEdit.style.cover.style && imgUrl) this.taskToEdit.style.cover.style = 'solid';
      this.$store.dispatch({
        type: 'updateTask',
        taskPartial: JSON.parse(JSON.stringify(this.taskToEdit)),
        groupId: this.groupId,
      });
    },
    setCoverStyle(coverStyle) {
      this.taskToEdit.style.cover.style = coverStyle;
      this.$store.dispatch({
        type: 'updateTask',
        taskPartial: JSON.parse(JSON.stringify(this.taskToEdit)),
        groupId: this.groupId,
      });
    },
    async saveDate(date) {
      this.hideComponent();
      this.taskToEdit.dueDate = date;
      try {
        this.$store.dispatch({
          type: 'updateTask',
          taskPartial: this.taskToEdit,
          groupId: this.groupId,
        });
      } catch (err) {
        console.log(err);
      }
    },
    addMember(member) {
      const idx = this.taskToEdit.members.findIndex((member) => member._id === member._id);
      if (idx === -1) {
        this.taskToEdit.members.unshift(member);
      } else {
        this.taskToEdit.members.splice(idx, 1);
      }
      this.$store.dispatch({
        type: 'updateTask',
        taskPartial: JSON.parse(JSON.stringify(this.taskToEdit)),
        groupId: this.groupId,
      });
    },
    async removeDate() {
      this.hideComponent();
      this.taskToEdit.dueDate = null;
      try {
        this.$store.dispatch({
          type: 'updateTask',
          taskPartial: this.taskToEdit,
          groupId: this.groupId,
        });
      } catch (err) {
        console.log(err);
      }
    },
    updateBoardLabel(label) {
      this.$store.dispatch({
        type: 'updateBoardLabel',
        label: label,
        boardId: this.boardId,
      });
    },
    deleteBoardLabel(labelId) {
      this.$store.dispatch({
        type: 'deleteBoardLabel',
        labelId: labelId,
        boardId: this.boardId,
      });
    },
    createBoardLabel(labelData) {
      this.$store.dispatch({
        type: 'createBoardLabel',
        labelData: labelData,
        boardId: this.boardId,
      });
    },
    async addLabel(label) {
      const labelId = label.id;
      if (!this.taskToEdit.labelIds) {
        this.taskToEdit.labelIds = [labelId];
      } else {
        if (this.taskToEdit.labelIds.includes(labelId)) {
          this.taskToEdit.labelIds = this.taskToEdit.labelIds.filter((id) => id !== labelId);
        } else {
          this.taskToEdit.labelIds.unshift(labelId);
        }
      }

      await this.$store.dispatch({
        type: 'updateTask',
        taskPartial: JSON.parse(JSON.stringify(this.taskToEdit)),
        groupId: this.groupId,
      });
    },
    removeTask() {
      this.$store.dispatch({ type: 'removeTask', taskId: this.taskId, groupId: this.groupId });
      this.closeTaskDetails();
    },
  },
  computed: {
    labels() {
      return this.$store.getters.boardLabels.filter((label) => {
        if (!this.taskToEdit.labelIds) return false;
        return this.taskToEdit.labelIds.includes(label.id);
      });
    },
    board() {
      return this.$store.getters.board;
    },
    isMember() {
      return this.taskToEdit.members.some((member) => member._id === this.loggedinUser._id);
    },
    coverStyle() {
      if (this.taskToEdit.style.cover.type === 'color') {
        return `background-color: ${this.taskToEdit.style.cover.color}`;
      }
      if (this.taskToEdit.style.cover.type === 'img') {
        return `background-image: url(${this.taskToEdit.style.cover.imgUrl}); max-height: 160px `;
      }
      return '';
    },
  },
  components: {
    taskDetailsMenu,
    labelCmp,
    memberCmp,
    checklistCmp,
    checklistDetails,
    calendarCmp,
    coverCmp,
    descriptionDetails,
    activityDetails,
    attachmentCmp,
    attachmentDetails,
    iconBase,
    giphyCmp,
  },
};
</script>
