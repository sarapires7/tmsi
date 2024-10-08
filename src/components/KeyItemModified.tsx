import React from 'react';
import { Box, ListItemText, Typography } from '@mui/material';
import EastIcon from '@mui/icons-material/East';
import { Add, Remove } from '@mui/icons-material';
import { ModificationProps } from '../types/types';

interface KeyItemModifiedProps {
    item: ModificationProps;
    index: string | undefined;
}

const KeyItemModified: React.FC<KeyItemModifiedProps> = ({ item, index }) => {
    const renderSwitchChangeType = (item: ModificationProps) => {
        let backgroundColor;
        let icon;

        // Define cores e ícones de acordo com o tipo de mudança
        switch (item.type) {
            case 'add':
                backgroundColor = '#e8f5e9'; // Verde clarinho para adições
                icon = <Add fontSize='small' color="success" />;
                break;
            case 'update':
                backgroundColor = '#ffe0b2'; // Amarelo para atualizações
                icon = <EastIcon fontSize='small' color="warning" />;
                break;
            case 'delete':
                backgroundColor = '#ffcdd2'; // Vermelho claro para exclusões
                icon = <Remove fontSize='small' color="error" />;
                break;
            default:
                return null;
        }

        return (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    width: '100%',
                    padding: '8px',
                    borderRadius: '4px',
                    backgroundColor: backgroundColor,
                    marginBottom: '4px',
                    transition: 'background-color 0.3s',
                    '&:hover': {
                        backgroundColor: item.type === 'add' ? '#c8e6c9' // Tom mais escuro no hover
                                        : item.type === 'delete' ? '#ef9a9a'
                                        : '#ffe57f', // Cores no hover
                    }
                }}
            >
                {icon}
                <Typography sx={{ marginLeft: '8px', fontWeight: 'bold' }}>
                    {item.type === 'update' ? (
                        <>
                            <span style={{ fontWeight: 'normal' }}>{item?.before?.id}: </span>
                            <b>{item?.before?.translation}</b>
                            <EastIcon fontSize='small' sx={{ mx: 2 }} />
                            <b>{item?.after?.translation}</b>
                        </>
                    ) : (
                        <>
                            <b>{item?.before?.id}:</b> {item?.before?.translation}
                        </>
                    )}
                </Typography>
            </Box>
        );
    };

    return (
        <ListItemText key={index}>
            {renderSwitchChangeType(item)}
        </ListItemText>
    );
};

export default KeyItemModified;
