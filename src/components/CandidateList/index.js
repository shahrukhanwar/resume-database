import React, { useReducer, useEffect, useState } from 'react';
import { Row, Col, Spin } from 'antd';
import axios from 'axios';

import SearchSort from '../SearchSort';
import CandidateDetails from '../CandidateDetails';
import { LoadingContainer } from './style';
import reducer from '../../reducer';
import { getCandidates } from '../../actions';

const CandidateList = () => {
  const [state, dispatch] = useReducer(reducer, []);
  const [searchBy, setSearchBy] = useState({
    key: 'firstName',
    value: '',
  });

  const getData = async () => {
    const response = await axios.get('https://884ae122.ngrok.io/');
    if (response.data.success) {
      dispatch(getCandidates(response.data.data));
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <SearchSort setSearchBy={setSearchBy} searchBy={searchBy} />
      {state.length > 0 ? (
        <Row
          gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]}
          type="flex"
          style={{ minHeight: 'calc(100vh - 248px)' }}
        >
          {state
            .filter((candidate) =>
              typeof candidate[searchBy.key] !== 'object'
                ? candidate[searchBy.key]
                    .toLowerCase()
                    .includes(searchBy.value.toLowerCase())
                : candidate[searchBy.key].includes(searchBy.value)
            )
            .map((candidate) => (
              <Col xs={24} sm={24} md={24} lg={12} key={candidate._id}>
                <CandidateDetails candidate={candidate} dispatch={dispatch} />
              </Col>
            ))}
        </Row>
      ) : (
        <LoadingContainer>
          <Spin size="large" />
        </LoadingContainer>
      )}
    </div>
  );
};

export default CandidateList;
