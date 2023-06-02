module.exports=(db,dataType)=>{
    let Model=db.define("buses",{
        id:{
            type:dataType.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        busName:{
            type:dataType.STRING,
            allowNull:false
        },
        source:{
            type:dataType.STRING,
            allowNull:false
        },
        destination:{
            type:dataType.STRING,
            allowNull:false
        },
        departureTime:{
            type:dataType.TIME,
            allowNull:false
        },
        reachingTime:{
            type:dataType.TIME,
            allowNull:false
        },
        isDeleted:{
            type:dataType.BOOLEAN,
            defaultValue:false
        }
    },{
        tableName:"buses",
        schema:"busDetails",
    });

    return Model;
}