export interface IHashProvider {
  hashPassword(password: string, salt: number): Promise<string>;
  comparePassword(password: string, hashPassword: string): Promise<boolean>;
}
