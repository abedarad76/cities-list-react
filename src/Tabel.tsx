import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';

function CityTable() {

    type Citvitem = {
        city: string,
        country: string,
        populationCounts: {
            reliabilty: string,
            sex: string
            value: string
            year: string
        }[]
    }

    const [cities, setClties] = useState<Citvitem[]>([])

    async function getList() {
        try {
            const List = await axios.get<unknown, AxiosResponse<{ data: Citvitem[] }>>("https://countriesnow.space/api/v0.1/countries/population/cities");
            // console.log(List.data.data);
            setClties(List.data.data)
        } catch (error) {
            console.log("data", error)
        }
    }

    useEffect(() => {
        getList()
    }, [])

    return (
        <div>
            {/* <Button variant="contained" onClick={getList}>GET List</Button> */}

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>city</TableCell>
                            <TableCell>country</TableCell>
                        </TableRow>

                    </TableHead>
                    <TableBody>
                        {cities.map((row) => {
                            return (
                                <TableRow
                                    key={row.city}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>
                                        {row.city}
                                    </TableCell>
                                    <TableCell >{row.country}</TableCell>

                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );

}

export default CityTable;