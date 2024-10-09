import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from '@mui/material';

interface ProjectSettingsParams {
  id: string;
}

const ProjectSettings: React.FC = () => {
  const { id } = useParams<any>();
  const [project, setProject] = useState<any>(null);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectData = {};
        setProject(projectData);
        setName("Name");
        setDescription("description");
      } catch (err) {
        setError('Erro ao carregar as configurações do projeto.');
      }
    };
    fetchProject();
  }, [id]);

  const handleSave = async () => {
    try {
      
      setSuccess('Configurações salvas com sucesso.');
    } catch (err) {
      setError('Erro ao salvar as configurações.');
    }
  };

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Configurações do Projeto
      </Typography>
      {success && <Alert severity="success">{success}</Alert>}
      <Box mt={4}>
        <TextField
          label="Nome do Projeto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Box mt={4}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Salvar Configurações
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ProjectSettings;
