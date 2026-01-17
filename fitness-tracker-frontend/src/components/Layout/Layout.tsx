import React, { ReactNode } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">{children}</main>
      <footer className="footer">
        <p>&copy; 2026 Fitness Tracker. Built with ASP.NET Core & React.</p>
      </footer>
    </div>
  );
};

export default Layout;