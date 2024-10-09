import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Breadcrumbs,
  Link,
  Box,
} from '@mui/material';
import KeyList from '../components/KeyList';
import KeyItem from '../components/KeyItem';  // KeyItem simples, sem modificações
import DetailData from '../services/dataChanges.json';
import AppLayout from '../components/AppLayout';
import Loading from '../components/Loading';
import HeaderTitle from '../components/HeaderTitle';
import HeaderActions from '../components/HeaderActions';
import { Key } from '../types/types';

const ProjectKeysPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [keys, setKeys] = useState<Key[] | null>(null);
  const [inputValue, setInputValues] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectKeys = async () => {
      try {
        const projectData: any = DetailData;
        const project = projectData.find((item: { id: string }) => item.id === id);
        if (project) {
          setKeys(project.keys_unmodified); // Carregar apenas keys não modificadas
        } else {
          setKeys([]);
        }
      } catch (err) {
        setError('Falha ao carregar as keys do projeto.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjectKeys();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <AppLayout>
      <Container>
        <HeaderTitle page="Keys do Projeto" />

        {/* Breadcrumbs */}
        <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 2 }}>
          <Link color="inherit" href="/projects">
            Projetos
          </Link>
          <Typography color="text.primary">Keys</Typography>
        </Breadcrumbs>

        {/* Ações do cabeçalho com filtro */}
        <HeaderActions
                  filter={inputValue}
                  setFilter={(e) => setInputValues(e.target.value)}
                  label="Pesquisar por Key" 
                  handleDialogOpen={function (): void {
                      throw new Error('Function not implemented.');
                  } } 
                  title={''}        />

        {/* Lista de Keys */}
        {keys && keys.length > 0 ? (
          <KeyList
            items={keys}
            filter={inputValue}
            renderItem={(item) => <KeyItem item={item} />}  // Renderizar KeyItem sem modificação
            getItemKey={(item) => item.id}
          />
        ) : (
          <Typography>Nenhuma key disponível para este projeto.</Typography>
        )}
      </Container>
    </AppLayout>
  );
};

export default ProjectKeysPage;
