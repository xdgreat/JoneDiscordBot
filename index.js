import Discord from "discord.js";
import { configDotenv } from "dotenv";
import * as jokeCommand from "./commands/joke.js";
import * as dogCommand from "./commands/dog.js";
import * as catCommand from "./commands/cat.js";
import * as bignignikCommand from "./commands/bignignik.js";
configDotenv();

const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.DirectMessages,
    Discord.GatewayIntentBits.DirectMessageTyping,
  ],
});

const commands = {
  joke: jokeCommand.execute,
  cat: catCommand.execute,
  dog: dogCommand.execute,
  bignignik: bignignikCommand.execute,
};

client.on("messageCreate", async (message) => {
  if (message.author.bot) return; // Ignore messages from bots

  if (message.content.startsWith("jone")) {
    const command = message.content.split(" ")[1]?.toLowerCase();
    const listOfCommands = Object.keys(commands);

    if (commands[command]) {
      await commands[command](message);
    } else {
      message.reply("thats not a command caita");
    }
  }
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user?.tag}`);
});

client.login(process.env.DISCORD_BOT_TOKEN);
