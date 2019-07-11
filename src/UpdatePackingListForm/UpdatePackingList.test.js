import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import UpdatePackingListForm from './UpdatePackingListForm'


describe('UpdatePackingListForm component', () => {
    const props = {
        tripid: 1,
        itemid: 1
    }

    it('renders the given component', () => {
        const wrapper = shallow(<UpdatePackingListForm />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it(`renders the component's given props`, () => {
        const wrapper = shallow(<UpdatePackingListForm {...props} />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})