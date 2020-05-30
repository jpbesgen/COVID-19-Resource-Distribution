class LandingCarouselComponent extends Component {
  constructor(id, props) {
    super(id);
    this.props = props;

    this.designs = [];
    this.carouselCards = [];
    /*
            presentingCards:
            0   1   2   3   4

            0 and 4 are hidden
            1 and 3 are diminished
            2 is prominent
        */
    this.presentingCards = [];
    this.handleDesignsChange = this.handleDesignsChange.bind(this);
    EventStore.on("DesignsChange", this.handleDesignsChange);
    this.handleDesignsChange(DBStore.getDesigns());

    this.goLeft = this.goLeft.bind(this);
    this.goRight = this.goRight.bind(this);

    ComponentTree.addRootComponent(this);
  }

  handleDesignsChange(designs) {
    if (designs.length == 0 || this.designs.length >= 5) return;
    this.designs = designs;

    designs.forEach((design) => {
      this.carouselCards.push(
        new CarouselCardComponent("carousel-card-" + design.id, { design })
      );
    });

    this.orderCards();
  }

  orderCards() {
    //console.log(this.carouselCards)
    // sort the cards
    this.carouselCards = this.carouselCards.sort((c1, c2) => {
      return c2.upvotes - c1.upvotes;
    });

    let len = this.carouselCards.length;
    // take up to the top 8, at least 5
    if (len < 5) throw new Error("Less than 5 cards");
    let cutoffNumber = len > 8 ? 8 : len;
    this.carouselCards = this.carouselCards.splice(0, cutoffNumber);

    len = this.carouselCards.length;
    // link them in order
    for (let i = 0; i < len - 1; i++) {
      let card = this.carouselCards[i],
        nextCard = this.carouselCards[i + 1];
      card.setIndex(i);
      card.setNext(nextCard);
      nextCard.setPrevious(card);
      this.addChild(card);
    }
    let first = this.carouselCards[0],
      last = this.carouselCards[len - 1];
    first.setPrevious(last);
    last.setNext(first);
    last.setIndex(len - 1);
    this.addChild(last);

    this.presentingCards.push(last);
    this.presentingCards.push(first);
    this.presentingCards.push(this.carouselCards[1]);
    this.presentingCards.push(this.carouselCards[2]);
    this.presentingCards.push(this.carouselCards[3]);
  }

  goLeft() {
    let newPresentingCards = [];

    // set newpresentingcards
    for (let i = 0; i < this.presentingCards.length; i++) {
      let c = this.presentingCards[i];
      newPresentingCards.push(c.next);
    }

    // add new classes
    for (let i = 0; i < newPresentingCards.length; i++) {
      let c = newPresentingCards[i],
        elem = document.getElementById(c.id);
      elem.classList.remove("carousel-card-hidden");
      elem.classList.add("presenting-card-" + i);
    }

    // remove old classes
    for (let i = 0; i < this.presentingCards.length; i++) {
      let c = this.presentingCards[i],
        elem = document.getElementById(c.id);
      elem.classList.remove("presenting-card-" + i);
      if (i == 0) elem.classList.add("carousel-card-hidden");
    }

    this.presentingCards = newPresentingCards;
  }

  goRight() {
    let newPresentingCards = [];

    // set newpresentingcards
    for (let i = this.presentingCards.length - 1; i >= 0; i--) {
      let c = this.presentingCards[i];
      newPresentingCards.unshift(c.previous);
    }

    // add new classes
    for (let i = 0; i < newPresentingCards.length; i++) {
      let c = newPresentingCards[i],
        elem = document.getElementById(c.id);
      elem.classList.remove("carousel-card-hidden");
      elem.classList.add("presenting-card-" + i);
    }

    // remove old classes
    for (let i = 0; i < this.presentingCards.length; i++) {
      let c = this.presentingCards[i],
        elem = document.getElementById(c.id);
      elem.classList.remove("presenting-card-" + i);
      if (i == this.presentingCards.length - 1)
        elem.classList.add("carousel-card-hidden");
    }

    this.presentingCards = newPresentingCards;
  }

  afterCall() {
    let { goLeft, goRight } = this;
    $("#card-carousel-left-btn").on("click", (e) => {
      e.preventDefault();
      goLeft();
    });

    $("#card-carousel-right-btn").on("click", (e) => {
      e.preventDefault();
      goRight();
    });
  }

  render() {
    let displayCards = ``;
    this.carouselCards.forEach((card) => {
      let classes = `landing-carousel-card `;
      switch (card.id) {
        case this.presentingCards[0].id:
          classes += `presenting-card-0`;
          break;
        case this.presentingCards[1].id:
          classes += `presenting-card-1`;
          break;
        case this.presentingCards[2].id:
          classes += `presenting-card-2`;
          break;
        case this.presentingCards[3].id:
          classes += `presenting-card-3`;
          break;
        case this.presentingCards[4].id:
          classes += `presenting-card-4`;
          break;
        default:
          classes += `carousel-card-hidden`;
      }
      displayCards += `
            <div id="${card.id}" class="${classes}">
                
            </div>
            `;
    });
    let content = `
            ${displayCards}
        `;

    return content;
  }
}

class CarouselCardComponent extends Component {
  constructor(id, props) {
    super(id);
    this.props = props;

    this.previous = null;
    this.next = null;
    this.index = null;
  }

  setIndex(index) {
    this.index = index;
  }

  setNext(next) {
    this.next = next;
  }

  setPrevious(previous) {
    this.previous = previous;
  }

  render() {
    //console.log("rendering");
    let { design } = this.props;

    let description = design.description;
    if (description.length > 140) {
      description = description.substring(0, 141);
      description += "...";
    }

    // create downloadable links
    let downloads = ``;
    if (design.attachments != null && design.attachments.length > 0) {
      downloads = `Attachments: `;
      design.attachments.forEach((attachment) => {
        let attachmentName = attachment.name;
        if (attachmentName.length > 30) {
          attachmentName = attachmentName.substring(0, 30) + "...";
        }
        downloads += `<a href="${attachment.url}" target="_blank" download> ${attachmentName}</a>`;
        if (attachment != design.attachments[design.attachments.length - 1]) {
          downloads += `,`;
        }
      });
    }

    let links = ``;
    if (
      design.links != null &&
      design.links.length > 0 &&
      design.links[0].trim() != ""
    ) {
      links = `Links: `;
      design.links.forEach((link) => {
        let linkName = link;
        if (linkName.length > 30) {
          linkName = link.substring(0, 30) + "...";
        }
        links += `<a href="${link}" target="_blank"> ${linkName}</a>`;
        if (link != design.links[design.links.length - 1]) {
          links += `,`;
        }
      });
    }

    let certification = ``;
    if (design.certified == "yes") {
      certification = `<span class="badge badge-success">Certified</span>`;
    } else if (design.certified == "no") {
      certification = `<span class="badge badge-danger">Uncertified</span>`;
    } else {
      certification = `<span class="badge badge-warning">Certification In Progress</span>`;
    }

    let printerRequired = design.printerRequired
      ? `<span class="badge badge-primary">3D Printer Required</span>`
      : ``;

    let categoryDisplayName = ``;
    switch (design.category) {
      case "n95":
        categoryDisplayName = `N95 Mask`;
        break;
      case "surgicalMask":
        categoryDisplayName = `Surgical Mask`;
        break;
      case "ventilator":
        categoryDisplayName = `Ventilator`;
        break;
      case "ventilatorParts":
        categoryDisplayName = `Ventilator Parts`;
        break;
      case "faceShield":
        categoryDisplayName = `Face Shield`;
        break;
      case "hospitalGown":
        categoryDisplayName = `Hospital Gown`;
        break;
      case "handSanitizer":
        categoryDisplayName = `Hand Sanitizer`;
        break;
      case "disposableBooties":
        categoryDisplayName = `Disposable Booties`;
        break;
      default:
        categoryDisplayName = `Other`;
        break;
    }

    let content = `
            <center>
            <h5 class="card-header text-dark carousel-card-header" style="padding:5%">${
              design.name
            }</h5>
            <img class="card-img-top carousel-card-img" src="${
              design.images[0].url
            }" alt="Item Attachment 0" />
            <div class="text-info">${categoryDisplayName}</div>
            </center>
            <div class="card-body carousel-card-body">
                <p class="card-text item-description">${description}</p>
                ${printerRequired}
                ${certification}
            </div>
            ${links}
            ${downloads.length > 0 && links.length > 0 ? `<br/>` : ``}
            ${downloads}
        `;

    return content;
  }
}
