import { mount } from 'svelte'
import Widget from './components/Widget.svelte'

const app = mount(Widget, {
  target: document.getElementById('app')!
})

export default app
