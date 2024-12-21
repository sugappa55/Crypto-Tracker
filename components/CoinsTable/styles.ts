import { Pagination, styled, TableRow } from '@mui/material';

export const StyledTableRow = styled(TableRow)(() => ({
  backgroundColor: '#16171a',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#131111'
  }
}));

export const StyledPagination = styled(Pagination)(() => ({
  '& .MuiPaginationItem-root': {
    color: 'gold'
  }
}));
