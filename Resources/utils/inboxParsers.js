function parseInboxEntries(inboxEntries, item){
    var title = item.getElementsByTagName("content").item(0).text;
    var id = item.getElementsByTagName("id").item(0).text;
    
    inboxEntries.push({
        title: title,
        id: id,
        hasChild: true,
        //custom data attribute to pass to detail page
        content: title,
        isTask: false
    });
    
    return inboxEntries;
};
