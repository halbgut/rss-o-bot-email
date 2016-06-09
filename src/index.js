const nodemailer = require('nodemailer')
const Rx = require('rx')
const os = require('os')
const debug = require('debug')('rss-o-bot')

module.exports = function email (config) {
  const transporter = nodemailer.createTransport(
    config['email-configuration'] || { direct: true, debug: true, logger: true }
  )
  const sendmail = Rx.Observable.fromNodeCallback(transporter.sendMail.bind(transporter))
  const to = config['email-recipients'].join(', ')
  return (subject, url, title) =>
    debug(`Sending email to ${to}`) ||
    sendmail({
      from: config['email-from'] || `RSS-o-Bot <${os.userInfo().username}@${os.hostname()}>`,
      html: `<a href="${url}">${title}</a>`,
      subject, text: `${title}: ${url}`, to
    })
}
