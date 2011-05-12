function sortTaskArray(data){
    data.sort(function(a, b){
        return a.quadrant - b.quadrant;
    });
    return data;
};