# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy
from scrapy.loader import ItemLoader
from scrapy.loader.processors import Join, MapCompose, Compose
from w3lib.html import remove_tags
clean_text = Compose(MapCompose(lambda v: v.strip()), Join(), remove_tags)
remove_tags = MapCompose(remove_tags)

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
    alignmentType= scrapy.Field()
    educationalFramework = scrapy.Field()
    targetDescription = scrapy.Field()
    targetName = scrapy.Field()
    targetURL = scrapy.Field()
    educationalUse = scrapy.Field()
    accessibilityFeature = scrapy.Field()
    typicalAgeRange = scrapy.Field()
    interactivityType = scrapy.Field()
    learningResourceType = scrapy.Field()
    isBasedOnUrl = scrapy.Field()

    # additional field
    date_published = scrapy.Field()

    # scrape related fields
    url = scrapy.Field()
    project = scrapy.Field()
    spider = scrapy.Field()
    date_scraped = scrapy.Field()


class OerScrapyItemLoader(ItemLoader):
    default_item_class = OerScrapyItem
    name_out = clean_text
    about_out = remove_tags
    author_out = remove_tags
