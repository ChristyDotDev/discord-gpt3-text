const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('text-imagine')
		.setDescription('Takes a prompt, runs it through GPT3 and returns the result')
		.addStringOption(option =>
			option.setName('prompt')
				.setDescription('The prompt')
				.setRequired(true))
};