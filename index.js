const { Client, GatewayIntentBits } = require('discord.js');
const config = require('dotenv').config()
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const token = `${process.env.DISCORD_TOKEN}`;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
	console.log('Ready!');
});

client.login(token);

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'text-imagine') {
        const response = await openai.createCompletion({
            model: "text-davinci-002",
            prompt: interaction.options.getString('prompt'),
            temperature: 0,
            max_tokens: 6,
          });
        
        console.log(response?.data?.choices)
		await interaction.reply(response?.data?.choices[0]?.text);
    }
});