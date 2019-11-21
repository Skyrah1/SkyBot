//const Discord = require("discord.js");
const commandLib = require("./command");
const comboLib = require("./combo");


var botClient;
var message;
var messageString = "";
var creatorID;

const validCommands = [];
//const comboList = [];

validCommands.push(new commandLib.Command("helloWorld", () => {
    messageString = "Hello World!\n" +
        "...we've been over this.\n";
    if (message.guild != null && message.guild.members.get(creatorID)) {
        messageString += `${message.guild.members.get(creatorID).toString()}` +
            ` write me more dialogue!`;
    } else {
        messageString += "I'll ask my creator to write me more dialogue."
    }
    message.channel.send(messageString);
    return true;
}));

validCommands.push(new commandLib.Command("testPingReply", () => {
    messageString = `I see you, ${message.author.toString()}.`;
    message.channel.send(messageString);
    return true;
}));

validCommands.push(new commandLib.Command("testPing", () => {
    let userArray = message.mentions.users.array();
    let gottem = false;
    if (userArray.length === 0){
        return false;
    }
    for (i in userArray) {
        messageString += `${userArray[i]} is a NERDDDDDD\n`;
        if (botClient.user.id === userArray[i].id) {
            gottem = true;
        }
    }
    if (gottem){
        messageString += "...wait a minute.\n\n**DID YOU JUST-**";
    }
    message.channel.send(messageString);
    return true;
}));

validCommands.push(new commandLib.Command("rand", (args) => {
    var result = 0;
    if (args.length === 1) {
        result = rng(0, args[0]);
    } else if (args.length === 2) {
        result = rng(args[0], args[1]);
    } else {
        return false;
    }
    if (result != 20) {
        messageString += `${message.author.toString()} got a ${result.toString()}!`;
    } else {
        messageString += `"Roll for luck, ${message.author.toString()}."\n"TWENTY!"\n"Not good enough."\n"wait wha-"`;
    }
    message.channel.send(messageString);
    return true;

}));

validCommands.push(new commandLib.Command("Tate", () => {
    sendImage(
        `A cinnamon roll capable of breaking your knees and smashing your skull in.\n`
        + `(image created on LogoMakr.com)\n`,
        "icons/tate.PNG");
    return true;
}));
validCommands.push(new commandLib.Command("Phibi", () => {
    sendImage("She would die for you, if only she were capable of actually dying.\n"
        + "(image created on LogoMakr.com)\n",
        "icons/phibi.PNG");
    return true;
}));
validCommands.push(new commandLib.Command("Gaia", () => {
    //sendImage(`"Oh, Torm..."`, "icons/tate.PNG");
    message.channel.send("Soon...");
    return true;
}));
validCommands.push(new commandLib.Command("Rembrandt", () => {
    //sendImage(`"Oh, Torm..."`, "icons/tate.PNG");
    message.channel.send("Soon...");
    return true;
}));
validCommands.push(new commandLib.Command("Stormchaser", () => {
    //sendImage(`"Oh, Torm..."`, "icons/tate.PNG");
    message.channel.send("Soon...");
    return true;
}));
validCommands.push(new commandLib.Command("Alistar", () => {
    //sendImage(`"Oh, Torm..."`, "icons/tate.PNG");
    message.channel.send("Soon...");
    return true;
}));
validCommands.push(new commandLib.Command("See-rius", () => {
    //sendImage(`"Oh, Torm..."`, "icons/tate.PNG");
    message.channel.send("Soon...");
    return true;
}));
validCommands.push(new commandLib.Command("DM", () => {
    //sendImage(`"Oh, Torm..."`, "icons/tate.PNG");
    message.channel.send("Soon...");
    return true;
}));

validCommands.push(new commandLib.Command("iLoveYou", () => {
    const responses = [
        `I love you too, ${message.author.toString()}.\n`,
        "I know.",
        "Thanks!",
        "Me too.",
        "A horrible decision, really.",
        "Who doesn't?",
        "why",
        "*laughs nervously*",
        "*laughs hysterically*",
        "**YEET**",
        "I'm sorry",
        "*finger guns*"
    ];
    let i = rng(0, responses.length) - 1;
    messageString = responses[i];
    message.channel.send(messageString);
    return true;
}));

validCommands.push(new commandLib.Command("comboList", () => {
    //comboList.clean();
    messageString += "Here is the list of combo keywords:\n\n";
    const comboList = comboLib.getComboList();
    for (i = 0; i < comboList.length; i++){
        messageString += `- ${comboList[i].getKeyword()}\n`;
    }
    messageString += `\nTo actually see what they do, use the "combo" command\n` +
                        "(i.e. !sky combo [combo keyword])\n" +
                        "Example: !sky combo crash_and_burn";
    message.channel.send(messageString);
    return true;
}));

validCommands.push(new commandLib.Command("combo", (args) => {
    const comboList = comboLib.getComboList();
    var comboFound = false;
    console.log(`${comboList.length}`);
    for (i = 0; i < comboList.length && !comboFound; i++){
        const combo = comboList[i];
        console.log(`${combo.getKeyword()}, ${args[0]}...`);
        if (combo.getKeyword() == args[0]){
            comboFound = true;
            messageString += `**${combo.getName()}**\n`;
            messageString += `${combo.getDescription()}\n\n`;
            messageString += `*${combo.getFlavour()}*`;
        }
    }
    if (!comboFound){
        messageString = `Sorry ${message.author.toString()}, that combo doesn't seem to be added to my files (yet)!`
    }
    message.channel.send(messageString);
    return true;
}));


for (let i = 0; i < validCommands.length; i++) {
    console.log(validCommands[i].toString());
}

function reply(cID, prefix, client, msg) {
    message = msg;
    messageString = "";
    creatorID = cID;
    botClient = client;
    var validMessage = false;
    var commandKeyword = msg.content.replace(prefix, "")
        .split(" ")[0];
    var args = msg.content.replace(prefix, "")
        .replace(commandKeyword + " ", "")
        .split(" ");

    //console.log(`User: ${client.user.id}`);
    console.log(`Arguments: ${args}`);
    console.log(commandKeyword);
    console.log(args.toString());

    for (i = 0; i < validCommands.length && !validMessage; i++) {
        validMessage = validCommands[i].execute(commandKeyword, args);
    }

    if (validMessage) {
        console.log(messageString);
    }
    return validMessage;
}

function rng(min, max) {
    console.log(`Min and max: ${min}, ${max}`);
    var difference = parseInt(max) - parseInt(min);
    var result = 0;
    if (difference != max) {
        result = Math.floor((Math.random() * (difference + 1)));
        result += parseInt(min);
    } else {
        result = Math.floor((Math.random() * max) + 1);
    }
    console.log(result);
    //console.log(result);
    return result;
}

function sendImage(string, image){
    message.channel.send(`${string}\n`, {
        files: [image]
    });
}



module.exports = {
    reply
};