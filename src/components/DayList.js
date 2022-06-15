import React from 'react';
import DayListItem from 'components/DayListItem';

const DayList = (props) => {

  const allDay = props.days.map(
    elem =>
      <DayListItem key={elem.id}
        name={elem.name}
        spots={elem.spots}
        selected={elem.name === props.day}
        setDay={props.setDay}
      />)

  return (
    <ul>
      {allDay}
    </ul>
  );
};

export default DayList;