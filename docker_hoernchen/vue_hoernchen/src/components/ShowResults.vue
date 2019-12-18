<template>
  <div>
    <selected-filters />
    <reactive-list
    componentId="SearchResult"
    dataField="name.keyword"
    :showResultStats="true"
    :pagination="false"
    :pages="5"
    :size="10"
    className="result-list-container"
    loader="Lade Ergebnisse..."
    :react="{and: [
      'License',
      'Language',
      'ResourceType',
      'SearchBar',
      'Source'
      ]
      }"
  >

<!-- Can later maybe be replaced using vue js bootstrap -->


<div slot="renderItem" slot-scope="{ item }" :about="item.url">
  <b-card key="item._id">
    <b-card-img
    :src="item.thumbnail" class="thumbnail rounded float-left" start>
    </b-card-img>
    <b-card-body>
      <b-card-title title-tag="h4">
        <a :href="item.url" target="_blank">{{ item.name }}</a>
      </b-card-title>
      <b-card-text>
        {{ item.about | subStr }}
      </b-card-text>
    </b-card-body>
    <b-card-footer>
      <small class="text-muted">
        Lizenz: {{item.license}} |
        Quelle: {{item.source}} |
        Hinzugefügt am: {{item.date_scraped}}
      </small>
    </b-card-footer>

  </b-card>

  <!-- using LRMI here from HOOU -->
  <div class="hiddenDetails">
    <meta property="name dc:title" :content="item.name">
    <meta property="schema:targetDescription about" :content="item.about">
    <meta property="author dc:creator" :content="item.author">
    <meta property="dc:publisher" :content="item.publisher">
    <meta property=" dc:language inLanguage" :content="item.inLanguage">
    <meta property="schema:accessibilityAPI" :content="item.accessibilityAPI">
    <meta property="schema:accessibilityControl" :content="item.accessibilityControl">
    <meta property="schema:accessibilityFeature" :content="item.accessibilityFeature">
    <meta property="schema:accessibilityHazard" :content="item.accessibilityHazard">
    <meta rel="license" property="schema:license" :content="item.license">
    <meta property="schema:timeRequired" :content="item.timeRequired">
    <meta property="schema:educationalRole" :content="item.educationalRole">
    <meta property="schema:alignmentType" :content="item.alignmentType">
    <meta property="schema:educationalFramework" :content="item.educationalFramework">
    <meta property="schema:targetDescription" :content="item.targetDescription">
    <meta property="schema:targetName" :content="item.targetName">
    <meta property="schema:targetURL" :content="item.targetURL">
    <meta property="schema:educationalUse" :content="item.educationalUse">
    <meta property="schema:typicalAgeRange" :content="item.typicalAgeRange">
    <meta property="schema:interactivitytype" :content="item.interactivityType">
    <meta property="schema:learningResourceType" :content="item.learningResourceType">
    <meta property="schema:isBasedOnUrl" :content="item.isBasedOnUrl">
    <meta property="date_published" :content="item.date_published">
    <meta property="url" :content="item.url">
    <meta property="thumbnail" :content="item.thumbnail">
    <meta property="tags" :content="item.tags">
  </div>
</div>

  </reactive-list>
  </div>
</template>

<script>
export default {
  filters: {
  	subStr: function(string) {
    	return string.substring(0,600) + '...';
        }
  }
}

</script>