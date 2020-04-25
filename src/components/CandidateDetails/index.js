import React, { useState } from 'react';
import { Card, Button, Tooltip, Modal, Row, Col, message, Tag } from 'antd';
import {
  EditFilled,
  DeleteFilled,
  GithubFilled,
  LinkedinFilled,
  DownOutlined,
  UpOutlined,
  FilePdfOutlined,
} from '@ant-design/icons';
import axios from 'axios';

import {
  HeadingContainer,
  AvatarContainer,
  LinksContainer,
  ColX,
  CollapseIcon,
  InfoContainer,
} from './style';
import { deleteCandidate } from '../../actions';
import EditCandidate from '../EditCandidate';
import TagGroup from '../TagGroup';

const CandidateDetails = ({ candidate, dispatch }) => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [collapse, setCollapse] = useState(true);

  const showModal = () => {
    setDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    setButtonLoading(true);
    const response = await axios.delete(
      `https://2421ef13.ngrok.io/${candidate._id}`
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
      hoverable={true}
      className="candidate-card"
      style={{
        height: collapse ? 'auto' : '600px',
      }}
    >
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
              style={{ marginLeft: '8px' }}
              onClick={showModal}
            />
          </Tooltip>
        </div>
      </HeadingContainer>
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
      <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]} type="flex">
        <Col xs={24} md={16} lg={14}>
          <InfoContainer>
            <p>
              <span className="info-key">Phone: </span>
              {candidate.phone}
            </p>
            <p>
              <span className="info-key">Experience: </span>
              {candidate.experience} years
            </p>
            <p>
              <span className="info-key">Resume: </span>
              <a
                href={candidate.resume}
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                <Tag
                  icon={<FilePdfOutlined />}
                  color="#f50"
                  style={{ cursor: 'pointer' }}
                >
                  Click here to download
                </Tag>
              </a>
            </p>
            <p>
              <span className="info-key">
                Tags:{' '}
                <TagGroup
                  tags={candidate.tags}
                  dispatch={dispatch}
                  id={candidate._id}
                />
              </span>
            </p>
          </InfoContainer>
        </Col>
        <ColX xs={24} md={8} lg={10}>
          <AvatarContainer>
            <div style={{ width: '150px', height: '150px', marginTop: '10px' }}>
              <img src={candidate.avatar} alt="avatar" />
            </div>
            <LinksContainer>
              <a
                href={candidate.gitHubURL}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#24292E', marginRight: '8px' }}
              >
                <GithubFilled />
              </a>
              <a
                href={candidate.linkedInURL}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#0077B5' }}
              >
                <LinkedinFilled />
              </a>
            </LinksContainer>
          </AvatarContainer>
        </ColX>
      </Row>
      <CollapseIcon>
        {collapse ? (
          <Tooltip title="Expand">
            <DownOutlined onClick={() => setCollapse(false)} />
          </Tooltip>
        ) : (
          <Tooltip title="Collapse">
            <UpOutlined onClick={() => setCollapse(true)} />
          </Tooltip>
        )}
      </CollapseIcon>
    </Card>
  );
};

export default CandidateDetails;
