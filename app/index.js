import clock from "clock";
import { me as appbit } from "appbit";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import { today } from "user-activity";
import { battery } from "power";
import { HeartRateSensor } from "heart-rate";

// Get a handle on the <text> element
const myTime = document.getElementById("myTime");
const myDate = document.getElementById("myDate");
const mySteps = document.getElementById("mySteps");

// Update the clock every minute
clock.granularity = "seconds";

let stepsPermission = appbit.permissions.granted("access_activity");
let heartRate = new HeartRateSensor();

heartRate.onreading = function () {}
heartRate.start(); 


// Update the <text> element every tick with the current time
//clock.ontick = (evt) => {
function updateTime(e) {

  let d = new Date();
  let hours = d.getHours();
  let day = util.zeroPad(d.getDate());
  let parts = d.toLocaleString('default', { month: 'short' }).split(' ');
  let wd = getDayName(d.getDay());
  let month = parts[1]; //.toUpperCase();
  let mins = util.zeroPad(d.getMinutes());
  
  if (preferences.clockDisplay === "12h") {
    hours = hours % 12 || 12;
  } else {
    hours = util.zeroPad(hours);
  }
  
  myTime.text = `${hours}:${mins}`;
  myDate.text = `${wd} ${month} ${day}`;
    
  if (stepsPermission) {
    mySteps.text = getSteps(today.adjusted.steps);
  }
  showBattery();
  getHeartRate();
}

function getSteps(steps) {
  if (steps < 20000)
    return `${steps}`;
  let result = Math.floor(steps/20000);
  return `${result}`+'K';
}
function getDayName(index) {  
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[index];
}
function showBattery()
{
  let power = document.getElementById("myBattery");
  power.style.display = "none";  
  if (battery.chargeLevel < 50)
  {
    power.style.display = "inline";
    power.text = Math.floor(battery.chargeLevel) + '%';    
  }
}
function getHeartRate()
{
  let heartRate = new HeartRateSensor();
  let hr = document.getElementById("myHeartRate");
  
  heartRate.onreading = function () {
    let rate = heartRate.heartRate;
    hr.text = rate;
    hr.style.fontSize = 40;
  }
  heartRate.start();  
}
clock.ontick = (evt) => updateTime();