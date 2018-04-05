#!/usr/bin/env python

import pymongo
#import json
from pprint import pprint
import sys, csv

def  db_name():
	""" fetches DB_NAME from .env file """
	try:
		with open("../../serwer/.env", 'r', encoding='utf-8-sig') as csvfile:
			reader = csv.reader(csvfile, delimiter='=', quotechar='|')
			for row in reader:
				if row[0] == "DB_DATABASE":
					return row[1]
		raise NameError('No DB_DATABASE found')
	except:
		print(sys.exc_info())

def show_database():
	""" clears all the collections in DB """
	try:
		DB_NAME = db_name()
		print("Attempting to show database " + DB_NAME + "...")
		client = pymongo.MongoClient()
		db = client[DB_NAME]
		collections = db.collection_names()
		for collection in collections:			
			print("\n" + collection + ":")
			cursor = db[collection].find({})
			for document in cursor:		
				pprint(document)
		print("Succesfully showed database!")
	except:
		print("Failed to show database\n" + str(sys.exc_info()[0]))

if __name__ == "__main__":
	show_database()
