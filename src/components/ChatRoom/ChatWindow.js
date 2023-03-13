import React, {useContext, useMemo, useState} from 'react'
import styled from "styled-components";
import {Alert, Avatar, Button, Form, Input, Tooltip} from "antd";
import {UserAddOutlined} from "@ant-design/icons";
import Message from "./Massage";
import {AppContext} from "../Context/AppProvider";
import {addDocument} from "../../firebase/services";
import {AuthContext} from "../Context/AuthProvider";
import {useFirestore} from "../../hooks/useFirestore";

const WrapperStyled = styled.div`
  //height: 100vh;
  display: flex;
  flex-direction: column;
  height: 100vh;
`


const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid rgb(230, 230, 230);
  
  .header{
    &__info{
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    &__title{
      margin: 0;
      font-weight: bold;
    }
    &__description{
      font-size: 12px;
    }
  }
`

const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
`

const ContentStyled = styled.div`
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-bottom: 50px;
  background: wheat;
`

const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rgb(205 205 205);
  border-radius: 2px;
  .ant-form-item{
    flex: 1;
    margin-bottom: 0;
  }
`

const MessageListStyled = styled.div`
  padding: 5px 80px 5px 30px;
  max-height: 800px;
  overflow: auto;
`

function ChatWindow(factory, deps) {
    const { selectedRoom, members, setIsInviteMemberVisible } = useContext(AppContext)
    const {user: {uid, photoURL, displayName }} = useContext(AuthContext)
    const [inputValue, setInputValue] = useState('')
    const [form] = Form.useForm()
    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleOnSubmit = async () => {
        await addDocument('messages', {
            text: inputValue,
            uid,
            photoURL,
            roomId: selectedRoom.id,
            displayName
        })
        form.resetFields(['messages'])
    }

    const condition = useMemo(() => ({
        fieldName: 'roomId',
        operator: '==',
        compareValue: selectedRoom?.id

    }), [selectedRoom?.id])
    const message = useFirestore('messages',condition)

    return (
            <WrapperStyled>
                {
                    selectedRoom?.id ? (
                        <>
                            <HeaderStyled>
                                <div className="header__info">
                                    <p className="header__title">{selectedRoom?.name}</p>
                                    <span className="header__description">{selectedRoom?.description}</span>
                                </div>
                                <ButtonGroupStyled>
                                    <Button type="text" icon={<UserAddOutlined/>} onClick={() => setIsInviteMemberVisible(true)}>Mời</Button>
                                    <Avatar.Group size='small' maxCount={2}>
                                        {
                                            members.map(member => <Tooltip title={member.displayName} key={member.id}><Avatar src={member.photoURL}>{member.photoURL ? '' : member.displayName.charAt(0)?.toUpperCase()}</Avatar></Tooltip>)
                                        }
                                    </Avatar.Group>
                                </ButtonGroupStyled>
                            </HeaderStyled>
                            <ContentStyled>
                                <MessageListStyled>
                                    {
                                        message.map(mes => (
                                            <Message text={mes.text} photoURL={mes.photoURL} displayName={mes.displayName} createdAt={mes.createdAt} key={mes.id} isUserSend={uid === mes.uid}/>
                                        ))
                                    }
                                </MessageListStyled>
                                <FormStyled form={form}>
                                    <Form.Item name={'messages'}>
                                        <Input onChange={handleInputChange} onPressEnter={handleOnSubmit} placeholder="Nhập tin nhắn..." bordered={false} autoComplete='off'/>
                                    </Form.Item>
                                    <Button onClick={handleOnSubmit}>Gửi</Button>
                                </FormStyled>
                            </ContentStyled>
                        </>
                    ) : <Alert message={"Hãy chọn phòng"} type={"info"} showIcon style={{margin: '5px'}} closable />
                }
            </WrapperStyled>
    )
}

export default ChatWindow
