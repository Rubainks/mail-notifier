
const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log("Ready");
});

client.login("DISCORD_BOT_TOKEN");


const notifier = require("mail-notifier");

const imap = {
  user: process.env.EMAIL,
  password: process.env.PASS,
  host: "imap.gmail.com",
  port: 993,
  tls: true,
  tlsOptions: { rejectUnauthorized: false },
};

notifier(imap)
  .on("mail", (mail) => console.log(mail))
  .start();


const n = notifier(imap);
n.on("end", () => n.start())
  .on("mail", (mail) => {
    if (mail.from[0].address === "SENDER_EMAIL") {


      client.users
        .fetch("DISCORD_USER_ID")
        .then((user) => {
          user.send(
            "**NEW MAIL FROM SCHOLASTICA**\n" + " **SUBJECT**: " + mail.subject
          );
        });

      console.log("\n\nNew mail notification sent!\n\n");
    }
  })
  .start();