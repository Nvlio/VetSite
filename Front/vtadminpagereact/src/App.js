
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
import FormPage from './NPages/Formulario.tsx';
import ProfileMain from './NPages/Profile.tsx';
import ProduPage from './Paginas/Store/Prod.tsx';
import ProdPage from './Paginas/Store/Inside/ProdutoPage.tsx';
import ComprarPage from './NPages/Comprar.jsx';
import ContasPage from './Pages/pages/Contas.tsx';
import PagarConta from './NPages/PagarContas.jsx';
import AddContaPage from './NPages/AdicionarConta.jsx';
import { CheckAuteticacao } from './nFuncoes/auntenticar.js';
import ListaMain from './Paginas/Listas/MainStructure.tsx';
import CompraPage from './Paginas/Store/Finalizacao/Compra.tsx';
import PageBlog from './Paginas/Blog/BlogListapage.tsx';
import NoticiaPage from './Paginas/Blog/Inside/Noticia.tsx';

function App() {
  const auth = CheckAuteticacao()
  return (
    //rotas de todas as paginas
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='' element={<Home/>}/>
        <Route path='/Login' element={<FormPage tipo={1}/>}/>
        <Route path='/Cadastro' element={<FormPage tipo={2}/>}/>
        <Route path='/Lista' element = {<ListaMain/>}/>
        {/* testar função de cadastro para ver se salva tudo de maneira correta*/}


        <Route path='/Produtos' element={<ProduPage/>}/> /*Arrumar a posição das imagens pós filtragem */
        <Route path='/Produto/:id' element={<ProdPage/>}/>
        <Route path='/Comprar' element={<CompraPage/>}/> /*Adicionar janela de confirmação*/
        
        <Route path="/Blog" element={<PageBlog/>}/>{/* Adicionar backend de filtragem que pega apenas as 5 noticias mais curtidas */}
        <Route path='/Blog/News/:id' element={<NoticiaPage/>}/>
        <Route path="/AddNoticia" element={<AddNotiPage/>}/>

        {/* excluido */}
        <Route path='/Profile' element={<ProfileMain/>}/>
        <Route path='/Editar' element={<FormPage tipo={4}/>}/>

        <Route path='/Adicionar/:item' element={<FormPage tipo={3}/>}/>
        
        <Route path='/Comprar/Estoque/:id' element={<ComprarPage/>}/>

        <Route path="/Contas" element={auth?<ContasPage/>:<FormPage tipo={1}/>}/>
        <Route path="/Contas/:id" element={auth?<PagarConta/>:<FormPage tipo={1}/>}/>
        <Route path="/Contas/Adicionar" element={auth?<AddContaPage/>:<FormPage tipo={1}/>}/>
        <Route path='/*' element={<ErroPage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
