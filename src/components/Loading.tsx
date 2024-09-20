import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

interface LoadingProps {
    loadingText?: string
}

const Loading: React.FC<LoadingProps> = ({ loadingText = 'Loading...' }) => {
    return (
        <Box 
            display='flex'
            flexDirection='column'
            justifyContent='center' 
            alignItems='center' 
            minHeight='100vh'
        >
            <CircularProgress size={40} />
            <Typography variant="body1" mt={2} color='primary'>
                {loadingText}
            </Typography>
        </Box>
    )
}

export default Loading;