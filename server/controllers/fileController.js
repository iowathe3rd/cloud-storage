const fileService = require("../services/fileService");
const User = require("../models/Users");
const File = require("../models/File");
const config = require('config')
const path = require('path')
const fs = require('fs')

class FileController {
	async createDir(req, res) {
		try {
			const { name, type, parent } = req.body;
			const file = new File({ name, type, parent, user: req.user.id });
			const parentFile = await File.findOne({ _id: parent });
			if (!parentFile) {
				file.path = name;
				await fileService.createDir(file);
			} else {
				file.path = path.join(`${parentFile.path}`, `${file.name}`);
				await fileService.createDir(file);
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
			const files = await File.find({
				user: req.user.id,
				parent: req.query.parent,
			});
			return res.json(files);
		} catch (e) {
			console.log(e);
			return res.status(500).json({ message: "Can not get files" });
		}
	}

	async uploadFile(req, res){
		try {
			const file = req.files.file

			const parent = await  File.findOne({user: req.user.id, _id: req.body.parent})
			const user = await User.findOne({_id: req.user.id})

			if(user.usedSpace + file.size > user.diskSpace){
				return res.status(500).json({message: 'There ne space on the disk'});
			}

			user.usedSpace = user.usedSpace + file.size;

			let filePath;
			if(parent){
				filePath = path.join(`${config.get('filePath')}`, `${user._id}`, `${parent.path}`, `${file.name}`);
				console.log(filePath)
			}else{
				filePath = path.join(`${config.get('filePath')}`, `${user._id}`, `${file.name}`);
				console.log(filePath)
			}

			if(fs.existsSync(filePath)){
				return res.status(400).json({message: 'File already exist'});
			}
			await file.mv(filePath)

			const type = file.name.split('.').pop();
			const dbFile = new File({
				name: file.name,
				type,
				size: file.size,
				path: parent?.path,
				parent: parent?._id,
				user: user._id
			})

			await dbFile.save();
			await user.save();

			res.json(dbFile)
		}catch (e){
			console.log(e)
			return res.status(500).json({message: "Upload error"})
		}
	}
}

module.exports = new FileController();
