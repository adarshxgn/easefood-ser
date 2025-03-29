import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Card, ListGroup, Badge } from 'react-bootstrap';
import CategoryCard from '../Components/CategoryCard';
import FoodCard from '../Components/FoodCard';
import Timer from '../Components/Timer';
import { getAllCategoriesAPI, getAllMenuAPI, getOrderDashboardAPI } from '../Service/AllAPI';
import { format, differenceInMinutes } from 'date-fns';
import Spinner from 'react-bootstrap/Spinner';
import { Clock, CheckCircle, Utensils } from 'lucide-react';

function HomePage() { 
  const pin = sessionStorage.getItem("verifiedPin");
  const [allcategories, setAllcategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tableMenu, setTableMenu] = useState([]);
  const [addedItems, setAddedItems] = useState([]); 
  const [filteredMenu, setFilteredMenu] = useState([]); 
  const [latestOrder, setLatestOrder] = useState(null);
  const tableId = sessionStorage.getItem("tableId")
  
  const handleFilter = (categoryName) => {
    if (!categoryName) {
      setFilteredMenu(tableMenu); // Reset to all products if no category is selected
    } else {
      const filtered = tableMenu.filter(item => item.food_category_name === categoryName);
      setFilteredMenu(filtered);
    }
  };

  const clearFilters = () => {
    setFilteredMenu(tableMenu); // Reset to all products
  };

  useEffect(() => {
    getAllCategories();
    getMenu();
  }, []);

  // Fetch all categories
  const getAllCategories = async () => {
    setIsLoading(true);
    try { 
      const result = await getAllCategoriesAPI(pin);
      if (result.status === 200) {
        setAllcategories(result.data.food_category);
      } else {
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch all menu items
  const getMenu = async () => {
    setIsLoading(true);
    try {
      const result = await getAllMenuAPI(pin);
      if (result.status === 200) {
        setTableMenu(result.data.food_items);
        setFilteredMenu(result.data.food_items); // Set all items initially
      } else {
        console.log(result.response.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle adding an item
  const handleAddItem = (item) => {
    if (!addedItems.includes(item.id)) {
      setAddedItems([...addedItems, item.id]);
    } else {
      alert("Item already added!"); // Prevent multiple additions
    }
  };

  // Fetch latest order
  const getLatestOrder = async () => {
    try {
      const response = await getOrderDashboardAPI(pin);
      if (response.data && response.data.length > 0) {
        // Filter orders for current table
        const tableOrders = response.data.filter(order => 
          order.table_number === parseInt(tableId)  
        );  
        
        if (tableOrders.length > 0) {
          // Get the most recent order
          const sortedOrders = tableOrders.sort((a, b) => 
            new Date(b.created_at) - new Date(a.created_at)
          );
          setLatestOrder(sortedOrders[0]);
        }
      }
      console.log(response);
      
    } catch (error) {
      console.error("Error fetching latest order:", error);
    }
  };

  useEffect(() => {
    getLatestOrder();
    const interval = setInterval(getLatestOrder, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [tableId]);

  return (
    <div>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
          <Spinner animation="border" variant="secondary" />
        </div>
      ) : (
        <Container>
          <CategoryCard allcategories={allcategories} handleFilter={handleFilter} clearFilters={clearFilters} />
          <hr />
          <Row className="g-4 mt-4 justify-content-center">
            {filteredMenu.length > 0 ? (
              filteredMenu.map((menuItem) => (
                <Col key={menuItem.id} xs={12} sm={6} md={6} lg={4} xl={3} className="mb-4">
                  <FoodCard displaydata={menuItem} onAdd={handleAddItem} addedItems={addedItems} />
                </Col>
              ))
            ) : (
              <div className="fw-bolder text-center">Nothing to display!!</div>
            )}
          </Row>
          {latestOrder && (
            <Card 
              className="mb-4 shadow-lg border-0" 
              style={{
                background: 'linear-gradient(135deg, #f6f8f9 0%, #e5ebee 100%)',
                borderRadius: '15px',
                overflow: 'hidden'
              }}
            >
              <Card.Body className="p-4">
                {/* Order Header */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="d-flex align-items-center">
                    <Utensils className="me-3 text-primary" size={32} />
                    <div>
                      <h4 className="mb-1 fw-bold text-dark">Order #{latestOrder.id}</h4>
                      <p className="text-muted mb-0">
                        <Clock size={16} className="me-2 text-secondary" />
                        Ordered at: {format(new Date(latestOrder.created_at), 'HH:mm')}
                      </p>
                    </div>
                  </div>
                  
                  {/* Status and Timer */}
                  <div className="text-end">
                    <Badge 
                      bg={latestOrder.status === 'Delivered' ? 'success' : 'warning'} 
                      className="mb-2 d-inline-flex align-items-center"
                    >
                      <CheckCircle size={16} className="me-2" />
                      Cooking
                    </Badge>
                    <div className="timer-badge">
                      <Timer initialMinutes={30} />
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <Card 
                  className="border-0 shadow-sm mb-3" 
                  style={{ 
                    background: 'white', 
                    borderRadius: '10px' 
                  }}
                >
                  <Card.Body>
                    <h5 className="mb-3 text-primary">
                      <Utensils size={20} className="me-2" />
                      Order Items
                    </h5>
                    <ListGroup variant="flush">
                      {latestOrder.items && latestOrder.items.map((item, index) => (
                        <ListGroup.Item 
                          key={index} 
                          className="d-flex justify-content-between align-items-center px-0 py-2"
                        >
                          <div>
                            <span className="fw-bold">{item.food_name}</span>
                            <p className="text-muted mb-0">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                          <Badge bg="secondary" pill>
                            ${parseFloat(item.price).toFixed(2)}
                          </Badge>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card.Body>
                </Card>

                {/* Total Price */}
                <div className="text-end">
                  <h5 className="mb-0">
                    Total: 
                    <span className="text-primary ms-2 fw-bold">
                      ${parseFloat(latestOrder.total_price).toFixed(2)}
                    </span>
                  </h5>
                </div>
              </Card.Body>
            </Card>
          )}
        </Container>
      )}
    </div>
  );
}

export default HomePage;