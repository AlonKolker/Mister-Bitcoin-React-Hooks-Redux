import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { loadUser, getUserMoves, getUserRate } from "../store/actions/userActions"

import { MovesList } from "../components/Moves-list"
import avatar from "../assets/imgs/bitcoin-man.ipg"

export const Home = () => {
  const user = useSelector((state) => state.userModule.user)
  const userMoves = useSelector((state) => state.userModule.userMoves)
  const userRate = useSelector((state) => state.userModule.userRate)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(loadUser())
    dispatch(getUserMoves())
    dispatch(getUserRate())
  }, [dispatch])

  if (!user) return <div>Loading</div>
  return (
    <section className='home-page-conteiner'>
      <div>
        <img className='home-bitcoin-logo' src={avatar} alt='' />
      </div>
      <div className='home-header'>Hello Dear {user.name}!</div>
      <div className='home-user-balance'>
        <div>Your Coins: {user.coins} 💰</div>
        <div>Your coins in BTC: {userRate}</div>
      </div>
      <MovesList
        contact={null}
        moves={userMoves}
        title={userMoves.length ? `Your last ${userMoves.length} moves:` : "Your didnt make a move yet"}
      />
    </section>
  )
}
