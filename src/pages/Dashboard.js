import React, { useEffect, useState } from 'react';
import { apiFetch } from '../services/api';
import { useAuth } from '../services/AuthContext';
import './Dashboard.css';
function Dashboard() {
  const { logout } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const fetchContacts = async () => {
    try {
      const res = search
        ? await apiFetch(`/contacts/search/${search}`)
        : await apiFetch('/contacts');
      setContacts(res);
    } catch {
      setError('Failed to fetch contacts');
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [search]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      if (editingId) {
        await apiFetch(`/contacts/${editingId}`, { method: 'PUT', body: form });
      } else {
        await apiFetch('/contacts', { method: 'POST', body: form });
      }
      setForm({ name: '', email: '', phone: '' });
      setEditingId(null);
      fetchContacts();
    } catch {
      setError('Failed to save contact');
    }
  };

  const handleEdit = contact => {
    setForm({ name: contact.name, email: contact.email, phone: contact.phone });
    setEditingId(contact._id);
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this contact?')) return;
    try {
      await apiFetch(`/contacts/${id}`, { method: 'DELETE' });
      fetchContacts();
    } catch {
      setError('Failed to delete contact');
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Contact Book</h2>
        <button className="dashboard-logout-btn" onClick={logout}>Logout</button>
      </div>
      <div className="dashboard-main">
        <div className="dashboard-form-section">
          <form onSubmit={handleSubmit} className="dashboard-form">
            <h5>{editingId ? 'Edit Contact' : 'Add Contact'}</h5>
            <div className="dashboard-form-group">
              <input name="name" className="dashboard-input" placeholder="Name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="dashboard-form-group">
              <input name="email" className="dashboard-input" placeholder="Email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="dashboard-form-group">
              <input name="phone" className="dashboard-input" placeholder="Phone" value={form.phone} onChange={handleChange} required />
            </div>
            {error && <div className="dashboard-alert dashboard-alert-danger">{error}</div>}
            <button className="dashboard-btn" type="submit">{editingId ? 'Update' : 'Add'}</button>
            {editingId && <button className="dashboard-btn dashboard-btn-secondary" type="button" onClick={() => { setEditingId(null); setForm({ name: '', email: '', phone: '' }); }}>Cancel</button>}
          </form>
        </div>
        <div className="dashboard-list-section">
          <input className="dashboard-search" placeholder="Search contacts..." value={search} onChange={e => setSearch(e.target.value)} />
          <div className="dashboard-list">
            {contacts.map(contact => (
              <div key={contact._id} className="dashboard-list-item">
                <div>
                  <div className="dashboard-contact-name"><strong>{contact.name}</strong></div>
                  <div className="dashboard-contact-details">{contact.email} | {contact.phone}</div>
                </div>
                <div>
                  <button className="dashboard-btn dashboard-btn-edit" onClick={() => handleEdit(contact)}>Edit</button>
                  <button className="dashboard-btn dashboard-btn-delete" onClick={() => handleDelete(contact._id)}>Delete</button>
                </div>
              </div>
            ))}
            {contacts.length === 0 && <div className="dashboard-empty">No contacts found.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 