# S.C.S. Global Service ONLUS - sito statico

Prima versione del sito istituzionale statico della cooperativa.

## Struttura

- `public/` - sito pronto da pubblicare
- `public/data/bilanci.json` - archivio dei documenti
- `public/documenti/<anno>/` - PDF dei bilanci
- `wrangler.jsonc` - configurazione Cloudflare Workers Static Assets

## Avvio locale

Richiede Node.js e npm.

```bash
npm install
npm run dev
```

In alternativa, per una verifica puramente statica:

```bash
python -m http.server 8080 -d public
```

Nota: con `python -m http.server` gli URL senza estensione (es. `/chi-siamo`) non vengono riscritti come su Cloudflare. Per testare gli URL canonici usa `npm run dev` oppure apri direttamente `chi-siamo.html`.

## Deploy Cloudflare + GitHub

Il progetto è predisposto per Cloudflare Workers con Static Assets.

1. Crea un repository GitHub privato e carica l'intera cartella del progetto.
2. In Cloudflare apri **Workers & Pages** > **Create application** > **Import a repository**.
3. Seleziona il repository GitHub.
4. Production branch: `main`.
5. Build command: lascia vuoto.
6. Deploy command: `npx wrangler deploy`.
7. Salva e avvia il deploy.
8. Dopo il primo deploy, collega il dominio personalizzato dalle impostazioni del Worker.

Il file `wrangler.jsonc` pubblica la cartella `public/` e gestisce gli HTML con URL puliti.

## Pubblicare un bilancio

Esempio per il Bilancio sociale 2025:

1. Copia il PDF in:
   `public/documenti/2025/bilancio-sociale-2025.pdf`
2. Apri `public/data/bilanci.json`.
3. Trova la voce corrispondente e imposta:
   `"disponibile": true`
4. Commit e push su `main`.
5. Cloudflare eseguirà il nuovo deploy automaticamente.

## Privacy / cookie

Il sito non contiene analytics, pixel, iframe esterni, form o newsletter. La pagina privacy è una bozza operativa coerente con questa configurazione e va ricontrollata prima della messa online definitiva, soprattutto dopo aver definito le impostazioni Cloudflare effettive.

## Dati ancora da completare

- telefono
- e-mail ordinaria
- PDF effettivi dei bilanci
- eventuale revisione finale della privacy
- dominio definitivo se diverso da `www.scsglobalserviceonlus.it`
