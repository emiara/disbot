const Discord = require("discord.js");
const client = new Discord.Client();

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
})

client.on('message', msg => {
	if (msg.content == 'ping') {
		msg.reply('Fuck you!')
	}
})

client.login('NzgzMzMyMTM3ODU5OTQwMzkz.X8ZM5w.ziJ82qGfYCTibAUHoIZJ_FqmQuk')
