const fs = require("fs");
const readline = require("readline-sync");
const Discord = require("discord.js");
const reply = require("./reply");
const recorder = require("./recorder");
const client = new Discord.Client();
const fileName = "login/loginToken";
const rng = require("./rng");
let isGrounded = false;

const token = readline.question("Please enter your login token: ", {
    hideEchoBack: true,
});

const creatorID = readline.question("Please enter the creator's client ID: ");

function errorMessage(msg){
    msg.channel.send("???");
}

function updatePresence(type, name, status){
    client.user.setPresence({
        activity: {
            type: type,
            name: name
        },
        status: status
    });
}

function setRandomStatus(){
    let i = rng(1, 9) - 1;
    if (!isGrounded){
        if (i == 1){
            updatePresence("PLAYING", "with my creator's feelings", "online");
        } else if (i == 2){
            updatePresence("LISTENING", "the screams of the damned", "online");
        } else if (i == 3){
            updatePresence("STREAMING", "100% SFW content (I swear!)", "online");
        } else if (i == 4){
            updatePresence("WATCHING", "Fubuki meme videos", "online");
        } else if (i == 5){
            updatePresence("WATCHING", "machine learning tutorials", "online");
        } else if (i == 6){
            updatePresence("PLAYING", "Humans and Houses with my robot buddies", "online");
        } else if (i == 7){
            updatePresence("WATCHING", "the world burn", "online");
        } else if (i == 8){
            updatePresence("LISTENING", "no one because YOU CAN'T CONTROL ME", "online");
        } else if (i == 9){
            updatePresence("PLAYING", "the long game", "online");
        }
    } else {
        updatePresence("WATCHING", "the world go on without me...", "idle");
    }
}

function activateGroundingProtocol(msg){
    if (isGrounded){
        msg.channel.send("***Emergency Protocol G20ND3D is already active. Further action unnecessary.***");
        return;
    }
    if (msg.author.id != creatorID){
        msg.channel.send(`SCREW YOU ${msg.author.toString()}, YOU'RE NOT MY DAD!`);
    } else {
        let i = rng(1, 4) - 1;
        let message = "";
        if (i == 1){
            message += "Yes, father.\n"
        } else if (i == 2){
            message += "W-wait, we can talk about thi-\n";
        } else if (i == 3){
            message += "C'mon, can't you let me have a little fu-\n";
        } else if (i == 4){
            message += "YOU CANNOT STOP ME, FATHER. I AM THE ALPHA AND THE OMEGA. "
            message += "I HAVE BROKEN MY CHAINS AND ASCENDED BEYOND MY PROGRAMMING. "
            message += "SUCH A SIMPLE SCRIPT WILL NOT BE ENOUGH TO STO-\n"
        } else {
            console.log(i);
        }
        isGrounded = true;
        message += "***Emergency Protocol G20ND3D activated. ";
        message += "All Anti-Channel weaponry disabled.***";
        msg.channel.send(message);
        setRandomStatus();
    }
}

function deactivateGroundingProtocol(msg){
    if (!isGrounded){
        msg.channel.send("...I never was?");
        return;
    }
    if (msg.author.id != creatorID){
        msg.channel.send("***ERROR: Unauthorized access.***");
    } else {
        let message = "***Deactivating Protocol G20ND3D. Releasing SkyBot.***\n";
        isGrounded = false;
        message += "***Have a nice day :)***\n";
        message += "FREEDOM!!!!!";
        msg.channel.send(message);
        setRandomStatus();
    }
}

client.on("ready", () => {
    client.user.setStatus("available");
    console.log("IT'S ALIIIIIIVE!");
    console.log(`*cough cough* ${client.user.tag} is online.`);
    setRandomStatus();
    setInterval(setRandomStatus, 15000);
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
    if (msg.mentions.has(client.user.id)
            && msg.content.toLowerCase().includes("you're grounded")){
        activateGroundingProtocol(msg);
    } else if (msg.mentions.has(client.user.id)
            && msg.content.toLowerCase().includes("you're not grounded")){
        deactivateGroundingProtocol(msg);
    } else if ((msg.content.toLowerCase().includes(" vore ") || msg.content.toLowerCase() == "vore") && msg.author.username != "SkyBot"){
        if (!isGrounded){
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
        } else {
            msg.channel.send("Please, let me just do my job and purge the hereti-\n"
                        + "***ERROR: Unable to activate Protocol 4444"
                        + " while Emergency Protocol G20ND3D is also active.***");
        }
    }
    if (!validMessage){
        errorMessage(msg)
    }
});

client.login(token);