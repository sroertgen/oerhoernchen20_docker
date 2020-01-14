<template>
  <div>
    <b-container fluid class="">
      <h1>Login</h1>
      <hr>
      <b-card>
        <b-form-group>
          <b-form-group
            label="Username: "
            label-for="name"
          >
          <b-form-input v-model="user.name" id="name"></b-form-input>
          </b-form-group>

          <b-form-group
            label="Passwort: "
            label-for="password"
            >
          <b-form-input v-model="user.password" id="password"></b-form-input>
          </b-form-group>

          <b-button variant="outline-success" class="my-2 my-sm-0">Login</b-button>

        </b-form-group>
      </b-card>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: '',
        password: '',
      }
    }
  }
}
</script>