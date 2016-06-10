# RSS-o-Bot Telegram

Send [RSS-o-Bot](https://github.com/Kriegslustig/rss-o-bot) notifications over email.

## Configuraion

All configuration except `email-recipients` is optional.

### email-recipients
A JSON-Array of email-addresses, to send notifications to.

### email-configuration
An optional configuration object or string as defined by [nodemailer.createTransport](https://github.com/nodemailer/nodemailer). Defaults to `{ direct: true }`.

