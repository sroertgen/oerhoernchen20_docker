# Docker-Hoernchen 2.0

This project is a dockerized version of the [oerhoernchen20](https://github.com/programmieraffe/oerhoernchen20) made by [Matthias Andrasch](https://twitter.com/m_andrasch). 
It tries to combine the central OER search engine approach proprosed by Matthias with the [personalized search engine](https://ebildungslabor.de/blog/oersuchtool/) approach proposed by [Nele Hirsch](https://twitter.com/eBildungslabor) as it is also possible to insert ones own data to the search engines index.

The general idea of this prototype is to establish a example pipeline of how a OER search engine could work. 

This **PROTOTYPE** is based on the following technologies all packed into docker-containers (beside the the scapy-crawler):

- **Scrapy**: First OER repositories are crawled using **[Scrapy](http://scrapy.org/)** (currently I only crawled the [HOOU](https://www.hoou.de/ and a bit of [OERinfo](https://open-educational-resources.de/)) more will come. Entries without a proper license are skipped and not stored). The results are stored in a MySQL database.
- **MySQL**: Used to store the results of the crawl.
- **Logstash**: Logstash is regulary checking the MySQL database, if any new items are added or changes are made to existing entries.
- **Elasticsearch**: Elasticsearch is the search engine and indexes the input it gets from Logstash.
- **VueJS**: The WebApp is made with VueJS and using [ReactSearch](https://docs.appbase.io/docs/reactivesearch/vue/overview/QuickStart/) to connect to Elasticsearch. It provides the user interface to make search queries or add items to Elasticsearch. It is deployed using Nginx, which also provides some reverse proxy services to connect the App with the Docker network.

## Run it locally

### OERhörnchen 2.0

- make sure you have git installed (https://www.atlassian.com/git/tutorials/install-git)
- make sure you have [Docker installed](https://docs.docker.com/install/)
- `git clone`
- `cd oerhoernchen20_docker/docker_hoernchen`
- `docker-compose up` this may take a while on the first run as some images will have to be build.
- after a few minutes you should be able to go to <http://localhost> and see your "OERhörnchen 2.0" instance ready (if it still says "Loading entries" you might just have to wait a bit longer)

- (for DockerPros: Don't get confused with the indexer-contaier throwing some errors at the beginning. It is started right at the beginning and looking for Elasticsearch, even if it's not ready yet. It stops throwing errors after a minute or so. Have to fix this, shouldn't be too complicated.)

### Crawler

- make sure you have python3 installed (https://docs.python-guide.org/starting/install3/osx/)
- go to project root
- `cd oer_scrapy`
- `python -m venv oerhoernchen`
- `source oerhoernchen/bin/activate`
- `pip3 install requirements.txt`
- crawler can be run with `scrapy crawl hoou_spider`. It assumes that you have the MySQL database running, so you should run the `docker-compose up` command from before.


## Metadata

- The mapping in Elasticsearch currently uses the LRMI schema as used by the HOOU [LRMI (Learning Resource Metadata Initiative)](https://www.dublincore.org/specifications/lrmi/lrmi_terms/).

## ToDo's

- [ ] Only import necessary Bootstrap and ReactSearch packages in Vue

## Additional notices

### Database

#### Creating a mysql database dump with docker container

- `docker exec some-mysql sh -c 'exec mysqldump --all-databases -uroot -p"$MYSQL_ROOT_PASSWORD"' > /some/path/on/your/host/all-databases.sql`

### Vue Hörnchen

#### Ressources

- https://docs.appbase.io/docs/reactivesearch/vue/overview/QuickStart/
- [Getting started guide](https://opensource.appbase.io/reactive-manual/getting-started/reactivebase.html)

### Multiple database inputs via logstash

- https://stackoverflow.com/questions/37613611/multiple-inputs-on-logstash-jdbc

### Duplicate detection

- logstash Fingerprint vor duplicate detection? (https://www.elastic.co/de/blog/logstash-lessons-handling-duplicates
- https://www.elastic.co/de/blog/efficient-duplicate-prevention-for-event-based-data-in-elasticsearch)


## #Snippets

#### Transform data

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