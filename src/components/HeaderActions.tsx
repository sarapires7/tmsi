import React from 'react';
import { Box, Button, Grid2 } from '@mui/material';
import FilterKeys from './FilterKeys';
import { HeaderActionsProps } from '../types/types'

const HeaderActions: React.FC<HeaderActionsProps> = ({ 
    filter,
    setFilter,
    handleDialogOpen,
    label,
    title
 }) => {
    return (
        <Grid2>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                p={2}
            >
                <FilterKeys filter={filter} onFilterChange={setFilter} label={label} />
                <Button 
                    variant='contained'
                    color='primary'
                    onClick={handleDialogOpen}
                    sx={{marginTop: 2}}
                >
                    {title}
                </Button>
            </Box>
        </Grid2>
    )
}

    
export default HeaderActions;