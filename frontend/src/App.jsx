import { useState } from 'react';
import { APP_TITLE, ENTITIES } from './config.js';
import EntityPage from './components/EntityPage.jsx';

export default function App() {
  const [active, setActive] = useState(ENTITIES[0].key);
  const entity = ENTITIES.find((e) => e.key === active);

  return (
    <div className="app">
      <header className="navbar">
        <h1>{APP_TITLE}</h1>
        <nav>
          {ENTITIES.map((e) => (
            <button
              key={e.key}
              className={e.key === active ? 'tab active' : 'tab'}
              onClick={() => setActive(e.key)}
            >
              {e.label}
            </button>
          ))}
        </nav>
      </header>
      <main>
        <EntityPage key={entity.key} entity={entity} />
      </main>
    </div>
  );
}
