from flask import Flask, jsonify
from flask_cors import CORS

SITEMAPS = [
    {
        'name': 'On the Road',
        'url': 'Jack Kerouac',
        'read': True
    },
    {
        'name': 'Harry Potter and the Philosopher\'s Stone',
        'url': 'J. K. Rowling',
        'read': False
    },
    {
        'name': 'Green Eggs and Ham',
        'url': 'Dr. Seuss',
        'read': True
    }
]

# configuration
DEBUG = True

# instantiate the app
app = Flask(__name__)
app.config.from_object(__name__)

# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})


# sanity check route
@app.route('/ping', methods=['GET'])
def ping_pong():
    return jsonify('pong!')

@app.route('/sitemaps', methods=['GET'])
def all_books():
    return jsonify({
        'status': 'success',
        'sitemaps': SITEMAPS
    })

if __name__ == '__main__':
    app.run()
