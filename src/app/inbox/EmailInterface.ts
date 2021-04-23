export interface SendEmailStructure{
  subject:string,
  text:string,
  to:string,
}
export interface EmailSummary{
  id:string,
  from:string,
  subject:string
}
export interface EmailStructure extends EmailSummary{
  to:string,
  text:string,
  html:string
}