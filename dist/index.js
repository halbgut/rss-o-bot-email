'use strict';

var nodemailer = require('nodemailer');
var Rx = require('rx');
var os = require('os');
var debug = require('debug')('rss-o-bot');

module.exports = function email(config) {
  var transporter = nodemailer.createTransport(config['email-configuration'] || { direct: true, debug: true, logger: true });
  var sendmail = Rx.Observable.fromNodeCallback(transporter.sendMail.bind(transporter));
  var to = config['email-recipients'].join(', ');
  return function (subject, text) {
    return debug('Sending email to ' + to) || sendmail({
      from: 'RSS-o-Bot <' + os.userInfo().username + '@' + os.hostname() + '>',
      html: '<a href="' + text + '">text</a>',
      subject: subject, text: text, to: to
    });
  };
};