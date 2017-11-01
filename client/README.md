# ConfMS webclient
## Requirements
1. nodeJs
2. yarn
## Build
Install dependencies:
```
yarn install
```
Build dist:
```
yarn run build
```
## Development
To start development server (serving static content)
1. Create config.json (based on config.json.dist)
2. Run: 
```
yarn run start
```
## Mock API server
To start mock API server run:
```
node mock/index.js
```
It will start by default on port 8080
You can access it's UI using address localhost:8080
