(function(){
    
    getQuadrantFromValue = function(quadrant){
        var value;
		
		Titanium.API.info('quadrant: '+quadrant);
        
        switch (quadrant) {
            case 1:
                value = "Urgent, Important";
                break;
            case 2:
                value = "Not urgent, Important";
                break;
            case 3:
                value = "Urgent, Not important";
                break;
            case 4:
                value = "Not urgent, Not important";
                break;
            default:
                value = "error";
        }
        
        return value;
    };
    
    
})();
