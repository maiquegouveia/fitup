import React from 'react';
import { Popover, Button, Box, Text, NativeBaseProvider } from 'native-base';
import CreateDishPopoverBody from './CreateDishPopoverBody';

function Example() {
  return (
    <Box paddingTop={5}>
      <Popover
        trigger={(triggerProps) => {
          return (
            <Button {...triggerProps} shadow={2} backgroundColor="#256D1B">
              <Text color="white" fontWeight="semibold" fontSize="md">
                Criar Prato
              </Text>
            </Button>
          );
        }}
      >
        <Popover.Content accessibilityLabel="Delete Customerd" w="56">
          <Popover.Arrow />
          <Popover.CloseButton />
          <Popover.Header>Criar Prato</Popover.Header>
          <Popover.Body>
            <CreateDishPopoverBody />
          </Popover.Body>
          <Popover.Footer justifyContent="flex-end">
            <Button.Group space={2}>
              <Button colorScheme="coolGray" variant="ghost">
                Cancel
              </Button>
              <Button colorScheme="danger">Delete</Button>
            </Button.Group>
          </Popover.Footer>
        </Popover.Content>
      </Popover>
    </Box>
  );
}

export default () => {
  return (
    <NativeBaseProvider>
      <Example />
    </NativeBaseProvider>
  );
};
