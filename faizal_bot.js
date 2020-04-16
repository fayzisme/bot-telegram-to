Telegram = require('node-telegram-bot-api')
require('dotenv').config();

const token = process.env.TOKEN_BOT;
const bot = new Telegram(token, { polling: true });


bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `Selamat datang ${msg.from.first_name}`, {
    "reply_markup": {
        "keyboard": [["Panduan"], ["Deskripsi"]]
        }
    });
            
}); 

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    var message = msg.text.toString();
    if (message.toLowerCase().indexOf('hai') === 0) {
        bot.sendMessage(chatId,"Hai juga, " + msg.from.first_name);
        }
    else if(message.toLowerCase().includes("makasih")) {
        bot.sendMessage(chatId, "Sampai jumpa lagi dan Terimakasih")
    }
    else if(message.toLowerCase().includes("deskripsi")){
        bot.sendMessage(chatId, "Ini adalah bot sederhana order-online app")
    }
    else if(message.toLowerCase().includes("panduan")){
        bot.sendMessage(chatId, `Berikut panduan commands bot:`)
    }
});       
