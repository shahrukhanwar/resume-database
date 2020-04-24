import React, { useState } from 'react';
import { Card, Button, Tooltip, Modal, Row, Col, message } from 'antd';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import axios from 'axios';

import { HeadingContainer } from './style';
import { deleteCandidate } from '../../actions';
import EditCandidate from '../EditCandidate';

const CandidateDetails = ({ candidate, dispatch }) => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const showModal = () => {
    setDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    setButtonLoading(true);
    const response = await axios.delete(
      `https://d8856c1e.ngrok.io/${candidate._id}`
    );
    if (response.data.success) {
      dispatch(deleteCandidate(candidate._id));
      message.success('Deleted Successfully!');
    } else {
      message.error('Something Went Wrong!');
    }
    setButtonLoading(false);
    setDeleteModalVisible(false);
  };

  const handleCancel = () => {
    setDeleteModalVisible(false);
  };

  return (
    <Card
      style={{ height: '300px' }}
      hoverable={true}
      className="candidate-card"
    >
      <Modal
        visible={deleteModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            No
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={buttonLoading}
            onClick={handleDelete}
          >
            Yes
          </Button>,
        ]}
        centered
      >
        <p>Are you sure you want to delete?</p>
      </Modal>
      <EditCandidate
        candidate={candidate}
        dispatch={dispatch}
        editModalVisible={editModalVisible}
        setEditModalVisible={setEditModalVisible}
      />
      <HeadingContainer>
        <h1>{`${candidate.firstName} ${candidate.lastName}`}</h1>
        <div>
          <Tooltip title="Edit">
            <Button
              type="primary"
              shape="circle"
              icon={<EditFilled />}
              onClick={() => setEditModalVisible(true)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              type="primary"
              shape="circle"
              icon={<DeleteFilled />}
              style={{ marginLeft: '5px' }}
              onClick={showModal}
            />
          </Tooltip>
        </div>
      </HeadingContainer>
      <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]} type="flex">
        <Col xs={24} md={16}></Col>
        <Col xs={24} md={8} style={{ order: 1 }}>
          <div style={{ width: '150px', height: '150px', marginTop: '10px' }}>
            <img src={candidate.avatar} alt="avatar" />
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default CandidateDetails;
