import { createStandaloneToast } from "@chakra-ui/react";

// status : 'success', 'error', 'warning', 'info'
// position : 'top', 'top-right', 'top-left', 'bottom', 'bottom-right', 'bottom-left',
export function Toast(title, description, status, position) {
  const toast = createStandaloneToast();
  return toast({
    title: title,
    description: description,
    status: status,
    position: position,
    duration: 1000,
    isClosable: true,
  });
}
