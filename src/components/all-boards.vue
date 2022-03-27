<template>
  <section class="all-boards">
    <div class="starred">
      <div class="all-board-header">
        <icon-base iconName="star" class="board-icon" />
        <h3>Starred boards</h3>
      </div>

      <div class="boards-container">
        <ul>
          <!-- <li v-for="board in boards" :key="board._id">
              <a :href="'/board/' + board._id" class="board-title"></a>
            </li> -->
        </ul>
      </div>
    </div>

    <div class="recently-viewed">
      <div class="all-board-header">
        <icon-base iconName="trello-clock" class="board-icon" />
        <h3>Recently viewed</h3>
      </div>

      <div class="boards-container">
        <ul>
          <li v-for="board in boards" :key="board._id">
            <a :href="'/board/' + board._id" class="board-title" :style="{backgroundImage: 'url(' + board.style.backgroundImg + ')'}"></a>
          </li>
        </ul>
      </div>
    </div>
    <div class="workspace">

    </div>
  </section>
</template>

<script>
import iconBase from './icon-base.vue';

export default {
  props: {
    boards: {
      type: Array,
      required: true,
    },
  },
  components: { iconBase },
};
</script>

<style></style>
