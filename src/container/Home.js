import React, { useEffect, useState } from 'react'
import Toolbar from '../component/Navigation/Toolbar/Toolbar'
import Code from '../component/Code/Code'
import CodeDrawer from '../component/Code/CodeDrawer/CodeDrawer'
import axios from '../axios/axios-local'
import ParticlesBg from 'particles-bg'

import Texty from 'rc-texty';
import 'rc-texty/assets/index.css';

function Index() {
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
            SetSpaceTreeData(response.data.tree.children)
        }

        fetchData();
    }, [])

    let description1="CodeSpace is a programming website for researcher who wants to create a collaborative place to share "
    let description2="research with colleagues, and allow other researchers to participate."
    
    return (
        <React.Fragment>
            <div style={{ backgroundColor: "transparent", height: "300px", marginTop: "100px",marginLeft:"30px"}}>
                <Texty style={{ fontFamily: "Impact", fontSize: "88px", marginLeft: "22px" }}>Welcome to CodeSpace !</Texty>
                <p style={{  fontSize: "18px", marginLeft: "29px",marginTop:"20px",fontFamily:"Andale Mono"}}>{description1}</p>
                <p style={{  fontSize: "18px", marginLeft: "29px",marginTop:"20px",fontFamily:"Andale Mono" }}>{description2}</p>
            </div>
            <Toolbar />
            <Code spaceTreeData={spaceTreeData} />
            <CodeDrawer spaceTreeData={spaceTreeData}/>
            <ParticlesBg type="cobweb" bg={true} />
        </React.Fragment>
    )
}

export default Index;