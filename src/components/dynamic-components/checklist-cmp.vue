<template>
  <section class="checklist-cmp">
    <header>
      <h2>Add checklist</h2>
    </header>
    <h2>Title</h2>
    <input type="search" />
    <h2>Copy items from…</h2>
    <select>
      <option value="">(none)</option>
      <option value="Option A">Option A</option>
      <option value="Option B">Option B</option>
      <option value="Option C">Option C</option>
    </select>
    <button>Add</button>
  </section>
</template>
<script>
  export default {
    data() {
      return {
        checklists: [
          {
            id: "YEhmF",
            title: "Checklist",
            todos: [
              {
                id: "212jX",
                title: "To Do 1",
                isDone: false,
              },
            ],
          },
        ],
      };
    },
  };
</script>
