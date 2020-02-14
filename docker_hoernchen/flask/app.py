from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector as sql
import sqlalchemy
import pandas as pd
import uuid

# Set database vars
database_host ='localhost'
database_name ='oerhoernchen_db'
database_user ='oerhoernchen'
database_password='oerhoernchenpw'

# Create database engine
engine = sqlalchemy.create_engine('mysql+mysqlconnector://{0}:{1}@{2}/{3}'.format(database_user, database_password, database_host, database_name))

db_statement_create = "CREATE TABLE indices (id VARCHAR(255), name VARCHAR(255), url VARCHAR(255), read_in TINYINT(1))"
db_statement_select = 'SELECT * FROM indices'
db_statement_check_if_exist = "SHOW TABLES LIKE 'indices'"

db_connection = sql.connect(
    host=database_host,
    database=database_name,
    user=database_user,
    password=database_password
)
db_cursor = db_connection.cursor()
db_cursor.execute(db_statement_check_if_exist)
result = db_cursor.fetchone()

if result:
    print("DB: indices is there")
else:
    db_cursor.execute(db_statement_create)
    print("DB: indices was not there, created it.")

def get_indices():
    SITEMAPS = []
    db_cursor.execute(db_statement_select)
    fetched = db_cursor.fetchall()
    print(f"Fetched is: {fetched}")
    for sitemap in fetched:
        type(f"Type of sitemap3 ist :{sitemap[3]}")
        dict = {}
        dict['id'] = sitemap[0]
        dict['name'] = sitemap[1]
        dict['url'] = sitemap[2]
        dict['read_in'] = sitemap[3]
        SITEMAPS.append(dict)
    print(f"Fetched Sitemaps are: {SITEMAPS}")
    return SITEMAPS

def post_sitemap(SITEMAPS):
    db_cursor.execute("DROP TABLE indices ")
    db_cursor.execute(db_statement_create)
    for sitemap in SITEMAPS:
        print(f"current sitemap in post_sitemap: {sitemap}")
        db_data = (sitemap['id'], sitemap['name'], sitemap['url'], sitemap['read_in'])
        db_cursor.execute("INSERT INTO indices "
                          "(id, name, url, read_in) "
                          "VALUES (%s, %s, %s, %s)", db_data)
    db_connection.commit()

def remove_sitemap(SITEMAPS, sitemap_id):
    for sitemap in SITEMAPS:
        print(sitemap, sitemap_id)
        if sitemap['id'] == sitemap_id:
            SITEMAPS.remove(sitemap)
            return True
    return False

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

@app.route('/sitemaps', methods=['GET', 'POST'])
def sitemaps():
    response_object = {'status': 'success'}
    if request.method == 'POST':
        SITEMAPS = get_indices()
        post_data = request.get_json()
        print(f"postData is: {post_data}")
        SITEMAPS.append({
            'id': uuid.uuid4().hex,
            'name': post_data.get('name'),
            'url': post_data.get('url'),
            'read_in': bool(post_data.get('read_in'))
        })
        print(f"Sitemap Array is: {SITEMAPS}")
        post_sitemap(SITEMAPS)
        response_object['message'] = 'Sitemap hinzugefügt...'
    else:
        SITEMAPS = get_indices()
        response_object['sitemaps'] = SITEMAPS
    return jsonify(response_object)

@app.route('/sitemaps/<sitemap_id>', methods=['PUT', 'DELETE'])
def single_sitemap(sitemap_id):
    response_object = {'status': 'success'}
    print(f"Sitemap ID is: {sitemap_id}")
    SITEMAPS = get_indices()
    if request.method == 'PUT':
        post_data = request.get_json()
        remove_sitemap(SITEMAPS, sitemap_id)
        SITEMAPS.insert(0,{
            'id': uuid.uuid4().hex,
            'name': post_data.get('name'),
            'url': post_data.get('url'),
            'read_in': post_data.get('read_in')
        })
        post_sitemap(SITEMAPS)
        response_object['message'] = 'Sitemap updated!'
    if request.method == "DELETE":
        remove_sitemap(SITEMAPS, sitemap_id)
        post_sitemap(SITEMAPS)
        response_object['message'] = "Sitemap entfernt!"
    return jsonify(response_object)

if __name__ == '__main__':
    app.run()
