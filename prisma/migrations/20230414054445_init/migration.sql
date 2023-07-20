-- CreateTable
CREATE TABLE "Vessel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "naccsCode" TEXT NOT NULL,

    CONSTRAINT "Vessel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Voyage" (
    "id" SERIAL NOT NULL,
    "vesselId" INTEGER NOT NULL,
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Voyage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vessel_naccsCode_key" ON "Vessel"("naccsCode");

-- AddForeignKey
ALTER TABLE "Voyage" ADD CONSTRAINT "Voyage_vesselId_fkey" FOREIGN KEY ("vesselId") REFERENCES "Vessel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
