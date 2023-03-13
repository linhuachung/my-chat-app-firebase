import React, {createContext, useContext, useMemo, useState} from 'react'
import {useFirestore} from "../../hooks/useFirestore";
import {AuthContext} from "./AuthProvider";

export const AppContext = createContext();

function AppProvider({children}) {
    const [isAddRoomVisible, setIsAddRoomVisible] = useState(false)
    const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false)
    const [selectedRoomId, setSelectedRoomId] = useState('')

    const { user: {uid} } = useContext(AuthContext)
    const roomsCondition = useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: uid
        }
    }, [uid])

    const rooms = useFirestore('rooms', roomsCondition)
    const selectedRoom = useMemo(() => rooms.find(room => room.id === selectedRoomId), [rooms, selectedRoomId])

    const usersCondition = useMemo(() => {
        return {
            fieldName: 'uid',
            operator: 'in',
            compareValue: selectedRoom?.members
        }
    }, [selectedRoom?.members])
    const members = useFirestore('users', usersCondition)

    const value = useMemo(() => {
        return {
            rooms,
            isAddRoomVisible,
            setIsAddRoomVisible,
            selectedRoomId,
            setSelectedRoomId,
            selectedRoom,
            members,
            isInviteMemberVisible,
            setIsInviteMemberVisible
        }
    }, [
        rooms,
        isAddRoomVisible,
        selectedRoomId,
        selectedRoom,
        members,
        isInviteMemberVisible,
    ])

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider
