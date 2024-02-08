// src/components/Header.js
import React from 'react';

const Header = () => {
  return (
    <header>
      <div className="logo">
        <img src="caminho/para/seu/logo.png" alt="Logo do Sistema" />
      </div>
      <div className="header-links">
        <a href="#">Segurança de Dados</a>
        <a href="#">Criar Perfil Gratuito</a>
      </div>
    </header>
  );
}

export default Header;
