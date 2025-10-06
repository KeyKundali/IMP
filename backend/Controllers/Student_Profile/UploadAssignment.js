const formidable = require('formidable');
var path = require('path');
var fs = require('fs');
const Assignment = require('../../DatabaseSetup/Mongoose.Assignment.Schema');
const UploadAssignment = (req, res) => {
	const form = new formidable.IncomingForm();
	try {
		form.parse(req, async function(err, fields, files) {
			const assignment = new Assignment({
				name: fields.assignmentName,
				mentor_id: fields.mentor_id,
				lastDate: fields.deadline
			});
			await assignment.save((err, data) => {
				if (err) {
					res.status(500).send({ message: err });
				}
			});
			var newPath = path.join(
				process.cwd(),
				'/assets/' +
					fields.folderName +
					'/' +
					fields.mentor_id +
					'/' +
					assignment._id +
					'/' +
					files.file.originalFilename
			);
			var pathsToBeMade = path.join(process.cwd(), '/assets/' + fields.folderName + '/' + fields.mentor_id);
			if (!fs.existsSync(pathsToBeMade)) {
				fs.mkdirSync(pathsToBeMade);
			}
			pathsToBeMade = path.join(
				process.cwd(),
				'/assets/' + fields.folderName + '/' + fields.mentor_id + '/' + assignment._id
			);
			if (!fs.existsSync(pathsToBeMade)) {
				fs.mkdirSync(pathsToBeMade);
			}
			// Use streaming to avoid loading entire file into memory
			const readStream = fs.createReadStream(files.file.filepath);
			const writeStream = fs.createWriteStream(newPath);

			readStream.pipe(writeStream);

			writeStream.on('finish', function() {
				// Clean up temp file
				fs.unlink(files.file.filepath, (err) => {
					if (err) console.log('Temp file cleanup error:', err);
				});
				return res.send('Successfully uploaded');
			});

			writeStream.on('error', function(err) {
				console.log(err);
				return res.status(500).send({
					success: false,
					error: err
				});
			});
		});
	} catch (Error) {
		console.log(Error);
	}
};

module.exports = { UploadAssignment };
