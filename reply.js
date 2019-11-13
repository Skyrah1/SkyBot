//const Discord = require("discord.js");

function reply(creatorID, prefix, client, msg){
    var validMessage = true;
    var commands = msg.content.replace(prefix, "")
        .split(" ");
    var message = "";

    console.log(commands[0]);
    if (commands.length === 1){
        if (commands[0] === "helloWorld"){
            message = "Hello World!\n" +
                "...we've been over this.\n";
            if (msg.guild != null && msg.guild.members.get(creatorID)){
                message += `${msg.guild.members.get(creatorID).toString()}` +
                ` write me more dialogue!`;
            } else {
                message += "I'll ask my creator to write me more dialogue."
            }
        }
        if (commands[0] === "testPingReply"){
            message = `${msg.author.toString()}`;
        }
    } else if (commands[0] === "testPing") {
        let userArray = msg.mentions.users.array();
        for (i in userArray) {
            console.log(userArray[i].toString());
            message += `${userArray[i]} is a NERDDDDDD\n`;
        }
    } else {
        validMessage = false;
    }

    if (validMessage){
        console.log(message);
        msg.channel.send(message);
    }
    return validMessage;
}

module.exports = {
    reply
};