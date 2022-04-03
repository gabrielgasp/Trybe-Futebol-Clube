export type TBodyValidator = (body: unknown) => { code: number, message: string } | undefined;
