from flask import Flask, jsonify
from flask_cors import CORS
from flask_restful import Api
from flask_jwt_extended import JWTManager
from user import UserRegister, UserData
from sitemaps import Sitemap, Sitemaps
from vocabs import Vocab
from likes import Like, Likes
from security import Login
from gsheets import Gsheet


# config
app = Flask(__name__)
app.secret_key = 'changethisinproduction'
api = Api(app)

# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})

# creates /auth path
jwt = JWTManager(app)

# Database

# Add Classes to API
api.add_resource(Login, '/auth')
api.add_resource(Sitemap, '/sitemap/<string:name>')
api.add_resource(Sitemaps, '/sitemaps')
api.add_resource(UserRegister, '/register')
api.add_resource(UserData, '/user/<string:_id>')
api.add_resource(Like, '/like')
api.add_resource(Likes, '/likes/<string:user_id>')
api.add_resource(Vocab, '/vocab/<string:name>')
api.add_resource(Gsheet, '/gsheets')

# Run app
if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5000, debug=True)
