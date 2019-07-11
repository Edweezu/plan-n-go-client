import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import DestinationForm from './DestinationForm'


describe('DestinationForm component', () => {
    const props = {
        tripid: 1
    }

    it('renders the given component', () => {
        const wrapper = shallow(<DestinationForm />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it(`renders the component's given props`, () => {
        const wrapper = shallow(<DestinationForm {...props} />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})