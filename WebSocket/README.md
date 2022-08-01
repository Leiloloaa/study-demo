# WebSockets

http -> 长连接 -> websocket

## 请求头的改变

```
Connection: Upgrade // 连接升级 升级成什么 看 Upgrade 字段
Upgrade: websocket
Sec-WebSocket-Key: // 这个 key 提供给服务器来验证是否收到一个有效的 WebSockets 请求
Sec-WebSocket-Version: // 版本号
```

## 使用

服务器生成 websocket
```js
const webSocket = require("ws");
const wss = new webSocket.Server({ port: 3000 });

// 操作需要在同一个连接内
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
```

直接使用浏览器访问服务器端口 3000 是没有效果的，因为浏览器的正常访问是使用 http 直接访问的，并不会告诉这个浏览器使用 websockets 连接，所以我们需要在前端生成一个 websockets 实例

新建一个 index.html 作为前端
```js
const ws = new WebSocket('ws://localhost:3000')

ws.addEventListener('open',()=>{
    console.log('连接服务器');
    ws.send(456)
})

ws.addEventListener('message',({data})=>{
    console.log(data);
})
```