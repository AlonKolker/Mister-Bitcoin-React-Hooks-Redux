import React from "react"
import { Line } from "react-chartjs-2"
import { bitcoinService } from "../services/bitcoin.service"
import { useEffect, useState } from "react"
import Chart from "chart.js/auto" //Nedded for category scale


export const ConfirmedTransactions = ()=> {

  const [dailyTransitons, setDailyTransitons] = useState(null)
  const [timePeriod, setTimePeriod] = useState("10")

  useEffect(() => {
    loaddDailyTransitons()
  }, [timePeriod])


  const loaddDailyTransitons = async ()=> {

    try {
      let updatedDailyTransitons = await bitcoinService.getConfirmedTransactions(timePeriod)
      let xVals
      xVals = updatedDailyTransitons.values.map((val) => new Date(val.x * 1000).toLocaleDateString())
      let newData = {
        labels: xVals,
        datasets: [
          {
            label: `BTC Transitions Volume -  ${timePeriod} Months`,
            data: updatedDailyTransitons.values.filter((val) => val.y),
            fill: true,
            backgroundColor: "#72585f8f",
            borderColor: "#a0465c",
          },
        ],
      }
      setDailyTransitons(newData)
    } catch (err) {
      console.log("err:", err)
    }
  }

  const onSetTimePeriod = (ev) => {
    const value = ev.target.value
    setTimePeriod(value)
  }

    if (!dailyTransitons) return <span>Loading</span>
    return (
      <div className="confirmed-transitons">
        <select name='timePeriod'  value={timePeriod} onChange={(ev) => onSetTimePeriod(ev)} id='timePeriod'>
          <option value='10'>10 Months</option>
          <option value='2'>2 Months</option>
          <option value='4'>4 Months</option>
          <option value='6'>6 Months</option>
          <option value='8'>8 Months</option>
          <option value='12'>12 Months</option>
        </select>
        <Line data={dailyTransitons} />
      </div>
    )
  }



// export class ConfirmedTransactions extends Component {
//   state = {
//     dailyTransitons: null,
//     timePeriod: "10",
//   }

//   componentDidMount() {
//     this.loaddDailyTransitons()
//   }

//   handleChange = (e) => {
//     console.log(e.target.value)
//     this.setState({ timePeriod: e.target.value })
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.timePeriod !== this.state.timePeriod) {
//       this.loaddDailyTransitons()
//     }
//   }

//   async loaddDailyTransitons() {
//     try {
//       let updatedDailyTransitons = await bitcoinService.getConfirmedTransactions(this.state.timePeriod)
//       let xVals
//       xVals = updatedDailyTransitons.values.map((val) => new Date(val.x * 1000).toLocaleDateString())
//       //   console.log(updatedMarketPrice.values.filter(val=>val.y));
//       let newData = {
//         labels: xVals,
//         datasets: [
//           {
//             label: `BTC Transitions Volume -  ${this.state.timePeriod} Months`,
//             data: updatedDailyTransitons.values.filter((val) => val.y),
//             fill: true,
//             backgroundColor: "#72585f8f",
//             borderColor: "#a0465c",
//           },
//         ],
//       }
//       // console.log(newData);
//       this.setState({ dailyTransitons: newData })
//     } catch (err) {
//       console.log("err:", err)
//     }
//   }

//   render() {
//     const { dailyTransitons, timePeriod } = this.state
//     if (!dailyTransitons) return <span>Loading</span>
//     return (
//       <div className="confirmed-transitons">
//         <select name='timePeriod'  value={timePeriod} onChange={this.handleChange}>
//           <option value='10'>10 Months</option>
//           <option value='2'>2 Months</option>
//           <option value='4'>4 Months</option>
//           <option value='6'>6 Months</option>
//           <option value='8'>8 Months</option>
//           <option value='12'>12 Months</option>
//         </select>
//         <Line data={dailyTransitons} />
//       </div>
//     )
//   }
// }
