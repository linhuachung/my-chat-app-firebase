import React from 'react'
import {Avatar, Typography} from "antd";
import styled from "styled-components";
import {formatRelative} from "date-fns";


const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.isUserSend ? "flex-end" : "flex-start"};
  max-width: 500px;
  margin-left: ${props => props.isUserSend && "auto"};
  text-align: ${props => props.isUserSend ? "end" : "start"};
  margin-bottom: 10px;
  .author {
    margin-left: 5px;
    font-weight: bold;
  }
  .date {
    margin-left: 10px;
    font-size: 11px;
    color: #a7a7a7;
  }
  .content {
    margin-left: ${props => !props.isUserSend && "30px"};
  }
`;
function formatDate(seconds) {
    let formattedDate = ''
    if (seconds){
        formattedDate = formatRelative(new Date(seconds * 1000), new Date())
        formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
    }
    return formattedDate
}
function Message({text, displayName, createdAt, photoURL, isUserSend}) {
    return (
        <WrapperStyled isUserSend={isUserSend}>
            <div>
                <Avatar src={photoURL} size="small">{photoURL ? '' : displayName.charAt(0).toUpperCase()}</Avatar>
                <Typography.Text className="author">{displayName}</Typography.Text>
                <Typography.Text className="date">{formatDate(createdAt?.seconds)}</Typography.Text>
            </div>
            <div>
                <Typography.Text className="content">{text}</Typography.Text>
            </div>
        </WrapperStyled>
    )
}

export default Message
