import React from 'react';
import { Typography, Box, Divider } from '@mui/material';

const HeaderTitle: React.FC<{ page: string }> = ({ page }) => {
    return (
        <Box sx={{ mt: 4, mb: 3 }}>
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 500, // Moderado, não muito negrito
                    color: 'text.primary', // Cor padrão de texto
                    textAlign: 'center', // Centraliza o título para maior destaque
                }}
            >
                {page}
            </Typography>
                
        </Box>
    );
};

export default HeaderTitle;
