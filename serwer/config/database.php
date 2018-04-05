 <?php
    return [
        'default' => 'mongodb',
        'connections' => [
            'mongodb' => ['driver' => 'mongodb',
                'host' => env('DB_HOST'),
		'port' => 27017,
		'database' => env('DB_DATABASE'),
                'username' => env('DB_USERNAME'),
                'password' => env('DB_PASSWORD'),
                'options' => [
                    'database' => 'admin' // sets the authentication database required by mongo 3
                ]
            ]
        ],
        'migrations' => 'migrations'
    ];
    ?>
