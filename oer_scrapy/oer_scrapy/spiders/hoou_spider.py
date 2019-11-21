from scrapy.spiders import SitemapSpider
from oer_scrapy.items import OerScrapyItem, OerScrapyItemLoader
from datetime import datetime
from w3lib.html import remove_tags

class HoouSpider(SitemapSpider):
  name = 'hoou_spider'
  sitemap_urls = ['https://www.hoou.de/sitemap.xml']
  sitemap_rules = [('/projects/', 'parse_projects')]

  def parse_projects(self, response):
    now = datetime.now()

    loader = OerScrapyItemLoader(selector=response)
    loader.add_xpath('name', '(//tr/td[2])[1]')
    loader.add_value('date_scraped', now.strftime("%Y-%m-%d %H:%M"))

    return loader.load_item()

# scrapy crawl hoou_spider -o hoou.json
