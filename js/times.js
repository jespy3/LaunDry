function updateDate() {
    /* Changes the element displaying the date to most recent.
    */
   dt = Date.now();
   var month = dt.getMonth()+1;  
   var day = dt.getDate();  
   var year = dt.getFullYear();  
   document.write(month + '-' + day + '-' + year);  
}