const Discord = require("discord.js");
const krypter = require("./krypter.js")
const tokenFile = require("./token.js");
const client = new Discord.Client();

const {OpusEncoder} = require('@discordjs/opus');


// Create the encoder.
// Specify 48kHz sampling rate and 2 channel size.
const encoder = new OpusEncoder(48000, 2);

// Encode and decode.
const encoded = encoder.encode(buffer);
const decoded = encoder.decode(encoded);

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
})


client.on('message', msg => {
	if (msg.content == 'ping') {
		msg.reply('Fuck everyone!')
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

client.on('message', message => {
	// Ignore messages that aren't from a guild
	if (!message.guild) return;

	// If the message content starts with "!kick"
	if (message.content.startsWith('!kick')) {
		// Assuming we mention someone in the message, this will return the user
		// Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
		const user = message.mentions.users.first();
		// If we have a user mentioned
		if (user) {
			// Now we get the member from the user
			const member = message.guild.member(user);
			// If the member is in the guild
			if (member) {
				/**
				 * Kick the member
				 * Make sure you run this on a member, not a user!
				 * There are big differences between a user and a member
				 */
				member
					.kick('Optional reason that will display in the audit logs')
					.then(() => {
						// We let the message author know we were able to kick the person
						message.reply(`Successfully kicked ${user.tag}`);
					})
					.catch(err => {
						// An error happened
						// This is generally due to the bot not being able to kick the member,
						// either due to missing permissions or role hierarchy
						message.reply('I was unable to kick the member');
						// Log the error
						console.error(err);
					});
			} else {
				// The mentioned user isn't in this guild
				message.reply("That user isn't in this guild!");
			}
			// Otherwise, if no user was mentioned
		} else {
			message.reply("You didn't mention the user to kick!");
		}
	}
});

console.log(client.users);
// Log our bot in using the token from https://discord.com/developers/applications
client.login(tokenFile.token);

