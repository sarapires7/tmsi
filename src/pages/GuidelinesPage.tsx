import React from "react";
import {
  Container,
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Alert,
  AlertTitle,
} from "@mui/material";

const GuidelinesPage: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ paddingTop: 4 }}>
      {/* Título da página */}
      <Typography variant="h3" component="h1" gutterBottom>
        Key Creation Guidelines
      </Typography>
      
      {/* Introdução */}
      <Typography variant="body1" gutterBottom>
        These guidelines provide the best practices and structure to follow when creating new keys. Keys should be concise, descriptive, and follow a clear naming convention to ensure easy identification and translation across the project.
      </Typography>
      
      {/* Divisor */}
      <Divider sx={{ marginY: 4 }} />
      
      {/* Seção 1 - Naming Convention */}
      <Box mb={4}>
        <Typography variant="h5" component="h2" gutterBottom>
          1. Naming Convention
        </Typography>
        <Typography variant="body1" paragraph>
          Keys should follow a structured format using lower case letters and underscores (_). Each key should reflect its context and purpose clearly. Avoid generic names that do not indicate the use of the key.
        </Typography>
        
        {/* Exemplo de Boas e Más práticas */}
        <Paper variant="outlined" sx={{ padding: 2, backgroundColor: "#f9f9f9" }}>
          <Typography variant="subtitle2" gutterBottom><b>Example:</b></Typography>
          <Alert severity="success" sx={{ marginBottom: 2 }}>
            <AlertTitle>Good Practice</AlertTitle>
            <Typography variant="body2">
              <code>user_profile_name</code> - Descriptive and follows naming convention.
            </Typography>
          </Alert>
          <Alert severity="error">
            <AlertTitle>Bad Practice</AlertTitle>
            <Typography variant="body2">
              <code>name</code> - Too generic and does not provide context.
            </Typography>
          </Alert>
        </Paper>
      </Box>
      
      {/* Seção 2 - Structure of Keys */}
      <Box mb={4}>
        <Typography variant="h5" component="h2" gutterBottom>
          2. Key Structure
        </Typography>
        <Typography variant="body1" paragraph>
          Keys should be structured hierarchically when necessary. This allows grouping of related items and improves maintainability. For example, group keys related to a specific module or component.
        </Typography>
        
        {/* Exemplo de Estrutura */}
        <Paper variant="outlined" sx={{ padding: 2, backgroundColor: "#f9f9f9" }}>
          <Typography variant="subtitle2" gutterBottom><b>Example:</b></Typography>
          <Typography variant="body2">
            <code>dashboard_user_profile_edit_button</code> - Key for the "Edit" button in the user profile section of the dashboard.
          </Typography>
        </Paper>
      </Box>
      
      {/* Seção 3 - Avoiding Redundancy */}
      <Box mb={4}>
        <Typography variant="h5" component="h2" gutterBottom>
          3. Avoiding Redundancy
        </Typography>
        <Typography variant="body1" paragraph>
          Do not repeat the same information in different parts of the key. Keep the key concise, and ensure each part adds value.
        </Typography>
        <Paper variant="outlined" sx={{ padding: 2, backgroundColor: "#f9f9f9" }}>
          <Alert severity="error">
            <AlertTitle>Redundant Key</AlertTitle>
            <Typography variant="body2">
              <code>dashboard_dashboard_button_click</code> - The word "dashboard" is repeated unnecessarily.
            </Typography>
          </Alert>
        </Paper>
      </Box>

      {/* Seção 4 - Examples of Correct Keys */}
      <Box mb={4}>
        <Typography variant="h5" component="h2" gutterBottom>
          4. Examples of Correct Keys
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary={<code>login_form_submit_button</code>}
              secondary="Submit button on the login form"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={<code>settings_account_change_password</code>}
              secondary="Change password button in the account settings"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={<code>notification_new_message_alert</code>}
              secondary="Alert for a new message notification"
            />
          </ListItem>
        </List>
      </Box>

      {/* Dicas Finais */}
      <Divider sx={{ marginY: 4 }} />
      <Box mb={4}>
        <Typography variant="h6" component="h3" gutterBottom>
          Final Tips:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Keep the keys simple and understandable." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Use underscores to separate words." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Avoid abbreviations that are not commonly understood." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Test your keys to ensure clarity and consistency across the project." />
          </ListItem>
        </List>
      </Box>
      
      {/* Rodapé com link para documentação extra */}
      <Box mt={6}>
        <Typography variant="body2" color="textSecondary" align="center">
          For more information, visit our full <a href="#">Documentation</a>.
        </Typography>
      </Box>
    </Container>
  );
};

export default GuidelinesPage;
