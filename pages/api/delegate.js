// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { server } from "./_ucan"

const serverContext = { count: 0 }
const echoServer = server(serverContext)

export default function handler(request, response) {
// this should give the reqeuster did a delegation to use the echo service
  echoServer.request({
    headers: request.headers,
    body: request.body,
  }).then(({ headers, body }) => {
    response.writeHead(200, headers)
    response.write(body)
    response.end()
  })
}
