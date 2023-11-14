import Discord from "discord.js";

export const execute = async (message) => {
  const getCat = async () => {
    const response = await fetch("https://api.thecatapi.com/v1/images/search");
    const data = await response.json();
    return data[0]?.url || "Couldn't fetch a cat image.";
  };

  const catFetchingMessage = await message.reply("Fetching your cat image...");
  const catImage = await getCat();
  const catEmbed = new Discord.EmbedBuilder()
    .setColor("#0099ff")
    .setTitle("Random Cat Image")
    .setImage(catImage);
  await catFetchingMessage.edit({ content: "", embeds: [catEmbed] });
};
