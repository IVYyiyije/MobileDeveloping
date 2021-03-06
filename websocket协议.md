# websocket协议

### 概念

WebSocket 是基于TCP/IP协议，独立于HTTP协议的通信协议。

WebSocket 是双向通讯，有状态，客户端一（多）个与服务端一（多）双向实时响应（客户端 ⇄ 服务端）。

WebSocket 是应用在浏览器的 Socket （是 Socket 模型接口的实现），Socket 是一个网络通信接口 （通信规范）。

### WebSocket协议出现的背景

我们在上网过程中经常用到的是HTTP和HTTPS协议，HTTP协议和HTTPS协议通信过程通常是客户端通过浏览器发出一个请求，服务器接受请求后进行处理并返回结果给客户端，客户端处理结果。
 这种机制对于信息变化不是特别频繁的应用可以良好支撑，但对于实时要求高、海量并发的应用来说显得捉襟见肘，尤其在移动互联网蓬勃发展的趋势下，高并发与用户实时响应是Web应用经常面临的问题，比如金融证券的实时信息、社交网络的实时消息推送等。
 WebSocket出现前我们实现推送技术，用的都是轮询，在特定的时间间隔，浏览器自动发出请求，将服务器的消息主动的拉回来，这种情况下，我们需要不断的向服务器发送请求，并且HTTP 请求 的header非常长，里面包含的数据可能只是一个很小的值，这样会占用很多的带宽和服务器资源，并且服务器不能主动向客户端推送数据。在这种情况下需要一种高效节能的双向通信机制来保证数据的实时传输，于是基于HTML5规范的WebSocket应运而生。

### WebSocket与HTTP

了解WebSocket的出现背景后，应该对WebSocket有了一些认知。一句话概括：
 WebSocket是HTML5下一种新的协议。它实现了浏览器与服务器全双工通信，能更好的节省服务器资源和带宽并达到实时通讯的目的。

#### WebSocket与TCP，HTTP的关系

WebSocket与http协议一样都是基于TCP的，所以他们都是可靠的协议，调用的WebSocket的send函数在实现中最终都是通过TCP的系统接口进行传输的。WebSocket和Http协议一样都属于应用层的协议，WebSocket在建立握手连接时，数据是通过http协议传输的，但是在建立连接之后，真正的数据传输阶段是不需要http协议参与的。

#### WebSocket与HTTP轮询

HTTP实现实时推送用到的轮询，轮询分两种：长轮询和短轮询（传统轮询）

WebSocket的出现解决了轮询实时交互性和全双工的问题。
 在JavaScript中创建了WebSocket后，会有一个HTTP请求发送到服务器以发起连接。取得服务器响应后，建立的连接使用HTTP升级，从HTTP协议交换为WebSocket协议。即，使用标准的HTTP服务器无法实现WebSocket，只有支持这种协议的专门服务器才能正常工作。
 WebSocket使用了自定义的协议，未加密的连接不再是http://，而是ws://，默认端口为80，加密的连接也不是https://，而是wss://，默认端口为443。

