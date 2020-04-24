import React, { useState } from 'react';
import { Input, Select, Button } from 'antd';

import { Container, SearchContainer } from './style';

const { Option } = Select;

const SearchSort = ({ searchBy, setSearchBy }) => {
  // const [placehoder, setPlacehoder] = useState('firstname');

  function onChange(value) {
    console.log(`selected ${value}`);
  }

  // const handleSearch = () => {};

  const selectAfter = (
    <Select
      style={{ width: 80 }}
      value={searchBy.key}
      onChange={(key) => setSearchBy({ ...searchBy, key })}
      className="search-by"
    >
      <Option value="firstName">First name</Option>
      <Option value="lastName">Last name</Option>
      <Option value="email">Email</Option>
      <Option value="location">Location</Option>
      <Option value="phone">Phone</Option>
      <Option value="tags">Tag</Option>
    </Select>
  );

  return (
    <Container>
      <SearchContainer>
        <div style={{ marginBottom: 10, display: 'flex' }}>
          <Input
            addonBefore={selectAfter}
            placeholder={`Search by ${searchBy.key}`}
            onChange={(e) =>
              setSearchBy({ ...searchBy, value: e.target.value })
            }
          />
          {/* <Button type="primary">Search</Button> */}
        </div>
      </SearchContainer>

      <div style={{ alignSelf: 'flex-end' }}>
        <Select
          showSearch
          style={{ width: 200, marginLeft: 'auto' }}
          placeholder="Sort By"
          optionFilterProp="children"
          onChange={onChange}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          <Option value="jack">Alphabetically</Option>
          <Option value="lucy">Experience (low to high)</Option>
          <Option value="lucy">Experience (high to low)</Option>
        </Select>
      </div>
    </Container>
  );
};

export default SearchSort;
