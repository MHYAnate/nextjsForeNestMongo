'use client';

import { useState } from 'react';
import api from '@/lib/api';

interface Item {
  _id: string;
  title: string;
  description?: string;
}

interface Props {
  items: Item[];
  onUpdate: () => void;
}

export default function ItemList({ items, onUpdate }: Props) {
  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const startEdit = (item: Item) => {
    setEditId(item._id);
    setEditTitle(item.title);
    setEditDescription(item.description || '');
  };

  const saveEdit = async () => {
    await api.put(`/items/${editId}`, { title: editTitle, description: editDescription });
    setEditId(null);
    onUpdate();
  };

  const deleteItem = async (id: string) => {
    await api.delete(`/items/${id}`);
    onUpdate();
  };

  if (items.length === 0) {
    return <p style={{ textAlign: 'center', color: '#666' }}>No items yet. Add one above!</p>;
  }

  return (
    <div>
      {items.map((item) => (
        <div key={item._id} className="item-card">
          {editId === item._id ? (
            <div style={{ flex: 1 }}>
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                style={{ marginBottom: '5px' }}
              />
              <input
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Description"
              />
            </div>
          ) : (
            <div>
              <strong>{item.title}</strong>
              {item.description && <p style={{ color: '#666', fontSize: '14px' }}>{item.description}</p>}
            </div>
          )}
          <div style={{ display: 'flex', gap: '5px' }}>
            {editId === item._id ? (
              <>
                <button onClick={saveEdit} className="btn-primary">Save</button>
                <button onClick={() => setEditId(null)} className="btn-secondary">Cancel</button>
              </>
            ) : (
              <>
                <button onClick={() => startEdit(item)} className="btn-secondary">Edit</button>
                <button onClick={() => deleteItem(item._id)} className="btn-danger">Delete</button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}