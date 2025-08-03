# Episode 1

- Create a Repository
- Initialize the Repository
- `node_modules` , `package.json` , `package-lock.json`
- Install Express
- Create a Server
- Listen to PORT 5555
- Write Request Handlers for `/test` , `/hello`
- Install `nodemon` and update scripts inside `package.json`
- Difference between `Caret ` and `Tilde` in Semantic Versioning.
- What is `Semantic Versioning`
- What are `Dependencies`
- What are `Transitive Dependencies`
- What is the role of `-g` while `npm install`
- What is the role of `.bin` folder inside `node_modules`. And what it contains...

# Episode 2

- Initialize `git` into your Project.
- Create a `.gitignore` file and add `node_modules` folder to it.
- Create a remote repository on `github`.
- Push all your code to remote origin.
- Play with Routes and Route Extensions. eg: `/hello` , `/hello/2`, `/xyz` and so on...
- Order of `Routes` matter a lot.
- Install Postman App make a `workspace/collection` -> test API call.
- Write Logic to handle `GET` `POST` `PATCH` `PUT` `DELETE` API calls and test them on Postman.
- Explore Different Types of Routing and use of `?`,`+`,`*`,`()` in the Routes.
- Use of `regex` in routes like : `/a/`,`/.*fly$`.
- Reading the `query params` in the routes.
- Practice Handling `Dynamic` Routes.

# Episode 3

# If we don't send response back to the client then the request will be left hanging.
# If we have multiple route handlers and if we want to call or execute other route handlers using next and if we send back the reponse in every route handler then in that case the response of the first route handler will sent back to the client and along with that a error is also thrown in the console as shown below:\

`Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client`

- Multiple Route Handlers - Play with the code.
- What the hell is `next()` function in route  Handler.
- `next()` function with errors along with `res.send`.
- You have to Practice the below syntax:
- ` app.use("/route",rh1,rh2,rh3,rh4,rh5)`.
- ` app.use("/route",[rh1,rh2,rh3,rh4,rh5])`.
- ` app.use("/route",[rh1,rh2,rh3,rh4],rh5)`.
- ` app.use("/route",[rh1,rh2,rh3],rh4,rh5)`.
- ` app.use("/route",[rh1,rh2],rh3,rh4,rh5)`.
- ` app.use("/route",[rh1],rh2,rh3,rh4,rh5)`.
- What is a `Route Hander`?
- What is a `Middleware`? Why do we need it?
- How Express JS basically handles requests behind the scenes?
- Difference between `Route Handler` and a `Middleware`.

# By default `res.send()` sends 200 as a status code if you want to send other status code you can set it using `res.status`.

- What is the use case of `app.all()`?
- What is the use case of `app.use()`?
- What is the Difference between `app.use()` and `app.all()`?
- Write a dummy `auth` middleware for `admin`?
- Write a dummy `auth` middleware for all `user` routes except `/user/login`?
- Error Handling using `app.use('/',(err,req,res,next)=>{});`.

# Episode 4
- Create a free`clutser` on the official `MongoDB` Website.
- Install `mongoose` library.
- Connect your Application to the Database `"Connection-url"/DevTinder`.
- Call the `ConnectDb` function and connect to database before Starting application on `PORT`.
- Create a `userSchema` and `User` Model.
- Create a `POST` `/signup` route to add user data to the Database.
- Push some `users` using `/signup` APi using Postman.
- What is the Purpose of `_v` field in the Mongodb Collection.
- Do Error Handling using `try`,`catch`.

# Episode 5
- What is the difference between `JSON` and a `JS Object`.

# Sometimes we noticed that if we try send data from our API to the server in the form of `JSON` in `req.body` and if we try to `console.log(req.body)` then it gives us `undefined`. This is because our `server` not able to read that `JSON` data. So to solve this problem and to make our `server ` to read the data in `JSON` format we need the help of a `Middleware` which is given to us by `Express` itself and it is known as `express.json`.

- What is the purpose of `express.json()`.
- Working of `app.use(express.json())`.
- Add the `express.json()` to your app.
- Make your `/signup` API dynamic to recieve data from the End user or Client.
- `User.findOne()` with duplicate `emailIDs` which object will returned.
- Create an API - `Get user by Email`.
- Create an API - `Feed API -> GET /feed -> get all the users from the database`.
- Use `user.find({})` as well as `user.findOne({})`.
- Create an API -> To `get` user by `_id`.
- Create an API -> To `delete` user by `_id`.
- Difference between `PATCH` and `PUT` HTTP method?
- Create an API -> To `update` user by `_id`.
- Explore the `mongoose Docs` dpecifically for `Schemas and Models methods`.
- What are `options` in `Model.findByIdAndUpdate()` method, explore more about it.
- Create an API -> To `update` an user by `emailID`.


# Episode 6
- Explore Schema Type `options` from the Documentation.
- Add `required`,`unique`,`minLength`,`maxLength`,`min`,`max`,`default`.
- How to add a Custom `Validator` function in your `Schemas` for `gender`.
- By `default` `validators` will only run if there is new user created in the database.
- Improve the DB Schema - PUT all appropriate validations on each field in Schema.
- Add `timestamps ` to the `user ` schema.
- Add `API level Validations on PATCH and POST API`.
- `Data Sanitization` -> Add `API validations ` for each field.
- Install `Validator` package in your Project.
- Explore `Validator` functions. like: `validator.isEmail()`,`validator.isStrongPassword()` , `validator.isURL()`.
- Never trust `req.body`.

# Episode 7
- Validate Data in `signUp` API.
- Install `bcrypt` package in your project.
- Create a `passwordHash` using `bcrypt.hash`.
- And store `user's password` in `encrypted ` format in your Database.
- Create a `/login` API .
- Compare `passwords` and throw `error` if `email`  or `password` is invalid.

# Episode 8
- What is `JWT` Token.
- What is the purpose of `JWT` tokens.
- What are `cookies`.
- In order to read the cookie we need a middleware or we can say that a package which is known as `cookie-parser`.
- Install `cookie-parser` in your Project.
- Just send a `dummy cookie` to the user.
- create a `GET /profile` API and check if you get the cookie back or not.
- Install `jsonwebtoken` in your Project.
- In `/login` API , after `email, password` validation create a `JWT token ` and send it back to the user inside cookie.
- Read the cookies inside your `/profile` API and find the `logged In User`.

