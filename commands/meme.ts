import Discord from "discord.js";

export const execute = async (message: any) => {
  const memeMessage = await message.reply("Fetching your meme...");
  async function getMeme() {
    const url = "https://api.imgflip.com/get_memes";
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
  const data = await getMeme();
  const randomNumber = Math.floor(Math.random() * data.data.memes?.length);
  const memeUrl = data.data.memes[randomNumber].url;
  const memeEmbed = new Discord.EmbedBuilder()
    .setColor("#0099ff")
    .setTitle("Random Meme")
    .setImage(memeUrl);
  await memeMessage.edit({ content: "", embeds: [memeEmbed] });
  return;
};
