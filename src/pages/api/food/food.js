// pages/api/food.js
import { db } from '../../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const snapshot = await getDocs(collection(db, 'foodItems'));
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return res.status(200).json(items);
    }

    if (req.method === 'POST') {
      const { name, expiryDate, category, quantity, unit, location, addedDate } = req.body;

      if (!name || !expiryDate) {
        return res.status(400).json({ error: 'Name and expiryDate are required' });
      }

      const newItem = {
        name,
        expiryDate,
        category: category || '',
        quantity: quantity || 1,
        unit: unit || '',
        location: location || '',
        addedDate: addedDate || new Date().toISOString(),
      };

      const docRef = await addDoc(collection(db, 'foodItems'), newItem);
      return res.status(201).json({ message: 'Item added', item: { id: docRef.id, ...newItem } });
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error('Error in /api/food:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
