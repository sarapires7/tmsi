import React from 'react';
import { Button, TextField, Typography, Box, MenuItem, FormControl, InputLabel, Select, Chip } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select'; 
import FormControlInput from './FormControlInput';

const AddKeyForm: React.FC<any> = ({ formData, setFormData, step, errors }) => {

  // Handler para mudança de inputs (geral)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  // Handler para mudanças em selects múltiplos (BU, Breakpoints)
  const handleSelectChange = (event: SelectChangeEvent<string[]>, name: string) => {
    setFormData((prev: any) => ({ ...prev, [name]: event.target.value }));
  };

  // Geração das keys sugeridas
  const suggestedKeys = formData.module && formData.bu && formData.breakpoints && formData.freeText
    ? formData.bu.flatMap((bu: string) => 
        formData.breakpoints.map((bp: string) => 
          `${formData.module}.${bu}.${bp}.${formData.freeText}`.toLowerCase()))
    : [];

  return (
    <form>
      {step === 1 && (
        <>
          <Typography variant="h5">Step 1</Typography>

          <FormControlInput
            errors={errors.module}
            value={formData.module}
            label="Module"
            options={['Module1', 'Module2', 'Module3']}
            handleSelectChange={(e: SelectChangeEvent<string>) => handleSelectChange(e as SelectChangeEvent<string[]>, 'module')}
            name="module"
          />

          {/* Campo BU (Seleção Múltipla) */}
          <FormControl fullWidth margin="normal">
            <InputLabel>BU</InputLabel>
            <Select
              multiple
              value={formData.bu}
              onChange={(e) => handleSelectChange(e as SelectChangeEvent<string[]>, 'bu')}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value: string) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {['BU1', 'BU2', 'BU3'].map((bu) => (
                <MenuItem key={bu} value={bu}>
                  {bu}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Campo Breakpoints (Seleção Múltipla) */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Breakpoints</InputLabel>
            <Select
              multiple
              value={formData.breakpoints}
              onChange={(e) => handleSelectChange(e as SelectChangeEvent<string[]>, 'breakpoints')}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value: string) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {['BP1', 'BP2', 'BP3'].map((bp) => (
                <MenuItem key={bp} value={bp}>
                  {bp}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Free text"
            fullWidth
            margin="normal"
            name="freeText"
            value={formData.freeText}
            onChange={handleInputChange}
            error={errors.freeText}
            helperText={errors.freeText ? "This field is required." : ""}
            required
          />

          {/* Campo Repo adicionado ao Step 1 */}
          <FormControlInput
            errors={errors.repo}
            value={formData.repo}
            label="Repo"
            options={['Repo1', 'Repo2', 'Repo3']}
            handleSelectChange={(e: SelectChangeEvent<string>) => handleSelectChange(e as SelectChangeEvent<string[]>, 'repo')}
            name="repo"
          />

          <Typography variant="body1">
            Suggested Key: {suggestedKeys.length > 0 ? suggestedKeys.join(', ') : 'N/A'}
          </Typography>
        </>
      )}

      {step === 2 && (
        <>
          <Typography variant="h5">Step 2</Typography>

          {suggestedKeys.map((key: any, index: any) => (
            <Box key={key} sx={{ mb: 2 }}>
              <Typography variant="body1">Key: {key}</Typography>

              <TextField
                label={`Translation for ${key}`}
                fullWidth
                margin="normal"
                name={`translation_${index}`}
                value={formData.translations?.[index] || ''}
                onChange={(e) =>
                  setFormData((prev: any) => ({
                    ...prev,
                    translations: {
                      ...prev.translations,
                      [index]: e.target.value,
                    },
                  }))
                }
                error={errors.translation}
                helperText={errors.translation ? "This field is required." : ""}
                required
              />

              <Button variant="contained" component="label">
                Upload Screenshot
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) =>
                    setFormData((prev: any) => ({
                      ...prev,
                      screenshots: {
                        ...prev.screenshots,
                        [index]: e.target.files?.[0],
                      },
                    }))
                  }
                />
              </Button>
            </Box>
          ))}
        </>
      )}
    </form>
  );
};

export default AddKeyForm;
