export default userData => {
  let per = 1;
  if (userData.altura === null) per -= 0.125;
  if (userData.data_nascimento === null) per -= 0.125;
  if (userData.email === null) per -= 0.125;
  if (userData.peso === null) per -= 0.125;
  if (userData.foto_perfil === null) per -= 0.125;
  if (userData.telefone === null) per -= 0.125;
  if (userData.senha === null) per -= 0.125;
  if (userData.nome === null) per -= 0.125;
  return per;
};
