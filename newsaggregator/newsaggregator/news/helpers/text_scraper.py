from bs4 import BeautifulSoup
import requests

def get_text(url):
    html = requests.get(url).text
    soup = BeautifulSoup(html, 'html.parser')
    article_text = ""
    for paragraph in soup.find_all('p'):
        article_text += paragraph.get_text()

    return article_text