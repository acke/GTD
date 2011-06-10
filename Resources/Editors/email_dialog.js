
createEmail = function(subject, content){
	
//	var win = Ti.UI.createWindow({
//            title: Subject,
//            orientationModes: [Titanium.UI.PORTRAIT, Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT]
//        });
		
    var emailDialog = Titanium.UI.createEmailDialog();
    if (!emailDialog.isSupported()) {
        Ti.UI.createAlertDialog({
            title: 'Error',
            message: 'Email not available'
        }).show();
        return;
    }
    emailDialog.setSubject(subject);
    emailDialog.setToRecipients(['foo@purplescout.se']);
    //emailDialog.setCcRecipients(['bar@yahoo.com']);
    //emailDialog.setBccRecipients(['blah@yahoo.com']);
    
    if (Ti.Platform.name == 'iPhone OS') {
        emailDialog.setMessageBody(content);
        emailDialog.setHtml(true);
        emailDialog.setBarColor('#336699');
    }
    else {
        emailDialog.setMessageBody(content);
    }
    
    emailDialog.addEventListener('complete', function(e){
        if (e.result == emailDialog.SENT) {
            if (Ti.Platform.osname != 'android') {
                // android doesn't give us useful result codes.
                // it anyway shows a toast.
                alert("message was sent");
            }
        }
        else {
            alert("message was not sent. result = " + e.result);
        }
    });
    
    return emailDialog;
};


