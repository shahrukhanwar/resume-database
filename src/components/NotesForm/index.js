import React, { useState } from 'react';
import { Input, Button, Tooltip, message } from 'antd';
import { CheckOutlined, LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';

import { addNotes } from '../../actions';

const { TextArea } = Input;

const NotesForm = ({ dispatch, id, notes }) => {
  const [state, setstate] = useState({
    input: '',
    buttonLoading: false,
  });
  const { input, buttonLoading } = state;

  const handleSubmit = async () => {
    if (!input) return;
    setstate({ ...state, buttonLoading: true });
    const response = await axios.patch(`https://2421ef13.ngrok.io/${id}`, {
      notes: input,
    });
    if (response.data.success) {
      dispatch(addNotes(id, input));
      message.success('Notes Added Successfully!');
    } else {
      message.error('Something Went Wrong!');
    }
    setstate({ ...state, input: '', buttonLoading: false });
  };

  return (
    <>
      {!notes ? (
        <>
          <TextArea
            placeholder="Leave a note here..."
            onChange={(e) => setstate({ ...state, input: e.target.value })}
            value={input}
          />
          <Tooltip title="Submit">
            <Button
              type="primary"
              shape="circle"
              icon={buttonLoading ? <LoadingOutlined /> : <CheckOutlined />}
              style={{ marginLeft: '5px', alignSelf: 'center' }}
              ghost
              onClick={handleSubmit}
            />
          </Tooltip>
        </>
      ) : (
        <p>{notes}</p>
      )}
    </>
  );
};

export default NotesForm;
