export const FIND_BY_IDS = `SELECT SUM(price) AS total FROM appointments WHERE id IN (?)`;
export const UPDATE_STATUS_TO_PENDING = `UPDATE appointments SET status = 1, external_transaction_id = ? WHERE id IN (?)`;
