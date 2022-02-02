import { TypedEvent } from './TypedEvent'

export default {
  browserReady: new TypedEvent(),
  requestComplete: new TypedEvent<string>()
}
