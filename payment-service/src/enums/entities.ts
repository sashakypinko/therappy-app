export enum EEntities {
  MEDIAS = "medias",
  PAYMENTS = "payments",

  USERS = "users",
  USER_DETAILS = "user_details",
  USER_SCHEDULES = "user_schedules",
  USER_ADDITIONAL = "user_additionals",
  USER_BANK_DETAILS = "user_bank_details",
  USER_SCHEDULE_OVERRIDES = "user_schedules_overrides",

  SERVICES = "services",
  SERVICES_CATEGORIES = "service_categories",

  APPOINTMENTS = "appointments",
  APPOINTMENT_REVIEW = "appointment_reviews",
  APPOINTMENTS_CANCELS = "appointment_cancels",
  APPOINTMENT_INTERVALS = "appointment_intervals",
}

export enum EUserRelations {
  USER_ID = "user_id",
  BANK_DETAILS = "bank_details"
}

export enum EPaymentStatus {
  FAILED = "FAILED",
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}
