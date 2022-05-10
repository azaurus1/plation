import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import getWeb3 from "./getWeb3";
import PredictionHandlerContract from "./contracts/PredictionHandler.json";

function preventDefault(event) {
  event.preventDefault();
}

export default function RecentPredictions(props) {
  return (
    <React.Fragment>
      <Title>Recent Predictions</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Index</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.returnValues._predictionIndex}</TableCell>
              <TableCell>{row.returnValues._predictionAddress}</TableCell>
              <TableCell>status</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more predictions
      </Link>
    </React.Fragment>
  );
}