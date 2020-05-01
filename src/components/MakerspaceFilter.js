import React, { Component } from "react";

export default class MakerspaceFilter extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <div id="list1" class="dropdown-check-list" tabindex="100">
                    <span class="anchor">Difficulty</span>
                    <ul class="items">
                        <li><input type="checkbox" onChange={(e) => this.props.filterUpdate("easy", e.target.checked)}/> Easy </li>
                        <li><input type="checkbox" onChange={(e) => this.props.filterUpdate("medium", e.target.checked)}/> Medium </li>
                        <li><input type="checkbox" onChange={(e) => this.props.filterUpdate("difficult", e.target.checked)}/> Difficult </li>
                        
                    </ul>
                </div>
                <div id="list2" class="dropdown-check-list" tabindex="100">
                    <span class="anchor">Material</span>
                    <ul class="items">
                        <li><input type="checkbox" onChange={(e) => this.props.filterUpdate("fabric", e.target.checked)}/> Fabric </li>
                        <li><input type="checkbox" onChange={(e) => this.props.filterUpdate("elastic", e.target.checked)}/> Elastic </li>
                    </ul>
                </div>
                <div id="list3" class="dropdown-check-list" tabindex="100">
                    <span class="anchor">Tools Required</span>
                    <ul class="items">
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