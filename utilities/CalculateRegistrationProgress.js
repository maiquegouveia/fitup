export default (userData) => {
  let per = 1;
  const x = per / 7;
  if (userData.altura === null) per -= x;
  if (userData.email === null) per -= x;
  if (userData.peso === null) per -= x;
  if (userData.foto_perfil === null) per -= x;
  if (userData.telefone === null) per -= x;
  if (userData.senha === null) per -= x;
  if (userData.nome === null) per -= x;
  return per;
};
