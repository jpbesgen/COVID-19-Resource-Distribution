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

    afterCall() {
        let parent_id = this.parent.props.design.id,
            { commentContent } = this;
        $("#" + parent_id + "-comment-input").on("change", (e) => {
            commentContent = e.target.value;
        });
        $("#" + parent_id + "-add-comment-btn").on("click", (e) => {
            DBStore.addComment(parent_id, commentContent);
        });
    }

    render() {
        let displayComments = ``,
            { comments } = this.props,
            parent_id = this.parent.props.design.id,
            user = DBStore.getAuthUser();
        if(comments != null && comments.length > 0) {
            comments.forEach((comment) => {
                displayComments += `<p class="modal-text" id="comment-${comment.id}">${comment.content} <b>from ${comment.author}</b></p>`;
                if(comment != comments[comments.length - 1]) {
                    displayComments += `<br/>`;
                }
            });
        }

        let addCommentDisplay = user == null ? "" : 
        `
            <input type="text" placeholder="Write a comment..." id="${parent_id}-comment-input"/>
            <small class="form-text text-muted">from ${user.displayName}</small>
            <input id="${parent_id}-add-comment-btn" class="btn" style="border:1px solid black" value="Make a Comment"/>
        `;

        let content = 
        `
            <h4 class="community-title">Comments<?h3>
            <p class="community-text">
                ${displayComments}
            </p>
            ${addCommentDisplay}
        `;

        return content;
    }
}