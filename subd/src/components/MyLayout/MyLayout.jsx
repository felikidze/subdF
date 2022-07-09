import React, {useState} from 'react';
import {Button, Layout, Space, Switch, Table} from "antd";
import MyMenu from "../MyMenu/MyMenu";
import {useSelector} from "react-redux";
import {useActions} from "../../hooks/useActions";
import MyModal from "../MyModal/MyModal";

const MyLayout = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [rs, setRs] = useState({});
    const showModal = (record) => {
        setRs(record);
        setIsModalVisible(true);
    };
    const handleOk = () => {
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const { Header, Sider, Content } = Layout;
    const { datasource, columns, category, privilege } = useSelector(state => state.main);
    const { deleteRecordById, changePrivilege, fetchData } = useActions();
    const handleDeleteClick = (rs) => {
        console.info(rs);
        console.info(category);
        deleteRecordById(category, rs);
    }
    const handleUpdateClick = (rs) => {
        console.info(rs);
    }
    const handleAddRecordClick = () => {
        showModal({isCreate: true, ...datasource[0]})
    }

    if (columns.length) {
        columns.push({
            title: 'Action',
            key: 'action',
            render: (_, record) => (privilege ?
                <Space size="middle">
                    <a onClick={() => showModal(record)}>Update</a>
                    <a onClick={() => handleDeleteClick(record)}>Delete</a>
                </Space>
                    :
                    <Space>
                        Нет доступных опций
                    </Space>
            ),
        })
        console.info('columns - ', columns);
        console.info('datasource - ', datasource);
    }
    return (
        <Layout>
            <Sider>
                <MyMenu/>
            </Sider>
            <Layout>
                <Header>
                    <Switch
                        onChange={() => {
                            changePrivilege(!privilege);
                            fetchData(category);
                        }}
                    />
                    {category && privilege
                        ? <Button type="primary" onClick={handleAddRecordClick}>Добавить запись</Button>
                        : <></>
                    }
                </Header>
                <Content>
                    <MyModal isModalVisible={isModalVisible} handleCancel={handleCancel} handleOk={handleOk} record={rs}/>
                    <Table dataSource={datasource} columns={columns} />;
                </Content>
            </Layout>
        </Layout>
    );
};

export default MyLayout;