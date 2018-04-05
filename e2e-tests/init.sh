## Basic
sudo apt-get -y update

sudo apt-get -y install software-properties-common
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt-get -y update
sudo apt-get -y install python3.6

sudo apt-get -y install pip
apt install python3-pip
pip3 install --upgrade pip
sudo apt-get update && sudo apt-get upgrade

## Pytest Pymongo Selenium Requests
pip3 install -U pytest
pip3 install pymongo selenium requests

## Xvfb
sudo apt-get update
sudo apt-get -y install aptitude
sudo aptitude install -y xvfb 
sudo aptitude install -y xfonts-100dpi xfonts-75dpi xfonts-scalable xfonts-cyrillic
sudo mod u+s `which Xvfb`

## Pyvirtualdisplay
pip3 install pyvirtualdisplay

## Geckodriver
wget https://github.com/mozilla/geckodriver/releases/download/v0.16.1/geckodriver-v0.16.1-linux64.tar.gz
sudo sh -c 'tar -x geckodriver -zf geckodriver-v0.16.1-linux64.tar.gz -O > /usr/bin/geckodriver'
sudo chmod +x /usr/bin/geckodriver
rm geckodriver-v0.16.1-linux64.tar.gz

## Chromedriver
wget https://chromedriver.storage.googleapis.com/2.29/chromedriver_linux64.zip
unzip chromedriver_linux64.zip
sudo chmod +x chromedriver
sudo mv chromedriver /usr/bin/
rm chromedriver_linux64.zip
