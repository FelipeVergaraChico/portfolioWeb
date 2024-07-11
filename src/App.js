import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import trybeWarts from './images/download.png'
import recipeApp from './images/image.png'
import onlineStore from './images/onlineStore.png'
import trybeSmith from './images/trybeSmith.png'
import blogAPI from './images/blogAPI.png'
import trybeTune from './images/trybeTunes.png';
import trybeFc from './images/trybeFC.png';

function App() {
  return (
    <div className="App">
      <Header />
      <Intro />
      <Competencias />
      <Projetos />
      <Footer />
    </div>
  );
}

const Header = () => (
  <header>
    <nav>
      <h1>Felipe Vergara</h1>
      <ul>
        <li><a href="#competencias">Competências</a></li>
        <li><a href="#projetos">Projetos</a></li>
        <li><a href="#contato">Contato</a></li>
      </ul>
    </nav>
  </header>
);

const Intro = () => (
  <section id="intro">
    <h2>Olá, eu sou Felipe Vergara</h2>
    <p>Programador Full Stack com experiência em criar aplicações web modernas e eficientes.</p>
  </section>
);

const Competencias = () => (
  <section id="competencias">
    <h2>Competências</h2>
    <ul>
      <li><i className="devicon-html5-plain"></i> HTML</li>
      <li><i className="devicon-css3-plain"></i> CSS</li>
      <li><i className="devicon-javascript-plain"></i> JavaScript</li>
      <li><i className="devicon-react-original"></i> React</li>
      <li><i className="devicon-typescript-plain"></i> TypeScript</li>
      <li><i className="devicon-nodejs-plain"></i> Node.js</li>
      <li><i className="devicon-express-original"></i> Express</li>
      <li><i className="devicon-mysql-plain"></i> SQL</li>
      <li><i className="devicon-git-plain"></i> Git/GitHub</li>
      <li><i className="devicon-java-plain"></i> Java</li>
    </ul>
  </section>
);

const Projetos = () => {
  const projetos = [
    { id: 1, nome: 'Recipes App', descricao: 'Um app mobile que permite ver,buscar, filtrar, favoritar e acompanhar o progresso de preparação de receitas de comidas e bebidas. Use o email "example@gmail.com" e a senha "12345678" ', link: 'https://recipes-app-psi-sandy.vercel.app', imagem: recipeApp },
    { id: 2, nome: 'Online Store', descricao: 'Uma loja online com sistema de carrinho, comentarios, busca e categorias', link: 'https://online-store-wine.vercel.app', imagem: onlineStore },
    { id: 3, nome: 'TrybeTunes', descricao: 'Site de musica com sistema de busca, favoritos e perfil ', link: 'https://trybe-tunes-nu.vercel.app', imagem: trybeTune },
    { id: 4, nome: 'TrybeSmith', descricao: 'Uma loja de itens medievais, no formato de uma API, utilizando Typescript e Sequelize. ', link: 'https://github.com/FelipeVergaraChico/trybeSmith', imagem: trybeSmith },
    { id: 5, nome: 'BlogAPI', descricao: ' Uma API e um banco de dados para a produção de conteúdo para um blog', link: 'https://github.com/FelipeVergaraChico/blogAPI', imagem: blogAPI },
    { id: 6, nome: 'TrybeWarts', descricao: 'Uma página de formulário da Escola de Magia de Trybewarts, em que as pessoas estudantes poderão enviar seus feedbacks sobre ela.', link: 'https://trybe-warts-six.vercel.app', imagem: trybeWarts },
    { id: 7, nome: 'TrybeFC', descricao: 'O TFC é um site informativo sobre partidas e classificações de futebol, construido utilizando um back-end dockerizado utilizando modelagem de dados através do Sequelize', link: 'https://github.com/FelipeVergaraChico/trybeFC', imagem: trybeFc },
  ];

  return (
    <section id="projetos">
      <h2>Projetos</h2>
      <div className="projetos-grid">
        {projetos.map((projeto) => (
          <ProjetoCard key={projeto.id} {...projeto} />
        ))}
      </div>
    </section>
  );
};

const ProjetoCard = ({ nome, descricao, link, imagem }) => (
  <div className="projeto-card" onClick={() => window.open(link, '_blank')}>
    <img src={imagem} alt={`Imagem do projeto ${nome}`} className="projeto-imagem" />
    <h3>{nome}</h3>
    <p>{descricao}</p>
  </div>
);

const Footer = () => (
  <footer id="contato">
    <p>© 2024 Felipe Vergara</p>
    <p>Entre em contato:</p>
    <p>
      <a href="https://www.linkedin.com/in/felipe-vergara-chico-58972226a/" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
      </a> |
      <a href="https://github.com/FelipeVergaraChico" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faGithub} /> GitHub
      </a> |
      <FontAwesomeIcon icon={faEnvelope} /> <a href="mailto:felipe.vergara.chico@gmail.com">felipe.vergara.chico@gmail.com</a> |
      <FontAwesomeIcon icon={faPhone} /> +55 (51) 98583-0985 
    </p>
  </footer>
);

export default App;
