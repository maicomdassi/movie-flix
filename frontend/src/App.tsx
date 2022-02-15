import Routes from 'Routes';
import './assets/styles/custom.scss';
import './App.css';
import { AuthContext, AuthContextData } from 'AuthContext';
import { useState } from 'react';

function App() {
  const [authContextData, setAuthContextData] = useState<AuthContextData>({
    authenticated: false,
  });

  return (
    <AuthContext.Provider value={{authContextData, setAuthContextData}}>
      <Routes />
    </AuthContext.Provider>
  );
}

export default App;