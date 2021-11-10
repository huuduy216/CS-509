import React, { useEffect, useState } from 'react'

import { connect } from 'react-redux';
import * as AuthAction from '../store/action/auth';

import axios from '../axios/axios-local'
import Toolbar from '../component/Navigation/Toolbar/Toolbar'
import Code from '../component/Code/Code'
import ParticlesBg from 'particles-bg'


const Employee = (props) => {

    const [spaceTreeData, SetSpaceTreeData] = useState([]);

    useEffect(() => {
        let config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        async function fetchData() {
            const response = await axios.get('/normal/getcodetree', config);
            let tree = JSON.stringify(response.data)
            localStorage.setItem('tree', tree);
            // console.log(response.data.children)
            // props.changeTree(response.data.children);
            SetSpaceTreeData(response.data.children)
        }

        fetchData();
    }, [])


    return (
        <React.Fragment>
            <Toolbar />
            <Code spaceTreeData={spaceTreeData} />
            <ParticlesBg type="cobweb" bg={true} />

        </React.Fragment>
    )
}



const mapDispatchToProps = dispatch => {
    return {

        changeTree: (treeData) => dispatch(AuthAction.changeTree(treeData)),

    }
}

export default connect(null, mapDispatchToProps)(Employee);