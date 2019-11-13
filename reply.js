//const Discord = require("discord.js");

function reply(creatorID, prefix, client, msg) {
    var validMessage = true;
    var commands = msg.content.replace(prefix, "")
        .split(" ");
    var message = "";

    //console.log(`User: ${client.user.id}`);
    console.log(commands[0]);
    switch (commands[0]) {
        case "helloWorld":
            message = "Hello World!\n" +
                "...we've been over this.\n";
            if (msg.guild != null && msg.guild.members.get(creatorID)) {
                message += `${msg.guild.members.get(creatorID).toString()}` +
                    ` write me more dialogue!`;
            } else {
                message += "I'll ask my creator to write me more dialogue."
            }
            break;
        case "testPingReply":
            message = `${msg.author.toString()}`;
            break;
        case "testPing":
            let userArray = msg.mentions.users.array();
            for (i in userArray) {
                message += `${userArray[i]} is a NERDDDDDD\n`;
                if (client.user.id === userArray[i].id){
                    message += "...wait a minute.\n\n**DID YOU JUST-**";
                }
            }
            break;
        default:
            validMessage = false;
            break;
    }

    if (validMessage) {
        console.log(message);
        msg.channel.send(message);
    }
    return validMessage;
}

module.exports = {
    reply
};