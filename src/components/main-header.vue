<template>
  <section class="main-header">
    <nav>
      <div class="buttons">
        <button>
          <img src="../assets/icons/bxs-grid.svg" alt="grid">
        </button>
        <button>
          <img src="../assets/icons/trello.svg" alt="trello"> 
          <span>Duello</span>
        </button>
        <button>
          Workspaces
          <img src="../assets/icons/bx-chevron-down.svg" alt="down-arrow">
        </button>
        <button>
          Recent
          <img src="../assets/icons/bx-chevron-down.svg" alt="down-arrow">
        </button>
        <button>
          Starred
          <img src="../assets/icons/bx-chevron-down.svg" alt="down-arrow">
        </button>
        <button>
          Templates
          <img src="../assets/icons/bx-chevron-down.svg" alt="down-arrow">
        </button>
        <button class="create-btn">
          Create
        </button>
      </div>
      <div class="information">
        <div class="search-input">
          <img src="../assets/icons/bx-search.svg" alt="search">
          <input type="text" placeholder="Search">
        </div>
        <button>
          <img src="../assets/icons/bx-info-circle.svg" alt="information">
        </button>
        <button class="bell-btn">
          <img src="../assets/icons/bx-bell.svg" alt="alert">
      </button>
      </div>
    </nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/board">Board</router-link>
  </section>
</template>

<script>
  export default {};
</script>
