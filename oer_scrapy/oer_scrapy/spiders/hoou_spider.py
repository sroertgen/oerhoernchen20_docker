from scrapy.spiders import SitemapSpider
from oer_scrapy.items import OerScrapyItem, ItemLoader, OerScrapyItemLoader
from datetime import datetime
from w3lib.html import remove_tags, replace_escape_chars


class HoouSpider(SitemapSpider):
  name = 'hoou_spider'
  sitemap_urls = ['https://www.hoou.de/sitemap.xml']
  sitemap_rules = [
    ('/projects/', 'parse_projects'),
    ('/materials/', 'parse_projects')]  

# TODO insert tags and about

  def parse_projects(self, response):
    now = datetime.now()

    # if statements einfügen, falls Feld leer ist --> siehe Author field

    il = OerScrapyItemLoader(selector=response)
    il.add_xpath('name', '//meta[@property="title"]/@content')
    il.add_xpath('about', '//meta[@property="description"]/@content')

    if il.add_xpath('author', '(//tr/td[2])[3]') is None:
      print("Author is none")
      il.add_value('author', '')

    il.add_xpath('publisher', '(//tr/td[2])[4]')
    il.add_xpath('inLanguage', '(//tr/td[2])[5]')
    il.add_xpath('accessibilityAPI', '(//tr/td[2])[6]')
    il.add_xpath('accessibilityControl', '(//tr/td[2])[7]')
    il.add_xpath('accessibilityFeature', '(//tr/td[2])[8]')
    il.add_xpath('accessibilityHazard', '(//tr/td[2])[9]')
    il.add_xpath('license', '(//a[@href[contains(.,"creativecommons")]])[last()]')
    il.add_xpath('timeRequired', '(//tr/td[2])[11]')
    il.add_xpath('educationalRole', '(//tr/td[2])[12]')
    il.add_xpath('alignmentType', '(//tr/td[2])[13]')
    il.add_xpath('educationalFramework', '(//tr/td[2])[14]')
    il.add_xpath('targetDescription', '(//tr/td[2])[15]')
    il.add_xpath('targetName', '(//tr/td[2])[16]')
    il.add_xpath('targetURL', '(//tr/td[2])[17]')
    il.add_xpath('educationalUse', '(//tr/td[2])[18]')
    il.add_xpath('typicalAgeRange', '(//tr/td[2])[21]')
    il.add_xpath('interactivityType', '(//tr/td[2])[22]')
    il.add_xpath('learningResourceType', '(//tr/td[2])[23]')

    il.add_xpath('date_published', '(//p[text()[contains(.,"Veröffentlicht")]]/following-sibling::*/text())[1]')

    il.add_xpath('url', '(//meta[@property="og:url"]/@content)')
    il.add_xpath('thumbnail', '(//meta[@property="og:image"]/@content)')
    il.add_xpath('tags', '//div[contains(@class, "hashtag-labels")]//a')
    il.add_value('project', self.settings.get("BOT_NAME"))
    il.add_value('source', 'HOOU')
    il.add_value('spider', 'hoou_spider')
    il.add_value('date_scraped', now.strftime("%Y-%m-%d %H:%M"))

    yield il.load_item()

# scrapy crawl hoou_spider -o hoou.json

# Klammern sind wichtig, um richtige Position zu bekommen,
# es gibt keinen 0. Eintrag bei xpath 


# ' [text()[contains(.,'ABC')]]'
