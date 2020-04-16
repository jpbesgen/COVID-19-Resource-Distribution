let formHasRendered = false;
function renderForm() {
    console.log("made it here");
    let formComponent = new FormComponent("form-component");

    if(formHasRendered) return;
    ComponentTree.renderAll().then(() => {
        formHasRendered = true;
    });
}

renderForm();