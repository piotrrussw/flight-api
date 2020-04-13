import { useContext } from 'react';
import { AuthContext } from 'providers/AuthProvider';

const useAuthContext = () => useContext(AuthContext);

export default useAuthContext;
