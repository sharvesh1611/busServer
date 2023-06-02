module.exports=(db,dataType)=>{
    let Model=db.define("user",{
        id:{
            type:dataType.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        userName:{
            type:dataType.STRING,
            allowNull:false
        },
        email:{
            type:dataType.STRING
        }
    },{
        tableName:"user",
        schema:"userDetails"
    });
    return Model;
}