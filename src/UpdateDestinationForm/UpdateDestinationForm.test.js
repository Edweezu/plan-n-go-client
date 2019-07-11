import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import UpdateDestinationForm from './UpdateDestinationForm'


describe('UpdateDestinationForm component', () => {
    const props = {
        tripid: 1,
        destinationid: 1
    }

    it('renders the given component', () => {
        const wrapper = shallow(<UpdateDestinationForm />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it(`renders the component's given props`, () => {
        const wrapper = shallow(<UpdateDestinationForm {...props} />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})