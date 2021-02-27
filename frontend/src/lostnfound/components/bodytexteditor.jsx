import React, { useState } from "react";
import RichTextEditor from "react-rte";

const BodyTextEditor = (props) => {
	const [value, setValue] = useState(RichTextEditor.createEmptyValue());
	const onChange = (value) => {
		setValue(value);
		if (props.onChange) {
			props.onChange(value.toString("html"));
		}
	};

	return <RichTextEditor value={value} onChange={onChange} />;
};

export default BodyTextEditor;
