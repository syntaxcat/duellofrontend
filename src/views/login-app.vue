<template>
  <section>
      <form @submit.prevent="login">
          <input type="text" v-model="user.username">
          <input type="text" v-model="user.password">
          <input type="submit" value="log in!">
      </form>
  </section>
</template>

<script>
export default {
    data(){
        return{
            user: {
                _id: 'u101',
                username: 'user',
                password: 123,
            }
        }
    },
    methods:{
       async login(){
            const user = await this.$store.dispatch({type:'login', user: this.user})
            console.log(user)
            if(user) this.$router.replace('/')
        }
    }
}
</script>

<style>

</style>