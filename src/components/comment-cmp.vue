<template>
  <section class="comment">
    <!-- <img src="../assets/imgs/background.jpg" alt="user" /> -->
    <img :src="commentToEdit.byMember.imgUrl" alt="user" />

    <div class="comment-description">
      <span class="inline-member">{{ commentToEdit.byMember.fullname }}</span>
      <span class="inline-spacer"></span>
      <span class="comment-date">{{ commentToEdit.createdAt }}</span>

      <div class="comment-container" v-if="!isEdit">
        <p>{{ commentToEdit.txt }}</p>
      </div>

      <div class="edit-comment" v-if="isEdit">
        <div class="comment-box">
          <textarea type="text" v-model="commentToEdit.txt"></textarea>

          <button :class="['save-comment']" @click="editComment">Save</button>
          <button class="close-btn" @click="isEdit = !isEdit">
            <icon-base iconName="x" />
          </button>

          <div class="comment-box-options">
            <icon-base class="option" iconName="paperclip" />
            <icon-base class="option" iconName="mention" />
            <icon-base class="option" iconName="emoji" />
            <icon-base class="option" iconName="cardS" />
          </div>
        </div>
      </div>
    </div>

    <div class="comment-actions" v-if="!isEdit">
      <div class="reactions">
        <icon-base iconName="add-reaction"></icon-base>
        <span>-</span>
      </div>

      <div class="actions">
        <button @click.stop="isEdit = !isEdit">Edit</button>
        <span>-</span>
        <button @click.stop="isModal = !isModal">Delete</button>
      </div>
    </div>

    <div class="delete-confirmation-modal" :style="{display: 'block', top: posY + 'px', left: posX + 'px'}">
      <div class="delete-header">
        <span>Delete comment?</span>
        <icon-base class="close-delete" iconName="xs" />
      </div>

      <div>
        <p>Deleting a comment is forever. There is no undo.</p>
        <button @click="setPos">Delete</button>
      </div>
    </div>
  </section>
</template>

<script>
import iconBase from './icon-base.vue';

export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isEdit: false,
      commentToEdit: { ...this.comment },
      posX: null,
      posY: null,
    };
  },
  methods: {
    editComment() {
      if (!this.commentToEdit.txt) return;
      this.commentToEdit.createdAt = Date.now();
      this.$emit('edit', { ...this.commentToEdit });
    },
    deleteComment(id) {},
    setPos(ev) {
        console.log();
      this.posX = ev.clientX;
      this.posY = ev.clientY;
    },
  },
  computed:{},
  components: { iconBase },
};
</script>

<style></style>
