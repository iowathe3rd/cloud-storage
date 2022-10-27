const fileService = require("../services/fileService");
const User = require("../models/Users");
const File = require("../models/File");
const config = require('config');
const pathModule = require('path');
const fs = require('fs');
const Uuid = require('uuid');

class FileController {
    async createDir(req, res) {
        try {
            const {name, type, parent} = req.body;
            const file = new File({name, type, parent, user: req.user.id});
            const parentFile = await File.findOne({_id: parent});
            if (!parentFile) {
                file.path = name;
                await fileService.createDir(file);
            } else {
                file.path = pathModule.join(`${parentFile.path}`, `${file.name}`);
                await fileService.createDir(req, file);
                parentFile.childs.push(file._id);
                await parentFile.save();
            }
            await file.save();
            return res.json(file);
        } catch (e) {
            console.log(e);
            return res.status(400).json(e);
        }
    }

    async getFiles(req, res) {
        try {
            const {sort} = req.query;
            const files = await File.find({user: req.user.id, parent: req.query.parent,}).sort({[sort]: 1});

            if (sort === 'size'){
                return res.json(files.reverse());
            }

            return res.json(files);
        } catch (e) {
            console.log(e);
            return res.status(500).json({message: "Can not get files"});
        }
    }

    async uploadFile(req, res) {
        try {
            const file = req.files.file

            const parent = await File.findOne({user: req.user.id, _id: req.body.parent})
            const user = await User.findOne({_id: req.user.id})

            if (user.usedSpace + file.size > user.diskSpace) {
                return res.status(400).json({message: 'There no space on the disk'})
            }

            user.usedSpace = user.usedSpace + file.size

            let path;
            if (parent) {
                path = pathModule.join(req.filePath, user._id.toString(), parent.path, file.name)
            } else {
                path = pathModule.join(req.filePath, user._id.toString(), file.name);
            }

            if (fs.existsSync(path)) {
                return res.status(400).json({message: 'File already exist'})
            }
            await file.mv(path)

            const type = file.name.split('.').pop()
            let filePath = file.name
            if (parent) {
                filePath = pathModule.join(parent.path, file.name)
            }
            const dbFile = new File({
                name: file.name,
                type,
                size: file.size,
                path: filePath,
                parent: parent ? parent._id : null,
                user: user._id
            });

            await dbFile.save()
            await user.save()

            res.json(dbFile)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Upload error"})
        }
    }

    async downloadFile(req, res) {
        try {
            const file = await File.findOne({_id: req.query.id, user: req.user.id})
            const filePath = fileService.getPath(req, file)
            if (fs.existsSync(filePath)) {
                return res.download(filePath, file.name)
            }
            return res.status(400).json({message: "File not found"})
        } catch (e) {
            console.log(e);
            return res.status(500).json({message: 'Download error'})
        }
    }

    async deleteFile(req, res) {
        try {
            const file = await File.findOne({_id: req.query.id, user: req.user.id})
            if (!file) {
                return res.status(400).json({message: 'File not found'});
            }
            if(file.childs.length !== 0){
                await fileService.deleteInnerFiles(file);
            }
            fileService.deleteFile(req, file);
            await file.remove();
            return res.json({message: 'File was deleted'});
        } catch (e) {
            console.log(e);
            return res.status(400).json({message: 'Dir is not empty'});
        }
    }

    async searchFile(req, res) {
        try {
            const searchName = req.query.search
            let files = await File.find({user: req.user.id})
            files = files.filter(file => file.name.includes(searchName))
            return res.json(files)
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Search error'})
        }
    }
    async uploadAvatar(req, res){
        try{
            const file = req.files.file;
            console.log(file);
            const avatarType = file.name.split('.').pop()
            console.log(avatarType)
            const user = await User.findById(req.user.id);
            console.log(user)
            const avatarName = Uuid.v4() + '.' + avatarType;
            await file.mv(pathModule.join(config.get('staticPath'), avatarName))
            user.avatar = avatarName;
            await user.save();
            return res.status(200).json(user);
        }catch (e) {
            console.log(e)
            return res.status(500).json({message: 'При загрузке аватара что то пошло не так'})
        }
    }
    async deleteAvatart(req, res){
        try{
            const user = await User.findById(req.user.id);
            fs.unlinkSync(pathModule.join(config.get('staticPath'), user.avatar));
            user.avatar = null;
            await user.save();
            return res.status(200).json(user);
        }catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Delete avatar error'})
        }
    }
}

module.exports = new FileController();
