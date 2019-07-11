import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import CreateAccount from './CreateAccount'


describe('CreateAccount component', () => {
    it('renders the given component', () => {
        const wrapper = shallow(<CreateAccount />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})