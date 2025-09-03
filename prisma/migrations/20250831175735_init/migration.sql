-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Car" (
    "id" SERIAL NOT NULL,
    "lotNumber" TEXT NOT NULL,
    "vin" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "trim" TEXT,
    "odometer" INTEGER,
    "primaryDamage" TEXT,
    "secondaryDamage" TEXT,
    "lossType" TEXT,
    "fuelType" TEXT,
    "transmission" TEXT,
    "drive" TEXT,
    "cylinders" INTEGER,
    "bodyStyle" TEXT,
    "color" TEXT,
    "auctionDate" TIMESTAMP(3),
    "auctionLocation" TEXT,
    "saleStatus" TEXT,
    "currentBid" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "buyItNowPrice" DOUBLE PRECISION,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "imageFiles" JSONB,
    "source" TEXT NOT NULL DEFAULT 'copart',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "creatorId" INTEGER,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Auction" (
    "id" SERIAL NOT NULL,
    "carId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "startingBid" DOUBLE PRECISION NOT NULL,
    "currentBid" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "Auction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Bid" (
    "id" SERIAL NOT NULL,
    "auctionId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bid_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Car_lotNumber_key" ON "public"."Car"("lotNumber");

-- AddForeignKey
ALTER TABLE "public"."Car" ADD CONSTRAINT "Car_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Auction" ADD CONSTRAINT "Auction_carId_fkey" FOREIGN KEY ("carId") REFERENCES "public"."Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Bid" ADD CONSTRAINT "Bid_auctionId_fkey" FOREIGN KEY ("auctionId") REFERENCES "public"."Auction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Bid" ADD CONSTRAINT "Bid_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
