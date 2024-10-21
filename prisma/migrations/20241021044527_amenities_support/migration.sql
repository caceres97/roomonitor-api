/*
 Warnings:
 
 - Added the required column `hasRoomonitor` to the `rooms` table without a default value. This is not possible if the table is not empty.
 - Added the required column `maxGuests` to the `rooms` table without a default value. This is not possible if the table is not empty.
 
 */
-- AlterTable
ALTER TABLE
  "rooms"
ADD
  COLUMN "hasRoomonitor" BOOLEAN NOT NULL,
ADD
  COLUMN "is_available" BOOLEAN NOT NULL DEFAULT true,
ADD
  COLUMN "max_guests" INTEGER NOT NULL,
ADD
  COLUMN "min_guests" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "amenities" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "amenities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room_amenities" (
  "id" TEXT NOT NULL,
  "amenity_id" TEXT NOT NULL,
  "room_id" TEXT NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "room_amenities_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE
  "room_amenities"
ADD
  CONSTRAINT "room_amenities_amenity_id_fkey" FOREIGN KEY ("amenity_id") REFERENCES "amenities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
  "room_amenities"
ADD
  CONSTRAINT "room_amenities_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;