<template>
  <section>
    <div class="board-menu-modal">
      <div class="menu-title">
        <h1>{{ menuTitle }}</h1>
        <!-- <img src="../assets/icons/x.svg" /> -->
        <icon-base @click="closeMenu" iconName="x" />
      </div>
      <!-- <hr /> -->

      <div class="board-menu-costumize">
        <ul>
          <li>
            <div class="about-board">
              <icon-base iconName="trello-block" />
              <div class="menu-text">
                <h3>About this Board</h3>
                <p>Add a description to you board</p>
              </div>
            </div>
          </li>
          <li @click="toggleBcSelect">
            <img v-if="boardStyle.type==='img'" :src="boardStyle.backgroundImg" />
            <div class="menu-text">
              <h3>Change Backround</h3>
            </div>
          </li>
          <li>
            <icon-base iconName="sticker" />
            <div class="menu-text">
              <h3>Stickers</h3>
            </div>
          </li>
          <li>
            <icon-base iconName="more" />
            <div class="menu-text">
              <h3>more</h3>
            </div>
          </li>
        </ul>
      </div>
      <!-- <hr /> -->
      <!-- <div>
        <icon-base iconName="bolt" />
        <div class="menu-text">
          <h3>Automation</h3>
          <p>Automate cards and more...</p>
        </div>
      </div> -->
      <!-- <hr /> -->
      <!-- <div>
        <icon-base iconName="rocket" />
        <div class="menu-text">
          <h3>Power-Ups</h3>
          <p>Google drive and more...</p>
        </div>
      </div>
      <hr /> -->
      <div class="menu-text">
        <div class="header">
          <icon-base iconName="real-activity" />
          <h3>Activity</h3>
        </div>
        <div class="activity-list">
          <div v-for="content in contentForDisplay" :key="content.id">
            <component :is="content.type" :comment="content" :info="content" :isMenu="true" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import iconBase from './icon-base.vue';
import commentCmp from './comment-cmp.vue';
import activityCmp from './dynamic-components/activity-cmp.vue';
import designService from '../services/design.services.js'

export default {
  data() {
    return {
      menuTitle: 'Menu',
      onlyComments: false,
      mixedContent: [],
      isBcSelect: false
    };
  },
  async created() {
    await this.$store.dispatch({ type: 'getComments' });
    this.getContentForDisplay();
  },
  components: { iconBase, commentCmp, activityCmp },
  methods: {
    closeMenu() {
      this.$emit('closeMenu');
    },
    getContentForDisplay() {
      const activities = this.activities;
      this.mixedContent = this.comments.concat(activities).sort((a, b) => b.createdAt - a.createdAt);
      console.log(this.mixedContent);
    },
    toggleBcSelect(){
      this.isBcSelect = !this.isBcSelect
    }
  },
  computed: {
    comments() {
      return this.$store.getters.comments;
    },
    activities() {
      return this.$store.getters.activities;
    },

    contentForDisplay() {
      if (!this.onlyComments) return this.mixedContent;
      return this.mixedContent.filter((content) => !content.action).sort((a, b) => b.createdAt - a.createdAt);
    },
      boardStyle(){
        console.log(this.$store.getters.boardStyle)
        return this.$store.getters.boardStyle
      }
  },
};
</script>
