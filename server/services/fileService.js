const fs = require("fs");
const path = require("path");
const config = require("config");

class FileService {
	createDir(file) {
		const filePath = path.join(__dirname, `../files/${file.user}/${file.path}`);
		return new Promise((resolve, reject) => {
			try {
				if (!fs.existsSync(filePath)) {
					fs.mkdirSync(filePath);
					return resolve({ message: "File was created" });
				} else {
					return reject({ message: "File already exist" });
				}
			} catch (e) {
				console.log(e)
				return reject({ message: "File error" });
			}
		});
	}
	deleteFile(file) {
		const path = this.getPath(file)
		console.log(path)
		if (file.type === 'dir') {
			fs.rmdirSync(path)
		} else {
			fs.unlinkSync(path)
		}
	}
	getPath(file) {
		return path.join(config.get('filePath'), file.user.toString(), file.path, file.name);
	}
}

module.exports = new FileService();
