ALTER TABLE "RoomMember"
  ADD COLUMN IF NOT EXISTS "lastReadAt" TIMESTAMP(3),
  ADD COLUMN IF NOT EXISTS "lastReadMessageId" TEXT;

CREATE INDEX IF NOT EXISTS "RoomMember_roomId_lastReadAt_idx"
  ON "RoomMember"("roomId", "lastReadAt");

