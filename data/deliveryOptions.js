import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

// Array of available delivery options with their respective delivery days and prices in cents
export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
},{
  id: '2',
  deliveryDays: 3,
  priceCents: 499
},{
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}];

// Function to retrieve the delivery option by its ID
export function getDeliveryOption(deliveryOptionId){
  let deliveryOption;
  // Finding the delivery option that matches the selected ID
  deliveryOptions.forEach((option) => {
    if(option.id === deliveryOptionId){
      deliveryOption = option;
    }
  });
  // Return the found delivery option or the default first option if no match is found
  return deliveryOption || deliveryOptions[0];
}

// Helper function to determine if a given date falls on a weekend
function isWeekend(date){
  const dayOfWeek = date.format('dddd');
  return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
}

// Function to calculate the estimated delivery date based on the selected delivery option
export function calculateDeliveryDate(deliveryOption){
  let remainingDays = deliveryOption.deliveryDays;
  let deliveryDate = dayjs(); // Start from current date
  
   // Loop until all delivery days (excluding weekends) are counted
  while(remainingDays > 0){
    deliveryDate = deliveryDate.add(1,'day');
     if(!isWeekend(deliveryDate)){
      remainingDays--;
     }
  }
  /*
    Iteration	   Date	      Weekend?	 Remaining Days
      Start	   Fri,Jun 20	    No           3
      +1 day	 Sat,Jun 21	   ✅ Yes       3
      +1 day	 Sun,Jun 22	   ✅ Yes	     3
      +1 day	 Mon,Jun 23	   ❌ No	       2
      +1 day	 Tue,Jun 24	   ❌ No	       1
      +1 day	 Wed,Jun 25	   ❌ No	       0 ✅ Done!
  */
  const dateString = deliveryDate.format('dddd, MMMM D');

  return dateString;
}