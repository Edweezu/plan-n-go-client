import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import PackingListForm from './PackingListForm'


describe('PackingListForm component', () => {
    const props = {
        tripid: 1
    }

    it('renders the given component', () => {
        const wrapper = shallow(<PackingListForm />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it(`renders the component's given props`, () => {
        const wrapper = shallow(<PackingListForm {...props} />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})