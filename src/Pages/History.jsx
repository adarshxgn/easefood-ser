import React, { useState, useEffect } from 'react';
import { getAllOdersAPI } from '../Service/AllAPI';
import { Card, Container, Table, Accordion } from 'react-bootstrap';
import { format } from 'date-fns';
import './History.css';

const History = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pin = sessionStorage.getItem('verifiedPin');
  const category = sessionStorage.getItem("category")
  const tableId = sessionStorage.getItem("tableId");
  const tableNumber = sessionStorage.getItem("tableNumber")
  
  

  useEffect(() => {
    const fetchOrders = async () => {
        try {
            const pin = sessionStorage.getItem("verifiedPin"); 
            const tableId = sessionStorage.getItem("tableId");
            
            if (!pin) {
                console.error("Seller PIN not found");
                setError("Seller PIN not found");
                setLoading(false);
                return;
            }
            
            const response = await getAllOdersAPI(pin);
            // Filter orders based on tableId if it exists
            const filteredOrders = tableId 
                ? response.data.filter(order => order.table_number === parseInt(tableId))
                : response.data;
            setOrders(filteredOrders);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching orders:", error);
            setError("Failed to fetch orders");
            setLoading(false);
        }
    };

    fetchOrders();
}, []); 
  if (loading) return <div className="text-center mt-5">Loading orders...</div>;
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;
  if (!orders.length) return <div className="text-center mt-5">No orders found</div>;4

  console.log(orders);
  
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Order History</h2>
      <Accordion>
        {orders.map((order, index) => (
          <Accordion.Item key={order.id} eventKey={index.toString()}>
            <Accordion.Header>
              <div className="d-flex justify-content-between w-100 me-3">
                <span>Order #{order.id}</span>
                <span>{category=="Hotel"?"Table":"Room"} #{tableNumber}</span>
                <span>₹{order.total_price}</span>
                <span>{format(new Date(order.created_at), 'dd/MM/yyyy HH:mm')}</span>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <Card>
                <Card.Body>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item, idx) => (
                        <tr key={idx}>
                          <td>{idx + 1}</td>
                          <td>{item.food}</td>
                          <td>{item.quantity}</td>
                          <td>₹{item.price}</td>
                          <td>₹{item.price * item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  {order.descriptions && (
                    <div className="mt-3">
                      <strong>Special Instructions:</strong>
                      <p className="mb-0">{order.descriptions}</p>
                    </div>
                  )}
                  <div className="mt-3">
                    <strong>Status:</strong>
                    <span className="ms-2 badge bg-success">{order.status}</span>
                  </div>
                </Card.Body>
              </Card>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
};

export default History;