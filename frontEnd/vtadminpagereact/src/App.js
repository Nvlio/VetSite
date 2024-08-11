
import React from 'react';
import Main from './Pages/MainPage';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import './App.css';
import Formulario from './Pages/FormPage';
import Lista from './Pages/ListPage';
import ErroPage from './Pages/Erro';
import FormAdicionar from './Pages/AddFormPage';
import BlogPage from './Pages/Blog';
import AddNotiPage from './Pages/AddNoticia';
import NewsPage from './Pages/Noticia';
import { AnimalForm } from './Componentes/Form';
import ProfilePage from './Pages/Profile';
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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='' element={<Home/>}/>
        <Route path='/Login' element={<FormPage tipo={1}/>}/>
        <Route path='/Cadastro' element={<FormPage tipo={2}/>}/>
        <Route path='/Adicionar' element={<FormPage tipo={3}/>}/>
        <Route path='/Editar' element={<FormPage tipo={4}/>}/>
        <Route path='/Profile' element={<ProfileMain/>}/>
        <Route path='/Lista' element = {<ListaMainPage/>}/>
        <Route path='/List' element={<Lista/>}/>
        <Route path='/AddForm' element={<FormAdicionar/>} />
        <Route path="/Blog" element={<BlogPage/>}/>
        <Route path="/AddNoticia" element={<AddNotiPage/>}/>
        <Route path="/Animal" element={<AnimalForm/>}/>
        <Route path='/News' element={<NewsPage/>}/>
        <Route path='/*' element={<ErroPage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
