import { mount } from '@vue/test-utils'
import { TresLeches, useControls } from '/@/'
import { it, expect, describe } from 'vitest'
import { defineComponent, nextTick } from 'vue'

class Vector3 {
  constructor( x = 0, y = 0, z = 0 ) {

		Vector3.prototype.isVector3 = true;

		this.x = x;
		this.y = y;
		this.z = z;

	}

  set( x, y, z ) {

		if ( z === undefined ) z = this.z; // sprite.scale.set(x,y)

		this.x = x;
		this.y = y;
		this.z = z;

		return this;

	}

  *[ Symbol.iterator ]() {

		yield this.x;
		yield this.y;
		yield this.z;

	}
}
describe('Vector Control', async () => {
  it('should render 3 numeric inputs', async ()=> {
    const component = defineComponent({
      template: `
        <TresLeches />
      `,
      components: {
        TresLeches
      },
      setup() {
        const { position } = useControls({ position: new Vector3(0, 2, 4) })
        return {
          position
        }
      }
    })
    const wrapper = mount(component, {
      components: {
        TresLeches
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.findAll('input[type="number"]').length).toBe(3)
  })
  it('should render a number control with a label', async ()=> {
    const component = defineComponent({
      template: `
        <TresLeches />
      `,
      components: {
        TresLeches
      },
      setup() {
        const { position } = useControls({ position: new Vector3(0, 2, 4) })
        return {
          position
        }
      }
    })

    const wrapper = mount(component, {
      components: {
        TresLeches
      },
    })
    expect(wrapper.find('label').text()).toBe('position')
  })
  it('should change the value of the control when any of the input changes', async ()=> {
    const component = defineComponent({
      template: `
        <TresLeches />
      `,
      components: {
        TresLeches
      },
      setup() {
        const { position } = useControls({ position: new Vector3(0, 2, 4) })
        return {
          position
        }
      }
    })

    const wrapper = mount(component, {
      components: {
        TresLeches
      },
    })
    const inputs = wrapper.findAll('input[type="number"]')

    await inputs[0].setValue(20)
    await inputs[1].setValue(-20)
    await inputs[2].setValue(-1)
    await nextTick();
    console.log(wrapper.vm.position)
    expect(wrapper.vm.position.x).toBe(20)
    expect(wrapper.vm.position.y).toBe(-20)
    expect(wrapper.vm.position.z).toBe(-1)
  })
  // TODO: mouseDown
})