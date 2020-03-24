<template>
  <div>
    <data-search
      componentId="SearchBar"
      placeholder="Ich suche nach..."
      :showFilter="true"
      filterLabel="Bergriffsuche:"
      :autosuggest="false"
      :dataField="['name', 'about']"
      :URLParams="false"
    />
  </div>
</template>

<script>
export default {
  
}
</script>