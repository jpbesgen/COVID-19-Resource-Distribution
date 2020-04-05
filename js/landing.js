let hasRendered = false;
function renderLanding() {
    let LandingCarousel = new LandingCarouselComponent("card-carousel");
    
    if(hasRendered) return;
    ComponentTree.renderAll().then(() => {
        console.log('rendered carousel');
        hasRendered = true;
    });
}

EventStore.on("DesignsChange", renderLanding);
DBStore.listenForDesignsChange();