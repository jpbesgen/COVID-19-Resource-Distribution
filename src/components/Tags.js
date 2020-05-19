import React from 'react';

const Tags = (props) => {
	let items = [];
	for (let i = 0; i < props.tags.length; i++) {
		items.push(<span id="makerspace-card-tag">{props.tags[i]}</span>);
	}
	return (
		// loop through list of tags and add to div as span
		<div id="makerspace-card-tag-container">{items}</div>
	);
};

export default Tags;
