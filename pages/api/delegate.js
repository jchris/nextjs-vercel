// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { server } from "./_ucan"

const serverContext = { count: 0 }
var echoServer;
server(serverContext).then(theServer => {
  echoServer = theServer;
  // console.log("echoServerDID", echoServer.id)

})



export default function handler(request, response) {
// this should give the reqeuster did a delegation to use the echo service
var enc = new TextEncoder();
// console.log('request',  request)
  echoServer.request({
    headers: {'content-type':'application/car',...request.headers},
    body: enc.encode(request.body),
  }).then(({ headers, body }) => {
// console.log('response', headers, body)
    response.writeHead(200, headers)
    response.write(body)
    response.end()
  })
}
