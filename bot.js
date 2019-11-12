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
    console.log("Logged in as ${client.user.tag}!")
});

client.on("message", msg => {
    if (msg.content === "!helloWorld"){
        msg.reply("Hello ZA WARUDO\nTOKI GA TOMARE!!!");
    }
});

client.login(token);