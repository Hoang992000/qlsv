import React from "react";
import { Form, Input, Button, FormInstance } from 'antd';
import { Modal } from 'antd';
import { getdata, setdata } from "../function";
interface Props {
  dataAdd: (newItem: Data[]) => void
  editedStudent: (editedStudent: Data) => void
}

interface States {
  visible: boolean;
  data: Data[];
  itemEdited: Data[];
  dataSource: Data[];
}
export interface Data {
  name: string;
  id: number;
  age: number;
  address: string;
}
export default class AddFrom extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      visible: false,
      data: [],
      itemEdited: [],
      dataSource: getdata()
    };
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  form = React.createRef<FormInstance>();
  componentDidMount() {
    this.loadData();
  }
  async loadData() {
    const newdobj = getdata();
    this.setState({ data: newdobj });
  }
  showModal = (): void => {
    this.setState({
      visible: true,
    });
  };
  async show(id: number) {
    this.setState({
      visible: true,
    });
    const studentList = getdata();
    const studentEdit = studentList.filter((item: any) => item.id == id)
    await this.setState({ itemEdited: studentEdit })
    // console.log(this.state.itemEdited[0])
    this.form.current?.setFieldsValue({
      name: this.state.itemEdited[0].name,
      id: this.state.itemEdited[0].id,
      age: this.state.itemEdited[0].age,
      address: this.state.itemEdited[0].address,

    })
  };

  handleCheck= async ()=>{
    const newstudents = getdata();
    const data = await this.form.current?.validateFields();
    const idneedCheck = data.id
    if((newstudents.find((item :any)=>item.id==idneedCheck))){
     alert('id phải là duy nhất không đượC nhập trùng')
      
    }
    else {
      const data = await this.form.current?.validateFields();
    const newstudents = getdata();
    const newdata = [...newstudents, data];
    this.setState({
      data: newdata
    });
    setdata(newdata)
    // if (this.props.dataAdd) { 
      this.props.dataAdd(newdata);
    // }
    this.form.current?.resetFields();
    this.setState({
      visible: false,
    });
    }
    
  }

  handleOk = async () => {
    await this.handleCheck()
    // const fakedata = await this.form.current?.validateFields()
    // const key= Math.floor(Math.random()*100)
    // const fakeStudent={
    //   key: key,
    //   name: fakedata.name,
    //   id: fakedata.id,
    //   age: fakedata.age,
    //   address: fakedata.address,
    // }
    // console.log(fakeStudent);

    // const data = await this.form.current?.validateFields();
    // const newstudents = getdata();
    // const newdata = [...newstudents, data];
    // this.setState({
    //   data: newdata
    // });
    // setdata(newdata)
    // // if (this.props.dataAdd) { 
    //   this.props.dataAdd(newdata);
    // // }
    // this.form.current?.resetFields();
    // this.setState({
    //   visible: false,
    // });
  };
  handleEdit = async () => {
    const data = await this.form.current?.validateFields();
    console.log(data);
    this.props.editedStudent(data);
    this.form.current?.resetFields();
    this.setState({
      visible: false,
    });
  }
  handleCancel = (): void => {
    this.setState({
      visible: false,
    });
  };
  render() {
    return (
      <div>
        <div>
          <Button type="primary" onClick={this.showModal}>
            Add student
          </Button>
          <Modal
            title="Basic Modal"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Form
              ref={this.form}>
              <Form.Item name="name" label="full name" rules={[{ required: true }]}>
                <Input placeholder="Full name..." />
              </Form.Item>
              <Form.Item name="id" label="id" rules={[{ required: true }]}>
                <Input placeholder="Id..." />
              </Form.Item>
              <Form.Item name="age" label="age" rules={[{ required: true }]}>
                <Input placeholder="Age..." />
              </Form.Item>
              <Form.Item name="address" label="address" rules={[{ required: true }]}>
                <Input placeholder="Address..." />
              </Form.Item>
            </Form>
                  <Button type="primary"
                    onClick={(e) => this.handleEdit()}
                  >Edit</Button>
          </Modal>
        </div>
      </div>
    );
  }
}