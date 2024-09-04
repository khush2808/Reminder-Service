const sender=require('../config/email-config');
const TicketRepository=require('../repository/ticket-repository');

const sendBasicEmail=async (mailFrom,mailTo,mailSubject,mailBody)=>{
    try {
        const response=await sender.sendMail({
            from:mailFrom,
            to:mailTo,
            subject:mailSubject,
            text:mailBody
        });
        console.log(response);
    } catch (error) {
        console.log(error);
    }
    
}

const fetchPendingEmails=async(timestamp)=>{
    try {
        const repo=new TicketRepository();
        const response=await repo.get({status:"Pending"});
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const createNotification=async(data)=>{
    try {
        const repo=new TicketRepository();
        const response=await repo.create(data);
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}

const updateTicket=async (ticketId,data)=>{
    try {
        const repo=new TicketRepository();
        const response=await repo.update(ticketId,data);
        return response;
    } catch (error) {
        console.log(error);
    }
} 

const subscribeEvents=async (payload)=>{
    let service=payload.service;
    let data=payload.data;
    switch(service){
        case 'CREATE_TICKET':
            await createNotification(data);
            break;
        
        case 'SEND_BASIC_EMAIL':
            await sendBasicEmail(data);
            break;

        default:
            console.log("No valid service is recieved ");
            break;
    }

}

module.exports={
    sendBasicEmail,
    fetchPendingEmails,
    createNotification,
    updateTicket,
    subscribeEvents
    
}