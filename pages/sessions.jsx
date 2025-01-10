import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

export default function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [form, setForm] = useState({ title: '', date: '', time: '', link: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Fetch sessions from the API
  const fetchSessions = async () => {
    try {
      const response = await axios.get('/api/sessions');
      setSessions(response.data);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update session
      try {
        await axios.put(`/api/sessions?id=${currentId}`, form);
        setForm({ title: '', date: '', time: '', link: '' });
        setIsEditing(false);
        setCurrentId(null);
        fetchSessions();
      } catch (error) {
        console.error('Error updating session:', error);
      }
    } else {
      // Create session
      try {
        await axios.post('/api/sessions', form);
        setForm({ title: '', date: '', time: '', link: '' });
        fetchSessions();
      } catch (error) {
        console.error('Error creating session:', error);
      }
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/sessions?id=${id}`);
      fetchSessions();
    } catch (error) {
      console.error('Error deleting session:', error);
    }
  };

  // Handle edit
  const handleEdit = (session) => {
    setForm(session);
    setIsEditing(true);
    setCurrentId(session._id);
  };

  // Fetch sessions on component mount
  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <Layout>
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Manage Sessions</h1>

        {/* Form for creating/updating sessions */}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              placeholder="Date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              placeholder="Time"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              className="p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="url"
              placeholder="Link"
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
              className="p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            {isEditing ? 'Update Session' : 'Create Session'}
          </button>
        </form>

        {/* Display sessions */}
        <div className="grid grid-cols-1 gap-4">
          {sessions.map((session) => (
            <div
              key={session._id}
              className="p-4 border border-gray-300 rounded shadow flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold">{session.title}</h2>
                <p className="text-sm text-gray-600">
                  {session.date} | {session.time}
                </p>
                <a
                  href={session.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline text-sm"
                >
                  Visit Link
                </a>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(session)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(session._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </Layout>
  );
}
