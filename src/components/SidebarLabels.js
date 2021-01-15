import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';

const { Sider } = Layout;

export class SidebarLabels extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            labels: []
        };
      }
    
    componentDidMount() {
        
    }
    
    render() {
       return (
           <Sider>
               <Menu theme="dark" mode="inline">
                <Menu.Item>
                    hello
                </Menu.Item>
            </Menu>
           </Sider>
           
       ) 
    }
}