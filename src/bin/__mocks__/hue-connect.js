const discover = jest.fn(() => {
  const cancel = jest.fn();
  discover.cancel = cancel;

  return { cancel };
});

export default discover;
