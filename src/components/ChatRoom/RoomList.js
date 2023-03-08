import React from 'react'
import {Button, Collapse, Typography} from "antd";
import styled from "styled-components";
import {PlusSquareOutlined} from "@ant-design/icons";
const {Panel} = Collapse

const PanleStyled = styled(Panel)`
  &&& {
    .ant-collapse-header,
    p{
      color: white;
    }
    
    .ant-collapse-content-box {
      padding: 0 40px;
    }
    
    .add-room {
      color: white;
    }
  }
`

const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: white;
`
function RoomList() {
    return (
        <Collapse defaultActiveKey={["1"]} ghost>
            <PanleStyled header="Danh sách các phòng" key="1">
                <LinkStyled>Room 1</LinkStyled>
                <LinkStyled>Room 2</LinkStyled>
                <LinkStyled>Room 3</LinkStyled>
                <Button ghost className="add-room" icon={<PlusSquareOutlined/>}>Thêm phòng</Button>
            </PanleStyled>
        </Collapse>
    )
}

export default RoomList
