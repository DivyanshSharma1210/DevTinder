# DevTinder Backend — Learning Journey 📚💻

This repository documents my complete learning journey while building **DevTinder**, a backend project where developers can connect, collaborate, and work on projects together.  
Through this project, I explored **Node.js**, **Express**, **MongoDB**, authentication, middleware, validation, and other backend essentials.  

The content is organized into **episodes**, each focusing on specific concepts, implementation steps, and practice exercises.

---

## 📑 Table of Contents
- [Episode 1 — Project Setup & Basics](#episode-1)
- [Episode 2 — Git & Routing](#episode-2)
- [Episode 3 — Middleware & Request Handling](#episode-3)
- [Episode 4 — MongoDB Setup & User Signup](#episode-4)
- [Episode 5 — Express JSON Middleware](#episode-5)
- [Episode 6 — Schema Validations](#episode-6)
- [Episode 7 — Password Hashing & Login](#episode-7)
- [Episode 8 — JWT & Cookies](#episode-8)
- [Episode 10 — Routers & Profile Management](#episode-10)
- [Episode 11 — Connection Requests & Indexing](#episode-11)
- [Episode 12 — Request Review & Populate](#episode-12)
- [Episode 13 — Feed API & Pagination](#episode-13)

---

## Episode 1 — Project Setup & Basics

- Create a Repository
- Initialize the Repository
- Understand `node_modules`, `package.json`, `package-lock.json`
- Install **Express**
- Create a server and listen on **PORT 5555**
- Write request handlers for `/test` and `/hello`
- Install **nodemon** & update scripts in `package.json`
- Learn difference between **Caret (^)** and **Tilde (~)** in Semantic Versioning
- What is **Semantic Versioning**
- What are **Dependencies** & **Transitive Dependencies**
- Role of `-g` in `npm install`
- Purpose of `.bin` folder inside `node_modules`

---

## Episode 2 — Git & Routing

- Initialize Git in the project
- Create `.gitignore` file and add `node_modules`
- Create a remote repository on GitHub and push code
- Play with routes and route extensions (`/hello`, `/hello/2`, `/xyz`)
- Understand that **route order matters**
- Install **Postman** and create workspace/collection
- Handle GET, POST, PATCH, PUT, DELETE API calls
- Explore different types of routing and route patterns (`?`, `+`, `*`, `()`)
- Use regex in routes (`/a/`, `/.*fly$`)
- Read query parameters in routes
- Practice dynamic routes

---

## Episode 3 — Middleware & Request Handling

> **Note:** If you don’t send a response back to the client, the request will hang.  
> Sending a response in one handler and calling `next()` can cause:  
> `Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client`

- Work with multiple route handlers
- Understand `next()` function
- Use `next()` with errors and `res.send`
- Practice syntax variations with `app.use()` and multiple handlers
- Learn the difference between **Route Handler** and **Middleware**
- By default, `res.send()` sends status code 200; set custom codes with `res.status()`
- Use cases of `app.all()` vs `app.use()`
- Write dummy `auth` middleware for admin and for all user routes except `/user/login`
- Error handling with `app.use('/', (err, req, res, next) => {})`

---

## Episode 4 — MongoDB Setup & User Signup

- Create free MongoDB cluster
- Install **mongoose**
- Connect to DB before starting server
- Create `userSchema` and `User` model
- Create `/signup` POST API
- Test inserting users via Postman
- Learn about `_v` field in MongoDB
- Error handling with try-catch

---

## Episode 5 — Express JSON Middleware

- Difference between JSON and JS Object
- Why `req.body` is `undefined` without `express.json()`
- Purpose of `express.json()` middleware
- Make `/signup` API dynamic
- Use `User.findOne()` with duplicate emails
- Create APIs:
  - Get user by email
  - Feed API: GET `/feed` (get all users)
  - Get user by `_id`
  - Delete user by `_id`
  - Update user by `_id` or `emailID`
- Difference between PATCH & PUT
- Explore `mongoose` docs for schema/model methods
- Learn about options in `findByIdAndUpdate()`

---

## Episode 6 — Schema Validations

- Explore schema type options
- Add validations: `required`, `unique`, `minLength`, `maxLength`, etc.
- Custom validator for gender
- Add timestamps to schema
- API-level validations for POST & PATCH
- Data sanitization
- Install **validator** package and use functions like:
  - `validator.isEmail()`
  - `validator.isStrongPassword()`
  - `validator.isURL()`

---

## Episode 7 — Password Hashing & Login

- Validate signup data
- Install **bcrypt**
- Hash passwords before storing
- Create `/login` API
- Compare passwords and handle invalid credentials

---

## Episode 8 — JWT & Cookies

- Learn about JWT tokens & cookies
- Install **cookie-parser** and **jsonwebtoken**
- Send dummy cookie to user
- Create `/profile` API and read cookies
- Generate JWT token on login and store in cookie
- Create `userAuth` middleware
- Apply `userAuth` to protected routes
- Set JWT & cookie expiry to 7 days

---

## Episode 10 — Routers & Profile Management

- Explore Tinder APIs
- Group routes under routers: `authRouter`, `profileRouter`, `requestRouter`, `userRouter`
- Import routers in `app.js` and use as middleware
- Create `/logout`, `/profile/edit`, `/profile/password` APIs
- Validate all incoming data

---

## Episode 11 — Connection Requests & Indexing

- Create `connectionRequest` schema with validations
- POST `/connection/request` API with validations
- Learn about `$or`, `$and`, `$not`, `$nor` in Mongoose
- Explore `Schema.pre("save")`
- Read about compound indexes and indexing best practices
- Understand pros & cons of indexes

---

## Episode 12 — Request Review & Populate

- POST `/request/review/:status/:requestId` API
- Learn POST vs GET thought process
- Use `ref` and `populate`
- GET `/user/request/received` API with checks
- GET `/user/connections` API with checks

---

## Episode 13 — Feed API & Pagination

- Create GET `/user/feed` API
- Explore `$nin`, `$ne`, `$and`, `$or` queries
- Learn about pagination
- Formula for skip: `skip = (page - 1) * limit`
- Use `skip()` and `limit()` in MongoDB

---

## 📌 Summary
This repository is more than just code — it’s a complete backend learning roadmap for **Node.js + Express + MongoDB**.  
From basic routing to advanced authentication and database optimization, each episode builds on the last, ensuring a strong understanding of backend development.

---
