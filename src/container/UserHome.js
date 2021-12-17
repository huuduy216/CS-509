import React from 'react'

import { connect } from 'react-redux';
import * as AuthAction from '../store/action/auth';
import Toolbar from '../component/Navigation/Toolbar/Toolbar'
import ParticlesBg from 'particles-bg'

import Texty from 'rc-texty';

const UserHome = (props) => {

    let username = localStorage.getItem("username");
    let description1 = "Mode introduction"
    let description2 = "Edit Structure:"
    let description3 = "To add new classification, new subclassification, new algorithm, downloadable problem implementations and benchmarks."
    let description4 = "Edit Content:"
    let description5 = "To add implementations that are visible in code editor, details about classification, subclassification and to add benhcmarks."
    let description6 = "Edit User:"
    let description7 = "(for Admin User and Normal Users) To list all users with their activity."
    console.log(username)
    return (
        <React.Fragment>

            <div style={{ backgroundColor: "transparent", height: "300px", marginTop: "100px", marginLeft: "30px" }}>
                <Texty style={{ fontFamily: "Impact", fontSize: "88px", marginLeft: "22px" }}>{"Hello, " + username + "!!!"}</Texty>
                <p style={{ fontSize: "40px", marginLeft: "29px", marginTop: "20px", fontFamily: "Andale Mono" ,fontWeight:"bolder"}}>{description1}</p>
                <p style={{ fontSize: "22px", marginLeft: "29px", marginTop: "20px", fontFamily: "Andale Mono" ,fontWeight:"bolder"}}>{description2}</p>
                <p style={{ fontSize: "22px", marginLeft: "29px", marginTop: "20px", fontFamily: "Andale Mono" }}>{description3}</p>
                <p style={{ fontSize: "22px", marginLeft: "29px", marginTop: "20px", fontFamily: "Andale Mono" ,fontWeight:"bolder"}}>{description4}</p>
                <p style={{ fontSize: "22px", marginLeft: "29px", marginTop: "20px", fontFamily: "Andale Mono" }}>{description5}</p>
                <p style={{ fontSize: "22px", marginLeft: "29px", marginTop: "20px", fontFamily: "Andale Mono" ,fontWeight:"bolder"}}>{description6}</p>
                <p style={{ fontSize: "22px", marginLeft: "29px", marginTop: "20px", fontFamily: "Andale Mono" }}>{description7}</p>

            </div>

            <Toolbar />
            <ParticlesBg type="cobweb" bg={true} />
        </React.Fragment>
    )
}

const mapDispatchToProps = dispatch => {
    return {

        changeTree: (treeData) => dispatch(AuthAction.changeTree(treeData)),

    }
}

export default connect(null, mapDispatchToProps)(UserHome);