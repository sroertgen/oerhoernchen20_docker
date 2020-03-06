<template>
  <div>
    <b-container fluid class="">
      <h1 style="text-align: center">User Details</h1>
      <hr>
      <p v-if="username">
        Username: {{ username }}
        <br/>
        ID:
      </p>
    </b-container>
  </div>
</template>

<script>
export default {
  computed: {
    username () {
      return !this.$store.getters.user ? false : this.$store.getters.user.username
    }
  },
  created () {
    this.$store.dispatch('fetchUser')
  }
}
</script>
