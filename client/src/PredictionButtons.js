import * as React from 'react';

import { Button } from '@mui/material';
import { ButtonGroup } from '@mui/material';
import { Box } from '@mui/system';

const buttons = [
    <Button key="one">One</Button>,
    <Button key="two">Two</Button>,
    <Button key="three">Three</Button>,
  ];
  
  export default function PredictionButtons() {
    return (
      <Box
        sx={{
          display: 'flex',
          '& > *': {
            m: 1,
          },
        }}
      >
        <ButtonGroup
          orientation="vertical"
          aria-label="vertical contained button group"
          variant="contained"
        >
          {buttons}
        </ButtonGroup>
      </Box>
    );
  }