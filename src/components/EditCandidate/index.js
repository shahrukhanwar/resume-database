import React, { useState } from 'react';
import { Modal, Form, Input, Button, message, InputNumber } from 'antd';
import axios from 'axios';

import { editCandidate } from '../../actions';

const { TextArea } = Input;

const EditCandidate = ({
  candidate,
  dispatch,
  editModalVisible,
  setEditModalVisible,
}) => {
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleCancel = () => {
    setEditModalVisible(false);
  };

  const onFinish = async (values) => {
    setButtonLoading(true);
    const response = await axios.patch(
      `https://resume-database-server.herokuapp.com/${candidate._id}`,
      values
    );
    if (response.data.success) {
      dispatch(editCandidate(response.data.data));
      message.success('Updated Successfully!');
    } else {
      message.error('Something Went Wrong!');
    }
    setButtonLoading(false);
    setEditModalVisible(false);
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  return (
    <Modal
      visible={editModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
    >
      <div style={{ marginTop: '25px' }}>
        <Form
          {...layout}
          name="basic"
          initialValues={candidate}
          onFinish={onFinish}
        >
          <Form.Item
            label="Firstname"
            name="firstName"
            rules={[{ required: true, message: 'Please input firstname!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Lastname"
            name="lastName"
            rules={[{ required: true, message: 'Please input lastname!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { type: 'email', required: true, message: 'Please input email!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Phone" name="phone">
            <Input maxLength={10} />
          </Form.Item>
          <Form.Item label="Summary" name="summary">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Experience" name="experience">
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item label="Location" name="location">
            <Input />
          </Form.Item>
          <Form.Item label="GitHub" name="gitHubURL">
            <Input />
          </Form.Item>
          <Form.Item label="LinkedIn" name="linkedInURL">
            <Input />
          </Form.Item>
          <Form.Item label="Notes" name="notes">
            <Input />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" loading={buttonLoading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default EditCandidate;
