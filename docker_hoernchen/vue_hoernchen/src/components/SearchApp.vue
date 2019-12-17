<template>
  <div :key="key">
    <reactive-base
    app="hoou,mein_index"
    url="http://localhost/es"
  >

<b-container fluid class="">
<h1 style="text-align:center">🐿️ Docker-hOERnchen 👋</h1>
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
import AddData from './AddData'
import ShowResults from './ShowResults'

	export default {
    data() {
      return {
        // This is used for updatign the index after adding an entry
        key: 0
      };
    },
    components: {
      'app-filter-license': FilterLicense,
      'app-filter-language': FilterLanguage,
      'app-filter-resource-type': FilterResourceType,
      'app-filter-search': FilterSearch,
      'app-filter-source': FilterSource,
      'app-add-data': AddData,
      'app-show-results': ShowResults
    },
    methods: {
      updateKey(key) {
        console.log("UpdateKey got called")
        this.key = key;
        }
    }
  };
</script>