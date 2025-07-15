// pages/api/food/[id].js
import { db } from '../../../firebase';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Missing ID' });
  }

  try {
    const itemRef = doc(db, 'foodItems', id);

    if (req.method === 'DELETE') {
      await deleteDoc(itemRef);
      return res.status(200).json({ message: 'Item deleted' });
    }

    if (req.method === 'PUT') {
      const updatedData = req.body;
      await updateDoc(itemRef, updatedData);
      return res.status(200).json({ message: 'Item updated', item: { id, ...updatedData } });
    }

    res.setHeader('Allow', ['PUT', 'DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error('Error in /api/food/[id]:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

