const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const { APP_NAME, NODE_ENV, PORT } = require("./src/utils/env");
const { failed } = require("./src/utils/createResponse");
const creditCardRoute = require("./src/router/credit_card.route");
const airlinesRoute = require("./src/router/airline.route");
const productRoute = require("./src/router/product.route");
const transactionRoute = require("./src/router/transactions.route");
const destinationRoute = require("./src/router/destination.route");

// deklarasi express
const app = express();

app.use(helmet());
app.use(xss());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/img", express.static("./public"));

// root router
app.get("/", (req, res) =>
  res.send(`${APP_NAME} API - ${NODE_ENV[0].toUpperCase() + NODE_ENV.slice(1)}`)
);

// main router
app.use(airlinesRoute);
app.use(productRoute);
app.use(transactionRoute);
app.use(destinationRoute);
app.use(creditCardRoute);
app.use(require("./src/router/auth.route"));
app.use(require("./src/router/user.route"));

// 404 router
app.use("*", (req, res) => {
  failed(res, {
    code: 404,
    payload: "Resource on that url not found",
    message: "Not Found",
  });
});

// running server
app.listen(process.env.PORT, (req, res) => {
  console.log(`Server started on port ${PORT} with ${NODE_ENV} environment`);
  console.log(`Visit http://localhost:${PORT}`);
  // console.log(req);
});
