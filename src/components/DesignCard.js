import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DesignCardModal from './DesignCardModal';
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
  DesignCard this.props:
  design_id
  title
  image
  is_certified
  difficulty
  tags
  description
  upvote_count
  */

  constructor(props) {
    super(props);
    this.state = {hasUpvoted: false, hasDownvoted: true, showModal: false};

    // This binding is necessary to make `this` work in the callback
    this.handleDownvote = this.handleDownvote.bind(this);
    this.handleUpvote = this.handleUpvote.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
  }

  truncateString(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + '...';
  }

  formatDescription(desciption) {
    // description (String)
    return this.truncateString(desciption, 90);
  }

  formatTitle(title) {
    // title (String)
    return this.truncateString(title, 25);
  }

  handleUpvote() {
    // todo
  }

  handleDownvote() {
    // todo
  }

  handleShowModal() {
    this.setState({showModal: true});
  }

  handleCloseModal() {
    this.setState({showModal: false});
  }

  render() {
    let { images, is_certified, difficulty, name, tags, description, upvotes } = this.props.design;
    console.log(this.props.design);
    return (
      <span>
        <Card id="makerspace-card" onClick={this.handleShowModal}>
          <div id="makerspace-card-image-container">
          <Card.Img variant="top" src={images[0] ? images[0].url : PlaceholderImage} id="makerspace-card-image"/>
          <CertifiedLabel showCertifiedLabel={is_certified ? true : false}/>
          <DifficultyLabel difficulty={difficulty ? difficulty : "Easy"}/>
          </div>
          <Card.Body onClick={this.handleShowModal}>
            <Card.Title id="makerspace-card-title">{name ? this.formatTitle(name) : ""}</Card.Title>
            <Tags tags={tags ? tags : []}/>
            <Card.Text id="makerspace-card-description">
            {description ? this.formatDescription(description) : ""}
            </Card.Text>
          </Card.Body>
          <VotingComponent votes={upvotes ? upvotes : 0}/>
          <DesignCardModal show={this.state.showModal} onHide={this.handleCloseModal} {...this.props}/>
        </Card>
      </span>
    );
  }
}

export default DesignCard;
