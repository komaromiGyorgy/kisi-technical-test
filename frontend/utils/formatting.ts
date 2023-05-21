export function toKey(input: string) {
  return input.toLowerCase().replaceAll(" ", "_");
}

export function intToChar(int: number) {
  const code = "A".charCodeAt(0);
  return String.fromCharCode(code + int);
}
