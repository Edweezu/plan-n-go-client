import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import AddTrip from './AddTrip'


describe('AddTrip component', () => {
    it('renders the given component', () => {
        const wrapper = shallow(<AddTrip />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})