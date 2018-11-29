const Discord = require('discord.js')
const Enmap = require('enmap')
const fs = require('fs')

const bot = new Discord.Client()
const config = require('./config.json')
// We also need to make sure we're attaching the config to the BOT so it's accessible everywhere!
bot.config = config
bot.log = console.log

fs.readdir('./events/', (err, files) => {
  if (err) return console.error(err)
  files.forEach(file => {
    const event = require(`./events/${file}`)
    let eventName = file.split('.')[0]
    bot.on(eventName, event.bind(null, bot))
  })
})

bot.commands = new Enmap()

fs.readdir('./commands/', (err, files) => {
  if (err) return console.error(err)
  files.forEach(file => {
    let props = require(`./commands/${file}`)
    let commandName = file.split('.')[0]
    bot.commands.set(commandName, props)
  })
})

bot.embeds = new Enmap()

fs.readdir('./embeds/', (err, files) => {
  if (err) return console.error(err)
  files.forEach(file => {
    if (!file.endsWith('.js')) return
    let props = require(`./embeds/${file}`)
    let embedName = file.split('.')[0]
    bot.embeds.set(embedName, props)
  })
})

bot.login(config.token)

