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
import { Avatar } from '@mui/material';
import {ArrowUpward} from '@mui/icons-material';
import { ArrowDownward } from '@mui/icons-material';

function preventDefault(event) {
  event.preventDefault();
}

export default function CurrentPrediction(props) {
  return (
    <React.Fragment>
        <Title>Current Prediction</Title>
        <Avatar>
            <ArrowUpward />
        </Avatar>
        <Avatar>
            <ArrowDownward />
        </Avatar>
    </React.Fragment>
  );
}