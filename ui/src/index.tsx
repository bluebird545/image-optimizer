import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import Header from '@components/Header'
import Uploader from '@components/Uploader'
import Alert from '@components/Alert';

import AlertProvider from './context/alert';

import '@assets/scss/main.scss'

const App: React.FC = () => (
  <AlertProvider>
    <main className='w-full h-screen relative bg-gradient-to-b from-orange-50 to-blue-50'>
      <Uploader />
      <Alert />
    </main>
  </AlertProvider>
)

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// render App in DOM
root.render(<App />);