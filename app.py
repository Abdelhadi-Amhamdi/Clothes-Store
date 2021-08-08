# import librarys
from selenium import webdriver
import time

# seting the web driver
browser = webdriver.Chrome()

# brouse the page to get infos
browser.get('https://www.caloriemama.ai/api')

# select file input 
upload = browser.find_element_by_name('file-upload')

# send file to input 
upload.send_keys('/img/path.jpg')

#sleep five min 
time.sleep(5)

# select the result div
get = browser.find_element_by_name('group-name')

# print the result text
print(get.text)