/*
  Warnings:

  - Added the required column `slug` to the `cateogires` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cateogires" ADD COLUMN     "slug" TEXT NOT NULL;
