const Discord = require('discord.js')
const fs = require('fs');
const config = require('./config.json');
//config
const client = new Discord.Client;
const prefix = config.prefix
const embedcolour = config.embedcolour
const embeddesc = config.embeddesc
client.commands = new Discord.Collection();
const commandFolders = fs.readdirSync('./commands');

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}



client.once('ready', () => {
    console.log("Bot started up successfully. ");
    console.log("Error messages will be shown below.");



    client.user.setActivity(
        "TUI",
        { type: "WATCHING" }
    )
});



client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply(`An error occured executing this command! Here is the details: ${error}`);
    }

});










client.login(config.token);