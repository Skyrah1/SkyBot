//const Discord = require("discord.js");

function reply(creatorID, prefix, client, msg){
    var validMessage = true;
    var commands = msg.content.replace(prefix, "")
        .split(" ");
    var message = "";

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
    } else if (commands[0] === "testPing"){
        let userID = msg.mentions.users.first();
        if (userID == undefined || userID === ""){
            validMessage = false;
        } else {
            message = `${userID} is a NERDDDDDD`;
        }
    }

    if (validMessage){
        msg.channel.send(message);
    }
    return validMessage;
}

module.exports = {
    reply
};