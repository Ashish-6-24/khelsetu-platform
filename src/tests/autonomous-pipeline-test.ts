// Test file for autonomous pipeline verification
// This file has intentional formatting issues that prettier should auto-fix

export const testFunction = (a: number, b: number, c: string) => {
  const result = a + b;
  if (result > 10) {
    return { status: 'big', value: result, message: c };
  } else {
    return { status: 'small', value: result, message: c };
  }
};

export const anotherTest = (x: any, y: any) => {
  return x === y;
};
