# Docker-Hoernchen

## Metadata

- Angaben basieren auf [LRMI (Learning Resource Metadata Initiative)](https://www.dublincore.org/specifications/lrmi/lrmi_terms/)

## ToDo's

- [X] Give items a unique id --> used URL as Identifier
- [ ] only add items with logstash if not already present (https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-index_.html#operation-type)
- [ ] Add an "insert to Index"-Function (https://docs.appbase.io/docs/reactivesearch/vue/advanced/Data/)
- [ ] Only import necessary Bootstrap and ReactSearch packages
- [ ] Check Spider isBasedOnUrl-Field

## Connecting ES and Reactive Search

- https://opensource.appbase.io/reactive-manual/getting-started/reactivebase.html

## Multiple database inputs via logstash

- https://stackoverflow.com/questions/37613611/multiple-inputs-on-logstash-jdbc

## Duplicate detection

- logstash Fingerprint vor duplicate detection? (https://www.elastic.co/de/blog/logstash-lessons-handling-duplicates
- https://www.elastic.co/de/blog/efficient-duplicate-prevention-for-event-based-data-in-elasticsearch)

## Database

### Creating a mysql database dump

- `docker exec some-mysql sh -c 'exec mysqldump --all-databases -uroot -p"$MYSQL_ROOT_PASSWORD"' > /some/path/on/your/host/all-databases.sql` 

## Vue Hörnchen

### Ressources

- https://docs.appbase.io/docs/reactivesearch/vue/overview/QuickStart/
- [Getting started guide](https://opensource.appbase.io/reactive-manual/getting-started/reactivebase.html)

### Commands run after project creation

- npm install @appbaseio/reactivesearch-vue
- Bootstrap Vue
- FontAwesome Stuff
- npm install --save vue-resource (for http)

## Nginx Conf

- <https://cli.vuejs.org/guide/deployment.html#docker-nginx>

## Snippets

### Transform data

```
		:transformData="transformMyData"
		/>

</div>
</template>

<script>
export default {
  methods: {
		transformMyData: (list) => {
			console.log(list);
			console.log(list[1].key);
				return [
					{key: "", doc_count: list[0].doc_count},
					{value: "CC_BY_S_A", key: "CC-BY-SA", label:"CC_BY_SA", doc_count: list[1].doc_count},
					{key: "CC-0", doc_count: list[2].doc_count},
					{key: "CC-BY_NC_SA", doc_count: list[3].doc_count},
					{key: "CC_BY_NC_SA", doc_count: list[4].doc_count},
					{key: "CC-BY-SA2", doc_count: list[5].doc_count},
					{key: "CC-BY-NC-ND", doc_count: list[6].doc_count},
					{key: "CC-BY-ND", doc_count: list[7].doc_count},
					{key: "CC-BY", doc_count: list[8].doc_count},
					{key: "CC-BY-2", doc_count: list[9].doc_count},
					{key: "CC-BY-NC2", doc_count: list[10].doc_count},
					{key: "Creative Commons", doc_count: list[11].doc_count},
				];
		}
	}
```