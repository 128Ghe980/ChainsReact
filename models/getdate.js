var myDate = new Date();
var s = '';
function getMydate(){
    s=myDate.toLocaleDateString();
}
module.exports=getMydate();