<template>
  <div>
  <b-navbar type="light" variant="fadeds">
    <b-navbar-brand tag="h1" class="mb-0" to="/" >🐿️ Docker-hOERnchen 👋</b-navbar-brand>
    <b-navbar-nav class="ml-auto">
      <!-- Metadaten-Statistik Button -->
      <router-link
        v-if="this.$route.path != '/viewStats'"
        tag="b-button"
        :to="{name: 'ViewStats'}"
        >Metadaten-Statistik</router-link>
      <!-- AddSitemap Button -->
      <router-link
        v-if="this.$route.path != '/addSitemap'"
        tag="b-button"
        :to="{name: 'AddSitemap'}"
        >Sitemap hinzufügen</router-link>
      <!-- Login-Button -->
      <router-link
        v-if="(loggedIn == false) && (this.$route.path != '/login') && showLogin"
        tag="b-button"
        :to="{name: 'ViewStats'}"
        >Login (not working, for testing...)
        </router-link>
        <router-link
          v-if="this.$route.path != '/' "
          tag="b-button"
          :to="{name: 'SearchApp'}"
          >Zurück
        </router-link>
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
import ViewStats from './metadata/ViewStats.vue';
import AddSitemap from './addSitemap/AddSitemap.vue';
import SearchApp from './SearchApp.vue';

export default {
  data() {
    return {
      loggedIn: false,
      showLogin: false,
    }
  },
}
</script>
