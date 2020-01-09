from scrapy.spiders import SitemapSpider
from oer_scrapy.items import OerScrapyItem, ItemLoader, OerScrapyItemLoader
from datetime import datetime
from w3lib.html import remove_tags, replace_escape_chars
import json


class ZoerrSpider(SitemapSpider):
  name = 'zoerr_spider'
  sitemap_urls = [
      'https://uni-tuebingen.oerbw.de/edu-sharing/eduservlet/sitemap?from=0#osds']

  def parse(self, response):
    now = datetime.now()

    data = json.loads(response.xpath('//script[@type="application/ld+json"]//text()').extract_first())
    print(data)

    il = OerScrapyItemLoader(selector=response)

    if "name" in data:
        il.add_value('name', data['name'])
    else:
        raise Exception("No name provided, skipping...")

    if "description" in data:
        il.add_value('about', data['description'])
    else:
      raise Exception("No description provided, skipping...")

    author_list = []
    seperator = ", "
    if "creator" in data:
      if type(data['creator']) == dict:
        if data['creator']['@type'] == "Person":
          name = data['creator']['givenName'] + " " + data['creator']['familyName']
          il.add_value('author', name)
        elif data['creator']['@type'] == "Organization":
          il.add_value('author', (data['creator']['legalName']))
      elif type(data['creator']) == list:
        for i, person in enumerate(data['creator']):
            name = data['creator'][i]['givenName'] + " " + data['creator'][i]['familyName']
            author_list.append(name)
        il.add_value('author', seperator.join(author_list))
    else:
      print("Author is none")
      il.add_value('author', 'keine Autorin angegeben')

    if "publisher" in data:
      if data['publisher']['@type'] == "Organization":
        il.add_value('publisher', data['publisher']['legalName'])
      elif data['publisher']['@type'] == "Person":
        il.add_value('publisher', data['publisher']['givenName'] + " " + data['publisher']['familyName'])
    else:
      il.add_value('publisher', '')

    if "inLanguage" in data:
        il.add_value('inLanguage', data['inLanguage'])
    else:
      il._add_value('inLanguage', '')

    if "accessibilityAPI" in data:
        il.add_value('accessibilityAPI', data['accessibilityAPI'])
    else:
      il.add_value('accessibilityAPI', '')

    if "accessibilityControl" in data:
        il.add_value('accessibilityControl', data['accessibilityControl'])
    else:
      il.add_value('accessibilityControl', '')

    if "accessibilityFeature" in data:
        il.add_value('accessibilityFeature', data['accessibilityFeature'])
    else:
      il.add_value('accessibilityFeature', '')

    if "accessibilityHazard" in data:
        il.add_value('accessibilityHazard', data['accessibilityHazard'])
    else:
      il.add_value('accessibilityHazard', '')

    if "license" in data:
        il.add_value('license', data['license'])
    else:
      il.add_value('license', '')

    if "timeRequired" in data:
        il.add_value('timeRequired', data['timeRequired'])
    else:
      il.add_value('timeRequired', '')

    if "educationalRole" in data:
        il.add_value('educationalRole', data['educationalRole'])
    else:
      il.add_value('educationalRole', '')

    if "alignmentType" in data:
        il.add_value('alignmentType', data['alignmentType'])
    else:
      il.add_value('alignmentType', '')

    if "educationalFramework" in data:
        il.add_value('educationalFramework', data['educationalFramework'])
    else:
      il.add_value('educationalFramework', '')

    if "targetDescription" in data:
        il.add_value('targetDescription', data['targetDescription'])
    else:
      il.add_value('targetDescription', '')

    if "targetName" in data:
        il.add_value('targetName', data['targetName'])
    else:
      il.add_value('targetName', '')

    if "targetURL" in data:
        il.add_value('targetURL', data['targetURL'])
    else:
      il.add_value('targetURL', '')

    if "educationalUse" in data:
        il.add_value('educationalUse', data['educationalUse'])
    else:
      il.add_value('educationalUse', '')

    if "typicalAgeRange" in data:
        il.add_value('typicalAgeRange', data['typicalAgeRange'])
    else:
      il.add_value('typicalAgeRange', '')

    if "interactivityType" in data:
        il.add_value('interactivityType', data['interactivityType'])
    else:
      il.add_value('interactivityType', '')

    if "learningResourceType" in data:
        il.add_value('learningResourceType', data['learningResourceType'])
    else:
      il.add_value('learningResourceType', '')

    if "dateCreated" in data:
        il.add_value('date_published', data['dateCreated'])
    else:
      il.add_value('date_published', '')

    if "url" in data:
        il.add_value('url', data['url'])
    else:
      il.add_value('url', '')

    if "thumbnailUrl" in data:
        il.add_value('thumbnail', data['thumbnailUrl'])
    else:
      il.add_value('thumbnail', '')

    if "keywords" in data:
        il.add_value('tags', data['keywords'])
    else:
      il.add_value('tags', '')

    il.add_value('project', self.settings.get("BOT_NAME"))
    il.add_value('source', 'ZOERR')
    il.add_value('spider', 'zoerr_spider')
    il.add_value('date_scraped', now.strftime("%Y-%m-%d %H:%M:%S"))

    yield il.load_item()
