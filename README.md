# Contact_Management_rest_API_Express_MongoDB
This project is a contact management REST API backend application built using Express and MongoDB. The application has two collections, one for users and the other for contacts. The user collection stores user details such as name, email, and password. The contacts collection stores contact details such as email, username, and phone number, along with a user ID as a reference to the user who added the contact.

The application has four main API endpoints, /api/users/register, /api/login, /api/users/current, and /api/contacts.
/api/contacts/:id endpoints use for get, update, delete user contact.

The /api/users/register endpoint allows users to register for the application. When a user registers, the function checks if the request body has all the mandatory fields. If it does, it uses the bcrypt package to hash the password and then stores the email, hashed password, and user name in the user model.

The /api/login endpoint allows users to log in to the application. When a user logs in, the function checks if the request body has all the mandatory fields. If it does, it checks if the email and password match the document in the user model using bcrypt.compare method. If the email and password match, it uses the jwt package to create a token jwt.sign() it takes three arguments user object with id, name, and email, secret key and expiry for the token and then returns the token using res.json(token).

The /api/users/current endpoint allows users to get their own user details. When a user makes a request to this endpoint, the function first checks the token validation. If the token validation is successful, it adds the req.user to the user object which gets from the jwt.verify method. Then, it separates the user object and returns it using res.json(user).

The /api/contacts endpoint allows users to get, post, update, and delete contacts. When a user makes a request to any of these endpoints, the function first checks the token validation and adds req.user to the req object.

The application has two middleware, one for error handling and the other for token validation. The error handling middleware function has error handled for status codes 400, 401, 403, 404, 500 .
The packages used for this project are  bcrypt, dotenv, express, express-async-handler, json web token, mongoose, and node mon.

To run the application, you will need to install these packages and configure the .env file with the MongoDB connection string and the secret key for JWT token generation. Then, you can run the application using node index.js or nodemon index.js.

Overall, this contact manager REST API backend application provides a secure and efficient way for users to manage their contacts.
