function createTextfile(){
    let 
}

function checkInput() {

}

function getCurrentDate() {
    let today = new Date();
    let date = `${(today.getMonth() + 1)}/${today.getDate()}/${today.getFullYear()}`;
    let hours = today.getHours();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    let time = `${hours}:${today.getMinutes()} ${ampm}`;
    let machineDate = `${today.getFullYear()}-${(today.getMonth() + 1)}-${today.getDate()}`;
    let machineTime = `${today.getHours()}:${today.getMinutes()}`;
    let dateTime = {
        timeTag: {date, time},
        machineReadableDate: {machineDate, machineTime}
    };
    return dateTime;
}
function addDateToDOM(){
    let currentTimeTag = document.querySelector("#hours-minutes");
    let currentDate = document.querySelector("#current-date");
    let {timeTag, machineReadableDate} = getCurrentDate();
    currentTimeTag.textContent = timeTag.time;
    currentTimeTag.setAttribute("datetime", machineReadableDate.machineTime);
    
    currentDate.textContent = timeTag.date;
    currentDate.setAttribute("datetime", machineReadableDate.machineDate);
}
addDateToDOM();
let toExactMinute = 60000 - (new Date().getTime() % 60000);
setTimeout(function() {
    setInterval(addDateToDOM, 60000);
    addDateToDOM();
}, toExactMinute);
