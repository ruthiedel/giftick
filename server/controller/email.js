import nodemailer from 'nodemailer';
import bussinesModel from "../models/bussinesmodel.js"
import mypassword from '../../paasword.js'

function sendEmail(req,res)
{
// Create a transporter object
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'r0525610179@gmail.com',
    pass: mypassword
  }
});

// Define the email options
const mailOptions = {
  from: 'r0525610179@gmail.com',
  to: req.body.email,
  subject: req.body.subject,
  text: req.body.text
};

// Send the email
transporter.sendMail(mailOptions, function(error, info) {
  if (error) {
    console.log("bbb")
    res.status(500).send(error);
  } else {
    console.log("lll")
    res.send('Email sent:');
  }
})
}



function sendEmailToClient(req,res)
{
   sendEmail(req,res);
}

async function sendEmailToBussiness(req,res)
{
  try{
  let data = await bussinesModel.find({email:req.params.email});
  if(data.length!=0)
  {
    var timeNow = new Date();
    var startdate=new Date(data[0].start_date);
    if(startdate.getFullYear()+data[0].years>=timeNow.getFullYear()){
       req.body.subject='your buy-me subscribed as bussiness finished'
       req.body.text='please re sigin tio our website to continue get our service'
       sendEmail(req,res);
    }
    else{
      res.status(500).send("bussiness subscribe is still fine")
    }
  }
  else{
    res.status(500).send("not a valid email")
  }
}
catch (error) {
  console.log(error);
  res.status(500).send('Internal Server Error');
}
}



export{
  sendEmailToBussiness,
  sendEmailToClient
}