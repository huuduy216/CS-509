import React, { useEffect } from 'react'

import { connect } from 'react-redux';
import * as AuthAction from '../store/action/auth';

import axios from '../axios/axios-local'
import Toolbar from '../component/Navigation/Toolbar/Toolbar'
import Code from '../component/Code/Code'

const Employee = (props) => {

   

    useEffect((props) => {
        let config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        async function fetchData(props) {
            const response = await axios.get('/normal/getcodetree', config);
            let tree = JSON.stringify(response.data)
            localStorage.setItem('tree', tree);
            console.log(response.data)
        }
        fetchData();
    }, [])



    return (
        <React.Fragment>
            <Toolbar />
            <Code/>
        </React.Fragment>
    )
}



const mapDispatchToProps = dispatch => {
    return {
      
        changeTree: (treeData) => dispatch(AuthAction.changeTree(treeData)),
     
    }
}

export default connect(null, mapDispatchToProps)(Employee);