from scrapy.spiders import SitemapSpider
from oer_scrapy.items import OerScrapyItem, ItemLoader, OerScrapyItemLoader
from datetime import datetime
from w3lib.html import remove_tags, replace_escape_chars

class OerinfoSpiderSpider(SitemapSpider):
    name = 'oerinfo_spider'
    sitemap_urls = [
        'https://open-educational-resources.de/sitemap_index.xml'
        # 'https://open-educational-resources.de/podcast-sitemap.xml',
        # 'https://open-educational-resources.de/fp_materialien-sitemap.xml',
        # 'https://open-educational-resources.de/Praxiskategorie-sitemap.xml',
        # 'https://open-educational-resources.de/oer_dossiers-sitemap.xml',
        # 'https://open-educational-resources.de/oer_materialien-sitemap.xml',

        ]
    # sitemap_rules = [
    #     ('/podcast-sitemap.xml', 'parse'),
    # ]

    def parse(self, response):
        now = datetime.now()

        il = OerScrapyItemLoader(selector=response)
        if il.add_xpath('name', '(//meta[@property="og:title"]/@content)[1]') is None:
            print("No title provided, skipping entry...")

        if il.add_xpath('about', '(//meta[@property="og:description"]/@content)[1]') is None:
            print("No description provided, skipping entry...")

        # (//div[contains(@class, "lizenzkasten")]/text())[3]
        if il.add_xpath('author', '(//div[contains(@class, "lizenzkasten")]/em)[1]') is "":
            print("Author is none")
            il.add_value('author', 'keine Autorin angegeben')

        if il.add_xpath('publisher', '(//tr/td[2])[4]') is None:
            il.add_value('publisher', '')

        if il.add_xpath('inLanguage', '(//meta[@property="og:locale"]/@content)') is None:
            il._add_value('inLanguage', '')

        if il.add_xpath('accessibilityAPI', '(//tr/td[2])[6]') is None:
            il.add_value('accessibilityAPI', '')

        if il.add_xpath('accessibilityControl', '(//tr/td[2])[7]') is None:
            il.add_value('accessibilityControl', '')

        if il.add_xpath('accessibilityFeature', '(//tr/td[2])[8]') is None:
            il.add_value('accessibilityFeature', '')

        if il.add_xpath('accessibilityHazard', '(//tr/td[2])[9]') is None:
            il.add_value('accessibilityHazard', '')

        if il.add_xpath('license', '(//div[contains(@class, "lizenzkasten")]/a[contains(@title, "Lizenz")])[2]') is None:
            print('No license provided, skipping resource...')
            # il.add_value('license', 'keine Lizenz angegeben')

        if il.add_xpath('timeRequired', '(//tr/td[2])[11]') is None:
            il.add_value('timeRequired', '')

        if il.add_xpath('educationalRole', '(//tr/td[2])[12]') is None:
            il.add_value('educationalRole', '')

        if il.add_xpath('alignmentType', '(//tr/td[2])[13]') is None:
            il.add_value('alignmentType', '')

        if il.add_xpath('educationalFramework', '(//tr/td[2])[14]') is None:
            il.add_value('educationalFramework', '')

        if il.add_xpath('targetDescription', '(//tr/td[2])[15]') is None:
            il.add_value('targetDescription', '')

        if il.add_xpath('targetName', '(//tr/td[2])[16]') is None:
            il.add_value('targetName', '')

        if il.add_xpath('targetURL', '(//tr/td[2])[17]') is None:
            il.add_value('targetURL', '')

        if il.add_xpath('educationalUse', '(//tr/td[2])[18]') is None:
            il.add_value('educationalUse', '')

        if il.add_xpath('typicalAgeRange', '(//tr/td[2])[21]') is None:
            il.add_value('typicalAgeRange', '')

        if il.add_xpath('interactivityType', '(//tr/td[2])[22]') is None:
            il.add_value('interactivityType', '')

        if il.add_xpath('learningResourceType', '(//meta[@property="og:type"]/@content)') is None:
            il.add_value('learningResourceType', '')

        il.add_xpath('date_published','(//meta[@property="DC.date.issued"]/@content)')

        il.add_xpath('url', '(//meta[@property="og:url"]/@content)[1]')
        il.add_value('thumbnail', 'https://open-educational-resources.de/wp-content/themes/oer2017/img/oer_info_logo.svg')
        il.add_xpath('tags', '//meta[@property="article:tag"]/@content')
        il.add_value('project', self.settings.get("BOT_NAME"))
        il.add_value('source', 'OERinfo')
        il.add_value('spider', 'oerinfo_spider')
        il.add_value('date_scraped', now.strftime("%Y-%m-%d %H:%M:%S"))

        yield il.load_item()
