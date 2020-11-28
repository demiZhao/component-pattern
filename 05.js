// prop collections

import React from 'react'
import {Switch} from '../switch'

const callAll = (...fns) => (...args) =>
  fns.forEach((fn) => fn && fn(args))

class Toggle extends React.Component {
  state = {on: false}
  toggle = () =>
    this.setState(
      ({on}) => ({on: !on}),
      () => this.props.onToggle(this.state.on),
    )
  getStateAndHelpers() {
    return {
      on: this.state.on,
      toggle: this.toggle,
      // In our last usage example, you'll notice that we had some
      // common props (`onClick`, and we're also missing `aria-pressed`
      // value on the `button`). Because most users will want these
      // props applied to the button they render, we can add a collection
      // of props as a convenience for them.
      //
      // 🐨 Add a `togglerProps` object that has an `aria-pressed` (should
      // be set to the value of the `on` state), and an `onClick` assigned
      // to the toggle function.
      // togglerProps: {
      //   onClick: this.toggle,
      //   'aria-pressed': this.state.on,
      // },
      getTogglerProps: ({onClick, ...props}) => {
        return {
          //on: this.state.on,
          'aria-pressed': this.state.on,
          // onClick: (...args) => {
          //   onClick && onClick(...args)
          //   this.toggle()
          // },
          onClick: callAll(onClick, this.toggle),
          ...props,
        }
      },
    }
  }
  render() {
    return this.props.children(this.getStateAndHelpers())
  }
}

// Don't make changes to the Usage component. It's here to show you how your
// component is intended to be used and is used in the tests.
// You can make all the tests pass by updating the Toggle component.
function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  const onButtonClick = () => alert('button clicked!')
  return (
    <Toggle onToggle={onToggle}>
      {({on, getTogglerProps}) => (
        <div>
          <Switch {...getTogglerProps({on})} />
          <hr />
          <button
            aria-label="custom-button"
            {...getTogglerProps({onClick: onButtonClick})}
          >
            {on ? 'on' : 'off'}
          </button>
        </div>
      )}
    </Toggle>
  )
}
Usage.title = 'Prop Collections'

export {Toggle, Usage as default}
