let analytics = firebase.analytics();

let ANALYTICS_EVENTS = {
  CARD_TEXT_MORE_CLICKED: "card_text_more_clicked",
  CARD_LINK_CLICKED: "card_link_clicked",
  CARD_ATTACHMENT_CLICKED: "card_attachment_clicked",
};

function logEvent(eventName, extras) {
  extras.is_authenticated = DBStore.isAuthenticated();
  console.log("Logging event: " + eventName + "\n", extras);
  analytics.logEvent(eventName, extras);
}

function trackMakerSpaceClicks() {
  $(document).ready(() => {
    $("button.card-text").on({
      click: function () {
        let id = $(this).attr("data-target").substring(1);
        let design = DBStore.getDesignsMap()[id];
        logEvent(ANALYTICS_EVENTS.CARD_TEXT_MORE_CLICKED, {
          design_name: design.name,
          design_id: design.id,
          upvotes_at_time: design.upvotes,
        });
      },
    });

    $("a.card-link").on({
      click: function () {
        let id = $(this).attr("design-id");
        let name = $(this).text();
        let design = DBStore.getDesignsMap()[id];
        logEvent(ANALYTICS_EVENTS.CARD_LINK_CLICKED, {
          design_name: design.name,
          design_id: design.id,
          upvotes_at_time: design.upvotes,
          name: name,
        });
      },
    });

    $("a.card-attachment").on({
      click: function () {
        let id = $(this).attr("design-id");
        let name = $(this).text();
        let design = DBStore.getDesignsMap()[id];
        logEvent(ANALYTICS_EVENTS.CARD_ATTACHMENT_CLICKED, {
          design_name: design.name,
          design_id: design.id,
          upvotes_at_time: design.upvotes,
          name: name,
        });
      },
    });
  });
}
