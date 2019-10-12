import { user } from "user-profile";

// Add zero in front of numbers < 10
export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
export function getHeartRateColor(heartRate)
{
  switch(user.heartRateZone(heartRate))
   {
     case 'fat-burn':
       return 'fb-orange';
     case 'cardio':
       return 'fb-red';
     case 'peak':
       return 'fb-purple';
     case 'out-of-range':
       return 'fb-white';
     case 'below-custom':
       return 'fb-white';
     case 'custom':
       return 'fb-yellow';
     case 'above-custom':
       return 'fb-red';
   }
}
