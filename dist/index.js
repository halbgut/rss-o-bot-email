'use strict';

var nodemailer = require('nodemailer');
var Rx = require('rx');
var os = require('os');
var debug = require('debug')('rss-o-bot');

module.exports = function email(config) {
  var transporter = nodemailer.createTransport(config.get('email-configuration') || { direct: true, debug: true, logger: true });
  var sendmail = Rx.Observable.fromNodeCallback(transporter.sendMail.bind(transporter));
  var to = config.get('email-recipients').join(', ');
  return function (subject, url, title) {
    return debug('Sending email to ' + to) || sendmail({
      from: config.get('email-from') || 'RSS-o-Bot <' + os.userInfo().username + '@' + os.hostname() + '>',
      html: '<a href="' + url + '">' + title + '</a>',
      subject: subject, text: title + ': ' + url, to: to
    });
  };
};