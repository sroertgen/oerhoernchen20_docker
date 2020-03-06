<template>
    <div>
        <b-container>
            <div class="row">
                <div class="col-sm-10">
                  <alert ref="alertref" :message="message"></alert>
                  <h1>Sitemap hinzufügen</h1>
                  <hr>
                  <b-button variant="success" v-b-modal.sitemap-modal>Sitemap hinzufügen</b-button>
                  <br><br>
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">OER-Repo</th>
                        <th scope="col">Sitemap-Url</th>
                        <th scope="col">Erfolgreich eingelesen?</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(sitemap, index) in sitemaps" :key="index">
                        <td>{{ sitemap.name }}</td>
                        <td>{{ sitemap.url }}</td>
                        <td>
                          <span v-if="sitemap.read_in">Eingelesen</span>
                          <span v-else>Nicht eingelesen</span>
                        </td>
                        <td>
                          <div>
                            <b-button-group>
                              <b-button
                                variant="warning"
                                size="sm"
                                @click="editSitemap(sitemap); $bvModal.show('sitemap-update-modal')"
                              >
                              Update
                            </b-button>
                            <b-button
                              variant="danger"
                              size="sm"
                              @click="onDeleteSitemap(sitemap)"
                            >
                              Delete
                            </b-button>
                            </b-button-group>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
            </div>
        </b-container>
        <b-modal
          ref="addSitemapModal"
          id="sitemap-modal"
          title="Add a new Sitemap"
          hide-footer>
          <b-form @submit="onSubmit" @reset="onReset" class="w-100">
            <b-form-group id="form-name-group" label="Name:" label-for="form-name-input">
              <b-form-input id="form-name-input" type="text" v-model="addSitemapForm.name" required placeholder="Enter Name">
              </b-form-input>
            </b-form-group>
            <b-form-group id="form-url-group" label="Url:" label-for="form-url-input">
              <b-form-input id="form-url-input" type="text" v-model="addSitemapForm.url" required placeholder="Bitte Url eingeben">
              </b-form-input>
            </b-form-group>
            <b-form-group id="form-read-group">
              <b-form-checkbox-group v-model="addSitemapForm.read_in" id="form-checks">
                <b-form-checkbox
                  value="true"
                  uncheck-value="false"
                >
                  Read?
                </b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>
            <b-button-group>
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
            </b-button-group>
          </b-form>
        </b-modal>

        <b-modal
          ref="editSitemapModal"
          id="sitemap-update-modal"
          title="Update"
          hide-footer>
          <b-form @submit="onSubmitUpdate" @reset="onResetUpdate" class="w-100">
            <!--
            <b-form-group id="form-name-edit-group"
              label="Name:"
              label-for="form-name-edit-input">
              <b-form-input id="form-name-edit-input"
                type="text"
                v-model="editForm.name"
                required
                placeholder="Enter Name">
              </b-form-input>
            </b-form-group>
            -->
            <b-form-group id="form-url-edit-group"
              label="Url:"
              label-for="form-url-edit-input">
              <b-form-input id="form-url-edit-input"
                type="text"
                v-model="editForm.url"
                required
                placeholder="Enter Url">
              </b-form-input>
            </b-form-group>
            <b-button-group>
              <b-button type="submit" variant="primary">Update</b-button>
              <b-button type="reset" variant="danger">Cancel</b-button>
            </b-button-group>
          </b-form>
        </b-modal>
    </div>
</template>

<script>
import axios from 'axios';
import Alert from '../Alert.vue'

export default {
  data() {
    return {
      sitemaps: [],
      addSitemapForm: {
        name: '',
        url: '',
        read_in: [],
      },
      editForm: {
        name: '',
        url: '',
        read_in: [],
      },
      message: '',
    };
  },
  components: {
    alert: Alert
  },
  methods: {
    getSitemaps() {
      const path = 'http://localhost:5000/sitemaps';
      axios.get(path)
           .then((res) => {
             this.sitemaps = res.data.sitemaps;
           })
           .catch((error) => {
             console.error(error);
           });
    },
    addSitemap(payload) {
      const path = 'http://localhost:5000/sitemap/' + payload.name;
      axios.post(path, payload)
           .then(() => {
             this.getSitemaps();
             this.message = "Sitemap hinzugefügt!";
             this.$refs.alertref.showAlert();
             this.$refs.alertref.variant = "success";
           });
    },
    removeSitemap(payload) {
      const path = 'http://localhost:5000/sitemap/' + payload.name;
      axios.delete(path)
           .then(() => {
             this.getSitemaps();
             this.message = 'Sitemap entfernt!'
             this.$refs.alertref.showAlert();
             this.$refs.alertref.variant = "danger";
           })
           .catch(error => {
             console.error(error);
             this.getSitemaps();
           });
    },
    editSitemap(sitemap) {
      this.editForm = sitemap;
    },
    initForm() {
      this.addSitemapForm.name = '';
      this.addSitemapForm.url = '';
      this.addSitemapForm.read_in = [];
      this.editForm.name = '';
      this.editForm.url = '';
      this.editForm.read_in = [];
    },
    onDeleteSitemap(sitemap) {
      this.removeSitemap(sitemap);
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$refs.addSitemapModal.hide();
      let read_in = false;
      if (this.addSitemapForm.read_in) read_in = true;
      const payload = {
        name: this.addSitemapForm.name,
        url: this.addSitemapForm.url,
        read_in: this.addSitemapForm.read_in,
      };
      this.addSitemap(payload);
      this.initForm();
    },
    onSubmitUpdate(evt) {
      evt.preventDefault();
      this.$refs.editSitemapModal.hide();
      let read_in = false;
      if (this.editForm.read_in) read_in = true;
      const payload = {
        name: this.editForm.name,
        url: this.editForm.url,
        read_in: this.editForm.read_in,
      };
      this.updateSitemap(payload);
    },
    updateSitemap(payload) {
      const path = 'http://localhost:5000/sitemap/' + payload.name;
      axios.put(path, payload)
           .then(() => {
             this.getSitemaps();
             this.message = "Sitemap geupdated!";
             this.$refs.alertref.showAlert();
             this.$refs.alertref.variant = "info";
           })
           .catch((error) => {
             console.error(error);
             this.getSitemaps();
           });
    },
    onReset(evt) {
      evt.preventDefault();
      this.$refs.addSitemapModal.hide();
      this.initForm();
    },
    onResetUpdate(evt) {
      evt.preventDefault();
      this.$refs.editSitemapModal.hide();
      this.initForm();
      this.getSitemaps();
    },
  },
  created() {
    this.getSitemaps();
  },
};
</script>
