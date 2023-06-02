const{to,TE}=require('../global_functions');
const callOtherSchema = async (serviceName, functionName, data, hasMultipleParam = false) => {
  let err, res;
  if (hasMultipleParam) {
    [err, res] = await to(serviceName[functionName](...Object.values(data)));
  } else {
    [err, res] = await to(serviceName[functionName](data));
  }
  if (err) { return TE(err.message); }
  return res;
}
module.exports.callOtherSchema = callOtherSchema;