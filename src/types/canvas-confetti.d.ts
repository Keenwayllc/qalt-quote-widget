declare module "canvas-confetti" {
  type ConfettiOptions = Record<string, unknown>;

  type ConfettiFunction = (options?: ConfettiOptions) => Promise<null> | null;

  const confetti: ConfettiFunction;
  export default confetti;
}
