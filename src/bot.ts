import { Context, Telegraf, Telegram } from 'telegraf';
import { config } from 'dotenv';
import { getExcuse, getFact, getJoke, getNerd, getNorris, getPuzzles, getWouldYou } from './api';
import ligma from './ligma.json';
import { server } from './server';
import { keepAlive } from './keep-alive'
config();


interface EclContext extends Context {
  replied: boolean;
  repliedToMe: boolean;
  replyToSender: (message: any) => void
  replyToMessage: (message: any, messageId: number) => void
}


const bot = new Telegraf<EclContext>(process.env.BOT_TOKEN);
const bot_ = new Telegram(process.env.BOT_TOKEN);


const helpMessage = `
Alrighty here's how I can work with you human shits

/start  Starts this shit
/help  Shows this shit
/ping  am I alive?
/yomama  Slash someone with a good yo mama joke
/excuse  find a good excuse to get rid of someone
/fact  get a random fact and learn a thing you ignorant peasant
/norris  do you like Chuck Norris? me too!
/nerd  get some nerdy words to show off with
/would_you  create a poll to see what people want.

here's my guts if you wanna know what's in there.
https://github.com/AliSawari/graduated-potato
`

bot.start(async ctx => {
  await ctx.reply('Why Hello there dear Mama, how can I /help you?')
}).catch(e => console.log(e))

bot.help(async ctx => {
  await ctx.reply('how many fuckin times should I send this shit? Hold on a Sec...')
  setTimeout(() => ctx.reply(helpMessage), 5000)
}).catch(e => console.log(e))

function initMethods(ctx: any) {
  ctx.replyToSender = async (message: any) => {
    await ctx.reply(message, { reply_to_message_id: ctx.message.message_id })
  }

  ctx.replyToMessage = async (message: any, messageId: number) => {
    await ctx.reply(message, { reply_to_message_id: messageId })
  }
}


function initStatus(ctx) {
  if (ctx && ctx.message && ctx.message.reply_to_message != null) {
    ctx.replied = true;
    if (ctx.message.reply_to_message.from.id == ctx.botInfo.id) {
      ctx.repliedToMe = true;
    }
  }
}



function eclectus(ctx: any) {
  initMethods(ctx);
  initStatus(ctx);
}


function processTextForLigma(text: string) {
  let answer;
  let words = text.split(" ");
  for (let word of words) {
    word = word.toLowerCase().replace(/\?|!/g, "");
    if (word in ligma) {
      answer = ligma[word];
      break;
    }
  }

  return answer;
}

function lookFor(text: string, phrase: string) {
  let answer;
  let words = text.split(" ");
  for (let word of words) {
    word = word.toLowerCase().replace(/\?|!/g, "");
    if (word == phrase) {
      answer = true;
      break;
    }
  }

  return answer;
}



bot.use(async (ctx, next) => {
  eclectus(ctx);
  await next();
});


bot.use(async (ctx: any, next) => {
  if (ctx.message && ctx.message.text && ctx.message.text.length) {
    const gotAnswer = processTextForLigma(ctx.message.text);
    if (gotAnswer) {
      await ctx.replyToSender(`${gotAnswer} lmao`)
    }
  }
  await next();
}).catch(e => console.log(e))


bot.command('ping', async ctx => ctx.replyToSender("ping back bitch! Im alive!"))
  .catch(e => console.log(e))

bot.command("yomama", async ctx => {
  if (ctx.replied) {
    if (ctx.message.reply_to_message.from.id == parseInt(process.env.CREATOR_ID)) {
      ctx.replyToSender("Not this time bitch, GET BAMBOOZLED lmao");
    } else {
      const joke = await getJoke();
      ctx.replyToMessage(joke, ctx.message.reply_to_message.message_id)
    }
  } else ctx.replyToSender("You should reply to a message you idiot!");
}).catch(e => console.log(e))

bot.command("excuse", async ctx => {
  if (ctx.replied) {
    const excuse = await getExcuse();
    ctx.replyToMessage(excuse, ctx.message.reply_to_message.message_id)
  } else ctx.replyToSender("You should reply to a message you idiot!");
}).catch(e => console.log(e))

bot.command("fact", async ctx => {
  const fact = await getFact();
  ctx.replyToSender(fact)
}).catch(e => console.log(e))

bot.command("norris", async ctx => {
  const norris = await getNorris();
  ctx.replyToSender(norris)
}).catch(e => console.log(e))

bot.command("nerd", async ctx => {
  const nerd = await getNerd();
  ctx.replyToSender(nerd)
}).catch(e => console.log(e));


bot.command("/would_you", async ctx => {
  const would:any = await getWouldYou();
  ctx.replyWithPoll("Would You Rather", would, {
    is_anonymous: false
  });
})

bot.command("/puzzles", async ctx => {
  const puzzle = await getPuzzles();
  ctx.replyToSender(puzzle)
})



bot.launch().then(_ => console.log("Bot started")).catch(e => console.log(e))


bot.catch(async (err:any, ctx:any) => {
  console.log(err);
  bot_.sendMessage(process.env.CREATOR_ID, JSON.stringify(err, null, 2));
})

server.listen(process.env.PORT, () => console.log("HTTP server started"))

setInterval(async () => await keepAlive(), 5 * 60 * 1000)
 