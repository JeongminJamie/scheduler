import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace === true) {
      setHistory((prev) => {
        prev.pop();
        prev.push(newMode);
        setMode(newMode);
        return prev;
      })
    } else {
    setMode(newMode);
    setHistory(history.concat([newMode]));
    }
  };

  function back() {
    if (history.length > 1) {
      setHistory((prev) => {
        prev.pop();
        setMode(prev[prev.length - 1]);
        return prev;
    })
  }
};
  return { mode, transition, back };
};

