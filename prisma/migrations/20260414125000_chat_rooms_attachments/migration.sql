-- Enums
DO $$ BEGIN
  CREATE TYPE "RoomType" AS ENUM ('DIRECT', 'GROUP');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "AttachmentKind" AS ENUM ('IMAGE', 'FILE');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Room: add type + directKey
ALTER TABLE "Room"
  ADD COLUMN IF NOT EXISTS "type" "RoomType" NOT NULL DEFAULT 'GROUP',
  ADD COLUMN IF NOT EXISTS "directKey" TEXT;

-- Unique directKey (nullable, but must be unique when present)
DO $$ BEGIN
  CREATE UNIQUE INDEX "Room_directKey_key" ON "Room"("directKey");
EXCEPTION
  WHEN duplicate_table THEN null;
  WHEN duplicate_object THEN null;
END $$;

-- Attachment table
CREATE TABLE IF NOT EXISTS "Attachment" (
  "id" TEXT NOT NULL DEFAULT (gen_random_uuid()::text),
  "kind" "AttachmentKind" NOT NULL,
  "fileName" TEXT NOT NULL,
  "mimeType" TEXT NOT NULL,
  "sizeBytes" INTEGER NOT NULL,
  "url" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  "roomId" TEXT NOT NULL,
  "messageId" TEXT,
  "uploaderId" TEXT NOT NULL,

  CONSTRAINT "Attachment_pkey" PRIMARY KEY ("id")
);

-- Foreign keys
ALTER TABLE "Attachment"
  ADD CONSTRAINT "Attachment_roomId_fkey"
  FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Attachment"
  ADD CONSTRAINT "Attachment_messageId_fkey"
  FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Attachment"
  ADD CONSTRAINT "Attachment_uploaderId_fkey"
  FOREIGN KEY ("uploaderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Indexes
CREATE INDEX IF NOT EXISTS "Attachment_roomId_createdAt_idx" ON "Attachment"("roomId", "createdAt");
CREATE INDEX IF NOT EXISTS "Attachment_messageId_idx" ON "Attachment"("messageId");
CREATE INDEX IF NOT EXISTS "Attachment_uploaderId_createdAt_idx" ON "Attachment"("uploaderId", "createdAt");

