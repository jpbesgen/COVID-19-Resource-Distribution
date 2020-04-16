class FormComponent extends Component {
    constructor(id, props) {
        super(id || null);
        this.props = props;
    }

    afterCall() {
    }

    render() {

        return `
            <p>test</p>
        `;
    }
}
