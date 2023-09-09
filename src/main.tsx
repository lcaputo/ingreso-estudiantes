import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'flowbite';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <>
    <Toaster />
    <App />
  </>
  // </React.StrictMode>
)
