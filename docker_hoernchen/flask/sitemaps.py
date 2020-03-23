import sqlite3
from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required

# Define Classes
class Sitemap(Resource):
  # create a parser to check if data is there and in right format
  parser = reqparse.RequestParser()
  parser.add_argument(
      'name',
      type=str,
      required=False)
  parser.add_argument(
      'url',
      type=str,
      required=True,
      help="This field cannot be left blank")
  parser.add_argument(
      'read_in',
      type=bool,
      required=False
  )

  @classmethod
  def insert(cls, sitemap):
    connection = sqlite3.connect('data.db')
    cursor = connection.cursor()

    query = "INSERT INTO sitemaps VALUES (?, ?, ?)"
    cursor.execute(
        query, (sitemap['name'], sitemap['url'], sitemap['read_in']))

    connection.commit()
    connection.close()

  @classmethod
  def find_by_name(cls, name):
    connection = sqlite3.connect('data.db')
    cursor = connection.cursor()

    query = "SELECT * FROM sitemaps WHERE name=?"
    result = cursor.execute(query, (name,))
    row = result.fetchone()
    connection.close()

    if row:
      return {'sitemap': {'name': row[0], 'url': row[1], 'read_in': row[2]}}

  @classmethod
  def update(cls, sitemap):
    connection = sqlite3.connect('data.db')
    cursor = connection.cursor()

    query = "UPDATE sitemaps SET url=?, read_in=? WHERE name=?"
    cursor.execute(
        query, (sitemap['url'], sitemap['read_in'], sitemap['name']))

    connection.commit()
    connection.close()

  def get(self, name):
    sitemap = self.find_by_name(name)

    if sitemap:
      return sitemap
    return {'message': 'Sitemap not found'}, 404

  def post(self, name):
    # check if sitemap is already there
    sitemap = self.find_by_name(name)
    if sitemap:
      return {'message': f'A sitemap with name "{name}" already exists.'}, 400

    # load data and create sitemap
    data = Sitemap.parser.parse_args()
    print(data)
    sitemap = {
        'name': name,
        'url': data['url'],
        'read_in': data['read_in']
    }

    try:
      self.insert(sitemap)
    except:
      return {'message': 'An error occured inserting the sitemap.'}, 500  # internal server error

    return sitemap, 201

  def delete(self, name):
    connection = sqlite3.connect('data.db')
    cursor = connection.cursor()
    
    query = "DELETE FROM sitemaps WHERE name=? "
    cursor.execute(query, (name,))

    connection.commit()
    connection.close()

    return {'message': 'Sitemap deleted!'}

  def put(self, name):
    # get data
    data = Sitemap.parser.parse_args()
    sitemap = self.find_by_name(name)
    updated_sitemap = {
        'name': data['name'],
        'url': data['url'],
        'read_in': data['read_in']
    }

    if sitemap is None:
      try:
        self.insert(updated_sitemap)
      except:
        # show internal server error
        return {'message': 'An error occured inserting the sitemap.'}, 500
    else:
      try:
        self.update(updated_sitemap)
      except:
        return {'message': 'An error occured updating the sitemap.'}, 500
    return updated_sitemap

class Sitemaps(Resource):
  @classmethod
  def get_all(cls):
    connection = sqlite3.connect('data.db')
    cursor = connection.cursor()

    query = "SELECT * FROM sitemaps"
    result = cursor.execute(query)
    sitemaps = []
    for row in result:
      sitemaps.append(
          {'name': row[0], 'url': row[1], 'read_in': row[2]})
    connection.close()
    return sitemaps

  def get(self):
    sitemaps = self.get_all()
    return {'sitemaps': sitemaps}
