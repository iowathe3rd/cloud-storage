const fs = require("fs");
const path = require("path");
const File = require("../models/File");

class FileService {
    createDir(req, file) {
        const filePath = this.getPath(req, file);
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

    deleteFile(req, file) {
        let filePath = this.getPath(req, file)
        if (file.type === 'dir') {
            fs.rmSync(filePath, {recursive: true});
        } else {
            fs.unlinkSync(filePath)
        }
    }
    //backend func in service file... i know)
    async deleteInnerFiles(file){
        try {
            for (const childId of file.childs) {
                const innerFile = await File.findOne({_id: childId});
                if(innerFile.childs.length !== 0) {
                    await this.deleteInnerFiles(innerFile)
                    await innerFile.remove();
                }
                await innerFile.remove();
            }
        }catch (e) {
            console.log('рекурсия сломана', e)
        }
    }
    getPath(req, file) {
        return path.join(req.filePath, file.user.toString(), file.path);
    }

}

module.exports = new FileService();
