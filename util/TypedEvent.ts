/**
 * An eventManager, but typed to prevent errors.
 * @example
 * type Payload = {ready: boolean}
 * const networkStateChange = new TypedEvent<Payload>()
 * const handler = (payload: Payload) => console.log(payload)
 * event.sub(handler)
 * event.dispatch({ready: true})
 * event.unsub(handler)
 * @example
 * const misakaStateChange = new TypedEvent<{selfDestructionInProgress: boolean}>()
 * const unsub = event.sub(console.log) // returns unsub function without define handler outside.
 * unsub()
 * @example
 * export const eventBus = {
 *   alice: new TypedEvent(),
 *   bob: new TypedEvent<{isE2eEncryption: boolean}>()
 * }
 * eventBus.bob.dispatch({isE2eEncryption: true})
 *
 * @class TypedEvent
 * @member sub      Subscribe to event. Returns an unsub method that does not require original callback.
 * @member unsub    Unsubscribe to event. Require original callback.
 * @member dispatch Simply dispatch payload to every subscriber.
 * @member once     Only subscribe once.
 */

type cb<T> = (payload: T) => void;
export class TypedEvent<T = void> {
  constructor (dispatchLastValueOnSubscribe?: boolean) {
    this.enableHistory = !!dispatchLastValueOnSubscribe
  }

  private readonly enableHistory: boolean = false;
  private history: T[] = [];
  private cbs: Array<cb<T>> = [];
  public sub (cb: cb<T>) {
    this.cbs.push(cb)
    if (this.enableHistory && this.history.length > 0) cb(this.history[0])
    return () => this.unsub(cb)
  }

  public unsub (cb: cb<T>) {
    const index = this.cbs.indexOf(cb)
    if (index === -1) return
    this.cbs.splice(index, 1)
  }

  public dispatch (payload: T) {
    this.cbs.map(v => v(payload))
    if (this.enableHistory) this.history = [payload]
  }

  public once (cb: cb<T>) {
    this.sub((arg: T) => {
      cb(arg)
      this.unsub(cb)
    })
  }
}
