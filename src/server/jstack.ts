// import { env } from "hono/adapter" <--- If you use env binding
import { jstack } from "jstack"

// 👇 Your env binding here
// type Env = {
//   Bindings: {}
// }

// 👇 If you use env binding
// export const j = jstack.init<Env>()

export const j = jstack.init()

/**
 * Public (unauthenticated) procedures
 *
 * This is the base piece you use to build new queries and mutations on your API.
 */
export const publicProcedure = j.procedure
