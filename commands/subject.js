const fs = require("fs");
exports.run = (client, message, args) => {
    // Command creates a new role and new channel 
    // Or removes a role and a channel

    // Command would look like              -> subject add <role/channel name> <emoji>
    // Command to remove would look like    -> subject remove <emoji>



    // message.delete(2000); // Deletes after 2 seconds
    switch(args[0]){
         // ### ADD ####
        case("add"):
        // A role name could have spaces in it. This concatenates the role name together and leaves out the emoji.
        let roleName = arrayToString((args.slice(1,args.length - 1))); 
        let emoji = args[args.length - 1].split(":")[1];



        // TODO
        // Creates role

        // Create channel

        // Set channel to only be viewed by people with created role
            //Set channel to not be viewed by everyone
            //Set channel to be viewed by created role

        // Adds emoji and role to roles.json
        fs.readFile('roles.json', 'utf8', function readFileCallback(err, data){
            if (err){
                console.log(err);
            } else {
            obj = JSON.parse(data);

            json = JSON.stringify(obj);
            // Adds role and emoji to roles.json
            obj[emoji] = roleName;

            fs.writeFile('myjsonfile.json', json, 'utf8', callback); // write it back 
        }});
        break;

        // ### REMOVE ###
        case("remove"):
        // TODO
    
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