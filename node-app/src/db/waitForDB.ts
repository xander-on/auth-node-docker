// import { getErrorMessage } from "../helpers/getErrorMessage";
// import db from "./connection";



// export const waitForDatabase = async() => {

//     return new Promise<void>((resolve, reject) => { // Agregar '<void>' para especificar el tipo de resolución
//         const maxAttempts = 30; // Número máximo de intentos
//         const delay = 5000; // Retraso entre intentos en milisegundos (5 segundos en este ejemplo)
//         let attempts = 0;

//         async function checkConnection() {
//             try {
//                 await db.authenticate();
//                 console.log('Conexión exitosa a la base de datos');
//                 resolve(); // Llamar 'resolve' sin argumentos ya que Promise<void> se espera que no devuelva un valor
//             } catch (error) {
//                 attempts++;
//                     const message =  getErrorMessage(error);

//                  // Verificar el mensaje de error para detectar errores de autenticación
//                  if ( message.includes('Access denied') ) {
//                     console.error('Error de autenticación: Los datos de conexión son incorrectos.');
//                     reject(error);
//                 } else if (attempts >= maxAttempts) {
//                     reject(new Error('No se pudo conectar a la base de datos después de varios intentos.'));
//                 } else {
//                     setTimeout(checkConnection, delay);
//                     console.log(`Intento ${attempts}/${maxAttempts} - Error: ${message}`);
//                 }
//             }
//         }

//         checkConnection();
//     });

// }
