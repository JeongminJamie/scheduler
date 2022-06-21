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

export function getInterview(state, interview) {

  if (interview === null) {
    return null;
  }

  const interviewerId = interview.interviewer;
  const interviewer = state.interviewers[interviewerId];
  const result = {
    student: interview.student,
    interviewer: {
      id: interviewerId,
      name: interviewer.name,
      avatar: interviewer.avatar
    }
  }
  return result;
};

export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.filter(eachDay => eachDay.name === day)

  if (filteredDay.length === 0) {
    return [];
  }

  const interviewers = filteredDay[0].interviewers.map(id => state.interviewers[id]);

  return interviewers;
};