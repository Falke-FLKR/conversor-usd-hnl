const URL_TASAS = 'https://open.er-api.com/v6/latest/USD';

async function obtenerTasaHNL() {
  const respuesta = await fetch(URL_TASAS);
  if (!respuesta.ok) {
    throw new Error('No se pudo conectar con el servicio de tasas de cambio.');
  }

  const datos = await respuesta.json();
  if (datos.result !== 'success') {
    throw new Error('La API no devolvió la tasa de cambio.');
  }

  return datos.rates.HNL;
}

export default obtenerTasaHNL;
