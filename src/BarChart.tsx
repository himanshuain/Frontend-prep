import { useState } from "react";

type dep = {
    id: string,
    name: string,
    ticketCount: number,
    colour: string
}

const CHART_DATA: dep[] = [
    { id: "dep-1", name: "Legal", ticketCount: 132, colour: "#3F888F" },
    { id: "dep-2", name: "Sales", ticketCount: 200, colour: "#FFA420" },
    { id: "dep-3", name: "Engineering", ticketCount: 60, colour: "#287233" },
    { id: "dep-4", name: "Manufacturing", ticketCount: 125, colour: "#4E5452" },
    { id: "dep-5", name: "Maintenance", ticketCount: 114, colour: "#642424" },
    {
      id: "dep-6",
      name: "Human Resourcing",
      ticketCount: 35,
      colour: "#1D1E33"
    },
  ];




const BarChart = () => {
    const [showChart, setSetShowChart] = useState<boolean>(false);
    const maxTicketCount = Math.max(...CHART_DATA.map(dep => dep.ticketCount));

    return (
        <div className="chart-container">
        <button className="toggle-chart" onClick={()=> setSetShowChart(!showChart)}>Toggle Chart</button>
         <div className={ `chart ${showChart ? "show" : ""}`} style={{ height: `${maxTicketCount}px`}}>
            {CHART_DATA.map(dep => {
                return (
                           <div 
                           className={ `department ${showChart ? "show" : ""}`} 
                           style={{ background : `${dep.colour}`, height: `${(dep.ticketCount / maxTicketCount) * 100}%`}}
                           department-tooltip={`${dep.name} - ${dep.ticketCount}`}
                           >
                           </div>
                )
                })}
        </div>
        
        </div>
       
    )
}

export default BarChart;