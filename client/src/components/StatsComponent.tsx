import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import UserContext from '../context/UserContext';
import { getUrl } from '../hooks/getUrl';
import { useUserId } from '../hooks/user';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


interface _Data {
  id: number,
  correct: number, 
  incorrect:number,
  accuracy: number,
  date: string,
}

function parseData(responseObj: any) {
  const dateObj = new Date(responseObj.created_at);
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JavaScript
  const year = dateObj.getFullYear().toString().substr(-2); // Get last two digits of year

  const result: _Data = {
    id: responseObj.id,
    date: `${day}.${month}.${year}`,
    correct: responseObj.correct,
    incorrect: responseObj.incorrect,
    accuracy: responseObj.accuracy,
  }
  return result;
}

  export default function StatsComponent() {
    const userId = useUserId();
    const [stats, setStats] = useState<_Data[]>([]);

    useEffect(() => {
      axios.get(`${getUrl()}/stats/${userId}`)
      .then((response) => {

        const parsedStats =  response.data.map(parseData);
        setStats(parsedStats);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
    }, [])
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="Stats">
          <TableHead>
            <TableRow>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Correct</TableCell>
              <TableCell align="left">Incorrect</TableCell>
              <TableCell align="left">Accuracy</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stats.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">{row.date}</TableCell>
                <TableCell align="left">{row.correct}</TableCell>
                <TableCell align="left">{row.incorrect}</TableCell>
                <TableCell align="left">{row.accuracy}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }