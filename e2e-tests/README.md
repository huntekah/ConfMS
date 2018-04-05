# Tests
## Installation
First make sure you install:
 * PyMongo
 * python 3.5^
 * PyTest
 * selenium
 * xvfb
 * geckodriver
 * firefox
   
For chromedriver simply run this command in e2e-tests folder:
```sh
./ChromeDriver_setup.sh
```

## Run tests
To run all tests, simply run this command in e2e-tests folder:
```sh
pytest
```

if intended to run just one test:
```sh
pytest example.py -vv
```

[![N|Solid](https://docs.pytest.org/en/latest/_static/pytest1.png)](https://docs.pytest.org/en/latest/)