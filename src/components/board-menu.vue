<template>
  <section>
    <div class="board-menu-modal">
      <div class="menu-title">
        <h1>{{ menuTitle }}</h1>
        <!-- <img src="../assets/icons/x.svg" /> -->
        <icon-base @click="closeMenu" iconName="x" />
      </div>
      <hr />
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
          <li>
            <icon-base iconName="trello-block" />
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
      <hr />
      <div>
        <icon-base iconName="bolt" />
        <div class="menu-text">
          <h3>Automation</h3>
          <p>Automate cards and more...</p>
        </div>
      </div>
      <hr />
      <div>
        <icon-base iconName="rocket" />
        <div class="menu-text">
          <h3>Power-Ups</h3>
          <p>Google drive and more...</p>
        </div>
      </div>
      <hr />
      <div>
        <icon-base iconName="activity" />
        <div class="menu-text">
          <h3>Activity</h3>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import iconBase from './icon-base.vue';
export default {
  data() {
    return {
      menuTitle: 'Menu',
    };
  },
  components: { iconBase },
  methods: {
    closeMenu() {
      this.$emit('closeMenu');
    },
  },
};
</script>

<style></style>
