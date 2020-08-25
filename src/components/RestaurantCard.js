import React from 'react';
import { Card } from 'react-bootstrap';

const RestaurantCard = ({ res }) => {
  return (
    <Card className='card mb-4 mx-1'>
      <Card.Img
        className='card-image'
        variant='top'
        src={res.restaurant.featured_image}
      />
      <Card.Body>
        <Card.Text>{res.restaurant.establishment[0]}</Card.Text>
        <Card.Title>{res.restaurant.name}</Card.Title>
        <Card.Text>{res.restaurant.user_rating.aggregate_rating}</Card.Text>
        <Card.Text>{res.restaurant.location.address}</Card.Text>
        <Card.Text>cuisines:{res.restaurant.cuisines}</Card.Text>
        <Card.Text>
          cost for two:{res.restaurant.currency}
          {res.restaurant.average_cost_for_two}
        </Card.Text>
        <Card.Text>hours:{res.restaurant.timings}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default RestaurantCard;
