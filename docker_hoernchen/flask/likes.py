import sqlite3
from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required
# TODO add jwt required to requests

class Likes(Resource):
  # find all liked resources by user_id
  @classmethod
  def find_by_userid(cls, user_id):
    connection = sqlite3.connect('data.db')
    cursor = connection.cursor()

    query = "SELECT * FROM likes WHERE user_id=?"
    result = cursor.execute(query, (user_id,))

    liked_resources = []
    for row in result:
      liked_resources.append(
        {'resource_id': row[1]}
      )
    connection.close()
    return liked_resources

  @jwt_required
  def get(self, user_id):
    liked_resources = self.find_by_userid(user_id)
    return {'liked_resources': liked_resources}


class Like(Resource):
  parser = reqparse.RequestParser()
  parser.add_argument(
      'user_id',
      type=str,
      required=True
  )
  parser.add_argument(
    'resource_id',
    type=str,
    required=True
  )

  @classmethod
  def insert(cls, liked_resource):
    connection = sqlite3.connect('data.db')
    cursor = connection.cursor()

    query = "INSERT INTO likes VALUES (?, ?)"
    cursor.execute(
      query,
      (liked_resource['user_id'],
      liked_resource['resource_id'])
    )
    connection.commit()
    connection.close()

  @classmethod
  def check_if_resource_exists(self, user_id, resource_id):
    connection = sqlite3.connect('data.db')
    cursor = connection.cursor()

    query = "SELECT * from likes WHERE user_id=? AND resource_id=?"
    result = cursor.execute(
      query, (user_id, resource_id))
    row = result.fetchone()
    print(f"Row is {row}")
    return row

  # post new like
  @jwt_required
  def post(self):
    # get user_id data and resource_id data
    data = self.parser.parse_args()
    print(f'Data is: {data}')
    liked_resource = {
      'user_id': data['user_id'],
      'resource_id': data['resource_id']
    }
    try:
      self.insert(liked_resource)
    except:
      # return internal server error
      return {'message': 'An error occured inserting the liked resource'}, 500
    
    return liked_resource, 201


  # delete a liked resource
  @jwt_required
  def delete(self):
    print("inside delete method")
    data = self.parser.parse_args()
    print(data)

    try:
      row = self.check_if_resource_exists(data['user_id'], data['resource_id'])
      if row:
        connection = sqlite3.connect('data.db')
        cursor = connection.cursor()
        query = "DELETE FROM likes WHERE user_id=? AND resource_id=?"
        cursor.execute(
          query,
          (data['user_id'],
          data['resource_id'])
        )
        connection.commit()
        connection.close()
      else:
        return {'message': 'No such resource for user, deletion failed'}, 400
    except:
      return {'message': 'Deletion of resource from likes failed'}, 500

    return {'message': 'Resource deleted from likes'}, 200
