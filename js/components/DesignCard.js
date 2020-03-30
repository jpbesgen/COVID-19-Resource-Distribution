class CommentsComponent extends Component {
    constructor(id, props) {
        super(id || null);
        this.props = props;
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
        let displayComments = ``,
            { comments } = this.props,
            parent_id = this.parent.props.design.id;
        if(comments != null && comments.length > 0) {
            comments.forEach((comment) => {
                displayComments += `<p class="modal-text" id="comment-${comment.id}">${comment.content} <b>from ${comment.author}</b></p>`;
                if(comment != comments[comments.length - 1]) {
                    displayComments += `<br/>`;
                }
            });
        }

        let addCommentDisplay = getUser() == null ? "" : 
        `
            <input type="text" placeholder="Write a comment..." id="${parent_id}-comment-input"/>
            <small class="form-text text-muted">from ${getUser().displayName}</small>
            <input class="btn" onClick="addComment('${parent_id}')" style="border:1px solid black" value="Make a Comment"/>
        `;

        let content = 
        `
            <h4 class="community-title">Comments<?h3>
            <p class="community-text">
                ${displayComments}
            </p>
            ${addCommentDisplay}
        `;

        return {
            content
        };
    }
}

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
        console.log(upvotes);
        this.update();
    }

    render() {
        let { upvotes } = this.props;
        console.log("RENDERING: " + upvotes);
        let content = 
        `
            ${upvotes} Upvotes
        `;
        return {
            content
        }
    }
}


class DesignCard extends Component {
    constructor(id, props) {
        super(id);
        this.props = props;
        let { retrievedComments, upvotes } = this.props.design;

        this.handleDesignCardUpdated = this.handleDesignCardUpdated.bind(this);
        EventStore.on(("DesignCardChange-" + this.props.design.id), this.handleDesignCardUpdated);

        this.comments_id = "comments-" + this.props.design.id;
        this.upvotes_id = "upvotes-" + this.props.design.id;

        let commentDisplay = new CommentsComponent(this.comments_id, {
            comments: retrievedComments
        });
        let upvotesDisplay = new UpvotesComponent(this.upvotes_id, {
            upvotes
        });

        this.addChild(commentDisplay);
        this.addChild(upvotesDisplay);

        ComponentTree.addRootComponent(this);
    }

    handleDesignCardUpdated(data) {
        let newDesign = data.design,
            { design } = this.props;

        if(newDesign != design) {
            // check comments
            if(newDesign.comments != design.comments) {
                let { retrievedComments } = newDesign;
                EventStore.publish("CommentsChange-" + this.comments_id, {
                    comments: retrievedComments
                });
            }

            // check upvotes
            if(newDesign.upvotes != design.upvotes) {
                let { upvotes } = newDesign;
                EventStore.publish("UpvotesChange-" + this.upvotes_id, {
                    upvotes
                });
            }

        } else {
            console.log("Persisted State");
        }
    }

    render() {
        let { design } = this.props;

        let description = design.description;
        if (description.length > 140) {
            description = description.substring(0, 141);
            description +=  "...";
        }

        // create downloadable links
        let downloads = ``;
        if(design.attachments != null && design.attachments.length > 0) {
            design.attachments.forEach((attachment) => {
                downloads += `<a href="${attachment.url}" target="_blank" download> ${attachment.name}</a>`;
                if(attachment != design.attachments[design.attachments.length - 1]) {
                    downloads += `,`
                }
            });
        }
        
        let links = ``;
        if(design.links != null && design.links.length > 0) {
            design.links.forEach((link) => {
                links += `<a href="${link}" target="_blank"> ${link}</a>`;
                if(link != design.links[design.links.length - 1]) {
                    links += `,`
                }
            })
        }

        let images = ``;
        if(design.images != null && design.images.length > 0) {
            design.images.forEach((image) => {
                images += `<div class="carousel-image" style="background-image: url('${image.url}');"></div>`;
            });
        }

        function afterCall() {
            console.log("aftercall");
            $('#details-tab-' + design.id + ' a').on('click', function (e) {
                e.preventDefault()
                $('#details-tab-' + design.id + ' a').tab('show')
                $('.nav-link').show();
            })
            $('#comments-tab-' + design.id + ' a').on('click', function (e) {
                e.preventDefault()
                $('comments-tab-' + design.id + ' a').tab('show')
            })
        }

        let content = `
	<h5 class="card-header text-dark">${design.name}</h5>
	<img class="card-img-top" src="${design.images[0].url}" alt="Item Attachment 0" />
	<div class="card-body">
		<p class="card-text"><b>Category:</b> ${design.category}</p>
		<p class="card-text item-description">${description}</p>
		<p class="card-text"><b>3D printer Required:</b> ${design.printerRequired}</p>
        <p class="card-text"><b>Certified:</b> ${design.certified}</p>
		<button class="btn btn-block card-text" data-toggle="modal" data-target="#${design.id}">See More</button>
	</div>
	<div class="btn-group">
		<button onClick="upvote('${design.id}')" class="btn">Upvote</button>
		<button onClick="downvote('${design.id}')" class="btn">Downvote</button> 
    </div>

    
	<div class="modal fade" id="${design.id}" tabindex="-1" role="dialog" aria-labelledby="${design.id}ModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg" role="document">
	<div class="modal-content">
		<div class="modal-header">
			<h5 class="modal-title" id="${design.id}ModalLabel">${design.name}</h5>
			<button type="button" class="close" data-dismiss="modal" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
		</div>
		<div class="modal-body">
			<div class="row">
				<div class="col-xs-12 col-6">
<!--                                <img class="modal-img" src="${design.images[0].url}" alt="Modal item cap" />-->
					<!-- CAROUSEL -->
					<div class="owl-carousel owl-theme">
						${images}
					</div>
					<!-- END CAROUSEL -->
				</div>
				<div class="col-xs-12 col-6">
					<div class="community">
						<div class="votes">
							<h3 class="community-title">Community Score</h3>
							<p id="${this.upvotes_id}" class="community-text">${design.upvotes} Upvotes</p>
						</div>
					</div>
				</div>
            </div>
            <br/>
            <ul class="nav nav-tabs nav-justified navbar-dark bg-dark" id="myTab" role="tablist">
                <li class="nav-item" id="details-tab-${design.id}">
                    <a class="nav-link active show" id="details-tab-link" data-toggle="tab" href="#details-page-${design.id}" role="tab" aria-controls="details-page-${design.id}" aria-selected="true">Details</a>
                </li>
                <li class="nav-item" id="comments-tab-${design.id}">
                    <a class="nav-link show" id="comments-tab-link" data-toggle="tab" href="#comments-page-${design.id}" role="tab" aria-controls="comments-page-${design.id}" aria-selected="false">Comments</a>
                </li>
            </ul>
            <div class="tab-content" id="tab-content-${design.id}">
                <div class="tab-pane fade show active" id="details-page-${design.id}" role="tabpanel" aria-labelledby="details">
                    <p class="modal-text"><b>Category</b><br />${design.category}</p>
                    <p class="modal-text"><b>Description</b><br />${design.description}</p>
                    <p class="modal-text"><b>3D Printer Required</b><br />${design.printerRequired}</p>
                    <p class="modal-text"><b>Certified</b><br /> ${design.certified}</p>
                    ${design.certifiedLink != null && design.certified == "yes" ? 
                    `
                        <p class="modal-text">
                            <b>Certification Link</b>
                            <br />
                            <a href=${design.certifiedLink} target="_blank"> ${design.certifiedLink} </a>
                        </p>` : 
                        ``
                    }
                    <p class="modal-text"><b>Difficulty Level</b><br /> ${design.difficulty}</p>
                    <p class="modal-text"><b>Credit</b><br /> ${design.credit}</p>
                    Links: ${links}
                    <br/>
                    Attachments: ${downloads}
                </div>
                <div class="tab-pane fade" id="comments-page-${design.id}" role="tabpanel" aria-labelledby="comments">
                    <div id="${this.comments_id}" class="comments">
                    </div>
                </div>
            </div>
		</div>
		<div class="modal-footer">
		<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
		</div>
	</div>
    </div>
        `;

        return {
            content,
            afterCall: afterCall(design)
        }
    }
}