import { useContext } from 'react';
import { SessionContext } from 'providers/SessionProvider';

const useSessionContext = () => useContext(SessionContext);

export default useSessionContext;
