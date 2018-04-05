# ConfMS server 
## Requirements
1. php
2. composer
3. mongodb
4. memcache, memcache-php 
## Build
Install dependencies:
```
composer install
```
or
```
php composer.phar install
```
in case there are problems, try ignoring scripts and platform reqs:
```
composer install --no-scripts --ignore-platform-reqs
```


Run migrations:
```
php artisan migrate
```
## Development
Run mongo.
```
service mongod start
```

To start development server
Run: 
```
php -S localhost:8000 -t public
```
You can access it's UI using address localhost:8000o

## Troubleshooting

If composer can't install jessengers/mongodb:
install mcrypt and php-mcrypt
