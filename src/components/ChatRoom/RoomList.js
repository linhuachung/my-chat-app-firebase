import React, {useContext} from 'react'
import {Button, Collapse, Typography} from "antd";
import styled from "styled-components";
import {PlusSquareOutlined} from "@ant-design/icons";
import {AppContext} from "../Context/AppProvider";
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
    const { rooms, setIsAddRoomVisible, setSelectedRoomId } = useContext(AppContext)
    const handlAddRoom = () => {
        setIsAddRoomVisible(true)
    }
    /**
     * {
     *     name: 'room name',
     *     description: 'mo ta',
     *     members: [uid1, uid2,...]
     * }
     */
    return (
        <Collapse defaultActiveKey={["1"]} ghost>
            <PanleStyled header="Danh sách các phòng" key="1">
                {rooms.map(room=>(<LinkStyled key={room.id} onClick={()=> {setSelectedRoomId(room.id)}}>{room.name}</LinkStyled>))}
                <Button ghost className="add-room" icon={<PlusSquareOutlined/>} onClick={handlAddRoom}>Thêm phòng</Button>
            </PanleStyled>
        </Collapse>
    )
}

export default RoomList
