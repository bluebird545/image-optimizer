import React from 'react';
import { createRoot } from 'react-dom/client';
import Uploader from '@components/Uploader'
import Alert from '@components/Alert';

import AlertProvider from './context/alert';

import '@assets/styles/main.scss'

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