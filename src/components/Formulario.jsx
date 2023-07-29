import {useState, useEffect} from 'react'; //Estos son los Hooks mas utilizados junto con el useContext
import Error from './Error';

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {

  const [nombre, setNombre] = useState(''); /** RECUERDA LAS SIGUIENTES REGLAS PARA LOS HOOKS: 1.-NO PUEDEN IR POR FUERA DEL COMPONENTE, TIENEN QUE IR INMEDIATAMENTE DESPUES DE QUE FUE DECLARADA LA FUNCION. 2.-NO SE PUEDEN REGISTRAR DE FORMA CONDICIONAL. 3.-NO SE PUEDEN DECLARAR DESPUES DE UN RETURN.
  **/
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false);

  useEffect(() => {
    if( Object.keys(paciente).length > 0 ) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
    }
  }, [paciente]);

  const generarId = () => {
    const random = Math.random().toString(36).slice(2);
    const fecha = Date.now().toString(36);

    return random + fecha;

  }

  const handleSubmit = (e) => {
    e.preventDefault();

    //Validacion del Formulario
    if([nombre, propietario, email, fecha, sintomas].includes('')) {
      setError(true);
      return;
    }

    setError(false);

    //Objeto de paciente
    const objetoPaciente = { //Este es elobjeto en memoria de lo que leemos en el formulario
      nombre,
      propietario,
      email,
      fecha,
      sintomas
    }

    if( paciente.id ) {
      //Editando el registro
      objetoPaciente.id = paciente.id;

      const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState )

      setPacientes(pacientesActualizados);
      setPaciente({})

    } else {
      //Nuevo registro
      objetoPaciente.id= generarId();
      setPacientes([...pacientes, objetoPaciente]);

    }

    // console.log(objetoPaciente);

    //Reiniciar el formulario
    setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintomas('');

  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-3 mb-6">
        <h2 className="font-black text-gray-700 text-3xl text-center">Seguimiento
        Pacientes</h2>

        <p className="text-gray-700 text-lg mt-5 text-center mb-10">
          Añade Pacientes y {''}
          <span className="text-teal-500 font-bold">Administralos</span>
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-indigo-100 shadow-md rounded-lg py-10 px-5 mb-10"
        >
          { error && <Error><p>Todos los campos son obligatorios</p></Error> }
          <div className="mb-5">
            <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">
              Nombre Mascota
            </label>

            <input
              id="mascota"
              type="text"
              placeholder="Nombre de la mascota" 
              className="bg-transparent border-2 border-gray-400 w-full p-2 mt-2 placeholder-gray-500 rounded-md"
              value={nombre}
              onChange={ (e) => setNombre(e.target.value) } //onChange es un evento de React. En este caso estamos escribiendo sobre el estado de nombre con lo que el usuario va escribiendo en ese input utilizando la funcion de setNombre
            />
          </div>

          <div className="mb-5">
            <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">
              Nombre Propietario
            </label>

            <input
              id="propietario"
              type="text"
              placeholder="Nombre del Propietario" 
              className="bg-transparent border-2 border-gray-400 w-full p-2 mt-2 placeholder-gray-500 rounded-md"
              value={propietario}
              onChange={ (e) => setPropietario(e.target.value) }
            />
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Email Contacto Propietario" 
              className="bg-transparent border-2 border-gray-400 w-full p-2 mt-2 placeholder-gray-500 rounded-md"
              value={email}
              onChange={ (e) => setEmail(e.target.value) }
            />
          </div>

          <div className="mb-5">
            <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">
              Alta
            </label>

            <input
              id="alta"
              type="date"
              className="bg-transparent border-2 border-gray-400 w-full p-2 mt-2 placeholder-gray-500 rounded-md"
              value={fecha}
              onChange={ (e) => setFecha(e.target.value) }
            />
          </div>

          <div className="mb-5">
            <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">
              Sintomas
            </label>

            <textarea
              id="sintomas"
              className="bg-transparent border-2 border-gray-400 w-full p-2 mt-2 placeholder-gray-500 rounded-md"
              placeholder="Describe los Sintomas"
              value={sintomas}
              onChange={ (e) => setSintomas(e.target.value) }
            />
          </div>

          <input
            type="submit"
            className="bg-teal-500 w-full p-3 text-white uppercase font-bold cursor-pointer hover:bg-teal-600 transition-colors"
            value={ paciente.id ? 'Editar Paciente' : 'Agregar Paciente' }
          
          />

        </form>
        <p className="font-semibold text-xl text-center text-neutral-600">Created By Jonathan Morales with <span className="text-2xl text-teal-500">React JS</span></p>
    </div>
  )
}

export default Formulario