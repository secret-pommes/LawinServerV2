const { MessageEmbed } = require("discord.js");

module.exports = {
    commandInfo: {
        name: "server-status",
        description: "Link to the server status page."
    },
    execute: async (interaction) => {
        await interaction.deferReply({ ephemeral: true });
        let embed = new MessageEmbed()
            .setColor("#56ff00")
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL() })
            .setFields(
                { name: "Visit", value: "https://pommesmitketchup.com/server-status" }
            )
            .setTimestamp()

        interaction.editReply({ content: "yea", embeds: [embed], ephemeral: true });
    }
}