const fs = require("fs");
const firstMessage = require('../firstMessage')
const config = require('../config.json')
const roles = require('../roles.json')
exports.run = (client, message, args) => {
    // Command creates a new role and new channel 
    // Or removes a role and a channel

    // Command would look like              -> subject add <role/channel name> <emoji>
    // Command to remove would look like    -> subject remove <emoji> <y/n (delete emoji)>

    switch(args[0]){
         // ### ADD ####
        case("add"):
        // A role name could have spaces in it. This concatenates the role name together and leaves out the emoji.
        let roleName = arrayToString(args.slice(1,args.length - 1)); 
        let emoji = extractEmoji(args[args.length - 1]);

        // Checks if emoji is a custom emoji or not
        if(!args[args.length - 1].includes(":")){
            message.channel.send("Have to use server emojis, cannot use default emojis")
            return;
        }

        // CREATE ROLE
        role = message.guild.roles.cache.find(r => r.name === roleName)
        // If role doesn't already exists create role
        if (typeof role === 'undefined') {
            // Creates role
            message.guild.roles.create({
                data: {
                name: roleName,
                color: 'WHITE',
                },
                reason: 'Added by bot through (prefix)subject add command.',
            }).catch(console.error).then(newRole => {
                // Creates channel after creating role
                createChannel(message, newRole);
            });


        }else{
            message.channel.send("Role already exists")
            // Creates channel as role already exists
            createChannel(message, role);    
        }

        // Adds emoji and role to roles.json
        fs.readFile('roles.json', 'utf8', function readFileCallback(err, data){
            if (err){
                console.log(err);
            } else {
            obj = JSON.parse(data);
            // Adds role and emoji to roles.json
            obj[emoji] = roleName;
            // Updates first message 
            updateFirstMessage(client, obj);

            json = JSON.stringify(obj, null, 2);
            // Write to file
            fs.writeFile('roles.json', json, 'utf8',  function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
                });
        }})
        break;

        // ### REMOVE ###
        case("remove"):
        // TODO
        // Remove channel
        // Remove role 
        // Delete element in json file.

        // extracts emoji and if emoji wants to be deleted from inputted args
        let tmpEmoji = "";
        const removeEmoji = "";
        if(args.length == 2){
            tmpEmoji = extractEmoji(args[args.length - 1])
        }else if(args.length == 3){
            tmpEmoji = extractEmoji(args[args.length - 2])
            removeEmoji = args[args.length - 1];
            // Deletes emoji from guild
            message.channel.send("Error. Please use the format -> subject remove <emoji> <y/n (delete emoji)>")
            return;
        }


        fs.readFile('roles.json', 'utf8', function readFileCallback(err, data){
            if (err){
                console.log(err);
            } else {
            obj = JSON.parse(data);
            // Adds role and emoji to roles.json
            let roleName = obj[tmpEmoji];
            console.log(roleName)
            if(typeof roleName === undefined){
                message.channel.send("Error. Subject does not belong in the data base")
                return;
            }

            // Finds role
            const deletingRole = message.guild.roles.cache.find(role => role.name === roleName);

            // Finds channel
            const channelName = convertStringToChannelName(roleName)
            console.log(channelName)
            const deletingChannel = message.guild.channels.cache.find(channel => channel.name === channelName);


            // checks that channel and role exist
            if(typeof deletingRole != undefined && typeof deletingChannel != undefined){
                // Deletes channel & role
                deletingChannel.delete();
                deletingRole.delete();
            }else{
                // invalid role or channel so doesn't delete anything
                message.channel.send("Error. Role or channel spelt incorrectly.")
                return;
            }
            // Deletes channel


            delete obj[tmpEmoji];
            json = JSON.stringify(obj, null, 2);
            // Write to file
            fs.writeFile('roles.json', json, 'utf8',  function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
                });
        }})
        // Remove emoji
        if(removeEmoji == 'y'){
            message.guild.emojis.cache.find(emoji => emoji.name === tmpEmoji).delete();
        }
        //TODO
        // Make bot unreact from first message about deleted role.
        break;
    }
}

function arrayToString(arr) {
    let str = '';
    arr.forEach(function(i, index) {
        str += i;
        if (index != (arr.length - 1)) {
        str += ' ';
        };
    });
    return str;
}

function extractEmoji(emoji) {
    emojiSplit = emoji.split(":");
    if(emojiSplit.length > 1){
        return emojiSplit[1];
    }else{
        return emoji;
    }
}

function createChannel(message, newRole) {
    // Creates channel inside category
    message.guild.channels.create(newRole.name, "text")
        .then(channel => {
        // Finds category from config file
        let category = message.guild.channels.cache.find(c => c.id == config.categoryChannelID && c.type == "category");

        if (!category) throw new Error("Category doesn't exist");
        // Sets channel in the category
        channel.setParent(category.id).then( channel => {
            // Removes permissions of everyone to deny channel view
            channel.updateOverwrite(channel.guild.roles.everyone, { VIEW_CHANNEL: false });
            // Allows newly created role to view channel
            channel.updateOverwrite(newRole, { VIEW_CHANNEL: true });
        });

        }).catch(console.error);                
}

// Updates first message where users can react to bot message to assign themselves roles
function updateFirstMessage(client, obj){
    const getEmoji = emojiName => client.emojis.cache.find((emoji) => emoji.name === emojiName)
    const reactions = []
    
    let emojiText = 'Add a reaction to claim a role\nRemove a reaction to remove a role\n\n'
    for(const key in obj){
        const emoji = getEmoji(key)
        reactions.push(emoji)

        const role = obj[key]
        emojiText += `${emoji} = ${role}\n`
    }
    firstMessage(client, config.channelID, emojiText, reactions)
}
function convertStringToChannelName(name){
    name = name.replace(/ /g,"-")
    name = name.toLowerCase();
    return name;
}