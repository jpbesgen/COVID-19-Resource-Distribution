import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel'

// css copied from makerspace-carousel for now
import '../css/design-card.css';

import PlaceholderImage from '../img/doctormaskcolored.png';
import UpvoteButtonImage from '../img/arrow-dropdown.png';
import CheckmarkImage from '../img/check-mark.png';
// props and state

function VotingComponent(props) {
  // props:
  return (
    <span id="makerspace-card-voting-container">
      <Button variant="primary" id="makerspace-card-vote-button">
        <img src={UpvoteButtonImage}/>
      </Button>
      <h1 id="makerspace-card-vote-count">{props.votes}</h1>
      <Button variant="primary" id="makerspace-card-vote-button">
        <img src={UpvoteButtonImage} id="makerspace-downvote-image"/>
      </Button>
    </span>
  );
}

function CertifiedLabel(props) {
  //props:
  if (!props.showCertifiedLabel) {
    return null
  } else {
    return (
      <span id="makerspace-card-certified-label">
        Certified
        <img src={CheckmarkImage} id="makerspace-card-certified-image"/>
      </span>
    );
  }
}

function DifficultyLabel(props) {
  // props: difficulty (String)
  // I think...

  var color = "#6BA48C"
  switch(props.difficulty) {
    case "Easy":
      color = "#9DDB8D";
      break;
    case "Med":
      color = "#FFC773";
      break;
    case "Hard":
      color = "#FF8888";
      break;
    default:
      break;
  }

  return (
    <span id="makerspace-card-difficulty-label" style={{backgroundColor: color}}>
      {props.difficulty}
    </span>
  );
}

function Tags(props) {
  // props: tags (array of Strings)
  let items = []
  for (let i = 0; i < props.tags.length; i++) {
    items.push(<span id="makerspace-card-tag">{props.tags[i]}</span>);
  }
  return (
    // loop through list of tags and add to div as span
    <div id="makerspace-card-tag-container">
      {items}
    </div>
  );
}

class DesignCard extends React.Component {
  /*
  this.props:
  design_id
  title
  image
  is_certified
  materials/tools/difficulty
  description
  upvote_count
  */

  truncateString(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + '...';
  }

  formatDescription(desciption) {
    // description (String)
    return this.truncateString(desciption, 100);
  }

  formatTitle(title) {
    // title (String)
    return this.truncateString(title, 25);
  }

  render() {
    return (
      <span>
        <Card id="makerspace-card">
          <div id="makerspace-card-image-container">
          <Card.Img variant="top" src={this.props.image ? this.props.image : PlaceholderImage} id="makerspace-card-image"/>
          <CertifiedLabel showCertifiedLabel={this.props.is_certified ? true : false}/>
          <DifficultyLabel difficulty={this.props.difficulty ? this.props.difficulty : "Easy"}/>
          </div>
          <Card.Body>
            <Card.Title id="makerspace-card-title">{this.props.title ? this.props.title : ""}</Card.Title>
            <Tags tags={this.props.tags ? this.props.tags : []}/>
            <Card.Text>
            {this.props.description ? this.props.description : ""}
            </Card.Text>
          </Card.Body>
          <VotingComponent votes={this.props.upvote_count ? this.props.upvote_count : 0}/>
        </Card>
      </span>
    );
  }

  formatTitle(title) {
    // title (String)
    return this.truncateString(title, 25);
  }

  render() {
    return (
      <span>
        <Card id="makerspace-card">
          <div id="makerspace-card-image-container">
          <Card.Img variant="top" src={this.props.image ? this.props.image : PlaceholderImage} id="makerspace-card-image"/>
          <CertifiedLabel showCertifiedLabel={this.props.is_certified ? true : false}/>
          <DifficultyLabel difficulty={this.props.difficulty ? this.props.difficulty : "Easy"}/>
          </div>
          <Card.Body>
            <Card.Title id="makerspace-card-title">{this.props.title ? this.props.title : ""}</Card.Title>
            <Tags tags={this.props.tags ? this.props.tags : []}/>
            <Card.Text>
            {this.props.description ? this.props.description : ""}
            </Card.Text>
          </Card.Body>
          <VotingComponent votes={this.props.upvote_count ? this.props.upvote_count : 0}/>
        </Card>
      </span>
    );
  }
}

export default DesignCard;
