import Discord from "discord.js";

export const execute = async (message: any) => {
  const title = message.content.split(" ").slice(2).join(" ");
  const url = `https://some-random-api.com/others/lyrics?title=${title}`;

  const lyricsReply = await message.reply(`Fetching the lyrics for "${title}"`);

  async function getLyrics() {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  const response = await getLyrics();
  if (!response) {
    const fullLyrics: string = response.lyrics;
    const messages = [];
    for (let i = 0; i < fullLyrics.length; i += 4000) {
      const message = fullLyrics.substring(i, i + 4000);
      messages.push(message);
    }

    messages.map(async (el, i) => {
      const lyricsEmbed = new Discord.EmbedBuilder()
        .setColor("#0099ff")
        .setTitle(`${response.title} by ${response.author}`)
        .setImage(response.thumbnail.genius)
        .setDescription(`${el}`);

      await message.reply({
        embeds: [lyricsEmbed],
      });
    });
  } else {
    await message.reply("oso cant find ur bs song");
  }
};
