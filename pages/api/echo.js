// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { server } from "./_ucan"

const serverContext = { count: 0 }
var echoServer;
server(serverContext).then(theServer => {
  echoServer = theServer;
})

export default function handler(request, response) {
  if (echoServer) {
    const requestBody = request.body;
    // use TextEncoder to convert the request body, which is a string, to a Uint8Array
    // https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder
    const encoder = new TextEncoder();
    const view = encoder.encode(requestBody);

    console.log(typeof requestBody)    
    echoServer.request({
      headers: request.headers,
      body: view,
    }).then(({ headers, body }) => {
      response.writeHead(200, headers)
      response.write(body)
      response.end()
    }).catch(err => {
      console.log(err)
      response.writeHead(500)
      response.write(`Server error ${err}`)
      response.end()
    })
  } else {
    response.writeHead(500)
    response.write("Still launching server, please try again in a few seconds")
    response.end()
  }
}
