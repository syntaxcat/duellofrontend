<template>
  <section class="members-cmp">
    <header>
      <h2>Members</h2>
    </header>
    <input type="search" placeholder="Search members..." />
    <h2>Board members</h2>
    <ul>
      <li v-for="member in members">
        <div>
          <span>{{ member.fullname }}</span>
          <div>
            <span>{{ member.imgUrl }}</span>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>
<script>
  export default {
    data() {
      return {
         members: [
          {
            _id: "u101",
            fullname: "Tal Tarablus",
            imgUrl: "https://www.google.com",
          },
        ],
      };
    },
  };
</script>
