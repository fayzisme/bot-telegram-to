Telegram = require('node-telegram-bot-api')
require('dotenv').config();
const axios = require("axios");

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
        bot.sendMessage(chatId, `
        *Berikut panduan commands bot:*
        ==============================
        Untuk melihat product : [/product]
        Untuk order product : [/order]
        `, {parse_mode : "Markdown"})
    }
}); 

bot.onText(/\/product/, (msg) => {
    axios.get(`https://fayzisme-bot-telegram-to.glitch.me/api/product`)
    .then(response => {
        const data = response.data.data;
        console.log(response.data.data);
        data.forEach(el => {
            const { id, name, price } = el;
            const harga = (price) =>
            {
                let rupiah = '';		
                let angkarev = price.toString().split('').reverse().join('');
                for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
                return 'Rp.'+rupiah.split('',rupiah.length-1).reverse().join('') + ',00';
            }
            bot.sendMessage(msg.chat.id, `Nama produk : ${name}
Harga : ${harga(price)}`);
        });
    })
    .catch(err => {
        console.log(err.message);
    });        
});

bot.onText(/\/order/, async (msg) => {
    const chatId = msg.chat.id;
    await bot.sendMessage(chatId, `Kami mengenali anda sebagai,
Nama : ${msg.from.first_name}, username : ${msg.from.username}
===================
Silahkan masukkan Nama Lengkap, Email, dan nomor handphone anda dengan format sebagai berikut:
    (Nama Lengkap) (email) (nomor handphone)`);
    bot.sendMessage(chatId, `Contoh :
    (Fayzisme Faizal) (fayzall@email.com) (0823421234)`);       
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    var message = msg.text.toString();
    if (message.toLowerCase().indexOf('(') === 0) {
        const username = msg.from.username;
        const [full_name, email, phone_number] = msg.text.split(') ').map(el => el.replace(/[^0-9a-zA-Z@. ]/g, ""))
        console.log(full_name, username, email, phone_number);

       axios.post(`https://fayzisme-bot-telegram-to.glitch.me/api/customers`, 
        {
           data: {
            attributes: {
                full_name: full_name,
                phone_number: phone_number,
                username: username,
                email: email
            }
           } 
        })
        .then(response => {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

        bot.sendMessage(chatId,"Terimakasih data anda sudah terdaftar");
    }
});