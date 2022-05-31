import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Avatar, Typography, LinearProgress } from "@mui/material";
import { Field } from './field';
import { CustomSelect } from './customSelect';
import { TemplateAlert } from './templateAlert';
import { getData } from '../fetchData';

export const Report = () => {
    const [rows, setRows] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        getData('/users', {})
        .then(res => {
            setRows(res)
        })
        .catch(() => setError('Could not get the users from the server'))
        .finally(() => setLoading(false))
    }, [])

    const columns = [
        {
            field: 'avatar',
            headerName: <Typography variant="h6">Avatar</Typography>,
            width: 100,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Avatar src={params.row.avatar} />
                )
            }
        },
        {
            field: 'name',
            headerName: <Typography variant="h6">Name</Typography>,
            width: 250,
            renderCell: (params) => {
                return (
                    <Field value={params.row.name} />
                )
            }
        },
        {
            field: 'profileLink',
            headerName: <Typography variant="h6">Profile Link</Typography>,
            width: 500,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Field value={params.row.profileLink} />
                )
            }
        },
        {
            field: 'creationDate',
            headerName: <Typography variant="h6">Creation Date</Typography>,
            width: 200,
            renderCell: (params) => {
                return (
                    <Field value={params.row.creationDate} />
                )
            }
        },
        {
            field: 'followersRank',
            headerName: <Typography variant="h6">Followers Rank</Typography>,
            type: 'number',
            width: 300,
            renderCell: (params) => {
                return (
                    <>
                        <CustomSelect
                            depth={params.row.depth}
                            rows={rows}
                            setRows={setRows}
                            _id={params.row._id}
                            rank={params.row.followersRank}
                            setError={setError} />
                    </>
                )
            }
        },
    ];


    return (
        <>
            {loading ? <LinearProgress /> :
                <div style={{ height: 500, width: '67%', margin: 'auto', overflow: 'auto' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={7}
                        rowsPerPageOptions={[7]}
                        disableColumnSelector
                        disableSelectionOnClick
                    />
                </div>
            }
            {error && <TemplateAlert info={error} setInfo={setError} severity={'error'} />}
        </>
    )

}

