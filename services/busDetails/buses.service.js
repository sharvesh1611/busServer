const {to,TE}=require('../../global_functions');
const Buses=require('../../models').buses;


const addNewBus=async(busDetails)=>{
    let[err,details]=await to(Buses.create({
        busName:busDetails.busName,
        source:busDetails.source,
        destination:busDetails.destination,
        departureTime:busDetails.departureTime,
        reachingTime:busDetails.reachingTime
    }));
    if(err) return TE(err.message);
    return details;
}
module.exports.addNewBus=addNewBus;