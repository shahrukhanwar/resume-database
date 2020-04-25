import React, { useState, useRef, useEffect } from 'react';
import { Tag, Input, message } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';

import utils from '../../utils';
import { addTag, deleteTag } from '../../actions';

const TagGroup = ({ id, tags, dispatch }) => {
  const [state, setState] = useState({
    inputVisible: false,
    inputValue: '',
    loading: false,
  });

  const { inputVisible, inputValue, loading } = state;

  const inputRef = useRef(null);

  const showInput = () => {
    setState({ ...state, inputVisible: true });
  };

  useEffect(() => {
    inputVisible && inputRef.current.focus();
  }, [inputVisible]);

  const handleInputChange = (e) => {
    setState({ ...state, inputValue: e.target.value });
  };

  const handleInputConfirm = async () => {
    if (!inputValue) return;
    setState({ ...state, loading: true });
    const response = await axios.post(
      `https://resume-database-server.herokuapp.com/${id}/tags`,
      {
        tag: inputValue,
      }
    );
    if (response.data.success) {
      dispatch(addTag(id, inputValue));
      setState({
        ...state,
        inputVisible: false,
        inputValue: '',
        loading: false,
      });
    } else {
      message.error('Something Went Wrong!');
      setState({ ...state, loading: false });
    }
  };

  const handleClose = async (removedTag) => {
    const response = await axios.delete(
      `https://resume-database-server.herokuapp.com/${id}/tags`,
      {
        data: {
          tag: removedTag,
        },
      }
    );
    if (response.data.success) {
      dispatch(deleteTag(id, removedTag));
    } else {
      message.error('Something Went Wrong!');
    }
  };

  return (
    <>
      {tags.map((tag) => (
        <Tag
          key={tag}
          color={utils.randomColor()}
          closable={true}
          onClose={() => handleClose(tag)}
          style={{ marginBottom: '5px' }}
        >
          {tag}
        </Tag>
      ))}
      {inputVisible && (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          className="tag-input"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag className="site-tag-plus" onClick={showInput}>
          <PlusOutlined /> New Tag
        </Tag>
      )}
      {loading && <LoadingOutlined style={{ color: '#1890FF' }} />}
    </>
  );
};

export default TagGroup;
