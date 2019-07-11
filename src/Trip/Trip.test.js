import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import Trip from './Trip'


describe('Trip component', () => {
    it('renders the given component', () => {
        const match = { params: { id: 1} }
        const wrapper = shallow(<Trip match={match} />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})