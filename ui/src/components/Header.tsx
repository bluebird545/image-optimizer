import React from 'react';

const Header: React.FC = () => {
  return (
    <header className='w-full max-w-screen-lg mb-8'>
      {/* <nav>
        <div>
          
        </div>
      </nav> */}
      <div className='text-center py-4'>
        <a href='/' className='text-2xl text-teal-500'>A simple experiemental image optimizer</a>
        <p className='text-sm'>This image optimizer uses the sharp npm package</p>
      </div>
    </header>
  );
}
export default Header