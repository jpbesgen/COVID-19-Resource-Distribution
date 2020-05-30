class UpvotesComponent extends Component {
  constructor(id, props) {
    super(id);
    this.props = props;
    this.handleUpvotesChange = this.handleUpvotesChange.bind(this);
    EventStore.on("UpvotesChange-" + this.id, this.handleUpvotesChange);
  }

  handleUpvotesChange(data) {
    let { upvotes } = data;
    this.props.upvotes = upvotes;
    this.changed = true;
    this.update();
  }

  render() {
    let { upvotes } = this.props;
    let content = `
            ${upvotes} Upvotes
        `;
    return content;
  }
}

class CardfrontUpvotesComponent extends Component {
  constructor(id, props) {
    super(id);
    this.props = props;
    this.handleUpvotesChange = this.handleUpvotesChange.bind(this);
    EventStore.on("UpvotesChange-" + this.id, this.handleUpvotesChange);
  }

  handleUpvotesChange(data) {
    let { upvotes } = data;
    this.props.upvotes = upvotes;
    this.changed = true;
    this.update();
  }

  render() {
    let { upvotes } = this.props;
    let content = `
            ${upvotes}
        `;
    return content;
  }
}
