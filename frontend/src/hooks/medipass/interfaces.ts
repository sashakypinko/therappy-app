export enum EPaymentMethod {
  NEW_PAYMENT_CARD = "new-payment-card"
}

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

export type TOnCancel = () => void
export type TOnUnmount = () => void
export type TCloseModal = () => void
export type TOnTransactionCreated = () => void
export type TOnTransactionUpdated = () => void
export type TOnError = (response: IErrorTransaction) => void
export type TSuccess = (response: ISuccessTransaction) => void

export interface TTransactionAttributes {
  patient?: any
  chargeAmount: string
  providerNumber?: string
  invoiceReference: string
  paymentMethod: EPaymentMethod
}

interface Application {
  _id: string
  channel: string
  refSource: string
  displayName: string
  applicationId: string
}

interface Shipping {
  amountShipping: number
  amountHandling: number
  amountDiscount: number
  amountInsurance: number
  amountShippingRefund: number
  amountHandlingRefund: number
  amountInsuranceRefund: number
  amountShippingString: string
  amountHandlingString: string
  amountDiscountString: string
  amountInsuranceString: string
  amountShippingRefundString: string
  amountHandlingRefundString: string
  amountInsuranceRefundString: string
}

interface Patient {
  _id: string
  refId: string
  mobile: string
  status: string
  lastName: string
  refSource: string
  firstName: string
  dobString: string
  mobileE164: string
}

interface Practice {
  _id: string
  tz: string
  city: string
  state: string
  route: string
  email: string
  refId: string
  country: string
  address: string
  postcode: string
  lnglat: number[]
  fullName: string
  refSource: string
  displayName: string
  countryCode: string
  streetNumber: string
  subpremise: string | null
}

interface Staff {
  _id: string
  refId: string
  lastName: string
  firstName: string
  staffType: string
  refSource: string
}

interface Item {
  unit: string
  itemId: string
  fullName: string
  quantity: number
  amountFee: number
  amountTax: number
  isTaxable: boolean
  displayName: string
  serviceDate: string
  amountFeeNet: number
  amountFeeUnit: number
  amountCharged: number
  amountDiscount: number
  amountFeeString: string
  amountTaxString: string
  amountFeeNetUnit: number
  amountFeeNetString: string
  amountFeeUnitString: string
  amountChargedString: string
  amountDiscountString: string
  amountFeeNetUnitString: string
}

interface PaymentMethod {
  source: string
}

interface BankAccount {
  bsb: string
  bankName: string
  accountName: string
  accountNumber: string
}

interface Refund {
  shipping: Shipping
  claimItems: any[]
  otherItems: any[]
  amountShippingRefund: number
  amountShippingRefundString: string
}

interface IStatusHistory {
  status: string
  created: string
  createdByAccountId: string
  createdByApplicationId: string
  createdByAccountUsername: string
}

interface Payment {
  refund: Refund
  bankAccount: BankAccount
  paymentMethod: PaymentMethod
  statusHistory: IStatusHistory[]

  _id: string
  amount: number
  status: string
  created: string
  paymentId: string
  paymentDate: string
  paymentType: string
  origination: string
  gatewayCode: string
  gatewayRefId: string
  amountString: string
  createdByAccountId: string
  gatewayDescription: string
  createdByAccountUsername: string
  cardHolderAuthorisedPayment: boolean

  requested?: string
  responded?: string
  cardType?: string
  lastFour?: string
  methodType?: string
  statementDescriptor?: string
}

export type IErrorTransaction = string

export interface ISuccessTransaction {
  staff: Staff
  items: Item[]
  patient: Patient
  shipping: Shipping
  practice: Practice
  payments: Payment[]
  application: Application

  _id: string
  abn: string
  status: string
  created: string
  modified: string
  deviceId: string
  businessId: string
  currencyCode: string
  transactionId: string
  organisationId: string
  businessStatus: string
  _schemaVersion: string
  transactionType: string
  originatingFlow: string
  amountFeeString: string
  amountTaxString: string
  invoiceReference: string
  amountRefundString: string
  amountFeeNetString: string
  amountChargedString: string
  amountBalanceString: string
  amountDiscountString: string
  amountItemsFeeString: string
  amountClaimsGapString: string
  amountOutstandingString: string
  amountOutOfPocketString: string
  amountShippingFeeString: string
  createdByAccountUsername: string
  amountItemsChargedString: string
  amountItemsDiscountString: string
  amountShippingChargedString: string
  amountShippingDiscountString: string
  amountClaimsActualBenefitString: string
  amountClaimsExpectedBenefitString: string

  amountFee: number
  amountTax: number
  amountRefund: number
  amountFeeNet: number
  amountCharged: number
  amountBalance: number
  amountDiscount: number
  amountItemsFee: number
  amountClaimsGap: number
  amountOutstanding: number
  amountOutOfPocket: number
  amountShippingFee: number
  amountItemsCharged: number
  amountItemsDiscount: number
  amountShippingCharged: number
  amountShippingDiscount: number
  amountClaimsActualBenefit: number
  amountClaimsExpectedBenefit: number

  tags: any[]
  files: any[]
  claims: any[]
  webhooks: any[]
  otherItems: any[]
  specialties: any[]
  draftErrors: any[]
  externalReferences: any[]
}
