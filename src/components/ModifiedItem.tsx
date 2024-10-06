import React, { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

interface ModifiedItemProps {
    backgroundColor: string;
    icon: ReactNode;
    keyId?: string;
    value?: string;
}

const ModifiedItem: React.FC<ModifiedItemProps> = ({
    backgroundColor,
    icon,
    keyId,
    value
}) => {
    return (
        <Box
            component="section"
            sx={{
                p: 2,
                backgroundColor: { backgroundColor },
                display: "flex",
                width: "100%"
            }}
        >
            <Typography variant='body2'>{icon}</Typography>
            <Typography variant='body2' sx={{ fontWeight: "bold", mx: 1 }}>
                {keyId}:
            </Typography>
            <Typography variant='body2'>{value}</Typography>
        </Box>
    )
}

export default ModifiedItem