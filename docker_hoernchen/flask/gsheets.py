from flask_restful import Resource, reqparse
import uuid
import requests
import json
import pprint
from elasticsearch import Elasticsearch

# Link to sheet: https://spreadsheets.google.com/feeds/list/1kntJWO9iP6rL6WFqKXNsINoa923LjoDfEz38_NA4-ao/od6/public/values?alt=json

# Setup gsheet link
gsheet_link = 'https://spreadsheets.google.com/feeds/list/1kntJWO9iP6rL6WFqKXNsINoa923LjoDfEz38_NA4-ao/od6/public/values?alt=json'

# setup elasticsearch
es = Elasticsearch(
    ['http://elasticsearch:9200'],
    http_auth=('elastic', 'changethisinproduction'),
    scheme="http",
    port=80)

class Gsheet(Resource):
  @classmethod
  def get_gsheet(cls):
    r = requests.get(gsheet_link)
    return r.json()

  @classmethod
  def post_data_to_es(cls):
    new_entries = []
    data = cls.get_gsheet()

    for item in data['feed']['entry']:
        pprint.pprint(item)
        entry = {}
        entry['id'] = uuid.uuid5(uuid.NAMESPACE_DNS, item['gsx$url']['$t'])
        entry['name'] = item['gsx$titel']['$t']
        entry['about'] = item['gsx$beschreibung']['$t']
        entry["author"] = ""
        entry["publisher"] = ""
        entry['inLanguage'] = item['gsx$sprache']['$t'].split(', ')
        entry["accessibilityAPI"] = ""
        entry["accessibilityControl"] = ""
        entry["accessibilityFeature"] = ""
        entry["accessibilityHazard"] = ""
        entry['license'] = item['gsx$lizenz-urloptional']['$t']
        entry["timeRequired"] = ""
        entry["educationalRole"] = ""
        entry["alignmentType"] = ""
        entry['educationalFramework'] = item['gsx$fachgebiet']['$t'].split(', ')
        entry["targetDescription"] = ""
        entry["targetName"] = ""
        entry["targetURL"] = ""
        entry["educationalUse"] = ""
        entry["typicalAgeRange"] = ""
        entry["interactivityType"] = ""
        entry['learningResourceType'] = item['gsx$art']['$t'].split(', ')
        entry['date_published'] = item['gsx$jahroptional']['$t']
        entry['url'] = item['gsx$url']['$t']
        entry["thumbnail"] = ""
        entry["tags"] = ""
        entry["project"] = ""
        entry["source"] = "GSheets"
        entry["spider"] = ""
        entry["date_scraped"] = ""
        entry['tags'] = item['gsx$tags']['$t']

        new_entries.append(entry)

    for item in new_entries:
        res = es.index(index="gsheets", id=item['id'], body=item)
        print(res)

  def get(self):
    try:
      self.post_data_to_es()
      return {'message': 'updated gsheets entries in es index'}
    except:
      return {'message': 'there was an error!'}, 500
