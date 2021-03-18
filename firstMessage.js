const addReactions = (message, reactions) => {
  message.react(reactions[0])
  reactions.shift()
  if (reactions.length > 0) {
    setTimeout(() => addReactions(message, reactions), 750)
  }
}

const removeAllReactions = (message) => {
  // TODO
  // Make make bot remove only their own emojis from first message instead of removing all
  
  
  // const userReactions = message.reactions.cache.filter(reaction => reaction.users.cache.has("208553415813365760"))
  // console.log(userReactions)
  // // console.log(message.author.id)
  // try {
  //   for (const reaction of userReactions.values()) {
  //     console.log(reaction)
  //     reaction.users.remove(message.author.id);
  //   }
  // } catch (error) {
  //   console.error('Failed to remove reactions.');
  // }




  message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
}


module.exports = async (client, id, text, reactions = []) => {
  let channel = await client.channels.fetch(id)
  // console.log(channel.name + " CHANNEL")

  channel.messages.fetch().then((messages) => {
    if (messages.size === 0) {
      // Send a new message
      channel.send(text).then((message) => {
        addReactions(message, reactions)
      })
    } else {
      // Edit the existing message
      for (const message of messages) {
        message[1].edit(text)
        removeAllReactions(message[1]);
        addReactions(message[1], reactions)
      }
    }
  })
}