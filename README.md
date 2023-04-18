# Udagram Image Filtering Microservice

Node-Express microservice that creates an endpoint to filter images by running a simple script.

## Project Tasks
1. Set up Node Environment
2. Create a new endpoint in the server.ts file
3. Deploying your system
4. Submit your project
    * Git repo: https://github.com/cswiley/udagram-image-filter
    * Screenshot EB Dashboard
    [![EB Screen Shot #1][product-screenshot-1]](http://udagram-wiley-image-filter-prod.us-east-1.elasticbeanstalk.com/)
    [![EB Screen Shot #2][product-screenshot-2]](http://udagram-wiley-image-filter-prod.us-east-1.elasticbeanstalk.com/)



## Usage
Endpoint: /filteredimage?image_url={{URL}}


## Installation
```sh
# install packages
npm i
 ```

## Development 
```sh
# run dev environment
npm run dev
 ```


## Deploying your system
```sh
# init application
eb init 
```
```sh
# create environment
eb create 
```
```sh
# deploy changes
eb deploy 
```


<!-- Markdown references>
[product-screenshot-1]: images/eb-dashboard.png
[product-screenshot-2]: images/eb-environment.png