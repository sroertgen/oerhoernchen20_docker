from flask_restful import Resource, reqparse
import json
import rdflib

# Use the parse functions to point directly at the URI

uris = {
    'educationalRole': 'https://www.dublincore.org/vocabs/educationalAudienceRole.ttl',
    'alignmentType': 'https://www.dublincore.org/vocabs/alignmentType.ttl',
    'educationalUse': 'https://www.dublincore.org/vocabs/educationalUse.ttl',
    'interactivityType': 'https://www.dublincore.org/vocabs/interactivityType.ttl'
}

class Vocab(Resource):
  @classmethod
  def get_vocab(cls, name):
    vocabs = []
    # initialize Graph
    graph = rdflib.Graph()
    g = graph.parse(uris.get(name), format="n3")
    g_serialized = g.serialize(format='json-ld', indent=4)
    y = json.loads(g_serialized)

    for item in y:
      try:
          label = item['http://www.w3.org/2004/02/skos/core#prefLabel'][0]['@value']
          vocabs.append(label)
      except:
          print("not there")
    return vocabs

  def get(self, name):
    vocabs = self.get_vocab(name)
    return {'vocabs': vocabs}
