# Laravel + Node.js Notification System

This project demonstrates a **notification system** using a **Laravel API** and a **Node.js microservice (Fastify + TypeScript)**. The services communicate through **RabbitMQ**, using **Docker Compose** for local orchestration.

---

## Configure Environment Variables

Initally configure .env file in main directory for docker compose. Here is the sample env.

RABBITMQ_USER=guest
RABBITMQ_PASSWORD=guest
DB_DATABASE=laravelapi
DB_USERNAME=admin
DB_PASSWORD=secret

Based on that the value set above configure the following.

LaravelAPI/.env
NodeJsMicroservice/.env


## Run the System

docker compose up -d --build

## Services and Ports

Laravel API: http://localhost:8000

Node API (Fastify): http://localhost:3000

RabbitMQ UI: http://localhost:15672 


## API Documentation

Refer to this postman link for apidocumentation: https://www.postman.com/moviementor/globalyhub/request/7iol3lx/publish-notifications