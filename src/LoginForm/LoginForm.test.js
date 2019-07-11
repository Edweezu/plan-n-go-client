import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import LoginForm from './LoginForm'


describe('LoginForm component', () => {
    it('renders the given component', () => {
        const wrapper = shallow(<LoginForm />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})