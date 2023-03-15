import React, {useContext, useState} from 'react'
import {AppContext} from "../Context/AppProvider";
import {Avatar, Form, Modal, Select, Spin} from "antd";
import {debounce} from "lodash";
import {db} from "../../firebase/config";
import {
    collection,
    query,
    where,
    getDocs,
    doc,
    updateDoc
} from "firebase/firestore";

function DebounceSelect({fetchOptions, debounceTimeout = 300, curMembers, ...props}) {

    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);
    const debounceFetcher = React.useMemo(() => {
        const loadOptions = (value) => {
            setOptions([]);
            setFetching(true);

            fetchOptions(value, curMembers).then((newOptions) => {
                setOptions(newOptions);
                setFetching(false);
            });
        };

        return debounce(loadOptions, debounceTimeout);
    }, [debounceTimeout, fetchOptions, curMembers]);

    React.useEffect(() => {
        return () => {
            // clear when unmount
            setOptions([]);
        };
    }, []);

    const handleSelect = (e) => {
        console.log(e)
    }

    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size='small'/> : null}
            name={'select-member'}
            onChange={handleSelect}
            {...props}
        >
            {options?.map((opt) => (
                <Select.Option key={opt.value} value={opt.value} title={opt.label}  >
                    <Avatar size='small' src={opt.photoURL}>
                        {opt.photoURL ? '' : opt.label?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    {` ${opt.label}`}
                </Select.Option>
            ))}
        </Select>
    );
}

async function fetchUserList(search, curMembers) {
    const collectionRef = await collection(db ,'users')
    const q = query(collectionRef, where('keywords', 'array-contains', search?.toLowerCase()))
    const querySnapshot = await getDocs(q);
    const datauser = []
    querySnapshot.forEach((doc)=>{
        datauser.push({
            label: doc.data().displayName,
            value: doc.data().uid,
            photoURL: doc.data().photoURL
        })
    })
    return datauser.filter(opt => !curMembers.includes(opt.value))
}

function InviteMemberModal() {
    const {isInviteMemberVisible, setIsInviteMemberVisible, selectedRoomId, selectedRoom} = useContext(AppContext)
    const [value, setValue] = useState([])

    const [form] = Form.useForm()
    const handleOK = async () => {
        form.resetFields()
        await updateDoc(doc(db, 'rooms', selectedRoomId), {
            members: [...selectedRoom.members, ...value.map(val => val.value)]
        })
        setIsInviteMemberVisible(false)
    }
    const handleCancel = () => {
        form.resetFields()
        setIsInviteMemberVisible(false)
        setValue([])
    }

    return (
        <div>
            <Modal
                title={'Mời thêm thành viên'}
                open={isInviteMemberVisible}
                onOk={handleOK}
                onCancel={handleCancel}
            >
                <Form layout='vertical'>
                <DebounceSelect
                    mode='multiple'
                    name='search-user'
                    label='Tên các thành viên'
                    value={value}
                    placeholder='Nhập tên thành viên'
                    fetchOptions={fetchUserList}
                    onChange={(newValue) => setValue(newValue)}
                    style={{ width: '100%' }}
                    curMembers={selectedRoom?.members}
                />
                </Form>
            </Modal>
        </div>
    )
}

export default InviteMemberModal
