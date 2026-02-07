'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import ItemForm from '@/components/ItemForm';
import ItemList from '@/components/ItemList';
import api from '@/lib/api';

interface Item {
  _id: string;
  title: string;
  description?: string;
}

export default function DashboardPage() {
  const { user, logout, loading } = useAuth();
  const [items, setItems] = useState<Item[]>([]);
  const router = useRouter();

  const fetchItems = async () => {
    const { data } = await api.get('/items');
    setItems(data);
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    } else if (user) {
      fetchItems();
    }
  }, [user, loading, router]);

  if (loading) return <div className="container">Loading...</div>;
  if (!user) return null;

  return (
    <div className="container">
      <div className="header">
        <h1>Hello, {user.name}!</h1>
        <button onClick={logout} className="btn-danger">Logout</button>
      </div>
      <ItemForm onItemAdded={fetchItems} />
      <ItemList items={items} onUpdate={fetchItems} />
    </div>
  );
}