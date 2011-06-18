(function(){
    Ti.include('../uicomponents/backgroundGradient.js');
    
    selectDate = function(_cb){
        var win = Ti.UI.createWindow({
            title: 'Pick a date',
            orientationModes: [Titanium.UI.PORTRAIT, Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT],
            //backgroundGradient: getBackgroundGradient()
            backgroundColor: 'black'
        });
        
        var minDate = new Date();
        minDate.setFullYear(2010);
        minDate.setMonth(0);
        minDate.setDate(1);
        
        var maxDate = new Date();
        maxDate.setFullYear(2020);
        maxDate.setMonth(11);
        maxDate.setDate(31);
        
        var value = new Date();
        value.setFullYear(value.getFullYear());
        value.setMonth(value.getMonth());
        value.setDate(value.getDate());
        
        var picker = Ti.UI.createPicker({
            type: Ti.UI.PICKER_TYPE_DATE_AND_TIME,
            minDate: minDate,
            maxDate: maxDate,
            value: value
        });
        
        // turn on the selection indicator (off by default)
        picker.selectionIndicator = true;
        picker.setLocale(Titanium.Platform.locale);
        
        win.add(picker);
        
        var label = Ti.UI.createLabel({
            text: 'Choose a date/time',
            top: 10,
            width: 'auto',
            height: 'auto',
            textAlign: 'center',
            color: 'white'
        });
        win.add(label);
        
        picker.addEventListener('change', function(e){
            var date = new Date(e.value);
            var parsedDate = date.getUTCFullYear() + "-" + date.getUTCMonth() + "-" + date.getDate();
            parsedDate += " ";
            parsedDate += date.getUTCHours() + ":" + date.getUTCMinutes() + ":" + date.getUTCSeconds();

            label.text = parsedDate;
            
            _cb(parsedDate);
        });
        
        var back = Titanium.UI.createButton({
            title: 'Back',
            style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN
        });
        win.setLeftNavButton(back);
        back.addEventListener('click', function(){
            win.close();
        });
        
        return win;
        
    };
})();
