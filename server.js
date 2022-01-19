require("dotenv").config({ path: "./config.env" });
const errorHandler = require("./middleware/error");

const express = require("express");
const connectDB = require("./config/db");
connectDB();
const app = express();
app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));

// Error Handler should be last piece of middleware
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
// to handle any error uncaught error we assign the app.listen to a variable then we use the process.on to handle the error.
const server = app.listen(PORT, () =>
 console.log(`Server is listening on http://localhost:${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
 console.log(`Logged Error ${err}`);
 server.close(() => process.exit(1));
});
