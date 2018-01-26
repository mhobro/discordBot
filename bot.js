const Discord = require("discord.js");
var opus = require('opusscript');
const bot = new Discord.Client();
var currChannel;
require('dotenv').config()

bot.on("ready", () => {
  console.log("Connected");
});

bot.on("message", (message) => {
  if(message.content.substring(0,1) == "!"){
    var args = message.content.substring(1).split(" ");
    var action = args[0];
    var arg;
    if(args.length > 1){
      arg = args[1]
    }
    handleAction(arg, action);
  }
});

function handleAction(arg, action){
  switch(action){
    case "ping":
      message.channel.send("Hallå där, du e la go'");
      break;
    case "join":
      currChannel = getChannel(arg);
      if(currChannel){
        currChannel.join().then(connection => {
          const dispatcher = connection.playFile('soundfiles/greeting_cut.mp3');
          console.log('Connected to '+ arg);
        }).catch(console.error);
        break;
      }
    case "leave":
      if(currChannel){
          currChannel.leave();
          currChannel = null;
      }
      break;
    default:
      break;
  }
}

function getChannel(name) {
  for (var channel of bot.channels) {
    if (channel[1].name.toLowerCase() === name.toLowerCase()) {
        return channel[1];
    }
  }
}

function playSound(name){
}


bot.login(process.env.TOKEN);
