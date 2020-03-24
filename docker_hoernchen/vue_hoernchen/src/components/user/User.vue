<template>
  <div>
    <b-container fluid class="">
      <h1 style="text-align: center">User Details</h1>
      <hr>
      <p v-if="username">
        Username: {{ username }}
        <br/>
      </p>
      <p>
        Liked Resources:
      </p>
      <ul>
        <li v-for="liked in liked_resources" :key="liked.resource_id">{{ liked }}</li>
      </ul>
    </b-container>
  </div>
</template>

<script>
export default {
  computed: {
    username () {
      return !this.$store.getters.user ? false : this.$store.getters.user.username
    },
    liked_resources () {
      if (!this.$store.getters.liked_resources) {
        return false
      }
      return this.$store.getters.liked_resources
    }
  },
  created () {
    this.$store.dispatch('fetchUser')
  }
}
</script>
