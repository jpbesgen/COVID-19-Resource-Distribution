class CommentsComponent extends Component {
    constructor(id, props) {
        super(id || null);
        this.props = props;
        this.commentContent = "";
        this.handleCommentsChange = this.handleCommentsChange.bind(this);
        EventStore.on("CommentsChange-" + this.id, this.handleCommentsChange);
    }

    handleCommentsChange(data) {
        let { comments } = data;
        this.props.comments = comments;
        this.changed = true;
        this.update();
    }

    render() {
        return `<div id="commentview-${this.props.id}" style="padding: 20px"></div>`;
    }
}
