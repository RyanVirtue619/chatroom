import { useEffect } from "react";
export default function ChatLog(props) {
	useEffect(() => {
		var elem = document.getElementById("chat-log");
		elem.scrollTop = elem.scrollHeight;
	}, [props.chatLog]);

	return (
		<div id="chat-log" className="chat-log">
			{props.chatLog.map((chat, idx) => {
				return (
					<div className="chat-item" key={"chat" + idx}>
						<h6>{chat.username}</h6>
						{chat.date ? <h6>{chat.date}</h6> : <></>}
						<h4>{chat.message}</h4>
					</div>
				);
			})}
		</div>
	);
}
