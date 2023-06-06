const MeetingModel = require('../../DatabaseSetup/Mongoose.Meetings.Schemas');

const UploadMOm = async (req, res, next) => {
	const { id, url } = req.body;
	try {
		const drop = await MeetingModel.Meeting_Model.findOneAndUpdate(
			{ _id: id },
			{ $set: { MinutesOfMeeting: url } },
			{ new: true }
		);
		console.log(drop);
		res.status(200).json({
			status: 'Success',
			message: 'Updated Successfully'
		});
	} catch (Error) {
		console.log(Error);
		res.status(500).json({
			status: 'Error',
			message: 'Unable to fetch students lists !'
		});
	}
};

module.exports = { UploadMOm };
