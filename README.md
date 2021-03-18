# self assign role discord bot
 Discord bot which allows users to self assign roles. The bot sends a message into a selected discord text channel, stating the roles which can be self assigned and each role is assosiated with an emoji. The users can react to the bot's message with the assosiated emoji and the bot will assign that user the role. Users can also remove the emoji to get the role removed. 

# Purpose
I own a discord server which I use to speak to my friends. There are multiple text channels where the subjects of the text channels vary . Not all the users on the server are interested in all subjects. Therefore I had an idea to make a bot which would allow users to assign themselves roles which would allow them to see the roles assosiated text channel. 

For example if I had a role called "Football" and a text channel called "Football" as well. Only users with the role "Football" can view the text channel "Football". This stops users who arent interested in football getting notifications from the channel by default. If a user wants to join the "Football" channel then they can do so through the bot.

# Additional Commands
+ ping - This makes the bot respond with "Pong"
+ role <add/remove> \<role name\> - Bot adds or removes role from user (only works for selected roles)
+ subject
+ + <add> <role name> <emoji> - Creates new channel and role with <role name> as both names. Adds and updates role to the self assigning feature and the assosiated emoji is the inputted <emoji>
+ + <remove> <role name> <y/n (remove emoji)> - Deletes channel and role and can delete assosiated emoji from server as well. Removes role from self assigning bot as well.
+ help - Sends message to user explaining the commands and features

# Future Features
+ Ability for owner/selected users to allocate more roles for the message emoji react feature.
+ Make a command for owner/selected users where user inputs <role name> <channel name> <emoji> which creates a new text channel and role where only people with the new role can view the new channel. The emoji is then added to the react emoji where users can react with that emoji to the bot to get assigned the new role.
# Resources
+ Worn off keys Discord
+ https://github.com/AnIdiotsGuide/discordjs-bot-guide 
