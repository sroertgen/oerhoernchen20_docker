from elasticsearch import Elasticsearch
import requests
import os
from time import sleep

indices = [
    'hoou',
    'oerinfo',
    'hhu',
    'openrub',
    'digill',
    'zoerr',
    'tibav',
]
seperator = ', '

def create_index_pattern_string(index_list):
  ## create string of index pattern
  indices_copy = index_list
  print(f"Indices are: {indices_copy}")
  for i, index in enumerate(indices_copy):
    indices_copy[i] = '"' + index + '"'

  index_pattern_string = seperator.join(indices_copy)
  return index_pattern_string

def connect_elasticsearch():
    _es = None
    _es = Elasticsearch(['elastic:changethisinproduction@elasticsearch:9200'])
    if _es.ping():
        print('Yay Connect')
    else:
        print('Awww it could not connect!')
    return _es


def merge_indices():
  index_pattern_string = create_index_pattern_string(indices)
  print("Merging indices...")
  url = 'http://elasticsearch:9200/_reindex'
  headers = {'content-type': 'application/json',
             'Authorization': 'Basic ZWxhc3RpYzpjaGFuZ2V0aGlzaW5wcm9kdWN0aW9u',
             'kbn-xsrf': 'true'
             }
  data = '{"source": { "index": [' + index_pattern_string + ']},"dest": { "index": "all_together"}}'
  response = requests.post(url, headers=headers, data=data)
  print(f"Response for merge indices is: {response.content}")


def create_dashboard():
  # merge indices
  merge_indices()

  # create index pattern
  print("Creating index patterns...")
  indices = [
      'hoou',
      'oerinfo',
      'hhu',
      'openrub',
      'digill',
      'zoerr',
      'tibav',
      'all_together'
  ]
  for index in indices:
    print(f"Index is: {index}")
    if es.indices.exists(index=index) == False:
      print("Index not there yet...waiting...")
      sleep(10)
    else:
      print("Index there. Curling kibana...")
      url = 'http://kibana:5601/api/saved_objects/index-pattern/' + index
      headers = {'content-type': 'application/json',
                'Authorization': 'Basic ZWxhc3RpYzpjaGFuZ2V0aGlzaW5wcm9kdWN0aW9u',
                'kbn-xsrf': 'true'
                }
      data = '{"attributes": {"title": "' + index + '*"}}'
      response = requests.post(url, headers=headers, data=data)
      print(f"Response content for kibana: {response.content}")

      url_dashboard = 'http://kibana_dashboard:5601/api/saved_objects/index-pattern/' + index
      
      response = requests.post(url_dashboard, headers=headers, data=data)
      print(f"Response content for kibana_dashboard: {response.content}")

  # create dashboard role
  index_pattern_string = create_index_pattern_string(indices)
  print("Creating dashboard role")
  print(f"Indices in dashboard role are: {indices}")
  print(f"Index Pattern string is: {index_pattern_string}")
  url = 'http://elasticsearch:9200/_security/role/dashboard'
  headers = {
      'content-type': 'application/json',
      'Authorization': 'Basic ZWxhc3RpYzpjaGFuZ2V0aGlzaW5wcm9kdWN0aW9u'
  }
  data = '{"cluster" : [ ],"indices" : [{"names" : [' + index_pattern_string + '],"privileges" : ["read","view_index_metadata"],"allow_restricted_indices" : false}],"applications" : [ ],"run_as" : [ ],"metadata" : { },"transient_metadata" : {"enabled" : true}}}'
  response = requests.post(url, headers=headers, data=data)
  print(response.content)


  # Creating the user
  print("Creating hoernchen user...")
  url = 'http://elasticsearch:9200/_security/user/hoernchen'
  headers = {
      'content-type': 'application/json',
      'Authorization': 'Basic ZWxhc3RpYzpjaGFuZ2V0aGlzaW5wcm9kdWN0aW9u'
  }
  data = '{"password": "hoernchen","roles": ["kibana_dashboard_only_user", "dashboard"],"full_name": "","email": "","metadata": {},"enabled": true}}'
  response = requests.post(url, headers=headers, data=data)
  print(response.content)

# Import dashboard
  print("Importing Dashboard...")
  os.system("curl -X POST 'http://kibana:5601/api/saved_objects/_import' -H 'Authorization: Basic ZWxhc3RpYzpjaGFuZ2V0aGlzaW5wcm9kdWN0aW9u' -H 'kbn-xsrf: true' -overwrite --form file=@dashboard.ndjson")
  os.system("curl -X POST 'http://kibana_dashboard:5601/api/saved_objects/_import' -H 'Authorization: Basic ZWxhc3RpYzpjaGFuZ2V0aGlzaW5wcm9kdWN0aW9u' -H 'kbn-xsrf: true' -overwrite --form file=@dashboard.ndjson")

# create index
print("Connecting to Elasticsearch...")
es = connect_elasticsearch()

# Check if "mein_index" is already there
if not es.indices.exists(index="mein_index"):
  print("Index not there...creating index")
  es.indices.create(index="mein_index")
else:
  print("Index already exists")
  pass

# Check if indices are already imported
while not all(es.indices.exists(index=item) for item in indices):
  print("Other indices: '" + seperator.join(indices) + "' not there yet...")
  sleep(5)
else:
  print("Indices are there...creating necessary roles and users and a dashboard")
  # Sleeping here to not create index patterns while import is still running...
  # TODO got to make this more sensible...
  sleep(60)
  create_dashboard()

