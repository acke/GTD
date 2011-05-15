function formatDate(){
    var date = new Date();
    var datestr = date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
    if (date.getHours() >= 12) {
        datestr += ' ' + (date.getHours() == 12 ? date.getHours() : date.getHours() - 12) + ':' + date.getMinutes() + ' PM';
    }
    else {
        datestr += ' ' + date.getHours() + ':' + date.getMinutes() + ' AM';
    }
    return datestr;
}

function getTablePullHeader(){

    var border = Ti.UI.createView({
        backgroundColor: "#576c89",
        height: 2,
        bottom: 0
    });
    
    var tableHeader = Ti.UI.createView({
        backgroundColor: "#e2e7ed",
        width: 320,
        height: 60
    });
    
    // fake it til ya make it..  create a 2 pixel
    // bottom border
    tableHeader.add(border);
    
    return tableHeader;
};

function getStatusLabel(){
    var statusLabel = Ti.UI.createLabel({
        text: "Pull to reload",
        left: 55,
        width: 200,
        bottom: 30,
        height: "auto",
        color: "#576c89",
        textAlign: "center",
        font: {
            fontSize: 13,
            fontWeight: "bold"
        },
        shadowColor: "#999",
        shadowOffset: {
            x: 0,
            y: 1
        }
    });
    
    
    return statusLabel;
};

function getLastUpdatedLabel(){
    var lastUpdatedLabel = Ti.UI.createLabel({
        text: "Last Updated: " + formatDate(),
        left: 55,
        width: 200,
        bottom: 15,
        height: "auto",
        color: "#576c89",
        textAlign: "center",
        font: {
            fontSize: 12
        },
        shadowColor: "#999",
        shadowOffset: {
            x: 0,
            y: 1
        }
    });
    
    return lastUpdatedLabel;
    
};

function getActIndicator(){
    var actInd = Titanium.UI.createActivityIndicator({
        left: 20,
        bottom: 13,
        width: 30,
        height: 30
    });
    return actInd;
};

function getArrow(){
    var arrow = Ti.UI.createView({
        backgroundImage: "../images/whiteArrow.png",
        width: 23,
        height: 60,
        bottom: 10,
        left: 20
    });
    
    return arrow;
};
