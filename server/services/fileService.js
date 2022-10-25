const fs = require("fs");
const path = require("path");
const config = require("config");

class FileService {
    createDir(file) {
        const filePath = path.join(config.get('filePath'), `${file.user}`, `${file.path}`);
        return new Promise((resolve, reject) => {
            try {
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath);
                    return resolve({message: "File was created"});
                } else {
                    return reject({message: "File already exist"});
                }
            } catch (e) {
                console.log(e)
                return reject({message: "File error"});
            }
        });
    }

    deleteFile(file) {
        let filePath = this.getPath(file)
        if (file.type === 'dir') {
            fs.rmSync(filePath, {recursive: true});
        } else {
            fs.unlinkSync(filePath)
        }
    }

    getPath(file) {
        return path.join(config.get('filePath'), file.user.toString(), file.path);
    }
}

module.exports = new FileService();
