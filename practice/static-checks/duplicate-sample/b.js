export function welcomeGuest(name) {
  const greeting = `Hello ${name}`;
  if (greeting.length > 5) {
    return greeting;
  }
  return 'Hi there';
}

export const helper = () => {
  const payload = { value: 42 };
  return payload.value;
};
