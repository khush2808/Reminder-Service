/*
we are expected to send data at 10.00AM
Every 5 minutes 
We will check are there any emails that are expected to be sent by now and is pending

*/
const cron=require('node-cron');
const emailService=require('../services/email-service');
const sender=require('../config/email-config');


const setupJobs=()=>{
    cron.schedule('*/2 * * * *',async ()=>{
        // console.log("running every 2 minutes");          //jab logic aayega tab service layer.
    const response=await emailService.fetchPendingEmails();
    response.forEach((email)=> {
        // emailService.sendBasicEmail(
        //     "ReminderServiceEmail@gmail.com",
        //     email.recepientEmail,
        //     email.subject,
        //     email.content
        // )
            sender.sendMail({
                to:email.recepientEmail,            //from hta diya hai yha pe kyunki ja whi se rha hai jha se likhe hai emailId mein 
                subject:email.subject,
                text:email.content
            },async (err,data)=>{                       //sender.sendMail ek callback bhi expect karta hai jisme error aur data leta hai
                if(err){
                    console.log(err);
                }
                else {
                    console.log(data);
                    await emailService.updateTicket(email.id,{status:"Success"});
                }
            }
        )
        console.log(response);
    });
    })
}

module.exports=setupJobs;