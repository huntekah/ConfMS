echo ''
echo '.......................<( ConfMS )>.....................'
echo 'This script will install composer and yarn reqs for you!'
echo '.......................<( ConfMS )>.....................'
echo ''
( cd serwer && composer install --no-scripts --ignore-platform-reqs )
( cd client && yarn install )
service mongod start && echo 'Mongod started'
sudo lsof -t -i tcp:80 -s tcp:listen | sudo xargs kill
service nginx start && echo 'Nginx started'

usage()
{
	echo "usage: ./install.sh "
	echo "--new Clears the database "
	echo "--init Install Additional packages."
}

while [ "$1" != "" ]; do
    case $1 in
        -n | --new )
		( cd e2e-tests/MongoScripts/ && python3 clear_database.py)
                                ;;
        -i | --init )
		( cd e2e-tests && sudo ./init.sh )
                                ;;
        -h | --help )           usage
                                exit
                                ;;
        * )                     usage
                                exit 1
    esac
    shift
done


