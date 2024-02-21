import Discord, { TextChannel } from "discord.js";
import { configDotenv } from "dotenv";
import * as jokeCommand from "./commands/joke.js";
import * as dogCommand from "./commands/dog.js";
import * as catCommand from "./commands/cat.js";
import * as bignignikCommand from "./commands/bignignik.js";
import * as memeCommand from "./commands/meme.js";
import * as lyricsCommand from "./commands/lyrics.js";

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

type CommandFunction = (message: any) => void;

const commands: { [key: string]: CommandFunction } = {
  joke: jokeCommand.execute,
  cat: catCommand.execute,
  dog: dogCommand.execute,
  bignignik: bignignikCommand.execute,
  meme: memeCommand.execute,
  lyrics: lyricsCommand.execute,
};

let shuttingDown = false; // Flag to track if shutdown process has started

client.on("messageCreate", async (message: any) => {
  if (message.author.bot) return;

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
  const channelID = "1031155731791093782";

  (client.channels.cache.get(channelID) as TextChannel).send(
    "hello fuckenass im awake now"
  );

  console.log(`Logged in as ${client.user?.tag}`);
});

// process.on("SIGINT", () => {
//   if (!shuttingDown) {
//     shuttingDown = true;
//     const channelID = "1031155731791093782";

//     (client.channels.cache.get(channelID) as TextChannel).send(
//       "osoo now im eeppy goodnight \n @everyone"
//     );

//     console.log(`Logged out`);
//     client.destroy(); // Destroy the client before exiting
//     process.exit(0);
//   }
// });

client.login(process.env.DISCORD_BOT_TOKEN);
