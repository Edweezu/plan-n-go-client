import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import UpdateTripForm from './UpdateTripForm'


describe('UpdateTripForm component', () => {
    const props = {
        tripid: 1,
        trip: [{
            city: "Seattle",
            end_date: "2019-07-05T00:00:00.000Z",
            id: 1,
            start_date: "2019-06-26T00:00:00.000Z",
            trip_name: "Seattle"
        }]
    }

    it('renders the given component', () => {
        const wrapper = shallow(<UpdateTripForm />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it(`renders the component's given props`, () => {
        const wrapper = shallow(<UpdateTripForm {...props} />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})