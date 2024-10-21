-- CreateEnum
CREATE TYPE "room_type" AS ENUM (
  'SINGLE',
  'DOUBLE',
  'TWIN',
  'TRIPLE',
  'QUADRUPLE'
);

-- CreateTable
CREATE TABLE "rooms" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "type" "room_type" NOT NULL DEFAULT 'SINGLE',
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);