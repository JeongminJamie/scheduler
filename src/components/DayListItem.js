import React from "react";
import 'components/DayListItem.scss';
import classNames from 'classnames';

export default function DayListItem(props) {

  function formatSpots(spots) {
    if (spots === 1) {
      return "1 spot remaining";
    }
    if (spots > 1) {
      return spots + " spots remaining";
    }
    if (!spots) {
      return "no spots remaining";
    }
  }

  const dayClass = classNames(
    "day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0 
  });

  return (
    <li onClick={() => props.setDay(props.name)} className={dayClass}
    selected={props.selected}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}