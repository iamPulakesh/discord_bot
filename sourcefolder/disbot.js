require('dotenv').config();
console.log(process.env.disbot_token);

const Embed = require('discord.js')
const client= new Embed.Client()
const config = require('./config.json')
const botreply=require('./functionality/botreply')
const command=require('./functionality/command')
const fetch = require('node-fetch')

client.on('ready', () => {
  console.log(`${client.user.tag} has logged in`)
});
botreply(client,'!ping','pong 🏓')

  //Discord Link
  command(client, 'discord',(message)=>{ 
  const discord=new Embed.MessageEmbed()
  .setTitle('Our discord Server Link')
  .setURL('https://discord.gg/d7JPAT5ywq')
  .setColor('#8B0000')
  message.channel.send(discord) 
})
//Commands List
  command(client, 'commands',(message)=>{ 
    const commands=new Embed.MessageEmbed()
    .setTitle('\tDisbot commands:\n!ping  => 🏓\n!hello\n!kick@<user> =>Kick User 🦶\n!ban@<user> =>Ban User 🚫\n!discord =>Discord server link 🔗\n!soulmaker🦍\n!jokes')
    .setColor('#7FFFD4')
    message.channel.send(commands)
})
//jokes
  command(client, 'jokes',(message)=>{ 
  const jokes=new Embed.MessageEmbed()
  .setTitle('\tJokes:\n!random =>random jokes 😂\n!dark =>Dark jokes 😈\n!pun =>Pun jokes 😕\n!xmas =>Christmas jokes 🎅\n!nerd => Programming jokes 🤓\n!spooky =>Spooky jokes 🎃 ')
  .setColor('#D2691E')
  message.channel.send(jokes)
})

    //Kick
client.on('message', (message) => {
  if (message.content.startsWith("!kick")) {
    var member= message.mentions.members.first();
       member.kick().then((member) => {
       message.channel.send(member.displayName + " has kicked out from the server");
    }).catch(() => {
      message.channel.send(`${message.author} you don't have enough permission to kick ${member.displayName}.`);
    });
  };

  //greetings
   console.log(`${message.content} $[message.author.tag] `);
   if(message.content==='!hello'){
   message.reply('Hi 👋');
  }
  if(message.content==='!soulmaker'){
    message.reply("I was made my an ancient Ape 🦍");
  }
})

   //Ban
  command(client,'ban',(message)=>{
    const {member,mentions}= message
    const tag =`<@${member.id}>`
    if(member.hasPermission('ADMINISTRATOR') || member.hasPermission('BAN_MEMBERS'))
    {
      const target =mentions.users.first()
      if(target){
        const targetMember=message.guild.members.cache.get(target.id)
        targetMember.ban()
        message.channel.send(`${tag} has been banned ${targetMember}`)
      }else{
        message.channel.send(`${tag} please mention someone to ban`);
      } 
    }else{
      message.channel.send(`${tag} You don't have enough permission`)
    }
  
  })  


  client.on("message", msg => {

    if (msg.channel.id === "844088523619696652") {
        if (msg.content.toLowerCase() === "!dark") {
            fetch('https://v2.jokeapi.dev/joke/dark', {
                method: 'GET',
            })
                .then(res => res.json())
                .then(json => {
                    if (json.type === "single") {
                        msg.channel.send(json.joke);
                    } else {
                        msg.channel.send(json.setup + "\n" + json.delivery);
                    }
                })
                .catch(err => console.log(err));
        }

        if (msg.content.toLowerCase() === "!nerd") {
            fetch('https://v2.jokeapi.dev/joke/programming', {
                method: 'GET',
            })
                .then(res => res.json())
                .then(json => {
                    if (json.type === "single") {
                        msg.channel.send(json.joke);
                    } else {
                        msg.channel.send(json.setup + "\n" + json.delivery);
                    }
                })
                .catch(err => console.log(err));
        }

        if (msg.content.toLowerCase() === "!random") {
            fetch('https://v2.jokeapi.dev/joke/misc', {
                method: 'GET',
            })
                .then(res => res.json())
                .then(json => {
                    if (json.type === "single") {
                        msg.channel.send(json.joke);
                    } else {
                        msg.channel.send(json.setup + "\n" + json.delivery);
                    }
                })
                .catch(err => console.log(err));
        }

        if (msg.content.toLowerCase() === "!pun") {
            fetch('https://v2.jokeapi.dev/joke/programming', {
                method: 'GET',
            })
                .then(res => res.json())
                .then(json => {
                    if (json.type === "single") {
                        msg.channel.send(json.joke);
                    } else {
                        msg.channel.send(json.setup + "\n" + json.delivery);
                    }
                })
                .catch(err => console.log(err));
        }

        if (msg.content.toLowerCase() === "!spooky") {
            fetch('https://v2.jokeapi.dev/joke/spooky', {
                method: 'GET',
            })
                .then(res => res.json())
                .then(json => {
                    if (json.type === "single") {
                        msg.channel.send(json.joke);
                    } else {
                        msg.channel.send(json.setup + "\n" + json.delivery);
                    }
                })
                .catch(err => console.log(err));
        }

        if (msg.content.toLowerCase() === "!xmas") {
            fetch('https://v2.jokeapi.dev/joke/christmas', {
                method: 'GET',
            })
                .then(res => res.json())
                .then(json => {
                    if (json.type === "single") {
                        msg.channel.send(json.joke);
                    } else {
                        msg.channel.send(json.setup + "\n" + json.delivery);
                    }
                })
                .catch(err => console.log(err));
        }
    }
})
  
client.login(config.disbot_token);