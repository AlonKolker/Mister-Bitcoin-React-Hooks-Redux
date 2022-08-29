import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom"
import { MainHeader } from "./components/Main-header"
import "./assets/scss/global.scss"


import { Home } from "./pages/Home"
import { Signup } from "./pages/Signup"
import { Contact } from "./pages/Contact"
import { Statistic } from "./pages/Statistic"
import { ContactDeatails } from "./pages/Contact-details"
import { ContactEdit } from "./pages/Contact-Edit"
import { userService } from "../src/services/user.service"



const PrivateRoute = (props) => {
  const user = userService.getUser()
    return user ? <Route  {...props}/> : <Redirect to='/signup' />
}

function App() {
  return (
    <main>
         <Router>
          <MainHeader />
        <div className='main-conteiner'>

          <Switch>
            <Route path='/contact/edit/:id?' component={ContactEdit} />
            <Route path='/contact/:id' component={ContactDeatails} />
            <PrivateRoute path='/contact' component={Contact} />
            <PrivateRoute path='/statistic' component={Statistic} />
            <Route  path='/signup' component={Signup} />
            {/* <Route path='/' component={Home} /> */}
            <PrivateRoute path='/' component={Home} />
          </Switch>
        </div>
      </Router>
    </main>
  )
}
export default App
