const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const authRouter = require("./routes/auth.routes");
const fileRouter = require("./routes/file.routes");
const app = express();
const fileUpload = require('express-fileupload')
const PORT = process.env.PORT ||  config.get("serverPort");
const cors = require("cors");
const filePathMiddleware = require('./middleware/filepath.middleware')
const path = require('path');

app.use(fileUpload({}))
app.use(cors());
app.use(filePathMiddleware(path.resolve(__dirname, 'files')));
app.use(express.static('static'))
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/files", fileRouter);

const start = async () => {
	try {
		mongoose.connect(config.get("dbUrl"));
		app.listen(PORT, () => {
			console.log(`server started at port ${PORT}`);
		});
	} catch (e) {
		throw e;
	}
};

start();
