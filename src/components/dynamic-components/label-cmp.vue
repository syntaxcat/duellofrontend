<template>
  <section class="labels-cmp">
    <header>
      <h2>Labels</h2>
    </header>
    <input type="search" placeholder="Search labels..." />
    <h2>Labels</h2>
    <ul>
      <li v-for="label in labels" :key="label.id">
        <div>
          <span>{{ label.title }}</span>
        </div>
        <button>
          <img src="../../assets/icons/bx-pencil.svg" alt="edit" />
        </button>
      </li>
    </ul>
    <button>Create a new label</button>
  </section>
</template>
<script>
  export default {
    data() {
      return {
        labels: [
          {
            id: "l101",
            title: "Done",
            color: "#61bd4f",
          },
          {
            id: "l102",
            title: "Progress",
            color: "#61bd33",
          },
        ],
      };
    },
  };
</script>
