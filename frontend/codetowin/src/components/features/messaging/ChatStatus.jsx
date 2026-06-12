import React from 'react';

export default function ChatStatus({ status }) {
  if (!status || status === 'offline') return null;

  return (
    <span className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white ${status === 'online' ? 'bg-green-400' : 'bg-slate-300'}`}></span>
  );
}
