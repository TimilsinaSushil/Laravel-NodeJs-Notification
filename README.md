# Laravel + Node.js Notification System

This project demonstrates a **notification system** using a **Laravel API** and a **Node.js microservice (Fastify + TypeScript)**. The services communicate through **RabbitMQ**, using **Docker Compose** for local development.

---
## Copy env files and configure your own values if  needed.
```
cp .env.sample .env
cp LaravelAPI/.env.example LaravelAPI/.env
cp NodeJsMicroService/.env.sample NodeJsMicroService/.env
```

Environment for LaravelAPI and NodeJsMicroService should be based on the value of .env file of main folder. The sample values are already provided otherwise you can change your own values.


---
## Install dependencies for local development
```
cd LaravelAPI
composer install
cd..
cd NodeJsMicroService
npm install
```


## Run the System

```
docker compose up -d --build
```

---
## Services and Ports

Laravel API: http://localhost:8080

Node API (Fastify): http://localhost:3000

RabbitMQ UI: http://localhost:15672 


---
## API Documentation

Refer to this postman link for api documentation: 

https://www.postman.com/moviementor/globalyhub/documentation/1gflzk1/laravel-nodejs-notification