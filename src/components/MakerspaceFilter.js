import React, { Component } from "react";
import Dropdown from "react-bootstrap/Dropdown";

import '../css/makerspace-filter.css';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div
        ref={ref}
        onClick={(e) => {
        e.preventDefault();
        onClick(e);
        }}
        className="inline"
    >
        {children}
        <svg style={{marginLeft: 6,}} width="9" height="6" viewBox="0 0 9 6" fill="none">
            <path d="M1 1L4.5 4.5L8 1" stroke="#828282" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </div>
));

function TagDropdown(props){
    const items = props.tags.map((tag) =>
        <Dropdown.Item
            key={tag}
            active={props.selectedTags.has(tag)}
            onClick={(e)=> {
                e.preventDefault();
                props.filterUpdate(tag);
            }}
        >
            {tag}
        </Dropdown.Item>
    );
    return (
        <Dropdown className="makerspace-filter">
            <Dropdown.Toggle as={CustomToggle} >
                {props.name}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {items}
            </Dropdown.Menu>
        </Dropdown>
    );
}

function Tag(props) {
    return (
        <span className="makerspace-tag">
            {props.name}
            <svg onClick={props.dismiss} style={{marginLeft: 6, cursor: "pointer", }} width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2 2L11 11M11 2L2 11" stroke="white" strokeWidth="3"/>
            </svg>
        </span>
    );
}

export default class MakerspaceFilter extends Component {
    constructor(props) {
        super(props);
        this.tagsCategories = new Map();
        this.tagsCategories.set('Difficulty', [
            "Easy",
            "Medium",
            "Difficult",
        ]);
        this.tagsCategories.set('Materials', [
            "Fabric",
            "Elastic",
        ]);
        this.tagsCategories.set('Tools Required', [
            "Sewing Machine",
            "3D Printer",
        ]);
        this.state = {
            selectedTags: new Set(),
        }
        this.filterUpdate = this.filterUpdate.bind(this);
        this.removeTag = this.removeTag.bind(this);
    }

	filterUpdate(tag) {
        const alreadyContainsTag = this.state.selectedTags.has(tag);
        //Set state is a pure function, need to calculate state before hand
        this.props.filterUpdate(tag.replace(/\s+/g, '-').toLowerCase(), !alreadyContainsTag);
		this.setState((state, props) => {
            let { selectedTags } = state;
            if (alreadyContainsTag) {
                selectedTags.delete(tag);
            } else {
                selectedTags.add(tag);
            }
			return { selectedTags };
		});
    }

    removeTag(tag) {
        this.setState((state, props) => {
            let { selectedTags } = state;
            selectedTags.delete(tag);
			return { selectedTags };
		});
    }


    render() {
        const dropdowns = [...this.tagsCategories.entries()].map(([key, value]) =>
            <TagDropdown
                key={key}
                name={key}
                tags={value}
                filterUpdate={this.filterUpdate}
                selectedTags={this.state.selectedTags}
            />
        );
        const tags = [...this.state.selectedTags].map((tag) =>
            <Tag key={tag} name={tag} dismiss={(e)=> {
                e.preventDefault();
                this.removeTag(tag);
            }}/>
        );
        return (
            <div className="filters-block">
                <div className="filters-dropdowns-block">
                    {dropdowns}
                </div>
                <div className="tags-block">
                    {tags}
                </div>
            </div>
        )
    }
}

let styles = {

};
