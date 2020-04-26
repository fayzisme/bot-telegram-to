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

bot.onText(/\/product/, async (msg) => {
    try {
    const response = await axios.get(`https://fayzisme-bot-telegram-to.glitch.me/api/product`)
    const data = response.data.data;
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
 Harga : ${harga(price)}`,
 {
    "reply_markup": {
        "inline_keyboard": [
            [
                {
                    text: "simpan ke keranjang",
                    callback_data: id
                },
            ],
        ],
    }, parse_mode:"Markdown"});
        });
    } 
    catch (err) {
        console.log(err)
    }
});

bot.on("callback_query", function onCallbackQuery(data) {
    console.log(data);
});

bot.onText(/\/order/, async (msg) => {
    const chatId = msg.chat.id;
    const cek = await axios.get(`https://fayzisme-bot-telegram-to.glitch.me/api/customers/${msg.chat.username}`)
    const data = cek.data.data;

    if(data === null) { 
        await bot.sendMessage(chatId, 
`Data anda belum terdaftar.
===================
Silahkan masukkan Nama Lengkap, Email, dan nomor handphone anda dengan format sebagai berikut:
    (Nama Lengkap) (email) (nomor handphone)`);
        bot.sendMessage(chatId, 
`Contoh :
    (Fayzisme Faizal) (fayzall@email.com) (0823421234)`);
    }
    else {
        const {full_name, username, email, phone_number} = data;
        bot.sendMessage(chatId, 
`Data anda sudah terdaftar sebagai berikut :
Nama Lengkap : ${full_name},
Username : ${username},
email : ${email},
Nomor Handphone : ${phone_number}`);
    }
});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    var message = msg.text.toString();
    if (message.toLowerCase().indexOf('(') === 0) {
        const username = msg.from.username;
        const [full_name, email, phone_number] = msg.text.split(') ').map(el => el.replace(/[^0-9a-zA-Z@. ]/g, ""))
        console.log(full_name, username, email, phone_number);
        const response = await axios.post(`https://fayzisme-bot-telegram-to.glitch.me/api/customers`, 
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
        console.log(response.data);
        bot.sendMessage(chatId, 
`Data anda sudah terdaftar sebagai berikut :
Nama Lengkap : ${full_name},
Username : ${username},
email : ${email},
Nomor Handphone : ${phone_number}`);
    }

});