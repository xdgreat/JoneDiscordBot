import Discord from "discord.js";
export const execute = async (message) => {
    const nikFetchingText = await message.reply("Fetching bignignik's image");
    const nikImageUrl = "https://cdn.discordapp.com/attachments/1031155731791093782/1173941875154100264/C9E75508-DAC5-46F4-ADD3-A6E6F362DB21.jpg?ex=6565c991&is=65535491&hm=eeb234d491a3a190c27acbd968534e8e21ebbaf957ba3b492ea9fae510606ada&";
    const nikEmbed = new Discord.EmbedBuilder()
        .setColor("#0099ff")
        .setTitle("Bignignik's Image")
        .setImage(nikImageUrl);
    await nikFetchingText.edit({ content: "", embeds: [nikEmbed] });
};
