#!/usr/bin/env python

from random import randint
from .user_constants import *


""" EXAMPLE:
            title: "Mr",
            name: "Lanpejcz",
            surname: "Multipejcz",
            affiliation: "Poznan University of Technology",
            email: "example@gmail.com",
            password: "qwe123",
            passwordConfirm: "qwe123",
            address: "someAddress",
            phoneNumber: "+48123456789",
            roles: ["organizer"] """


class random_user:

	def __init__(self):
		self.generate_random_user()
		print("user Created")
		self.create_document()
		print("document Created")

	def create_document(self):
		self.document = "{" + """
	"title": "{}",
    	"name": "{}",
    	"surname": "{}",
    	"affiliation": "{}",
    	"email": "{}",
    	"password": "{}",
    	"address": "{}",
    	"phoneNumber": "{}",
    	"roles": ["{}"]
""".format(self.title, self.name, self.surname, self.affiliation, self.email,
 self.password_hash, self.address, self.phone_number, self.role) + "}"
		print(self.document)

	def generate_random_user(self):
		self.random_title()
		self.random_surname()
		self.random_name()
		self.random_affiliation()
		self.random_email()
		self.random_address()
		self.random_phone_number()
		self.random_password_hash()
		self.random_role()

	def random_title(self):
		self.title = str(titles[ randint(0,len(titles)-1) ])

	def random_surname(self):
		self.surname = str(surnames[ randint(0,len(surnames)-1) ])

	def random_name(self):
		self.name = str(names[ randint(0,len(names)-1) ])

	def random_affiliation(self):
		self.affiliation = str(affiliations[ randint(0,len(affiliations)-1) ])

	def random_email(self):
		self.email = self.name + self.surname + "@" + str(email_providers[ randint(0,len(email_providers)-1) ])

	def random_address(self):
		self.address = str(addresses[ randint(0,len(addresses)-1) ])

	def random_phone_number(self):
		self.phone_number = "+48 " + str(randint(500100100,899100100))

	def random_password_hash(self):
	#password is 'siemka10'
		self.password_hash = "$2y$10$IowpeT4vNMIxRWHHllKMwOfFzBdSaw6nGj6D0R/WcQiS.gF4252YO"

	def random_role(self):
		print(str(roles[ randint(0,len(roles)-1) ]))
		self.role = str(roles[ randint(0,len(roles)-1) ])


if __name__ == "__main__":
	user = random_user()
	user.create_document()
