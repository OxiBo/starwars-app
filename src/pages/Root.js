import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import MainNavigation from '../components/MainNavigation';

export default function Root() {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
