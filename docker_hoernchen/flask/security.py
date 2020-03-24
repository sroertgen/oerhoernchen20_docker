from flask import jsonify
from flask_restful import Resource, reqparse
from flask_jwt_extended import create_access_token
from user import User

class Login(Resource):

  @classmethod
  def authenticate(cls, username, password):
    user = User.find_by_username(username)
    if user and user.password == password:
      return user

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
    data = Login.parser.parse_args()

    try:
      user = self.authenticate(data['username'], data['password'])
      access_token = create_access_token(identity=user.id)

      return {
          'access_token': access_token,
          'user_id': user.id
      }, 200
    except:
      return {'message': 'User not authorized'}, 401