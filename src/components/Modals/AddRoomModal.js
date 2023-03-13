import React, {useContext} from 'react'
import {Form, Input, Modal} from "antd";
import {AppContext} from "../Context/AppProvider";
import {addDoc, collection, serverTimestamp} from "firebase/firestore";
import {db} from "../../firebase/config";
import {AuthContext} from "../Context/AuthProvider";

function AddRoomModal() {
    const {isAddRoomVisible, setIsAddRoomVisible} = useContext(AppContext)
    const {user: {uid}} = useContext(AuthContext)

    const [form] = Form.useForm()
    const handleOK = () => {
        addDoc(collection(db, 'rooms'), {...form.getFieldValue(), members: [uid], createdAt: serverTimestamp()})
        // reset form value
        form.resetFields()

        setIsAddRoomVisible(false)
    }
    const handleCancel = () => {
        form.resetFields()
        setIsAddRoomVisible(false)
    }
    return (
        <div>
            <Modal
                title={'Tạo phòng'}
                open={isAddRoomVisible}
                onOk={handleOK}
                onCancel={handleCancel}
            >
                <Form form={form} layout={"vertical"}>
                    <Form.Item label={"Tên phòng"} name={'name'}>
                        <Input placeholder={'Nhập tên phòng'}/>
                    </Form.Item>
                    <Form.Item label={"Mô tả"} name={'description'}>
                        <Input placeholder={'Nhập mô tả'}/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default AddRoomModal
