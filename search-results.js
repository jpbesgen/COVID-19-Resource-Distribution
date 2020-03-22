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
        category: "ppe",
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
        category: "medical parts",
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
        category: "medical parts",
        maker: {
            name: "joe",
            rating: "4"
        }
      },
    ]
  }));
  
  // This is important don't forget it!
  // it makes sure the document is loaded
  $(document).ready(() => {
    
    fillGrid = async () => {
      // This is where the api call goes
      const response = await data;
      
      response.data.forEach(gridItem => {
        // this is where jQuery steps in  
        $('#grid').append(
            `<div class="${gridItem.type} ${gridItem.category} grid-item media">
                <img class="mr-3" src="${gridItem.image}" alt="Item" />
                <div class="media-body">
                    <h5 class="mt-0">${gridItem.name} - quantity: ${gridItem.quantity}</h5>
                    ${gridItem.description}
                </div>
                <a href="./order-page.html">
                    <button type="button" class="btn btn-outline-dark btn-lg order-button">
                        Order
                    </button>
                </a>
            <div>`
        );
      })
    }
    
    fillGrid()
  })