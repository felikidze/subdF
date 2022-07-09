import React from 'react';
import {Button, Form, Input, InputNumber} from "antd";
import {useActions} from "../hooks/useActions";
import {useSelector} from "react-redux";

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
/* eslint-enable no-template-curly-in-string */


const MyForm = ({rs, onOk}) => {
    const {updateData, createData} = useActions();
    const {category} = useSelector(state => state.main);
    const rsArray = Object.keys(rs);
    const rsArrayClone = [...rsArray];
    if (rsArray.includes('isCreate')) {
        rsArray.splice(0, 3);
    } else {
        rsArray.splice(0, 2);
    }
    const onFinish = (values) => {
        console.log(values);
        if (rs.isCreate) {
            createData(values.user, category)
        } else {
            updateData({id: rs.key, ...values.user, idName: rsArrayClone[1]}, category);
        }
        onOk()
    };
    return (<Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            {rsArray.map(item => (
                    <Form.Item name={['user', item.toString()]} label={item.toString()} rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                )
            )}
            <Button type="primary" htmlType="submit">
                Update table
            </Button>
        </Form>
    )
};

export default MyForm;