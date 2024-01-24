export default function MessageInput(props) {
	return (
		<div className="chat-message-input">
			<form onSubmit={props.onSubmit}>
				<input
					type="text"
					name="message-input"
					id="message-input"
					placeholder="Enter message"
					onChange={props.onChange}
					value={props.messageInput}
				/>
			</form>
		</div>
	);
}
