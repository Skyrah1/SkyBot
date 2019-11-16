const fs = require("fs");
const Discord = require("discord.js");
const reply = require("./reply");
const client = new Discord.Client();
const fileName = "login/loginToken";
const token = fs.readFileSync(fileName, "utf-8", (err, data) => {
    if (err){
        return err;
    } else {
        return data;
    }
});
const creatorID = fs.readFileSync("login/creatorID", "utf-8", (err, data) => {
    if (err){
        return err;
    } else {
        return data;
    }
});

function errorMessage(msg){
    msg.channel.send("???");
};

client.on("ready", () => {
    client.user.setStatus("available");
    client.user.setPresence({
        game: {
            type: "PLAYING",
            name: `with my creator's feelings`
        }
    })
    console.log("IT'S ALIIIIIIVE!");
    console.log(`*cough cough* ${client.user.tag} is online.`);
});

client.on("message", msg => {
    let prefix = "!sky ";
    var validMessage = true;
    if (msg.content.startsWith(prefix)){
        validMessage = reply.reply(creatorID, prefix, client, msg);
    }
    if (!validMessage){
        errorMessage(msg)
    }
});

client.login(token);