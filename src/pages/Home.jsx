// import { Component } from "react"
// import { userService } from "../services/user.service"
// import { bitcoinService } from "../services/bitcoin.service"
import { MovesList } from "../components/Moves-list"
import avatar from "../assets/imgs/bitcoin-man.ipg"
// import avatar from "../assets/imgs/avatar4.jpg"
import { useNavigate, useParams } from "react-router-dom"



import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser, getUserMoves, getUserRate } from '../store/actions/userActions'



export const Home =()=> {
  
  
  const user = useSelector((state) => state.userModule.user)
  const userMoves = useSelector((state) => state.userModule.userMoves)
  const userRate = useSelector((state) => state.userModule.userRate)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(loadUser())
        //  if (!user) history.push("/signup")
    dispatch(getUserMoves())
    dispatch(getUserRate())
  }, [dispatch])


  // state = {
  //   user: null,
  //   btc: null,
  //   userMoves:null,
  // }
  // componentDidMount() {
  //   this.loadUser()
  // }
  // async loadUser() {
  //   try {
  //     const user = await userService.getUser()
  //     if (!user) return this.props.history.push("/signup")
  //     let threeMoves = JSON.parse(JSON.stringify(user.moves)).splice(-3)
  //     this.setState({ user, userMoves: threeMoves })
  //     this.btcFormat(user.coins)
  //   } catch (err) {
  //     console.log("err:", err)
  //   }
  // }
  // async btcFormat(coins) {
  //   let btc = await bitcoinService.getRate(coins)
  //   this.setState({ btc })
  // }
    if (!user) return <div>Loading</div>
    return (
      <section className='home-page-conteiner'>
        
        <div>
        <img className="home-bitcoin-logo" src={avatar} alt="" />
        </div>
        <div className="home-header">Hello Dear {user.name}!</div>
        <div className="home-user-balance">
        <div>Your Coins: {user.coins} 💰</div>
        <div>Your coins in BTC: {userRate}</div>
        </div>
        <MovesList contact={null} moves={userMoves} title={userMoves.length? `Your last ${userMoves.length} moves:`:'Your didnt make a move yet'} />
      </section>
    )
  
}








// export class Home extends Component {
//   state = {
//     user: null,
//     btc: null,
//     userMoves:null,
//   }
//   componentDidMount() {
//     this.loadUser()
//   }
//   async loadUser() {
//     try {
//       const user = await userService.getUser()
//       if (!user) return this.props.history.push("/signup")
//       let threeMoves = JSON.parse(JSON.stringify(user.moves)).splice(-3)
//       this.setState({ user, userMoves: threeMoves })
//       this.btcFormat(user.coins)
//     } catch (err) {
//       console.log("err:", err)
//     }
//   }
//   async btcFormat(coins) {
//     let btc = await bitcoinService.getRate(coins)
//     this.setState({ btc })
//   }
//   render() {
//     const { user, btc,userMoves } = this.state
//     if (!user) return <div>Loading</div>
//     return (
//       <section className='home-page-conteiner'>
        
//         <div>
//         <img className="home-bitcoin-logo" src={avatar} alt="" />
//         </div>
//         <div className="home-header">Hello Dear {user.name}!</div>
//         <div className="home-user-balance">
//         <div>Your Coins: {user.coins} 💰</div>
//         <div>Your coins in BTC: {btc}</div>
//         </div>
//         <MovesList contact={null} moves={userMoves} title={userMoves.length? `Your last ${userMoves.length} moves:`:'Your didnt make a move yet'} />
//       </section>
//     )
//   }
// }
