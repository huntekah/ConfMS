#!/usr/bin/python
# -*- coding: utf-8 -*-
import os, sys
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_init import firefox
from MongoScripts.clear_database import clear_database


### TEMPLATE
def setup_module(module):
    pass
    print("setup_module      module:%s" % module.__name__)


def teardown_module(module):
    pass
    print("teardown_module   module:%s" % module.__name__)


def setup_function(function):
    pass
    print("setup_function    function:%s" % function.__name__)


def teardown_function(function):
    pass
    print("teardown_function function:%s" % function.__name__)



class TestCreateConference:
    @classmethod
    def setup(self):
        clear_database()
        self.driver = firefox()


    @classmethod
    def teardown(self):
        self.driver.quit()

    def navigating_page(self):
        try:
            templateArea = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.ID, "createconference"))
            )
        except :
            self.driver.quit()
            raise Exception("NoSuchIDException",
                    "Unable to locate element by ID: createconference")
        #templateArea = self.driver.find_element_by_css_selector("#createconference")
        titleText = templateArea.find_element_by_css_selector("#createconference_title").get_attribute("textContent")
        assert titleText == "Create conference"       
        conferenceNameText = self.driver.find_element_by_css_selector(".createconferencename").get_attribute("textContent")
        assert conferenceNameText == "Conference name"

        inputDiv= self.driver.find_element_by_css_selector(".createconferencename")
        inputDiv.click()
        inputDiv.find_element_by_css_selector("input").send_keys("TestName")                    
        buttonDiv = self.driver.find_element_by_css_selector(".submitbuttoncreate").click()
        
        #wait up to 10s for popup to appear
        try:
            popupButton = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/div[2]//button"))
            )
        except :
            self.driver.quit()
            raise Exception("NoSuchElementException",
                    "Unable to locate element: /html/body/div[2]//button")


        popupButtonText = popupButton.get_attribute("textContent")
        assert popupButtonText.lower() == "ok"
        popupButton.click()

    def test_conference_default_path(self):
        self.driver.get("http://dev.confms.com/")
        self.driver.maximize_window()
        self.navigating_page()

    def test_conference_create_fullscreen(self):
        self.driver.get("http://dev.confms.com/conference/create")
        self.driver.maximize_window()
        self.navigating_page()
    
    def test_conference_create_screenmax_1753(self):
        self.driver.get("http://dev.confms.com/")
        self.driver.set_window_size(1753, 1080)
        self.navigating_page()

    def test_conference_create_screenmax_1393(self):
        self.driver.get("http://dev.confms.com/")
        self.driver.set_window_size(1393, 1080)
        self.navigating_page()

    def test_conference_create_screenmax_1113(self):
        self.driver.get("http://dev.confms.com/")
        self.driver.set_window_size(1113, 1080)
        self.navigating_page()

    def test_conference_create_screenmax_982(self):
        self.driver.get("http://dev.confms.com/")
        self.driver.set_window_size(982, 982)
        self.navigating_page()

if __name__ == "__main__":
    pass

#http://pythontesting.net/framework/pytest/pytest-introduction/#fixtures
