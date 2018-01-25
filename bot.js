const Discord = require("discord.js");
const client = new Discord.Client();
var currChannel;

require('dotenv').config()

client.on("ready", () => {
  console.log("Connected");
});

client.on("message", (message) => {
  if(message.content.substring(0,1) == "!"){
    var args = message.content.substring(1).split(" ");
    var action = args[0];
    var arg;
    if(args.length > 1){
      arg = args[1]
    }
    switch(action){
      case "ping":
        message.channel.send("Hallå där, du e la go'");
        break;
      case "join":
        channel = client.channels.find('name', arg);
        currChannel = channel;
        channel.join().then(connection =>
          console.log('Connected to '+ arg)
        ).catch(console.error);
        break;
      case "leave":
        if(currChannel){
            currChannel.leave();
            currChannel = NULL;
        }
        break;
      default:
        break;
    }
  }
});



client.login(process.env.TOKEN);
