let analytics = firebase.analytics();

function logEvent(eventName, extras) {
  console.log('Logging event: ' + eventName +'\n', extras);
  analytics.logEvent(eventName, extras);
}

function trackMakerSpaceClicks() {
  $(document).ready(()=> {
    $('button.card-text').on({
      click: function() {
        let id = $(this).attr('data-target').substring(1);
        let design = DBStore.getDesignsMap()[id];
        logEvent('card_text_more_clicked', {
          design_name: design.name,
          design_id: design.id,
          upvotes_at_time: design.upvotes,
        });
      }
    });
  });
}
