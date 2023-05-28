import { createContext, useState } from 'react';

const EditProfileContext = createContext();

const EditProfileProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState({
    keyboardType: '',
    inputLabel: '',
    value: '',
    field: { name: '', type: '' },
  });
  const [toastContent, setToastContent] = useState({ backgroundColor: '', value: '' });
  return (
    <EditProfileContext.Provider value={{ modalContent, setModalContent, toastContent, setToastContent }}>
      {children}
    </EditProfileContext.Provider>
  );
};

export { EditProfileContext, EditProfileProvider };
