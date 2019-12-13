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
        </b-form-group>
    
    <hr>
    <p>Titel: {{entry.name}}</p>
    <p style="white-space: pre">Beschreibung: {{entry.about}}</p>

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
        license: '',
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
      }
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
      console.log(this.entry);
      this.$http.post('http://localhost:9200/mein_index/_doc', this.entry)
        .then(response => {
          console.log(response);
        }, error => {
          console.log(error);
        })
      // I guess this can be improved
      setTimeout(this.rerender, 1500);
    },
  }
}
</script>

<style lang="">
div {
    text-align: left;
  }
</style>
<!-- curl -H "Content-Type:application/json" -XPOST localhost:9200/mein_index/_doc/ -d '{"title":"Test2"}'