import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Dashboard } from './pages/Dashboard.tsx'
import { SuccessConfirmation } from './pages/SuccessConfirmation.tsx'
import { Profile } from './pages/Profile.tsx'
import { Notifications } from './pages/Notifications.tsx'
import { Support } from './pages/Support.tsx'

function Router() {
  const path = window.location.pathname;

  switch (path) {
    case '/dashboard':
      return <Dashboard />;
    case '/success':
      return <SuccessConfirmation />;
    case '/profile':
      return <Profile />;
    case '/notifications':
      return <Notifications />;
    case '/support':
      return <Support />;
    default:
      return <App />;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)