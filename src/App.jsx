// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

// import { useState } from "react";
// import Dashboard from "./components/Dashboard";
// import SalesAgent from "./pages/SalesAgent";

// // Simple routing without react-router for now
// function App() {
//   const [currentPage, setCurrentPage] = useState("dashboard");

  // You can replace this with React Router later
//   const renderPage = () => {
//     switch (currentPage) {
//       case "sales":
//         return <SalesAgent />;
//       case "dashboard":
//       default:
//         return <Dashboard onNavigate={setCurrentPage} />;
//     }
//   };

//   return renderPage();
// }

// export default App;

// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Dashboard from './components/Dashboard';
// import SalesAgent from './pages/SalesAgent';

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Dashboard />} />
//         <Route path="/sales" element={<SalesAgent />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// App.jsx
import { useState } from "react";
import Layout from "./components/Layout";
import DashboardContent from "./components/DashboardContent";
import SalesAgentContent from "./pages/SalesAgentContent";

function App() {
  const [activePage, setActivePage] = useState("analytics");

  const renderContent = () => {
    switch (activePage) {
      case "sales":
        return <SalesAgentContent />;
      case "analytics":
      default:
        return <DashboardContent />;
    }
  };

  return (
    <Layout activePage={activePage} setActivePage={setActivePage}>
      {renderContent()}
    </Layout>
  );
}

export default App;