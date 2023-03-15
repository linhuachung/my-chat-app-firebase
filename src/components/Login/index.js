import React from 'react'
import {Button, Col, Row} from "antd";
import Title from "antd/es/typography/Title";
import {FacebookOutlined, GoogleOutlined} from "@ant-design/icons";
import {LoginServices} from "../../services/login-services";

function Login() {

    return (
        <div>
            <Row justify='center' style={{height: 800}}>
                <Col span={8}>
                    <Title style={{textAlign:'center'}} level={3}>Funny chat</Title>
                    <Button style={{width: '100%', marginBottom: 5}} onClick={() => LoginServices("google")}>
                        Đăng nhập bằng Google <GoogleOutlined />
                    </Button>
                    <Button style={{width: '100%'}}  onClick={() => LoginServices("facebook")}>
                        Đăng nhập bằng Facebook <FacebookOutlined />
                    </Button>
                </Col>
            </Row>
        </div>
    )
}

export default Login
