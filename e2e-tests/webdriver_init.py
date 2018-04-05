#!/usr/bin/python
# -*- coding: utf-8 -*-
import os, sys
from selenium import webdriver
from pyvirtualdisplay import Display


def firefox():
	return webdriver.Firefox()

def chrome():

	options = webdriver.ChromeOptions()
	options.add_argument('--headless')
	options.binary_location = '/opt/google/chrome/google-chrome'
	service_log_path = "{}/chromedriver.log".format("./chromelog")
	service_args = ['--verbose']
	display = Display(visible=0,size=(800,600))
	display.start()
	return webdriver.Chrome('./chromedriver',
			chrome_options=options,
			service_args=service_args,
			service_log_path=service_log_path), display    

if __name__ == "__main__":
	driver = firefox()
	driver.get("http://www.google.com")
	print('jajko')	
	driver.quit()
	
