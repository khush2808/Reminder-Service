const express=require('express');
const app=express();
const bodyParser=require('body-parser');

const {PORT}=require('./config/serverConfig');
// const {sendBasicEmail}=require('./services/email-service');
const TicketController=require('./controllers/ticket-controller');
const EmailService=require('./services/email-service');

const jobs=require('./utils/job')
const {subscribeMessage,createChannel}=require('./utils/messageQueues')         //create channel bhi lenge kyunki acknowledgemnt bhi to bhejenge
const {REMINDER_BINDING_KEY}=require('./config/serverConfig')


const setupAndStartServer=async ()=>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.post('/api/v1/tickets',TicketController.create);

    const channel=await createChannel();
    subscribeMessage(channel,EmailService.subscribeEvents,REMINDER_BINDING_KEY);

    app.listen(PORT,()=>{
        console.log(`Server started at port ${PORT}`);
        jobs();
        // sendBasicEmail(
        //     'support@admin.com',
        //     'dphoenix346@gmail.com',
        //     'This is a testing email',
        //     'Hello ,How are you. I hope you like our support'
        // );
    })
}

setupAndStartServer();