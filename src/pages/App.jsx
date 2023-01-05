export default function App() {
  return (
    <div className="app">
      <div className="header">
        <h1>Remembrant</h1>
      </div>
      <a className="new-project" href="/new-project">
        <button>New Project</button>
      </a>
      <h2 className="project-title">Projects</h2>
      <div className="project-list">
        <p>There's nothing to show here</p>
      </div>
    </div>
  );
}
