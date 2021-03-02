exports.run = (client, message, args) => {
    let role = message.member.guild.roles.find(r => r.name === arrayToString(args.slice(1,args.length)));
    let member = message.member;
    message.delete(2000); // Deletes after 2 seconds
    switch(args[0]){
         // ### ADD ####
        case("add"):
        if(role == null){
            // Role not found
            message.channel.send("Role " + arrayToString(args.slice(1,args.length)) + " was not found. You have to write the role identically to what it is.").then(sentMessage => {
                sentMessage.delete(2000);
            });
        }else{
            // Add role to member
            message.member.addRole(role);
            message.channel.send("Role " + role.name + " added to " + member).then(sentMessage => {
                sentMessage.delete(2000);
            });
    
        }
        break;

        // ### REMOVE ###
        case("remove"):
        if(role == null){
            // Role not found
            message.channel.send("Role " + arrayToString(args.slice(1,args.length)) + " was not found. You have to write the role identically to what it is.").then(sentMessage => {
                sentMessage.delete(2000);
            });
        }else{
            // Add role to member
            message.member.removeRole(role);
            message.channel.send("Role " + role.name + " removed from " + member).then(sentMessage => {
                sentMessage.delete(2000);
            });


    
        }
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