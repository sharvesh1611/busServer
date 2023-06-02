const router=require('express').Router({mergeParams:true});
const {to,ReS,ReE}=require('../../global_functions');
const BusService=require('../../services/busDetails/buses.service');
const {busValidator}=require('../../routes/busDetailsValidator/buses.validator');
const {validate}=require('../../middleware/validate-schema');

const addNewBus=async(req,res)=>{
    console.log(req.body)
    let [err,details]=await to(BusService.addNewBus(req.body?req.body:null));
    if(err) return ReE(res,err,422);
    return ReS(res,details,200);
}

router.post('/',busValidator.addNewBus,validate,addNewBus);

module.exports={router}