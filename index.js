const Discord = require("discord.js");
const krypter = require("./krypter.js")
const client = new Discord.Client();


client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
})

client.on('message', msg => {
	if (msg.content == 'ping') {
		msg.reply('Fuck you!')
	}
})

client.on('message', msg => {
	if (msg.content.includes('encrypt ')) {
		msg.channel.send(krypter.encrypt(msg.content, 2))
	}
})

client.on('message', message => {
	// If the message is "what is my avatar"
	if (message.content === 'what is my avatar') {
	  // Send the user's avatar URL
	  message.reply(message.author.displayAvatarURL());
	}
})
