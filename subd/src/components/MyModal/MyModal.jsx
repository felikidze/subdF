import React from 'react';
import {Modal} from "antd";
import MyForm from "../MyForm";

const MyModal = ({isModalVisible, handleOk, handleCancel, record}) => {
    console.info(record);
    return (
        <Modal title="Basic Modal" visible={isModalVisible} onCancel={handleCancel} footer={null}>
            <MyForm rs={record} onOk={handleOk}/>
        </Modal>
    );
};

export default MyModal;