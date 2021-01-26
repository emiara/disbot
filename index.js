const Discord = require("discord.js");
const krypter = require("./krypter.js");
const tokenFile = require("./token.js");
const client = new Discord.Client();
const fs = require('fs');
const {exec} = require("child_process");

var YoutubeMp3Downloader = require("youtube-mp3-downloader");

function os_func() {
	this.execCommand = function (cmd, callback) {
		exec(cmd, (error, stdout, stderr) => {
			if (error) {
				console.error(`exec error: ${error}`);
				return;
			}

			callback(stdout);
		});
	}
}

var os = new os_func();

//Configure YoutubeMp3Downloader with your settings
var YD = new YoutubeMp3Downloader({
	"ffmpegPath": "/bin/ffmpeg",        // FFmpeg binary location
	"outputPath": "audio",    // Output file location (default: the home directory)
	"youtubeVideoQuality": "highestaudio",  // Desired video quality (default: highestaudio)
	"queueParallelism": 2,                  // Download parallelism (default: 1)
	"progressTimeout": 2000,                // Interval in ms for the progress reports (default: 1000)
	"allowWebm": false                      // Enable download from WebM sources (default: false)
});

const {OpusEncoder} = require('@discordjs/opus');

// Create the encoder.
// Specify 48kHz sampling rate and 2 channel size.
const encoder = new OpusEncoder(48000, 2);


// client.on('message', async message => {
// // 	// Join the same voice channel of the author of the message
// if (message.member.voice.channel) {
// 	const connection = await message.member.voice.channel.join();

// 	// Create a dispatcher
// 	const dispatcher = connection.play('./audio/audio.mp3');

// 	dispatcher.on('start', () => {
// 		console.log('audio.mp3 is now playing!');
// 	});

// 	dispatcher.on('finish', () => {
// 		console.log('audio.mp3 has finished playing!');
// 		connection.disconnect();
// 	});

// 	// Always remember to handle errors appropriately!
// 	dispatcher.on('error', console.error);

// }}
// );



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


client.on('message', msg =>{
	if (msg.content==('monty hall')){
		var monty = require("./monty.js")
		msg.channel.send(monty.monty(0))
		client.on('message', msg=>{
			if ((msg.content==1) || (msg.content==2)||(msg.content == 3)){
				msg.channel.send(monty.monty(msg.content))
				client.on('message', msg=>{
					msg.channel.send(monty.monty(msg.content))
					return 0
				})
			}
		return 0
		})
	}
	return 0
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
client.on('message', async message => {
	if (message.content.startsWith('!youtube')) {
		console.log(message.content.split("=")[1].split("?")[0]);
		//Download video and save as MP3 file
		YD.download(message.content.split("=")[1].split("?")[0], "audio.mp3");
		YD.on("finished", async function (err, data) {
			console.log(JSON.stringify(data));
			os.execCommand('rm -f audio/*.wav && rm -f audio/audio_rev.mp3 && mpg123 -w audio/audio.wav audio/audio.mp3 && sox audio/audio.wav audio/audio_rev.wav reverse && rm -f audio/audio.mp3 && ffmpeg -i audio/audio_rev.wav audio/audio_rev.mp3', async function (returnValue) {
				console.log("command executed!");
				const connection = await message.member.voice.channel.join();

				// Create a dispatcher
				const dispatcher = connection.play('./audio/audio_rev.mp3');

				dispatcher.on('start', () => {
					console.log('audio.mp3 is now playing!');
				});

				dispatcher.on('finish', () => {
					console.log('audio.mp3 has finished playing!');
					connection.disconnect();
				});

				// Always remember to handle errors appropriately!
				dispatcher.on('error', console.error);
			});
		});

		YD.on("error", function (error) {
			console.log(error);
		});

		YD.on("progress", function (progress) {
			console.log(JSON.stringify(progress));
		})


	}
})
client.login(tokenFile.token);

