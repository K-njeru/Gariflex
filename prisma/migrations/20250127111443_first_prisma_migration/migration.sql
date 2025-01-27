-- CreateTable
CREATE TABLE "Make" (
    "id" SERIAL NOT NULL,
    "make" TEXT NOT NULL,
    "logo" TEXT NOT NULL,

    CONSTRAINT "Make_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Models" (
    "id" SERIAL NOT NULL,
    "makeId" INTEGER NOT NULL,
    "model" TEXT NOT NULL,
    "regNo" VARCHAR(7) NOT NULL,
    "mileage" INTEGER NOT NULL,
    "bodyType" TEXT NOT NULL,
    "seatCapacity" INTEGER NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "year" INTEGER NOT NULL,
    "img" TEXT NOT NULL,

    CONSTRAINT "Models_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Make_make_key" ON "Make"("make");

-- CreateIndex
CREATE UNIQUE INDEX "Models_regNo_key" ON "Models"("regNo");

-- CreateIndex
CREATE INDEX "Models_makeId_idx" ON "Models"("makeId");

-- AddForeignKey
ALTER TABLE "Models" ADD CONSTRAINT "Models_makeId_fkey" FOREIGN KEY ("makeId") REFERENCES "Make"("id") ON DELETE CASCADE ON UPDATE CASCADE;
