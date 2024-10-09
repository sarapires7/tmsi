import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
    Grid2,
    Card,
    CardContent,
    Typography,
    Avatar,
    CardHeader,
    Divider,
    IconButton
} from '@mui/material';
import { Settings, Folder } from '@mui/icons-material';
import { Projects } from '../types/types';

interface ProjectItemProps {
    id: any;
    key?: string;
    item: Projects;
}

const ProjectItem: React.FC<ProjectItemProps> = (props) => {
    const navigate = useNavigate();


    const handleSettingsClick = () => {
        navigate(`/projects/${props.id}/settings`);
      };

    return (
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={props.item.id} sx={{ p: 1 }}>
            <Link
                to={`/projects/${props.item.id}/changes`}
                style={{
                    textDecoration: 'none',
                    cursor: 'pointer',
                }}
            >
                <Card variant='outlined' sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', 
                      borderRadius: '8px',
                      transition: 'transform 0.2s ease-in-out',
                      '&:hover': { 
                        transform: 'scale(1.03)', 
                        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)' 
                      }
                    }}>
                        <CardHeader
                        avatar={
                            <Avatar>
                                <Folder />
                            </Avatar>
                        }
                        title={
                            <Typography variant="h6" noWrap>
                                {props.item.name}
                            </Typography>
                        }
                        action={
                            <IconButton
                                aria-label="settings"
                                onClick={handleSettingsClick}
                            >
                                <Settings />
                            </IconButton>
                        }
                        sx={{ paddingBottom: 0 }}
                    />

<CardContent>
                        <Typography variant="body2" color="textSecondary">
                            Updated at: {new Date().toLocaleDateString()} {/* Exemplo de data */}
                        </Typography>
                    </CardContent>
                </Card>
            </Link>
        </Grid2>
    )
}

export default ProjectItem;