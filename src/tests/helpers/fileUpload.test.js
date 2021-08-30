// import cloudinary from 'cloudinary';
import { fileUpload } from "../../helpers/fileUpload";

/* cloudinary.config({ 
  cloud_name: 'cyancode', 
  api_key: '194527728169578', 
  api_secret: 'd7n9gY4vvkEnkizb1uEbvU0vbAk',
  secure: true
});
 */

describe('Pruebas sobre el file Upload', () => {
  
  test('Debe de cargar un archivo y retornar el URL', () => {
    
    /* const resp = await fetch('https://cdn.iconscout.com/icon/free/png-512/react-1-282599.png');
    const blob = await resp.blob();

    const file = new File([blob], 'foto.png');
    const url = await fileUpload( file );

    expect( typeof url ).toBe('string');

    // Borrar imagen por id para limpiar
    const segments = url.split('/');
    const imgId = segments[segments.lenght - 1].replace('.png', '')
    await cloudinary.v2.api.delete_resources(`${imgId}`, {}, () => {
      done();
    }); */
  }) // 50000)
  
  test('Debe de retornar un error', async () => {

    const file2 = new File([], 'foto.png');
    const url = await fileUpload( file2 )

    expect( url ).toBe( null )
  })
})

