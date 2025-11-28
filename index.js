const { Client, GatewayIntentBits, SlashCommandBuilder, REST, Routes } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.DirectMessagePolls] });

const commandData = new SlashCommandBuilder()
  .setName('send')
  .setDescription('d4rkheus reklam açığı')
  .setIntegrationTypes(0, 1)
  .setContexts(0)
  .addStringOption(option =>
    option.setName('message')
      .setDescription('Gönderilecek mesaj')
      .setRequired(true))
  .addStringOption(option =>
        option.setName('count')
          .setDescription('Gönderilecek mesaj sayısını girin')
          .setRequired(true));

            const token = "TOKEN GİRİNİZ" // BURAYA BİR BOT TOKENİ GİRİN.

client.once('ready', async () => {
  console.log(`Bot ${client.user.tag} olarak giriş yaptı`);

  const rest = new REST({ version: '10' }).setToken(token);
 
  try {
    console.log('Slash komutları yenileniyor...');
    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: [commandData.toJSON()] }
    );
    console.log('Slash komutları başarıyla yenilendi.');
  } catch (error) {
    console.error('Komut kaydetme hatası:', error);
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
 
  if (interaction.commandName === 'send') {
    const messageContent = interaction.options.getString('message');
    try {
      const countt = interaction.options.getString('count');
   
      let count = 1;
      await interaction.reply({ content: `Mesajlar atılıyor...`, ephemeral: true });
   
      for (let i = 0; i < countt; i++) {
          count++;
          await interaction.followUp({ content: messageContent });
      }
   
    } catch (error) {
      console.error('İşlem hatası:', error);
      await interaction.reply({ content: 'Bir hata oluştu!' });
    }

  }
});

process.on('unhandledRejection', error => {
  return console.log(error);
 
 });
 
 process.on('uncaughtException', error => {
   return console.log(error);
 
 })

client.login(token);
