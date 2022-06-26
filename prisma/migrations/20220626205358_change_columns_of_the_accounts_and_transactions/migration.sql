/*
  Warnings:

  - You are about to drop the column `source_account_id` on the `transactions` table. All the data in the column will be lost.
  - Added the required column `source_bank` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source_branch` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source_cpf` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_source_account_id_fkey";

-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "bank" TEXT NOT NULL DEFAULT E'352';

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "source_account_id",
ADD COLUMN     "source_bank" TEXT NOT NULL,
ADD COLUMN     "source_branch" TEXT NOT NULL,
ADD COLUMN     "source_cpf" TEXT NOT NULL;
