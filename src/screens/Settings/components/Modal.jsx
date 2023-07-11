import { useContext } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Button, Dialog, Text } from 'react-native-paper';
import { ThemeContext } from '../../../../contexts/ThemeProvider';

export default ({ visible, hideDialog }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Dialog style={styles.dialogContainer} visible={visible} onDismiss={hideDialog}>
      <Dialog.Title style={[styles.title, { fontFamily: theme.font.bold }]}>Sobre Nós</Dialog.Title>
      <Dialog.Content style={styles.contentContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={[styles.contentText, { fontFamily: theme.font.semiBold }]}>
            A equipe do FitUP pensou em um sistema para auxiliar a saúde alimentar do usuário, com fácil acessibilidade
            e agradável para todos os públicos, tendo como público alvo atletas ou pessoas que seguem um cronograma
            alimentar, ele se concentra em oferecer informação para uma qualidade de vida melhor.{'\n'} Temos como
            objetivo ser reconhecidos no mercado, provendo qualidade para nossos clientes, através da criação do FitUP,
            um aplicativo que dá orientações para uma vivencia mais saudável.{'\n'} Com recursos capazes de auxiliar na
            melhora dos hábitos alimentícios, com um banco de dados vasto que armazena os valores nutrcionais dos
            alimentos, e traz informações como IMC e consumo de água de cada usuário.
          </Text>
        </ScrollView>
      </Dialog.Content>
      <Dialog.Actions style={styles.btnContainer}>
        <Button
          labelStyle={[styles.btnLabel, { fontFamily: theme.font.semiBold }]}
          style={styles.btn}
          onPress={hideDialog}
        >
          Fechar
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  dialogContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
  contentContainer: {
    maxHeight: 300,
  },
  title: {
    alignSelf: 'center',
    fontSize: 28,
    color: '#FF7900',
  },
  btnContainer: {},
  btn: {
    width: '100%',
    backgroundColor: 'red',
    borderRadius: 5,
  },
  btnLabel: {
    color: 'white',
  },
  contentText: {
    textAlign: 'justify',
    lineHeight: 20,
    color: '#FF7900',
  },
});
