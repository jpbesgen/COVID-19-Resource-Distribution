import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

// css copied from makerspace-carousel for now
import '../css/design-card.css';

import PlaceholderImage from '../img/doctormaskcolored.png';

// props and state

const DesignCard = () => {
  /*
  props:
  design_id
  title
  image
  certified
  materials/tools/difficulty
  description
  upvote_count
  */

  /*
  <div id="makerspace-card-tag-container">
    <span id="makerspace-card-tag">Med</span>
    <span id="makerspace-card-tag">Elastic</span>
    <span id="makerspace-card-tag">Fabric</span>
    <span id="makerspace-card-tag">Sewing Machine</span>
    <span id="makerspace-card-tag">Positivity</span>
  </div>
  */

  return (
    <span>
      <Card style={{ width: '18rem' }}>
        <div id="makerspace-card-image-container">
        <Card.Img variant="top" src={PlaceholderImage}/>
        <span id="makerspace-card-certified-label">Certified </span>
        </div>
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <div id="makerspace-card-tag-container">
            <span id="makerspace-card-tag">Med</span>
            <span id="makerspace-card-tag">Elastic</span>
            <span id="makerspace-card-tag">Fabric</span>
            <span id="makerspace-card-tag">Sewing Machine</span>
            <span id="makerspace-card-tag">Positivity</span>
          </div>
          <Card.Text>
          Some quick example text to build on the card title and make up the bulk of
          the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </span>
  );
}

export default DesignCard;
