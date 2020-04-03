class DesignCardComponent extends Component {
    constructor(id, props) {
        super(id);
        this.props = props;
        let { retrievedComments, upvotes } = this.props.design;

        this.handleDesignCardUpdated = this.handleDesignCardUpdated.bind(this);
        EventStore.on(("DesignCardChange-" + this.props.design.id), this.handleDesignCardUpdated);

        this.comments_id = "comments-" + this.props.design.id;
        this.upvotes_id = "upvotes-" + this.props.design.id;
        this.cardfront_upvotes_id = "cardfront-upvotes-" + this.props.design.id;

        let commentDisplay = new CommentsComponent(this.comments_id, {
            comments: retrievedComments,
            id: this.props.design.id
        });
        let upvotesDisplay = new UpvotesComponent(this.upvotes_id, {
            upvotes
        });
        let cardfrontUpvotesDisplay = new CardfrontUpvotesComponent(this.cardfront_upvotes_id, {
            upvotes
        });

        this.addChild(commentDisplay);
        this.addChild(upvotesDisplay);
        this.addChild(cardfrontUpvotesDisplay);

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
                EventStore.publish("UpvotesChange-" + this.cardfront_upvotes_id, {
                    upvotes
                });
            }

        } else {
            console.log("Persisted State");
        }
    }

    afterCall() {
        let { id } = this.props.design;
        $("#details-tab-" + id + " a").on("click", (e) => {
            e.preventDefault();
            $("#details-tab-" + id + " a").tab("show");
            $(".nav-link").show();
        });
        $("#comments-tab-" + id + " a").on("click", (e) => {
            e.preventDefault();
            $("comments-tab-" + id + " a").tab("show");
        });
        $("#upvote-btn-" + id).on("click", (e) => {
            e.preventDefault();
            EventStore.publish("Upvote", id);
        });
        $("#downvote-btn-" + id).on("click", (e) => {
            e.preventDefault();
            EventStore.publish("Downvote", id);
        });
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
            downloads = `Attachments: `
            design.attachments.forEach((attachment) => {
                downloads += `<a href="${attachment.url}" target="_blank" download> ${attachment.name}</a>`;
                if(attachment != design.attachments[design.attachments.length - 1]) {
                    downloads += `,`
                }
            });
        }
        
        let links = ``;
        if(design.links != null && design.links.length > 0) {
            links = `Links: `
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

        let certification = ``;
        if(design.certified == "yes") {
            certification = `<span class="badge badge-success">Certified</span>`;
        } else if(design.certified == "no") {
            certification = `<span class="badge badge-danger">Uncertified</span>`;
        } else {
            certification = `<span class="badge badge-warning">Certification In Progress</span>`;
        }

        let printerRequired = design.printerRequired ? `<span class="badge badge-primary">3D Printer Required</span>` : ``;

        let categoryDisplayName = ``;
        switch(design.category) {
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
            <h5 class="card-header text-dark">${design.name}</h5>
            <img class="card-img-top" src="${design.images[0].url}" alt="Item Attachment 0" />
            <div class="card-body">
                <figure class="figure">
                    <div class="text-info">${categoryDisplayName}</div>
                </figure>
                <p class="card-text item-description">${description}</p>
                ${printerRequired}
                ${certification}
                <button class="btn btn-block card-text" data-toggle="modal" data-target="#${design.id}">See More</button>
            </div>
            <div class="btn-group">
                <button id="upvote-btn-${design.id}" class="btn">
                    <img src="../img/arrow-dropdown.png"/>
                </button>
                <span class="btn" id="${this.cardfront_upvotes_id}">${design.upvotes}</span>
                <button id="downvote-btn-${design.id}" class="btn">
                    <img style="transform: rotate(-180deg);" src="../img/arrow-dropdown.png"/>
                </button> 
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
                    <div class="btn-group">
                        <button onClick="upvote('${design.id}')" class="btn">
                            <img src="../img/arrow-dropdown.png"/>
                        </button>
                        <span class="btn" id="${this.cardfront_upvotes_id}">${design.upvotes}</span>
                        <button onClick="downvote('${design.id}')" class="btn">
                            <img style="transform: rotate(-180deg);" src="../img/arrow-dropdown.png"/>
                        </button> 
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
                                    ${links}
                                    <br/>
                                    ${downloads}
                                </div>
                                <div class="tab-pane fade" id="comments-page-${design.id}" role="tabpanel" aria-labelledby="comments">
                                    <div id="${this.comments_id}" class="comments"> </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
        `;

        return content;
    }
}