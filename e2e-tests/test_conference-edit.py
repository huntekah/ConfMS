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

class TestEditConference:
    @classmethod
    def setup(self):
        clear_database()
        start_date = date.today()     
        end_date = start_date + timedelta(days=2)
        create_conference("Test Conference Name", start_date, end_date)
        self.driver = firefox()
        self.driver.get("http://dev.confms.com/conference/edit")


    @classmethod
    def teardown(self):
        self.driver.quit()

    def navigating_page(self):
        try:
            templateArea = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.ID, "editconference"))
            )
        except :
            self.driver.quit()
            raise Exception("NoSuchIDException",
                    "Unable to locate element by ID: editconference")
        titleText = templateArea.find_element_by_css_selector("#editconference_title").get_attribute("textContent")
        assert titleText == "Edit conference"       
        conferenceNameLabel = self.driver.find_element_by_css_selector(".editconferencename").get_attribute("textContent")
        assert conferenceNameLabel == "Conference name"
        conferenceNameInput = self.driver.find_element_by_css_selector(".editconferencename input")
        assert conferenceNameInput.get_attribute("value") == "Test Conference Name"

        conferenceNameInput.click()
        conferenceNameInput.clear()
        conferenceNameInput.send_keys("TestName")                   
        buttonDiv = self.driver.find_element_by_css_selector(".submitbuttonedit").click()
       
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


    def test_conference_edit(self):
        self.driver.maximize_window()
        self.navigating_page()

    def test_conference_create_screenmax_1753(self):
        self.driver.set_window_size(1753, 1080)
        self.navigating_page()

    def test_conference_create_screenmax_1393(self):
        self.driver.set_window_size(1393, 1080)
        self.navigating_page()

    def test_conference_create_screenmax_1113(self):
        self.driver.set_window_size(1113, 1080)
        self.navigating_page()

    def test_conference_create_screenmax_982(self):
        self.driver.set_window_size(982, 982)
        self.navigating_page()


if __name__ == "__main__":
    pass


    #  //let errorCode = this.props.match.params.errorCode || ''
    #  //let errorMessage = errorCode === 404 ? "We can't seem to find the page you're looking for :(" : "Ooops, an Error occured! :|"
