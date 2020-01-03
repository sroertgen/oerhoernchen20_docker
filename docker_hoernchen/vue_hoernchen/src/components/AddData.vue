<template>
  <div>
    <b-card>
      <b-form-group
        label='Eintrag zu "Mein Index" hinzufügen'
        label-size="md"
        label-class="font-weight-bold pt-0"
        class="mb-0">

          <b-form-group
            label="Titel:"
            label-for="name"
            >
            <b-form-input id="name" v-model="entry.name"></b-form-input>
          </b-form-group>

          <b-form-group
            label="Beschreibung:"
            label-for="about"
            >
            <b-form-textarea 
              id="about"
              placeholder="Eine Beschreibung des Eintrags..."
              rows="3"
              v-model="entry.about"></b-form-textarea>
          </b-form-group>

          <b-form-group
            label="Url:"
            label-for="url"
            >
            <b-form-input id="url" v-model="entry.url"></b-form-input>
          </b-form-group>

          <b-form-select v-model="entry.license" :options="options" size="sm" class="mt-3"></b-form-select>

        </b-form-group>
    
    <hr>
    <p>Titel: {{entry.name}}</p>
    <p style="white-space: pre">Beschreibung: {{entry.about}}</p>
    <p>Url: {{entry.url}}</p>
    <div class="mt-3">Lizenz: {{ entry.license }}</div>

    <button @click="postData">URL zu Index "Mein Index" hinzufügen</button>
  </b-card>
  </div>

</template>

<script>
export default {
  props: {
    rerenderKey: {
      type: Number
    }
  },
  data() {
    return {
      entry: {
        name: '',
        about: '',
        author: '',
        publisher: '',
        inLanguage: '',
        accessibilityAPI: '',
        accessibilityControl: '',
        accessibilityFeature: '',
        accessibilityHazard: '',
        license: null,
        timeRequired: '',
        educationalRole: '',
        alignmentType: '',
        educationalFramework: '',
        targetDescription: '',
        targetName: '',
        targetURL: '',
        educationalUse: '',
        typicalAgeRange: '',
        interactivityType: '',
        learningResourceType: '',
        isBasedOnUrl: '',
        date_published : '',
        url : '',
        thumbnail : '',
        tags : '',
        project : '',
        source : 'Mein Index',
        spider : '',
        date_scraped : '',
      },
      options: [
          { value: null, text: 'Bitte eine Lizenz auswählen' },
          { value: 'CC 0', text: 'CC 0' },
          { value: 'CC BY', text: 'CC BY' },
          { value: 'CC BY-SA', text: 'CC BY-SA' },
          { value: 'CC BY-SA-NC', text: 'CC BY-SA-NC' },
          { value: 'CC BY-ND', text: 'CC BY-ND' },
        ]
    };
  },
  methods: {
    rerender: function() {
      let mykey = this.rerenderKey
      mykey ++;
      this.$emit('rerenderKeyWasSet', mykey);
      console.log(mykey);
    },
    postData: function() {
      var url_prefix = ["http://", "https://"];
      if (url_prefix.some(el => this.entry.url.includes(el)) == false) {
        console.log("no given prefix found");
        this.entry.url = "https://" + this.entry.url;
      }
      console.log(this.entry);
      this.$http.post(this.getHostname(), this.entry, {headers: {'Authorization': 'Basic ZWxhc3RpYzpjaGFuZ2V0aGlzaW5wcm9kdWN0aW9u'}})
        .then(response => {
          console.log(response);
        }, error => {
          console.log(error);
        })
      // TODO I guess this can be improved
      setTimeout(this.rerender, 1500);
    },
    getHostname: function() {
        console.log("Getting hostname for post data...")
        var ip = location.host;
        console.log("Hostname is: " + ip);
        var es_url = "http://" + ip + ":9200/mein_index/_doc";
        console.log("Builded url for posting to 'mein_index' is: " + es_url);
        return es_url;
    },
  }
}
</script>

<style lang="">
div {
    text-align: left;
  }
</style>