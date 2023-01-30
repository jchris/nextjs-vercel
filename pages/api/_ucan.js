// Next.js API route support: https://nextjs.org/docs/api-routes/introduction



import { provide, capability, URI, Link, Failure, } from '@ucanto/server'
import * as Server from "@ucanto/server"
import * as CAR from "@ucanto/transport/car"
import * as CBOR from "@ucanto/transport/cbor"
import { SigningPrincipal } from "@ucanto/principal"

const Echo = capability({
  can: 'echo/did',
  with: URI.match({ protocol: 'https:' }),
  derives: (claimed, delegated) => true
})

const service = (context) => {
  context.count++
  const did = provide(Echo, ({ capability, invocation }) => {
    return {
      with: capability.with,
      echo: invocation.issuer,
      count: context.count
    }
  })
  return { echo: { did } }
}

export const server = async (context = {count : 0}) => {
  const serverId = await SigningPrincipal.derive(process.env.SERVICE_SECRET)
  return Server.create({
    id: serverId,
    service: service(context),
    decoder: CAR,
    encoder: CBOR,
  })
}
