const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const authRouter = require("./routes/auth.routes");
const fileRouter = require("./routes/file.routes");
const app = express();
const PORT = config.get("serverPort");
const cors = require("cors");

app.use(cors());
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
