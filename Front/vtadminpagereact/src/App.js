
import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import './App.css';
import ErroPage from './Pages/Erro';
import BlogPage from './Pages/Blog';
import AddNotiPage from './Pages/AddNoticia';
import NewsPage from './Pages/Noticia';
import Home from './NPages/Home.jsx';


import "../src/bootstrap/css/normalize.css";
import "../src/bootstrap/css/style.css";
import "../src/bootstrap/css/vendor.css";
import "../src/CSS/Proprio.css";
import '../src/CSS/swiper-bundle.min.css';

//CSS
import "../src/bootstrap/assets/vendor/animate.css/animate.min.css"
import "../src/bootstrap/assets/vendor/aos/aos.css"
import "../src/bootstrap/assets/vendor/bootstrap/css/bootstrap.min.css"
import "../src/bootstrap/assets/vendor/bootstrap-icons/bootstrap-icons.css"
import "../src/bootstrap/assets/vendor/boxicons/css/boxicons.min.css"
import "../src/bootstrap/assets/vendor/glightbox/css/glightbox.min.css"
import "../src/bootstrap/assets/vendor/swiper/swiper-bundle.min.css"
import "../src/bootstrap/assets/css/style.css"


import "../src/CSS/Proprio.css"
import Login from "../src/NPages/Formulario.tsx"
import FormPage from './NPages/Formulario.tsx';
import ProfileMain from './NPages/Profile.tsx';
import ListaMainPage from './NPages/Lista.tsx';
import ProduPage from './NPages/Prod.tsx';
import ProdPage from './NPages/SingleProd.jsx';
import ComprarPage from './NPages/Comprar.jsx';

function App() {
  return (
    //rotas de todas as paginas
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='' element={<Home/>}/>
        <Route path='/Login' element={<FormPage tipo={1}/>}/>
        <Route path='/Cadastro' element={<FormPage tipo={2}/>}/>
        <Route path='/Adicionar' element={<FormPage tipo={3}/>}/>
        <Route path='/Comprar' element={<ComprarPage/>}/>
        <Route path='/Comprar/Estoque/:id' element={<ComprarPage/>}/>
        <Route path='/Produtos' element={<ProduPage/>}/>
        <Route path='/Produto' element={<ProdPage/>}/>
        <Route path='/Editar' element={<FormPage tipo={4}/>}/>
        <Route path='/Profile' element={<ProfileMain/>}/>
        <Route path='/Lista' element = {<ListaMainPage/>}/>
        <Route path="/Blog" element={<BlogPage/>}/>
        <Route path="/Contas" element={<BlogPage/>}/>
        <Route path="/AddNoticia" element={<AddNotiPage/>}/>
        <Route path='/News' element={<NewsPage/>}/>
        <Route path='/*' element={<ErroPage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
