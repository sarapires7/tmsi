import React from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    IconButton,
    List,
    ListItem,
    Typography
} from '@mui/material';
import {ExpandMore, East} from '@mui/icons-material';
import { Edit, Archive, Add, Remove } from '@mui/icons-material'
import ModifiedItem from "./ModifiedItem";
import { ChangeProps } from '../types/types';

interface AccordionItemsProps {
    change: ChangeProps;
    onEdit: () => void;
    onDelete: () => void;
}

const AccordionItems: React.FC<AccordionItemsProps> = ({
    change,
    onEdit,
    onDelete
}) => {
    const renderSwitchChangeType = (item: any) => {
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
                        <East fontSize='small' sx={{mx: 4}} />
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
        <Accordion key={change.id} sx={{mb:2}}>
            <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    width="100%"
                >
                    <Typography sx={{fontWeight: 'bold'}}>{change.issue}</Typography>
                    <Box>
                        <IconButton
                            onClick={onEdit}
                            size="small"
                            aria-label="edit"
                            color="primary"
                        >
                            <Edit />
                        </IconButton>
                        <IconButton
                            onClick={onDelete}
                            size="small"
                            aria-label="delete"
                            color="primary"
                        >
                            <Archive />
                        </IconButton>
                    </Box>
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <List>
                    {change.keys_modified.length > 0 ? (
                        change.keys_modified.map((item:any, index:number) => (
                            <ListItem key={index}>
                                {renderSwitchChangeType(item)}
                            </ListItem>
                        ))
                    ) : (
                        <Typography variant="body2">
                            At the moment, there is no change
                        </Typography>
                    )}
                </List>
            </AccordionDetails>
        </Accordion>
    )
}

export default AccordionItems