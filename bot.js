const Discord = require("discord.js");
var opus = require('opusscript');
var ytdl = require('ytdl-core');
const bot = new Discord.Client();
var currChannel, vol;
var broadcast =  bot.createVoiceBroadcast();
require('dotenv').config()

bot.on("ready", () => {
  console.log("Connected");
});

bot.on("message", (message) => {
  if(message.content.substring(0,1) == "."){
    var args = message.content.substring(1).split(" ");
    var action = args[0];
    var arg;
    if(args.length > 1){
      arg = args[1]
    }
    handleAction(arg, action);
  }
});

function getChannel(name) {
  for(var channel of bot.channels) {
    if(channel[1].name.toLowerCase() === name.toLowerCase()) {
        return channel[1];
    }
  }
}

function streamSound(url){
  const options = {seek: 0, volume: 0.2};
  console.log("Playing sound from " + url);
  if(url){
    const stream = ytdl(url, {filter: 'audioonly'});
    broadcast.playStream(stream, options);
    const dispatcher2 = bot.voiceConnections.first().playBroadcast(broadcast);
  }
}

function playSound(name){
}

function handleAction(arg, action){
  switch(action){
    case "ping":
      message.channel.send("Hallå där, du e la go'");
      break;
    case "join":
      currChannel = getChannel(arg);
      if(currChannel){
        currChannel.join().then(connection => {
          broadcast.playFile('audio/greeting.mp3');
          const dispatcher = connection.playBroadcast(broadcast);
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
    case "yt":
      streamSound(arg);
      break;
    case "stop":
      var connections = bot.voiceConnections.array();
      if(connections.length > 0){
        broadcast.end();
      }
      break;
    default:
      break;
  }
}

bot.login(process.env.TOKEN);
