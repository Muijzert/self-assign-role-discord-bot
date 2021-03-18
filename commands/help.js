exports.run = (client, message, args) => {
    // TODO 
    // Future proof this and make it better looking.
    var features = new Array(5);
    
    features[0] = "Text channel \"role-assign\" shows a list of roles you can self assign. To self assign react with the assosiated emoji for the role you want. To remove yourself from that role you remove the emoji."
    features[1] = "role <add/remove> \<role name\> - Bot adds or removes role from user (only works for selected roles)"
    features[2] = "ping - This makes the bot respond with \"Pong\""
    message.author.send("Bot commands and features are shown below \n\n" + arrayToString(features))
    return;
}


function arrayToString(arr) {
    let str = '';
    arr.forEach(function(i, index) {
        str += i;
        if (index != (arr.length - 1)) {
        str += '\n';
        };
    });
    return str;
}