import pandas as pd
import mysql.connector as sql
from geopy.geocoders import Nominatim

# Make df
db_connection = sql.connect(
    host='localhost', 
    database='oerhoernchen_db', 
    user='oerhoernchen', 
    password='oerhoernchenpw')
db_cursor = db_connection.cursor()
db_cursor.execute('SELECT * FROM hoou_tb')

table_rows = db_cursor.fetchall()

df = pd.DataFrame(table_rows)

# Geo stuff
geolocator = Nominatim(user_agent="oercrawler")
location = geolocator.geocode("Hamburg Online University")
print(location.address)
print(location.latitude, location.longitude)

