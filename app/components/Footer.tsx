import React from 'react';

function Footer() {
  const getYear = new Date().getFullYear();

  return (
    <footer className="text-center pb-2">
      <p>Copyright &copy;{getYear} | Henrik Denerin - All rights reserved</p>
    </footer>
  );
}

export default Footer;
