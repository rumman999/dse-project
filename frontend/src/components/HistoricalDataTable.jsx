import React from 'react'
import { format } from 'date-fns'

const HistoricalDataTable = ({historicalData}) => {
  return (
    <div className="px-32 mt-4 overflow-x-auto">
  <table className="table table-xs">
    <thead>
      <tr>
        <th></th>
        <th>Trade Date</th>
        <th>Symbol</th>
        <th>Open</th>
        <th>High</th>
        <th>Low</th>
        <th>Close</th>
        <th>Volume</th>
      </tr>
    </thead>
    <tbody>
      
      {
        historicalData.map((data) => {
        return (
        <tr key={data.id}>
        <th>{data.id}</th>
        <td>{format(new Date(data.trade_date), 'd MMM, yyyy')}</td>
        <td>{data.symbol}</td>
        <td>{data.open}</td>
        <td>{data.high}</td>
        <td>{data.low}</td>
        <td>{data.close}</td>
        <td>{data.volume}</td>
      </tr>
        )
      })
      }
      
    </tbody>
  </table>
</div>
  )
}

export default HistoricalDataTable