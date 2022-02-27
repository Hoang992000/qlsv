import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Routes, Route, Link } from 'react-router-dom'
import 'antd/dist/antd.css';
import TableForm from './component/Table';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout className="layout">
    <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1">Danh sách sinh viên</Menu.Item>
        <Menu.Item key="2">Thông tin sinh viên</Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      
      <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          <Routes>
            <Route path='/' element={<TableForm />} />
          </Routes>
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
  );
}

export default App;
