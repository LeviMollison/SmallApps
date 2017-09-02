// Break the form into a dictionary and return it
function parseForm(url){
    if(url){
        var query = url.substring(url.indexOf('?') + 1);
        var formFields = query.split('&');
        var information = {};
        for(var i = 0, len = formFields.length; i < len; i++){
            var temp = formFields[i].split('=');
            information[temp[0]] = temp[1];
        }
        return information;    
    }
}