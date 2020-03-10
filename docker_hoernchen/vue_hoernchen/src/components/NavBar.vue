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
      <b-button
        v-if="!auth"
        variant="success" 
        v-b-modal.login-modal>Login</b-button>
      <b-nav-item-dropdown text="User" v-if="auth" right>
        <!-- Using 'button-content' slot -->
        <b-dropdown-item to="/user">Profile</b-dropdown-item>
        <b-dropdown-item @click="onLogout" to="/">Sign Out</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
  <alert ref="alertref" :message="message"></alert>
    </b-container>

  <!-- Login Modal  -->
  <b-modal
    ref="showLoginModal"
    id="login-modal"
    title="Login"
    hide-footer>
    <b-form @submit="onSubmitLogin" @reset="onReset" class="w-100">
      <b-form-group id="form-username-group" label="Username:" label-for="form-username-input">
        <b-form-input
          id="form-username-input"
          type="text"
          v-model="login.username"
          required
          placeholder="Username">
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

  <!-- Register Modal -->
  <b-modal
    ref="showRegisterModal"
    id="register-modal"
    title="Registrieren"
    hide-footer>
    <b-form @submit="onSubmitRegister" @reset="onResetRegister" class="w-100">
      <b-form-group id="form-username-group" label="Username:" label-for="form-username-input">
        <b-form-input
          id="form-username-input"
          type="text"
          v-model="register.username"
          required
          placeholder="Username">
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
import SearchApp from './search/SearchApp.vue';
import Alert from './Alert.vue'
import axios from 'axios';
import routes from '../routes'

export default {
  data() {
    return {
      auth: null,
      user: '',
      login: {
        username: '',
        password: ''
      },
      register: {
        username: '',
        password: '',
        passwordValidate: ''
      },
      message: ''
    }
  },
  components: {
    alert: Alert
  },
  methods: {
    initForm() {
      this.login.username = '';
      this.login.password = '';
      this.register.username = '';
      this.register.password = '';
      this.register.passwordValidate = '';
    },
    showMessage(message_data) {
      if (message_data == "success") {
        this.message = "Login erfolgreich!"
        this.$refs.alertref.showAlert();
        this.$refs.alertref.variant = "success";
      } else if (message_data == "unauthorized") {
        this.message = "Unautorisierter Zugriff!"
        this.$refs.alertref.showAlert();
        this.$refs.alertref.variant = "warning";
      } else if (message_data == "logout") {
        this.message = "Logout erfolgreich!"
        this.$refs.alertref.showAlert();
        this.$refs.alertref.variant = "warning";
      }
    },
    onLogout() {
      this.$store.dispatch('logout').then(() => {
        this.auth = this.$store.state.auth;
        this.showMessage(this.$store.state.message)
      });
    },
    onShowRegister(evt) {
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
    onSubmitLogin(evt) {
      evt.preventDefault();
      this.$refs.showLoginModal.hide();
      const login_data = {
        username: this.login.username,
        password: this.login.password
      };
      this.$store.dispatch('login', login_data).then(() => {
        this.auth = this.$store.state.auth;
        this.showMessage(this.$store.state.message)
      })
      this.initForm();
    },
    onSubmitRegister(evt) {
      evt.preventDefault();
      this.$refs.showRegisterModal.hide();
      const register_data = {
        username: this.register.username,
        password: this.register.password,
      };
      if (register_data.password == this.register.passwordValidate) {
        this.registerUser(register_data);
      } else {
        // TODO show an error message
        console.error("Passwords do not match");
      }
      this.initForm();
    },
    registerUser(register_data) {
      this.$store.dispatch('register', register_data)
    },
  },
  mounted() {
  }
} 
</script>
