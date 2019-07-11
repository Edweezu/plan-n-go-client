import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import TripItem from './TripItem'


describe('TripItem component', () => {
    const props = {
        tripid: 1,
        name: 'Seattle',
        startDate: '2019-07-17T00:00:00.000Z',
        endDate: '2019-07-25T00:00:00.000Z'
    }

    it('renders the given component', () => {
        const wrapper = shallow(<TripItem />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it(`renders the component's given props`, () => {
        const wrapper = shallow(<TripItem {...props} />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})