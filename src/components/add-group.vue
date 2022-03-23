<template>
  <section class="add-group">

    <button @click="openForm" >
      <img src="../assets/icons/plus.svg" alt="add list" />
      <span>Add another list</span>
    </button>

    <form @submit.prevent="addList">
      <input type="text" placeholder="Enter list title..." />
      <button type="submit">Add list</button>

      <button @click="closeForm">
        <img src="../assets/icons/x.svg" alt="close form" />
      </button>
    </form>
  </section>
</template>

<script>
export default {

};
</script>

<style>
form{
    border: 1px solid rgb(0, 0, 0);
    padding: 10px;
    width: 15rem;
}
</style>
