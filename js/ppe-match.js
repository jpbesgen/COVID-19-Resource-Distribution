let formHasRendered = false;
function renderForm() {
    console.log("amdeit here");
    let FormComponent = new FormComponent("form-component");

    if(formHasRendered) return;
    ComponentTree.renderAll().then(() => {
        //console.log('rendered carousel');
        formHasRendered = true;
    });
}

renderForm();
// EventStore.on("DesignsChange", renderForm);
// DBStore.listenForDesignsChange();