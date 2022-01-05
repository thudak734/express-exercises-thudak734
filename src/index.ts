// require the express module
import express from 'express';
 
// require the cors module
import cors from "cors"

//require the router object (and all the defined routes) to be used in this file
import path from "path";
import shopRoutes from "./routes/shop-routes";
 
// creates an instance of an Express server
const app = express();
 
// enable Cross Origin Resource Sharing so this API can be used from web-apps on other domains
app.use(cors())
 
// allow POST and PUT requests to use JSON bodies
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));

//use the router onject (and all the defined routes)
app.use("/", shopRoutes);
 
// define the port
const port = 3000;
 
// run the server
app.listen(port, () => console.log(`Listening on port: ${port}.`));
