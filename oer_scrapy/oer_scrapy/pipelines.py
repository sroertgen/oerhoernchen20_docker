# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html

from w3lib.html import replace_escape_chars


class OerScrapyPipeline(object):
    def process_item(self, item, spider):
        return item
