import { mount } from 'svelte'
import MeetingBar from './components/MeetingBar.svelte'

const app = mount(MeetingBar, {
  target: document.getElementById('app')!
})

export default app
