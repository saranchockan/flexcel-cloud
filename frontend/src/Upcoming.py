from selenium import webdriver
from bs4 import BeautifulSoup
import pandas as pd

# Adjust to Chromedriver location
driver = webdriver.Chrome("/Users/XiaomingGuan/node_modules/chromedriver/lib/chromedriver/chromedriver")

def combine(x):
    ret = ''
    for a in x:
        if ret == '':
            ret = ret + a
        else:
            ret = ret + ' ' + a
    return ret

dates=[]
names=[]
cities=[]
states=[]
registrations=[]
driver.get('https://www.tabroom.com/index/index.mhtml')
content = driver.page_source
soup = BeautifulSoup(content)

for table in soup.findAll('tbody', attrs={'class':'smaller','aria-live':'polite','aria-relevant':'all'}):
    for tr in table.findAll('tr', attrs={'role':'row'}):
        date=tr.find('td', attrs={'class':'centeralign smallish nowrap'})
        name=tr.find('a', attrs={'class':'white smallish nearfull padvertless'})
        city=tr.find('td', attrs={'class':'smallish padvertno'})
        for st in tr.findAll('td', attrs={'class':'centeralign padvertless smallish'}):
            state = st.find('a', attrs={'class':'white'})
            states.append(combine(state.text.split()))
        registration=tr.find('a', attrs={'class':'white smaller nospace'})
        dates.append(combine(date.text.split()[1:]))
        names.append(combine(name.text.split()))
        cities.append(combine(city.text.split()))
        registrations.append(combine(registration.text.split()))

df = pd.DataFrame({'Date':dates,'Name':names,'City':cities,'State':states,'Registration':registrations})

#Save data as Tournaments_flexcel.csv on computer
df.to_csv('Tournaments_flexcel.csv', index=False, encoding='utf-8')