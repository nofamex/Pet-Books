-- AlterTable
ALTER TABLE "User" ADD COLUMN     "certificate" TEXT,
ADD COLUMN     "isVerified" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "shelter_address" TEXT,
ADD COLUMN     "shelter_name" VARCHAR(255),
ADD COLUMN     "shelter_telephone" INTEGER;
