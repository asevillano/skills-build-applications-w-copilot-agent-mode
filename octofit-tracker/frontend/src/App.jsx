import octofitLogo from './assets/octofitapp-small.png'
import './App.css'

function App() {
  return (
    <main className="container py-5 text-center">
      <img
        className="octofit-logo mb-4 rounded"
        src={octofitLogo}
        alt="OctoFit Tracker"
      />
      <h1 className="display-4 fw-bold">OctoFit Tracker</h1>
      <p className="lead text-body-secondary">
        Track activities, build teams, and achieve your fitness goals.
      </p>
    </main>
  )
}

export default App
