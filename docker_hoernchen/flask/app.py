from flask import Flask, jsonify
from flask_cors import CORS
from flask_restful import Api
from flask_jwt import JWT
from user import UserRegister, UserData
from sitemaps import Sitemap, Sitemaps
from likes import Like, Likes

from security import authenticate, identity

# config
app = Flask(__name__)
app.secret_key = 'changethisinproduction'
api = Api(app)

# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})

# creates /auth path
jwt = JWT(app, authenticate, identity) # /auth

@jwt.auth_response_handler
def customized_response_handler(access_token, identity):
    return jsonify({
        'access_token': access_token.decode('utf-8'),
        'user_id': identity.id
    })

# Database

# Add Classes to API
api.add_resource(Sitemap, '/sitemap/<string:name>')
api.add_resource(Sitemaps, '/sitemaps')
api.add_resource(UserRegister, '/register')
api.add_resource(UserData, '/user/<string:_id>')
api.add_resource(Like, '/like')
api.add_resource(Likes, '/likes/<string:user_id>')

# Run app
if __name__ == '__main__':
  app.run(port=5000, debug=True)
