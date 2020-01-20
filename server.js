const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "frontend", "build")));

app.use((req, res, next) =>
{
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
	next();
});

app.get("*", (req, res) =>
{
	 res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

app.listen(8000);
