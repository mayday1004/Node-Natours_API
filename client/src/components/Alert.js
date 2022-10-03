import React from 'react';
import { useAppContext } from '../contexts/appContext';

const Alert = () => {
  const { alertText, alertType } = useAppContext();
  return <div className={`alert alert--${alertType}`}>{alertText}</div>;
};

export default Alert;
