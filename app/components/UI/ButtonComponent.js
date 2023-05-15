import { Button } from 'react-native-paper';

const ButtonComponent = props => {
  return (
    <Button textColor="white" style={[{ width: 100, backgroundColor: 'green' }, props.styles]} onPress={props.onPress}>
      {props.btnText}
    </Button>
  );
};

export default ButtonComponent;
