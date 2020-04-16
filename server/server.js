const express = require('express')
const app = express()
const bodyParser = require("body-parser");

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send("Welcome to fayzisme's api")
})

require("./routes/customer.routes")(app);
require("./routes/driver.routes")(app);
require("./routes/product.routes")(app);
require("./routes/order.routes")(app);
require("./routes/orderitem.routes")(app);

const db = require("./models");

const reset = 0;


if (reset) {
	//drop the table if it already exists
	db.sequelize.sync({ force: true }).then(() => {
		 console.log("Drop and re-sync db.");
	});
}
else {
	db.sequelize.sync();
}

app.listen(8000, function() {
    console.log(`Server running on http://localhost:8000`)
})
module.exports = app