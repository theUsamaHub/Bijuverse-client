import { useEffect, useRef, useState } from 'react';
import { Context, initialData } from './adminStore';
export function AdminProvider({ children }) {
  const [data, setData] = useState(initialData);
  const [notice, setNotice] = useState('');
  const urls = useRef([]);
  useEffect(() => () => urls.current.forEach(url => URL.revokeObjectURL(url)), []);
  const save = (collection, record, message = 'Changes saved in this preview.') => {
    const saved = { ...record, id: record.id || crypto.randomUUID() };
    setData(old => ({ ...old, [collection]: old[collection].some(r => r.id === saved.id) ? old[collection].map(r => r.id === saved.id ? saved : r) : [...old[collection], saved], activity: [{ id: crypto.randomUUID(), text: message }, ...old.activity].slice(0, 6) }));
    setNotice(message); return saved.id;
  };
  const patch = (collection, id, fields, message) => save(collection, { ...data[collection].find(r => r.id === id), ...fields }, message);
  return <Context.Provider value={{ data, setData, save, patch, notice, setNotice, urls }}>{children}</Context.Provider>;
}

