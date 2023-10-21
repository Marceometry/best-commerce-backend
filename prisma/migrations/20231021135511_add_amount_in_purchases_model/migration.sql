/*
  Warnings:

  - Added the required column `amount` to the `purchases` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "purchases" ADD COLUMN     "amount" INTEGER NOT NULL;
