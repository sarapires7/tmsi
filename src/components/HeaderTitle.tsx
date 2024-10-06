import React from 'react';
import { Typography } from '@mui/material';

const HeaderTitle: React.FC<{page: string}> = ({ page }) => {
    return (
        <Typography variant='h4' gutterBottom sx={{mt:4}}>
            {page}
        </Typography>
    )
}

    
export default HeaderTitle;