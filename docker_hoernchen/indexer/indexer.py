from elasticsearch import Elasticsearch

def connect_elasticsearch():
    _es = None
    _es = Elasticsearch(['elastic:changethisinproduction@elasticsearch:9200'])
    if _es.ping():
        print('Yay Connect')
    else:
        print('Awww it could not connect!')
    return _es

# create index
print("Connecting to Elasticsearch...")
es = connect_elasticsearch()

if not es.indices.exists(index="mein_index"):
  print("Index not there...creating index")
  es.indices.create(index = "mein_index")
else:
  print("Index already exists")
  pass
