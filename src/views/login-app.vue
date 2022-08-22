<template>
  <section class="login-cmp">
    <div class="logo-container">
      <div class="logo-img"></div>
      <h1>Duello</h1>
    </div>
    <div class="login-container">
      <h2>Log in to Duello</h2>
      <form @submit.prevent="login">
        <input type="text" v-model="user.username" placeholder="Enter username" />
        <input type="text" v-model="user.password" placeholder="Enter password" />
        <input class="submit-btn" type="submit" value="Log in" />
      </form>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },

  methods: {
    async login() {
      this.user.password = this.user.password.toString();
      const user = await this.$store.dispatch({
        type: 'login',
        user: this.user,
      });
      if (user) this.$router.replace('/');
    },
  },
};
</script>
