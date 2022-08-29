import React, { Component } from "react"
import { MarketPrice } from "../components/Market-price"
import { ConfirmedTransactions } from "../components/Confirmed-transactions"


export const Statistic = ()=> {

    return (
      <div>
        <MarketPrice />
        <ConfirmedTransactions/>
      </div>
    )

}
