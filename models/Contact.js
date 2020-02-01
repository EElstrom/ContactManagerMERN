const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
{
	userId:
	{
		type: String,
		required: true
	},
	firstname:
	{
		type: String,
		required: false,
		default: ''
	},
	lastname:
	{
		type: String,
		required: false,
		default: ''
	},
	phoneNumber:
	{
		type: [String],
		required: false,
		default: []
	},
	email:
	{
		type: [String],
		required: false,
		default: []
	},
	address:
	{
		type: [String],
		required: false,
		default: []
	}
});

module.exports = Contact = mongoose.model("contact", contactSchema);
