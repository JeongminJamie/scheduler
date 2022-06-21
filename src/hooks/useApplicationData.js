import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const interviewDay = state.days.findIndex((day) => day.appointments.includes(id));
    const newDay = { ...state.days[interviewDay], spots: state.days[interviewDay].spots - 1 };
    const days = [...state.days];
    days.splice(interviewDay, 1, newDay);


    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState(
          {
            ...state,
            appointments,
            days
          }
        )
      })
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const interviewDay = state.days.findIndex((day) => day.appointments.includes(id));
    const newDay = { ...state.days[interviewDay], spots: state.days[interviewDay].spots + 1 };
    const days = [...state.days];
    days.splice(interviewDay, 1, newDay);

    return axios.delete(`/api/appointments/${id}`)
      .then(() => setState({ ...state, appointments, days }))
  };

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  });

  return { state, setDay, bookInterview, cancelInterview };

}