<template>
  <div>
  <b-navbar type="light" variant="fadeds">
    <b-navbar-brand tag="h1" class="mb-0" to="/" >🐿️ Docker-hOERnchen 👋</b-navbar-brand>
    <b-navbar-nav class="ml-auto">
      <!-- TODO b-button gegen router-link tauschen -->
      <b-button 
          v-if="(loggedIn == false) && (this.$route.path != '/login') && showLogin" 
          to="/login" variant="outline-success" 
          class="my-2 my-sm-0">Login (not working, for testing...)
        </b-button>
      <b-nav-item-dropdown right v-if="loggedIn">
        <!-- Using 'button-content' slot -->
        <template v-slot:button-content>
          <em>User</em>
        </template>
        <b-dropdown-item to="/user">Profile</b-dropdown-item>
        <b-dropdown-item href="#">Sign Out</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loggedIn: false,
      showLogin: false,
    }
  }
}
</script>