import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import UpdateFlightForm from './UpdateFlightForm'


describe('UpdateFlightForm component', () => {
    const props = {
        tripid: 1,
        flightid: 1
    }

    it('renders the given component', () => {
        const wrapper = shallow(<UpdateFlightForm />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it(`renders the component's given props`, () => {
        const wrapper = shallow(<UpdateFlightForm {...props} />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})