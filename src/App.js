import { useState, useEffect } from "react";
import { format } from "date-fns";
import "./App.css";
import Chat from "./Chat";
import LoginPage from "./LoginPage";

function App(props) {
	const [username, setUsername] = useState("Test user");
	const [messageInput, setMessageInput] = useState("");
	const [chatLog, setChatLog] = useState([]);
	const [appState, setAppState] = useState("login");
	const onChange = (evt) => setMessageInput(evt.target.value);

	useEffect(() => {
		props.firebase
			.database()
			.ref("chatlog")
			.on("value", (snapshot) => {
				let items = snapshot.val();
				if (items) {
					items = Object.values(items);
				} else {
					items = [];
				}
				setChatLog(items);
			});
	}, [props.firebase]);

	const onSubmit = function (e) {
		e.preventDefault();
		if (messageInput.length === 0) return;
		let curdate = new Date();
		let payload = {
			message: messageInput,
			username: username,
			date: format(curdate, "yyyy-MM-dd"),
		};
		props.firebase.database().ref("chatlog").push(payload);
		setMessageInput("");
	};

	const onLogin = function (username) {
		setUsername(username);
		setAppState("chat");
	};

	return (
		<div className="app">
			{appState === "login" ? (
				<LoginPage onLogin={onLogin} />
			) : (
				<Chat
					username={username}
					chatLog={chatLog}
					messageInput={messageInput}
					onChange={onChange}
					onSubmit={onSubmit}
				/>
			)}
		</div>
	);
}

export default App;
