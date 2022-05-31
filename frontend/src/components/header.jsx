import { Box } from "@mui/material"

export const Header = () => {
    return(
        <Box marginBottom={'3em'} sx={{display: 'flex', flexDirection: 'row'}}>
            <img src='/logoR.png' alt="Logo" width={70} height={70} style={{padding: 10, borderRadius: '1em'}}/>
            <h1>Github Friend Ranking</h1>
        </Box>
    )
}