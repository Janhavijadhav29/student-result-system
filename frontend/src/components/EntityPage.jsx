import { useEffect, useState } from 'react';
import { getAll, search, create, update, remove } from '../api.js';

const emptyForm = (fields) =>
  fields.reduce((acc, f) => ({ ...acc, [f.name]: '' }), {});

export default function EntityPage({ entity }) {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm(entity.fields));
  const [editingId, setEditingId] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      setItems(await getAll(entity.path));
      setError('');
    } catch {
      setError('Could not reach the backend. Is Spring Boot running on port 8080?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form };
    entity.fields.forEach((f) => {
      if (f.type === 'number' && payload[f.name] !== '') payload[f.name] = Number(payload[f.name]);
      if (payload[f.name] === '') payload[f.name] = null;
    });
    try {
      if (editingId) {
        await update(entity.path, editingId, payload);
      } else {
        await create(entity.path, payload);
      }
      resetForm();
      load();
    } catch (err) {
      const data = err.response?.data;
      setError(data?.errors ? Object.values(data.errors).join(', ') : data?.message || 'Save failed');
    }
  };

  const handleEdit = (item) => {
    const values = {};
    entity.fields.forEach((f) => (values[f.name] = item[f.name] ?? ''));
    setForm(values);
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Delete this ${entity.singular.toLowerCase()}?`)) return;
    await remove(entity.path, id);
    load();
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!keyword.trim()) return load();
    setItems(await search(entity.path, keyword.trim()));
  };

  const resetForm = () => {
    setForm(emptyForm(entity.fields));
    setEditingId(null);
    setError('');
  };

  return (
    <div className="page">
      <section className="card">
        <h2>{editingId ? `Edit ${entity.singular}` : `Add ${entity.singular}`}</h2>
        <form className="form" onSubmit={handleSubmit}>
          {entity.fields.map((f) => (
            <label key={f.name}>
              {f.label}
              <input
                name={f.name}
                type={f.type}
                step={f.type === 'number' ? 'any' : undefined}
                value={form[f.name]}
                onChange={handleChange}
                required={f.required}
              />
            </label>
          ))}
          <div className="actions">
            <button type="submit" className="btn primary">
              {editingId ? 'Update' : 'Save'}
            </button>
            {editingId && (
              <button type="button" className="btn" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>
        {error && <p className="error">{error}</p>}
      </section>

      <section className="card">
        <div className="list-header">
          <h2>{entity.label}</h2>
          <form onSubmit={handleSearch} className="search">
            <input
              placeholder={`Search by ${entity.searchLabel}`}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button className="btn" type="submit">Search</button>
            <button className="btn" type="button" onClick={() => { setKeyword(''); load(); }}>
              Reset
            </button>
          </form>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : items.length === 0 ? (
          <p className="muted">No records found.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  {entity.fields.map((f) => <th key={f.name}>{f.label}</th>)}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    {entity.fields.map((f) => <td key={f.name}>{item[f.name] ?? '-'}</td>)}
                    <td className="row-actions">
                      <button className="btn small" onClick={() => handleEdit(item)}>Edit</button>
                      <button className="btn small danger" onClick={() => handleDelete(item.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
