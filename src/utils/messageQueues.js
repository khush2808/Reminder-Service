const amqplib=require('amqplib');
const {MESSAGE_BROKER_URL,EXCHANGE_NAME}=require('../config/serverConfig');

const createChannel=async ()=>{
    try {
        const connection= await amqplib.connect(MESSAGE_BROKER_URL);   //first we have to make connection to the message broker
        const channel=await connection.createChannel();
        await channel.assertExchange(EXCHANGE_NAME,'direct',false);       //assertexchange distribute the messages in different queues . It takse 3 arguments. We have sending false in additional argument.
        return channel;
    } catch (error) {
        throw error;
    }
    
}

const subscribeMessage =async (channel,service,binding_key)=>{
    try {
        const applicationQueue=await channel.assertQueue('REMINDER_QUEUE');

        channel.bindQueue(applicationQueue.queue,EXCHANGE_NAME,binding_key);
        channel.consume(applicationQueue.queue,msg=>{
            console.log('Recieved data');
            service(msg.content.toString());                   // <Buffer 7b 22 6d 65 73 73 61 67 65 22 3a 22 53 75 63 63 65 73 73 22 7d> aisa kuch data hai . isliye toString
            const payload=JSON.parse(msg.content.toString());
            
            service(payload);
            // console.log(msg.content.toString());
            channel.ack(msg);
    });
    } catch (error) {
        throw error;
    }
    
}

const publishMessage=async (channel, binding_key,message)=>{            //publisher knows to which channel means queue and binding key(to access the desired channel and message to be sent)
    try {
        await channel.assertQueue('REMINDER_QUEUE');
        await channel.publish(EXCHANGE_NAME,binding_key,Buffer.from(message));
    } catch (error) {
        throw error;
    }
}

module.exports={
    createChannel,
    subscribeMessage,
    publishMessage
}