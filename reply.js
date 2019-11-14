//const Discord = require("discord.js");
const c = require("./command");

var message;
var messageString = "";
var creatorID;

const validCommands = [];

validCommands.push(new c.Command("helloWorld", (args) => {
    messageString = "Hello World!\n" +
        "...we've been over this.\n";
    if (message.guild != null && message.guild.members.get(creatorID)) {
        messageString += `${message.guild.members.get(creatorID).toString()}` +
            ` write me more dialogue!`;
    } else {
        messageString += "I'll ask my creator to write me more dialogue."
    }
    return true;
}));

validCommands.push(new c.Command("testPingReply", (args) => {
    messageString = `${message.author.toString()}`;
}));

validCommands.push(new c.Command("testPing", (args) => {
    let userArray = message.mentions.users.array();
    for (i in userArray) {
        messageString += `${userArray[i]} is a NERDDDDDD\n`;
        if (client.user.id === userArray[i].id) {
            messageString += "...wait a minute.\n\n**DID YOU JUST-**";
        }
    }
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
    return true;

}));


for (let i = 0; i < validCommands.length; i++) {
    console.log(validCommands[i].toString());
}

function reply(cID, prefix, client, msg) {
    message = msg;
    messageString = "";
    creatorID = cID;
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
        msg.channel.send(messageString);
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

module.exports = {
    reply
};