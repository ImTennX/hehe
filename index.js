const Discord = require('discord.js-selfbot-v13');
const client = new Discord.Client({
  readyStatus: false,
  checkUpdate: false
});

const keepAlive = require('./server.js');
keepAlive();

function formatTime() { //Credits to himika#0001 and never#0001
  const date = new Date();
  const options = {
    timeZone: 'America/Chicago', //https://www.zeitverschiebung.net/en/ and find your city and enter here
    hour12: true,
    hour: 'numeric',
    minute: 'numeric'
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

client.on('ready', async () => {
  console.clear();
  console.log(`${client.user.tag} - rich presence started!`);

  const r = new Discord.RichPresence()
    .setApplicationId('1108347934501769218')
    .setType('STREAMING')
    .setURL('https://twitch.tv/gorykiling') //Must be a youtube video link 
    .setState(`/ftime`)
    .setName(`ak`)
    .setDetails (`juggin @${formatTime()}`)
    .setParty({
        max: 9,
        current: 3,
    })
 .setAssetsLargeImage('https://cdn.discordapp.com/attachments/1230800543908368457/1231793332930351136/a_6ced9c496c924e7dac9ae17d78b6db9c.gif?ex=66383ff0&is=6625caf0&hm=48d3f75527c9f7345935f088a7b9e623bf91d7dd3dcdc5218f100d12384cd182&') //You can put links in tenor or discord and etc.
    .setAssetsLargeText('ak​')
    .addButton('pfps', 'https://discord.gg/39wWBajvCA')
    .addButton('ᶻ 𝗓 𐰁 ', 'https://discord.gg/ftime')

  client.user.setActivity(r);
  client.user.setPresence({ status: "dnd" }); //dnd, online, idle, offline

  let prevTime = null;
  setInterval(() => {
    const newTime = formatTime();
    if (newTime !== prevTime) {
      const newDetails = `juggin @${formatTime()}`;
      r.setDetails(newDetails);
      client.user.setActivity(r);
      prevTime = newTime;
    }
  }, 1000); // Update every second
});

const mySecret = process.env['TOKEN'];
client.login(mySecret);
