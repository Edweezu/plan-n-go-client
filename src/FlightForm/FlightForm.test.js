import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import FlightForm from './FlightForm'


describe('FlightForm component', () => {
    const props = {
        tripid: 1
    }

    it('renders the given component', () => {
        const wrapper = shallow(<FlightForm />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it(`renders the component's given props`, () => {
        const wrapper = shallow(<FlightForm {...props} />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})