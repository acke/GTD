(function(){
    //	gtd.net = {};
    //	gtd.net.httpclient = {};
    // create table view data object
    var data = [];
    
    createHTTPClient = function(){
        xhr = Ti.Network.createHTTPClient();
        
        xhr.file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'filename');
        
       
        return xhr;
    };
    
    
})();
