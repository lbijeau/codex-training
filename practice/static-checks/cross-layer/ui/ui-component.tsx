import React from 'react';
import { saveRecord } from '../db/db-utility';

export function Modal() {
  const record = { id: 'temp' };
  return <div>{saveRecord(record).id}</div>;
}
