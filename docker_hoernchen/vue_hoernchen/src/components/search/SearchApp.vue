<template>
  <div :key="key">
    <reactive-base
    :app="indices"
    :url="getHostname()"
    credentials="elastic:changethisinproduction"
  >

<b-container fluid class="">
  <b-row class="text-center">
    <b-col xs="12" sm="12" md="3" lg="3" class="order-md-first order-lg-first">
      <!-- Col 1 Filter -->
      <div class="filters-container">
      <!-- Filters -->
      <app-filter-license></app-filter-license>
      <app-filter-source></app-filter-source>
      <app-filter-language></app-filter-language>
    
      </div>
    </b-col>
  
    <!-- Col 2 Search and Results -->
    <b-col xs="12" sm="12" md="6" lg="6" class="order-first">
     <div class="result-list-container">
        <!-- Search -->
        <app-filter-search></app-filter-search>
        <!-- Results -->
        <app-show-results></app-show-results>
      </div>
    </b-col>

  <!-- Col 3 Filter -->
  <b-col xs="12" sm="12" md="3" lg="3"> 
    <div class="filters-container">
      <app-filter-resource-type></app-filter-resource-type>
      <app-add-data :rerenderKey="key" @rerenderKeyWasSet="updateKey"></app-add-data>
    </div>
  </b-col>
  
  </b-row>
</b-container>


<!-- End -->
</reactive-base>
</div>
</template>

<script>
import FilterLicense from './FilterLicense'
import FilterLanguage from './FilterLanguage'
import FilterResourceType from './FilterResourceType'
import FilterSearch from './FilterSearch'
import FilterSource from './FilterSource'
import AddEntryBox from '../AddEntryBox'
import ShowResults from './ShowResults'

	export default {
    data() {
      return {
        indices: "oer_hoou,oer_oerinfo,mein_index,oer_hhu,oer_openrub,oer_digill,oer_zoerr,oer_tibav,oer_oncampus",
        // This is used for updatign the index after adding an entry
        key: 0,
      };
    },
    components: {
      'app-filter-license': FilterLicense,
      'app-filter-language': FilterLanguage,
      'app-filter-resource-type': FilterResourceType,
      'app-filter-search': FilterSearch,
      'app-filter-source': FilterSource,
      'app-add-data': AddEntryBox,
      'app-show-results': ShowResults
    },
    methods: {
      updateKey(key) {
        console.log("UpdateKey got called")
        this.key = key;
        },
      getHostname: function() {
        console.log("Getting hostname to build elasticsearch url...")
        var ip = location.host;
        if (ip == 'localhost:8080') {
          ip = 'localhost'
        }
        var es_url = "http://" + ip + "/es";
        console.log(es_url);
        return es_url;
      },
    }
  };
</script>
