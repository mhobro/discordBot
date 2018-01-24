const Discord = require("discord.js");
const client = new Discord.Client();

require('dotenv').config()

client.on("ready", () => {
  console.log("Started successfully");
});

client.on("message", (message) => {
  if (message.content.startsWith("ping")) {
    message.channel.send("Hallå där, du e la go'");
  }
});

client.login(process.env.TOKEN);
