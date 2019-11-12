const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();
const fileName = "loginToken";
const token = fs.readFileSync(fileName, "utf-8", (err, data) => {
    if (err){
        return err;
    } else {
        return data;
    }
});

function errorMessage(msg){
    msg.channel.send("???");
}

client.on("ready", () => {
    console.log("IT'S ALIIIIIIVE!")
    console.log(`*cough cough* ${client.user.tag} is online.`)
});

client.on("message", msg => {
    if (msg.content === "!helloWorld"){
        msg.channel.send("Hello World!\n" +
            "We meet again.");
    }
    if (msg.content === "!testPingReply"){
        msg.channel.send(`${msg.author.toString()}`);
    } else if (msg.content.startsWith("!testPing")){
        let userID = msg.mentions.users.first();
        if (userID == undefined || userID === ""){
            errorMessage(msg)
        } else {
            msg.channel.send(`${userID} is a NERDDDDDD`);
        }
    }
});

client.login(token);