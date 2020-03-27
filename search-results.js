// Ignore this part, just pretend that it's 
// our data from our API
const data = new Promise(res => res({
    data: [
      {
        image: "./img/team1.png",
        name: "n-95 masks",
        quantity: "70",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
        type: "mask",
        category: "PPE",
        maker: {
            name: "bob",
            rating: "4"
        }
      },
      {
        image: "./img/team2.png",
        name: "3d printed ventilator",
        quantity: "2",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
        type: "ventilator",
        category: "medical-parts",
        maker: {
            name: "dove",
            rating: "4"
        }
      },
      {
        image: "./img/team2.png",
        name: "3d printed ventilator",
        quantity: "2",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
        type: "ventilator",
        category: "medical-parts",
        maker: {
            name: "joe",
            rating: "4"
        }
      },
      {
        image: "./img/team3.png",
        name: "Hand Sanitizor",
        quantity: "15 Liters",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
        type: "other",
        category: "other",
        maker: {
            name: "bill",
            rating: "5"
        }
      },
    ]
  }));

  // This is important don't forget it!
  // it makes sure the document is loaded
  $(document).ready(() => {
    
    const $grid = $('#grid').isotope({
      itemSelector: '.grid-item'
    });

    $('.filters-button-group').on( 'click', 'button', function() {
      const filterValue = $( this ).attr('data-filter');
      console.log(filterValue);
      console.log($grid);
      // use filterFn if matches value
      // filterValue = filterFns[ filterValue ] || filterValue;
      $grid.isotope({ filter: filterValue });
    });

    fillGrid = async () => {
      // This is where the api call goes
      const response = await data;
      
      response.data.forEach(gridItem => {
        // this is where jQuery steps in  
        var $items = $(
          `<div class="${gridItem.type} ${gridItem.category} grid-item media">
          <img class="mr-3" src="${gridItem.image}" alt="Item" />
          <div class="media-body">
              <h5 class="mt-0">${gridItem.name} - quantity: ${gridItem.quantity}</h5>
              ${gridItem.description}
          </div>
              <button type="button" class="btn btn-outline-dark btn-lg order-button" data-toggle="modal" data-target="#orderModal">
                  Order
              </button>        
      <div>

      <div class="modal fade" id="orderModal" tabindex="-1" role="dialog" aria-labelledby="orderModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="orderModalLabel">Your Order: ${gridItem.name}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">

                    <div class="card mb-4" style="width: 100%;">
						<img src="${gridItem.image}" class="card-img-top" alt="Item" style="width: 100%;">
						<div class="card-body">
						  <h5 class="card-title">${gridItem.name} - ${gridItem.quantity}</h5>
						  <p class="card-text">${gridItem.description}</p>
						</div>
          </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary">Order</button>
                  </div>
                </div>
              </div>
            </div>
      
      `
        );

        // append items to grid
        $grid.append( $items )
            .isotope( 'appended', $items );
      })

    }

    fillGrid()
  })
