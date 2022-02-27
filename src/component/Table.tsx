import React from "react";
import { Table,Space } from 'antd';
import App, { Data } from "./AddForm";
import {setdata,getdata} from "../function";
const { Column} = Table;
interface Props { }

interface States {
  isAddform: boolean;
  dataSource: any
}
export default class TableForm extends React.Component<Props, States>{
  modalref:any
  constructor(props: Props) {
    super(props);
    this.state = {
      isAddform: false,
      dataSource: getdata()
    };
    this.modalref=React.createRef()
  }
  handleDelete(id:number){
    const listData :Data[]=[...this.state.dataSource]
    const newList :Data[]= listData.filter((item:any)=> item.id !==id)
    setdata(newList)
    this.setState({ dataSource:newList})
  }
  showModal(key: number) {
    this.modalref.current?.show(key);
  }
  newItem(data: Data[]) {
    this.setState({ dataSource: data });
  }
  EditItem(editedStudent: Data){
    const dataSource: Data[] = [...this.state.dataSource];
    const students = dataSource.findIndex(
      (student: any) => student.id === editedStudent.id
    );
    dataSource.splice(students, 1, editedStudent);
    this.setState({ dataSource });
    setdata(dataSource);
  }
  render() {
    return (
      <div>
        <App ref={this.modalref} dataAdd={(data) => this.newItem(data)} editedStudent={(editedStudent)=>this.EditItem(editedStudent)}/>
        <Table dataSource={this.state.dataSource}>
          <Column title="Full Name" dataIndex="name" key="fullName" />
          <Column title="Msv" dataIndex="id" key="msv" />
          <Column title="Age" dataIndex="age" key="age" />
          <Column title="Address" dataIndex="address" key="address" />
          <Column
            title="Action"
            key="action"
            render={(record) => (
              <Space size="middle">
                <a onClick={()=>this.showModal(record.id)}
                >Edit
                 </a>
                <a
                  onClick={()=>this.handleDelete(record.id)}
                >Delete</a>
              </Space>
            )}
          />
        </Table>
      </div>
    )
  }
}