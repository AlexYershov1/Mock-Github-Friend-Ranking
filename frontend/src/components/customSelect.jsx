import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { getData } from '../fetchData'
import { CircularProgress, Typography } from '@mui/material';

export const CustomSelect = ({ depth, rows, setRows, _id, rank, setError }) => {

    const [loading, setLoading] = useState(false)

    const handleChange = async (event) => {
        setLoading(true)
        getData('/rank', { depth: event.target.value, _id: _id })
            .then(res => {
                if (res.success) {
                    const index = rows.findIndex(row => row._id === _id)
                    setRows(prev => [
                        ...prev.slice(0, index),
                        {
                            ...prev[index], 
                            followersRank: res.rank, 
                            depth: event.target.value
                        },
                        ...prev.slice(index + 1)
                    ])
                }
            })
            .catch(() => {
                setError('Could not process rank calculation from the server')
            })
            .finally(() => setLoading(false))
    };

    return (
        <>

            <Box sx={{ minWidth: 120, transform: 'scale(.7)' }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Depth</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={depth}
                        label="Depth"
                        onChange={handleChange}
                        defaultValue=""
                    >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                        <MenuItem value={7}>7</MenuItem>
                        <MenuItem value={8}>8</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box width={100} marginLeft='3em'>
                <Typography variant="h6" color={'blue'}>
                    {loading ? <CircularProgress /> : <b>{rank}</b>}
                </Typography>
            </Box>
        </>
    );
}