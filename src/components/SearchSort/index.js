import React from 'react';
import { Input, Select } from 'antd';

import { Container, SearchContainer } from './style';

const { Option } = Select;

const SearchSort = ({ searchBy, setSearchBy, sortBy, setSortBy }) => {
  const selectAfter = (
    <Select
      style={{ width: 80 }}
      value={searchBy.key}
      onChange={(key) => setSearchBy({ ...searchBy, key, value: '' })}
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
            placeholder={`Search by ${searchBy.key.toLowerCase()}`}
            onChange={(e) =>
              setSearchBy({ ...searchBy, value: e.target.value })
            }
            value={searchBy.value}
          />
        </div>
      </SearchContainer>

      <div style={{ alignSelf: 'flex-end' }}>
        <Select
          showSearch
          style={{ width: 200, marginLeft: 'auto' }}
          placeholder="Sort By"
          optionFilterProp="children"
          onChange={(value) => setSortBy(value)}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          <Option value="aToZSort">Firstname (A - Z)</Option>
          <Option value="zToASort">Firstname (Z - A)</Option>
          <Option value="lowToHighExp">Experience (low to high)</Option>
          <Option value="highToLowExp">Experience (high to low)</Option>
        </Select>
      </div>
    </Container>
  );
};

export default SearchSort;
