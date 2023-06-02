import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@mui/material'


const Togglable = forwardRef((props, refs) => {




    const [blogFormVisible, setBlogFormVisible] = useState(false)
    
    const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
    const showWhenVisible = { display: blogFormVisible ? '' : 'none' }
    
    const toggleVisibility = () => {
      setBlogFormVisible(!blogFormVisible)
    }

    useImperativeHandle(refs, () => {
        return {
          toggleVisibility: toggleVisibility
        }
      })
    
    return (
      <div>
    <div style={hideWhenVisible}>
    <Button variant="contained" color="primary" onClick={toggleVisibility}>{props.buttonLabel}</Button>
    </div>
    <div style={showWhenVisible}>
    <Button variant="contained" color="primary" onClick={toggleVisibility}>cancel</Button>
    {props.children}
    </div>
    </div>
    )
    })

    Togglable.propTypes = {
      buttonLabel: PropTypes.string.isRequired
    }

    Togglable.displayName = 'Togglable'


    export default Togglable