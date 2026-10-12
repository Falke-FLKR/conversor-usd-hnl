import { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Stack from '@mui/material/Stack'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import obtenerTasaHNL from './services/tasaService'

function formatearNumero(numero) {
  return numero.toLocaleString('es-HN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

function App() {
  const [cantidadDolares, setCantidadDolares] = useState('')
  const [tasa, setTasa] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const cargarTasa = async () => {
      try {
        const tasaHNL = await obtenerTasaHNL()
        setTasa(tasaHNL)
      }
      catch (err) {
        setError(err.message)
      }
      finally {
        setCargando(false)
      }
    }
    cargarTasa()
  }, [])

  const dolares = Number(cantidadDolares)
  const totalLempiras = dolares > 0 ? dolares * tasa : 0

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Conversor USD → HNL
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 3 }}>
          Escribe una cantidad en dólares y mira el total en lempiras.
        </Typography>

        {cargando && (
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <CircularProgress size={24} />
            <Typography>Cargando...</Typography>
          </Stack>
        )}

        {error && <Alert severity="error">{error}</Alert>}

        {tasa !== null && (
          <Stack spacing={3}>
            <Alert severity="info">
              1 USD = {formatearNumero(tasa)} HNL
            </Alert>

            <TextField
              label="Cantidad en dólares"
              type="number"
              fullWidth
              autoFocus
              value={cantidadDolares}
              onChange={(e) => setCantidadDolares(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                },
                htmlInput: { min: 0, step: '0.01' },
              }}
            />

            <Divider />

            <div>
              <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                Total en lempiras
              </Typography>
              <Typography variant="h3" sx={{ color: 'primary.main' }}>
                L {formatearNumero(totalLempiras)}
              </Typography>
            </div>
          </Stack>
        )}

        <Typography variant="body2" sx={{ mt: 4, textAlign: 'center' }}>
          <Link href="https://www.exchangerate-api.com" target="_blank" rel="noopener">
            Rates By Exchange Rate API
          </Link>
        </Typography>
      </Paper>
    </Container>
  )
}

export default App
