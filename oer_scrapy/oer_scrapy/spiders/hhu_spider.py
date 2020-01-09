# -*- coding: utf-8 -*-
from scrapy.spiders import SitemapSpider
from oer_scrapy.items import OerScrapyItem, ItemLoader, OerScrapyItemLoader
from datetime import datetime
from w3lib.html import remove_tags, replace_escape_chars


class HhuSpiderSpider(SitemapSpider):
    name = 'hhu_spider'
    sitemap_urls = [
        'https://mediathek.hhu.de/sitemap?list=videos']

    def parse(self, response):
        now = datetime.now()

        il = OerScrapyItemLoader(selector=response)
        if il.add_xpath('name', '//meta[@property="og:title"]/@content') is None:
            print("No title provided, skipping...")

        if il.add_xpath('about', '//meta[@property="og:description"]/@content') is None:
            print("No description provided, skipping...")

        if il.add_xpath('author', '//p[contains(@id, "mt_watch-speaker")]') is "":
            print("Author is none")
            il.add_value('author', 'keine Autorin angegeben')

        # if il.add_xpath('publisher', '//div[@property="publisher"]/text()') is None:
        il.add_value('publisher', '')

        # if il.add_xpath('inLanguage', '(//td[contains(@class, "key")][contains(., "Language")]/following::td/div/text())[1]') is None:
        il._add_value('inLanguage', '')

        # if il.add_xpath('accessibilityAPI', '(//tr/td[2])[6]') is None:
        il.add_value('accessibilityAPI', '')

        # if il.add_xpath('accessibilityControl', '(//tr/td[2])[7]') is None:
        il.add_value('accessibilityControl', '')

        # if il.add_xpath('accessibilityFeature', '(//tr/td[2])[8]') is None:
        il.add_value('accessibilityFeature', '')

        # if il.add_xpath('accessibilityHazard', '(//tr/td[2])[9]') is None:
        il.add_value('accessibilityHazard', '')

        if il.add_xpath('license', '(//a[@href[contains(.,"creativecommons")]])[last()]') is None:
            print('No license provided, skipping resource...')

        # if il.add_xpath('timeRequired', '(//tr/td[2])[11]') is None:
        il.add_value('timeRequired', '')

        # if il.add_xpath('educationalRole', '(//tr/td[2])[12]') is None:
        il.add_value('educationalRole', '')

        # if il.add_xpath('alignmentType', '(//tr/td[2])[13]') is None:
        il.add_value('alignmentType', '')

        # if il.add_xpath('educationalFramework', '(//tr/td[2])[14]') is None:
        il.add_value('educationalFramework', '')

        # if il.add_xpath('targetDescription', '(//tr/td[2])[15]') is None:
        il.add_value('targetDescription', '')

        # if il.add_xpath('targetName', '(//tr/td[2])[16]') is None:
        il.add_value('targetName', '')

        # if il.add_xpath('targetURL', '(//tr/td[2])[17]') is None:
        il.add_value('targetURL', '')

        # if il.add_xpath('educationalUse', '(//tr/td[2])[18]') is None:
        il.add_value('educationalUse', '')

        # if il.add_xpath('typicalAgeRange', '(//tr/td[2])[21]') is None:
        il.add_value('typicalAgeRange', '')

        # if il.add_xpath('interactivityType', '(//tr/td[2])[22]') is None:
        il.add_value('interactivityType', '')

        # if il.add_xpath('learningResourceType', '(//tr/td[2])[23]') is None:
        il.add_value('learningResourceType', 'Video')

        il.add_xpath('date_published',
                     '// span[contains(@class, "watch-information-date added")]')

        il.add_xpath('url', '(//meta[@property="og:url"]/@content)')
        il.add_xpath('thumbnail', '(//meta[@property="og:image"]/@content)')

        seperator = ", "
        tag_list = response.xpath('//ul[contains(@class, "watch-info-tag-list")]//li//a/text()').extract()

        il.add_value('tags', seperator.join(tag_list))
        
        il.add_value('project', self.settings.get("BOT_NAME"))
        il.add_value('source', 'HHU-Mediathek')
        il.add_value('spider', HhuSpiderSpider.name)
        il.add_value('date_scraped', now.strftime("%Y-%m-%d %H:%M:%S"))

        yield il.load_item()
