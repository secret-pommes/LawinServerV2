const { MessageEmbed } = require("discord.js");

module.exports = {
    commandInfo: {
        name: "secrets-joke",
        description: "added as a joke (this displays secrets current pfp lol)"
    },
    execute: async (interaction) => {
        await interaction.deferReply({ ephemeral: true });
        let embed = new MessageEmbed()
            .setColor("#56ff00")
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL() })
            .setFields(
                { name: "Visit", value: "https://pommesmitketchup.com/love-jane" }
            )
            .setTimestamp()

        interaction.editReply({ content: "yea", embeds: [embed], ephemeral: true });
    }
}