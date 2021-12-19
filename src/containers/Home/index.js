import React, {useMemo, useEffect, useState } from 'react'
import Layout from '../../components/Layout';
import {Jumbotron, Row, Col, Container, Table} from 'react-bootstrap';
import {NavLink} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { BiBarChart, BiRupee } from "react-icons/bi";
import  './style.css';
import { IoIosAdd, IoIosApps, IoIosArrowDropup, IoIosArrowUp, IoIosBarcode, IoIosBasket, IoIosCash, IoIosNotifications, IoIosPie } from 'react-icons/io';
import { updateOrder } from '../../actions';
import { FaBuffer, FaCartPlus, FaChartBar, FaRupeeSign, FaThLarge } from "react-icons/fa";
import { Doughnut, Pie, Line, Bar } from "react-chartjs-2";
import { chartColors } from "./colors";
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import axios from 'axios';
import { generatePublicUrl } from '../../urlConfig';

/**
* @author
* @function Home
**/

const Home = (props) => {
  const [_id, setId] = useState("");
  const [searchTermHome, setSearchTermHome] = useState("");
  const [searchByHome, setSearchByHome] = useState("_id");
  const [chartData, setChartData] = useState({});
  const category = useSelector((state) => state.category);
  const product = useSelector(state => state.product);
  const order = useSelector(state=> state.order);
  const auth = useSelector(state => state.auth);
  const categoryLength = category.categories.length;
  const productLength = product.products.length;
  const orderLength = order.orders.length;

  let chartInstance = null;


 

 

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
            labels: ["january", "feb", "march", "april", "may", "june", "july", "august", "sept", "nov", "dec"] ,
            datasets: [
              {
                label: 'Monthly Income',
                data: ["16000", "40000", "25000", "46000", "15000", "25000", "35000", "14000", "30000", "15000", "60000"],
                backgroundColor: ["green"],
                borderWidth: 0,
             
             
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

  const lastItem =  useMemo(()=>{

    let length = product.products.length;
    if(length)  return product.products[length-1];
    return {}
   
   
  
   },[product.products]);

   const lastItemOrder =  useMemo(()=>{
  
    let Olength = order.orders.length;
    if(Olength)  return order.orders[Olength-1];
    return {}
   
  
   },[order.orders]);
   const lastItemOrderC =  useMemo(()=>{
  
    let clength = category.categories.length;
    if(clength)  return category.categories[clength-1];
    return {}
   
  
   },[category.categories]);
console.log(auth, ">>order");


const options = {
  legend: {
    display: false,
    position: "right",
  
    
  },
 

  elements: {
    arc: {
      borderWidth: 0
    }
  }
};

const pieOptions = {
  legend: {
    display: false,
    position: "right",
    color: "white",

  },
  
  elements: {
    arc: {
      borderWidth: 0,
      
      
    }
  }
};
 

const data = {
  maintainAspectRatio: false,
  responsive: true,
  labels: ["orders", "products", "category", "Income"],
 
  datasets: [
    {
      label: 'label of thickness',
      data: [orderLength, productLength, categoryLength, "4"],
      backgroundColor: chartColors,
      hoverBackgroundColor: chartColors
    }
  ]
};

const data1 = {

  maintainAspectRatio: false,
  responsive: true,
  labels: [],

  datasets: [
    {
      label: 'label of thickness',
      data: [orderLength, productLength, categoryLength, orderLength],
      backgroundColor: chartColors,
      hoverBackgroundColor: chartColors
    }
  ]
};


  return(
    <Layout sidebar>

     <Container >
       <Row className="gap">
         <Col lg={12}> 
         
           <div className="home-banner">
             <h2>Hello, {auth.user.fullName}</h2>
             <h5>I hope you are having a great day</h5>
           </div>
         </Col>
       </Row>
       <Row className="gap">
         <Col lg={3}>
         <div className="card-counter primary">
      
        <span className="count-numbers">  <FaThLarge  /></span>
        <span className="count-name">Total Categories</span>
        <span className="count-name1">0{categoryLength}</span>
        <span className="count-name2"><IoIosAdd />{categoryLength} LAST MONTH </span>
      </div>
         </Col>
         <Col lg={3}>
         <div className="card-counter primary">
      
        <span className="count-numbers">  <FaBuffer  /></span>
        <span className="count-name">Total Products</span>
        <span className="count-name1">{productLength}</span>
        <span className="count-name2"><IoIosAdd />{productLength} LAST MONTH </span>
      </div>
         </Col>
         <Col lg={3}>
         <div className="card-counter primary">
      
        <span className="count-numbers">  <FaCartPlus  /></span>
        <span className="count-name">Total Orders</span>
        <span className="count-name1">{orderLength}</span>
        <span className="count-name2"><IoIosAdd />{orderLength} LAST MONTH </span>
      </div>
         </Col>
         <Col lg={3}>
         <div className="card-counter primary">
      
        <span className="count-numbers">  <FaRupeeSign  /></span>
        <span className="count-name">Monthly Income</span>
        <span className="count-name1">12,000</span>
        <span className="count-name2"><IoIosArrowUp /> LAST MONTH </span>
      </div>
         </Col>
       </Row>
     </Container>


     <Container>
       <Row className="gap">
       <Col lg={5}>
          <div style={styles.relative} className="home-table">
        <Doughnut data={data} options={options}  />
       
        <div style={styles.pieContainer}>
       
        {/* <Pie
            data={data1}
            options={pieOptions}
            ref={input => {
              chartInstance = input;
            }}
          /> */}
        </div>
        <div id="legend" />
      </div>
          </Col>
        
         <Col lg={7}>
          <div className="home-table" style={{width: '98.5%', height: '450px' }}>
          <Bar
          
          style={{marginTop: '50px'}}
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
          </div>
         </Col>
       </Row>
     </Container>

     <Container>
       <Row className="gap"> 
         <Col lg={8}>
         <div className="home-table1" style={{height: '450px'}}>
       <Table style={{ fontSize: 12 }} responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>OrderId</th>
            <th>Payment Status</th>
            <th>Payment Type</th>
            <th>Total Amount</th>
            <th>Status</th>
           
          </tr>
        </thead>
        <tbody>
          {order.orders.length > 0
            ? order.orders.map((orderItem, index) => {
                   let CompletedItems = orderItem.orderStatus.filter((od, index)=> od.isCompleted);
                   let item = CompletedItems ?.length ? CompletedItems[CompletedItems.length-1]
                   : {} ;
           return (
                        <tr key={index} style={{lineHeight: "1.5" }}>
                        <td>{index+1}</td>
                        <td>{orderItem._id}</td>
                        <td>{orderItem.paymentStatus}</td>
                        <td>{orderItem.paymentType}</td>
                        <td>{orderItem.totalAmount}<BiRupee /></td>
                        <td  className={`horderStatus ${
                              item.isCompleted && item.type == "delivered" ? "active" : null
                            }`}> {item.type} </td>
                      </tr> 
                     
                    
           );
         
              
        
                          }
              
              )
            : null}
        </tbody>
      </Table>
      </div>
         </Col>
         <Col lg={4}>
         <div className="home-table">
         <div className="recentNewHeader">
           <h5 className="main-head">Recent Activity</h5>
           <IoIosBasket className="headIcon"/>
           </div>
           {
             [lastItem].map((item, index) => 
             <div>
             <div className="recent-card">
             <IoIosNotifications className="recent-icon" />
             <h5 className="recent-text">{item.name}</h5>
            
           </div>
           <hr />
            </div>
             )
           }

{
             [lastItemOrder].map((item, index) => 
             <div>
             <div className="recent-card">
             <IoIosNotifications className="recent-icon" />
             <h5 className="recent-text">{item._id}</h5>
             
           </div>
           <hr />
            </div>
             )
           }

{
             [lastItemOrderC].map((item, index) => 
             <div>
             <div className="recent-card">
             <IoIosNotifications className="recent-icon" />
             <h5 className="recent-text">{item.name}</h5>
             
           </div>
           
            </div>
             )
           }
        
          
           </div>
         </Col>
       </Row>
  
     </Container>
     {/* <Container>
     <Row>
         <Col lg={4}>
           <div className="recentNew">
            <div className="recentCard">
                 <div className="recentNewHeader">
                      <h5>Recently Added Product</h5>
                      <IoIosBasket  className="headIcon"/>
                 </div>
                 <div  style={{color: "black"}}>
                       {
                           [lastItem].map((prod, index) => (
                             <div key={prod._id} className="recentNewBody">
                             <IoIosAdd />
                             <h5>{prod.name}</h5>
                           

                             </div>
                             
                            ) )
                       }
                 </div>
               

            </div>
            </div>
         </Col>
       </Row>
     </Container> */}
    <br />
</Layout>
   )
   

 }
 
 const styles = {
  pieContainer: {
    width: "40%",
    height: "40%",
    top: "51%",
    left: "50%",
    position: "absolute",
    transform: "translate(-50%, -50%)",
    
  },
  relative: {
    position: "relative"
  }
};
export default Home