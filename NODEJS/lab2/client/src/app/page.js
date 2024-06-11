"use client"
import React, { useState, useEffect } from 'react';
import axios from '@/services/axios';
import Swal from 'sweetalert2';
import { formatTime } from '@/utils/formatTime';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    thumb: ''
  });
  const [updateItem, setUpdateItem] = useState({
    id: '',
    name: '',
    description: '',
    thumb: ''
  });
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('/items');
      setItems(response.data.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleCreateItem = async () => {
    try {
      const response = await axios.post('/items', {
        name: newItem.name,
        description: newItem.description,
        thumb: newItem.thumb
      });
      setItems([...items, response.data.data]);
      setNewItem({
        name: '',
        description: '',
        thumb: ''
      });
      Swal.fire({
        icon: 'success',
        title: 'Item Created',
        text: 'The item has been successfully created.'
      });
    } catch (error) {
      console.error('Error creating item:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while creating the item.'
      });
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`/items/${id}`);
      setItems(items.filter(item => item.id !== id));
      Swal.fire({
        icon: 'success',
        title: 'Item Deleted',
        text: 'The item has been successfully deleted.'
      });
    } catch (error) {
      console.error('Error deleting item:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while deleting the item.'
      });
    }
  };

  const handleUpdateItem = async () => {
    try {
      const response = await axios.put(`/items/${updateItem.id}`, {
        name: updateItem.name,
        description: updateItem.description,
        thumb: updateItem.thumb
      });
      setItems(items.map(item => item.id === updateItem.id ? response.data.data : item));
      setShowUpdateForm(false);
      Swal.fire({
        icon: 'success',
        title: 'Item Updated',
        text: 'The item has been successfully updated.'
      });
    } catch (error) {
      console.error('Error updating item:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while updating the item.'
      });
    }
  };

  const openUpdateForm = (id, name, description, thumb) => {
    setShowUpdateForm(true);
    setUpdateItem({
      id,
      name,
      description,
      thumb
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Item List</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleCreateItem();
      }}>
        <input
          type="text"
          placeholder="Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className="border border-gray-300 rounded-md p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
          className="border border-gray-300 rounded-md p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Thumb"
          value={newItem.thumb}
          onChange={(e) => setNewItem({ ...newItem, thumb: e.target.value })}
          className="border border-gray-300 rounded-md p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Create</button>
      </form>
      <br />
      <table className="border-collapse w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 px-4 py-2">ID</th>
            <th className="border border-gray-400 px-4 py-2">Name</th>
            <th className="border border-gray-400 px-4 py-2">Description</th>
            <th className="border border-gray-400 px-4 py-2">Created At</th>
            <th className="border border-gray-400 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id} className="border border-gray-400">
              <td className="border border-gray-400 px-4 py-2">{item.id}</td>
              <td className="border border-gray-400 px-4 py-2">{item.name}</td>
              <td className="border border-gray-400 px-4 py-2">{item.description}</td>
              <td className="border border-gray-400 px-4 py-2">{formatTime(item.createdAt)}</td>
              <td className="border border-gray-400 px-4 py-2">
                <button onClick={() => handleDeleteItem(item.id)} className="bg-red-500 text-white px-4 py-2 rounded-md mr-2">Delete</button>
                <button onClick={() => openUpdateForm(item.id, item.name, item.description, item.thumb)} className="bg-green-500 text-white px-4 py-2 rounded-md">Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      {/* Update Form */}
      {showUpdateForm && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-md max-w-md">
            <h2 className="text-xl font-bold mb-4">Update Item</h2>
            <input
              type="text"
              placeholder="Name"
              value={updateItem.name}
              onChange={(e) => setUpdateItem({ ...updateItem, name: e.target.value })}
              className="border border-gray-300 rounded-md p-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Description"
              value={updateItem.description}
              onChange={(e) => setUpdateItem({ ...updateItem, description: e.target.value })}
              className="border border-gray-300 rounded-md p-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Thumb"
              value={updateItem.thumb}
              onChange={(e) => setUpdateItem({ ...updateItem, thumb: e.target.value })}
              className="border border-gray-300 rounded-md p-2 mb-4 w-full"
            />
            <div className="flex justify-end">
              <button onClick={() => setShowUpdateForm(false)} className="text-gray-500 mr-2">Cancel</button>
              <button onClick={handleUpdateItem} className="bg-blue-500 text-white px-4 py-2 rounded-md">Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemList;
