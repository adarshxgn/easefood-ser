import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import CategoryCard from '../Components/CategoryCard';
import FoodCard from '../Components/FoodCard';
import { getAllCategoriesAPI, getAllMenuAPI } from '../Service/AllAPI';
import Spinner from 'react-bootstrap/Spinner';

function HomePage() { 
  const pin = sessionStorage.getItem("verifiedPin");
  const [allcategories, setAllcategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tableMenu, setTableMenu] = useState([]);
  const [addedItems, setAddedItems] = useState([]); // Track added items
  const [filteredMenu, setFilteredMenu] = useState([]); 

  console.log(allcategories);
  console.log(tableMenu);
  
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
          <Row  className="g-4 mt-4 justify-content-center">
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
        </Container>
      )}
    </div>
  );
}

export default HomePage;