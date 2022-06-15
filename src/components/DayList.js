import React from 'react';
import DayListItem from 'components/DayListItem';

const DayList = (props) => {

  const allDays = props.days.map(
    elem =>
      <DayListItem key={elem.id}
        name={elem.name}
        spots={elem.spots}
        selected={elem.name === props.value}
        setDay={props.onChange}
      />)

  return (
    <ul>
      {allDays}
    </ul>
  );
};

export default DayList;