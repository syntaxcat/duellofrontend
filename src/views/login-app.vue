<template>
  <section>
    <form @submit.prevent="login">
      <input type="text" v-model="user.username" />
      <input type="text" v-model="user.password" />
      <input type="submit" value="log in!" />
    </form>
    <form @submit.prevent="signup">
      <input type="text" v-model="newUser.fullname" placeholder="full name" />
      <input type="text" v-model="newUser.username" placeholder="username" />
      <input type="text" v-model="newUser.password" placeholder="password" />
      <input type="submit" value="sign up!" />
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      user: {
        _id: "u101",
        username: "user",
        password: 123,
      },
      newUser: {
        username: "",
        password: "",
        fullname: "",
      },
    };
  },
  methods: {
    async login() {
      const user = await this.$store.dispatch({
        type: "login",
        user: this.user,
      });
      console.log(user);
      if (user) this.$router.replace("/");
    },
    async signup() {
      const user = await this.$store.dispatch({
        type: "signup",
        user: this.newUser,
      });
      console.log(user);
      if (user) this.$router.replace("/");
    },
  },
};
</script>

<style></style>
