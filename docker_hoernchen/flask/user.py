import sqlite3
from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required

class User:
  def __init__(self, _id, username, password):
    self.id = _id
    self.username = username
    self.password = password

  @classmethod
  def find_by_username(cls, username):
    connection = sqlite3.connect('data.db')
    cursor = connection.cursor()

    query = "SELECT * FROM users WHERE username=?"
    result = cursor.execute(query, (username,))  # username, <-- to make it tuple
    row = result.fetchone()
    if row:
      user = cls(*row)  # will correspond to all items in class init
    else:
      user = None

    connection.close()
    return user

  @classmethod
  def find_by_id(cls, _id):
    connection = sqlite3.connect('data.db')
    cursor = connection.cursor()

    query = "SELECT * FROM users WHERE id=?"
    result = cursor.execute(query, (_id,))  # _id, <-- to make it tuple
    row = result.fetchone()
    if row:
      user = cls(*row)  # will correspond to all items in class init
    else:
      user = None

    connection.close()
    return user

class UserData(Resource):
  @classmethod
  def find_by_id(cls, _id):
      connection = sqlite3.connect('data.db')
      cursor = connection.cursor()

      query = "SELECT * FROM users WHERE id=?"
      result = cursor.execute(query, (_id,))
      row = result.fetchone()
      connection.close()
      
      if row:
        return {'user': {'username': row[1]}}

  @jwt_required
  def get(self, _id):
    user = self.find_by_id(_id)

    if user:
      return user
    else:
      return {'message': 'User not found'}, 404


class UserRegister(Resource):
  parser = reqparse.RequestParser()
  parser.add_argument(
    'username',
    type=str,
    required=True,
    help="This field cannot be left blank")
  parser.add_argument(
    'password',
    type=str,
    required=True,
    help="This field cannot be left blank")

  def post(self):
    data = UserRegister.parser.parse_args()

    if User.find_by_username(data['username']):
      return {'message': 'A username with that username already exists.'}, 400

    connection = sqlite3.connect('data.db')
    cursor = connection.cursor()

    query = "INSERT INTO users VALUES (NULL, ?, ?)"
    cursor.execute(query, (data['username'], data['password']))

    connection.commit()
    connection.close()

    return {'message': 'User created successfully.'}, 201
