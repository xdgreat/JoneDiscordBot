import Discord from "discord.js";

export const execute = async (message) => {
  const getDog = async () => {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json();
    return data.message || "Couldn't fetch a dog image.";
  };

  const dogFetchingMessage = await message.reply("Fetching your dog image...");
  const dogImage = await getDog();
  const dogEmbed = new Discord.EmbedBuilder()
    .setColor("#0099ff")
    .setTitle("Random Dog Image")
    .setImage(dogImage);
  await dogFetchingMessage.edit({ content: "", embeds: [dogEmbed] });
};
