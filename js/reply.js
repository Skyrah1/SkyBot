//const Discord = require("discord.js");
const c = require("./command");

var botClient;
var message;
var messageString = "";
var creatorID;

const validCommands = [];

validCommands.push(new c.Command("helloWorld", () => {
    messageString = "Hello World!\n" +
        "...we've been over this.\n";
    if (message.guild != null && message.guild.members.get(creatorID)) {
        messageString += `${message.guild.members.get(creatorID).toString()}` +
            ` write me more dialogue!`;
    } else {
        messageString += "I'll ask my creator to write me more dialogue."
    }
    message.channel.send(messageString);
    return true;
}));

validCommands.push(new c.Command("testPingReply", () => {
    messageString = `I see you, ${message.author.toString()}.`;
    message.channel.send(messageString);
    return true;
}));

validCommands.push(new c.Command("testPing", () => {
    let userArray = message.mentions.users.array();
    let gottem = false;
    if (userArray.length === 0){
        return false;
    }
    for (i in userArray) {
        messageString += `${userArray[i]} is a NERDDDDDD\n`;
        if (botClient.user.id === userArray[i].id) {
            gottem = true;
        }
    }
    if (gottem){
        messageString += "...wait a minute.\n\n**DID YOU JUST-**";
    }
    message.channel.send(messageString);
    return true;
}));

validCommands.push(new c.Command("rand", (args) => {
    var result = 0;
    if (args.length === 1) {
        result = rng(0, args[0]);
    } else if (args.length === 2) {
        result = rng(args[0], args[1]);
    } else {
        return false;
    }
    if (result != 20) {
        messageString += `${message.author.toString()} got a ${result.toString()}!`;
    } else {
        messageString += `"Roll for luck, ${message.author.toString()}."\n"TWENTY!"\n"Not good enough."\n"wait wha-"`;
    }
    message.channel.send(messageString);
    return true;

}));

validCommands.push(new c.Command("Tate", () => {
    sendImage(`"Oh, Torm..."`, "icons/tate.PNG");
    return true;
}));


for (let i = 0; i < validCommands.length; i++) {
    console.log(validCommands[i].toString());
}

function reply(cID, prefix, client, msg) {
    message = msg;
    messageString = "";
    creatorID = cID;
    botClient = client
    var validMessage = false;
    var commandKeyword = msg.content.replace(prefix, "")
        .split(" ")[0];
    var args = msg.content.replace(prefix, "")
        .replace(commandKeyword + " ", "")
        .split(" ");

    //console.log(`User: ${client.user.id}`);
    console.log(commandKeyword);
    console.log(args.toString());

    for (i = 0; i < validCommands.length && !validMessage; i++) {
        validMessage = validCommands[i].execute(commandKeyword, args);
    }

    if (validMessage) {
        console.log(messageString);
    }
    return validMessage;
}

function rng(min, max) {
    console.log(`Min and max: ${min}, ${max}`);
    var difference = parseInt(max) - parseInt(min);
    var result = 0;
    if (difference != max) {
        result = Math.floor((Math.random() * (difference + 1)));
        result += parseInt(min);
    } else {
        result = Math.floor((Math.random() * max) + 1);
    }
    console.log(result);
    //console.log(result);
    return result;
}

function sendImage(string, image){
    message.channel.send(`${string}\n`, {
        files: [image]
    });
}

module.exports = {
    reply
};