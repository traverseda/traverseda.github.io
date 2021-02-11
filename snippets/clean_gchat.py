#!/usr/bin/python
import pyperclip
import urllib.parse as urlparse
from urllib.parse import parse_qs
import sys

from bs4 import BeautifulSoup
text = pyperclip.paste()
text = text.replace("<wbr>","")
soup = BeautifulSoup(text, 'html.parser')

def degoogle(url):
    parsed = urlparse.urlparse(url)
    newurl = urlparse.parse_qs(parsed.query)['q']
    return newurl

for a in soup.select("a"):
    a.attrs['href']=degoogle(a.attrs['href'])
for i in soup.select("hr"):
    i.decompose()
for i in soup.select("table"):
    i.decompose()
for i in soup.find_all("span", class_="when"):
    i.decompose()

import html2text

h = html2text.HTML2Text()
style="""
<style>
h2 {
    font-size:20px
}
p {
    margin-bottom:10px;
    margin-top:10px;
}
</style>
"""
sys.stdout.write(style)
sys.stdout.write(h.handle(soup.prettify()))
