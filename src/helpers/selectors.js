export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(eachDay => eachDay.name === day)

  if (filteredDay.length === 0) {
    return [];
  }
  
  let appointmentsArr = filteredDay[0].appointments;

let resultArray = [];
  for (const appointment of appointmentsArr) {
   resultArray.push(state.appointments[appointment])
  }
return resultArray;
};