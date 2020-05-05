import React, { Component } from "react";

export default class MakerspaceFilter extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <div id="list1" className="dropdown-check-list" tabIndex="100">
                    <span className="anchor">Difficulty</span>
                    <ul className="items">
                        <li><input type="checkbox" onChange={(e) => this.props.filterUpdate("easy", e.target.checked)}/> Easy </li>
                        <li><input type="checkbox" onChange={(e) => this.props.filterUpdate("medium", e.target.checked)}/> Medium </li>
                        <li><input type="checkbox" onChange={(e) => this.props.filterUpdate("difficult", e.target.checked)}/> Difficult </li>
                        
                    </ul>
                </div>
                <div id="list2" className="dropdown-check-list" tabIndex="100">
                    <span className="anchor">Material</span>
                    <ul className="items">
                        <li><input type="checkbox" onChange={(e) => this.props.filterUpdate("fabric", e.target.checked)}/> Fabric </li>
                        <li><input type="checkbox" onChange={(e) => this.props.filterUpdate("elastic", e.target.checked)}/> Elastic </li>
                    </ul>
                </div>
                <div id="list3" className="dropdown-check-list" tabIndex="100">
                    <span className="anchor">Tools Required</span>
                    <ul className="items">
                        <li><input type="checkbox" onChange={(e) => this.props.filterUpdate("sewing-machine", e.target.checked)}/> Sewing Machine </li>
                        <li><input type="checkbox" onChange={(e) => this.props.filterUpdate("3d-printer", e.target.checked)}/> 3D Printer </li>
                    </ul>
                </div>
            </div>
        )
    }
}

let styles = {

};