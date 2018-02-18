const Discord = require("discord.js");
var opus = require('opusscript');
var ytdl = require('ytdl-core');
const bot = new Discord.Client();
var fs = require('fs');
var currChannel, vol;
var broadcast =  bot.createVoiceBroadcast();
var streamDispatcher;
var streamOptions = {seek: 0, volume: 0.2};
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
    handleAction(arg, action, message);
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
  console.log("Playing sound from " + url);
  if(url){
    const stream = ytdl(url, {filter: 'audioonly'});
    broadcast.playStream(stream, streamOptions);
    streamDispatcher = bot.voiceConnections.first().playBroadcast(broadcast);
  }
}

function changeVolume(vol){
  if(vol && streamDispatcher && (parseFloat(vol) <= 100 || parseFloat(vol) >= 0)){
    streamDispatcher.setVolume(parseFloat(vol)/100);
    streamOptions.volume = parseFloat(vol)/100;
  }
}

function readFromFile(path, callback){
  fs.readFile(path, 'utf8', function(err, contents) {
    callback(contents);
  });
}

function handleAction(arg, action, message){
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
    case "vol":
      changeVolume(arg);
      break;
    case "stop":
      var connections = bot.voiceConnections.array();
      if(connections.length > 0){
        broadcast.end();
      }
      break
    case "torture":
      var text = readFromFile("msg.txt", function(text){
        message.channel.send(text);
      });
    default:
      break;
  }
}

bot.login(process.env.TOKEN);
