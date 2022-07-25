import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux/es/exports';

const ProtectedRoutes = () => {
    const user = useSelector((state)=> state.user)
		// Aquí va la condición. Puede ser una condición de cualquier tipo. Lo que 
		// Importa es que valide si el usuario está loggeado o no
    if(user){
        return <Outlet />
    } else { 
        return <Navigate to='/' />
    }                     // Aquí le debemos decir la ruta a la que queremos llevar
};                        // al usuario si no está autenticado

export default ProtectedRoutes;