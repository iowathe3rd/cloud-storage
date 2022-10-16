import React from "react";

function Input(props) {
	return (
		<input
			type={props.type}
			placeholder={props.placeholder}
			className="input input-bordered w-full max-w-xs"
			onChange={props.onChange}
			value={props.value}
			autoComplete="on"
		/>
	);
}

export default Input;
