# ConfMS webclient
## Requirements
1. nodeJs
2. yarn (optional)
## Install dependencies:
```
yarn install
```
or
```
npm install
```
## Development
To start development server (serving static content)
1. Create config.json (based on config.json.dist)
2. Run: 
```
yarn run start
```
or
```
npm run start
```

## Mock API server
To start mock API server run:
```
node mock/index.js
```
It will start by default on port 8080
You can access it's UI using address localhost:8080

## Build
Build dist:
```
yarn run build
```
or
```
npm run build
```
