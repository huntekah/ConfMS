#!/usr/bin/python
# -*- coding: utf-8 -*-
import time
from datetime import date, timedelta
import requests


def create_conference(name, start_date, end_date):
    data = {
        'name':name,
        'startDate':start_date,
        'endDate':end_date
    }    
    endpoint_url = "http://dev.confms.com/api/v1/conference"
    response = requests.post(endpoint_url,data=data)    
    print(response.text)
    return response

if __name__ == "__main__":
    #start_date = date.today()     
    #end_date = start_date + timedelta(days=2)
    create_conference("TestName", start_date, end_date)
    