-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_transactionId_fkey";

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
