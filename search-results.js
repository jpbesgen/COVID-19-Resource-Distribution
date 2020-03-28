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
        id: "1",
        maker: {
            name: "bob",
            rating: "4"
        }
      },
      {
        image: "./img/team1.png",
        name: "n-95 masks",
        quantity: "70",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
        type: "mask",
        category: "PPE",
        id: "2",
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
        id: "3",
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
        id: "4",
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
        id: "5",
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

    // const $grid = $('#grid').isotope({
    //   itemSelector: '.grid-item'
    // });

    // $('.filters-button-group').on( 'click', 'button', function() {
    //   const filterValue = $( this ).attr('data-filter');
    //   console.log(filterValue);
    //   console.log($grid);
    //   // use filterFn if matches value
    //   // filterValue = filterFns[ filterValue ] || filterValue;
    //   $grid.isotope({ filter: filterValue });
    // });

    fillGrid = async () => {
      // This is where the api call goes
      const response = await data;
      
      response.data.forEach(gridItem => {
        // this is where jQuery steps in  
        // var $items = $(
        $('#grid').append(
          `
          <div class="card ${gridItem.type} ${gridItem.category} grid-item">
            <img class="card-img-top" src="${gridItem.image}" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title text-dark">${gridItem.name}</h5>
              <p class="card-title text-dark">Quantity: ${gridItem.quantity}</p>
              <p class="card-text">${gridItem.description}</p>
              <hr style="border-top: 1px solid black;margin: 0;" />
              <ul class="list-group list-group-flush text-center">
                <li class="list-group-item">
                  <button class="btn btn-block" data-toggle="modal" data-target="#${gridItem.id}">See More</button>
                </li>
                <li class="list-group-item"><button class="btn btn-block">upvote</button></li>
                <li class="list-group-item"><button class="btn btn-block">downvote</button></li>
              </ul>
            </div>
          </div>

          <div class="modal fade" id="${gridItem.id}" tabindex="-1" role="dialog" aria-labelledby="${gridItem.id}ModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="${gridItem.id}ModalLabel">${gridItem.name}</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <img class="card-img-top" src="${gridItem.image}" alt="Card image cap">
                  <p class="card-title text-dark">Quantity: ${gridItem.quantity}</p>
                  ${gridItem.description}
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
          `
        );

        // append items to grid
        // $grid.append( $items )
            // .isotope( 'appended', $items );
      })

    }

    fillGrid()
  })
