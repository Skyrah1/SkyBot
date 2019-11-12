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

client.on("ready", () => {
    console.log("IT'S ALIIIIIIVE!")
    console.log(`*cough cough* ${client.user.tag} is online.`)
});

client.on("message", msg => {
    if (msg.content === "!helloWorld"){
        //msg.reply("Hello ZA WARUDO\nTOKI GA TOMARE!!!");
        msg.channel.send("Hello ZA WARUDO\nTOKI GA TOMARE!!!");
    } else if (msg.content === "!testPingReply"){
        msg.channel.send(`${msg.author.toString()}`);
    }
});

client.login(token);