let designCards = {},
  latestSnapshot = null,
  initialRendered = false;

// TODO:
// Take the array of design data and format into a bootstrap card
// and append each card to the view.
function renderDesigns(designs) {
  trackMakerSpaceClicks();
  $(document).ready(() => {
    const $grid = $("#grid").isotope({
      itemSelector: ".grid-item",
      percentPosition: true,
      masonry: {
        columnWidth: 30,
      },
    });

    $("#dropdown1").on("click", "button", function () {
      const filterValue = $(this).attr("data-filter");
      console.log(filterValue);
      console.log($grid);
      // use filterFn if matches value
      // filterValue = filterFns[ filterValue ] || filterValue;
      $grid.isotope({ filter: filterValue });
      $("#dropdownMenuButton1").text($(this).text());
    });

    $("#dropdown2").on("click", "button", function () {
      const filterValue = $(this).attr("data-filter");
      console.log(filterValue);
      console.log($grid);
      // use filterFn if matches value
      // filterValue = filterFns[ filterValue ] || filterValue;
      $grid.isotope({ filter: filterValue });
      $("#dropdownMenuButton2").text($(this).text());
    });

    $("#dropdown3").on("click", "button", function () {
      const filterValue = $(this).attr("data-filter");
      console.log(filterValue);
      console.log($grid);
      // use filterFn if matches value
      // filterValue = filterFns[ filterValue ] || filterValue;
      $grid.isotope({ filter: filterValue });
      $("#dropdownMenuButton3").text($(this).text());
    });

    fillGrid = async () => {
      let grid = document.getElementById("grid");
      if (grid == null) return;
      designs = designs.sort((d1, d2) => {
        return d2.upvotes - d1.upvotes;
      });
      designs.forEach((gridItem) => {
        if (designCards[gridItem.id] != null) {
          EventStore.publish("DesignCardChange-" + gridItem.id, {
            design: gridItem,
          });
          return;
        }
        let design_id = "design-" + gridItem.id;
        designCards[gridItem.id] = new DesignCardComponent(design_id, {
          design: gridItem,
        });

        // Create the container for each design to embed in
        var $items = $(
          `
                <div id="${design_id}" class="grid-item card ${gridItem.type} ${gridItem.category} certified-${gridItem.certified} printer-${gridItem.printerRequired}" style="width: 18em;"></div>
            `
        );
        // append items to grid
        $grid.append($items).isotope("appended", $items);
      });
    };

    fillGrid().then(async () => {
      ComponentTree.renderAll().then(() => {
        if (!initialRendered) {
          setTimeout(DBStore.emitDesignsChange, 0);
        }
        initialRendered = true;
      });

      // enable carousel
      $(".owl-carousel").owlCarousel({
        items: 1,
        margin: 10,
        autoHeight: true,
        nav: true,
        loop: true,
        lazyLoadEager: 1,
        lazyLoad: false,
        autoplayHoverPause: true,
        navText: "<>",
        autoplay: true,
        autoplayTimeout: 5000,
      });

      // inject comment view into each CommentComponent
      $('div[id^="commentview-"]').each(async (index, element) => {
        let currentUser = DBStore.getAuthUser();
        let myProfileUrl = DBStore.getMyProfileUrl();

        // fetch design_id from selector
        let commentView = $(element);
        let design_id = commentView.attr("id");
        design_id = design_id.substr(design_id.indexOf("-") + 1);

        // display comment view
        commentView.comments({
          // functionalities
          enableReplying: false,
          enableEditing: true,
          enableUpvoting: true,
          enableDeleting: true,
          enableDeletingCommentWithReplies: true,
          enableAttachments: false,
          enableHashtags: false,
          enablePinging: false,
          enableNavigation: true,
          postCommentOnEnter: true,
          roundProfilePictures: true,
          readOnly: !DBStore.isAuthenticated(),

          // user data
          profilePictureURL: myProfileUrl,

          // callbacks
          getComments: async function (success, error) {
            // fetch comments
            let comments = await DBStore.fetchCommentsForDesignById(design_id);
            let commentsNew = [];

            if (comments.length > 0) {
              // loop though comments
              for (const comment of comments) {
                let photoUrl = await DBStore.getProfileUrl(comment.uid);

                let userHasUpvoted;
                if (currentUser) {
                  userHasUpvoted = await DBStore.userHasUpvotedComment(
                    currentUser.uid,
                    comment.id
                  );
                }
                commentsNew.push({
                  id: comment.id,
                  created: comment.time,
                  modified: comment.modified || comment.time,
                  content: comment.content,
                  fullname: comment.author,
                  created_by_current_user: currentUser
                    ? currentUser.uid === comment.uid
                    : false,
                  profile_picture_url: photoUrl,
                  upvote_count: Math.max(comment.upvoteCount || 0, 0),
                  user_has_upvoted: userHasUpvoted || false,
                });
              }
            }
            success(commentsNew);
          },
          postComment: async function (commentJSON, success, error) {
            const { content } = commentJSON;
            let { err } = await DBStore.addComment(design_id, content);

            if (err) {
              error(err);
            } else {
              success(commentJSON);
            }
          },
          putComment: async function (commentJSON, success, error) {
            let id = commentJSON.id;
            let { err } = await DBStore.editComment(
              id,
              commentJSON.content,
              commentJSON.modified
            );

            if (err) {
              error(err);
            } else {
              success(commentJSON);
            }
          },
          deleteComment: async function (commentJSON, success, error) {
            let id = commentJSON.id;
            let { err } = await DBStore.removeComment(id);

            if (err) {
              error(err);
            } else {
              success(commentJSON);
            }
          },
          upvoteComment: async function (commentJSON, success, error) {
            let comment_id = commentJSON.id;
            let user_id = currentUser ? currentUser.uid : null;
            let result;

            if (commentJSON.user_has_upvoted) {
              result = await DBStore.addCommentUpvote(user_id, comment_id);
            } else {
              result = await DBStore.removeCommentUpvote(user_id, comment_id);
            }

            if (result.err) error(result.err);
            else success(commentJSON);
          },
        });
      });
    });
  });
}

function resetFilters() {
  $(document).ready(() => {
    const $grid = $("#grid").isotope({
      itemSelector: ".grid-item",
      percentPosition: true,
      masonry: {
        columnWidth: 30,
      },
    });

    $grid.isotope({ filter: "*" });
    console.log("reset all filters");
  });
}

EventStore.on("DesignsChange", renderDesigns);
DBStore.listenForDesignsChange();
