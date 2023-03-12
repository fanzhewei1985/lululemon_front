import './App.css';
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from './components/Footer';
import {Route, Routes} from "react-router-dom";
import Product from "./components/Product";
import MyBag from "./components/MyBag";
import CheckOut from "./components/CheckOut";
import {Payment} from './components/Payment'
import Success from "./components/Success";
import SignIn from "./components/SignIn";
import PaymentPage from "./components/PaymentPage";
function App() {

  return (
    <div className="App">
      <Header/>
        <Routes>
            <Route path='/' element={<Home/>}/>
      {/*<Home/>*/}
            <Route path='/:name/:productId/:colorId' element={<Product/>}/>
            {/*<Route path='/:name/:productId' element={<Product/>}/>*/}
            <Route path='*' element={<p>not found</p>}/>
            <Route path='/myBag' element={<MyBag/>}/>
            <Route path='/checkOut' element={<CheckOut/>}/>
            <Route path='/payment' element={<PaymentPage/>}/>
            <Route path='/success' element={<Success/>}/>
            <Route path='/logIn' element={<SignIn/>}/>
        </Routes>
      <Footer/>
    </div>
  );
}

export default App;
