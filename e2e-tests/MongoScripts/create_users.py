#!/usr/bin/env python

import pymongo
import json
from pprint import pprint
import sys, csv
from random import randint
from CreateUsers.random_user_data import random_user

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

def clear_database():
	""" clears all the collections in DB """
	try:
		DB_NAME = db_name()
		print("Attempting to clear database " + DB_NAME + "...")
		client = pymongo.MongoClient()
		db = client[DB_NAME]
		collections = db.collection_names()
		for collection in collections:
			print("\n" + collection + ":")
			cursor = db[collection].find({})
			for document in cursor:
				pprint(document)
			result = db[collection].delete_many({})
			print("Deleted count: " + str(result.deleted_count))
		print("Succesfully cleared database!")
	except:
		print("Failed to clear database\n" + str(sys.exc_info()[0]))


def create_users( UsersAmount ):
	""" Adds users to database """
	try:
		DB_NAME = db_name()
		print("Attempting to add users to " + DB_NAME + "...")
		client = pymongo.MongoClient()
		db = client[DB_NAME]
		for i in range(UsersAmount):
			singleUser = random_user()
			db.conference_users.insert(json.loads(singleUser.document))
		print("Succesfully added {} users!".format(UsersAmount))
	except:
		print("Failed to create users\n" + str(sys.exc_info()))

if __name__ == "__main__":
	if len(sys.argv) > 1:
		create_users(int(sys.argv[1]))
	else :
		print("Specify, how many users would you like to create with\npython "
	+ str(sys.argv[0]) + " <number> ")
