//const Discord = require("discord.js");
const commandLib = require("./command");
const comboLib = require("./combo");
const rng = require("./rng");
const ytdl = require("ytdl-core");

var botClient;
var message;
var messageString = "";
var creatorID;

let connection;
let playingSongs = false;
let voiceChannel;

const songQueue = [];

const validCommands = new commandLib.CommandList();
//const comboList = [];

validCommands.push(new commandLib.Command(
    "helloWorld",
    commandLib.MISC,
    "A simple 'Hello World' command.",
    () => {
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

validCommands.push(new commandLib.Command(
    "testPingReply",
    commandLib.MISC,
    "Do I see you?",
    () => {
    messageString = `I see you, ${message.author.toString()}.`;
    message.channel.send(messageString);
    return true;
}));

validCommands.push(new commandLib.Command(
    "insult",
    commandLib.JOKE,
    "State-of-the-art roasting software.",
    () => {
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

validCommands.push(new commandLib.Command(
    "rand",
    commandLib.MISC,
    "Generate a random number between 1 and the number you give me, "
    + "or give me two and I'll give you a number between those.",
    (args) => {
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

validCommands.push(new commandLib.Command(
    "Tate",
    commandLib.DND,
    "Everyone's favorite cleric (don't tell Nicholas). Also a dork.",
    () => {
    sendImage(
        `A cinnamon roll capable of breaking your knees and smashing your skull in.\n`
        + `(image created on LogoMakr.com)\n`,
        "icons/tate.PNG");
    return true;
}));
validCommands.push(new commandLib.Command(
    "Phibi",
    commandLib.DND,
    "Literal unkillable ray of sunshine and death.",
    () => {
    sendImage("She would die for you, if only she were capable of actually dying.\n"
        + "(image created on LogoMakr.com)\n",
        "icons/phibi.PNG");
    return true;
}));
validCommands.push(new commandLib.Command(
    "Gaia",
    commandLib.DND,
    "What a Dire Tiefling would look like.",
    () => {
    sendImage("Her mischievous antics belie a dark and painful past..."
        + "but we don't have time to unpack *all* that.\n"
        + "(image created on LogoMakr.com)\n",
        "icons/gaia.PNG");
    return true;
}));
validCommands.push(new commandLib.Command(
    "Rembrandt",
    commandLib.DND,
    "Demoted to magi-tech support.",
    () => {
    sendImage("You will know bitter while his victory will be sweet..."
        + "or maybe that's just his brownies.\n"
        + "(image created on LogoMakr.com)\n",
        "icons/rembrandt.PNG");
    return true;
}));
validCommands.push(new commandLib.Command(
    "Stormchaser",
    commandLib.DND,
    "Dad, could you please stop Nick from dying FOR FIVE MINUTES?!",
    () => {
    sendImage(`"Deus Volt": The term is a misnomer, as it is actually a measurement of power, `
        + `rather than potential difference. It was previously referred to as a "Deus Watt", `
        + `but was later changed due to the fact that `
        + `most storm clerics agreed that the latter made for a more intimidating battle-cry.\n`
        + "(image created on LogoMakr.com)",
        "icons/stormchaser.PNG");
    return true;
}));
validCommands.push(new commandLib.Command(
    "Alistair",
    commandLib.DND,
    "If Alistair dies, we kill Alistair. (The other one. Again.)",
    () => {
    sendImage("Lemme just take a moment to say the fact that the CAT is an ex-PIRATE "
        + "that used to spend all day every day surrounded by WATER is super ironic.\n"
        + "Here's to hoping we see Lard again!"
        + "(image created on LogoMakr.com)",
        "icons/alistair.PNG");
    return true;
}));
validCommands.push(new commandLib.Command(
    "See-Reos",
    commandLib.DND,
    "Bounty-hunter/babysitter. Secretly a ranger with Favored Enemy: Mages.",
    () => {
    sendImage("Mage Slayers are not to be trusted...but he makes it so hard not to!\n"
        + "(image created on LogoMakr.com)",
        "icons/see-reos.PNG");
    return true;
}));
validCommands.push(new commandLib.Command(
    "DM",
    commandLib.DND,
    "Competitive blood donor. Please don't bleed on my code.",
    () => {
    sendImage("My deepest thanks to Nik for not TPKing Dad's party on a regular basis.\n"
        + "Also for not filling my code with useless functions like SOMEBODY here.\n"
        + "(image created on LogoMakr.com)",
        "icons/dm.PNG");
    return true;
}));
validCommands.push(new commandLib.Command(
    "entireTeam",
    commandLib.DND,
    "How many PCs does it take to change a lightbulb?",
    () => {
    sendImage("Great, the gang's all here! Now we can die together!\n"
        + "(image created on LogoMakr.com)",
        "icons/entireTeam.PNG");
    return true;
}));

validCommands.push(new commandLib.Command(
    "iLoveYou",
    commandLib.JOKE,
    "I-it's not like I wanted you to use this command, or anything...",
    () => {
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

validCommands.push(new commandLib.Command(
    "comboList",
    commandLib.DND,
    "The real reason everyone uses me. Use it to display the list of known combos for D&D characters.",
    () => {
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

validCommands.push(new commandLib.Command(
    "combo",
    commandLib.DND,
    "Use: !sky combo [womboComboName]",
    (args) => {
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
            let extensions = combo.getExtensions();
            for (let i = 0; i < extensions.length; i++){
                messageString += `${extensions[i]}\n`
            }
            if (extensions.length >= 1){
                messageString += "\n";
            }
            messageString += `*${combo.getFlavour()}*`;
        }
    }
    if (!comboFound){
        messageString = `Sorry ${message.author.toString()}, that combo doesn't seem to be added to my files (yet)!`
    }
    message.channel.send(messageString);
    return true;
}));

validCommands.push(new commandLib.Command(
    "sh*tlist",
    commandLib.DND,
    "Use this to bring up the link to the Stormbringer Sh*tlist, "
    + "to keep track of people who've wronged you and/or other personal "
    + "objectives that don't involve revenge.\n"
    + "(viewing only, ask my creator for the edit link)",
    () => {
        messageString = "Alright, here you go: https://docs.google.com/spreadsheets/d/11W9VngBQh1i703qbFo1t8vampNjGu-pzwYBhoJ_A1os/edit?usp=sharing\n"
            + "(viewing only, ask my creator for the edit link)"
        message.channel.send(messageString)
        return true;
    }
))

validCommands.push(new commandLib.Command(
    "play",
    commandLib.MUSIC,
    "Give me a link and I'll play audio from YouTube on the voice channel you're using.",
    async (args) => {
        const songInfo = await ytdl.getInfo(args[0]);
        const song = {title: songInfo.videoDetails.title, url: songInfo.videoDetails.video_url};
        playSong(song);
        return true;
    }
));

validCommands.push(new commandLib.Command(
    "queue",
    commandLib.MUSIC,
    "Add a YT link to the song queue, and I'll play it once I'm done with this one.",
    async (args) => {
        const songInfo = await ytdl.getInfo(args[0]);
        const song = {title: songInfo.videoDetails.title, url: songInfo.videoDetails.video_url}
        songQueue.push(song);
        message.channel.send(`Ok, ${songInfo.videoDetails.title} added to the queue!`);
        if (!playingSongs){
            playSong(songQueue.shift());
        }
        return true;
    }
));

validCommands.push(new commandLib.Command(
    "showQueue",
    commandLib.MUSIC,
    "Take a look at the song queue",
    () => {
        let queueString = "Queue: \n";
        for (let i = 0; i < songQueue.length; i++){
            queueString += `> ${i+1}: ${songQueue[i].title}\n`
        }
        if (songQueue.length == 0){
            queueString = "There are no songs currently queued up!";
        }
        message.channel.send(queueString);
        return true;
    }
));

validCommands.push(new commandLib.Command(
    "skip",
    commandLib.MUSIC,
    "Don't like the current song? Lemme just casually KING CRIMSON to the next one.",
    () => {
        if (songQueue.length == 0){
            voiceChannel.leave();
            playingSongs = false;
        } else {
            playSong(songQueue.shift());
        }
        return true;
    }
));

validCommands.push(new commandLib.Command(
    "stop",
    commandLib.MUSIC,
    "Tired of listening? Good, I'm tired of playing songs, lemme rest!",
    () => {
        while (songQueue.length > 0){
            songQueue.pop();
        }
        voiceChannel.leave();
        playing = false;
        return true;
    }
));

validCommands.push(new commandLib.Command(
    "help",
    commandLib.MISC,
    "I mean...you're using it right now, so...",
    () => {
        let pm = "Here's the list of commands:\n";
        //pm += "```";
        /*
        for (let i in validCommands){
            pm += `\n**${validCommands[i].getKeyword()}** - ${validCommands[i].getDescription()}`;
        }*/
        pm += validCommands.toString();
        //pm += "\n```";
        message.author.send(pm);
        messageString = "Alright, I've sent you the list of my commands.";
        message.channel.send(messageString);
        return true;
    }
));

async function playSong(song){
    if (message.channel.type != "text"){
        return false;
    }
    voiceChannel = message.member.voice.channel;
    if (!voiceChannel){
        message.channel.send("Join a voice channel first!");
        return true;
    }
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")){
        message.channel.send("It doesn't seem like I have the right permissions for that channel. Either I'm not allowed to connect, or not allowed to speak.");
        return true;
    }
    console.log("Joining channel...\n");
    connection = await voiceChannel.join();
    console.log("Playing stream...\n");
    try {
        const stream = ytdl(song.url, {
            filter: "audioonly",
            highWaterMark: 1024 * 1024 * 10
        });
        const dispatcher = connection.play(stream);
        playingSongs = true;
        dispatcher.setVolume(0.1);

        dispatcher.on("finish", () => {
            if (songQueue.length == 0){
                voiceChannel.leave();
                playingSongs = false;
            } else {
                playSong(songQueue.shift());
            }
            
        });

    } catch (err){
        message.channel.send("Something's gone wrong. I'll tell dad to fix it ASAP.");
        errorMessage = "Something's gone wrong with me!\n" + err.message;
        playingSongs = false;
        botClient.users.resolve(creatorID).send(errorMessage);
    }
    return true;
}

console.log(validCommands.toString());

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

    console.log(`Arguments: ${args}`);
    console.log(commandKeyword);
    console.log(args.toString());

    
    validMessage = validCommands.execute(commandKeyword, args);
    

    if (validMessage) {
        console.log("----------------------------------------");
        console.log(messageString);
        console.log("----------------------------------------");
    }
    return validMessage;
}

function sendImage(string, image){
    message.channel.send(`${string}\n`, {
        files: [image]
    });
}



module.exports = {
    reply
};