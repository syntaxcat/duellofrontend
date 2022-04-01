<template>
  <section>
    <div :class="['board-menu-modal', isNewFrame]">
      <div :class="['menu-title', isNewFrame]">
        <icon-base class="back-btn" @click="backToMenu" iconName="chevron-left" />
        <h3>{{ menuTitle }}</h3>
        <icon-base class="close-btn" @click="closeMenu" iconName="x" />
      </div>

      <div class="main-container" v-if="!isActivity && !isBcSelect">
        <div class="board-menu-costumize">
          <ul>
            <li>
              <div class="about-board navigation-item">
                <icon-base iconName="trello-block" />
                <div class="menu-text">
                  <h3>About this Board</h3>
                  <p>Add a description to you board</p>
                </div>
              </div>
            </li>
            <li class="navigation-item" @click="toggleBcSelect">
              <img v-if="boardStyle.type === 'img'" :src="boardStyle.backgroundImg" />
              <div class="menu-text">
                <h3>Change Backround</h3>
              </div>
            </li>
            <li class="navigation-item">
              <icon-base iconName="sticker" />
              <div class="menu-text">
                <h3>Stickers</h3>
              </div>
            </li>
            <li class="navigation-item">
              <icon-base iconName="more" />
              <div class="menu-text">
                <h3>more</h3>
              </div>
            </li>
          </ul>
          <hr />
        </div>
        <div class="menu-text">
          <div class="header navigation-item" @click="isActivity = !isActivity">
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
      <bcg-menu/>
      <activity-menu :list="contentForDisplay" @change="changeContent" />
    </div>
  </section>
</template>

<script>
import iconBase from './icon-base.vue';
import commentCmp from './comment-cmp.vue';
import activityCmp from './dynamic-components/activity-cmp.vue';
import activityMenu from './side-menu/activity-menu.vue';
import bcgMenu from './side-menu/bcg-menu.vue';

export default {
  data() {
    return {
      onlyComments: false,
      mixedContent: [],
      isBcSelect: false,
      isActivity: false,
    };
  },
  async created() {
    await this.$store.dispatch({ type: 'getComments' });
    await this.$store.dispatch({ type: 'getActivities' });
    this.getContentForDisplay();
  },
  components: { iconBase, commentCmp, activityCmp, activityMenu, bcgMenu },
  methods: {
    closeMenu() {
      this.$emit('closeMenu');
    },
    getContentForDisplay() {
      const activities = this.activities;
      this.mixedContent = this.comments.concat(activities).sort((a, b) => b.createdAt - a.createdAt);
    },
    toggleBcSelect() {
      this.isBcSelect = !this.isBcSelect;
    },
    backToMenu() {
      this.isActivity = false;
      this.isBcSelect = false;
    },
    changeContent() {
      this.onlyComments = !this.onlyComments;
    },
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
    boardStyle() {
      console.log(this.$store.getters.boardStyle);
      return this.$store.getters.boardStyle;
    },
    isNewFrame() {
      if (this.isActivity) return 'open-activity';
      if (this.isBcSelect) return 'open-bcColor';
      return '';
    },
    menuTitle() {
      if (this.isActivity) return 'Activity';
      if (this.isBcSelect) return 'Change background';
      return 'Menu';
    },
  },
};
</script>
