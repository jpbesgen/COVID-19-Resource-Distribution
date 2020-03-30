let designCards = {},
    latestSnapshot = null,
    initialRendered = false;

// TODO:
// Take the array of design data and format into a bootstrap card
// and append each card to the view.
function renderDesigns(designs) {
    $(document).ready(() => {

    const $grid = $('#grid').isotope({
      itemSelector: '.grid-item',
      percentPosition: true,
      masonry: {
        columnWidth: 30
      }
    });

    $('.dropdown-menu').on( 'click', 'button', function() {
      const filterValue = $( this ).attr('data-filter');
      console.log(filterValue);
      console.log($grid);
      // use filterFn if matches value
      // filterValue = filterFns[ filterValue ] || filterValue;
      $grid.isotope({ filter: filterValue });
    });

    fillGrid = async () => {
        let grid = document.getElementById("grid");
        if(grid == null) return;
        designs.forEach(gridItem => {
            if(designCards[gridItem.id] != null) {
                EventStore.publish("DesignCardChange-" + gridItem.id, {
                    design: gridItem
                });
                return;
            }
            let design_id = "design-" + gridItem.id;
            let newDesign = new DesignCardComponent(design_id, {
                design: gridItem,
            });
            designCards[gridItem.id] = newDesign;

            // Create the container for each design to embed in
            var $items = $(
            `
                <div id="${design_id}" class="grid-item card ${gridItem.type} ${gridItem.category} certified-${gridItem.certified} printer-${gridItem.printerRequired}" style="width: 18em;">
                
                </div>
            `);
            // append items to grid
            // $grid.append( $items )
                // .isotope( 'appended', $items );


            $grid.append( $items )
                .isotope( 'appended', $items );
        });
    }

    fillGrid().then(() => {
        ComponentTree.renderAll().then(() => {
            if(!initialRendered) {
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

    });
  });
}

EventStore.on("DesignsChange", renderDesigns);
DBStore.listenForDesignsChange();
