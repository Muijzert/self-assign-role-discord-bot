exports.run = (client, message, args) => {
    const filter = (reaction, user) => {
        return reaction.emoji.name === '👍' && user.id === message.author.id;
    };
    
    message.awaitReactions(filter, { max: 4, time: 10000, errors: ['time'] })
        .then(collected => console.log(collected.size))
        .catch(collected => {
            console.log(`After a minute, only ${collected.size} out of 4 reacted.`);
        });
}