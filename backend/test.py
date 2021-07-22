import requests

BASE = 'http://127.0.0.1:5000/'

response = requests.put(BASE + 'flowdata/daniel.guan2004@gmail.com', {"flowdata": ["awidjaoiwdjaowid"]})
input()