import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ErrorPage } from './pages/ErrorPage';
import { HomePage } from './pages/HomePage';
import { Navbar } from './components';
import { DogDetailsPage } from './pages';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<ErrorPage />}></Route>
          <Route
            path="/"
            element={
              <>
                <Navbar></Navbar>
                <main className="container">
                  <HomePage />
                </main>
              </>
            }
          ></Route>
          <Route
            path=":dogId"
            element={
              <main className="container">
                <DogDetailsPage />
              </main>
            }
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
