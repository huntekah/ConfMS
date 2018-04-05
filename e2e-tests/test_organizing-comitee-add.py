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

class TestOrganizingComiteeAdd:
    @classmethod
    def setup(self):
        clear_database()
        start_date = date.today()     
        end_date = start_date + timedelta(days=randint(1,350))
        create_conference("Test Organizing Comitee Add", start_date, end_date)
        self.driver = firefox()
        self.driver.get("http://dev.confms.com/")


    @classmethod
    def teardown(self):
        self.driver.quit()

    def navigating_dashboard(self):
        try:
            templateArea = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.ID, "dashboard"))
            )
        except :
            self.driver.quit()
            raise Exception("NoSuchIDException",
                    "Unable to locate element by ID: dashboard")
        
        titleText = templateArea.find_element_by_css_selector("#dashboard_title").get_attribute("textContent")
        assert titleText == "Dashboard"
        organizingCommiteeTile = templateArea.find_element_by_class_name("TileContainerOrganizingcommittee")
        tileTitleText = organizingCommiteeTile.find_element_by_class_name("TileTitle").get_attribute("textContent") 
        tileContentText = organizingCommiteeTile.find_element_by_class_name("TileContent").get_attribute("textContent") 
        assert tileTitleText == "Organizing committee"
        assert tileContentText == "0 members"
        organizingCommiteeTile.find_element_by_css_selector(".TileActions .add").click()

    def navigating_organizing_committee_add(self):
        email1 = "test1@test.com"
        email2 = "test2.test@put.poznan.pl"
        email3 = "test3@gmail.com"
        try:
            templateArea = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.ID, "invitetocommittee"))
            )
        except :
            self.driver.quit()
            raise Exception("NoSuchIDException",
                    "Unable to locate element by ID: invitetocommittee")
        
        titleText = templateArea.find_element_by_css_selector("#invitetocommittee_title").get_attribute("textContent")
        assert titleText == "Invite to committee"       
        emailInputArea = templateArea.find_element_by_id("EmailInput")
        emailInputArea.send_keys(email1)
        assert emailInputArea.get_attribute("textContent") == email1
        addButton = templateArea.find_element_by_id("AddButton")
        addButton.click()

    def test_conference_add_dashboard(self):
        self.driver.maximize_window()
        self.navigating_dashboard()
        self.navigating_organizing_committee_add()

#    def test_conference_create_screenmax_1753(self):
 #       self.driver.set_window_size(1753, 1080)
  #      self.navigating_page()

   # def test_conference_create_screenmax_1393(self):
    #    self.driver.set_window_size(1393, 1080)
     #   self.navigating_page()

   # def test_conference_create_screenmax_1113(self):
    #    self.driver.set_window_size(1113, 1080)
     #   self.navigating_page()

   # def test_conference_create_screenmax_982(self):
    #    self.driver.set_window_size(982, 982)
     #   self.navigating_page()


if __name__ == "__main__":
    pass

