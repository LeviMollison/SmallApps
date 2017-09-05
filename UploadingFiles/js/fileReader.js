function selectImageFileEvent(e, imageURL){
    var files = e.target.files;
    
    // Match image files only
    for(var i = 0, f; f = files[i]; i++){
        if(f.type.match("image.*")){
            var reader = new FileReader();
            reader.onload = (
                function(theFile){
                    return function(e){
                        // give image file url
                        document.getElementById('bgArea').style.backgroundImage = 'url("' + e.target.result + '")';
                    }
                }
            )(f);
            reader.readAsDataURL(f);
        }
    }
}