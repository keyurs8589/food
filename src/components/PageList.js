import React from 'react';
import Pagination from '@material-ui/lab/Pagination';

const PageList = ({ pageCount, pageChange }) => {
  return <Pagination count={pageCount} color='primary' onChange={pageChange} />;
};

export default PageList;
