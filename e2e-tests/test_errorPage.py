#!/usr/bin/python
# -*- coding: utf-8 -*-
import os, sys
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_init import firefox
from MongoScripts.clear_database import clear_database
from datetime import date, timedelta
from api_calls import create_conference
from random import randint

errorDescriptionGeneral = "Ooops, an error occured! \nWe are very sorry :|";
errorDescription404 = "We can't seem to find the page\n you're looking for :(";

class TestEditConference:
    @classmethod
    def setup(self):
        self.driver = firefox()
        


    @classmethod
    def teardown(self):
        self.driver.quit()

    def navigating_page(self, code, description):
        try:
            WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.ID, "_title"))
            )
        except :
            self.driver.quit()
            raise Exception("NoSuchIDException",
                    "Unable to locate element by ID: _title")
        errorCode = self.driver.find_element_by_id("ErrorCode").get_attribute("textContent")
        errorDescription = self.driver.find_element_by_id("ErrorDescription").get_attribute("textContent")
        assert errorCode == "ERROR " + str(code)       
        assert errorDescription == description




    def test_error_page_random_code(self):
        code = randint(1,999)
        self.driver.get("http://dev.confms.com/error/"+str(code))
        self.driver.maximize_window()
        description = errorDescription404 if (code == 404) else errorDescriptionGeneral
        self.navigating_page(code,description)

    def test_error_page_default(self):
        self.driver.get("http://dev.confms.com/error")
        self.driver.maximize_window()
        self.navigating_page("",errorDescriptionGeneral)

    def test_error_page_404_code(self):
        self.driver.get("http://dev.confms.com/error/404")
        self.driver.maximize_window()
        self.navigating_page(404,errorDescription404)

    def test_conference_create_screenmax_1753(self):
        self.driver.get("http://dev.confms.com/error/1753")
        self.driver.set_window_size(1753, 1080)
        self.navigating_page(1753,errorDescriptionGeneral)

    def test_conference_create_screenmax_1393(self):
        self.driver.get("http://dev.confms.com/error/1393")
        self.driver.set_window_size(1393, 1080)
        self.navigating_page(1393,errorDescriptionGeneral)

    def test_conference_create_screenmax_1113(self):
        self.driver.get("http://dev.confms.com/error/1113")
        self.driver.set_window_size(1113, 1080)
        self.navigating_page(1113,errorDescriptionGeneral)

    def test_conference_create_screenmax_982(self):
        self.driver.get("http://dev.confms.com/error/982")
        self.driver.set_window_size(982, 982)
        self.navigating_page(982,errorDescriptionGeneral)


if __name__ == "__main__":
    pass
