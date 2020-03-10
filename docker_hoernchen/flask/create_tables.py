import sqlite3

connection = sqlite3.connect('data.db')
cursor = connection.cursor()

# create user table
create_table = "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username text, password text)"
cursor.execute(create_table)

# create sitemaps table
create_table = "CREATE TABLE IF NOT EXISTS sitemaps (name text, url text, read_in boolean)"
cursor.execute(create_table)

# create likes table
create_table = "CREATE TABLE IF NOT EXISTS likes (user_id text, resource_id text)"
cursor.execute(create_table)

connection.commit()

connection.close()