import { useContext, useState } from 'react';
import { View, Modal, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Button, Dialog, Portal, PaperProvider, Text } from 'react-native-paper';
import { ThemeContext } from '../../../../contexts/ThemeProvider';

const MyComponent = ({ visible, hideDialog }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Modal onBackdropPress={hideDialog} animationType="slide" visible={visible} transparent={true}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.backgroundModal }}>
        <View style={[styles.box, { backgroundColor: theme.backgroundTest }]}>
          <View style={[styles.termsAndConditions, { backgroundColor: theme.backgroundTest }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={[styles.text, { color: theme.fontColor.textBlack }]}>
                TERMOS E CONDIÇÕES DE USO{`\n`}
                {`\n`} Estes Termos e Condições de Uso (“Termos de Uso”), determinam as principais regras que devem ser
                observadas por todos que realizem download, acessem e utilizem o aplicativo FitUp.
                {`\n`}
                {`\n`}
                Ao realizar o download, acessar e utilizar o aplicativo FitUp, você deve observar e cumprir
                integralmente as disposições destes Termos de Uso. Por favor, não realize o download do aplicativo ou
                utilize a plataforma caso você não aceite alguma das condições aqui estabelecidas.{`\n`}
                {`\n`} Ao acessar o aplicativo FitUp você está ciente dos Termos Legais apontados abaixo: Não é
                permitido que menores de idade (pessoas com idade inferior a 18 anos) efetuem compras ou se envolvam em
                outros atos legais no aplicativo FitUp sem o consentimento dos pais ou responsável legal.{`\n`} {`\n`}{' '}
                ACEITAÇÃO DOS TERMOS
                {`\n`}
                {`\n`} O presente Termo de Uso estabelece obrigações contratadas de livre e espontânea vontade, por
                tempo indeterminado, entre a plataforma e as pessoas físicas ou jurídicas, usuárias do aplicativo.{`\n`}{' '}
                Ao utilizar o software o usuário aceita integralmente as presentes normas e compromete-se a observá-las,
                sob o risco de aplicação das penalidades cabíveis.{`\n`}
                {`\n`} A aceitação do presente instrumento é imprescindível para o acesso e utilização de quaisquer
                serviços fornecidos pela empresa. Caso não concorde com as disposições deste instrumento, o usuário não
                deve utilizá-los.{`\n`}
                {`\n`} FUNCIONALIDADES DO APLICATIVO{`\n`}
                {`\n`} 2.1. O aplicativo foi desenvolvido para, dentre outras finalidades: (i) auxiliar o controle da
                alimentação dos usuários; (ii) disponibilizar listas de diversos alimentos com suas especificações
                nutricionais necessárias; (iii) notificar os usuários na possível exigência de substituição de itens na
                sua tabela alimentar;{`\n`}
                {`\n`} 2.1.1. O aplicativo e suas funcionalidades são oferecidos ao usuário na maneira como estão
                disponíveis. No entanto, nos reservamos o direito de aprimorá-lo e/ou atualizá-lo. Desta forma, Você
                reconhece que não estamos obrigados a manter estrutura ou layout específicos.{`\n`}
                {`\n`} 2.2. Ao utilizar o Aplicativo, o usuário poderá receber notificações “push”, avisos e informações
                relevantes da sua lista nutricional de alimentos e contatos com os nutricionistas no seu dispositivo.
                Caso não tenha interesse em tal conteúdo, poderá desativar as notificações diretamente nas configurações
                do seu dispositivo.
                {`\n`}
                {`\n`} 2.3. O sistema tem como funcionalidade dispor de profissionais nutricionistas mais próximos a
                partir da permissão à localização do usuário. A contratação de um nutricionista caberá única e
                exclusivamente ao usuário. 2.3.1 O contato entre o usuário e o nutricionista deve ser guardado no banco
                de dados do software por um período de 30 dias.{`\n`}
                {`\n`} 2.4. Para acesso às permissões de cada tipo de usuário, deve ser realizado o login. Em caso do
                cliente ser um nutricionista, o cadastro deve seguir os mesmo passo da criação de conta de um cliente
                comum, diferenciando pela necessidade de exibir o CRN (Conselho Regional de Nutricionistas), para
                garantir que o utilizador é um profissional da área.
                {`\n`}
                {`\n`}
                2.5. A lista de alimentos e sua tabela nutricional estará disponível na aba “Alimentos favoritos”,
                podendo assim, o usuário modificá-la a qualquer momento.{`\n`}
                {`\n`} 2.6. O contato do nutricionista com o usuário deve ser feito a partir de um chat do FitUp. Para
                segurança dos clientes, as conversas devem ser guardadas no banco de dados do sistema durante 30 dias.
                {`\n`}
                {`\n`} 2.7. Nosso sistema permite que nutricionistas avaliem pratos montados de qualquer usuário do
                FitUp, fique ciente de que qualquer nutricionista pode fazer comentários em seus pratos favoritos.{`\n`}
                {`\n`} SENHA DE ACESSO E MANTER CONECTADO{`\n`}
                {`\n`} 3.1 Para garantir a segurança das informações dos usuários no Aplicativo FitUp, o acesso só é
                permitido para os usuários que se identificarem corretamente com as suas credenciais de acesso (login e
                senha). A senha é uma informação de uso pessoal e o usuário se compromete a mantê-la em segurança e
                sigilo para que não seja utilizada indevidamente por terceiros.{`\n`}
                {`\n`} 3.2. O usuário deverá concordar em fornecer e manter informações corretas sobre sua conta,
                incluindo um endereço de e-mail válido, para que possamos enviar notificações.{`\n`}
                {`\n`} 3.3. O FitUp permite o cadastro de qualquer pessoa, desde que seu e-mail seja válido. Nós
                permitimos que qualquer usuário, independente da faixa etária, utilize as funcionalidades do aplicativo.
                Para menores de idade, qualquer pagamento ou consulta com nutricionista deve ser realizado com a
                consciência e permissão dos pais.{`\n`}
                {`\n`} PERMISSÃO DE ACESSO A LOCALIZAÇÃO E ARMAZENAMENTO{`\n`}
                {`\n`} 4.1. É de extrema importância para ganhos financeiros, que o software permita que usuários possam
                localizar nutricionistas próximos pelo aplicativo, facilitando as consultas entre nutricionistas e
                usuários.{`\n`}
                {`\n`} 4.2. FitUp utiliza do acesso ao armazenamento com intenção de que todo utilizador do sistema
                possa alterar a sua foto de perfil. Para utilizar tais funcionalidades do aplicativo, o cliente deve
                permitir acesso a localização.
              </Text>
              <View style={{ alignItems: 'flex-end', marginTop: 25 }}>
                <Button
                  labelStyle={{ fontSize: 18, color: 'white' }}
                  onPress={hideDialog}
                  style={styles.button}
                  visible={visible}
                >
                  Fechar
                </Button>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  termsAndConditions: {
    height: 400,
    width: 300,
    padding: 5,
    backgroundColor: '#ccc',
  },
  button: {
    backgroundColor: 'red',
    borderRadius: 5,
    width: '100%',
  },
  text: {
    fontSize: 14,
  },
  box: {
    height: '55%',
    backgroundColor: 'white',
    width: '85%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
});
export default MyComponent;
