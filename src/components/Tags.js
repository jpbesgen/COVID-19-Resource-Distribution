import React from 'react';

function formatMaterialOrTool(tag) {
	switch(tag) {
		case "petg":
			return "PETG";
		case "pvc":
			return "PVC";
		case "polycarbonateSheets":
			return "Polycarbonate4";
		case "cottonFabric":
			return "Cotton";
		case "elastic":
			return "Elastic";
		case "threeDPrinter":
			return "3D Printer";
		case "sewingMachine":
			return "Sewing Machine";
		case "laserCutter":
			return "Laser Cutter";
		default:
			return "Other";
	}
}

const Tags = (props) => {
	let items = [];
	for (let i = 0; i < props.tags.materials.length; i++) {
		if (props.tags.materials[i] != "other") {
			items.push(<span id="makerspace-card-tag">{formatMaterialOrTool(props.tags.materials[i])}</span>);
		}
	}
	for (let i = 0; i < props.tags.tools.length; i++) {
		if (props.tags.tools[i] != "none") {
			items.push(<span id="makerspace-card-tag">{formatMaterialOrTool(props.tags.tools[i])}</span>);
		}
	}
	return (
		// loop through list of tags and add to div as span
		<div id="makerspace-card-tag-container">{items}</div>
	);
};

export default Tags;
