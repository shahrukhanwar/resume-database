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
import NotesForm from '../NotesForm';

const CandidateDetails = ({ candidate, dispatch }) => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [collapse, setCollapse] = useState(true);

  // show delete confirm modal
  const showModal = () => {
    setDeleteModalVisible(true);
  };

  // delete candidate api request and update state
  const handleDelete = async () => {
    setButtonLoading(true);
    const response = await axios.delete(
      `https://resume-database-server.herokuapp.com/${candidate._id}`
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

  // hide delete confirm modal
  const handleCancel = () => {
    setDeleteModalVisible(false);
  };

  return (
    <Card hoverable={true} className="candidate-card">
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
        <Col xs={24} sm={14} md={16} lg={14}>
          <InfoContainer>
            <p>
              <span className="info-key">Phone:</span>
              {candidate.phone}
            </p>
            <p>
              <span className="info-key">Experience:</span>
              {candidate.experience} years
            </p>
            <p>
              <span className="info-key">Resume:</span>
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
              <span className="info-key">Tags:</span>
              <TagGroup
                tags={candidate.tags}
                dispatch={dispatch}
                id={candidate._id}
              />
            </p>
            <div style={{ display: 'flex' }}>
              <span className="info-key">Notes:</span>
              <NotesForm
                dispatch={dispatch}
                id={candidate._id}
                notes={candidate.notes}
              />
            </div>
            {!collapse && (
              <div style={{ marginTop: '14px' }}>
                <p>
                  <span className="info-key">Email:</span>
                  {candidate.email}
                </p>
                <p>
                  <span className="info-key">Location:</span>
                  {candidate.location}
                </p>
                <p>
                  <span className="info-key">Summary:</span>
                  {candidate.summary}
                </p>
              </div>
            )}
          </InfoContainer>
        </Col>
        <ColX xs={24} sm={10} md={8} lg={10}>
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
          <Button
            size="small"
            type="primary"
            icon={<DownOutlined />}
            onClick={() => setCollapse(false)}
            ghost
          >
            Expand
          </Button>
        ) : (
          <Button
            size="small"
            type="primary"
            icon={<UpOutlined />}
            onClick={() => setCollapse(true)}
            ghost
          >
            Collapse
          </Button>
        )}
      </CollapseIcon>
    </Card>
  );
};

export default CandidateDetails;
