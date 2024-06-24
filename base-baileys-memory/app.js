const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
  EVENTS,
} = require("@bot-whatsapp/bot");

const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");

const flowSecundario = addKeyword(["2", "siguiente"]).addAnswer([
  "📄 Aquí tenemos el flujo secundario",
]);

const flowDocs = addKeyword([
  "doc",
  "documentacion",
  "documentación",
]).addAnswer(
  [
    "📄 Aquí encontras las documentación recuerda que puedes mejorarla",
    "https://bot-whatsapp.netlify.app/",
    "\n*2* Para siguiente paso.",
  ],
  null,
  null,
  [flowSecundario]
);

const flowTuto = addKeyword(["tutorial", "tuto"]).addAnswer(
  [
    "🙌 Aquí encontras un ejemplo rapido",
    "https://bot-whatsapp.netlify.app/docs/example/",
    "\n*2* Para siguiente paso.",
  ],
  null,
  null,
  [flowSecundario]
);

const flowGracias = addKeyword(["gracias", "grac"]).addAnswer(
  [
    "🚀 Puedes aportar tu granito de arena a este proyecto",
    "[*opencollective*] https://opencollective.com/bot-whatsapp",
    "[*buymeacoffee*] https://www.buymeacoffee.com/leifermendez",
    "[*patreon*] https://www.patreon.com/leifermendez",
    "\n*2* Para siguiente paso.",
  ],
  null,
  null,
  [flowSecundario]
);

const flowDiscord = addKeyword(["discord"]).addAnswer(
  [
    "🤪 Únete al discord",
    "https://link.codigoencasa.com/DISCORD",
    "\n*2* Para siguiente paso.",
  ],
  null,
  null,
  [flowSecundario]
);

const flowPrincipal = addKeyword(["hola", "ole", "alo"])
  .addAnswer("Hola!, ¿Cómo estas?")
  .addAnswer("Bienvenido a este curso!");

const flowWelcome = addKeyword(EVENTS.WELCOME).addAnswer(
  "Este es el flujo Welcome...",
  {
    delay: 100,
  },
  async (ctx, ctxFn) => {
    if (ctx.body.includes("casas")) {
      console.log(ctx.body);
      await ctxFn.flowDynamic("Escribiste casas");
    } else {
      await ctxFn.flowDynamic("Otras cosas");
    }
  }
);

const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([flowPrincipal, flowWelcome]);
  const adapterProvider = createProvider(BaileysProvider);

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  QRPortalWeb();
};

main();
