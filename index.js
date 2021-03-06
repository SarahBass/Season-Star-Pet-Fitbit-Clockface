/*
----------------------------------------------
 *  Project:    Star Spring Day Clock Face
 *  Mail:       darahbass@gmail.com
 *  Github:     SarahBass
 ---------------------------------------------
 NOTES: 
 This Clock will be larger than normal
 because it has so many image backgrounds.
 
 Images are ALL Free Licence https://unsplash.com
 ---------------------------------------------
*/

/*--- Import Information from user Account ---*/
import { settingsStorage } from "settings";
import { me as appbit } from "appbit";
import { HeartRateSensor } from "heart-rate";
import clock from "clock";
import * as document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import { battery } from 'power';
import { display } from "display";
import { today as userActivity } from "user-activity";
import {goals, today} from "user-activity";
import { units } from "user-settings";

/*--- Create Local Variables for Information Storage ---*/
let daytext = "day";
let monthtext = "month";
let goalreached = "NONE";


/*--- Import Information from index.gui ---*/

let background = document.getElementById("background");
let ampm = document.getElementById("ampm");  
let date = document.getElementById("date");
let star = document.getElementById("star");
let mouth = document.getElementById("mouth");
let eyes = document.getElementById("eyes");
let cute = document.getElementById("cute");
var demoinstance = document.getElementById("demoinstance");
var demogroup = demoinstance.getElementById("demogroup");

//Update the clock every second 
clock.granularity = "seconds";

// Get a handle on the <text> elements 
const myLabel = document.getElementById("myLabel");
const batteryLabel = document.getElementById("batteryLabel");
const stepsLabel = document.getElementById("stepsLabel");
const firelabel = document.getElementById("firelabel");
const boltlabel = document.getElementById("boltlabel");
const heartlabel = document.getElementById("heartlabel");
const stairslabel = document.getElementById("stairslabel");
const distancelabel = document.getElementById("distancelabel");
const targetlabel = document.getElementById("targetlabel");


  
  if (HeartRateSensor && appbit.permissions.granted("access_heart_rate")) {
   const hrm = new HeartRateSensor();
  hrm.addEventListener("reading", () => {
    heartlabel.text = (`${hrm.heartRate}`);

  });
  display.addEventListener("change", () => {
    // Automatically stop the sensor when the screen is off to conserve battery
    display.on ? hrm.start() : hrm.stop();
  });
  hrm.start();
  }else {heartlabel.text = "off";}



/*--- CLOCK START ---*/
clock.ontick = (evt) => {

  let today = evt.date;
  let hours = today.getHours();
  let months = today.getMonth();
  let days = today.getDay();
  let dates = today.getDate();
  let years = today.getFullYear();
  let mins = util.zeroPad(today.getMinutes());
  let seconds = today.getSeconds();
  

 /*--- Update Stats for Screen ---*/
  updateScene();
  if (units.distance == "us"){
  distancelabel.text = (0.000621371 * userActivity.adjusted.distance).toFixed(1) + " mi";}
  else {distancelabel.text = (0.001 * userActivity.adjusted.distance).toFixed(1) + " km";}

  stairslabel.text = userActivity.adjusted.elevationGain;
  stepsLabel.text = userActivity.adjusted.steps;
  firelabel.text = userActivity.adjusted.calories;
  targetlabel.text = parseInt(userActivity.adjusted.steps/goals.steps * 100) + "%";
  boltlabel.text = userActivity.adjusted.activeZoneMinutes.total;
  heartlabel.text = "off";  
  checkAndUpdateBatteryLevel();
  demoinstance.animate("enable"); 
  
  //AM PM -Change the image based on 24 hours
  if (util.zeroPad(hours) >= 12){ampm.text = "pm";}
  else{ampm.text = "am";}
                              if ((util.zeroPad(hours) >= 0) && (util.zeroPad(hours) < 7)) {
                                   cute.image = "star/sleepingbear.png";}
                              else if (util.zeroPad(hours) == 7){
                                   cute.image = "star/apple.png";}
                              else if (util.zeroPad(hours) == 8){
                                   cute.image = "star/toothbrush.png";}
                              else if (util.zeroPad(hours) == 9){ 
                                   cute.image = "star/physics.png";}
                              else if (util.zeroPad(hours) == 10){ 
                                   cute.image = "star/read.png";}
                                 else if (util.zeroPad(hours) == 15){
                                   cute.image = "star/suntan.png";}
                                 else if (util.zeroPad(hours) == 16){
                                   cute.image = "star/soccer.png";}
                                 else if (util.zeroPad(hours) == 17){  
                                   cute.image = "star/workout.png";}
                                 else if (util.zeroPad(hours) == 18){  
                                   cute.image = "star/carrot.png";}
                                 else if (util.zeroPad(hours) == 19){  
                                    cute.image = "star/ukelele.png";} 
                                 else if (util.zeroPad(hours) == 20){  
                                    cute.image = "star/watchmovie.png";}
                                 else if (util.zeroPad(hours) == 21){ 
                                    cute.image = "star/toothbrush.png";}
                                 else if ((util.zeroPad(hours) == 22) ||
                                          (util.zeroPad(hours) == 23)){
                                    cute.image = "star/sleepingbear.png";}
                                 else {cute.image = "blank.png";}

  //Get Prize from Steps Goal goals.steps
  if (userActivity.adjusted.steps > goals.steps){goalreached = "show";}
  if (goalreached == "show"){ 
                           if (months == 9){star.image = "star/oct" + (dates % 10) + ".png";}
                           else {star.image = "star/" + (dates % 10) + ".png";}
  }else{ star.image = "star/yellow.png";}
   /*--- OPTION 2: TIME IMAGES FOR 12 HOUR CLOCK---*/
  //set class of each # IMAGE individually if needed for formatting
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  }else {hours = util.zeroPad(hours);}
  myLabel.text = `${hours}:${mins}`; 
  /*----------------------------SHOW CLOCK END----------------------------------*/                      
  //PLAY FLOAT ANIMATION
  if ( mins % 2 == 0){   
                          
                         eyes.image = "star/eyes.png";
                         if (seconds % 2 == 0){mouth.image = "star/notongue.png";}
                         else{mouth.image = "star/littlemouth.png";}   
                           
  //PLAY STAND ANIMATION - MOUTH CHANGES EVERY 10 MINUTES  
    
  }else{           eyes.image = "star/closedeyes.png"; 
                   if ( parseInt(mins/10) == 1 ){
                   if (seconds % 2 == 0){mouth.image = "star/littlemouth.png";}
                   else{mouth.image = "star/tinymouth.png";}}
                 else if (parseInt(mins/10) == 2 ){
                   if (seconds % 2 == 0){mouth.image = "star/circlemouth.png";}
                   else{mouth.image = "star/tinycirclemouth.png";}}
                                     
                 else if ( parseInt(mins/10) == 3 ){
                   if (seconds % 2 == 0){mouth.image = "star/tinycirclemouth.png";}
                   else{mouth.image = "star/mouth.png";}}  
                 
                 else if (parseInt(mins/10) == 4 ){ 
                   if (seconds % 2 == 0){mouth.image = "star/littleovalmouth.png";}
                   else{mouth.image = "star/tinymouth.png";}}
                 
                 else if (parseInt(mins/10) == 5 ){
                   if (seconds % 2 == 0){mouth.image = "star/littlemouth.png";}
                   else{mouth.image = "star/tinymouth.png";}}

                 else if (parseInt(mins/10) == 6 ){ 
                   if (seconds % 2 == 0){mouth.image = "star/notongue.png";}
                   else{mouth.image = "star/littlemouth.png";}}
                 
                 else if (parseInt(mins/10) == 0 ){ 
                   if (seconds % 2 == 0){mouth.image = "star/tinymouth.png";}
                   else{mouth.image = "star/tinycirclemouth.png";}}
      }

  /*--- Battery Functions ---*/
  display.addEventListener('change', function () { if (this.on) {checkAndUpdateBatteryLevel();}
                                             
});
/*----------------------------END OF ON TICK-----------------------------------*/
  
/*----------------------------START OF FUNCTIONS--------------------------------*/

 /*--- Change Battery RED , GREEN & CHARGE ---*/  

function checkAndUpdateBatteryLevel() {
  batteryLabel.text = `${battery.chargeLevel}%`;
  if (battery.chargeLevel > 30){ batteryLabel.class = "labelgreen";}
  else {batteryLabel.class = "labelred";
        battery.onchange = (charger, evt) => {batteryLabel.class = "labelgreen";}}
}
 
  
  
/*--- Change Date and Background Functions ---*/
  function updateScene() {
   changeBackground();
   date.text = " " + daytext + " " + monthtext + " " + dates + " " + years + " ";  
  if (months == 0){monthtext = "January";}
  else if (months == 1){monthtext =  "February";}
  else if (months == 2){monthtext =  "March";}
  else if (months == 3){monthtext =  "April";}
  else if (months == 4){monthtext =  "May";}
  else if (months == 5){monthtext =  "June";}
  else if (months == 6){monthtext =  "July";}
  else if (months == 7){monthtext =  "August";}
  else if (months == 8){monthtext =  "Septemper";}
  else if (months == 9){monthtext =  "October";}
  else if (months == 10){monthtext = "November";}
  else if (months == 11){monthtext = "December";}
  else {monthtext = "MONTH";}
    
  if (days == 0){daytext =      "Sunday,";}
  else if (days == 1){daytext = "Monday,";}
  else if (days == 2){daytext = "Tuesday,";}
  else if (days == 3){daytext = "Wednesday,";}
  else if (days == 4){daytext = "Thursday,";}
  else if (days == 5){daytext = "Friday,";}
  else if (days == 6){daytext = "Saturday,";}
  else {daytext = "DAY";}
 }

//You can use a convienent way to find your and upload your images
//"file location" + number variable + ".imageformat" 

 function changeBackground(){ 
   
   if (months == 9){
       if ((dates == 1)||(dates == 3)||(dates == 5)||(dates == 10)||(dates == 13)||
          (dates == 12)||(dates == 20)||(dates == 28)||(dates == 29)||(dates == 30)
          ||(dates == 31))
          {background.image = "background/oct" + dates + ".jpeg";}
       else {background.image = "background/" + dates + ".jpeg";}}
   else if (months == 10){
        if ((dates == 1)||(dates == 24)||(dates == 25))
          {background.image = "background/nov" + dates + ".jpeg";}
        else {background.image = "background/" + dates + ".jpeg";}}
   else {background.image = "background/" + dates + ".jpeg";}  
}



}
/*----------------------------END OF FUNCTIONS--------------------------------*/
/*-------------------------------END OF CODE----------------------------------*/
