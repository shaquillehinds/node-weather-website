const path = require("path");
const express = require("express");
const hbs = require("hbs");
const dotenv = require("dotenv");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();

dotenv.config();

// Define paths for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Shaquille Hinds",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Shaquille Hinds",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "This is the help page",
    name: "Shaquille Hinds",
  });
});

app.get("/myweather", (req, res) => {
  const lat = req.query.latitude;
  const long = req.query.longitude;
  forecast(lat, long, (error, data) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send({ location: data.location, summary: data.summary() });
    }
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide an address",
    });
  }

  geocode(req.query.address, (error, { lat, long, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }
    forecast(lat, long, (error, data) => {
      if (error) {
        return res.send({
          error,
        });
      }
      return res.send({
        location,
        forecast: data.summary(),
        address: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessage: "Page not found.",
    title: "404",
    name: "Shaquille Hinds",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "Help article not found",
    title: "404",
    name: "Shaquille Hinds",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
