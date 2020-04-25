import React from 'react';
import { useDropzone } from 'react-dropzone';

const FileUpload = (props) => {
	const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

	const files = acceptedFiles.map((file) => (
		<li key={file.path}>
			{file.path} - {file.size} bytes
		</li>
	));

	return (
		<section className="container text-center" style={style.UploadBox}>
			<div {...getRootProps({ className: 'dropzone' })}>
				<input {...getInputProps()} id={props.id} method="Post" />
				<p style={style.Title}>
					Drag and Drop
					<br />
					<b style={{ fontWeight: '300' }}>- or -</b>
					<br />
					Click to Upload
					<hr />
					<div>
						<ul style={style.Files}>{files}</ul>
					</div>
				</p>
			</div>
		</section>
	);
};

const style = {
	UploadBox: {
		border: '3px dashed #3B628B',
		padding: '0',
		margin: '.5rem 0',
	},
	Title: {
		fontSize: '20px',
		color: '#3B628B',
		margin: '0',
		padding: '1rem',
	},
	Files: {
		margin: '0',
		padding: '0',
		listStyleType: 'none',
		color: 'black',
		fonSize: '16px',
		fontWeight: '300',
	},
};

export default FileUpload;
