import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGrip } from '@fortawesome/free-solid-svg-icons';
import { SERVER_URL } from '../Service/ServerUrl';
import './CategoryCard.css'; // Import custom CSS file

function CategoryCard({ allcategories, handleFilter, clearFilters }) {
  return (
    <Container>
      <Row className="g-4 mt-2 justify-content-start">
        <div className='d-flex justify-content-between align-items-center mb-3'>
          <h3 className='Logo'>Browse our food categories!</h3>
        </div>
        {allcategories?.length > 0 ? (
          allcategories.map((category, index) => (
            <Col key={index} xs={6} md={4} lg={2} className="category-col">
              <div className="category-img-wrapper" onClick={() => handleFilter(category.food_category_name)}>
                <Image 
                  src={`${SERVER_URL + category.category_image}`} 
                  className="category-img"
                  alt={category.food_category_name}
                />
              </div>
              <p className='ms-3 categoryText'>{category.food_category_name}</p>
            </Col>
          ))
        ) : <p>Nothing to display</p>}
      </Row>
      <div className="d-flex justify-content-end mt-4">
        <button onClick={clearFilters} className="clear-filters-btn">Clear Filters</button>
      </div>
    </Container>
  );
}

export default CategoryCard;