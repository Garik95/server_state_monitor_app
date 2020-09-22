const express = require('express')
const app = express()
var net = require('net');

const hosts =[]

app.get('/', (req, res) => {
    x = [];
    hosts.forEach(host => {
        x.push(host.IP)
    })
    const distinct = (value,index,self) => {
        return self.indexOf(value) == index;
    }

    console.log(x.filter(distinct))
    res.send(x.filter(distinct))
})

var server = net.createServer(function(socket) {
    socket.on('data',async (data) => {
        hosts.push({'IP':socket.remoteAddress,'tmp':Date.now()});
    });
    socket.pipe(socket);
});

setInterval(() => {
    hosts.forEach((host,i) =>{
        if(host.tmp + 5 < Date.now()){
            hosts.splice(i,1)
        }
})},6000)

app.listen(4001);
server.listen(4000, '0.0.0.0');
