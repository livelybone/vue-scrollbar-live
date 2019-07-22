import { shallowMount } from '@vue/test-utils'
import VueScrollbar from '../src/components/Index.vue'

describe('Index.vue', () => {
  it('Rendered', () => {
    const wrapper = shallowMount(VueScrollbar)
    expect(wrapper.find('div').exists()).to.equal(true)
  })
})
