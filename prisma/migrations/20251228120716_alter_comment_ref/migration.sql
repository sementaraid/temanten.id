/*
  Warnings:

  - You are about to drop the column `rev` on the `Comments` table. All the data in the column will be lost.
  - You are about to drop the column `rev` on the `Invitation` table. All the data in the column will be lost.
  - Added the required column `slug` to the `Comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Invitation` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Comments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "confirmation" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Comments" ("confirmation", "createdAt", "id", "message", "name", "updatedAt") SELECT "confirmation", "createdAt", "id", "message", "name", "updatedAt" FROM "Comments";
DROP TABLE "Comments";
ALTER TABLE "new_Comments" RENAME TO "Comments";
CREATE TABLE "new_Invitation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'unknown',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Invitation" ("createdAt", "id", "message", "name", "phone", "status", "updatedAt", "whatsapp") SELECT "createdAt", "id", "message", "name", "phone", "status", "updatedAt", "whatsapp" FROM "Invitation";
DROP TABLE "Invitation";
ALTER TABLE "new_Invitation" RENAME TO "Invitation";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
