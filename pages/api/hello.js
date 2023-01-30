// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { server } from "./_ucan"

const serverContext = { count: 0 }
const echoServer = server(serverContext)

export default function handler(request, response) {
  echoServer.request({
    headers: request.headers,
    body: request.body,
  }).then(({ headers, body }) => {
    response.writeHead(200, headers)
    response.write(body)
    response.end()
  })
}
