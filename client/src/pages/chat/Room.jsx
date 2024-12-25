import React, { useState, useEffect, useCallback, useRef } from "react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import axios from "axios";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
const API_GATEWAY_ID = "0csvixoi5c";
const SOCKET_API_GATEWAY_ID = "olz92flbad";
const Room = ({curUser}) => {
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(Math.random().toString());
  const [websocket, setWebsocket] = useState(null);
  const [isSent, setIsSent] = useState(false);
  const webSocket = useRef(null);
  // Close WebSocket
  const closeWebSocket = useCallback(() => {
    if (webSocket.currnet) {
      webSocket.currnet.close();
      setWebsocket(null);
    }
  }, [websocket]);
  // Connect to WebSocket
  const connectToWebSocket = useCallback(() => {
    const address = `wss://${SOCKET_API_GATEWAY_ID}.execute-api.us-west-1.amazonaws.com/dev`;
    webSocket.current = new WebSocket(address);
    console.log(webSocket.current);
    webSocket.current.onopen = () => {
      console.log("WebSocket connection opened");
      webSocket.current.send(JSON.stringify({ message: "ping" }));
    };
    webSocket.current.onmessage = (message) => {
      console.log("RECEVIED!!!", message);
      const data = JSON.parse(message.data);
      if (data && data.message) {
        setMessages((prevMessages) => [...prevMessages, data]);
      }
      // onMessageReceived(data);
    };
    webSocket.current.onclose = () => {
      console.log("WebSocket connection closed");
      closeWebSocket();
    };
    webSocket.current.onerror = (error) => {
      console.error("WebSocket error:", error);
      closeWebSocket();
    };
    // setWebsocket(ws);
  }, [closeWebSocket]);
  // Handle incoming messages
  const onMessageReceived = useCallback((message) => {
    console.log("Message received:", message);
    if (message.timestamp) {
      setMessages((prevMessages) => [...prevMessages, message]);
    }
  }, []);

  
  useEffect( () => {
    const address = `wss://${SOCKET_API_GATEWAY_ID}.execute-api.us-west-1.amazonaws.com/dev?user_id=test&room_id=test`;
    webSocket.current = new WebSocket(address);
    console.log(webSocket.current);
    webSocket.current.onopen = () => {
      console.log("WebSocket connection opened");
      webSocket.current.send(JSON.stringify({ message: "ping" }));
    };
    webSocket.current.onmessage = (message) => {
      console.log("RECEVIED!!!", message);
      const data = JSON.parse(message.data);
      if (data && data.message) {
        setMessages((prevMessages) => [...prevMessages, data]);
      }
      // onMessageReceived(data);
    };
    webSocket.current.onclose = () => {
      console.log("WebSocket connection closed");
      closeWebSocket();
    };
    webSocket.current.onerror = (error) => {
      console.error("WebSocket error:", error);
      closeWebSocket();
    };
    const fetchMessages = async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: `https://${API_GATEWAY_ID}.execute-api.us-west-1.amazonaws.com/dev/chat`,
          params: { room_id: "test" }
        });
        console.log(response)
        setMessages(response.data || []); // 초기 상태가 없을 경우 빈 배열 설정
        setUserId(Math.random().toString()); // User ID 설정
        // connectToWebSocket(); 
      } catch (error) {
        console.error("Error fetching messages:", error);
        setMessages([]); // 오류 시 빈 배열로 초기화
      }
    };
  
    fetchMessages(); // 메시지 로드
    return () => closeWebSocket();
  }, []); 
  // Send a message
  const onSend = async (message) => {
    // console.log(websocket.readyState)
    console.log(WebSocket.OPEN)
    if (webSocket.current.readyState === WebSocket.OPEN) {
    try {
      await axios.put(
        `https://${API_GATEWAY_ID}.execute-api.us-west-1.amazonaws.com/dev/chat`,
        {
          room_id: "test",
          text: message,
          user_id: userId,
          name: "name_test",
        }
      );
      setIsSent(!isSent);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }
  };
  // Generate message list
  const getMessageList = () => {
    return messages.map((message) => (
      <Message
        key={message.timestamp}
        model={{
          message: message.message,
          sentTime: "just now",
          sender: "Joe",
          direction: userId === message.user_id ? "outgoing" : "incoming",
        }}
      />
    ));
  };
  return (
    <div style={{ position: "relative", height: "500px" }}>
      <MainContainer>
        <ChatContainer>
          <MessageList>{
            messages.map((message) => (
            <>
            <Message
              key={message.timestamp}
              model={{
                message: message.message,
                sentTime: "just now",
                sender: "Joe",
                direction: userId === message.user_id ? "outgoing" : "incoming",
              }}
              
            />
            </>
          ))}</MessageList>
          <MessageInput placeholder="Type message here" onSend={onSend} />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};
export default Room;