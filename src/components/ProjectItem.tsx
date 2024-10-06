import React from 'react';
import { Link } from 'react-router-dom';
import {
    Grid2,
    Card,
    CardContent,
    Typography,
    Avatar,
    CardHeader,
    Divider
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { Projects } from '../types/types';

interface ProjectItemProps {
    key?: string;
    item: Projects;
}

const ProjectItem: React.FC<ProjectItemProps> = (props) => {
    return (
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={props.item.id} sx={{ p: 1 }}>
            <Link
                to={`/projects/${props.item.id}/changes`}
                style={{
                    textDecoration: 'none',
                    cursor: 'pointer',
                }}
            >
                <Card variant='outlined' sx={{ borderRadius: 2, boxShadow: 3 }}>
                    <CardHeader
                        avatar={
                            <Avatar>
                                <AccountCircle />
                            </Avatar>
                        }
                        titleTypographyProps={
                            <Typography variant='h6' sx={{ color: '#001950' }}>
                                {props.item.name}
                            </Typography>
                        }
                        subheader={`Updated at: `} 
                    />
                    <Divider />
                    <CardContent>
                        <Typography variant='body1' color="textSecondary">
                            Account: {props.item.account.name}
                        </Typography>
                        <Typography variant='body2' color="textSecondary">
                            Created at: 
                        </Typography>
                    </CardContent>
                </Card>
            </Link>
        </Grid2>
    )
}

export default ProjectItem;