<template>
  <section class="home-page">
    <mainHeader />
    <h1>Home page</h1>
  </section>
</template>

<script>
  import mainHeader from "../components/main-header.vue";
  export default { 
    data(){
      return {
        loggedinUser: null
      }
    },
    async created(){
      const user = await this.$store.dispatch('loadUser')
      if(!user) this.$router.push('/welcome')
    },
    components: {
       mainHeader 
       } 
    }
</script>
