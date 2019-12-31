const fs = require("fs");
const readline = require("readline-sync");
const Discord = require("discord.js");
const reply = require("./reply");
const recorder = require("./recorder");
const client = new Discord.Client();
const fileName = "login/loginToken";

const token = readline.question("Please enter your login token: ", {
    hideEchoBack: true,
});

const creatorID = readline.question("Please enter the creator's client ID: ");

function errorMessage(msg){
    msg.channel.send("???");
}

client.on("ready", () => {
    client.user.setStatus("available");
    client.user.setPresence({
        game: {
            type: "PLAYING",
            name: `with my creator's feelings`
        }
    });
    console.log("IT'S ALIIIIIIVE!");
    console.log(`*cough cough* ${client.user.tag} is online.`);
});

client.on("message", msg => {
    let prefix = "!sky ";
    var validMessage = true;
    if (msg.content.startsWith(prefix)){
        validMessage = reply.reply(creatorID, prefix, client, msg);
        if (validMessage){
            console.log("Message sent!");
        }
    }
    if (msg.content.toLowerCase().includes("vore") && msg.author.username != "SkyBot#6709"){
        let diff = recorder.recordForbiddenWord();
        if (diff < 0){
            msg.channel.send(`You leave me no choice, ${msg.author.toString()}.\n`
                + `I have hereby started a counter to record the last time when someone`
                + ` says the v-word. Your actions are now under scrutiny of She Who Shall Cast`
                + ` The Net Unto The Sky.\n`
                + `**Prepare to be judged.**`);
        } else {
            if (diff < 1){
                msg.channel.send("Not even a day, huh...? Very well.");
                let numOfMembers = 0;
                if (msg.channel.members != undefined){
                    numOfMembers = msg.channel.members.size;
                } else {
                    numOfMembers = 1;
                }
                msg.channel.send("In fealty to Arnold Schwarzenegger (our Undying Lord),"
                    + ` and by the grace of the Golden Throne, I declare Exterminatus upon the channel ${msg.channel.name}.\n`
                    + ` I hereby sign the Death Warrant of an entire world, and consign ${numOfMembers} souls to oblivion.`
                    + ` May Imperial justice account in all balance.\n`
                    + `SkyNet protects.`)
            } else {
                msg.channel.send(`Let it be know that on this day, ${msg.author.toString()}`
                    + ` broke the taboo of uttering the v-word. It has been ${diff} days since`
                    + ` the last incident occurred.\n`);
            }
        }
    }
    if (!validMessage){
        errorMessage(msg)
    }
});

client.login(token);