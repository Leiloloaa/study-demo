const webSocket = require("ws");
const wss = new webSocket.Server({ port: 3000 });

wss.on("connection", (ws) => {
  console.log("连接");

  ws.on("message", (data) => {
    ws.send(data + "123");
  });

  // 断开连接 要在单一的连接中操作
  ws.on("close", () => {
    console.log("关闭");
  });
});
