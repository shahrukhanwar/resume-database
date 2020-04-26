import React, { useReducer, useEffect, useState } from 'react';
import { Row, Col, Spin } from 'antd';
import axios from 'axios';

import SearchSort from '../SearchSort';
import CandidateDetails from '../CandidateDetails';
import { LoadingContainer } from './style';
import reducer from '../../reducer';
import { getCandidates } from '../../actions';
import sort from '../../utils';

const CandidateList = () => {
  const [state, dispatch] = useReducer(reducer, []);
  const [searchBy, setSearchBy] = useState({
    key: 'firstName',
    value: '',
  });
  const [sortBy, setSortBy] = useState('');

  const getData = async () => {
    const response = await axios.get(
      'https://resume-database-server.herokuapp.com/'
    );
    if (response.data.success) {
      dispatch(getCandidates(response.data.data));
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <SearchSort
        setSearchBy={setSearchBy}
        searchBy={searchBy}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      {state.length > 0 ? (
        <Row
          gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]}
          type="flex"
          style={{ minHeight: 'calc(100vh - 248px)' }}
        >
          {state
            .filter((candidate) =>
              typeof candidate[searchBy.key] !== 'object'
                ? candidate[searchBy.key] &&
                  candidate[searchBy.key]
                    .toLowerCase()
                    .includes(searchBy.value.toLowerCase())
                : candidate[searchBy.key].some((val) =>
                    val.toLowerCase().includes(searchBy.value.toLowerCase())
                  )
            )
            .sort((a, b) => (sortBy ? sort[sortBy](a, b) : a - b))
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
