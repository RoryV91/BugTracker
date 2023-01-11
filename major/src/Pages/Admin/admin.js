import { transport } from '../../../src/utils/email';

var mailOptions = {
    from: '',
    to: '',
    subject: 'Your access link to Major',
    text: 'Hi Firstname, \n' + 'This is the unique link to sign up for Major: \n' + 'url'+ '\n' + 'Please click the link to sign up for your account. Contact your administrator for any firther questions. Have a nice day!'
  };
  
  transport.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });