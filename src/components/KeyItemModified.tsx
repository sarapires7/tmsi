import React from 'react';
import { Box, ListItemText, Typography } from '@mui/material';
import EastIcon from '@mui/icons-material/East';
import { Add, Remove } from '@mui/icons-material';
import ModifiedItem from './ModifiedItem';
import { ModificationProps } from '../types/types';

interface KeyItemModifiedProps {
    item: ModificationProps;
    index: string | undefined;
}

const KeyItemModified: React.FC<KeyItemModifiedProps> = ({ item, index }) => {
    const renderSwitchChangeType = (item: ModificationProps) => {
        switch (item.type) {
            case 'add':
                return (
                    <ModifiedItem 
                        backgroundColor='#c8e6c9'
                        icon={<Add fontSize='small' />}
                        keyId={item?.after?.id}
                        value={item?.after?.translation}
                    />
                );
            case 'update':
                return (
                    <Box 
                        component="section" 
                        sx={{ 
                            p: 2,
                            backgroundColor: '#ffe0b2',
                            display: 'flex',
                            width: '100%'
                        }}
                    >
                        <Typography variant='body2' sx={{m1:1}}>
                            <b>{item?.before?.id}:</b>
                        </Typography>
                        <Typography variant='body2'>
                            <b>{item?.before?.translation}</b>
                        </Typography>
                        <EastIcon fontSize='small' sx={{mx: 4}} />
                        <Typography variant='body2'>
                            <b>{item?.after?.translation}</b>
                        </Typography>
                    </Box>
                );
                case 'delete':
                    return (
                        <ModifiedItem 
                            backgroundColor='#c8e6c9'
                            icon={<Add fontSize='small' />}
                            keyId={item?.before?.id}
                            value={item?.before?.translation}
                        />
                    );
                default:
                    return '';
        }
    };
    return (
        <ListItemText key={index}>{renderSwitchChangeType(item)}</ListItemText>
    )
}

export default KeyItemModified