import { Line } from "react-chartjs-2"
import { useEffect, useState, React } from "react"
import Chart from "chart.js/auto" //Nedded for category scale

// import React from "react"
import { bitcoinService } from "../services/bitcoin.service"

export const MarketPrice = () => {
  const [updatedMarketPrice, setMarketPrice] = useState(null)
  const [timePeriod, setTimePeriod] = useState("10")

  useEffect(() => {
    loadMarketPrice()
  }, [timePeriod])

  const loadMarketPrice = async () => {
    try {
      let updatedMarketPrice = await bitcoinService.getMarketPrice(timePeriod)

      let xVals
      xVals = updatedMarketPrice.values.map((val) => new Date(val.x * 1000).toLocaleDateString())
      let newData = {
        labels: xVals,
        datasets: [
          {
            label: `BTC Market Price - ${timePeriod} Months`,
            data: updatedMarketPrice.values.filter((val) => val.y),
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)",
          },
        ],
      }
      setMarketPrice(newData)
    } catch (err) {
      console.log("err:", err)
    }
  }

  const onSetTimePeriod = (ev) => {
    const value = ev.target.value
    setTimePeriod(value)
  }

  if (!updatedMarketPrice) return <span>Loading</span>
  return (
    <div className='MarketPrice'>
      <select name='timePeriod' onChange={(ev) => onSetTimePeriod(ev)} id='timePeriod'>
        <option value='10'>10 Months</option>
        <option value='2'>2 Months</option>
        <option value='4'>4 Months</option>
        <option value='6'>6 Months</option>
        <option value='8'>8 Months</option>
        <option value='12'>12 Months</option>
      </select>
      <Line data={updatedMarketPrice} />
    </div>
  )
}

