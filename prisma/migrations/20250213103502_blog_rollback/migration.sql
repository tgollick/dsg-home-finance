/*
  Warnings:

  - You are about to drop the column `tags` on the `BlogPost` table. All the data in the column will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Section` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `content` to the `BlogPost` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_blogPostId_fkey";

-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_blogPostId_fkey";

-- AlterTable
ALTER TABLE "BlogPost" DROP COLUMN "tags",
ADD COLUMN     "content" TEXT NOT NULL;

-- DropTable
DROP TABLE "Image";

-- DropTable
DROP TABLE "Section";
