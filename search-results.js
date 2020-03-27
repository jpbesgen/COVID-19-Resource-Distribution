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
              <h5 class="card-title text-dark">${gridItem.name} - quantity: ${gridItem.quantity}</h5>
              <p class="card-title text-dark">Quantity: ${gridItem.quantity}</p>
              <p class="card-text">${gridItem.description}</p>
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
