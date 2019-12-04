# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html

import json
from w3lib.html import replace_escape_chars
import mysql.connector


class OerScrapyPipeline(object):
    def process_item(self, item, spider):
        return item


class JsonWriterPipeline(object):

    def open_spider(self, spider):
        self.file = open('items.jl', 'w')

    def close_spider(self, spider):
        self.file.close()

    def process_item(self, item, spider):
        line = json.dumps(dict(item)) + "\n"
        self.file.write(line)
        return item

class MySqlPipeline(object):

    def __init__(self):
        self.create_connection()
        self.create_table()

    def create_connection(self):
        self.conn = mysql.connector.connect(
            host = 'localhost',
            user = 'oerhoernchen',
            passwd = 'oerhoernchenpw',
            database = 'oerhoernchen_db'
        )
        self.curr = self.conn.cursor()

    def create_table(self):
        self.curr.execute("""DROP TABLE IF EXISTS oerhoernchen_tb""")
        self.curr.execute("""create table oerhoernchen_tb(
            name text,
            about text,
            author text,
            publisher text,
            inLanguage text,
            accessibilityAPI text,
            accessibilityControl text,
            accessibilityFeature text,
            accessibilityHazard text,
            license text,
            timeRequired text,
            educationalRole text,
            alignmentType text,
            educationalFramework text,
            targetDescription text,
            targetName text,
            targetURL text,
            educationalUse text,
            typicalAgeRange text,
            interactivityType text,
            learningResourceType text,
            date_published text,
            url text,
            thumbnail text,
            tags text,
            project text,
            source text,
            spider text,
            date_scraped text
        )""")




    def process_item(self, item, spider):
        self.store_db(item)
        # return item

    def store_db(self, item):
        # self.curr.execute("""insert into oerhoernchen_tb values (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)""", (
        self.curr.execute("""insert into oerhoernchen_tb values (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)""", (
            item['name'],
            item['about'],
            item['author'],
            item['publisher'],
            item['inLanguage'],
            item['accessibilityAPI'],
            item['accessibilityControl'],
            item['accessibilityFeature'],
            item['accessibilityHazard'],
            item['license'],
            item['timeRequired'],
            item['educationalRole'],
            item['alignmentType'],
            item['educationalFramework'],
            item['targetDescription'],
            item['targetName'],
            item['targetURL'],
            item['educationalUse'],
            item['typicalAgeRange'],
            item['interactivityType'],
            item['learningResourceType'],
            item['date_published'],
            item['url'],
            item['thumbnail'],
            item['tags'],
            item['project'],
            item['source'],
            item['spider'],
            item['date_scraped']
        ))
        self.conn.commit()
