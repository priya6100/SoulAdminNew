import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateOrder } from "../../actions";
import Layout from "../../components/Layout";
import Card from "../../components/UI Component/Card";
import Input from "../../components/UI Component/inputs";
import "./style.css";

/**
 * @author
 * @function Orders
 **/

const Orders = (props) => {
  const order = useSelector((state) => state.order);
  const [type, setType] = useState("");
  const [_id, setId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("_id");
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const onOrderUpdate = (orderId) => {
    const payload = {
      orderId,
      type,
    };
    dispatch(updateOrder(payload));
  };

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    }
    return "";
  };

  return (
    <Layout sidebar>
      <Container>
      <Row>
         <Col lg={12}> 
         
           <div className="home-banner" style={{marginLeft: '0px', marginRight: '20px' , display: 'flex', justifyContent:"space-between", alignItems: 'center'}}>
           <div>
           <h2>Hello, {auth.user.fullName}</h2>
             <h5>Welcome To order section</h5>
           </div>
           
             <div className="flexRow1" style={{marginLeft: "5px"}}>
            
         <select className="select-container" defaultValue={searchBy} onChange={(e) => setSearchBy(e.target.value)}>
       
           <option value={`_id`}>ProductId</option>
           {/* <option value={`skuCode`}>sku code</option> */}
         </select>
         <Input
     
     value={searchTerm}
     placeholder={``}
     onChange={(e) => setSearchTerm(e.target.value)}
   />
         </div>
           </div>
         </Col>
       </Row>

      </Container>
      {order.orders.filter((od, index) => {
          if(searchTerm)  
          {
            return od?.[searchBy]?.includes(searchTerm);
          }
          else{
            return true;
          }
      }).map((orderItem, index) => (
        <Container>
        <Row>

         <Col lg={12}>
        <Card
          style={{
            margin: "10px 0",
          }}
          key={index}
          headerLeft={orderItem._id}
        > 
      
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "20px 20px",
              alignItems: "center",
              
              
            }}
          >
            <div>
              <div className="title">Items</div>
              {orderItem.items.map((item, index) => (
                <div className="value" key={index}>
                  {item.productId.name}
                </div>
              ))}
            </div>
            <div>
              <span className="title">Total Price</span>
              <br />
              <span className="value">{orderItem.totalAmount}</span>
            </div>
            <div>
              <span className="title">Payment Type</span> <br />
              <span className="value">{orderItem.paymentType}</span>
            </div>
            <div>
              <span className="title">Payment Status</span> <br />
              <span className="value">{orderItem.paymentStatus}</span>
            </div>
            
          </div>

          <div
            style={{
              boxSizing: "border-box",
              margin: " 100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexFlow: "wrap"
             
            }}
          >

              {
                orderItem.cancleOrder.map((newStatus) => 
                   newStatus.isCanclled ? <h2>{newStatus.type} on {formatDate(newStatus.date)}</h2> : 
                   <>
                   <div className="orderTrack">
                   {orderItem.orderStatus.map((status) => (
                     <div
                       className={`orderStatus ${
                         status.isCompleted ? "active" : ""
                       }`}
                     >
                       <div
                         className={`point ${status.isCompleted ? "active" : ""}`}
                       ></div>
                       <div className="orderInfo">
                         <div className="status">{status.type}</div>
                         <div className="date">{formatDate(status.date)}</div>
                       </div>
                     </div>
                   ))}
                 </div>
                        <div
                        style={{
                          padding: "0 50px",
                          boxSizing: "border-box",
                          margin: "5px auto"
                        }}
                      >
                        <select onChange={(e) => setType(e.target.value)}>
                          <option value={""}>select status</option>
                          {orderItem.orderStatus.map((status) => {
                            return (
                              <>
                                {!status.isCompleted ? (
                                  <option key={status.type} value={status.type}>
                                    {status.type}
                                  </option>
                                ) : null}
                              </>
                            );
                          })}
                        </select>
                      </div>
                      <div
              style={{
                padding: "0 50px",
                boxSizing: "border-box",
                margin: "5px auto"
              }}
            >
              <button className="odButton" onClick={() => onOrderUpdate(orderItem._id)} style={{margin: "5px auto"}}>
                confirm
              </button>
            </div>
                      </>
                )
              }

      

          

            {/* select input to apply order action */}
       
         

          
          </div>

          
      
        </Card>
        
        </Col>
          </Row>
        </Container>
 
        
      ))}
    
    </Layout>
  );
};

export default Orders;