export const FIND_BY_IDS = `SELECT SUM(price) AS total FROM appointments WHERE id IN (?)`;
