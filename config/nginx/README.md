## Dev server config
### Dependencies:
1. nginx

### Init
Following steps have to be performed with root privileges.

First edit main config file:
```
$ vim /etc/nginx/nginx.conf
```
and add:
```
include	conf.d/*;
```
in ```http``` section.


Next make sure that ```conf.d``` directory exists:
```
$ mkdir /etc/nginx/conf.d
```
and copy configuration file there:
```
$ cp ./confms.conf /etc/nginx/conf.d/
```

You also have to add host ```dev.confms.pl``` to ```127.0.0.1``` address in ```/etc/hosts```

### Start nginx
To start server type command (with root privileges):
```
$ systemctl start nginx
```
If You want to enable nginx on system startup:
```
$ systemctl enable nginx
```