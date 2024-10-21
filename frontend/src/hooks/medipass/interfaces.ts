export interface IProvider {
  lastName: string
  firstName: string
  providerNumber: string
}

export interface ITransactionItem {
  code: string
  amount: number
  description: string
}

export interface IPatient {
  firstName: string
  lastName: string
  dateOfBirth: string
  medicareNumber?: string
}

export type TOnClose = () => void
export type TOnError = () => void
export type TSuccess = () => void
export type TOnCancel = () => void
export type TOnUnmount = () => void
export type TCloseModal = () => void
export type TOnTransactionCreated = () => void
export type TOnTransactionUpdated = () => void

export interface TTransactionAttributes {
  payer: any
  claimType: string
  patient: IPatient
  items: ITransactionItem[]

  reference?: string
  provider?: IProvider
}
