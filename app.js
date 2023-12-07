var express = require("express");
var app = express();

app.use(express.json());

Houses = require('./Houses/housesEndpoints')(app);
Users = require('./Users/usersEndpoints')(app);

app.listen(1000, () => {
    console.log("Node 4PP server running on http://localhost:1000");
});
