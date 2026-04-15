-- AlterTable
ALTER TABLE "Attachment" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "passwordHash" TEXT;

-- CreateIndex
CREATE INDEX "Attachment_roomId_kind_createdAt_idx" ON "Attachment"("roomId", "kind", "createdAt");

-- CreateIndex
CREATE INDEX "Message_roomId_id_idx" ON "Message"("roomId", "id");

-- CreateIndex
CREATE INDEX "MessageReceipt_messageId_status_at_idx" ON "MessageReceipt"("messageId", "status", "at");

-- CreateIndex
CREATE INDEX "Room_type_updatedAt_idx" ON "Room"("type", "updatedAt");

-- CreateIndex
CREATE INDEX "RoomMember_roomId_joinedAt_idx" ON "RoomMember"("roomId", "joinedAt");
