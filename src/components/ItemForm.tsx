'use client';

import { useState } from 'react';
import api from '@/lib/api';

interface Props {
  onItemAdded: () => void;
}

export default function ItemForm({ onItemAdded }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post('/items', { title, description });
    setTitle('');
    setDescription('');
    onItemAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="card" style={{ marginBottom: '20px' }}>
      <h3 style={{ marginBottom: '15px' }}>Add New Item</h3>
      <div className="form-group">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit" className="btn-primary">Add Item</button>
    </form>
  );
}