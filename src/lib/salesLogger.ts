import fs from "fs";
import path from "path";

export interface SaleRecord {
  paymentId: string;
  orderId: string;
  email: string;
  productKey: string;
  productName: string;
  amountUSD: number;
  amountINR: number;
  timestamp: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const SALES_FILE = path.join(DATA_DIR, "sales.json");

/**
 * Safely logs a sale to the local database file (data/sales.json).
 * Handles directory and file creation if they do not exist.
 */
export async function logSale(sale: Omit<SaleRecord, "timestamp">): Promise<boolean> {
  try {
    // 1. Ensure the data directory exists
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    // 2. Read existing sales or initialize empty array
    let sales: SaleRecord[] = [];
    if (fs.existsSync(SALES_FILE)) {
      try {
        const fileContent = fs.readFileSync(SALES_FILE, "utf-8");
        if (fileContent.trim()) {
          sales = JSON.parse(fileContent);
        }
      } catch (parseError) {
        console.error("Failed to parse sales file. Initializing fresh array.", parseError);
        // If file is corrupted, backup and start fresh
        fs.writeFileSync(path.join(DATA_DIR, `sales_backup_${Date.now()}.json`), fs.readFileSync(SALES_FILE, "utf-8"));
        sales = [];
      }
    }

    // 3. Append the new sale with current timestamp
    const newRecord: SaleRecord = {
      ...sale,
      timestamp: new Date().toISOString(),
    };
    sales.unshift(newRecord); // Add to the beginning so latest sales are first

    // 4. Write back to the file
    fs.writeFileSync(SALES_FILE, JSON.stringify(sales, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error logging sale locally:", error);
    return false;
  }
}

/**
 * Retrieves all logged sales from the database file.
 */
export function getSales(): SaleRecord[] {
  try {
    if (!fs.existsSync(SALES_FILE)) {
      return [];
    }
    const fileContent = fs.readFileSync(SALES_FILE, "utf-8");
    if (!fileContent.trim()) {
      return [];
    }
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading sales database:", error);
    return [];
  }
}
