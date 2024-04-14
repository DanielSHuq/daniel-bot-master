import { channel } from 'diagnostics_channel';
import { Client,GatewayIntentBits,messageLink,Partials,Events } from 'discord.js'
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import { Configuration, OpenAIApi } from 'openai';

  
dotenv.config()

let prefix = '~';

const client = new Client({ intents: [GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers], partials: [Partials.Channel] });
client.once(Events.ClientReady, c => {
    client.user.setUsername('Goro');
    client.user.setAvatar('2988106-yakuza-kiwami-2_official_09-22-17_001.jpg')
    client.user.setActivity('KIRYUUUUUUUUUUUU-CHANNNNNNNNNNNNNNNNN')
	console.log(`Ready! Logged in as ${c.user.tag}`);
});
const configuration = new Configuration({
    apiKey: process.env.OPEN_API_KEY,
  });
const openai = new OpenAIApi(configuration);
const emojiReg = new RegExp('<[a-zA-Z0-9]*:[a-zA-Z]+|:[0-9]+>');
const emojiRegNext = /<[a-zA-Z0-9]*:[\w]+|:/
// commands
let majimaQuotesArr = [
    "Right, wrong... Nobody's got a clue what the difference is in this town. So I'm gonna have more fun... and live crazier than any of 'em.",
    "No point? You're just makin' things harder on yourself. Deprivin' yourself for no damn reason. You think the world gives two shits if there's a point or not? Keep that up, and it'll break you.", 
    "I just appreciate honest people, They ain’t faking it for someone else’s sake.",
    "Rather lose an eye than bow to you, bitch.",
    "Feel free to fight amongst yerselves. But if ya even think of touchin' my territory... I'll guarantee you'll regret it.",
    "Whaddya think, Kiryu-chan?! Ain't I red hot?",
    `We got a motto at Majima Construction...\nIf ya wanna work, welcome. If ya wanna rest, get the fuck out.`,
    "Well that's a real kick in the dick.",
    "Bitch, please. Remember who yer talkin' to.",
    "KIRYUUUUUUUUUUU-CHAN!!!!",
    "Workers are welcome, earners are embraced, and lazy fucks get hunted down.",
    "Ten years in the joint made you a fucking pussy.",
    "When you don’t pay your debts, I’m what you get.",
    "All the bad luck in the world shouldn’t make your dream less worth pursuing",
    "If you always avoid things that are difficult, you’ll never be able to grow. owning up to your weaknesses and facing them head-on is the best way to improve.",
    "Some are born with talent, and some aren't. That's true. But that said... Those with talent never make it through talent alone. You have to overcome. Find boundaries, and break them. The only way to grow is by overcoming challenges.",
    "Any title a man draws up for himself isn’t worth wearing.",
    "I try not to stereotype people into certain roles. A person's real value is on the inside.",
    "Your life is yours to live. You shouldn't have to justify it to anyone else.",
    "Complaining won’t get it done any quicker.",
    "Life is like a trampoline. The lower you fall, the higher you go.",
    
    "I'll let you in on a little something, The Yakuza game, it's not like boxing. The man who gets beat down isn't the loser. The guy who can't tough it out till the end, He's the one who loses.",
    "Life will always have ups and downs. And if we don't have the bad parts, we'll never appreciate the good ones."
]
let linkSend = async (message,link,channelSend) =>{
    
    
    if(message.attachments.size > 0){
        message.attachments.forEach((currentValue,index,arr) => {
            fs.appendFile(link,'\n'+ currentValue.url,(err) =>{
                if(err)
                {   console.log('error'); 
                    throw err
                };
        
            })
            
            client.channels.cache.get(channelSend).send(currentValue.url);
        })
    }
    else if(message.content.match(/\.(jpeg|jpg|gif|png|webp)$/) != null){
        fs.appendFile(link,'\n'+ message.content,(err) =>{
            if(err)
            {   console.log('error'); 
                throw err
            };
    
        })
        client.channels.cache.get(channelSend).send(message.content);
    }
    
    
    
}
let fileSend = async (message,link) =>{
    
    if(message.attachments.size > 0 ){
        
        message.attachments.forEach((currentValue,index,arr) => {
         
            fs.appendFile(link,'\n'+currentValue.url,(err) =>{
                if(err)
                {   console.log('error'); 
                    throw err
                };

            })
            
        })
    }
    else if( message.content.match(/\.(jpeg|jpg|gif|webp|png)$/) != null || message.content.match(emojiReg) != null){
        if(message.content.match(emojiReg) != null){
            console.log(message.content);
            let emojiName = message.content.split(/:/)[1];
            console.log(emojiName);
            link = 'txt-files/emoji-collection.txt';
            
            message.content = message.content.split(emojiRegNext)
            let id = '';
            message.content = (message.content.filter((word) =>
            {return word != ""
        })).map((word) => word.replace('>','').trim());
        if(message.content.length > 1){
            
            id = '';
            message.content.forEach((curValue) => {
                emojiName = curValue.split(/:/)[1];
                id+= emojiName+ '\n'+ "https://cdn.discordapp.com/emojis/"+ curValue + '.gif\n'}) 

        }
        else{
            id = emojiName+'\n'+"https://cdn.discordapp.com/emojis/"+ message.content[0] + '.gif' +'\n'
        }
            message.content = id;
        }
        fs.appendFile(link,'\n'+message.content,(err) =>{
            if(err)
            {   console.log('error'); 
                throw err
            };

        })
    }
}
async function fetchAllMessages(message,link,prevThis) {
    try {
        //rezwan wholesome meme tom faisal aana mash aryan
    let channelArr = ['720652298115743846']
    let prevMessageIdArr = ['720652370811289623'];
    for(let i = 0; i<channelArr.length;i++){
        switch(channelArr[i]){
            case '1014203892034175036':
                link = 'txt-files/rezwans-adventures.txt'
                break;
            case '720652298115743846':
                link = 'txt-files/compendium.txt'
                break;
            case '570194431353815040':
                link = 'txt-files/unreleased-content.txt'
                break;
            case '933347057740177429':
                link = 'txt-files/unleashed.txt';
                break;  
            case '456488563043729438':
                link = 'txt-files/butchs-stash.txt';
                break;
            case '1047946906359320690':
                link = 'txt-files/links.txt';
                break;
            case '777846601032794122':
                link = 'txt-files/wholesome-pics.txt'
                break;
            case '459072358779715599':
                link = 'txt-files/meme-machine.txt'
                break;
            case '692073441272266852':
                link = 'txt-files/tom-and-jerry-pics.txt'
                break;

            case '845050977396588554':
                link = 'txt-files/faisals-adventure.txt'
                break;
            case '930072318498193448':
                link = 'txt-files/aanas-adventure.txt'
                break;
            case '898313577897807872':
                link = 'txt-files/aryans-adventures.txt'
                break;
            case '831980432466771998':
                link = 'txt-files/mash-simping-corner.txt'
                break;
            
            
            
            default:
                link = 'txt-files/random.txt';
                break;

          }
    let lastMessageId = ''
    let channel = client.channels.cache.get(channelArr[i]);
    console.log(channel)
    let mesArr = [];
    if(prevMessageIdArr[i] == '') {
        
        // , before: `${prevThis}` 
        await channel.messages.fetch({ limit: 100}).then(messages => {
            console.log(`Received ${messages.size} messages`);
            //Iterate through the messages here with the variable "messages".
            messages.forEach(message => {
            
                mesArr.unshift(message);
                lastMessageId = message.id
            })
        
      })
    }
    else{
        prevThis = prevMessageIdArr[i];
        
        // , before: `${prevThis}` 
        await channel.messages.fetch({ limit: 100, before: `${prevThis}` }).then(messages => {
            console.log(`Received ${messages.size} messages`);
            //Iterate through the messages here with the variable "messages".
            messages.forEach(message => {
            
                mesArr.unshift(message);
                lastMessageId = message.id
            })
        
      })

    }       
    
    
    
    
      console.log(lastMessageId);
      mesArr.forEach(mes => fileSend(mes,link));
    }
    
} catch (error) {
     console.log(error)   
    }
  }
client.on('messageCreate' , async (message) =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = (message.content.split(prefix))[1];
    const command = args.toLowerCase();
    
    


    if(command == "majimaquote"){
     let arrLen = majimaQuotesArr.length;
     let chooseNum = Math.floor(Math.random() * arrLen)
     message.channel.send(majimaQuotesArr[chooseNum]); 
    }
    

      if(command.startsWith("purge")  && (message.author.id == '953939863504293918' || message.channelId == '1047946906359320690' || message.channelId == '1060501670674563114' || message.channelId == '1060937628763033700' ||
       message.channelId== '1059856307806543985'|| message.channelId =='570194431353815040'  || message.channelId == '456488563043729438' || message.channelId == '1061201420495368202'
       || message.channelId == '1063157058762969199')){
        if(isNaN(command.split('purge')[1])){
            
            return;
        }
        const numOfDeleteArr = command.split(" ");
       if(numOfDeleteArr.length < 2 || isNaN(parseInt(numOfDeleteArr[1]))){
        message.channel.send("Please provide a number after the command.");
        return;
       }
       let numOfDelete = numOfDeleteArr[1];
       if(numOfDelete < 1 || numOfDelete > 99){
        message.channel.send("Please provide a number between 1 and 99.");
        
        return;
       } 
       numOfDelete++;
       message.channel.bulkDelete(numOfDelete).catch(err =>{
        message.channel.send("Due to Discord's limitations, I cannot delete messages that are older than 13 days.")
       })
    }
    

    if(command.startsWith("read") && message.author.id == '953939863504293918'){
        try {
        
        if(isNaN(command.split('read')[1]) || command.split('read')[1] == ''){
            
            return;
        }
        
        let picID = command.split(" ")[1]; 
        console.log(picID);
        let link = ''
          switch(message.channelId){
            case '1014203892034175036':
                link = 'txt-files/rezwans-adventures.txt'
                break;
            case '570194431353815040':
                 link = 'txt-files/unreleased-content.txt'
                break;
            case '933347057740177429':
                link = 'txt-files/unleashed.txt';
                break;  
            case '456488563043729438':
                link = 'txt-files/butchs-stash.txt';
                break;
            case '1047946906359320690':
                link = 'txt-files/links.txt';
                break;
            case '777846601032794122':
                link = 'txt-files/wholesome-pics.txt'
                break;
            case '459072358779715599':
                link = 'txt-files/meme-machine.txt'
                break;
            case '692073441272266852':
                link = 'txt-files/tom-and-jerry-pics'
                break;

            case '845050977396588554':
                link = 'txt-files/faisals-adventure'
                break;
            case '930072318498193448':
                link = 'txt-files/aanas-adventure'
                break;
            case '898313577897807872':
                link = 'txt-files/aryans-adventures'
                break;
            case '720652298115743846':
                link = 'txt-files/compendium.txt'
                break;
            case '831980432466771998':
                link = 'txt-files/mash-simping-corner'
                break;
            
            
            
            default:
                link = 'txt-files/random.txt';
                break;

          }
          
          fetchAllMessages(message,link, picID);
        } catch (error) {
         console.log(error);   
        }
          
    }
    
    
    
    if(command.startsWith('send') && message.author.id == '953939863504293918'){
        
            console.log(message.author.id);
        
        async function send(){
                try{
                let numExt;
                let fileName = command.split(" ")[1];
                console.log(command.split(" ").length);
                
                
                console.log(fileName);
                let data = await fs.readFileSync(`txt-files/${fileName}.txt`,
            {encoding:'utf8', flag:'r'});
            
            let lineArr = data.split('\n').filter((value,index,arr) => value != '');
            if(command.split(" ").length == 3 && !isNaN(command.split(" ")[2])){
                numExt = parseInt(command.split(" ")[2]);
                console.log(numExt)
            }
            
            else{
                numExt = lineArr.length;
            }
            let numIndex = lineArr.length - numExt;
            console.log(numIndex);
            let cLineArr = lineArr.slice(numIndex);
            
            let tooFast = 0;
            let tooFastTime = 0;
            try {
                cLineArr.forEach((element,index) => {
                    tooFast++;
                    if(tooFast == 9){
                        tooFast = 0;
                        tooFastTime += 4000;
                    }
                    setTimeout(()=> {message.channel.send(element)}, (index * 800 + tooFastTime));
                    
                });
            } catch (error) {
                console.log(error);
            }
        }
        catch(err){
            message.channel.send('Wrong File Name.')
        }
            
            
            
            
        }

        send();
    
     
    }
    if(command.substring(0,8)=='muntimer' && !isNaN(command.split(" ")[1] && !isNaN(command.split(" ")[2])) && command.split(" ").length == 3){
        try{
        let sNumArr = command.split(" ")
        sNumArr.shift();
        
        let numArr = sNumArr.map((num) => (parseInt(num) * 1000 * 60))
        if(numArr[0] > numArr[1]){
            message.channel.send("Wrong format.")
            return;
        }
        let modulus = numArr[1] % numArr[0];
        
        numArr[1] = numArr[1] - modulus;
        let numDivs = numArr[1]/numArr[0]
        
        console.log(modulus/(1000*60) +" mod");
        console.log(numDivs +" numDivs");
        
        let timer = 0;
        console.log(timer);
        for(let i = 0; i<numDivs; i++){
            timer+= numArr[0];
            setTimeout(()=>{
                message.channel.send(`<@${message.author.id}> Study.`)
            }, timer)
            
            
        }
        if(modulus != 0){
            
            timer+= modulus;
            
            setTimeout(()=>{
                message.channel.send(`<@${message.author.id}> Study. The timer is finished.`)
            }, timer)
            

        }
        else{
            setTimeout(()=>{
                
                message.channel.send(`The timer is finished.`)
            }, timer)
        }

    }
    catch(err){
        console.log(error);
    }
    }
    if(command == 'cgpt-link'){
        message.channel.send(`<@${message.author.id}> Here is a link to ChatGPT. - https://chat.openai.com/chat`);
    }

    if(command.substring(0,5) != 'chat2' && command.substring(0,6) != 'chat-s' && command.substring(0,4) == 'chat'){
        try{
            
            console.log(message.content.replace('~chat','').trim())
            const gptResponse = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: `Goro is a angry chatbot. \n\
                Goro: I am an angry chatbot.\n\
                I think you're awesome.\n\
                Goro: I know I am, but about you?\n\
                ${message.author.username}: ${message.content.replace('~chat','').trim()}\n\
                Goro:`,
                temperature: 0.4,
                max_tokens: 4000,
                
              });
              console.log(gptResponse.data.choices[0].text.replace('vagina','pussy'))
              
              message.reply(`${(gptResponse.data.choices[0].text).replaceAll("Soeb","TheLegend69").replaceAll("Sazia","Chaaaaajia").replaceAll('vagina','pussy').replaceAll('penis','dick').replaceAll('Muntezar','Loathsome Cum Eater').replaceAll("Daniel",`Yanbek`).replaceAll("Imran","Crippled Little Rat").replaceAll("Farhan","Jimmy Neutron Star").
              replaceAll("Rezwan","Diamond Fist Rez")
            }`)
              return;
        }
        catch(err){
            message.reply(`There was an error in processing your response. Please try again later.`);
        }
    }
    
    if(command.substring(0,5) != 'chat2' && command.substring(0,4) == 'chat' && command.substring(0,6) == 'chat-s'){
        try{
            
            console.log((message.content.replace('~chat-s','')).trim())
            const gptResponse = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: `Goro is a angry chatbot. \n\
                Goro: I am an angry chatbot.\n\
                ${message.author.username}: ${message.content.replace('~chat-s','').trim()}\n\
                Goro:`,
                temperature: 0.4,
                max_tokens: 4000,
                
              });
              console.log(gptResponse.data.choices[0].text.replace('vagina','pussy'))
              
              message.reply(`${gptResponse.data.choices[0].text}`);
              return;
        }
        catch(err){
            message.reply(`There was an error in processing your response. Please try again later.`);
        }
    }

    if(command.substring(0,5) == 'chat2'){
        try{
            
            console.log(message.content.replace('~chat2',''))
            const gptResponse = await openai.createCompletion({
                model: "text-davinci-002",
                prompt: `Goro is a angry chatbot. \n\
                Goro: I am an angry chatbot.\n\
                ${message.author.username}: ${message.content.replace('~chat','').trim()}\n\
                Goro:`,
                temperature: 0.5,
                max_tokens: 2048,
                
              });
              message.reply(`${gptResponse.data.choices[0].text}`)
              return;
        }
        catch(err){
            message.reply(`There was an error in processing your response. Please try again later.`);
        }
    }
})
    
// images

client.on('messageCreate' , async (message) =>{
    
    if(message.author.bot) return;
    
    let link = ''
    let channelSend = ''
          switch(message.channelId){
            case '570194431353815040':
                link = 'txt-files/unreleased-content.txt'
                channelSend = '1061201420495368202'
                break;
            case '933347057740177429':
                link = 'txt-files/unleashed.txt';
                channelSend = '1061201481333743647'
                break;  
            case '456488563043729438':
                link = 'txt-files/butchs-stash.txt';
                channelSend = '1061201527370432562';
                break;
            case '1047946906359320690':
                link = 'txt-files/links.txt';
                channelSend = '1061220202177638420'
                break;
            case '777846601032794122':
                link = 'txt-files/wholesome-pics.txt'
                channelSend = '1065645072491741244'
                break;
            case '459072358779715599':
                link = 'txt-files/meme-machine.txt'
                channelSend = '1065646205331316849'
                break;
            case '692073441272266852':
                link = 'txt-files/tom-and-jerry-pics.txt'
                channelSend = '1065645323789287464'
                break;

            case '845050977396588554':
                link = 'txt-files/faisals-adventure.txt'
                channelSend = '1065645183468838973'
                break;
            case '930072318498193448':
                link = 'txt-files/aanas-adventure.txt'
                channelSend = '1065645826992517200'
                break;
            case '898313577897807872':
                link = 'txt-files/aryans-adventures.txt'
                channelSend = '1065645623761719396'
                break;
            case '720652298115743846':
                link = 'txt-files/compendium.txt'
                channelSend = '1065669746370023517'
                break;
            case '831980432466771998':
                link = 'txt-files/mash-simping-corner.txt'
                channelSend = '1065645468748632136'
                break;
            case '540636493757022248':
                 link = 'txt-files/forger-residence.txt'
                 channelSend = '1065733154696073327'
            case '547813735578730498':
                link = 'txt-files/waku-waku.txt'
                channelSend = '1065733237802025110';
            case '1047946906359320690':
                link = 'txt-files/links.txt'
                channelSend = '1061220202177638420'

            default:
                link = 'txt-files/random.txt'
                channelSend = '1062646846121578547'
                break;

          }
    linkSend(message,link,channelSend);
    

    
    
    })
client.login(process.env.DISCORD_TOKEN);


