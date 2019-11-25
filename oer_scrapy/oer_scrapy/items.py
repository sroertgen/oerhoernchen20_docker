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
    name = scrapy.Field(
        input_processor=MapCompose(replace_processor)
    )
    about = scrapy.Field(
        input_processor = MapCompose(replace_processor)
    )
    author = scrapy.Field(
        input_processor=MapCompose(replace_processor)
    )
    publisher = scrapy.Field(
        input_processor=MapCompose(replace_processor)
    )
    inLanguage = scrapy.Field(
        input_processor=MapCompose(replace_processor)
    )
    accessibilityAPI = scrapy.Field(
        input_processor=MapCompose(replace_processor)
    )
    accessibilityControl= scrapy.Field(
        input_processor=MapCompose(replace_processor)
    )
    accessibilityFeature= scrapy.Field(
        input_processor=MapCompose(replace_processor)
    )
    accessibilityHazard = scrapy.Field(
        input_processor=MapCompose(replace_processor)
    )
    license = scrapy.Field(
        input_processor=MapCompose(replace_processor)
    )
    timeRequired = scrapy.Field(
        input_processor=MapCompose(replace_processor)
    )
    educationalRole = scrapy.Field(
        input_processor=MapCompose(replace_processor)
    )
    alignmentType = scrapy.Field(
        input_processor=MapCompose(replace_processor)
    )
    educationalFramework = scrapy.Field(
        input_processor=MapCompose(replace_processor)
    )
    targetDescription = scrapy.Field(
        input_processor=MapCompose(replace_processor)
    )
    targetName = scrapy.Field(
        input_processor=MapCompose(replace_processor)
    )
    targetURL = scrapy.Field(
        input_processor=MapCompose(replace_processor)
    )
    educationalUse = scrapy.Field(
        input_processor=MapCompose(replace_processor)
    )
    typicalAgeRange = scrapy.Field(
        input_processor=MapCompose(replace_processor)
    )
    interactivityType = scrapy.Field(
        input_processor=MapCompose(replace_processor)
    )
    learningResourceType = scrapy.Field(
        input_processor=MapCompose(replace_processor)
    )
    isBasedOnUrl = scrapy.Field(
        input_processor=MapCompose(replace_processor)
    )
    # additional field
    date_published = scrapy.Field(
        input_processor=MapCompose(replace_processor)
    )

    # scrape related fields
    url = scrapy.Field(
        input_processor=MapCompose(replace_processor)
    )
    thumbnail = scrapy.Field(
        input_processor=MapCompose(replace_processor)
    )
    tags = scrapy.Field(
        input_processor=MapCompose(replace_processor)
    )
    project = scrapy.Field()
    source = scrapy.Field()
    spider = scrapy.Field()
    date_scraped = scrapy.Field()

# class MyItemLoader(ItemLoader):
#     name_in = replace_processor
#     about_in = replace_processor
#     accessibilityAPI_in = replace_processor
