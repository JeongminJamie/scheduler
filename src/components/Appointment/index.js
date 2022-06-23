import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Form from "./Form";
import Empty from "./Empty";
import Error from "./Error";
import Confirm from "./Confirm";
import useVisualMode from "../../hooks/useVisualMode";
import Status from "./Status";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer, state) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);

    props
      .bookInterview(props.id, interview, state)
      .then(() => {
        transition(SHOW);
      })
      .catch((error) => transition(ERROR_SAVE, true));
  }

  function onDelete() {
    transition(DELETE, true);

    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          onCancel={back}
          interviewers={props.interviewers}
          onSave={(name, interviewer) => save(name, interviewer, CREATE)}
        />
      )}
      {mode === SAVING && <Status message="saving" />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onCancel={back}
          onConfirm={onDelete}
        />
      )}
      {mode === DELETE && <Status message="deleting" />}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={
            props.interview.interviewer ? props.interview.interviewer.id : null
          }
          interviewers={props.interviewers}
          onCancel={() => transition(SHOW)}
          onSave={(name, interviewer) => save(name, interviewer, EDIT)}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error message="could not cancel appointment" onClose={back} />
      )}
    </article>
  );
}
