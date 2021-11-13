import './App.scss';
import Nav from './Components/Nav/Nav';
import Page from './Components/Page/Page';
import { ToastContainer } from 'react-toastify';
import './Firebase/Firebase';

function App() {
  console.log(process.env.REACT_APP_FIREBASE_PROJECT_ID)
  return (
    <div className="App">
      <Nav />
      <Page />
      <ToastContainer 
        theme="dark"
        autoClose={2000}
        hideProgressBar={true}
        />
    </div>
  );
}

export default App;
