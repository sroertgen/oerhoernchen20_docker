# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy
from scrapy.item import BaseItem
from scrapy.loader import ItemLoader
from scrapy.loader.processors import Join, MapCompose, TakeFirst
from w3lib.html import remove_tags, replace_escape_chars

def replace_processor(value):
    print(value)
    if value is not None:
        return replace_escape_chars(remove_tags(value)).strip()
    else:
        return value

class OerScrapyItem(scrapy.Item):
    # LRMI fields
    name = scrapy.Field()
    about = scrapy.Field()
    author = scrapy.Field()
    publisher = scrapy.Field()
    inLanguage = scrapy.Field()
    accessibilityAPI = scrapy.Field()
    accessibilityControl= scrapy.Field()
    accessibilityFeature= scrapy.Field()
    accessibilityHazard = scrapy.Field()
    license = scrapy.Field()
    timeRequired = scrapy.Field()
    educationalRole = scrapy.Field()
    alignmentType = scrapy.Field()
    educationalFramework = scrapy.Field()
    targetDescription = scrapy.Field()
    targetName = scrapy.Field()
    targetURL = scrapy.Field()
    educationalUse = scrapy.Field()
    typicalAgeRange = scrapy.Field()
    interactivityType = scrapy.Field()
    learningResourceType = scrapy.Field()
    isBasedOnUrl = scrapy.Field()

    # additional field
    date_published = scrapy.Field()

    # scrape related fields
    url = scrapy.Field()
    thumbnail = scrapy.Field()
    tags = scrapy.Field()
    project = scrapy.Field()
    source = scrapy.Field()
    spider = scrapy.Field()
    date_scraped = scrapy.Field()


class OerScrapyItemLoader(ItemLoader):
    default_item_class = OerScrapyItem
    default_input_processor = MapCompose(replace_processor)

    # noch Kommata  einfügen
    default_output_processor = Join()
