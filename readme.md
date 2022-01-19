# The is an Advanced MERN stack Application

It handles authentication from the user registering, creating tokens, saving tokens in the browser's local storage, protecting routes

Note: Having the ability to reset your password with email would be in future application.

## How to use

- run 'git clone ...'
- run 'npm start'

### Login and registration API

root url is http://localhost:5000

All the user API router follows '/api/auth/' For authenticated resources

| #   | Routers                         | Verbs | Progress | Is Private | Description             |
| --- | ------------------------------- | ----- | -------- | ---------- | ----------------------- |
| 1   | '/api/auth/register'            | POST  | DONE     | No         | Register a user         |
| 2   | '/api/auth/login'               | POST  | DONE     | No         | Login a user            |
| 3   | '/api/private'                  | GET   | DONE     | YES        | Access private resource |
| 4   | '/api/auth/forgotpassword'      | POST  | DONE     | No         | Forget password page    |
| 4   | '/api/auth/resetpassword/token' | PUT   | DONE     | No         | Used to reset password  |

The register route takes a username, email and password and returns a token.
Login takes your email and password and return you a token.
To access the private route you have to first login to get your token then set the header to Authorization and the value to Bearer then give a space and provide your token to login. Then you can access this route.
ForgotPassword takes your email alone.
ResetPassword takes in your new password
Note: After 10mins the resetpassword link would expire.
