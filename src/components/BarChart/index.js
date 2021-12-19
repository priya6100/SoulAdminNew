import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Line, Pie} from 'react-chartjs-2';
import { useSelector } from 'react-redux';
/**
* @author
* @function BarChart
**/

const BarChart = (props) => {
    const [chartData, setChartData] = useState({});
    const product = useSelector(state => state.product);
    const order = useSelector(state => state.order);
    console.log(order.orders._id, ">>chart");
  
    const chart = () =>{
        let odId = [];
        let odName = [];
        axios.post(`http://localhost:7000/api/initialdata`)
        .then(res =>{
            console.log(res, ">>res");
            for(const dataObj of res.data.orders){
              
                odId.push(dataObj._id);
                odName.push(parseInt(dataObj._id))
            }
            setChartData({
                labels: odId ,
                datasets: [
                  {
                    label: 'label of thickness',
                    data: odName,
                    backgroundColor: ["rgba(75, 192, 192, 1)"],
                    borderWidth: 4
                  }
                ]
              });
        }).catch(err =>{
            
            console.log(err, ">>err");
        })
    
      
    }

    useEffect(() => {
        chart()
    }, [])
  return(

    <div style={{height: "500px", width:"500px"}}>
     
     <Line
          data={chartData}
          options={{
            responsive: true,
            title: { text: "THICCNESS SCALE", display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true
                  },
                  gridLines: {
                    display: false
                  }
                }
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false
                  }
                }
              ]
            }
          }}
        />

<Pie 
        data={chartData}
        width={3}
        height={3}
        options={{
          legend:{display:false},
          title: {display: true,text: 'Açılan Sandık'},
        }}/>
       
    </div>
   )

 }

export default BarChart