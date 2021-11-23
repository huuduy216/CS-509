import React, { useEffect, useState }  from 'react'
import Toolbar from '../component/Navigation/Toolbar/Toolbar'
import Code from '../component/Code/Code'
import CodeDrawer from '../component/Code/CodeDrawer/CodeDrawer'
import axios from '../axios/axios-local'
import ParticlesBg from 'particles-bg'

function Index(){
    const [spaceTreeData, SetSpaceTreeData] = useState([]);

    useEffect(() => {
        let config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        async function fetchData() {
            const response = await axios.get('/normal/getcodetree', config);
            let tree = JSON.stringify(response.data.tree)
            localStorage.setItem('tree', tree);
            // console.log(response.data.DB)
            // props.changeTree(response.data.children);
            SetSpaceTreeData(response.data.tree.children)
        }

        fetchData();
    }, [])

    return (
        <React.Fragment>
            <Toolbar/>
            <Code spaceTreeData={spaceTreeData}/>
            <CodeDrawer/>
            <ParticlesBg type="cobweb" bg={true} />
        </React.Fragment>
    )
}

export default Index;