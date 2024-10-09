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
import { ExpandMore, East } from '@mui/icons-material';
import { Edit, Archive, Add, Remove } from '@mui/icons-material';
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
                icon = <East fontSize='small' color="warning" />;
                break;
            case 'delete':
                backgroundColor = '#ffcdd2'; // Vermelho claro para exclusões
                icon = <Remove fontSize='small' color="error" />;
                break;
            default:
                return null;
        }

        return (
            <ListItem sx={{ padding: 0 }}>
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
                                <East fontSize='small' sx={{ mx: 2 }} />
                                <b>{item?.after?.translation}</b>
                            </>
                        ) : (
                            <>
                                <b>{item?.before?.id}:</b> {item?.before?.translation}
                            </>
                        )}
                    </Typography>
                </Box>
            </ListItem>
        );
    };

    return (
        <Accordion key={change.id} sx={{ mb: 2 }}>
            <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    width="100%"
                >
                    {/* Título */}
                    <Typography sx={{ fontWeight: 'bold' }}>{change.issue}</Typography>

                    {/* Informações adicionais: status, branch, repositório */}
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        width="100%"
                        mt={1}  // Margem superior para espaçamento entre título e dados
                    >
                        <Box>
                            <Typography variant="body2"><b>Status:</b> status</Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2"><b>Branch:</b> branch</Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2"><b>Repositório:</b> repo</Typography>
                        </Box>
                    </Box>
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <List>
                    {change.keys_modified.length > 0 ? (
                        change.keys_modified.map((item: any, index: number) => (
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
    );
}

export default AccordionItems;
