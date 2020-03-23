<template>
  <div>
				<multi-list
					componentId="ResourceType"
					dataField='learningResourceType.keyword'
					class="filter"
					title="Lernmaterial"
					selectAllLabel="Alle Lernmaterialien"
					:showFilter="true"
					:showSearch="false"
				/>
</div>
</template>

<script>
export default {
  
}
</script>