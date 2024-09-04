const TicketService=require('../services/email-service');


const create=async (req,res)=>{
    try {
        // console.log(req.body);
        const response=await TicketService.createNotification(req.body);
        // console.log(response);
        return res.status(200).json({
            success:true,
            data:response,
            err:{},
            message:"Successfully registered an email reminder"
        })
    } catch (error) {
        return res.status(500).json({
            data:{},
            success:false,
            err:error,
            message:"Unable to register an email reminder"
        })
    }
}

module.exports={
    create,

}