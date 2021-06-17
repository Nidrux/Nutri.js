require('dotenv').config();
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const config = require('../config.json');
const nutri = (c,m,s) => {
    try {
        fetch('https://api.calorieninjas.com/v1/nutrition?query=' + s,
            {
                method: 'GET',
                headers: { 'X-Api-Key': process.env.APIKEY},
                contentType: 'application/json'
            }
        ).then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.items.length <= 0) {
                m.reply(`No values found! Try something else.`)
            } else {
                data.items.forEach(item => {
                    let embed = new MessageEmbed()
                    .setColor(config.clrPrim)
                    .setTitle('Nutritional values for:')
                    .setThumbnail(c.user.displayAvatarURL({dynamic: true}))
                    .addFields(
                        {name: 'Calories', value: item.calories},
                        {name: 'Protein', value: `${item.protein_g}g`, inline: true},
                        {name: 'Fibers', value: `${item.fiber_g}g`, inline: true},
                        {name: 'Fats', value: `${item.fat_total_g}g`, inline: true}
                    )
                    .setFooter(`The values are for servings of ${item.serving_size_g}grams`)
                    .setDescription(`**${item.name}**\n\x20`); 
                    m.channel.send(embed);
                 });
            }
        })
    } catch (err) {
        console.log(`ERROR:\n${err}`);
    }
}
module.exports.nutri = nutri;