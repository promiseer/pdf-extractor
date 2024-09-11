-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "app_id" INTEGER NOT NULL,
    "xref" INTEGER NOT NULL,
    "settlement_date" TIMESTAMP(3) NOT NULL,
    "broker" TEXT NOT NULL,
    "sub_broker" TEXT NOT NULL,
    "borrower_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "total_loan" DOUBLE PRECISION NOT NULL,
    "commission_rate" DOUBLE PRECISION NOT NULL,
    "upfront" DOUBLE PRECISION NOT NULL,
    "upfront_incl_gst" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Report_xref_total_loan_key" ON "Report"("xref", "total_loan");
