<template>
  <div>
    <b-container>
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
      <b-button variant="success" v-b-modal.login-modal>Login</b-button>
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
    </b-container>
  <!-- Login Modal  -->
  <b-modal
    ref="showLoginModal"
    id="login-modal"
    title="Login"
    hide-footer>
    <b-form @submit="onSubmit" @reset="onReset" class="w-100">
      <b-form-group id="form-email-group" label="Email:" label-for="form-email-input">
        <b-form-input
          id="form-email-input"
          type="text"
          v-model="login.email"
          required
          placeholder="Email-Adresse">
        </b-form-input>
      </b-form-group>
      <b-form-group id="form-password-group" label="Passwort:" label-for="form-password-input">
        <b-form-input
          id="form-password-input"
          type="password"
          v-model="login.password">
        </b-form-input>
      </b-form-group>
        <br>
        <p align="right">
          <b-button @click="$bvModal.hide('login-modal'); $bvModal.show('register-modal')" variant="success">Registrieren</b-button>
        </p>
      <b-button-group>
        <b-button type="submit" variant="primary">Login</b-button>
        <b-button type="reset" variant="danger">Zurück</b-button>
      </b-button-group>
    </b-form>
  </b-modal>
  <!-- Register Modal -->>
  <b-modal
    ref="showRegisterModal"
    id="register-modal"
    title="Registrieren"
    hide-footer>
    <b-form @submit="onSubmitRegister" @reset="onResetRegister" class="w-100">
      <b-form-group id="form-email-group" label="Email:" label-for="form-email-input">
        <b-form-input
          id="form-email-input"
          type="text"
          v-model="register.email"
          required
          placeholder="Email-Adresse">
        </b-form-input>
      </b-form-group>
      <b-form-group id="form-password-group" label="Passwort:" label-for="form-password-input">
        <b-form-input
          id="form-password-input"
          type="password"
          v-model="register.password">
        </b-form-input>
      </b-form-group>
        <b-form-group id="form-password-group" label="Passwort bestätigen:" label-for="form-password-validate-input">
          <b-form-input
            id="form-password-validate-input"
            type="password"
            v-model="register.passwordValidate">
          </b-form-input>
        </b-form-group>
        <br>
        <p align="right">
          <b-button @click="$bvModal.hide('register-modal'); $bvModal.show('login-modal')" variant="success">Bereits registriert? Login</b-button>
        </p>
      <b-button-group>
        <b-button type="submit" variant="primary">Registrieren</b-button>
        <b-button type="reset" variant="danger">Zurück</b-button>
      </b-button-group>
    </b-form>
  </b-modal>
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
      showLogin: true,
      login: {
        email: '',
        password: ''
      },
      register: {
        email: '',
        password: '',
        passwordValidate: ''
      }
    }
  },
  methods: {
    onShowRegister(evt) {
      console.log("Register button hit");
      evt.preventDefault();
      this.$refs.showLoginModal.hide();
    },
    onReset(evt) {
      evt.preventDefault();
      this.$refs.showLoginModal.hide();
    },
    onResetRegister(evt) {
      evt.preventDefault();
      this.$refs.showRegisterModal.hide();
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$refs.showLoginModal.hide();
      const login_data = {
        email: this.login.email,
        password: this.login.password
      };
      console.log("Login data:", login_data);
    },
    onSubmitRegister(evt) {
      evt.preventDefault();
      // Check if passwords match
      this.$refs.showRegisterModal.hide();
      const register_data = {
        email: this.register.email,
        password: this.register.password,
        passwordValidate: this.register.passwordValidate
      };
      console.log("Register data:", register_data);
    },
  }
}
</script>
