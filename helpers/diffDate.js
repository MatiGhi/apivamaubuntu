const diffDate = (date2, date1) => {
    let diff = (date2.getTime() - date1.getTime()) / 1000;
    diff/=60;
    return Math.abs(Math.round(diff));
 }

 module.exports = { 
    diffDate
 }