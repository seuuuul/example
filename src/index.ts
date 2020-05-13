import { Client, Message, VoiceChannel } from "discord.js";
import ytdl from "ytdl-core";

const TOKEN = "token";
const YOUTUBE_LINKS = [
  "https://youtu.be/FzVR_fymZw4",
  "https://youtu.be/9pdj4iJD08s",
];

const client = new Client();

client.on("message", async (message) => {
  if (message.content === "!start") {
    const voiceChannel = message.member!.voice.channel!;
    while (true) {
      await procedure(voiceChannel);
    }
  }
});

const procedure = async (voiceChannel: VoiceChannel) => {
  console.log("New procedure.");
  
  // Set up stream/dispatcher and play at a random time.
  let voiceConnection = await voiceChannel.join();
  let stream = ytdl(YOUTUBE_LINKS[Math.round(Math.random())]);
  let dispatcher = voiceConnection.play(stream, {
    seek: Math.floor(Math.random() * 100),
  });

  // Let it play for 10 seconds.
  await new Promise((resolve) => {
    setTimeout(resolve, 10_000);
  });

  dispatcher.end();

  return;
};

(async () => {
  await client.login(TOKEN);
})();
