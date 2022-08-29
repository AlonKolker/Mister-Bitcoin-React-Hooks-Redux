// import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom"
import { HashRouter as Router, Navigate, Route, Routes } from "react-router-dom"

import { MainHeader } from "./components/Main-header"
import "./assets/scss/global.scss"

import { Home } from "./pages/Home"
import { Signup } from "./pages/Signup"
import { Contact } from "./pages/Contact"
import { Statistic } from "./pages/Statistic"
import { ContactDeatails } from "./pages/Contact-details"
import { ContactEdit } from "./pages/Contact-Edit"
import { userService } from "../src/services/user.service"


function App() {
  const PrivateRoute = ({ children }) => {
    const user = userService.getUser()
    return user ? children : <Navigate to='/signup' />
  }
  return (
    <main>
      <Router>
        <MainHeader />
        <div className='main-conteiner'>
          <Routes>
          <Route
              path='/'
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
                    <Route
              path='/signup'
              element={
                <PrivateRoute>
                  <Signup />
                </PrivateRoute>
              }
            />
                        <Route
              path='/contact'
              element={
                <PrivateRoute>
                  <Contact />
                </PrivateRoute>
              }
            />
             <Route
              path='/statistic'
              element={
                <PrivateRoute>
                  <Statistic />
                </PrivateRoute>
              }
            />
            <Route path='/contact/edit/:id' element={<ContactEdit />} />
            <Route path='/contact/edit' element={<ContactEdit />} />
            <Route path='/contact/:id' element={<ContactDeatails />} />

           
    
            {/* <Route path='/' component={Home} /> */}
  
          </Routes>
        </div>
      </Router>
    </main>
  )
}
export default App
