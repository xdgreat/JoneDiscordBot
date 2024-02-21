// @ts-ignore
import philosophicalQuotes from "../assets/quotes.js";
import Discord from "discord.js";

export const execute = async (message: any) => {
  async function getJoke() {
    const url = "https://icanhazdadjoke.com/";
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "Jone (norepo)",
      },
    });

    if (!response.status) {
      console.error(
        `Failed to fetch dad joke. Status code: ${response.status}`
      );
      return null;
    }

    const jokeData = await response.json();
    return jokeData.joke;
  }

  const jokeFetchingMessage = await message.reply("Fetching your joke...");
  const randomNumber = Math.random();
  let jokeResponse;
  if (randomNumber <= 0.1) {
    const randomQuoteIndex = Math.floor(
      Math.random() * philosophicalQuotes.length
    );
    jokeResponse = philosophicalQuotes[randomQuoteIndex];
  } else {
    jokeResponse = await getJoke();
  }
  const jokeEmbed = new Discord.EmbedBuilder()
    .setColor("#0099ff")
    .setTitle("Dad Joke")
    .setDescription(`Here's your joke, friend!\n${jokeResponse}`);
  await jokeFetchingMessage.edit({ content: "", embeds: [jokeEmbed] });
};
