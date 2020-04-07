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
        return `
            <div>
                <p>In order to comment, please <a href="/pages/login.html">log in</a>.</p>
                <div id="commentview-${this.props.id}" style="padding: 20px"></div>
            </div>
        `;
    }
}
