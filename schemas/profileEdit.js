import * as yup from 'yup';

const nameRegex = `^[a-zA-Z0-9]+$`;

export default yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(6, 'Nome deve ter entre 6 e 100 caracteres!')
    .max(100, 'Nome deve ter entre 6 e 100 caracteres!')
    .matches(nameRegex, { message: 'Não permitido caracteres especiais. Ex: @ # ! *' })
    .required('Obrigatório!'),
  email: yup.string().trim().email('Digite um email válido!').required('Obrigatório!'),
  phone: yup.string().trim().min(11, 'Digite um telefone válido!').max(11, 'Digite um telefone válido!'),
  weight: yup.number(),
  height: yup.number(),
  password: yup.string().trim().min(6, 'Senha deve ter no mínimo 6 caracteres!'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'As senhas não combinam!'),
});
