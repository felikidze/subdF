import React from 'react';
import {Menu} from "antd";
import {useActions} from "../../hooks/useActions";
import {BarChartOutlined, FireOutlined, MehOutlined, PieChartOutlined, SlidersOutlined} from '@ant-design/icons';
import {useSelector} from "react-redux";
import {fetchData} from "../../store/action-creators/main";

const MyMenu = () => {
    const {changeCategory, fetchData} = useActions()
    const {category} = useSelector(state => state.main)
    const items = [
        { label: 'Общая', icon: <PieChartOutlined/>, key: 'albums' }, // remember to pass the key prop
        { label: 'Композиции', icon: <SlidersOutlined />, key: 'compositions' }, // which is required
        { label: 'Оценки', icon: <BarChartOutlined/>, key: 'grades' },
        { label: 'Альбомы групп', icon: <FireOutlined/>, key: 'group_album'},
        { label: 'Авторы композиций', icon: <MehOutlined />, key: 'composition_groups' }
    ];
    const menuItemClickHandler = ({ key }) => {
        changeCategory(key);
        fetchData(key)
    }

    return <Menu items={items} onClick={menuItemClickHandler}/>;
};

export default MyMenu;