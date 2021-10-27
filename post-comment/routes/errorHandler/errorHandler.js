function paserdErrorMessagge(err){
    let output;
    try{
        let objectPattern = Object.keys(err.keyPattern);
        let objectvalue = Object.keys(err.keyValue);

        output = `${objectPattern[0]} ${objectvalue[0]} alredy exists. Try again.`

    }catch(e){
        output = "Something went wrong! Please try again"
    }
    return output;
}

function errorHandler(err){
    let message = "";

    if(err.code){
        switch(err.code){
            case 11000:
            case 11001:
            
            message = paserdErrorMessagge(err);
            break;

            default:
                message: 'Something went wrong! Please contact support for help.'
        }
    }else if(err.message){
        return err.message;
    }
    return message;
}
module.exports = {
    errorHandler
};