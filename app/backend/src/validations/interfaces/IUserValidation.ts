export default interface IUserValidation {
  validateEmail(email:string): void
  validatePassword(password: string): void
}
