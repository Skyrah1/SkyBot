//const Discord = require("discord.js");

function reply(prefix, client, msg){
    var validMessage = true;
    let command = msg.content.replace(prefix, "");
    if (command === "helloWorld"){
        msg.channel.send("Hello World!\n" +
            "We meet again.");
    }
    if (command === "testPingReply"){
        msg.channel.send(`${msg.author.toString()}`);
    } else if (command.startsWith("testPing")){
        let userID = msg.mentions.users.first();
        if (userID == undefined || userID === ""){
            validMessage = false;
        } else {
            msg.channel.send(`${userID} is a NERDDDDDD`);
        }
    }
    return validMessage;
}

module.exports = {
    reply
};