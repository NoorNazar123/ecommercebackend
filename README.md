<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

E-Commerce Fashion Site - Backend

This is the backend repository for an e-commerce fashion site built with NestJS, Prisma, and PostgreSQL. It provides a robust, scalable, and maintainable API for managing users, products, orders, carts, and more.

Features

User Management: Register, login, and manage user profiles.

Product Management: Add, update, and delete fashion products.

Order Management: Create, track, and manage orders.

Shopping Cart: Add/remove items, calculate totals, and checkout.

Authentication & Authorization: JWT-based authentication and role-based access control (RBAC).

Email Notifications: Send transactional emails (e.g., order confirmations).

Scalable Architecture: Modular and feature-based structure for easy scaling.

Database: PostgreSQL with Prisma ORM for type-safe database operations.

Testing: Unit tests, integration tests, and end-to-end tests.

Deployment: Ready for deployment to cloud platforms like AWS, Heroku, or Vercel.

Tech Stack

Backend: NestJS
Database: PostgreSQL
ORM: Prisma
Authentication: JWT, Passport.js
Email: Nodemailer
Testing: Jest, Supertest
API Documentation: Swagger
Deployment: Docker, AWS, or any cloud platform

Project Structure

src/
├── auth/ # Authentication and Authorization
│ ├── strategies/ # Passport/JWT strategies
│ ├── guards/ # Auth guards (e.g., JWT guard, Roles guard)
│ ├── decorators/ # Custom decorators (e.g., @User, @Roles)
│ ├── interfaces/ # Interfaces for auth-related types
│ └── auth.module.ts # Auth module
│
├── users/ # User management
│ ├── dto/ # Data Transfer Objects (DTOs)
│ ├── entities/ # User entity (if using TypeORM) or Prisma models
│ ├── interfaces/ # Interfaces for user-related types
│ ├── services/ # User service (business logic)
│ ├── controllers/ # User controllers (API endpoints)
│ └── users.module.ts # User module
│
├── products/ # Product management
│ ├── dto/ # DTOs for product-related operations
│ ├── entities/ # Product entity or Prisma models
│ ├── services/ # Product service (business logic)
│ ├── controllers/ # Product controllers (API endpoints)
│ └── products.module.ts # Product module
│
├── orders/ # Order management
│ ├── dto/ # DTOs for order-related operations
│ ├── entities/ # Order entity or Prisma models
│ ├── services/ # Order service (business logic)
│ ├── controllers/ # Order controllers (API endpoints)
│ └── orders.module.ts # Order module
│
├── cart/ # Shopping cart management
│ ├── dto/ # DTOs for cart-related operations
│ ├── entities/ # Cart entity or Prisma models
│ ├── services/ # Cart service (business logic)
│ ├── controllers/ # Cart controllers (API endpoints)
│ └── cart.module.ts # Cart module
│
├── mailer/ # Email services (renamed from "mail")
│ ├── templates/ # Email templates
│ ├── services/ # Email service (business logic)
│ └── mailer.module.ts # Mailer module
│
├── prisma/ # Prisma-related files
│ ├── schema.prisma # Prisma schema file
│ ├── migrations/ # Prisma migrations
│ └── prisma.service.ts # Prisma service for database operations
│
├── common/ # Shared utilities and modules
│ ├── decorators/ # Global decorators
│ ├── filters/ # Exception filters
│ ├── interceptors/ # Global interceptors
│ ├── middleware/ # Global middleware
│ ├── pipes/ # Validation pipes
│ ├── guards/ # Global guards
│ ├── utils/ # Utility functions
│ └── common.module.ts # Common module
│
├── config/ # Configuration files (e.g., env variables)
│ ├── app.config.ts # Application configuration
│ ├── db.config.ts # Database configuration
│ └── auth.config.ts # Auth configuration
│
├── test/ # Test files
│ ├── unit/ # Unit tests
│ ├── integration/ # Integration tests
│ └── e2e/ # End-to-end tests
│
├── app.module.ts # Root module
├── main.ts # Application entry point
└── ...

# Getting Started

Prerequisites
Node.js (v18 or higher)
PostgreSQL (v14 or higher)
npm or yarn

# Installation

Clone the repository:
git clone https://github.com/NoorNazar123/ecommercebackend
cd ecommerce-fashion-backend
Install dependencies:

# npm install

Set up environment variables:
Create a .env file in the root directory.
Add the following variables:

# .env

PORT=4689
DATABASE_URL='postgresql://.ap-southeast-1.aws.neon.tech/neondb?sslmode=require'
JWT_SECRET_TOKEN=s2yPuvdVMLZZ0En4QMAPl7FV1WwMre
JWT_EXPIRES_TOKEN=6s  
JWT_REFRESH_TOKEN=iMJxzNCIDNOqqh0s
JWT_REFRESH_EXPIRES_TOKEN=2d

# google auth

GOOGLE_CLINET_ID=826886684253-eefemfe
GOOGLE_CLIENT_SECRET=GOCfelfefefefefefefewdw
GOOGLE_CALLBACK_URL=http://localhost:8080/auth/google/callback

# Email verfication

EMAIL_USER=example@gmail.com
EMAIL_PASSWORD=fkmg kemr f kfer
EMAIL_SERVICE=gmail  
APP_URL=http://localhost:3000

npx prisma migrate dev --name init

# Start the application:

npm run start:dev
API Documentation
Access the Swagger API documentation at http://localhost:3000/api.

Testing
Run unit tests:

npm run test
Run end-to-end tests:

npm run test:e2e
Generate test coverage report:

npm run test:cov
Deployment

Build the application:
npm run build

Run in production mode:
npm run start:prod

Deploy to a cloud platform:

Use Docker to containerize the application.

Deploy to AWS, Heroku, or any cloud platform of your choice.

Contributing
We welcome contributions! Please follow these steps:

# Fork the repository.

Create a new branch (git checkout -b feature-your-branch-name).
Commit your changes (git commit -m 'Add some feature').
Push to the branch (git push origin feature-your-branch-name).

Open a pull request.

Support
For support, please open an issue on the GitHub repository.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgments
NestJS for the amazing framework.

Prisma for the powerful ORM.

PostgreSQL for the reliable database.

# Stay in Touch

Author: M Noor e Nazar
Email: noorenazar.prog@gmail.com
Website: https://noor-e-nazars-portfolio-vfb4.vercel.app/

This README provides a comprehensive overview of your e-commerce fashion site backend.
