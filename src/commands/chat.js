const { SlashCommandBuilder } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');

// Initialize OpenAI client
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

module.exports = {
  data: new SlashCommandBuilder()
    .setName('chat')
    .setDescription('Ask GPT-4o a question')
    .addStringOption(option =>
      option.setName('prompt')
        .setDescription('Your prompt for GPT-4o')
        .setRequired(true)
    ),
  async execute(interaction) {
    const prompt = interaction.options.getString('prompt');

    await interaction.deferReply();
    try {
      const completion = await openai.createChatCompletion({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
      });
      const reply = completion.data.choices[0].message.content;
      await interaction.editReply(reply);
    } catch (error) {
      console.error('OpenAI API error:', error);
      await interaction.editReply('Failed to fetch response from OpenAI.');
    }
  },
};