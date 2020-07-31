const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const teamSchema=new Schema({

        id:{
            type:String,
            require:true
        },
        name:{
            type:String
        },
        manager:{
            type:String
        },
        project:{
            type:Object
        },
        employee:{
            type:Object
        }

});
module.exports=team=mongoose.model('team',teamSchema);