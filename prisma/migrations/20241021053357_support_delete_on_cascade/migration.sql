-- DropForeignKey
ALTER TABLE "room_amenities" DROP CONSTRAINT "room_amenities_room_id_fkey";

-- AddForeignKey
ALTER TABLE "room_amenities" ADD CONSTRAINT "room_amenities_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;
