from flask_restful import Resource, reqparse
import requests

class Frameworks(Resource):
  @classmethod
  def get_all(cls):
    r = requests.get('http://141.5.108.59:3000/ims/case/v1p0/CFDocuments')
  
  def get(self):
    pass