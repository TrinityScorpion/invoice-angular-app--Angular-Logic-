// var nodemailer = require('nodemailer');

// var mail = nodemailer.createTransport({
//     sendMail: true,
//     service: 'gmail',
//     auth: { 
//         user: 'your-email@gmail.com',
//         pass: 'your-gmail-password'
//     }
// });

// var mailOptions = {
//     from: 'youremail@gmail.com',
//     to: 'myfriend@yahoo.com',
//     subject: 'Sending Email via Node.js',
//     text: 'That was easy!'
// };

// function myTestEmail() {
//     console.log(this.mailOptions);
//     console.log('Im in')
//      mail.sendMail(mailOptions, function (error, info) {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log('Email sent: ' + info.response);
//         }
//     });
// }

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  //     secure: false, // true for 465, false for other ports
  auth: {
    user: 'chanj3396@gmail.com',
    pass: 'hqcyfnwhhfmcumxw'
  },
  tls: {
    rejectUnauthorized: false
  }
});

let mailOptions = {
  from: '"Fun Of Heuristic"<example.gimail.com>', // sender address
  to: '', // list of receivers
  subject: "Wellcome to Fun Of Heuristic 👻", // Subject line
  text: 'That was easy!'
};

function myTestEmail(){
    console.log('Running...!!!');
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

